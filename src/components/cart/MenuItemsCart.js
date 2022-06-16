import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import UserContext from '../../context/UserContext';



export default function MenuItemsCart({navigation}) {

    const [user, setUser] = React.useContext(UserContext);
    
    const {items} = useSelector( (state) => state.cartReducer.selectedItems) ;

    var total = 0;
    for( let i=0; i < items.length ; i++)
      total += Number(items[i].price) * items[i].quantity

    const totalVND = total+".000₫";
    console.log(totalVND) 

    const dispatch = useDispatch();
    const removeSelectItem = (item) => dispatch({
      type: "REMOVE_FROM_CART",
      payload:{
        ... item,  
      },
    });

    const increaseQuantity = (item) => dispatch({
      type: "INCREASE_THE_NUMBER_OF_PRODUCTS",
      payload:{
        ... item,  
      },
    });

    const reduceQuantity = (item) => dispatch({
      type: "REDUCE_THE_NUMBER_OF_PRODUCTS",
      payload:{
        ... item,  
      },
    });

    // date time
    var showDate = new Date();
    var date = showDate.getDate()+"/"+(showDate.getMonth()+1)+"/"+showDate.getFullYear();
    // var dateTime = showDate.getHours()+":"+showDate.getMinutes()+":"+showDate.getSeconds(); 
    //==========================================
    const addReceipt = () => {
      axios.post("http://10.0.2.2:3000/receipt/addOne", {
        client : user._id,
        total : total*1000,
        time : showDate.getDate()+"/"+(showDate.getMonth()+1)+"/"+showDate.getFullYear() + "-" + showDate.getHours()+":"+showDate.getMinutes()+":"+showDate.getSeconds(),
      })
      .then( res =>  {
        add(res.data._id)
      }).catch(err => {
        console.log(err);
      })
    }
    const add = (receipt_id) => {
      for( let i=0; i < items.length ; i++) {
        addReceiptItem(items[i]._id, items[i].quantity, receipt_id)
      }
    }

    const addReceiptItem = ( food_id, quantity ,receipt_id) => {
      axios.post("http://10.0.2.2:3000/receiptItem/addOne", {
        food :food_id,
        quantity : quantity,
        receipt : receipt_id 
      })
      .then( res =>  {
      }).catch(err => {
        console.log(err);
      })
    }

    return (
        <SafeAreaView style={{backgroundColor:"white", flex:1}} >
        <ScrollView style={{marginBottom:0}} >
      {
        items.map((food, index) => (
          <View key={index} >
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop:5, marginBottom: 10, backgroundColor: "green"}}>
                <MaterialIcons name="restaurant" size={24} color="#fff" />
                <Text style={{fontSize: 20, color:'#fff'}}>  {food.restaurantName}</Text>
            </View>

            <View style={{flexDirection: "row", marginHorizontal:15}}>
                <FoodImage food={food} />
                <FoodInfo food={food} />

                <View style={{borderLeftColor:"gray", borderLeftWidth:1, justifyContent:'center' }}>
                  <TouchableOpacity 
                    style={{ justifyContent:'center'}}
                    onPress={() => removeSelectItem(food)}
                  >
                      <AntDesign style={{marginLeft:20}} name="delete" size={30} color="black" />
                  </TouchableOpacity>
                </View>

            </View>

            <QuantityOder food={food} increaseQuantity={increaseQuantity} reduceQuantity={reduceQuantity}/>

            <View style={{width:"90%", height:1, backgroundColor:"#838582", opacity:0.3, marginLeft:"5%"}}/>
          </View>
  
        ))
      }
        </ScrollView>
        {total ? (
          <PayContainer totalVND={totalVND} navigation={navigation} addReceipt={addReceipt} date = {date} />
        ):(
          <View style={{top: 50,left:0, marginBottom:10, position:'absolute', zIndex:1, alignItems:'center'}}>
            <LottieView style={{ height: 400, alignSelf: 'center', }} 
              source={require('../../../assets/animations/empty-cart.json')}
              autoPlay
              speed={0.5}
              // loop={false}
              />
            <View style={{flexDirection:'row'}}>
              <AntDesign name="warning" size={30} color="green" />
              <Text style={{color: 'green', fontSize: 25, marginLeft:10 }}>Giỏ hàng trống</Text>
            </View>
          </View>
        )}
        
      </SafeAreaView>
  )
}

const FoodInfo = (props) => (
    <View style={{ width: 240, justifyContent: "space-evenly", marginLeft: 20}}>
        <Text style={styles.titleStyle} > {props.food.title} </Text>
        <Text style={{fontStyle: 'italic', color: 'gray'}}>Giá: {props.food.price} ₫ / {props.food.measue}</Text>
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

const QuantityOder = (props) => (
  <View style={{flexDirection: 'row', justifyContent:'center', marginVertical:10, alignContent:'center'}} >
    <TouchableOpacity
      onPress={() => props.increaseQuantity(props.food)}
    >
      <AntDesign name="pluscircle" size={20} color="green" style={{marginTop:4}}/>
    </TouchableOpacity>
    
    <Text style={{fontSize:22, color: 'green', marginHorizontal: 15}} >{props.food.quantity}</Text>

    <TouchableOpacity
      onPress={() => props.reduceQuantity(props.food)}

    >
      <AntDesign name="minuscircle" size={20} color="green"style={{marginTop:4}} />
    </TouchableOpacity>
  </View>
)

const PayContainer = (props) => (
  <View style={{
    backgroundColor: '#FFCC00',
    height:200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems : 'center'
  }}>

    <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
      <Text style={{fontSize: 20, fontWeight:'bold', margin:20, marginTop: 15}} >Ngày</Text>
      <Text style={{fontSize: 20, fontWeight:'bold', margin:20, marginTop: 15}} >{props.date}</Text>
    </View>

    <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
      <Text style={{fontSize: 20, fontWeight:'bold', margin:20, marginTop: 0}} >Tổng tiền</Text>
      <Text style={{fontSize: 20, fontWeight:'bold', margin:20, marginTop: 0}} >{props.totalVND}</Text>
    </View>

    <TouchableOpacity style={{
      backgroundColor: "black", 
      alignItems: 'center',
      justifyContent: 'center', 
      width:300, 
      padding:13,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#eee',
      marginTop : 10,
    }}
      onPress={() => {
        props.addReceipt();
        props.navigation.navigate('OrderCompleted');
      }}
    >
      <Text style={{ color: '#fff',fontSize:20}}>Thanh toán</Text>
    </TouchableOpacity>
  </View>
)

//========================================================================================
  
  const styles = StyleSheet.create({
    titleStyle: {
      fontSize: 19,
      fontWeight: "600",
    },
  });
  