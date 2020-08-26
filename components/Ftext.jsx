import React from 'react';
import { Text } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

export default function Ftext(props) {

  let [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat.ttf')
  });

  if(!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <Text style={
        {
          fontSize:props.size || 20,
          color:props.color || '#FFF',
          fontFamily:'Montserrat'
        }
      }>
      {props.children}
      </Text>
    );
  }
}
