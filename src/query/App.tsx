import React from 'react';
import { connect } from 'react-redux';

import Nav from '../common/Nav';
import List from './List';
import Bottom from './Bottom';

function App(props: any) {
  return (
    <>
      <Nav />
      <List />
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