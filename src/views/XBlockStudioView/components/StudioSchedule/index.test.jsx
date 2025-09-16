import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithIntl } from 'testUtils';


import { useORAConfigData } from 'hooks/app';
import { stepNames } from 'constants/index';
import messages from '../messages';


import StudioSchedule from './index';
/* eslint-disable react/prop-types */

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('hooks/app', () => ({
  useORAConfigData: jest.fn(),
}));
jest.mock('../XBlockStudioViewProvider', () => ({
  useXBlockStudioViewContext: () => ({
    scheduleIsOpen: true,
    toggleSchedule: jest.fn().mockName('toggleSchedule'),
  }),
}));
jest.mock('./FormatDateTime', () => ({ date }) => (
  <div>FormatDateTime: {date}</div>
));
jest.mock('./StepInfo', () => ({ stepName, ...props }) => (
  <div>
    StepInfo: {stepName} {JSON.stringify(props)}
  </div>
));


describe('<StudioSchedule />', () => {
  it('render without assesssment steps', () => {
    useORAConfigData.mockReturnValue({
      assessmentSteps: {
        settings: {},
      },
      submissionConfig: {
        startDatetime: '2020-01-01T00:00:00Z',
        endDatetime: '2020-01-01T00:00:00Z',
      },
    });

    renderWithIntl(<StudioSchedule />, messages);

    expect(screen.getByText('Schedule')).toBeInTheDocument();
    expect(screen.getByText(/Response start:/)).toBeInTheDocument();
    expect(screen.getByText(/Response due:/)).toBeInTheDocument();
  });

  it('render with assesssment steps', () => {
    useORAConfigData.mockReturnValue({
      assessmentSteps: {
        settings: {
          [stepNames.self]: {
            abc: 'def',
          },
          [stepNames.peer]: {
            ghi: 'jkl',
          },
        },
      },
      submissionConfig: {
        startDatetime: '2020-01-01T00:00:00Z',
        endDatetime: '2020-01-01T00:00:00Z',
      },
    });

    const { container } = renderWithIntl(<StudioSchedule />);

    expect(container.textContent).toContain('Schedule');
    expect(container.textContent).toContain('StepInfo: Self assessment');
    expect(container.textContent).toContain('StepInfo: Peer assessment');
  });
});
