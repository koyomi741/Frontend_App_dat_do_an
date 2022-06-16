import { View, Text, TouchableOpacity, Modal,StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux'
import OderItem from './OderItem';
import { AntDesign } from '@expo/vector-icons';


const windowWidth = Dimensions.get('window').width;

export default function ViewCart({navigation}) {

    // tao modal
    const [modalVisible, setModalVisible] = useState(false);
    // của sổ modal hiện ra
    const checkoutModalContent = () => {
        return(
            <>
            <View style={styles.modalContainer} >
                <View style={styles.modalCheckoutContainer}>
                    <AntDesign style={{ position: 'absolute', marginLeft: 80, marginTop:15}} name="checkcircle" size={30} color="green" />
                    <Text style={styles.restaurantName}>Thêm Thành công</Text>
                    <ScrollView style={{}}>
                        {items.map( (item, index) => (
                            <OderItem key={index} item={item} />
                        ) )}
                    </ScrollView>

                    <View style={styles.subtotalContainer}>
                        <Text style={styles.subtotalText}>Tổng tiền</Text>
                        <Text>{totalVND}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity style={{
                            backgroundColor:"#000",
                            marginTop: 20,
                            padding:13,
                            alignItems: 'center',
                            borderRadius: 30,
                            width: 300,
                            position: 'relative',
                            flexDirection:"row",
                            justifyContent:"flex-end",
                            borderWidth: 1,
                            borderColor: '#eee'

                        }}
                            onPress={() => (
                                setModalVisible(false),
                                navigation.navigate('Cart')
                            )}
                        >
                            <Text style={{color:"white", fontSize:20,marginRight:30}} >Mua hàng</Text>
                            <Text style={{color:"white", fontSize:17,marginRight:10, backgroundColor:"red", fontStyle:'italic' }} >{totalVND}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>     
            </>
        );
    };

    //--------------------------------------------------------
    const {items} = useSelector( (state) => state.cartReducer.selectedItems) ;

    const total = items
    .map((item) => Number(item.price))
    .reduce( (prev, curr) => prev + curr, 0);

    // const total = 0;
    const totalVND = total+".000₫";
    console.log(totalVND) 

    //---------------------------------------------------------
    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.7)'
        },

        modalCheckoutContainer: {
            backgroundColor: 'white',
            padding: 16,
            height: 500,
            borderWidth: 1,
        },

        restaurantName: {
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 20,
            marginBottom: 10,
            // backgroundColor:'green'
        },  

        subtotalContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
        },

        subtotalText: {
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: 15,
            marginBottom: 10,
        }
    })
        
    return (
    <>
    <Modal 
        animationType='slide' 
        visible={modalVisible} 
        transparent = {true}
        onRequestClose = {() => setModalVisible(false)}
    > 
        {checkoutModalContent()}
    </Modal>

    { total ? (
        <View 
            style={{
                flex:1,
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"row",
                position: 'absolute',
                bottom: 10,
                zIndex: 9,
                // backgroundColor:"red",
                width: 300,
                marginLeft: ((windowWidth-300) * 0.5 )
            }}
        >
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
            
            }} >
                <TouchableOpacity style={{
                    marginTop: 20,
                    backgroundColor:"black",
                    padding: 13,
                    borderRadius: 30,
                    width: 300,
                    position: "relative",
                    flexDirection:"row",
                    justifyContent:"flex-end",
                    borderWidth: 1,
                    borderColor: '#eee'
                }}        
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={{color:"white", fontSize:20,marginRight:20}} >Thêm vào giỏ hàng</Text>
                    <Text style={{color:"white", fontSize:17,marginRight:10, backgroundColor:"red", fontStyle:'italic' }} >{totalVND}</Text>
                </TouchableOpacity>
            </View>
        </View>
    ) : (
        <></> 
    )}
    </>
  )
}