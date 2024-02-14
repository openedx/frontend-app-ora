import { shallow } from '@edx/react-unit-test-utils';

import { useRubricConfig } from 'hooks/app';

import StudioViewRubric from './StudioViewRubric';

jest.mock('hooks/app', () => ({
  useRubricConfig: jest.fn(),
}));
jest.mock('./XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: () => ({
    rubricIsOpen: true,
    toggleRubric: jest.fn().mockName('toggleRubric'),
  }),
}));

describe('<StudioViewRubric />', () => {
  it('render with criteria and options', () => {
    useRubricConfig.mockReturnValue({
      criteria: [
        {
          name: 'criterion1',
          description: 'description1',
          options: [
            {
              name: 'option1',
              label: 'label1',
              points: 1,
              description: 'description1',
            },
            {
              name: 'option2',
              label: 'label2',
              points: 2,
              description: 'description2',
            },
          ],
        },
        {
          name: 'criterion2',
          description: 'description2',
          options: [
            {
              name: 'option2',
              label: 'label2',
              points: 2,
              description: 'description2',
            },
          ],
        },
      ],
    });

    const wrapper = shallow(<StudioViewRubric />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByTestId('criteria-test-id').length).toBe(2);
  });

  it('render without criteria', () => {
    useRubricConfig.mockReturnValue({ criteria: [] });

    const wrapper = shallow(<StudioViewRubric />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByTestId('criteria-test-id').length).toBe(0);
  });
});
