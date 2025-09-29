import {
  PDFRenderer,
  ImageRenderer,
  TXTRenderer,
} from './FileRenderer/BaseRenderers';

import messages from './messages';

export const errorStatuses = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500,
} as const;

export const fileTypes = {
  pdf: 'pdf',
  jpg: 'jpg',
  jpeg: 'jpeg',
  png: 'png',
  bmp: 'bmp',
  txt: 'txt',
  gif: 'gif',
  jfif: 'jfif',
  pjpeg: 'pjpeg',
  pjp: 'pjp',
  svg: 'svg',
} as const;

export const errorMessages = {
  [errorStatuses.notFound]: messages.fileNotFoundError,
  [errorStatuses.serverError]: messages.unknownError,
};

/**
 * Config data
 */
export const renderers = {
  [fileTypes.pdf]: PDFRenderer,
  [fileTypes.jpg]: ImageRenderer,
  [fileTypes.jpeg]: ImageRenderer,
  [fileTypes.bmp]: ImageRenderer,
  [fileTypes.png]: ImageRenderer,
  [fileTypes.txt]: TXTRenderer,
  [fileTypes.gif]: ImageRenderer,
  [fileTypes.jfif]: ImageRenderer,
  [fileTypes.pjpeg]: ImageRenderer,
  [fileTypes.pjp]: ImageRenderer,
  [fileTypes.svg]: ImageRenderer,
};

export const supportedTypes = Object.keys(renderers);
