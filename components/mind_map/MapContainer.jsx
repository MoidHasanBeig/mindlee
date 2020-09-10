import React,{ useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  useWindowDimensions
} from 'react-native';
import AddItemButton from './AddItemButton';
import Noteball from '../common_components/Noteball';
import funx from '../../functions';

export default function MapContainer(props) {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const pan = useRef(new Animated.ValueXY({x:0,y:0})).current;
  const angle = useRef(new Animated.Value(0)).current;
  const spin = angle.interpolate({
    inputRange:[0,360],
    outputRange:['0deg','360deg']
  });
  const reverseSpin = angle.interpolate({
    inputRange:[0,360],
    outputRange:['-0deg','-360deg']
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        angle.setOffset(angle._value);
        angle.setValue(0);
        pan.setOffset({x:pan.x._value,y:pan.y._value});
        pan.setValue({x:0,y:0});
      },
      onPanResponderMove: Animated.event([
        null,
        { moveX: pan.x, moveY: pan.y }
      ],{
        listener: () => {
          let theta = funx.touchAngle(pan.x._value,pan.y._value,width,height);
          angle.setValue(theta);
        },
        useNativeDriver:false
      }),
      onPanResponderRelease: (e, {vx, vy}) => {
        Animated.decay(angle,{
            velocity: vx,
            deceleration: 0.997,
            useNativeDriver: false
          }
        ).start();
        angle.flattenOffset();
        pan.flattenOffset();
      }
    })
  ).current;

  const commonAngle = 360/props.note.subdata.length;
  const offsetAngle = commonAngle/2;

  return (
    <Animated.View style={[
      styles.mapContainer,
      {
        width: 0.7*props.width,
        height: 0.7*props.width,
        borderRadius: 0.35*props.width,
        transform:[
          { translateX: -0.35*props.width },
          { translateY: -0.35*props.width },
          { rotate: spin},
          { perspective: 1000 }
        ]
      }
    ]}
    {...panResponder.panHandlers}
    >
      {
        props.note.subdata.length === 0 &&
          <View style={{
            width:'100%',
            height:'100%'
          }}>
            <Animated.View
              style={
                {
                  position:'absolute',
                  top:'50%',
                  left:'50%',
                  transform: [
                    { translateX: -0.025*props.width},
                    { translateY: -0.025*props.width},
                    { rotate: '45deg' },
                    { translateX: 0.35*props.width},
                    { rotate: '-45deg' },
                    { rotate: reverseSpin},
                    { perspective: 1000 }
                  ]
                }
              }
            >
              <AddItemButton
                setShowCreateNote={(entry) => props.setShowCreateNote(entry)}
                width={props.width}
                parentId={props.note.id}
              />
            </Animated.View>
            <Animated.View
              style={
                {
                  position:'absolute',
                  top:'50%',
                  left:'50%',
                  transform: [
                    { translateX: -0.025*props.width},
                    { translateY: -0.025*props.width},
                    { rotate: '225deg' },
                    { translateX: 0.35*props.width},
                    { rotate: '-225deg' },
                    { rotate: reverseSpin }
                  ]
                }
              }
            >
              <AddItemButton
                setShowCreateNote={(entry) => props.setShowCreateNote(entry)}
                width={props.width}
                parentId={props.note.id}
               />
             </Animated.View>
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
              <View style={{
                position:'absolute',
                height:'100%',
                width:'100%'
              }}>
                <Animated.View
                  style={{
                    position:'absolute',
                    top:'50%',
                    left:'50%',
                    transform:[
                      { translateX: -10*props.width/100 },
                      { translateY: -10*props.width/100 },
                      { rotate: index*commonAngle+'deg'},
                      { translateX: 0.35*props.width},
                      { rotate: '-'+index*commonAngle+'deg'}
                    ]
                  }}
                >
                  <Noteball
                    key={funx.uniqueId(index)}
                    text={props.operatingValue[item].title}
                    size={20}
                  />
                </Animated.View>
                <Animated.View
                  style={
                    {
                      position:'absolute',
                      top:'50%',
                      left:'50%',
                      transform: [
                        { translateX: -0.025*props.width},
                        { translateY: -0.025*props.width},
                        { rotate: index*commonAngle+offsetAngle+'deg' },
                        { translateX: 0.35*props.width},
                        { rotate: '-'+index*commonAngle+offsetAngle+'deg' }
                      ]
                    }
                  }
                >
                  <AddItemButton
                    key={funx.uniqueId(index+0.1)}
                    setShowCreateNote={(entry) => props.setShowCreateNote(entry)}
                    width={props.width}
                    parentId={props.note.id}
                  />
                </Animated.View>
              </View>
            )
          })
        }
    </Animated.View>
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
