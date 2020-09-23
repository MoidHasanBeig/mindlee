import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  View,
  Animated
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
      <Animated.View style={{
        maxheight:'70%',
        width:'75%',
        overflow:'hidden',
        paddingTop:10,
        paddingBottom:10,
        transform: [
          { rotate: props.angle || 0 }
        ]
      }}>
        <Ftext
          align='center'
          size={15}
          height='100%'
        >
          {props.text && props.text.substring(0,50)}
        </Ftext>
      </Animated.View>
    </TouchableOpacity>
  );
}
