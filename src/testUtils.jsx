import { IntlProvider } from '@edx/frontend-platform/i18n';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStore } from 'data/store';

// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

const store = createStore(false);
const queryClient = new QueryClient({ queries: { retry: false } });

export const renderWithIntl = (component, messages = {}) => render(
  <IntlProvider locale="en" messages={messages}>
    {component}
  </IntlProvider>,
);

export const renderWithProviders = (component, messages = {}) => render(
  <IntlProvider locale="en" messages={messages}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </Provider>
  </IntlProvider>,
);

export const formatMessage = (msg, values) => {
  let message = msg.defaultMessage;
  if (values === undefined) {
    return message;
  }

  Object.keys(values).forEach((key) => {
    // eslint-disable-next-line
    message = message.replaceAll(`{${key}}`, values[key]);
  });
  return message;
};
