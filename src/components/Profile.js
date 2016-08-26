import React, { Component } from 'react';
import UserActions from '../actions/UserActions'
import UserStore from '../stores/UserStore'
import {browserHistory} from 'react-router'


export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      name:'',
      age:'',
      address:'',
      imageurl:''
    
    }
     this._onInputChange = this._onInputChange.bind(this);
    this._submit = this._submit.bind(this);

  }

  
    _onInputChange(e) {
    let key = e.target.dataset.statekey;
    let value = e.target.value;

    this.setState({
      [key]: value
    });
  }

  _submit(e) {
    e.preventDefault();
    let { name, age, address,imageurl } = this.state;
    let _id= this.props.location.query.userid;
    console.log('_id',_id)
    let userObj = this.state;
    console.log('this.state',this.state);
    UserActions.editProfile(_id,userObj);
    browserHistory.push('/ProfileView')


 
}

  render() {
    let { name, age, address,imageurl } = this.props;

    return (
      <div>
        <form onSubmit={this._submit}>
        <h1 className="text-center">Profile</h1>
        
        <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" placeholder="Name" value={name} data-statekey='name' onChange={this._onInputChange}/>
        </div>

         <div className="form-group">
            <label>Image</label>
            <input type="text" className="form-control" placeholder="Image" data-statekey='imageurl' onChange={this._onInputChange}/>
        </div>

         <div className="form-group">
            <label>Age</label>
            <input type="text" className="form-control" placeholder="Age" value={age} data-statekey='age' onChange={this._onInputChange}/>
         </div>

         <div className="form-group">
            <label>Address</label>
            <input type="text" className="form-control" placeholder="Address" value={address} data-statekey='address' onChange={this._onInputChange}/>
        </div>
         <button type="submit" className="btn btn-default">Save Changes</button>
        </form>
       
      </div>
    )
  }
}
