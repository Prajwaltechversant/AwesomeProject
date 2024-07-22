import userReducer, { fetchUser } from '../../src/redux/slice/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';
import UserDisplay from '../../src/screens';
// import {renderWithProviders} from './renderProvider'
import '@testing-library/react-native/extend-expect';

const server = setupServer(

    http.get('/api/user', async () => {
        await delay(150)
        return HttpResponse.json('John Smith')
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('userSlice', () => {
    //   it('should handle initial state', () => {
    //     expect(userReducer(undefined, { type: 'unknown' })).toEqual({
    //       users: [],
    //       status: 'idle',
    //     });
    //   });

    it('should handle fetchUser', async () => {
        const store = configureStore({ reducer: { users: userReducer } });
        await store.dispatch(fetchUser());
        const state = store.getState().users;
        expect(state.users).toEqual('Leanne Graham');
        expect(state.status).toBe('completed');
    });
});
// test('fetches & receives a user after clicking the fetch user button', async () => {
//     renderWithProviders(<UserDisplay />)
  
//     // should show no user initially, and not be fetching a user
//     expect(screen.getByText(/no user/i)).toBeInTheDocument()
//     expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()
  
//     // after clicking the 'Fetch user' button, it should now show that it is fetching the user
//     fireEvent.click(screen.getByRole('button', { name: /Fetch user/i }))
//     expect(screen.getByText(/no user/i)).toBeInTheDocument()
  
//     // after some time, the user should be received
//     expect(await screen.findByText(/John Smith/i)).toBeInTheDocument()
//     expect(screen.queryByText(/no user/i)).not.toBeInTheDocument()
//     expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()
//   })