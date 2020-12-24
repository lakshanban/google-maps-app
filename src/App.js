import React from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import Geocode from 'react-geocode'

Geocode.setApiKey("AIzaSyCG1Ya1RmL-SgHfVP_Ds-wYVe7HVJs2KHM")

class App extends React.Component {

  state = {
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    }
  }
  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  getArea = (addressArray) => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  onMarkDragEnd = (event) => {
    let newLat = event.latLng.lat()
    let newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng)
      .then(res => {
        const address = res.results[0].formatted_address
        const addressArray = res.results[0].address_components
        const city = this.getCity(addressArray)
        const area = this.getArea(addressArray)
        const state = this.getState(addressArray)

        this.setState({
          address: (address) ? address : '',
          area: (area) ? area : '',
          city: (city) ? city : '',
          state: (state) ? state : '',
          markerPosition: {
              lat: newLat,
              lng: newLng
          },
          mapPosition: {
              lat: newLat,
              lng: newLng
          },
      })
      })

  }

  render() {

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
      >
        <Marker
          draggable={true}
          onDrag={this.onMarkDragEnd}
          position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng}}
        >
          <InfoWindow>
            <h4>{this.state.city + ", " + this.state.area+ ", "+ this.state.state}</h4>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    ));


    return (
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCG1Ya1RmL-SgHfVP_Ds-wYVe7HVJs2KHM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default App;
