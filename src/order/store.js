import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

export default createStore(
  combineReducers(reducers),
  // state的默认值
  {

  },
  // 中间件
  applyMiddleware(thunk)
);