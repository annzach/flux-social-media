import React, { Component } from 'react';
import {Link} from 'react-router'

export default class UserWelcome extends Component {
  render() {
    let { profile } = this.props;

    if(!profile) {
      return <p className="navbar-text"></p>
    }


    return (
      <p className="navbar-text">Welcome <Link to="/profileview">{profile.username}</Link>!</p>
    )
  }
}
