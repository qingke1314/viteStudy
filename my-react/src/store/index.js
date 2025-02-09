import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import theme from '../reducers/theme';
import user from '../reducers/user';

const store = configureStore({
  reducer: {
    theme,
    user,
  },
}); // configureStore 自动集成 Redux DevTools 和中间件（如 redux-thunk）。

export default store;
