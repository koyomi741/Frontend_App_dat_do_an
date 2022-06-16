import { View, Text, TouchableOpacity,  ScrollView, SafeAreaView, Image, TextInput} from 'react-native'
import React, {useState} from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';

export default function Reservation({...props}) {

    const {id, name,  image,  price,  reviews,  rating,  category, location} = props.route.params;
    return (
    <SafeAreaView style={{flex: 1}}>
        <About  id = {id} name = {name} image = {image} price = {price} reviews = {reviews} rating = {rating} category = {category} location = {location} /> 
        <ReservationForm  id={id} name={name}/>
    </SafeAreaView>
  )
}

const ReservationForm = (props) => {

    const [user, setUser] = React.useContext(UserContext);
    const [quantity, setQuantity] = useState("1")
    const [time, setTime] = useState('')
    const [note, setNote] = useState('')

    const addReservation = () => {
        if(quantity == "" || time== "" )
            alert("Vui lòng nhập đầy đủ thông tin");
        else 
        axios.post("http://10.0.2.2:3000/reservation/addOne", {
            restaurant: props.id,
            client: user._id ,
            quantity: Number(quantity),
            time: time,
            status: "Đặt bàn",
            note : note
      })
      .then( res =>  {
        alert("Đăng kí đặt bàn thành công")
      }).catch(err => {
        console.log(err);
      })
    }


    return(
        <ScrollView style={{backgroundColor: "#fff", width: 360, padding:20, paddingBottom: 20, borderRadius: 30, borderWidth: 2, borderColor:"#eee", marginLeft: 25}}>
            <Text style={{fontSize: 25, fontWeight:'700', marginLeft:70, marginBottom: 20}}>Phiếu Đặt Bàn</Text>

            <View style={{marginVertical: 15, marginHorizontal: 10}}>
                <Text style={{fontSize:20}}>Nhà hàng</Text>
                <Text style={{height: 40,fontSize:20, paddingHorizontal: 30, borderWidth: 1, borderRadius: 30,paddingTop: 5}}>{props.name}</Text>
            </View>

            <View style={{marginVertical: 15, marginHorizontal: 10}}>
                <Text style={{fontSize:20}}>Người đặt</Text>
                <Text style={{height: 40,fontSize:20, paddingHorizontal: 30, borderWidth: 1, borderRadius: 30, paddingTop: 5}}>{user.name}</Text>
            </View>

            <View style={{marginVertical: 15, marginHorizontal: 10}}>
                <Text style={{fontSize:20}}>Thời gian</Text>
                <TextInput
                style={{height: 40,fontSize:18, paddingHorizontal: 30, borderWidth: 1, borderRadius: 30}}
                placeholder='Nhập thông tin'
                onChangeText={(text) =>  {
                    setTime(text)
                }}
                >
                </TextInput>
            </View>
                
            <View style={{marginVertical: 15, marginHorizontal: 10}}>
                <Text style={{fontSize:20}}>Số lượng người</Text>
                <TextInput
                style={{height: 40,fontSize:18, paddingHorizontal: 30, borderWidth: 1, borderRadius: 30}}
                placeholder='1'
                onChangeText={(text) =>  {
                    setQuantity(text)
                }}
                >
                </TextInput>
            </View>

            <View style={{marginVertical: 15, marginHorizontal: 10}}>
                <Text style={{fontSize:20}}>Ghi chú</Text>
                <TextInput
                style={{height: 100,fontSize:18, paddingHorizontal: 30, borderWidth: 1, borderRadius: 30}}
                multiline
                numberOfLines={4}
                placeholder='Nhập thông tin'
                onChangeText={(text) =>  {
                    setNote(text)
                }}
                >
                </TextInput>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: "#fff",
                    width: 200,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    backgroundColor: "black",
                    marginTop: 20,
                    marginLeft: 60
                }}
                onPress={ () => addReservation()}
            >
                <Text style={{fontSize: 20, color:"#ffff", fontWeight:'700'}}>Đăng kí đặt bàn</Text>
            </TouchableOpacity>

            <View style={{marginVertical: 30}}/>

        </ScrollView>
    )
}

const About =(props) => {
  
    const description = `${props.category} ${
        props.price ? " • " + props.price : ""
    } • 🎫 • ${props.rating} ⭐ (${props.reviews}+)`;
    
    return (
      <View style={{backgroundColor:"#FFCC00", borderWidth:2}} >
        <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
        <RestaurantName name={props.name} />
        <RestaurantDescription description={description} />
      </View>  
    );
  }
  
  
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
  
  
  
