import { loadMathJax, mathJaxResizeListener, loadMathJaxConfig } from './renderMathJax';

jest.mock('./renderMathJax', () => ({
  loadMathJax: jest.fn(),
  renderMathJax: jest.fn(),
  mathJaxResizeListener: jest.fn(),
  loadMathJaxConfig: jest.fn(),
}));

describe('loadMathJax', () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { loadMathJax } = jest.requireActual('./renderMathJax');
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should call create script 2 times and have resize script', () => {
    jest.spyOn(document, 'createElement');
    jest.spyOn(document.head, 'appendChild');
    loadMathJax();
    expect(document.createElement).toHaveBeenCalledTimes(2);
    expect(document.head.appendChild).toHaveBeenCalledTimes(2);

    expect(mathJaxResizeListener).toHaveBeenCalled();
    expect(loadMathJaxConfig).toHaveBeenCalled();
  });
});

describe('renderMathJax', () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { renderMathJax } = jest.requireActual('./renderMathJax');
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should call MathJax.Hub.Queue when MathJax is loaded', () => {
    window.MathJax = {
      Hub: {
        Queue: jest.fn(),
      },
    };
    renderMathJax('el');
    expect(window.MathJax.Hub.Queue).toHaveBeenCalled();
    expect(loadMathJax).not.toHaveBeenCalled();

    delete window.MathJax;
  });

  it('should call loadMathJax when MathJax is not loaded', () => {
    window.MathJax = undefined;
    renderMathJax('el');
    expect(loadMathJax).toHaveBeenCalled();

    // test onMathJaxRendered
    window.MathJax = {
      Hub: {
        Queue: jest.fn(),
      },
    };
    window.onMathJaxRendered();
    expect(window.MathJax.Hub.Queue).toHaveBeenCalled();
    expect(window.onMathJaxRendered).toBeUndefined();
    delete window.MathJax;
  });
});

describe('loadMathJaxConfig', () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { loadMathJaxConfig } = jest.requireActual('./renderMathJax');
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should call have onMathJaxReady when it is ready', () => {
    window.onMathJaxReady = jest.fn();
    loadMathJaxConfig();
    window.MathJax.startup.defaultReady = jest.fn();
    window.MathJax.startup.ready();
    expect(window.MathJax.startup.defaultReady).toHaveBeenCalled();
    expect(window.onMathJaxReady).toHaveBeenCalled();
    delete window.MathJax;
    delete window.onMathJaxReady;
  });
});

describe('mathJaxResizeListener', () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { mathJaxResizeListener } = jest.requireActual('./renderMathJax');
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should call window.addEventListener', () => {
    jest.spyOn(window, 'addEventListener');
    mathJaxResizeListener();
    expect(window.addEventListener).toHaveBeenCalled();
  });

  it('should trigger resize event', () => {
    window.MathJax = {
      Hub: {
        Queue: jest.fn(),
      },
    };
    jest.spyOn(window, 'addEventListener');
    const oldWidth = jest.spyOn(document.documentElement, 'scrollWidth', 'get');
    const timeout = jest.spyOn(window, 'setTimeout').mockReturnValue(1);

    oldWidth.mockReturnValue(100);

    mathJaxResizeListener();

    const resizeFunc = window.addEventListener.mock.calls[0][1];
    // the width change
    oldWidth.mockReturnValue(200);
    resizeFunc();
    expect(setTimeout).toHaveBeenCalled();
    const timeoutFunc = timeout.mock.calls[0][0];
    timeoutFunc();
    expect(MathJax.Hub.Queue).toHaveBeenCalledTimes(1);
  });
});
