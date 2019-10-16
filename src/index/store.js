import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default createStore(
  combineReducers(reducers),
  // state的默认值
  {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,// 城市选择浮层的开关
    currentSelectingLeftCity: false,
    cityData: null,
    isLoadingCityData: false,// 当前是否在加载citydata
    isDateSelectorVisible: false,// 日期选择浮层的开关
    highSpeed:false,
  },
  // 中间件
  applyMiddleware(thunk, logger)
);