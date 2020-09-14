import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions
 } from 'react-native';
import Ftext from '../common_components/Ftext';

const screenWidth = Dimensions.get('window').width;

export default function AddItemButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      hitSlop={{
        top:20,
        bottom:20,
        left:20,
        right:20
      }}
      style={styles.touchableWrapper}
      onPress={
        () => {
          props.setShowCreateNote({
            entryType:'newnote',
            parentId:props.parentId,
            index:props.index
          });
        }
      }
    >
      <View style={styles.addItemButton}>
        <Ftext>+</Ftext>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addItemButton: {
    height:'40%',
    width:'40%',
    backgroundColor:'#CCC',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 50,
  },
  touchableWrapper: {
    width: 0.09*screenWidth,
    height: 0.09*screenWidth,
    justifyContent:'center',
    alignItems:'center'
  }
});
