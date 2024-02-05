import { shallow } from '@edx/react-unit-test-utils';

import { useDeleteFileAction } from 'hooks/actions';

import ActionCell from './ActionCell';

jest.mock('components/ConfirmDialog', () => 'ConfirmDialog');
jest.mock('hooks/actions', () => ({
  useDeleteFileAction: jest.fn(),
}));

describe('<ActionCell />', () => {
  const props = {
    onDeletedFile: jest.fn().mockName('onDeletedFile'),
    disabled: false,
    row: {
      original: {
        fileIndex: 1,
      },
    },
  };

  const deleteFileAction = {
    action: {
      onClick: jest.fn().mockName('onClick'),
    },
    confirmProps: {
      abc: 123,
    },
  };

  useDeleteFileAction.mockReturnValue(deleteFileAction);

  it('render empty on disabled', () => {
    const wrapper = shallow(<ActionCell {...props} disabled />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('render action cell and confirm dialog', () => {
    const wrapper = shallow(<ActionCell {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('IconButton')).toHaveLength(1);
    expect(wrapper.instance.findByType('ConfirmDialog')).toHaveLength(1);
  });
});
