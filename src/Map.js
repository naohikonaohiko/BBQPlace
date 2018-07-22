import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { compose, lifecycle, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from 'react-google-maps';

import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

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

// react-google-maps
const MyMapComponent = compose(
  lifecycle({
    shouldComponentUpdate() {
      console.log(`shouldComponentUpdate`);
    },
    componentDidMount() {
      console.log(`componentDidMount`);
    }
  }),
  withProps({
    googleMapURL: googleMapsUrl,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    stations: [
      {
        name: "東京駅",
        lat: 35.681167,
        lng: 139.767052
      },
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
    sliderValue: 14000,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <div>
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 35.681167, lng: 139.767052 }}>
      {/*
        {props.isMarkerShown && (
        <Marker position={{ lat: 35.681167, lng: 139.767052 }} />,
      */}
      {_.map(props.stations, (stations, index) => {
        return (
          <Hello />,
          <MyCircle
            key={index}
            lat={props.stations[index].lat}
            lng={props.stations[index].lng}
            radius={props.radius}
            options={props.circleOptions}
        />
        );
      })}
    </GoogleMap>
    <Slider
      min={1000}
      max={28000}
      value={props.sliderValue}
      onChange={handleOnChange}
    />
  </div>
));

class Hello extends React.Component {
  render() {
    return (
      <div>hello
      </div>
    );
  }
}

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

const handleOnChange = (props) => {
  console.log(`handleOnChange props`);
};

export default MyMapComponent;
