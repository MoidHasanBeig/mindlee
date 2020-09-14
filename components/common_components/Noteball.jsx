import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  View
} from 'react-native';
import Ftext from './Ftext';

const screenWidth = Dimensions.get('window').width;

export default function Noteball(props) {
  const ballSize = (props.size || 25) * screenWidth / 100;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.onPress()}
      style={{
        ...props.style,
        height:ballSize,
        width:ballSize,
        backgroundColor: props.color || '#5CAB7D',
        borderRadius:ballSize*0.5,
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
