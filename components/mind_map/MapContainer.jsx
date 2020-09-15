import React,{ useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';
import AddItemButton from './AddItemButton';
import Noteball from '../common_components/Noteball';
import funx from '../../functions';
import animx from '../../animations';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MapContainer(props) {
  const angle = useRef(new Animated.Value(0)).current;
  const initialAngle = useRef(new Animated.Value(0)).current;
  const commonAngle = 360/props.note.subdata.length;
  const offsetAngle = commonAngle/2;
  const spin = angle.interpolate({
    inputRange:[0,360],
    outputRange:['0deg','360deg']
  });
  const reverseSpin = angle.interpolate({
    inputRange:[0,360],
    outputRange:['-0deg','-360deg']
  });

  //for transition animations
  const scaleContainer = props.mapTransitionAnim.interpolate({
    inputRange:[0,2],
    outputRange:[0,2]
  });
  const fadeContainer = props.mapTransitionAnim.interpolate({
    inputRange:[0,1,2],
    outputRange:[0,1,0]
  });
  const swayContainer = props.mapTransitionAnim.interpolate({
    inputRange:[0,2],
    outputRange: [0,0]
  });
  const mainNoteballTranslateX = props.mapTransitionAnim.interpolate({
    inputRange:[0,1,2],
    outputRange:[0,0,-screenWidth/1.5]
  });
  const mainNoteballTranslateY = props.mapTransitionAnim.interpolate({
    inputRange:[0,1,2],
    outputRange:[0,0,-screenHeight/1.5]
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder:
        (evt, gestureState) => !(gestureState.dx === 0 && gestureState.dy === 0),
      onPanResponderGrant: (evt, gestureState) => {
        let theta = funx.touchAngle(
          evt.nativeEvent.pageX,
          evt.nativeEvent.pageY,
          screenWidth,
          screenHeight,
          0
        );
        initialAngle.setValue(theta);
      },
      onPanResponderMove: (evt, gestureState) => {
          let theta = funx.touchAngle(
            evt.nativeEvent.pageX,
            evt.nativeEvent.pageY,
            screenWidth,
            screenHeight,
            initialAngle._value
          );
          angle.setValue(theta);
      },
      onPanResponderRelease: (evt, {vx, vy}) => {
        // let xPos = Math.sign(evt.nativeEvent.pageX-screenWidth/2);
        // let yPos = Math.sign(evt.nativeEvent.pageY-screenHeight/2);
        // let velocity = (xPos*vy-yPos*vx)*0.4;
        // Animated.decay(angle,{
        //     velocity: velocity,
        //     deceleration: 0.997,
        //     useNativeDriver: false
        //   }
        // ).start(() => {
        // });
        angle.flattenOffset();
        while (angle._value>=360) {
          angle.setValue(angle._value-360);
        }
        angle.setOffset(angle._value);
        angle.setValue(0);
      }
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.mapContainer,
        {
          transform:[
            { translateX: -0.45*screenWidth },
            { translateY: -0.45*screenWidth },
            { translateX: swayContainer },
            { translateY: swayContainer }
          ]
        }
      ]}
      {...panResponder.panHandlers}
    >
      <Animated.View style={[
          styles.circularBorder,
          {
            opacity: fadeContainer,
            transform:[
              { translateX: -0.3*screenWidth },
              { translateY: -0.3*screenWidth },
              { scale: scaleContainer }
            ]
          }
        ]}
      />
      {
        props.note.subdata.length === 0 &&
          <View style={styles.fillParent}>
          {
            [1,2,3,4].map((item,index) => {
              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.centered,
                    {
                      transform: [
                        { translateX: -0.045*screenWidth},
                        { translateY: -0.045*screenWidth},
                        { rotate: index*90+20+'deg' },
                        { rotate: spin },
                        { translateX: 0.3*screenWidth},
                        { rotate: -1*(index*90+20)+'deg' },
                        { rotate: reverseSpin},
                      ],
                      opacity: fadeContainer
                    }
                  ]}
                >
                  <AddItemButton
                    index={0}
                    setShowCreateNote={(entry) => props.setShowCreateNote(entry)}
                    width={screenWidth}
                    parentId={props.note.id}
                  />
                </Animated.View>
              )
            })
          }
          </View>
      }
      <Animated.View style={[
        styles.mainNoteball,
        styles.centered,
        {
          transform:[
            { translateX: -12.5*screenWidth/100 },
            { translateY: -12.5*screenWidth/100 },
            { translateX: mainNoteballTranslateX },
            { translateY: mainNoteballTranslateY }
          ]
        }
      ]}>
        <Noteball
          onPress={() => funx.editNote()}
          text={props.note.title}
          size={25}
        />
      </Animated.View>
        {
          props.note.subdata.map((item,index) => {
            return (
              <View
                key={funx.uniqueId(index)}
                style={styles.fillParent}
              >
                <Animated.View
                  style={[
                    styles.centered,
                    {
                      transform:[
                        { translateX: -0.1*screenWidth },
                        { translateY: -0.1*screenWidth },
                        { rotate: index*commonAngle+'deg'},
                        { rotate: spin },
                        { translateX: 0.3*screenWidth},
                        { rotate: '-'+index*commonAngle+'deg'},
                        { rotate: reverseSpin }
                      ],
                      opacity: fadeContainer
                    }
                  ]}
                >
                  <Noteball
                    onPress={() =>
                      animx.mindmapTransitions(
                        {
                          mapTransitionAnim:props.mapTransitionAnim,
                          transVal:2,
                          finalVal:1
                        },
                        () => {
                          funx.mapTraverse(item,props.setShowMap,props.operatingValue)
                        })
                      }
                    text={props.operatingValue[item].title}
                    size={20}
                  />
                </Animated.View>
                <Animated.View
                  style={[
                    styles.centered,
                    {
                      transform: [
                        { translateX: -0.045*screenWidth },
                        { translateY: -0.045*screenWidth },
                        { rotate: index*commonAngle+offsetAngle+'deg' },
                        { rotate: spin },
                        { translateX: 0.3*screenWidth },
                        { rotate: -1*(index*commonAngle+offsetAngle)+'deg' },
                        { rotate: reverseSpin }
                      ],
                      opacity: fadeContainer
                    }
                  ]}
                >
                  <AddItemButton
                    index={index}
                    setShowCreateNote={(entry) => props.setShowCreateNote(entry)}
                    width={screenWidth}
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
    top:'50%',
    left:'50%',
    justifyContent:'center',
    alignItems:'center',
    width: 0.9*screenWidth,
    height: 0.9*screenWidth,
    borderRadius: 0.45*screenWidth
  },
  circularBorder: {
    position:'absolute',
    borderWidth:1,
    borderColor:'#DDD',
    top:'50%',
    left:'50%',
    width: 0.6*screenWidth,
    height: 0.6*screenWidth,
    borderRadius: 0.3*screenWidth,
  },
  mainNoteball: {
  },
  fillParent: {
    position:'absolute',
    width:'100%',
    height:'100%'
  },
  centered: {
    position:'absolute',
    top:'50%',
    left:'50%'
  }
});
