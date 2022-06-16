import React from "react";
import { View, SafeAreaView } from 'react-native';

import About from '../components/restaurant/About';
import MenuItems from "../components/restaurant/MenuItems";
import ViewCart from "../components/restaurant/ViewCart";

export default function RestaurantDetail({route,navigation}) {

  return (
    <SafeAreaView style={{backgroundColor:"#FFCC00", flex:1}}>
      <About route={route} navigation={navigation} />
      <View style={{width:"100%", height:2, backgroundColor:"white", opacity:0.5}}/>
      <MenuItems route={route} />
      <ViewCart navigation={navigation} />
    </SafeAreaView>
  )
}

//========================================================================
