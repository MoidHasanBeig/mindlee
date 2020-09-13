import React from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Ftext from './Ftext';

export default function Noteball(props) {
  const width = useWindowDimensions().width;
  const ballSize = props.size * width / 100;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.onPress()}
      style={{
        ...props.style,
        height:ballSize || 25 * width / 100,
        width:ballSize || 25 * width / 100,
        backgroundColor: props.color || '#5CAB7D',
        borderRadius:ballSize*0.5 || 12.5 * width / 100,
        justifyContent:'center',
        alignItems:'center'
      }}
    >
      <View style={{
        maxheight:'70%',
        width:'75%',
        overflow:'hidden',
        paddingTop:10,
        paddingBottom:10
      }}>
        <Ftext align='center' size={15}>{props.text && props.text.substring(0,50)}</Ftext>
      </View>
    </TouchableOpacity>
  );
}
