import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTabs({navigation}) {

  return (
    <View style={{backgroundColor:"#FFCC00",  borderTopWidth:1, borderColor:"#eee"}}>
      <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      
      <Icon icon="home" text="Nhà" nextScreen="Home" navigation={navigation} />
      <Icon icon="map-marked" text="Bản Đồ" nextScreen="Map" navigation={navigation} />
      <Icon icon="shopping-cart" text="Giỏ Hàng" nextScreen="Cart" navigation={navigation} />
      <Icon icon="history" text="Lịch sử" nextScreen="History" navigation={navigation} />
      <Icon icon="user-edit" text="Tài Khoản" nextScreen="Profile" navigation={navigation} />

    </View>
    </View>
    
  );
}
 
const Icon = (props) => (
  <TouchableOpacity
    onPress={() => props.navigation.navigate(props.nextScreen) }
  >
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);
