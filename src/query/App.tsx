import './App.css';
import React, {
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import URI from 'urijs';
import { bindActionCreators } from 'redux';

import Header from '../common/Header';
import Nav from '../common/Nav';
import List from './List';
import Bottom from './Bottom';
import useNav from '../common/useNav';

import {
  setFrom,
  setTo,
  setDepartDate,
  setHightSpeed,
  setSearchParsed,

  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,

  prevDate,
  nextDate,

  toggleHightSpeed,
  toggleOnlyTickets,
  toggleOrderType,
  toggleIsFiltersVisible,

  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd,
  setCheckedDepartStations,
  setCheckedArriveStations,
} from './actions.js';
import { h0 } from '../common/fp';

function App(props: any) {
  const {
    from,
    to,
    highSpeed,
    departDate,
    dispatch,
    searchParsed,
    orderType,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    trainList,
    isFiltersVisible,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);

    const { from, to, date, highSpeed }: any = queries;
    if (!from || !to || !date || !highSpeed) {
      return;
    }

    dispatch(setFrom(from));
    dispatch(setTo(to));
    // 把日期至为时间戳
    dispatch(setDepartDate(h0(dayjs(date).valueOf())));
    dispatch(setHightSpeed(highSpeed === 'true'));

    dispatch(setSearchParsed(true));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url: any = new URI('/rest/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed', highSpeed)
      .setSearch('orderType', orderType)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
      .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
      .setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join())
      .setSearch('checkedArriveStations', Object.keys(checkedArriveStations).join())
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd);

    fetch(url)
      .then(res => res.json())
      .then(result => {
        console.log(result)
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: {
                trainType,
                ticketType,
                depStation,
                arrStation,
              }
            }
          }
        } = result;

        dispatch(setTrainList(trains));
        dispatch(setTicketTypes(ticketType));
        dispatch(setTrainTypes(trainType));
        dispatch(setDepartStations(depStation));
        dispatch(setArriveStations(arrStation));
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParsed, from, to, departDate, highSpeed, orderType, onlyTickets, checkedTicketTypes, checkedTrainTypes, checkedDepartStations, checkedArriveStations, departTimeStart, departTimeEnd, arriveTimeStart, arriveTimeEnd]);

  const {
    prev,
    next,
    isPrevDisabled,
    isNextDisabled,
  } = useNav({ departDate, dispatch, prevDate, nextDate });

  const bottomCbs = useMemo(() => {
    return bindActionCreators({
      toggleHightSpeed,
      toggleOnlyTickets,
      toggleOrderType,
      toggleIsFiltersVisible,
      setTicketTypes,
      setCheckedTicketTypes,
      setTrainTypes,
      setCheckedTrainTypes,
      setDepartTimeStart,
      setDepartTimeEnd,
      setArriveTimeStart,
      setArriveTimeEnd,
    }, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        searchParsed
          ? (
            <><div className="header-wrapper">
              <Header title={`${from} → ${to}`} onBack={onBack} />
            </div>
              <Nav
                date={departDate}
                prev={prev}
                next={next}
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
              />
              <List list={trainList} />
              <Bottom
                highSpeed={highSpeed}
                orderType={orderType}
                onlyTickets={onlyTickets}
                isFiltersVisible={isFiltersVisible}

                ticketTypes={ticketTypes}
                checkedTicketTypes={checkedTicketTypes}
                trainTypes={trainTypes}
                checkedTrainTypes={checkedTrainTypes}
                departStations={departStations}
                checkedDepartStations={checkedDepartStations}
                arriveStations={arriveStations}
                checkedArriveStations={checkedArriveStations}
                departTimeStart={departTimeStart}
                departTimeEnd={departTimeEnd}
                arriveTimeStart={arriveTimeStart}
                arriveTimeEnd={arriveTimeEnd}
                setCheckedDepartStations={setCheckedDepartStations}
                setCheckedArriveStations={setCheckedArriveStations}
                {...bottomCbs}
              />
            </>)
          : null
      }
    </>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);