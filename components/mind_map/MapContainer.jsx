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
  const angle = useRef(new Animated.Value(0)).current;
  const initialAngle = useRef(new Animated.Value(0)).current;
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
      onMoveShouldSetPanResponder: (evt, gestureState) => !(gestureState.dx === 0 && gestureState.dy === 0),
      onPanResponderGrant: (evt, gestureState) => {
        let theta = funx.touchAngle(evt.nativeEvent.pageX,evt.nativeEvent.pageY,width,height,0);
        initialAngle.setValue(theta);
      },
      onPanResponderMove: (evt, gestureState) => {
          let theta = funx.touchAngle(evt.nativeEvent.pageX,evt.nativeEvent.pageY,width,height,initialAngle._value);
          angle.setValue(theta);
      },
      onPanResponderRelease: (evt, {vx, vy}) => {
        let xPos = Math.sign(evt.nativeEvent.pageX-width/2);
        let yPos = Math.sign(evt.nativeEvent.pageY-height/2);
        let velocity = xPos*vy-yPos*vx;
        Animated.decay(angle,{
            velocity: velocity,
            deceleration: 0.99,
            useNativeDriver: false
          }
        ).start(() => {
          angle.flattenOffset();
          while (angle._value>=360) {
            angle.setValue(angle._value-360);
          }
          angle.setOffset(angle._value);
          angle.setValue(0);
        });
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
                    { translateX: -0.045*props.width},
                    { translateY: -0.045*props.width},
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
                    { translateX: -0.045*props.width},
                    { translateY: -0.045*props.width},
                    { rotate: '225deg' },
                    { translateX: 0.35*props.width},
                    { rotate: '-225deg' },
                    { rotate: reverseSpin },
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
          </View>
      }
      <Animated.View style={{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:[
          { translateX: -12.5*props.width/100 },
          { translateY: -12.5*props.width/100 },
          { rotate: reverseSpin },
          { perspective: 1000 }
        ]
      }}>
        <Noteball
          text={props.note.title}
          size={25}
        />
      </Animated.View>
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
                      { rotate: '-'+index*commonAngle+'deg'},
                      { rotate: reverseSpin },
                      { perspective: 1000 }
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
                        { translateX: -0.045*props.width},
                        { translateY: -0.045*props.width},
                        { rotate: index*commonAngle+offsetAngle+'deg' },
                        { translateX: 0.35*props.width},
                        { rotate: -1*(index*commonAngle+offsetAngle)+'deg' },
                        { rotate: reverseSpin },
                        { perspective: 1000 }
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
