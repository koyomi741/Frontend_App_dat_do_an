import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, {useEffect} from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios"


// export default function MenuItems({restaurantName}) {
export default function MenuItems({...props}) {

  const {id, name} = props.route.params;

  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) => dispatch({
    type: "ADD_TO_CART",
    payload:{
      ... item,  
      restaurantName: name, 
      checkboxValue: checkboxValue, 
      quantity : 1
    },
  });

  // get API
  const [ foodsDataBase, setFoodsDataBase ] = React.useState([])
  
  useEffect (() => {
    axios({
      method: "get",
      url: "http://10.0.2.2:3000/food/getByRestaurant/"+id,
      data: null,
    })
      .then( (res) => {
        setFoodsDataBase(res.data);
        console.log( "Số lượng món ăn là: " +  res.data.length )
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])


  return (
    <View style={{borderWidth:5, borderRadius:30, backgroundColor:"white", marginBottom:10, height:"68%"}} >
      <ScrollView style={{marginBottom:0}} >
    {
      foodsDataBase.map((food, index) => (
        <View key={index} >
          <View style={styles.menuItemStyle}>
            <BouncyCheckbox 
              fillColor='green'
              onPress={(checkboxValue) => selectItem(food, checkboxValue)}
            />
            <FoodInfo food={food} />
            <FoodImage food={food} />
          </View>
          <View style={{width:"90%", height:1, backgroundColor:"#838582", opacity:0.3, marginLeft:"5%"}}/>
        </View>

      ))
    }
      </ScrollView>
    </View>
    
  );
}

const FoodInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly"}}>
      <Text style={styles.titleStyle} > {props.food.title} </Text>
      <Text> {props.food.description} </Text>
      <Text> {props.food.price} ₫ / {props.food.measue} </Text>
  </View>
);

const FoodImage = (props) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
      }}
    />
  </View>
)
//========================================================================================

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
    // backgroundColor:"red",
  },
});
