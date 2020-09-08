import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import Ftext from './Ftext';

export default function Noteball(props) {
  const width = useWindowDimensions().width;
  const ballSize = props.size * width / 100;

  return (
    <View style={{
      height:ballSize || 120,
      width:ballSize || 120,
      backgroundColor: props.color || '#5CAB7D',
      borderRadius:ballSize || 75,
      justifyContent:'center',
      alignItems:'center',
      overflow:'hidden',
    }}>
      <Ftext size={20}>{props.text}</Ftext>
    </View>
  );
}
