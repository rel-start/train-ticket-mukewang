import './App.css';
import React, {
  useCallback,
  useMemo,
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../common/Header';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Journey from './Journey';
import Submit from './Submit';
import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
} from './actions.js';

function App(props: any) {
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData,
    departDate,
    isDateSelectorVisible,
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  /*const doExchangeFromTo = useCallback(() => {
    dispatch(exchangeFromTo());
  }, []);

  const doShowCitySelector = useCallback((m) => {
    dispatch(showCitySelector(m));
  }, []);*/

  const journeyCbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector,
    }, dispatch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideCitySelector,
      fetchCityData,
      onSelect: setSelectedCity,
    }, dispatch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const departDateCbx = useMemo(() => {
    return bindActionCreators({
      onClick: showDateSelector
    }, dispatch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateSelectorCbx = useMemo(() => {
    return bindActionCreators({
      onBack: hideDateSelector
    }, dispatch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form className="form">
        <Journey
          from={from}
          to={to}
          /*exchangeFromTo={doExchangeFromTo}
          showCitySelector={doShowCitySelector}*/
          {...journeyCbs}
        />
        <DepartDate /*当前departDate为undefined*/time={departDate} {...departDateCbx} />
        <HighSpeed />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector
        show={isDateSelectorVisible}
        {...dateSelectorCbx}
      />
    </>
  )
}

export default connect(
  function mapStateToProps(state: any) {
    return state;
  },
  function mapDispatchToProps(dispatch: any) {
    return { dispatch };
  }
)(App);