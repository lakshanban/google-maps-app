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
    let city= '';
    addressArray.forEach(element => {
      if(element.types[0] && 'administrative_area_level_2' === element.types[0]){
        city = element.long_name
      }
    })
    return city;
  }

  getArea = (addressArray) => {

  }

  getState = (addressArray) => {

  }

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
      console.log(city)
    })

  }

  render() {

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        <Marker
          draggable={true}
          onDrag={this.onMarkDragEnd}
          position={{ lat: -34.397, lng: 150.644 }}
        >
          <InfoWindow>
            <h4>hellow</h4>
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
