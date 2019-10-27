import './App.css';
import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import URI from 'urijs';
import dayjs from 'dayjs';

import Account from './Account';
import Choose from './Choose';
import Menu from './Menu';
import Passengers from './Passengers';
import Ticket from './Ticket';
import Header from '../common/Header';
import Detail from '../common/Detail';

import {
  setDepartDate,
  setDepartStation,
  setArriveStation,
  setSeatType,
  setTrainNumber,
  setSearchParsed,
  fetchInitial,
  createAdult,
  createChild,
  removePassenger,
  updatePassenger,
  hideMenu,
  showGenderMenu,
  showFollowAdultMenu,
  showTicketTypeMenu,
} from './actions.js';

function App(props: any) {
  const {
    trainNumber,
    departStation,
    arriveStation,
    seatType,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed,

    dispatch,
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);

    const { trainNumber, dStation, aStation, type, date }: any = queries;

    dispatch(setDepartDate(dayjs(date).valueOf()));
    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setSeatType(type));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setSearchParsed(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!searchParsed) { return; }

    const url = new URI('/rest/order')
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', seatType)
      .toString();

    dispatch(fetchInitial(url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    departDate,
    departStation,
    arriveStation,
    seatType,
    searchParsed,
  ]);

  const passengersCbs = useMemo(() => {
    return bindActionCreators({
      createAdult,
      createChild,
      removePassenger,
      updatePassenger,
      showGenderMenu,
      showFollowAdultMenu,
      showTicketTypeMenu,
    }, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuCbs = useMemo(() => {
    return bindActionCreators({
      hideMenu,
    }, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chooseCbs = useMemo(() => {
    return bindActionCreators({
      updatePassenger,
    }, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!searchParsed) { return null; }

  return (
    <>
      <div className="header-wrapper">
        <Header title="订单填写" onBack={onBack} />
      </div>
      <Detail
        departDate={departDate}
        arriveDate={arriveDate}
        arriveTimeStr={arriveTimeStr}
        departTimeStr={departTimeStr}
        durationStr={durationStr}
        departStation={departStation}
        arriveStation={arriveStation}
        trainNumber={trainNumber}
      >
        <span style={{ display: 'block' }} className="train-icon"></span>
      </Detail>
      <Ticket price={price} type={seatType} />
      <Passengers
        passengers={passengers}
        {...passengersCbs}
      />
      {
        passengers.length > 0 && (
          <Choose
            passengers={passengers}
            {...chooseCbs}
          />
        )
      }
      <Menu
        show={isMenuVisible}
        {...menu}
        {...menuCbs}
      />
      <Account length={passengers.length} price={price} />
    </>
  )
}

export default connect(
  function mapStateToProps(state) { return state },
  function mapDispatchToProps(dispatch) { return { dispatch } }
)(App);