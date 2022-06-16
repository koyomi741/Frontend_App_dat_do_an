import { View, Text, SafeAreaView, ScrollView,TouchableOpacity,TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'

import HeaderTabs from '../components/home/HeaderTabs';
import RestaurantItem from '../components/home/RestaurantItem';
import BottomTabs from '../components/home/BottomTabs';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import axios from "axios"

export default function Home({ navigation }) {


  const [ restaurantData, setRestaurantData ] = React.useState([])
  const [area, setArea] = useState("all");
  useEffect (() => {
    getAPI("http://10.0.2.2:3000/restaurant/getAll");
  }, [])

  const getAPI = (URL) => {
    axios({
      method: "get",
      url: URL,
      data: null,
    })
      .then( (res) => {
        setRestaurantData(res.data);
        console.log( "Số lượng nhà hàng là: " +  res.data.length )
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const checkArea = (data)=> {
    setArea(data);
    if(data == "all") {
      const URL = "http://10.0.2.2:3000/restaurant/getAll";
      getAPI(URL);
    }
    if(data == "bac") {
      const URL = "http://10.0.2.2:3000/restaurant/getByCategory/Bắc";
      getAPI(URL);
    }
    if(data == "trung") {
      const URL = "http://10.0.2.2:3000/restaurant/getByCategory/Trung";
      getAPI(URL);
    }
    if(data == "nam") {
      const URL = "http://10.0.2.2:3000/restaurant/getByCategory/Nam";
      getAPI(URL);
    }
    
  }
  const checkColor = (data) => {
    if(data == area)
      return "#FFCC00"
    else 
    return "#FFF"
  }

  return (
    <SafeAreaView style={{backgroundColor:"#eee", flex:1}} > 
        {/* goi file headertabs */}
      <View style={{backgroundColor:"#fff",padding:10,backgroundColor:"#FFCC00"}} > 
        <HeaderTabs/> 
        <SearchBar setRestaurantData={setRestaurantData}/>
      </View>

      <Categories checkColor = {checkColor}  checkArea={checkArea} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantItem restaurantData={restaurantData} navigation = {navigation}/>

      </ScrollView>
      <BottomTabs navigation = {navigation} />
    </SafeAreaView>
  )
}


const Categories = (props) =>  (
  <View  
      style={{
          backgroundColor:"#fff",
          marginTop: 5,
          paddingVertical: 10,
          paddingLeft: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#eee"
      }}
  >
      <View style={{flexDirection: 'row'}}>
         
        <TouchableOpacity 
          style={{alignItems:'center',marginRight:10, backgroundColor: props.checkColor("all"), paddingHorizontal: 15, paddingVertical: 5}}
          onPress={() => props.checkArea("all")}
        >
          <Text style={{ fontSize: 14, fontWeight: "900" }}>Tất Cả</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{alignItems:'center',marginRight:10, backgroundColor: props.checkColor("bac"), paddingHorizontal: 15, paddingVertical: 5}}
          onPress={() => props.checkArea("bac")}
        >
          <Text style={{ fontSize: 14, fontWeight: "900" }}>Miền Bắc</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{alignItems:'center',marginRight:10, backgroundColor: props.checkColor("trung"),paddingHorizontal: 15, paddingVertical: 5}}
          onPress={() => props.checkArea("trung")}
        >
          <Text style={{ fontSize: 14, fontWeight: "900" }}>Miền trung</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{alignItems:'center',marginRight:10, backgroundColor: props.checkColor("nam"),paddingHorizontal: 15, paddingVertical: 5}}
          onPress={() => props.checkArea("nam")}
        >
          <Text style={{ fontSize: 14, fontWeight: "900" }}>Miền Nam</Text>
        </TouchableOpacity>
          
      </View>
  </View>
)

const  SearchBar = (props) => {

  const [input, setInput] = useState('')
  const searchByName = () => {
    console.log('====================================');
    console.log(input);
    console.log('====================================');
    axios({
      method: "get",
      url: "http://10.0.2.2:3000/restaurant/searchByName/"+input,
      data: null,
    })
      .then( (res) => {
        props.setRestaurantData(res.data);
        console.log( "Timf kiem là: " +  res.data.length )
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={{marginTop:15, flexDirection:"row", borderRadius: 30, borderWidth:1, width:"95%", marginLeft:"2.5%", height:50, backgroundColor:"#eee"}}>
      
      <AntDesign name="search1" size={25} color="black" style={{position:'absolute', marginLeft:20, marginTop:10}} /> 
      <TextInput
            style={{fontSize:18, paddingHorizontal: 60, }}
            placeholder='Nhập tên nhà hàng'
            onChangeText={(text) =>  {
                setInput(text)
              }}
            >
      </TextInput>
      <TouchableOpacity
        style={{borderRadius:30, backgroundColor: "#fff", width:80, alignItems:'center', justifyContent: 'center'}}
        onPress={() => searchByName()}
      >
        <Text>Tìm kiếm</Text>
      </TouchableOpacity>
    </View>
  )
}