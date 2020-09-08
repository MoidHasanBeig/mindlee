import React from 'react';
import { Text } from 'react-native';

export default function Ftext(props) {
  return (
    <Text style={
      {
        fontSize:props.size || 20,
        color:props.color || '#FFF',
        fontFamily:'monospace'
      }
    }>
    {props.children}
    </Text>
  );
}
