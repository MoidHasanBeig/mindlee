import React,{ useRef, useState, useEffect, useCallback } from 'react';
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
  const [currentBall,setCurrentBall] = useState();
  const angle = useRef(new Animated.Value(0)).current;
  const initialAngle = useRef(new Animated.Value(0)).current;
  const psuedoAngle = useRef(new Animated.Value(0)).current;
  const commonAngle = 360/props.note.subdata.length;
  const offsetAngle = commonAngle/2;
  const {
    navigateScreenAnim,
    mindmapTransitions,
    interpolation,
    timingAnim
  } = animx;

  const spin = interpolation(angle,[0,360],['0deg','360deg']);
  const reverseSpin = interpolation(angle,[0,360],['-0deg','-360deg']);

  const scaleContainer = interpolation(props.mapTransitionAnim_1,[0,2],[0,2]);
  const fadeContainer = interpolation(props.mapTransitionAnim_1,[0,1,2],[0,1,0]);
  const mainNoteballTranslateX = interpolation(props.mapTransitionAnim_3,[0,1,2],[0,0,!props.isShifted ? -0.5*screenWidth : -0.8*screenWidth]);
  const mainNoteballTranslateY = interpolation(props.mapTransitionAnim_3,[0,1,2],[0,0,!props.isShifted ? -0.5*screenHeight : -0.95*screenHeight]);
  const mainNoteballScale = interpolation(props.mapTransitionAnim_3,[0,1,2],[0.5,1,2.8]);
  const mainNoteballOpacity = interpolation(props.mapTransitionAnim_3,[0,1,2],[0,1,1]);
  const subNoteballScale = interpolation(props.mapTransitionAnim_4,[0,1,2],[0.5,1,1.25]);
  const subNoteballOpacity = interpolation(props.mapTransitionAnim_5,[0,1,2],[0,1,0]);

  const translateMapX = interpolation(props.shiftMap,[0,1],[0,0.3*screenWidth]);
  const translateMapY = interpolation(props.shiftMap,[0,1],[0,0.45*screenHeight]);
  const scaleContainer_2 = interpolation(props.shiftMap,[0,1],[1,2]);
  const shiftSubNoteballs = interpolation(props.shiftMap,[0,1],[0,0.3*screenWidth]);

  const [startArr,setStartArr] = useState(props.note.subdata.length-5);
  const [endArr,setEndArr] = useState(props.note.subdata.length-1);

  const measuredRef = useCallback(node => {
    // angle.removeAllListeners();
    //  if (node !== null) {
    //    angle.addListener(({value}) => {
    //      node.measure((fx,fy,height,width,px,py) => {
    //        if (px>screenWidth) {
    //          if(endArr === 0) setEndArr(props.note.subdata.length-1);
    //          else setEndArr(prevValue => prevValue-1);
    //          if(startArr === 0) setStartArr(props.note.subdata.length-1);
    //          else setStartArr(prevValue => prevValue-1);
    //          console.log(startArr,endArr);
    //        }
    //      })
    //    })
    //  }
   }, []);

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
          psuedoAngle.setValue(theta);
      },
      onPanResponderRelease: (evt, {vx, vy}) => {
        let xPos = Math.sign(evt.nativeEvent.pageX-screenWidth/2);
        let yPos = Math.sign(evt.nativeEvent.pageY-screenHeight/2);
        let velocity = (xPos*vy-yPos*vx)*0.6;
        const decay1 = Animated.decay(angle,{
            velocity: velocity,
            deceleration: 0.997,
            useNativeDriver: true
          }
        );
        const decay2 = Animated.decay(psuedoAngle,{
            velocity: velocity,
            deceleration: 0.997,
            useNativeDriver: false
          }
        );
        Animated.parallel([decay1,decay2]).start(() => {
          psuedoAngle.flattenOffset();
          while (psuedoAngle._value>=360) {
            psuedoAngle.setValue(psuedoAngle._value-360);
          }
          angle.setOffset(psuedoAngle._value);
          psuedoAngle.setOffset(psuedoAngle._value);
          angle.setValue(0);
          psuedoAngle.setValue(0);
        });
      }
    })
  ).current;

  useEffect(() => {
    if (props.note.subdata.length>5) {
      timingAnim(props.shiftMap,1,250).start();
      props.setIsShifted(true);
    }
    else {
      timingAnim(props.shiftMap,0,250).start();
      props.setIsShifted(false);
    }
  },[props.note.subdata.length]);

  return (
    <Animated.View
      style={[
        styles.mapContainer,
        {
          width: !props.isShifted ? 0.9*screenWidth : 1.8*screenWidth,
          height: !props.isShifted ? 0.9*screenWidth : 1.8*screenWidth,
          transform:[
            { translateX: 0.5*screenWidth-(!props.isShifted ? 0.45*screenWidth : 0.9*screenWidth) },
            { translateY: 0.5*screenHeight-(!props.isShifted ? 0.45*screenWidth : 0.9*screenWidth) },
            { translateX: translateMapX },
            { translateY: translateMapY }
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
              { scale: scaleContainer },
              { scale: scaleContainer_2 }
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
            { translateX: -10*screenWidth/100 },
            { translateY: -10*screenWidth/100 },
            { translateX: mainNoteballTranslateX },
            { translateY: mainNoteballTranslateY },
            { scale: mainNoteballScale }
          ],
          opacity:mainNoteballOpacity
        }
      ]}>
        <Noteball
          onPress={() => funx.editNote()}
          text={props.note.title}
          color={props.note.color}
          size={20}
          style={{
            transform:[
              { scale: 1.25 }
            ]
          }}
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
                  ref={index === endArr ? measuredRef : null}
                  style={[
                    styles.centered,
                    {
                      transform:[
                        { translateX: -0.1*screenWidth },
                        { translateY: -0.1*screenWidth },
                        { rotate: index*commonAngle+'deg'},
                        { rotate: spin },
                        { translateX: 0.3*screenWidth },
                        { translateX: shiftSubNoteballs },
                        { rotate: '-'+index*commonAngle+'deg'},
                        { translateX: interpolation(
                            props.mapTransitionAnim_4,
                            [0,1,2],
                            [
                              funx.translateDist(
                                index*commonAngle,
                                screenWidth,
                                false,
                                "x"
                              ),
                              0,
                              funx.translateDist(
                                index*commonAngle,
                                !props.isShifted ? screenWidth : 2*screenWidth,
                                currentBall === index,
                                "x"
                              )
                            ])
                          },
                        { translateY: interpolation(
                            props.mapTransitionAnim_4,
                            [0,1,2],
                            [
                              funx.translateDist(
                                index*commonAngle,
                                screenHeight,
                                false,
                                "y"
                              ),
                              0,
                              funx.translateDist(
                                index*commonAngle,
                                !props.isShifted ? screenWidth : 2*screenWidth,
                                currentBall === index,
                                "y"
                              )
                            ])
                          },
                          { scale: currentBall === index ? subNoteballScale : 1 }
                        ],
                        opacity: subNoteballOpacity
                      }
                    ]
                  }
                >
                  <Noteball
                    onPress={() =>
                      {
                        setCurrentBall(index);
                        mindmapTransitions(
                          {
                            mapTransitionAnim_1:props.mapTransitionAnim_1,
                            mapTransitionAnim_2:props.mapTransitionAnim_2,
                            mapTransitionAnim_3:props.mapTransitionAnim_3,
                            mapTransitionAnim_4:props.mapTransitionAnim_4,
                            mapTransitionAnim_5:props.mapTransitionAnim_5,
                            shiftMap:props.shiftMap,
                            transVal:2,
                            intermediateVal_1:0,
                            intermediateVal_2:1,
                            finalVal:1,
                            id:item,
                            note:props.operatingValue,
                            setIsShifted:props.setIsShifted
                          },
                          () => {
                            funx.mapTraverse(item,props.setShowMap,props.operatingValue)
                          })
                        }
                      }
                    text={props.operatingValue[item].title}
                    color={props.operatingValue[item].color}
                    size={20}
                    index={index}
                    angle={reverseSpin}
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
                        { translateX: shiftSubNoteballs },
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
    top:0,
    left:0,
    justifyContent:'center',
    alignItems:'center',
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
