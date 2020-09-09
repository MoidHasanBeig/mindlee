import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ftext from '../common_components/Ftext';

export default function AddItemButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.addItemButton,
        {
          width: 0.05*props.width,
          height: 0.05*props.width,
          borderRadius: 0.025*props.width,
          transform: [
            { translateX: -0.025*props.width},
            { translateY: -0.025*props.width},
            { rotate: props.angle },
            { translateX: 0.3*props.width},
            { rotate: '-'+props.angle }
          ]
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
    position:'absolute',
    backgroundColor:'#CCC',
    justifyContent:'center',
    alignItems:'center',
    top:'50%',
    left:'50%'
  }
});
