import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useORAConfigData } from 'hooks/app';

import StudioViewSettings from './index';
/* eslint-disable react/prop-types */

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
}));
jest.mock('../XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: () => ({
    settingIsOpen: true,
    toggleStudioViewSetting: jest.fn().mockName('toggleStudioViewSetting'),
  }),
}));
jest.mock('./RequiredConfig', () => ({ required }) => (
  <span>RequiredConfig: {required ? 'true' : 'false'}</span>
));
jest.mock('./FileUploadConfig', () => () => <div>FileUploadConfig</div>);

const defaultMessages = {
  'frontend-app-ora.xblock-studio-view.settingsHeader': 'Settings',
  'frontend-app-ora.xblock-studio-view.textResponseLabel': 'Text response: ',
  'frontend-app-ora.xblock-studio-view.responseEditorLabel':
    'Response editor: ',
  'frontend-app-ora.xblock-studio-view.textEditorLabel': 'Text',
  'frontend-app-ora.xblock-studio-view.wysiwygEditorLabel': 'WYSIWYG',
  'frontend-app-ora.xblock-studio-view.allowLaTexResponsesLabel':
    'Allow LaTeX responses: ',
  'frontend-app-ora.xblock-studio-view.trueLabel': 'True',
  'frontend-app-ora.xblock-studio-view.falseLabel': 'False',
  'frontend-app-ora.xblock-studio-view.topResponsesLabel': 'Top responses: ',
  'frontend-app-ora.xblock-studio-view.teamsEnabledLabel': 'Teams enabled: ',
  'frontend-app-ora.xblock-studio-view.showRubricDuringResponseLabel':
    'Show rubric during response: ',
};

const renderWithIntl = (component) => render(
  <IntlProvider locale="en" messages={defaultMessages}>
    {component}
  </IntlProvider>,
);

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
        showDuringResponse: false,
      },
      leaderboardConfig: {
        enabled: false,
      },
    });

    const { container } = renderWithIntl(<StudioViewSettings />);

    expect(container.textContent).toContain('Settings');
    expect(container.textContent).toContain('Text response: ');
    expect(container.textContent).toContain('RequiredConfig: false');
    expect(container.textContent).toContain('Response editor: ');
    expect(container.textContent).toContain('Text');
    expect(container.textContent).toContain('Allow LaTeX responses: ');
    expect(container.textContent).toContain('False');
    expect(container.textContent).toContain('Teams enabled: ');
    expect(container.textContent).toContain('Show rubric during response: ');
    expect(
      container.querySelector('[data-testid="leaderboard-test-id"]'),
    ).toBeNull();
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
        showDuringResponse: true,
      },
      leaderboardConfig: {
        enabled: true,
        numberOfEntries: 10,
      },
    });

    const { container } = renderWithIntl(<StudioViewSettings />);

    expect(container.textContent).toContain('Settings');
    expect(container.textContent).toContain('RequiredConfig: true');
    expect(container.textContent).toContain('WYSIWYG');
    expect(container.textContent).toContain('Top responses: ');
    expect(container.textContent).toContain('10');
    expect(
      container.querySelector('[data-testid="leaderboard-test-id"]'),
    ).not.toBeNull();
  });
});
