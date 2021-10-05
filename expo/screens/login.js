import React ,{useState,useContext} from 'react' ; 
import { StatusBar } from 'expo-status-bar';
import {Formik} from 'formik';
import signup from './../screens/signup';
import map from './map';
import{Octicons ,Ionicons,Fontisto} from '@expo/vector-icons';
import {Colors, PageTitle1} from './../components/styles' ; 
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { StyledContainer , 
    InnerContainer, 
    PageLogo ,
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
}from './../components/styles';
import {ImageComponent, View,ActivityIndicator} from 'react-native' ; 
import axios from 'axios' ; 
import RootStack from '../navigators/RootStack';
const {brand ,darkLight, primary}= Colors ;
const Login = ({navigation}) =>{
const [hidePassword ,setHidePassword] = useState(true);
const [message , setMessage]=useState();
const [ messageType , setMessageType] = useState();
const handleLogin = (credentials , setSubmitting) =>{
    handleMessage(null);
    const url = 'http://192.168.1.100:3000/users/signin'; 
    axios.post(url , credentials).then((res)=>{
        console.warn("results", res.data)
        const result = res.data ; 
        const {message , status , data}= result ;
        if(status !== 'SUCCESS'){
           handleMessage(message ,status);

        } else {
            navigation.navigate('Welcome');
        }
        setSubmitting(false);
    }).catch(error =>{
      console.warn(error);
      setSubmitting(false);
      handleMessage('An error occurred ,Check your network and try again');
    });
}
const handleMessage = (message ,type = '') =>{ 
   setMessage(message);
   setMessageType(type) ; 
};
    return (
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageLogo resizeMode="cover" source={require('./../assets/img/bug_tracking.png')} />
            <PageTitle>Welcome back .!  </PageTitle>
           

            <SubTitle>Log in to your existant account</SubTitle>
             
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values, { setSubmitting }) => {
                if (values.email == '' || values.password == '') {
                  handleMessage('Please fill all the fields');
                  setSubmitting(false);
                } else {
                  handleLogin(values, setSubmitting);
                }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                <StyledFormArea>
                  <MyTextInput
                    label="Email Address"
                    icon="mail"
                    placeholder="Madar@ISTIC.org"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  <MyTextInput
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
                  <MsgBox type={messageType}>{message}</MsgBox>
                  {!isSubmitting && (
                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>Login</ButtonText>
                    </StyledButton>
                  )}
                  {isSubmitting && (
                    <StyledButton disabled={true}>
                      <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                  )}
                  <Line />
                  <StyledButton google={true} onPress={handleSubmit}>
                    <Fontisto name="google" size={25} color={primary} />
                    <ButtonText google={true}>sign in With google</ButtonText>
                  </StyledButton>
                  <ExtraView>
                    <ExtraText>Don't have an account already?</ExtraText>
                    <TextLink onPress={() => navigation.navigate('signup')}>
                      <TextLinkContent>Signup</TextLinkContent>
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


const MyTextInput=({label,icon,isPassword,hidePassword,setHidePassword, ...props}) => {
    return (
        <View> 

        <LeftIcon> 
           <Octicons name={icon} size={30} color={brand} />
        </LeftIcon>

        <StyledInputLabel> {label}</StyledInputLabel> 

        <StyledTextInput  {...props}  />

        {isPassword && (
            <RightIcon onPress={ () => setHidePassword(!hidePassword)}> 
            <Ionicons name={hidePassword ?'md-eye-off' : 'md-eye'} size ={30} color={darkLight} />
            </RightIcon>
        )}
        </View> );
};
export default Login; 
