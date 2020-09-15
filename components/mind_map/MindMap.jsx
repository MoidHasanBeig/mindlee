import React,{ useRef, useEffect } from 'react';
import {
  Animated,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions
} from 'react-native';
import Ftext from '../common_components/Ftext';
import MapContainer from './MapContainer';
import GoBack from './GoBack';
import funx from '../../functions';
import animx from '../../animations';

const image = require('../assets/bg.png');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MindMap(props) {
  const swipeAnim = useRef(new Animated.Value(500)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mapTransitionAnim_1 = useRef(new Animated.Value(1)).current;
  const mapTransitionAnim_2 = useRef(new Animated.Value(1)).current;
  const mapTransitionAnim_3 = useRef(new Animated.Value(1)).current;
  const mapTransitionAnim_4 = useRef(new Animated.Value(1)).current;
  const {
    navigateScreenAnim,
    mindmapTransitions,
    interpolation
  } = animx;

  const xdist = 0.50*screenWidth;
  const ydist = 0.50*screenHeight;

  const goBackTranslateX = interpolation(mapTransitionAnim_2,[0,1,2],[xdist,0,-xdist*0.7]);
  const goBackTranslateY = interpolation(mapTransitionAnim_2,[0,1,2],[ydist,0,-ydist*0.7]);
  const goBackScale = interpolation(mapTransitionAnim_3,[0,1,2],[0.25,1,1]);

  function backAction() {
    if (props.note.parent === 'home') navigateScreenAnim(swipeAnim,500,fadeAnim,0,() => props.setShowMap(false));
    else {
      mindmapTransitions(
        {
          mapTransitionAnim_1,
          mapTransitionAnim_2,
          mapTransitionAnim_3,
          mapTransitionAnim_4,
          transVal:0,
          intermediateVal:2,
          finalVal:1
        },
        () => {
          funx.mapTraverse(props.note.parent,props.setShowMap,props.operatingValue);
        })
    }
    return true;
  }

  useEffect(() => {
    navigateScreenAnim(swipeAnim,0,fadeAnim,1);
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",backAction
    );
    return () => backHandler.remove();
  });

  return (
    <Animated.View style={{
      ...styles.mindMap,
      opacity:fadeAnim,
      transform:[
        { translateY:swipeAnim }
      ]
    }}>
      <ImageBackground source={image} style={styles.image}>
        <Animated.View style={{
          position:'absolute',
          top:0,
          left:0,
          transform:[
            { translateX: -0.35*screenWidth },
            { translateY: -0.35*screenWidth },
            { translateX: goBackTranslateX },
            { translateY: goBackTranslateY },
            { scale: goBackScale }
          ],
          height:0.7*screenWidth,
          width:0.7*screenWidth
        }}>
          <GoBack
          traverse={() => backAction()}
          id={props.note.parent}
          />
        </Animated.View>
        <MapContainer
          note={props.note}
          setShowMap={(note) => props.setShowMap(note)}
          setShowCreateNote={(entry) => props.setShowCreateNote(entry)}
          operatingValue={props.operatingValue}
          mapTransitionAnim_1={mapTransitionAnim_1}
          mapTransitionAnim_2={mapTransitionAnim_2}
          mapTransitionAnim_3={mapTransitionAnim_3}
          mapTransitionAnim_4={mapTransitionAnim_4}
        />
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mindMap: {
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    elevation:5,
  },
  image: {
    resizeMode: "cover",
    width:'100%',
    justifyContent: "center",
    flex:1
  }
});
