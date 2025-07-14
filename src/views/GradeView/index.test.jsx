import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import GradeView from './index';

jest.unmock('@openedx/paragon');
jest.unmock('react');
jest.unmock('@edx/frontend-platform/i18n');

jest.mock('./FinalGrade', () => () => (
  <div data-testid="final-grade">Final Grade Component</div>
));
jest.mock('./Content', () => () => (
  <div data-testid="grade-content">Grade Content Component</div>
));
jest.mock('components/ModalActions', () => () => (
  <div data-testid="modal-actions">Modal Actions Component</div>
));

describe('<GradeView />', () => {
  it('renders grade view with proper layout structure and responsive design', () => {
    const { container } = render(<GradeView />);

    expect(screen.getByTestId('final-grade')).toBeInTheDocument();
    expect(screen.getByTestId('grade-content')).toBeInTheDocument();
    expect(screen.getByTestId('modal-actions')).toBeInTheDocument();

    const gradeViewBody = container.querySelector('.grade-view-body');
    expect(gradeViewBody).toBeInTheDocument();

    const mainContainer = container.querySelector(
      '.m-0.d-flex.justify-content-center',
    );
    expect(mainContainer).toBeInTheDocument();
  });
});
