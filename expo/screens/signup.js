import React ,{useState} from 'react' ; 
import { StatusBar } from 'expo-status-bar';
import {Formik} from 'formik';
import{Octicons ,Ionicons,Fontisto} from '@expo/vector-icons';
import {Colors} from './../components/styles' ; 
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import {ActivityIndicator } from 'react-native';
//import * as React from 'react';
import axios from 'axios';
// for GOOGLE login ..

import { StyledContainer , 
    InnerContainer, 
     PageTitle,
     SubTitle ,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon ,
    StyledButton,
    ButtonText , 
    Line , 
    MsgBox , 
    ExtraText , 
    ExtraView,
    TextLink,
    TextLinkContent
} from './../components/styles';
import {View,TouchableOpacity} from 'react-native' ; 
import DateTimePicker from '@react-native-community/datetimepicker'; 
import Welcome from './Welcome';
import Login from './../screens/login';
//colors ;

const {brand ,darkLight, primary}= Colors ; 

const Signup= ({navigation}) =>{
const [hidePassword ,setHidePassword] = useState(true);
const [show , setShow] = useState(false);
const [date ,setDate]=useState(new Date(2000,0,1));
const [message, setMessage] = useState();
const [messageType, setMessageType] = useState();

    //Actual date of birth to be sent 

    const [dob,setDob]=useState();

    const onChange =(event,selectedDate) => {
         const currentDate= selectedDate  || date ; 
         setShow(false); 
         setDate(currentDate);
         setDob(currentDate);
    }
    const showDatePicker =() => {
        setShow(true); 
    }
    
    const handleSignup = (credentials, setSubmitting) => {
      handleMessage(null);
      const url = 'http://192.168.1.100:3000/users/signup';
      //console.warn("creds", credentials)
      axios
        .post(url, credentials).then((res) => {
          //console.log("my response" +res.data)
          console.warn('results', res.data);
          const result = res.data;
          const { message, status, data} = result;

          if (status !== 'SUCCESS') {
            handleMessage(message, status);
           //navigation.navigate('Welcome');
          } else {
            navigation.navigate('Login');
            // persistLogin({ ...data[0] }, message, status);
          }
          setSubmitting(false);
        })
        .catch((error) => {
          console.warn(error);
          setSubmitting(false);
          handleMessage('An error occurred ,Check your network and try again');
        });
    };
    const handleMessage = (message, type = '') => {
      setMessage(message);
      setMessageType(type);
    };


    return (
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <StatusBar style="green" />

          <InnerContainer>
            <PageTitle> Let's Get Started  ! </PageTitle>
            <SubTitle>Account Singup</SubTitle>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Formik
              initialValues={{ name: '', email: '', dateOfBirth: '', password: '', confirmPassword: '' }}
              onSubmit={(values , {setSubmitting}) => {
                  values = {...values , dateOfBirth:dob};
                  if(values.email =='' || 
                  values.password == '' ||
                  values.name=='' ||
                  values.dateOfBirth=='' || 
                  values.confirmPassword ==''
                  ){
                      handleMessage('please fill all the fields');
                      setSubmitting(false) ; 
                  } else if (values.password !== values.confirmPassword) {
                       handleMessage('Passwords do not match ');
                       setSubmitting(false); 
                  }
                   else{
                      handleSignup(values,setSubmitting) ; 
                  }
                
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                <StyledFormArea>
                  <MyTextInpuut
                    label="Full Name"
                    icon="person"
                    placeholder="Richard Barnes"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />

                  <MyTextInpuut
                    label="Email Address"
                    icon="mail"
                    placeholder="andyj@gmail.com"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  <MyTextInpuut
                    label="Date of Birth "
                    icon="calendar"
                    placeholder="YYYY - MM - DD"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('dateOfBirth')}
                    onBlur={handleBlur('dateOfBirth')}
                    value={dob ? dob.toDateString() : ''}
                    isDate={true}
                    editable={false}
                    showDatePicker={showDatePicker}
                  />
                  <MyTextInpuut
                    label="Password"
                    icon="lock"
                    placeholder="* * * * * * * "
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />
                  <MyTextInpuut
                    label="Confirm Password"
                    icon="lock"
                    placeholder="* * * * * * * "
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />

                  <MsgBox type={messageType}>{message}</MsgBox>


                  {!isSubmitting && (
                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>Signup</ButtonText>
                    </StyledButton>
                  )}

                  {isSubmitting && (
                    <StyledButton disabled={true}>
                      <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                  )}
                  <Line />
                  <ExtraView>
                    <ExtraText>already have an account ?</ExtraText>
                    <TextLink onPress={() => navigation.navigate('Login')}>
                      <TextLinkContent>Login</TextLinkContent>
                    </TextLink>
                  </ExtraView>
                </StyledFormArea>
              )}
            </Formik>
          </InnerContainer>
        </StyledContainer>
      </KeyboardAvoidingWrapper>
    );
};


const MyTextInpuut=({label,icon,isPassword,hidePassword,setHidePassword,isDate,showDatePicker, ...props}) => {
    return (
        <View> 

        <LeftIcon> 
           <Octicons name={icon} size={30} color={brand} />
        </LeftIcon>

        <StyledInputLabel> {label}</StyledInputLabel> 

{!isDate && <StyledTextInput  {...props}/>}
{isDate && <TouchableOpacity onPress={showDatePicker}><StyledTextInput  {...props}/></TouchableOpacity>}
        {isPassword && (
            <RightIcon onPress={ () => setHidePassword(!hidePassword)}> 
            <Ionicons name={hidePassword ?'md-eye-off' : 'md-eye'} size ={30} color={darkLight} />
            </RightIcon>
        )}
        </View> );

};
export default Signup ; 
