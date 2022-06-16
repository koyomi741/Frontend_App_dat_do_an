import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function HeaderTabs() {
  const [activeTab, setActiveTab] = useState('Delivery')
  return (
    <View
      style={{flexDirection:'row',alignSelf:'center', marginTop:30}}
    >
       <Text style={{fontSize:25, fontStyle:'italic', fontWeight:'bold'}}>Koyomi Food</Text> 
    </View>
  )
}
