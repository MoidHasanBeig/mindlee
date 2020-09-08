import React from 'react';
import { TouchableHighlight, StyleSheet, View  } from 'react-native';
import Ftext from './Ftext';

export default function ButtonRound(props) {
  return (
    <TouchableHighlight
      style={styles.touchWrapperCreateNewMap}
      onPress={props.handlePress}
    >
      <View style={styles.createNewMap}>
        <Ftext size={30}>{props.text}</Ftext>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  createNewMap: {
    height:70,
    width:70,
    backgroundColor:'#5CAB7D',
    alignItems:'center',
    justifyContent:'center',
  },
  touchWrapperCreateNewMap: {
    position:'absolute',
    bottom:25,
    right:25,
    borderRadius:50,
    overflow:'hidden',
    elevation:5
  }
});
