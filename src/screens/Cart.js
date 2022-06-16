import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import HeaderCart from '../components/cart/HeaderCart'
import MenuItemsCart from '../components/cart/MenuItemsCart'

export default function Cart({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: "#eee", flex:1}}>
      <HeaderCart navigation={navigation}/>
      <MenuItemsCart navigation={navigation}/>
    </SafeAreaView>
  )
}