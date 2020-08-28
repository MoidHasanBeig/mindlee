import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function NoteEditArea(props) {

  return (
    <View style={styles.noteEditArea}>
      <TextInput
        value={props.noteValue}
        placeholder='Add a short note here'
        onChangeText={text => props.onChangeNote(text)}
        style={{...styles.noteInputBox,flex:1}}
      >
      </TextInput>
      <TextInput
        value={props.descValue}
        multiline
        placeholder='Add description here'
        textAlignVertical='top'
        onChangeText={text => props.onChangeDesc(text)}
        style={{...styles.noteInputBox,flex:12,marginTop:0,paddingTop:20}}
      >
      </TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  noteEditArea: {
    flex:1
  },
  noteInputBox: {
    borderWidth:1,
    borderColor:'#CCC',
    margin:20,
    padding:10,
    borderRadius:10,
    fontSize:20,
    fontFamily:'Montserrat'
  }
});
