import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import Ftext from './Ftext';

export default function Noteball(props) {
  const width = useWindowDimensions().width;
  const ballSize = props.size * width / 100;

  return (
    <View style={{
      ...props.style,
      height:ballSize || 25 * width / 100,
      width:ballSize || 25 * width / 100,
      backgroundColor: props.color || '#5CAB7D',
      borderRadius:ballSize || 13 * width / 100,
      justifyContent:'center',
      alignItems:'center',
      overflow:'hidden',
    }}>
      <Ftext size={20}>{props.text}</Ftext>
    </View>
  );
}
