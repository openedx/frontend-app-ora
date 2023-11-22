import { supportedTypes } from './constants';

/**
 * Util methods and transforms
 */
export const getFileType = (fileName) => fileName.split('.').pop()?.toLowerCase();
export const isSupported = ({ fileName }) => supportedTypes.includes(
  getFileType(fileName),
);
