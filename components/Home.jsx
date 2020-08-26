import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Ftext from './Ftext';
import Noteball from './Noteball';

function SelectMap() {
  return (
    <View style={styles.selectMap}>
      <Noteball text='Mindlee' />
      <View style={styles.mapDetails}>
        <Ftext size={15} color='#1C1D1D'>Description: Lorem Ipsum Dolor Amet &nbsp; Date created: 22-07-2020</Ftext>
      </View>
    </View>
  );
}

function CreateNewMap() {
  return (
    <View style={styles.createNewMap}>
      <Ftext size={50}>+</Ftext>
    </View>
  );
}

export default function Home() {
  return (
    <View style={styles.home}>
      <View style={styles.header}>
        <Ftext size={30}>MindLee</Ftext>
      </View>
      <ScrollView style={{paddingTop:30}}>
        <SelectMap />
        <SelectMap />
        <SelectMap />
        <SelectMap />
        <SelectMap />
        <SelectMap />
        <SelectMap />
        <SelectMap />
        <SelectMap />
        <SelectMap />
        <SelectMap />
      </ScrollView>
      <CreateNewMap />
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    width:'100%'
  },
  header: {
    alignItems:'flex-start',
    justifyContent:'flex-end',
    backgroundColor:'#5CAB7D',
    width:'100%',
    height:125,
    padding:20
  },
  selectMap: {
    flexDirection:'row',
    justifyContent:'flex-start',
    marginLeft:40,
    marginBottom:40
  },
  mapDetails: {
    justifyContent:'center',
    alignItems:'flex-start',
    width:200,
    marginLeft:40
  },
  createNewMap: {
    position:'absolute',
    bottom:25,
    right:25,
    height:70,
    width:70,
    backgroundColor:'#5CAB7D',
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    elevation:5
  }
});
