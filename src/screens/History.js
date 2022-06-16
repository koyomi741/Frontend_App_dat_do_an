import axios from "axios";
import React,{useEffect, useState} from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Dimensions } from "react-native";
import LottieView from 'lottie-react-native';

import UserContext from '../context/UserContext';

export default function ({ navigation }) {
  const [user, setUser] = React.useContext(UserContext);
  const [data,setData] = useState([]);
  const [reservation, setReservation ] = useState([]);
  const [check,setCheck] = useState(false)   //false : mua hàng, true: đặt bàn


  useEffect(() =>{
    axios({
        method: "get",
        url:"http://10.0.2.2:3000/receipt/getByClient/" + user._id,
        data: null,
      })
      .then( (res) => {
          setData(res.data);
          console.log( "Số lượng hóa đơn là: " +  res.data.length )
      })
      .catch((err) => {
          console.log(err);
      });
      //=============================
 
        axios({
            method: "get",
            url: "http://10.0.2.2:3000/reservation/getByClient/" + user._id,
            data: null,
          })
            .then( (res) => {
              console.log(res.data);
              setReservation(res.data);
              console.log( "Số lượng đơn đặt bàn là: " +  res.data.length )
            })
            .catch((err) => {
              console.log(err);
            });

  },[]);

  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"#F8F8F8", }}>
      <HeaderAccount user={user} check={check} setCheck={setCheck} />
      <BodyHistory user={user} navigation={navigation} data={data} reservation={reservation} check={check} />
    </SafeAreaView>
  );
}

const HeaderAccount = (props) => {
  
  const bgcolor = (data) => {
    if(props.check == false && data =='Mua hàng')  return "black"
    if(props.check == false && data =='Đặt bàn')  return "white"
    if(props.check == true && data =='Mua hàng')  return "white"
    if(props.check == true && data =='Đặt bàn')  return "black"
  }

  const textcolor = (data) => {
    if(props.check == true && data =='Mua hàng')  return "black"
    if(props.check == true && data =='Đặt bàn')  return "white"
    if(props.check == false && data =='Mua hàng')  return "white"
    if(props.check == false && data =='Đặt bàn')  return "black"
  }

  return (
    <View style={{height:150, alignItems:"center", backgroundColor:"#FFCC00"}}>  
      <Text style={{fontSize:25, color:"white",marginTop:30, position:"absolute"}}>HISTORY</Text>

      <View style={{flexDirection: "row", marginTop: 80}}>
        <TouchableOpacity style={{backgroundColor: bgcolor('Mua hàng'), width:120, borderRadius:30, padding:7, justifyContent:"center", alignItems:"center" }}
          onPress={() => {if(props.check==true) props.setCheck(false)}}
        >
          <Text style={{color:textcolor('Mua hàng'), fontSize:20}}>Mua hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor: bgcolor('Đặt bàn'), width:120, borderRadius:30, padding:7, justifyContent:"center", alignItems:"center" }}
          onPress={() => {if(props.check==false) props.setCheck(true)}}
        >
          <Text style={{color:textcolor('Đặt bàn'), fontSize:20}}>Đặt bàn</Text>
        </TouchableOpacity>
      </View>

    </View>
);
}

const BodyHistory = (props) => (
  <ScrollView
    style={{
        backgroundColor: "#FFCC00", 
        marginTop: 10, 
        height: 10, 
        width: 360, 
        marginLeft: 25, 
        borderRadius: 30, 
        marginBottom: 30, 
        padding: 20,
    }}
  >
    {
      !props.check ?
      <>
      {
        props.data.length == 0 ? (
        <LottieView 
          style={{ height: 400, alignSelf: 'center', marginBottom:10}} 
          source={require('../../assets/animations/empty-state.json')}
          autoPlay
          speed={0.5}
        />
        ) : (
        <>
        { props.data.map ((tmp, index) => (
          <View 
            key = {index}
            activeOpacity={1}
            style={{ marginBottom: 30 }} 
          >
            <ItemHistory  data={tmp}/>
          </View>
        ))}
        </>
        )
        }
              
        </>
          :
              <>
               {
                    props.reservation.length == 0 ? (
                      <LottieView 
                          style={{ height: 400, alignSelf: 'center', marginBottom:10}} 
                          source={require('../../assets/animations/empty-state.json')}
                          autoPlay
                          speed={0.5}
                      />
                    ) : (
                      <>
                      { props.reservation.map ((tmp, index) => (
                    <View 
                      key = {index}
                      activeOpacity={1}
                      style={{ marginBottom: 30 }} 
                      >
                          <ItemReservation  data={tmp}/>
                      </View>
                  ))
                  }
                      </>
                    )
                }
                
              </>
    }
      
  </ScrollView>
);



const ItemHistory = (props) => (

    <View style={{
        backgroundColor: "#fff", 
        marginVertical: 10, 
        height:120, 
        justifyContent: 'center', 
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#eee",
        borderRadius: 10,
    }}>
        <View style={{flexDirection: 'row', marginTop:10}}>
            <Text style={{fontSize: 15, fontStyle: 'italic', color: 'gray'}}>Mã hóa đơn: </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.data._id}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop:10}}>
            <Text style={{fontSize: 15, fontStyle: 'italic', color: 'gray'}}>Thời gian: </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.data.time}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop:10}}>
            <Text style={{fontSize: 15, fontStyle: 'italic', color: 'gray'}}>Tổng tiền: </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.data.total} đồng</Text>
        </View>      
    </View>
);

const ItemReservation = (props) => (

  <View style={{
      backgroundColor: "#fff", 
      marginVertical: 10, 
      height:200, 
      justifyContent: 'center', 
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#eee",
      borderRadius: 10,
  }}>
      <View style={{flexDirection: 'row', marginTop:10}}>
          <Text style={{fontSize: 15, fontStyle: 'italic', color: 'gray'}}>Nhà hàng: </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.data.restaurant.name }</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop:10}}>
          <Text style={{fontSize: 15, fontStyle: 'italic', color: 'gray'}}>Thời gian: </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.data.time}</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop:10}}>
          <Text style={{fontSize: 15, fontStyle: 'italic', color: 'gray'}}>Số lượng: </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.data.quantity}</Text>
      </View> 
      <View style={{flexDirection: 'row', marginTop:10}}>
          <Text style={{fontSize: 15, fontStyle: 'italic', color: 'gray'}}>Trạng thái: </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.data.status}</Text>
      </View> 
      <View style={{flexDirection: 'row', marginTop:10}}>
          <Text style={{fontSize: 15, fontStyle: 'italic', color: 'gray'}}>Note: </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.data.note}</Text>
      </View> 
         
  </View>
);

