import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function NoteEditArea(props) {

  return (
    <View style={styles.noteEditArea}>
      <TextInput
        value={props.noteValue}
        placeholder='Add a short note here'
        onChangeText={text => props.onChangeNote(text)}
        style={[
          styles.noteInputBox,
          {
            flex:1,
            fontSize:0.04*props.width,
          }
        ]}
      />
      <TextInput
        value={props.descValue}
        multiline
        placeholder='Add description here'
        textAlignVertical='top'
        onChangeText={text => props.onChangeDesc(text)}
        style={[
          styles.noteInputBox,
          {
            flex:12,
            marginTop:0,
            paddingTop:20,
            fontSize:0.04*props.width
          }
        ]}
      />
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
    padding:5,
    paddingLeft:15,
    borderRadius:10,
    fontFamily:'monospace'
  }
});