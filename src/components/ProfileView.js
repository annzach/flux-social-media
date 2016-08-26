import React, { Component } from 'react'
import UserStore from '../stores/UserStore'
import {Link} from 'react-router'
import UserProfile from './UserProfile'

export default class ProfileView extends Component{

  constructor(){
    super();
    this.state = {
      person:UserStore.get()
    }
    this._onChange = this._onChange.bind(this);
  }

 componentDidMount(){
    UserStore.startListening(this._onChange);
  }

  componentWillUnmount(){
    UserStore.stopListening(this._onChange);
  }


  _onChange() {
    this.setState({
      person: UserStore.get()
    });
  }


  render(){
    console.log('person1:', this.state.person)
    return (<div>
      <UserProfile person = {this.state.person}/>
      <p><Link to={{pathname:'/profile',query:{userid:this.state.person._id}}}>Edit Profile</Link></p>
    </div>
    )
  }
}

//<Link to={{pathname:'/profile',query:{userid:profile._id}}}>{profile.username}</Link>!