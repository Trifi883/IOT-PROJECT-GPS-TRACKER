import React, { Component , useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Constants } from 'expo-constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import {  Alert, Modal,StyleSheet, Pressable,Dimensions, Platform, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import RootStack from '../navigators/RootStack';
import axios from 'axios';
const baseURL = "https://api.thingspeak.com/channels/1492124/feeds.json?api_key=0KQX8ZALM6QAH1FZ&results=1";

//import Modal from 'react-native-modal';

const height = Dimensions.get('window').height;
const map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = React.useState(null);


  useEffect(() => {

    axios.get(baseURL).then((response) => {
      setPost(response.data);
      console.log(response.feeds);

      
    });
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);

    })();
  
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    
  }

  if (!post) return null; 

 
              /*modal content */

  /***************************************************************/
  /************************************************************************/
  return (
    
    <View style={{ flex: 1 }}>
    
    <View style={styles.centeredView} position="absolute">
      <Modal
        animationType="slide"
        transparent={true}
        animationInTiming={20}
          animationOutTiming={20}
          backdropTransitionInTiming={20}
          backdropTransitionOutTiming={20}
          animationIn='slideInUp' 
          backdropColor='black' 
          backdropOpacity='0.20'
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>



            <Text style={styles.modalText}> la temperature :  {post.feeds[0].field1}       Humidity :  {post.feeds[0].field2}   </Text>
            
            <Text style={styles.modalText}> information about location :{text} </Text>








            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    
    <MapView style={{ flex: 1 }} showsUserLocation={true}  followUserLocation={true}>





      <MapView.Marker 
        coordinate={{
          longitude: location ? location?.coords?.longitude : 0,
          latitude: location ? location?.coords?.latitude : 0,
        }}
        title={'UserName'}
        description={'location'}
        onPress={() => setModalVisible(true)}

      />
    </MapView>
    <View
      style={{
        position: 'absolute', //use absolute position to show button on top of the map
        top: '50%', //for center align
        alignSelf: 'flex-end', //for align to right
      }}
    >
  </View>
  </View>

  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: 'white',
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.7,
    shadowRadius: 50,
    elevation: 30
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default map;
