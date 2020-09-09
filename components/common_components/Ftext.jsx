import React from 'react';
import { Text, useWindowDimensions } from 'react-native';

export default function Ftext(props) {
  const width = useWindowDimensions().width;

  return (
    <Text style={
      {
        fontSize:props.size*width*0.002 || 20*width*0.002,
        color:props.color || '#FFF',
        fontFamily:'monospace',
        textAlign:props.align || 'left'
      }
    }>
    {props.children}
    </Text>
  );
}
