import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// funcion 
export default function RestaurantItem( {navigation,...props} ) {
  return (
    <>
    { props.restaurantData.map ((restaurant, index) => (
        <TouchableOpacity 
          key = {index}
          activeOpacity={1}
          style={{ marginBottom: 30 }} 
          onPress = {() => (navigation.navigate("RestaurantDetail",{
            id: restaurant._id,
            name: restaurant.name,
            image: restaurant.image_url,
            price: restaurant.price,
            reviews: restaurant.reviews,
            rating: restaurant.rating,
            category: restaurant.category,
            location: restaurant.location,
          } )
          )
        } 
        >
            <View style={{ marginTop: 10, padding: 15, backgroundColor: "white" }} >
              <RestaurantImage image={restaurant.image_url} />
              <RestaurantInfo name={restaurant.name} rating={restaurant.rating} category={restaurant.category} />
            </View>
        </TouchableOpacity>
      ))
    }
    </>
  );
}
const RestaurantImage = (props) => (
    <>
        <Image
            source={{
                uri:props.image,
            }}
            style={{
                width: "100%",
                height:180,
            }}
        />
        {/* tạo nút thích vào biểu tượng trái tim */}
        <TouchableOpacity style={{position:'absolute', right:0, margin:15}}>
            <MaterialCommunityIcons name="heart-outline" size={25} color="#fff"/>
        </TouchableOpacity>
        
    </> 
);

const RestaurantInfo = (props) => (
  <View 
    style ={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View>
    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.name}</Text>
    <Text style={{ fontSize: 13  }} >Đặc sản: Miền {props.category}</Text>
    <Text style={{ fontSize: 13, color:"gray" }} >30-45 min</Text>
    </View>
    <View style={{ 
      backgroundColor:"#eee",
      width:30,
      height:30,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:15 
    }}>
      <Text>{props.rating}</Text>
    </View>


  </View>
)
