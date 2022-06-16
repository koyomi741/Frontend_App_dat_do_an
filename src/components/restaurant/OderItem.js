import { View, Text } from 'react-native'
import React from 'react'

export default function OderItem({item}) {

  const { title, price} = item;

  return (
    <View style={{
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 20,
      borderBottomWidth: 1,
      borderColor: "#999",
    }}>
      <Text style={{fontWeight:"600", fontSize:16 }}>{title}</Text>
      <Text style={{opacity:0.7, fontSize: 16}}>{price}₫</Text>
    </View>
  )
}  