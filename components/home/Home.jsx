import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Dimensions
} from 'react-native';
import Ftext from '../common_components/Ftext';
import Noteball from '../common_components/Noteball';
import ButtonRound from '../common_components/ButtonRound';

const image = require('../assets/bg.png');
const screenWidth = Dimensions.get('window').width;

export default function Home(props) {

  const SelectMap = function SelectMap(props) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => props.setShowMap(props.note)}
      >
        <View style={styles.selectMap}>
          <Noteball
            onPress={() => props.setShowMap(props.note)}
            color={props.color}
            text={props.note.title}
          />
          <View style={styles.mapDetails}>
            <Ftext size={15} color='#999'>
              Description: Lorem Ipsum Dolor Amet &nbsp; Date created: 22-07-2020
            </Ftext>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.header}>
          <Ftext size={30}>Mindyo</Ftext>
        </View>
        <ScrollView style={{paddingTop:30,paddingBottom:50}}>
          {
            Object.values(props.allMaps).map((item,index) => {
              return (
                item.parent === 'home' &&
                <SelectMap
                  note={item}
                  color={item.color}
                  setShowMap={(note) => props.setShowMap(note)}
                  key={index}
                />
              )
            })
          }
        </ScrollView>
        <ButtonRound
          text='＋'
          handlePress={props.setShowCreateNote}
        />
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems:'flex-start',
    justifyContent:'flex-end',
    backgroundColor:'#5CAB7D',
    width:'100%',
    padding:20,
    height: 0.25*screenWidth
  },
  selectMap: {
    flexDirection:'row',
    justifyContent:'space-around',
    marginBottom:40,
    width:'100%'
  },
  mapDetails: {
    justifyContent:'center',
    alignItems:'flex-start',
    width:'50%'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width:'100%'
  }
});
