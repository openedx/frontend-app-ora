import { IntlProvider } from '@edx/frontend-platform/i18n';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

export const renderWithIntl = (component, messages = {}) => render(
  <IntlProvider locale="en" messages={messages}>
    {component}
  </IntlProvider>,
);

