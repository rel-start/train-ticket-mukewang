/* eslint-disable import/first */

import './App.css';
import React, {
  useCallback, useEffect, useMemo, lazy, Suspense,
} from 'react';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';

import Detail from '../common/Detail';
import Candidate from './Candidate';
const Schedule = lazy(() => import(/*webpackChunkName: "ticket-Schedule"*/ "./Schedule"));
import Header from '../common/Header';
import Nav from '../common/Nav';

import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setDepartDate,
  setSearchParsed,
  nextDate,
  prevDate,
  setArriveDate,
  setDepartTimeStr,
  setArriveTimeStr,
  setDurationStr,
  toggleIsScheduleVisible,
  setTickets,
} from './actions.js';
import { h0 } from '../common/fp.js';
import useNav from '../common/useNav';
import { bindActionCreators } from 'redux';
import { TrainContext } from './context.js';

function App(props: any) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    trainNumber,
    departStation,
    arriveStation,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch,
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { aStation, dStation, date, trainNumber }: any = queries;

    dispatch(setArriveStation(aStation));
    dispatch(setDepartStation(dStation));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setDepartDate(h0(dayjs(date).valueOf())));

    dispatch(setSearchParsed(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber]);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url: any = new URI('/rest/ticket')
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('trainNumber', trainNumber);

    fetch(url)
      .then(res => res.json())
      .then(result => {
        const {
          detail: {
            arriveDate,
            arriveTimeStr,
            departTimeStr,
            durationStr,
          },
          candidates
        } = result;

        dispatch(setArriveDate(arriveDate));
        dispatch(setDepartTimeStr(arriveTimeStr));
        dispatch(setArriveTimeStr(departTimeStr));
        dispatch(setDurationStr(durationStr));
        dispatch(setTickets(candidates));
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParsed]);

  const {
    prev,
    next,
    isPrevDisabled,
    isNextDisabled,
  } = useNav({ departDate, dispatch, prevDate, nextDate });

  const detailCbs = useMemo(() => {
    return bindActionCreators({
      toggleIsScheduleVisible,
    }, dispatch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!searchParsed) { return null; };

  return (
    <>
      <div className="header-wrapper">
        <Header title={trainNumber} onBack={onBack} />
      </div>
      <Nav
        date={departDate}
        prev={prev}
        next={next}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
      />
      <Detail
        departDate={departDate}
        arriveDate={arriveDate}
        arriveTimeStr={arriveTimeStr}
        departTimeStr={departTimeStr}
        durationStr={durationStr}
        departStation={departStation}
        arriveStation={arriveStation}
        trainNumber={trainNumber}
        {...detailCbs}
      />
      {
        isScheduleVisible && (
          <div onClick={() => dispatch(toggleIsScheduleVisible())} className="mask">
            <Suspense fallback={<span>loading</span>}>
              <Schedule
                date={departDate}
                trainNumber={trainNumber}
                departStation={departStation}
                arriveStation={arriveStation}
              />
            </Suspense>
          </div>
        )
      }
      <TrainContext.Provider value={{ trainNumber, departStation, arriveStation, departDate }}>
        <Candidate tickets={tickets} />
      </TrainContext.Provider>
    </>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch }
  }
)(App);