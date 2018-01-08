import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Map, TileLayer} from 'react-leaflet';
import ClusterLayer from 'react-leaflet-cluster-layer';

const crimeSettings = {
              baseURI: 'https://data.police.uk/api/crimes-street/all-crime',
              params: {
                  lat: "51.5203883", 
                  lng: "-0.120268",
                  date: "2017-11"
              }
          };

class CrimeClusterComponent extends React.Component {

  render() {
    const style = {
      border: 'solid 2px darkgrey',
      borderRadius: '8px',
      backgroundColor: 'white',
      padding: '1em',
      textAlign: 'center'
    };
    const cluster = this.props.cluster;

    if (cluster.markers.length === 1) {
      return (
        <div style={style} >{cluster.markers[0].text}</div>
      );
    }

    return (
      <div style={style}>{cluster.markers.length} items</div>
    );
  }
}

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
        const c = Array.from(res.data, crime => Object.assign({},{ position: { 
            lat: crime.location.latitude, 
            lng: crime.location.longitude 
          }, 
          text: crime["category"]
        }));  
        this.setState({ loaded: true, crimes: c });
      });
  }

  render() {
    const mcenter = crimeSettings.params;
    const zoom = 12;

    return (
      <div id="container" style={{width: "400", height: "500", border: "red 2px solid"}}>
      { this.state.loaded?
        <Map center={mcenter} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <ClusterLayer markers={this.state.crimes} clusterComponent={CrimeClusterComponent} /> 
        </Map>
        : <div>Loading...</div> }
      </div>
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
/*

Output marker shape (array of): 
{
    position: { lng: -122.673447, lat: 45.5225581 },
    text: 'Voodoo Doughnut',
  },
  
Input Crime shape (array of ):
{
  category: "anti-social-behaviour"
  context: ""
  id: 60998443
  location: {
    latitude: "51.513833"
    longitude: "-0.134292"
    street: {id: 956442, name: "On or near Wardour Street"}
  }
  id: 956442
  name: "On or near Wardour Street"
  location_subtype: ""
  location_type: "Force"
  month: "2017-11"
  outcome_status: null
  persistent_id: ""
}

<ClusterLayer markers={this.state.crimes} clusterComponent={CrimeClusterComponent} /> 

*/