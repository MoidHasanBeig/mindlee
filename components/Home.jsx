import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground
} from 'react-native';
import Ftext from './Ftext';
import Noteball from './Noteball';
import ButtonRound from './ButtonRound';

const image = require('./assets/bg.png');

export default function Home(props) {

  const SelectMap = function SelectMap(props) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={props.setShowMap}>
        <View style={styles.selectMap}>
          <Noteball color={props.color} size={30} text={props.title} />
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
        <View style={[
          styles.header,
          {
            height: 0.25*props.width
          }
        ]}>
          <Ftext size={30}>MindLee</Ftext>
        </View>
        <ScrollView style={{paddingTop:30,paddingBottom:50}}>
          {
            Object.values(props.allMaps).map((item,index) => {
              return (
                <SelectMap
                  title={item.title}
                  color={item.color}
                  setShowMap={props.setShowMap}
                  key={index}
                />
              )
            })
          }
        </ScrollView>
        <ButtonRound
          text='＋'
          handlePress={props.setShowCreateNote}
          width={props.width}
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
    padding:20
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
