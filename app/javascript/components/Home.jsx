import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      usersList: []
    }
  }
  componentDidMount() {
    axios.get('/users.json').then(res => {
      this.setState({
        usersList: res.data
      });
    });
  }

  handleReadCSV = (data) => {
    axios.post('/users.json', {data}).then(res => {
      this.setState({
        usersList: res.data
      });
    });
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  }

  handleImportOffer = () => {
    this.fileInput.current.click();
  }

  render() {
    let usersData = ""
    usersData = this.state.usersList.map( (user) => 
      <tr key={user.id} >
        <td>{user.id}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.age}</td>
        <td>{user.sex}</td>
      </tr>
    );
   return (
      <div className="jumbotron">
        <h1>Upload CSV File</h1>
         <CSVReader
          onFileLoaded={this.handleReadCSV}
          inputRef={this.fileInput}
          style={{display: 'none'}}
          onError={this.handleOnError}
        />
        <button onClick={this.handleImportOffer}>Import</button>

        <br/>
        <br/>
        <table>
          <thead>
            <tr>
              <th>Row id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Sex</th>
            </tr>
          </thead>
          <tbody>
            {
              usersData
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Home;