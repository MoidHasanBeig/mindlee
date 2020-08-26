import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Ftext from './Ftext';

function SelectMap() {
  return (
    <View style={styles.selectMap}>
      <View style={styles.mapName}>
        <Ftext size={20}>Mindlee</Ftext>
      </View>
      <View style={styles.mapDetails}>
        <Text>Description: Lorem Ipsum Dolor Amet &nbsp; Date created: 22-07-2020</Text>
      </View>
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
    justifyContent:'space-around',
    marginLeft:10,
    marginBottom:40
  },
  mapName: {
    height:150,
    width:150,
    backgroundColor:'#5CAB7D',
    borderRadius:75,
    justifyContent:'center',
    alignItems:'center',
    overflow:'hidden'
  },
  mapDetails: {
    justifyContent:'center',
    alignItems:'flex-start',
    width:200
  }
});
