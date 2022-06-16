import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export default function HeaderCart({navigation: { goBack }}) {
  return (
    <View style={{
        backgroundColor: "#FFCC00",
        alignItems: 'center',
        height:60,
        // marginTop: 20
    }}>
      <Text style={{fontSize: 22, fontWeight:'bold', marginTop:25}}>Giỏ hàng</Text>
      <AntDesign style={{position: 'absolute', right: 20, bottom:10}} name="message1" size={24} color="black" />
      <TouchableOpacity 
        style={{position: 'absolute', left: 20, bottom:10,}}
        onPress={() => goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
}