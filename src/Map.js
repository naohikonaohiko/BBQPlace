import React from 'react';
import _ from 'lodash';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {
  GoogleMap, 
  Marker, 
  withGoogleMap, 
  withScriptjs, 
  Circle
} from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

// 短期的 TODO

// 長期的TODO
// google map api key をファイルから読み込む。そのファイルは gitignore
// http リファラ設定

// 経緯
// github を react google map で検索。star 数が多い順に使ってみる
// https://github.com/topics/react?q=react+map&unscoped_q=react+map
// 1 google-map-react  は circle が簡単に描けない。。。
// 2 react-google-maps は circle が簡単に描けるが、黒色固定。。。
// 3 react-leaflet     はデフォルト OSM で google map 化が手間そう。
// 4 react-google-maps で色変えられた。のでこのまま進む。

import mapApiKey from './mapApiKey';
console.log(`getApiKey = ${mapApiKey}`);
const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}`;
console.log(`googleMapsUrl = ${googleMapsUrl}`);

// react-google-maps

const MyCircle = (props) => {
  return (
    <Circle
      center={{ lat: props.lat, lng: props.lng }}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
      // defaultCenter={{ lat: 35.663405, lng: 139.87312 }}
      defaultRadius={props.radius}
      options={props.options}
    />
  );
};

class MyMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      map: null,
      googleMapURL: googleMapsUrl,
      stations: [
/*
        {
          name: "東京駅",
          lat: 35.681167,
          lng: 139.767052
        },
*/
        {
          name: "新浦安駅",
          lat: 35.632896,
          lng: 139.91256
        },
        {
          name: "葛西駅",
          lat: 35.663405,
          lng: 139.87312
        },
        {
          name: "幕張本郷駅",
          lat: 35.672745,
          lng: 140.042304
        },
        {
          name: "両国駅",
          lat: 35.695036,
          lng: 139.793833
        },
        {
          name: "武蔵小杉駅",
          lat: 35.576634,
          lng: 139.659466
        },
        {
          name: "新宿駅",
          lat: 35.689592,
          lng: 139.700413
        },
        {
          name: "流山おおたかのもり駅",
          lat: 35.871811, 
          lng: 139.925043
        },
        {
          name: "花小金井駅",
          lat: 35.726144,
          lng: 139.513313
        },
        {
          name: "読売ランド駅",
          lat: 35.614768,
          lng: 139.52815
        },
      ],
      circleOptions: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.10
      },
      radius: 28000,
      sliderValue: 2000,  
    };
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log(`nextState.sliderValue = ${nextState.sliderValue}`);
    console.log(`this.state.sliderValue = ${this.state.sliderValue}`);
    if (nextState.sliderValue != this.state.sliderValue) {
      return true;
    }
    return false;
  }

  mapLoaded(map) {
    if(this.state.map !== null)
      return this.setState({map: map});
  };
  
  mapMoved() {
  };

  zoomChanged() {
    // console.log(this.state.map.getZoom())
  };

  handleOnChange = (value) => {
    console.log(`handleOnChange`);
    this.setState({sliderValue: value});
    // this.setState({sliderValue: this.state.sliderValue});
  };

  handleOnChangeStart = (props) => {
    console.log(`handleOnChangeStart`);
    this.setState({sliderValue: this.state.sliderValue});
  };

  render() {
    const MyMapComponent = withScriptjs(withGoogleMap(props => {
      // let ref = {};
      let { volume } = this.state;
      return <GoogleMap
              onIdle = {this.mapMoved.bind(this)}
              defaultZoom={11}
              
              defaultCenter={{ lat: 35.712364, lng: 139.776188 }} // 上野駅
              // defaultCenter={{ lat: 35.729374, lng: 139.791234 }} // 三ノ輪駅
              // defaultCenter={{ lat: 35.733319, lng: 139.799056 }} // 南千住駅
              // defaultCenter={{ lat: 35.681167, lng: 139.767052 }} // 東京駅
              ref = {this.mapLoaded.bind(this)}
              onZoomChanged= {this.zoomChanged.bind(this)}
             >
          {_.map(props.stations, (stations, index) => {
            return (
              <MyCircle
                key={index}
                lat={props.stations[index].lat}
                lng={props.stations[index].lng}
                radius={props.sliderValue}
                options={props.options}
              />
            );
          })}
          {_.map(props.stations, (stations, index) => {
            return (
              <Marker
                key={index}
                position={{ lat: props.stations[index].lat, lng: props.stations[index].lng }}
                defaultTitle={props.stations[index].name}
              />
            );
          })}
          </GoogleMap>
      }))
  
      return (
        <div>
          <Slider
            min={1000}
            max={28000}
            step={1000}
            value={this.state.sliderValue}
            onChangeStart={this.handleOnChangeStart}
            onChangeComplete={this.handleOnChangeComplete}
            onChange={this.handleOnChange}
          />
          <div className='value'>radius: {this.state.sliderValue / 1000 }[km]</div>
          <MyMapComponent
              googleMapURL={this.state.googleMapURL}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `800px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              options={this.state.circleOptions}
              stations={this.state.stations}
              radius={this.state.radius}
              sliderValue={this.state.sliderValue}
            />
        </div>
      )
  }
}

export default MyMapComponent;
