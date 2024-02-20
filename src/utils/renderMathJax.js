// this is a work around for testing
// eslint-disable-next-line import/no-self-import
import * as module from './renderMathJax';

export const loadMathJaxConfig = () => {
  window.MathJax = {
    menuSettings: {
      collapsible: true,
      autocollapse: false,
      explorer: true,
    },
    startup: {
      ready: () => {
        MathJax.startup.defaultReady();
        window.onMathJaxReady();
      },
    },
  };
};

export const mathJaxResizeListener = () => {
  let t = -1;
  const delay = 1000;
  let oldWidth = document.documentElement.scrollWidth;

  window.addEventListener('resize', () => {
    if (t >= 0) {
      window.clearTimeout(t);
    }
    if (oldWidth !== document.documentElement.scrollWidth) {
      t = window.setTimeout(() => {
        oldWidth = document.documentElement.scrollWidth;
        MathJax.Hub.Queue(['Rerender', MathJax.Hub]);
        t = -1;
      }, delay);
    }
  });
};

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

  // load config
  module.loadMathJaxConfig();
  // add resize listener
  module.mathJaxResizeListener();

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@2.7.5/MathJax.js?config=TeX-MML-AM_SVG';
  document.head.appendChild(script);
};

export const renderMathJax = (el) => {
  if (window.MathJax == null) {
    // render the element after MathJax is loaded
    window.onMathJaxRendered = () => {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, el]);

      delete window.onMathJaxRendered;
    };
    module.loadMathJax();
  } else {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, el]);
  }
};

export default renderMathJax;
