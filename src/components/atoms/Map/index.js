import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const Map = ({label = '', setLatitude, setLongitude}) => {
  function onMessage(data) {
    setLatitude(
      data.nativeEvent.data
        .split(',')[0]
        .replace(/LatLng[()]/g, '')
        .trim(),
    );
    setLongitude(
      data.nativeEvent.data.split(',')[1].replace(/[)]/g, '').trim(),
    );
  }

  const webviewRef = useRef();

  return (
    <View>
      {label.length ? <Text style={styles.label}>{label}</Text> : null}
      <WebView
        ref={webviewRef}
        scalesPageToFit={false}
        nestedScrollEnabled={true}
        mixedContentMode="compatibility"
        onMessage={onMessage}
        style={{height: 250}}
        source={{
          html: ` 
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Maps</title>
        <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin="" />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossorigin=""></script>
          <style>
          html,
          body {
            height: 100%;
            margin: 0;
          }
          .leaflet-container {
            height: 400px;
            width: 600px;
            max-width: 100%;
            max-height: 100%;
          }
          </style>
          </head>
          <body>
          <div id="map" style="width: 600px; height: 400px"></div>
          <script>
          const map = L.map('map').setView([-7.048491, 107.588271], 13);
          
          const tiles = L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                    maxZoom: 19,
                    attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                  },
                  ).addTo(map);

                  var marker;
                  map.on('click', function (e) {
                    if (marker) { // check
                    map.removeLayer(marker); // remove old layers
                  }
                  
                  window.ReactNativeWebView.postMessage(e.latlng.toString());
                  
                  marker = new L.Marker(e.latlng).addTo(map); // set New Layer         
                });
                </script>
            </body>
          </html>
          `,
        }}
      />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  label: {fontSize: 16, fontFamily: 'Poppins-Regular', color: '#020202'},
});
