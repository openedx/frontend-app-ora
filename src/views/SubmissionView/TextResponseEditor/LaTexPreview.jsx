import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { renderMathJax } from 'utils/index';

const LatexPreview = ({ latexValue }) => {
  const latexPreviewEl = React.useRef(null);

  useEffect(() => {
    renderMathJax(latexPreviewEl.current);
  }, [latexValue]);

  return (
    <div ref={latexPreviewEl} className="mt-2">
      <div dangerouslySetInnerHTML={{ __html: latexValue }} />
    </div>
  );
};

LatexPreview.propTypes = {
  latexValue: PropTypes.string.isRequired,
};

export default LatexPreview;
