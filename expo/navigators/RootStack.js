import * as React from 'react';
import 'react-native-gesture-handler';
import { View, TouchableOpacity, Image, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Login from './../screens/login';
import signup from './../screens/signup';
import Welcome from './../screens/Welcome';
import map from  './../screens/map';
import { Colors } from './../components/styles';
import CustomSidebarMenu from '../CustomSidebarMenu';
import { render } from 'react-dom';
import Signup from './../screens/signup';

const {primary , tertiary }=Colors ; 
const Stack =createStackNavigator();
const Drawer = createDrawerNavigator();

/*
function Feed({ navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}
*/

/*********************************************/
const NavigationDrawerStructure = (props) => {

  console.log("my navigation:"+props.navigation)
  //Structure for the navigation Drawer
  const toggleDrawer =() => {
    //Props to open/close the drawer
    props.navigationprops.toggleDrawer();
  }
  
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};







const drawer = (navigation) => {
  return (
    <Drawer.Navigator initialRouteName="map" drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="map"
        component={map}
       
      />
    </Drawer.Navigator>
  );
};

const mapp = ({navigation})=> {
  
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="FirstPage"
        component={map}
        options={{
          title: '                 GPS Tracker', //Set Header Title
          headerLeft: () => <NavigationDrawerStructure navigationprops={navigation} />,
          headerStyle: {
            backgroundColor: '#c79e88', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );

}
const loogin = ({navigation})=> {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="FirstPage"
        component={Login}
        options={{
          title: '                                  LOGIN', //Set Header Title
          
          headerStyle: {
            backgroundColor: '#c79e88', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

const signupp = ({navigation})=> {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="FirstPage"
        component={Signup}
        options={{
          title: '                                 Sign-Up', //Set Header Title
          headerStyle: {
            backgroundColor: '#c79e88', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}


const RootStack =({navigation}) => {
  
return (
  <NavigationContainer>
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 5 },
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen name="Login" options={{ drawerLabel: 'Login' }} component={loogin} />
      <Drawer.Screen name="map" options={{ drawerLabel: 'Map' }} component={mapp} />

      <Drawer.Screen name="signup" options={{ drawerLabel: 'Sign up' }} component={signupp} />
      <Drawer.Screen name="Welcome" options={{ drawerLabel: 'Sign 9up' }} component={Welcome} />
    </Drawer.Navigator>
  </NavigationContainer>
);
}
export default RootStack ; 

