import React from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import Ftext from './Ftext';

const screenWidth = Dimensions.get('window').width;

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
    backgroundColor:'#5CAB7D',
    alignItems:'center',
    justifyContent:'center',
    height:0.14*screenWidth,
    width:0.14*screenWidth
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
