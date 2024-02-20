export const loadMathJax = () => {
  const config = document.createElement('script');
  config.type = 'text/x-mathjax-config';
  config.text = `
    MathJax.Hub.Config({
      styles: {
        '.MathJax_SVG>svg': { 'max-width': '100%', },
        // This is to resolve for people who use center mathjax with tables
        'table>tbody>tr>td>.MathJax_SVG>svg': { 'max-width': 'inherit'},
      },
      CommonHTML: { linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } },
      "HTML-CSS": { linebreaks: { automatic: true } },
      tex2jax: {inlineMath: [ ['$','$'], ["\\(","\\)"]],
                displayMath: [ ['$$','$$'], ["\\[","\\]"]],
                processEscapes: true},
    });
    `;
  document.head.appendChild(config);

  const mathjaxResizeScript = document.createElement('script');
  mathjaxResizeScript.type = 'text/javascript';
  mathjaxResizeScript.text = `
      // Activating Mathjax accessibility files
      window.MathJax = {
        menuSettings: {
          collapsible: true,
          autocollapse: false,
          explorer: true,
        },
        startup: {
          ready: () => {
            MathJax.startup.defaultReady();
            MathJax.onMathJaxReady();
          },
        },
      };
      window.addEventListener('resize', MJrenderer);

      let t = -1;
      let delay = 1000;
      let oldWidth = document.documentElement.scrollWidth;
      function MJrenderer() {
        // don't rerender if the window is the same size as before
        if (t >= 0) {
          window.clearTimeout(t);
        }
        if (oldWidth !== document.documentElement.scrollWidth) {
          t = window.setTimeout(function () {
            oldWidth = document.documentElement.scrollWidth;
            MathJax.Hub.Queue(['Rerender', MathJax.Hub]);
            t = -1;
          }, delay);
        }
      }
      `;
  document.head.appendChild(mathjaxResizeScript);

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@2.7.5/MathJax.js?config=TeX-MML-AM_SVG';
  document.head.appendChild(script);
};

export const renderMathJax = (el) => {
  if (window.MathJax === undefined) {
    window.onMathJaxRendered = () => {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, el]);

      delete window.onMathJaxRendered;
    };
    loadMathJax();
  } else {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, el]);
  }
};

export default renderMathJax;
