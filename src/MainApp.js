import React from 'react'
import { userReducer } from './redux/store/reducers/reducers.js';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App.js';

const store = createStore(userReducer);
const MainApp = () => {
  return (
    <Provider store={store}>
        <App />
    </Provider>
  )
}

export default MainApp
