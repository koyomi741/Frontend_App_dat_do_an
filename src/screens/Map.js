import React, { Component} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import html_script from "../components/map/html_script";
import Locations, { latitude, longitude} from "../components/map/Locations";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';


export default class Home extends Component {
  _goToMyPosition = (lat, lon) => {
    this.refs["Map_Ref"].injectJavaScript(`
      map.setView([${lat}, ${lon}], 14)
      myLocation.setLatLng([${lat}, ${lon}])
    `);
  };

  _setView = (lat, lon) => {
    this.refs["Map_Ref"].injectJavaScript(`
      map.setView([${lat}, ${lon}], 16)
      var circle = L.circle([${lat}, ${lon}], {
        color: '#3399FF',
        fillColor: '#3399FF',
        fillOpacity: 0.2,
        radius: 200
    }).addTo(map);

    `);
  };

  render() {
    
    const location = this.props.route.params.location
    console.log(location)
    return (
        <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.Container}>
            <View >
                <View style={{alignContent: "center", justifyContent:"center", padding: 10,flexDirection:"row"}}>
                <Ionicons style={{marginRight:10}} name="restaurant" size={24} color="black" />    
                <Text style={{fontSize:20}}>Ẩm Thực Việt Nam</Text>         
                </View >
            </View>
          
          <View style={styles.body}>
            <TouchableOpacity
              style={styles.Button}
              // onPress={() => this._goToMyPosition(latitude, longitude)}
              onPress={() => this._goToMyPosition(20.973221, 105.787)}
            >
              <MaterialIcons name="gps-fixed" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Button1}
              onPress={() => (
                this._setView(location)
              )}
            >
              <Ionicons name="restaurant" size={24} color="black" />
            </TouchableOpacity>

            <WebView
              ref={"Map_Ref"}
              source={{ html: html_script }}
              style={{marginBottom:10, borderRadius:100}}
            />
          </View>
          <Locations style={{ position: "absolute" }} />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#FFCC00",
  },
  headerButton: {
    width: "49%",
    height: 51.87,
    backgroundColor: "white",
    top: 0,
  },
  contentBt: {
    flexDirection: "row",
  },
  headerButton: {
    backgroundColor: "white",
    width: "50%",
    marginTop: 30,
    height: 51.87,
    justifyContent: "center",
  },
  headerButtonText: {
    fontSize: 20,
    textAlign: "center",
  },
  body: {
    //  backgroundColor: 'red',
    flex: 1,
  },
  Button: {
    marginBottom: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#FFCC00",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    right: 0,
  },
  Button1: {
    marginBottom: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#FFCC00",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    bottom: 70,
    right: 0,
  },
});
