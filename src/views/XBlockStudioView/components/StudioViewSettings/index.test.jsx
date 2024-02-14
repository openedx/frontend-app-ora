import { shallow } from '@edx/react-unit-test-utils';

import { useORAConfigData } from 'hooks/app';

import StudioViewSettings from './index';

jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
}));
jest.mock('../XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: () => ({
    settingIsOpen: true,
    toggleStudioViewSetting: jest.fn().mockName('toggleStudioViewSetting'),
  }),
}));
jest.mock('./RequiredConfig', () => 'RequiredConfig');
jest.mock('./FileUploadConfig', () => 'FileUploadConfig');

describe('<StudioViewSettings />', () => {
  it('render without leaderboardConfig and disable everything', () => {
    useORAConfigData.mockReturnValue({
      submissionConfig: {
        textResponseConfig: {
          required: false,
          allowLatexPreview: false,
          editorType: 'text',
        },
        teamsConfig: {
          enabled: false,
        },
      },
      rubricConfig: {
        enabled: false,
      },
      leaderboardConfig: {
        enabled: false,
      },
    });

    const wrapper = shallow(<StudioViewSettings />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByTestId('leaderboard-test-id').length).toBe(0);
  });

  it('render with leaderboardConfig and enable everything', () => {
    useORAConfigData.mockReturnValue({
      submissionConfig: {
        textResponseConfig: {
          required: true,
          allowLatexPreview: true,
          editorType: 'wysiwyg',
        },
        teamsConfig: {
          enabled: true,
        },
      },
      rubricConfig: {
        enabled: true,
      },
      leaderboardConfig: {
        enabled: true,
        numberOfEntries: 10,
      },
    });

    const wrapper = shallow(<StudioViewSettings />);
    expect(wrapper.snapshot).toMatchSnapshot();

    expect(wrapper.instance.findByTestId('leaderboard-test-id').length).toBe(1);
  });
});
