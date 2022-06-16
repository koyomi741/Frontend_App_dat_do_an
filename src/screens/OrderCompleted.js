import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

export default function OrderCompleted({navigation}) {

  const {items} = useSelector( (state) => state.cartReducer.selectedItems) ;

  var total = 0;
  for( let i=0; i < items.length ; i++)
    total += Number(items[i].price) * items[i].quantity

  const totalVND = total+".000₫";

  const dispatch = useDispatch();
  const resetSelectItem = () => dispatch({
    type: "RESET_DATA",
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#fff", alignItems:'center'}}>
      {/* checkbox animation */}
      <View>
        <LottieView style={{ height: 100, alignSelf: 'center', marginTop: 20, marginBottom:10}} 
          source={require('../../assets/animations/check.json')}
          autoPlay
          speed={0.5}
          // loop={false}
        />
        <Text style={{marginTop: 20, fontSize:30, color:'green', fontWeight: 'bold'}}>{totalVND}</Text>
      </View>

      <TouchableOpacity 
        style={{position: 'absolute', left: 20,top:35, bottom:10,zIndex:1}}
        onPress={() => (resetSelectItem(),navigation.navigate("Home"))}
      >
        <Ionicons name="arrow-back" size={40} color="black" />
      </TouchableOpacity>
      
      {/* //============================================ */}
      <ScrollView style={{marginTop:20}} >
      {
        items.map((food, index) => (
          <View key={index} >
            <View style={{flexDirection: "row", marginHorizontal:15, marginVertical:10}}>
                <FoodInfo food={food} />
                <FoodImage food={food} />
            </View>
            <View style={{width:"90%", height:1, backgroundColor:"#838582", opacity:0.3, marginLeft:"5%"}}/>

          </View>
        ))
      }
        </ScrollView>

      {/* cooking  */}
      <LottieView style={{ height: 200, alignSelf: 'center', marginBottom: 20}} 
        source={require('../../assets/animations/cooking.json')}
        autoPlay
        speed={0.5}
        // loop={false}
      />
    </SafeAreaView>
  )
}

//=============================================

//=============================================

const FoodInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly"}}>
      <Text style={{fontSize: 19,fontWeight: "600",}} > {props.food.title} </Text>
      <Text style={{fontStyle: 'italic', color: 'gray'}}>Số lượng: {props.food.quantity}</Text>
      <Text style={{fontSize:20, color: 'green'}}>Tổng: {Number(props.food.price)*props.food.quantity}.000₫</Text>
  </View>
);

const FoodImage = (props) => (
  <View >
    <Image
      source={{ uri: props.food.image }}
      style={{
        width: 70,
        height: 70,
        borderRadius: 8,
      }}
    />
  </View>
)
