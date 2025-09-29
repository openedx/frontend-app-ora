import { when } from 'jest-when';
import useConfirmAction from './useConfirmAction';
import messages, { confirmTitles, confirmDescriptions } from './messages';
import useDeleteFileAction from './useDeleteFileAction';

jest.mock('./useConfirmAction', () => jest.fn());

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn((cb, prereqs) => ({ useCallback: { cb, prereqs } })),
}));

jest.mock('@edx/frontend-platform/i18n', () => {
  const { formatMessage: fn } = jest.requireActual('../../testUtils.jsx');
  return {
    ...jest.requireActual('@edx/frontend-platform/i18n'),
    useIntl: () => ({
      formatMessage: fn,
    }),
  };
});

when(useConfirmAction).calledWith().mockReturnValue(args => ({ confirmAction: args }));
let out;
const props = {
  fileIndex: 'test-file-index',
  onDeletedFile: jest.fn(),
};

describe('useDeleteFileAction', () => {
  beforeEach(() => {
    out = useDeleteFileAction(props);
  });
  describe('behavior', () => {
    it('loads confirmAction from hooks', () => {
      expect(useConfirmAction).toHaveBeenCalledWith();
    });
  });
  describe('output returned confirmAction', () => {
    test('action deletes file by index passed', () => {
      const { action } = out.confirmAction;
      const { cb, prereqs } = action.onClick.useCallback;
      expect(prereqs).toEqual([props.fileIndex, props.onDeletedFile]);
      cb();
      expect(props.onDeletedFile).toHaveBeenCalledWith(props.fileIndex);
      expect(action.children).toEqual(messages.deleteFile.defaultMessage);
    });
    test('wrapped action with tile and description from messages', () => {
      const { title, description } = out.confirmAction;
      expect(title).toEqual(confirmTitles.deleteFile.defaultMessage);
      expect(description).toEqual(confirmDescriptions.deleteFile.defaultMessage);
    });
  });
});
