import React from 'react';
import { Text, useWindowDimensions } from 'react-native';

export default function Ftext(props) {
  const width = useWindowDimensions().width;
  return (
    <Text style={
      {
        fontSize:props.size*width*0.002 || 25*width*0.002,
        color:props.color || '#FFF',
        fontFamily:'monospace',
        textAlign:props.align || 'left',
        textAlignVertical:'center',
        height:props.height || 'auto',
        width:props.height || 'auto'
      }
    }>
    {props.children}
    </Text>
  );
}
