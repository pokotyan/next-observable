import React, {Component} from "react";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as githubActions from "./actions/github";

class App extends Component {
  fetchGithubUser = () => {
    const { githubActions: { fetchGithubUser } } = this.props;

    fetchGithubUser({
      userName: 'torvalds'
    });
  }

  render() {
    const {
      github: { user, isFetching }
    } = this.props;

    return (
      <div>
        <div
          onClick={this.fetchGithubUser}
        >githubユーザー取得</div>
        {
          isFetching ? <CircularProgress /> :
          <div>{JSON.stringify(user)}</div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  github: state.github,
});

const mapDispatchToProps = dispatch => ({
  githubActions: bindActionCreators(githubActions, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));