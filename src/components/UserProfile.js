import React , {Component} from 'react'

export default class UserProfile extends Component {
render(){
  console.log('userprofile:', this.props.person)
 return (
  <div>
     <img src={this.props.person.imageurl} width ="250 px"alt="N/A"/><br/>
     <h4><label>Name:</label>{this.props.person.name}</h4><br/>
     <h4><label>Age:</label>{this.props.person.age}</h4><br/>
     <h4><label>Address:</label>{this.props.person.address}</h4><br/>
   </div>
 )
}

}