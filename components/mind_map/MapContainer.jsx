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
            <AddItemButton
              setShowCreateNote={(entry) => props.setShowCreateNote(entry)}
              angle='45deg'
              width={props.width}
              parentId={props.note.id}
            />
            <AddItemButton
              setShowCreateNote={(entry) => props.setShowCreateNote(entry)}
              angle='225deg'
              width={props.width}
              parentId={props.note.id}
             />
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
        {
          props.note.subdata.map((item,index) => {
            return (
              <Noteball
                key={index}
                text={props.operatingValue[item].title}
                size={25}
                style={{
                  position:'absolute',
                  top:'50%',
                  left:'50%',
                  transform:[
                    { translateX: -12.5*props.width/100 },
                    { translateY: -12.5*props.width/100 },
                    { translateX: 0.3*props.width}
                  ]
                }}
              />
            )
          })
        }
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
