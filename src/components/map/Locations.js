import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

let apiKey = 'YOUR_API_KEY';

export let latitude;
export let longitude;
export let addresses;
import * as Location from 'expo-location';
export default function() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [getLocation, setGetLocation] = useState(false);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      Location.setGoogleApiKey(apiKey);
      let {coords} = await Location.getCurrentPositionAsync();
      setLocation(coords);
      if (coords) {
        let {longitude, latitude} = coords;
        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        setAddress(regionName[0]);
      }
    })();
  }, [getLocation]);
  {
    !location
      ? 'Waiting'
      : [
          (latitude = location.latitude),
          (longitude = location.longitude),
          (addresses = JSON.stringify(address?.['subregion'])),
        ];
  }
  return <View></View>;
}