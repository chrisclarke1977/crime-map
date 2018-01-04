import React, { Component } from 'react';
// import './App.css';
import axios from 'axios';
import {Map, TileLayer, Marker} from 'react-leaflet';

const crimeSettings = {
              baseURI: 'https://data.police.uk/api/crimes-street/all-crime',
              params: {
                  lat: "51.5203883", 
                  lng: "-0.120268",
                  date: "2017-11"
              }
          };

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "crimes": [],
      "loaded": false
    };
  }

  componentDidMount() {

    axios.get(crimeSettings.baseURI + "?lat=" + crimeSettings.params.lat + "&lng=" + crimeSettings.params.lng + "&date=" + crimeSettings.params.date)
      .then(res => {
        this.setState({ loaded: true, crimes: res.data });
      });
  }

  renderMark({id, location}){
    const latlng = [location.latitude, location.longitude];

    return (<Marker
              key={id} 
              position={latlng}
              theme="sky" 
              shape="basicDownTriangle" 
            />);
  }

  render() {
    const mcenter = [crimeSettings.params.lat, crimeSettings.params.lng];
    const zoom = 12;

    return (
      <Map center={mcenter} zoom={zoom} style={{width: "400", height: "500"}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        { this.state.loaded? this.state.crimes.map(crime => this.renderMark(crime)) : <div>Loading...</div> }
      </Map>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Game />
    );
  }
}

export default App;
