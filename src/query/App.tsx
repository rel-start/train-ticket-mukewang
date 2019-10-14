import React from 'react';
import { connect } from 'react-redux';


function App(props: any) {
  return (
    <div>app</div>
  )
}

export default connect<any, any, any, any>(
  function mapStateToProps(state: any) { return {}},
  function mapDispatchToProps(dispatch: any) { return {}}
)(App);