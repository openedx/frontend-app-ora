import { useRef, useState } from 'react';

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
  const [pageNumber, rawSetPageNumber] = useState(initialState.pageNumber);
  const [numPages, setNumPages] = useState(initialState.numPages);
  const [relativeHeight, setRelativeHeight] = useState(initialState.relativeHeight);

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
