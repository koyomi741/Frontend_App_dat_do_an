import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, Image, Platform } from 'react-native'
import React, {useState,  useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import UserContext from '../context/UserContext';
    
export default function SignIn({navigation}) {

  const [user, setUser] = React.useContext(UserContext);

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  //========================================
  const checkAccount = () => {
    if(account == "" || password == ""){
      alert("Không được để trắng")
    } else checkData();
  }

  const checkData = () => {
    axios.get("http://10.0.2.2:3000/client/getByAccount/" + account)
    
    .then( res =>  {
      Login(res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  const Login = ( data) => {
      if(data.length == 0 || password != data[0].password){
        alert("Sai thông tin đăng nhập")
      } else {
        setUser(data[0])
        navigation.navigate("Home");
      }

  }


  return (
    <SafeAreaView style={{backgroundColor:"black",flex:1}} >
        <HeaderSignIn />
        <BodySignIn checkAccount ={checkAccount} account={account} setAccount={setAccount} password={password} setPassword={setPassword} navigation={navigation}/>
    </SafeAreaView>
  )
}


const HeaderSignIn  = () => (
  <View style={{width:600, height:600, paddingTop:50, alignItems:"center",backgroundColor:"#FFCC00", borderBottomLeftRadius:500, left:-100, padding:100}}>
    <Image
          source={require('../../assets/images/SignIn-bg.png')}
          style={{width:"80%", height:null, aspectRatio:920/530, marginTop:0}}
    />   
    <Text style={{color:"white", fontSize:27, fontWeight:'bold' }}>Tinh Hoa Ẩm Thực Việt</Text>
    <Text style={{color:"white", fontSize:20, fontStyle:'italic' }}>Ăn phở để đời nở hoa</Text>
  </View>
)

const BodySignIn  = (props) => (
  <View style={{
    backgroundColor:"white",
    width:"80%",
    height:"41%",
    flex:1,
    borderTopWidth:3,
    borderColor:"#fff",
    marginLeft:"10%",
    position:"absolute",
    marginTop:330
  }}>
    <Text style={{fontSize:23, fontWeight:"bold", marginLeft:110, marginTop:10, marginBottom:20}}>Đăng Nhập</Text>
    <View style={{alignItems:"center", height:120}}>
      <TextInput style={{width:'80%', height:50, borderWidth:2, borderColor:"#C0C0C0",paddingLeft:45,fontSize:18, borderRadius: 30, marginBottom:15}}
        placeholder="Tài Khoản"
        onChangeText={(text) =>  {
          props.setAccount(text)
        }}
      /> 
      <AntDesign style={{position:'absolute',left:45,top:12}} name="user" size={24} color="gray" />
      <TextInput style={{width:'80%', height:50, borderWidth:2, borderColor:"#C0C0C0",paddingLeft:45, fontSize:18, borderRadius: 30}}
        placeholder="Mật Khẩu"
        onChangeText={(text) =>  {
          props.setPassword(text)
        }}
        secureTextEntry = {true}
      />
      <Ionicons style={{position:'absolute',left:45,top:78}} name="key-outline" size={24} color="gray" />
      
      <TouchableOpacity style={{width:"50%", height:45, justifyContent:"center", alignItems:"center", marginTop:105, position:"absolute", right:0}}>
        <Text style={{color:"#C0C0C0", fontStyle:'italic'}} >Quên mật khẩu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor:"#FFCC00", width:"50%", height:45, justifyContent:"center", alignItems:"center", borderRadius:30, borderWidth:1, borderColor:"#C0C0C0", marginTop:50}}
        onPress={ () => props.checkAccount()}
      >
        <Text style={{fontWeight:"bold"}}>Đăng Nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{justifyContent:"center", alignItems:"center", marginTop:30}}
        onPress={ () => props.navigation.navigate("Register")}
      >
        <Text style={{color:"#C0C0C0", fontStyle:'italic'}} >Đăng kí tài khoản mới</Text>
      </TouchableOpacity>

    </View>
  </View>

) 