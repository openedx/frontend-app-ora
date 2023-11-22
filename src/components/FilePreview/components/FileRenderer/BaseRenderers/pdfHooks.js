import { useRef } from 'react';

import { useKeyedState, StrictDict } from '@edx/react-unit-test-utils';

export const stateKeys = StrictDict({
  pageNumber: 'pageNumber',
  numPages: 'numPages',
  relativeHeight: 'relativeHeight',
});

export const initialState = {
  pageNumber: 1,
  numPages: 1,
  relativeHeight: 1,
};

export const safeSetPageNumber = ({ numPages, rawSetPageNumber }) => (pageNumber) => {
  if (pageNumber > 0 && pageNumber <= numPages) {
    rawSetPageNumber(pageNumber);
  }
};

export const usePDFRendererData = ({
  onError,
  onSuccess,
}) => {
  const [pageNumber, rawSetPageNumber] = useKeyedState(stateKeys.pageNumber, initialState.pageNumber);
  const [numPages, setNumPages] = useKeyedState(stateKeys.numPages, initialState.numPages);
  const [relativeHeight, setRelativeHeight] = useKeyedState(
    stateKeys.relativeHeight,
    initialState.relativeHeight,
  );

  const setPageNumber = safeSetPageNumber({ numPages, rawSetPageNumber });

  const wrapperRef = useRef();

  return {
    pageNumber,
    numPages,
    relativeHeight,
    wrapperRef,
    onDocumentLoadSuccess: (args) => {
      onSuccess();
      setNumPages(args.numPages);
    },
    onLoadPageSuccess: (page) => {
      const pageWidth = page.view[2];
      const pageHeight = page.view[3];
      const wrapperHeight = wrapperRef.current.getBoundingClientRect().width;
      const newHeight = (wrapperHeight * pageHeight) / pageWidth;
      setRelativeHeight(newHeight);
    },
    onDocumentLoadError: onError,
    onInputPageChange: ({ target: { value } }) => setPageNumber(parseInt(value, 10)),
    onPrevPageButtonClick: () => setPageNumber(pageNumber - 1),
    onNextPageButtonClick: () => setPageNumber(pageNumber + 1),
    hasNext: pageNumber < numPages,
    hasPrev: pageNumber > 1,
  };
};
