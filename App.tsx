import {View, Text} from 'react-native';
import React from 'react';
import UserDisplay from './src/screens';
import {Provider} from 'react-redux';
import {setupStore } from './src/redux/store/store';
const store = setupStore();
const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <UserDisplay />
      </Provider>
    </>
  );
};

export default App;
