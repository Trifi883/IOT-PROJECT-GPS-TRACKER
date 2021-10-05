import React ,{useState} from 'react' ; 
import { StatusBar } from 'expo-status-bar'; 
import {Text} from 'react-native' ; 
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  TextLink,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from './../components/styles';
const Welcome = ({navigation}) =>{
    //const {name , email}= route.params ;
    return (
      <StyledContainer>
      
        <StatusBar style="dark" />
        <InnerContainer>
          <WelcomeImage resizeMode="contain" source={require('./../assets/img/Image1.jpg')} />
          <WelcomeContainer >
            <PageTitle Welcome={true}>Welcome .! </PageTitle>
            <SubTitle Welcome={true}>Thanks for Logging-in :)</SubTitle>

            <StyledFormArea>
              <Avatar resizeMode="cover" source={require('./../assets/img/bug_tracking.png')} />

              <Line />
              <StyledButton onPress={() => navigation.navigate('map')}>
                  <ButtonText>Click Here</ButtonText>
                
              </StyledButton>
            </StyledFormArea>
          </WelcomeContainer>
        </InnerContainer>
      </StyledContainer>
    );
};
export default Welcome ; 
