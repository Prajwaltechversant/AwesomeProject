import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { setupStore } from '../../src/redux/store/store';
import UserDisplay from '../../src/screens/index';
import { setupServer } from 'msw/node';
import {http } from 'msw';

// Setup MSW server with mock response
const server = setupServer(
  http.get('/api/user', (_req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: 'John Doe' }]));
  })
);

// Setup MSW before tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('UserDisplay fetches and displays user data', async () => {
  const store = setupStore();

  const { getByText } = render(
    <Provider store={store}>
      <UserDisplay />
    </Provider>
  );

  fireEvent.press(getByText('fetch-user'));

  await waitFor(() => expect(getByText('John Doe')).toBeTruthy());
});
