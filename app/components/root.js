import React from 'react';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleStudent from './SingleStudent';
import SingleCampus from './SingleCampus';
import CreateCampus from './CreateCampus';
import CreateStudent from './CreateStudent';
import Nav from './Nav';
import NotFound from './NotFound';
import HomepageLayout from './HomepageLayout';

import { fetchCampusesThunk } from '../redux/campuses';
import { fetchStudentsThunk } from '../redux/students';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter, NavLink } from 'react-router-dom';

class DisconnectedRoot extends React.Component {
  componentDidMount() {
    this.props.fetchInitialCampuses();
    this.props.fetchInitialStudents();
  }
  render() {
    return (
      <div>
        <main>
          <Nav />
          <Switch>
            <Route exact path="/" component={HomepageLayout} />
            <Route exact path="/campuses" component={AllCampuses} />
            <Route exact path="/students" component={AllStudents} />
            <Route exact path="/campuses/new" component={CreateCampus} />
            <Route exact path="/students/new" component={CreateStudent} />
            <Route path="/campuses/:campusId" component={SingleCampus} />
            <Route path="/students/:studentId" component={SingleStudent} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapState = state => {
  return {
    students: state.students,
    campuses: state.campuses,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchInitialStudents: () => dispatch(fetchCampusesThunk()),
    fetchInitialCampuses: () => dispatch(fetchStudentsThunk()),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedRoot)
);
