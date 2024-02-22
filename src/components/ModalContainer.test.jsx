import { shallow } from '@edx/react-unit-test-utils';

import { useORAConfigData } from 'hooks/app';
import { useCloseModalAction } from 'hooks/actions';
import ModalContainer from './ModalContainer';

jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
}));
jest.mock('hooks/actions', () => ({
  useCloseModalAction: jest.fn(),
}));
jest.mock('components/ConfirmDialog', () => 'ConfirmDialog');
jest.mock('components/ProgressBar', () => 'ProgressBar');
jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ courseId: 'courseId' }),
}));
jest.mock('@edx/frontend-lib-special-exams', () => ({
  OuterExamTimer: () => 'OuterExamTimer',
}));

describe('<ModalContainer />', () => {
  useORAConfigData.mockReturnValue({ title: 'title' });
  useCloseModalAction.mockReturnValue({
    confirmProps: {
      abc: 'def',
    },
    action: { onClick: jest.fn().mockName('closeModalAction') },
  });
  const renderComponent = () => shallow(
    <ModalContainer>
      <div>children</div>
    </ModalContainer>,
  );

  it('render default', () => {
    const wrapper = renderComponent();
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('ConfirmDialog')).toHaveLength(1);
  });

  it('render without confirmProps', () => {
    useCloseModalAction.mockReturnValue({
      confirmProps: null,
      action: { onClick: jest.fn().mockName('closeModalAction') },
    });
    const wrapper = renderComponent();
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByType('ConfirmDialog')).toHaveLength(0);
  });
});
