import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import GradeView from './index';

jest.mock('./FinalGrade', () => () => (
  <div>Final Grade Component</div>
));
jest.mock('./Content', () => () => (
  <div>Grade Content Component</div>
));
jest.mock('components/ModalActions', () => () => (
  <div>Modal Actions Component</div>
));

describe('<GradeView />', () => {
  it('renders grade view with proper layout structure and responsive design', () => {
    const { container } = render(<GradeView />);

    expect(screen.getByText('Final Grade Component')).toBeInTheDocument();
    expect(screen.getByText('Grade Content Component')).toBeInTheDocument();
    expect(screen.getByText('Modal Actions Component')).toBeInTheDocument();

    const gradeViewBody = container.querySelector('.grade-view-body');
    expect(gradeViewBody).toBeInTheDocument();

    const mainContainer = container.querySelector(
      '.m-0.d-flex.justify-content-center',
    );
    expect(mainContainer).toBeInTheDocument();
  });
});
