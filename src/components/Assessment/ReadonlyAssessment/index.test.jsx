import { shallow } from '@edx/react-unit-test-utils';

import ReadOnlyAssessmentContainer from '.';

jest.mock('hooks/app', () => ({
  useHasSubmitted: jest.fn(),
  useRefreshPageData: jest.fn(),
}));
jest.mock('hooks/assessment', () => ({
  useSubmittedAssessment: jest.fn(),
}));
jest.mock('./ReadOnlyAssessment', () => 'ReadOnlyAssessment');


describe('<ReadOnlyAssessmentContainer />', () => {
  let props = {
    assessment: {
      abc: 'def',
    },
    assessments: [
      {
        abc: 'def',
      },
      {
        ghi: 'jkl',
      },
    ],
    step: 'Step',
    stepScore: {
      earned: 5,
      total: 10,
    },
    defaultOpen: true,
  };
  it('renders the component', () => {
    const wrapper = shallow(<ReadOnlyAssessmentContainer {...props} />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('renders without props', () => {
    const wrapper = shallow(<ReadOnlyAssessmentContainer />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
