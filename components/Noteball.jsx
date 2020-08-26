import React from 'react';
import { View } from 'react-native';
import Ftext from './Ftext';

export default function Noteball(props) {
  return (
    <View style={{
      height:props.size || 120,
      width:props.size || 120,
      backgroundColor: props.color || '#5CAB7D',
      borderRadius:props.size || 75,
      justifyContent:'center',
      alignItems:'center',
      overflow:'hidden'
    }}>
      <Ftext size={20}>{props.text}</Ftext>
    </View>
  );
}
