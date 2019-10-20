import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { h0 } from '../common/fp.js';
import { ORDER_DEPART } from './constant.js';

export default createStore(
  combineReducers(reducers),
  {
    from: null,
    to: null,
    departDate: h0(Date.now()),
    highSpeed: false,
    trainList: [],
    orderType: ORDER_DEPART,
    // 只看有票
    onlyTickets: false,
    ticketTypes: [],
    checkedTicketTypes: {},
    trainTypes: [],
    checkedTrainTypes: {},
    departStations: [],
    checkedDepartStations: {},
    arriveStations: [],
    checkedArriveStations: {},
    // 出发时间
    departTimeStart: 0,
    departTimeEnd: 24,
    // 到达时间
    arriveTimeStart: 0,
    arriveTimeEnd: 24,
    // 综合筛选是否显示
    isFiltersVisible: false,
    searchParsed: false,
  },
  applyMiddleware(thunk, logger)
);