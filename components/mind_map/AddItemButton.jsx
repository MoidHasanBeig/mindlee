import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ftext from '../common_components/Ftext';

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
      style={[
        styles.addItemButton,
        {
          width: 0.05*props.width,
          height: 0.05*props.width,
          borderRadius: 0.025*props.width,
        }
      ]}
      onPress={() => props.setShowCreateNote({
        entryType:'newnote',
        parentId:props.parentId
      })}
    >
      <Ftext>+</Ftext>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addItemButton: {
    backgroundColor:'#CCC',
    justifyContent:'center',
    alignItems:'center',
  }
});
