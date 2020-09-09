import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddItemButton from './AddItemButton';
import Noteball from '../common_components/Noteball';

export default function MapContainer(props) {

  return (
    <View style={[
      styles.mapContainer,
      {
        width: 0.6*props.width,
        height: 0.6*props.width,
        borderRadius: 0.3*props.width,
        transform:[
          { translateX: -0.3*props.width },
          { translateY: -0.3*props.width }
        ]
      }
    ]}>
      {
        props.note.subdata.length === 0 &&
          <View style={{
            width:'100%',
            height:'100%'
          }}>
            <AddItemButton angle='45deg' width={props.width} />
            <AddItemButton angle='225deg' width={props.width} />
          </View>
      }
      <Noteball
        text={props.note.title}
        size={25}
        style={{
          position:'absolute',
          top:'50%',
          left:'50%',
          transform:[
            { translateX: -12.5*props.width/100 },
            { translateY: -12.5*props.width/100 }
          ]
        }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    position:'absolute',
    borderWidth:1,
    borderColor:'#DDD',
    top:'50%',
    left:'50%',
  }
});
