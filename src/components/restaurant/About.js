import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from "@expo/vector-icons";

export default function About( {navigation ,...props}) {
  
  const {id, name,  image,  price,  reviews,  rating,  category, location} = props.route.params;

  const description = `${category} ${
    price ? " • " + price : ""
  } • 🎫 • ${rating} ⭐ (${reviews}+)`;
  
  return (
    <View style={{backgroundColor:"#FFCC00", borderWidth:2}} >
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
      <Map navigation={navigation} location={location}/>
      <View style={{position: 'absolute',top: 190,right: 80}}
      >  
          <TouchableOpacity 
              style={{
                  backgroundColor:"black",
                  paddingTop: 9,
                  paddingBottom: 9,
                  borderRadius: 100,
                  position: "relative",
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#eee'
              }}        
              onPress={() => navigation.navigate("Reservation",{
                id: id,
                name: name,
                image: image,
                price: price,
                reviews: reviews,
                rating: rating,
                category: category,
                location: location,
              }) }
          >
              <Ionicons style={{}} name="restaurant" size={18} color="#FFF" /> 
          </TouchableOpacity>

          <Text style={{color:"black", marginTop: 6, marginLeft: 0,fontSize:15 }} >Đặt bàn</Text>
      </View>
    </View>  
  );
}

const RestaurantImage = (props) => (
    <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
);


const RestaurantName = (props) => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: "600",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.name}
  </Text>
);
  
const RestaurantDescription = (props) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: "400",
      fontSize: 15.5,
    }}
  >
    {props.description}
  </Text>
);

const Map = (props) => (
  <View >
    <TouchableOpacity 
      style={{position:"absolute", padding:10, margin:10, bottom:0, right:0 ,borderRadius:100, backgroundColor:"black", marginBottom:30, borderWidth: 1, borderColor: '#eee'}}
      onPress={() => props.navigation.navigate("Map",{
        location: props.location,
      }) }
    >
      <Entypo name="location" size={15} color="white" />        
    </TouchableOpacity>
    <Text style={{position:"absolute" ,bottom:0, right:0, padding:5, paddingRight:15 }}>GPS</Text>
  </View>
);

