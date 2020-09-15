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
  const mapTransitionAnim = useRef(new Animated.Value(1)).current;

  const goBackTranslateX = mapTransitionAnim.interpolate({
    inputRange:[0,1,2],
    outputRange:[screenWidth/2,0,-screenWidth/2]
  });
  const goBackTranslateY = mapTransitionAnim.interpolate({
    inputRange:[0,1,2],
    outputRange:[screenHeight/2,0,-screenHeight/2]
  });

  function backAction() {
    if (props.note.parent === 'home') animx.navigateScreenAnim(swipeAnim,500,fadeAnim,0,() => props.setShowMap(false));
    else {
      animx.mindmapTransitions(
        {
          mapTransitionAnim,
          transVal:0,
          finalVal:1
        },
        () => {
          funx.mapTraverse(props.note.parent,props.setShowMap,props.operatingValue);
        })
    }
    return true;
  }

  useEffect(() => {
    animx.navigateScreenAnim(swipeAnim,0,fadeAnim,1);
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
      top:swipeAnim
    }}>
      <ImageBackground source={image} style={styles.image}>
        <Animated.View style={{
          position:'absolute',
          top:0,
          left:0,
          transform:[
            { translateX: goBackTranslateX },
            { translateY: goBackTranslateY }
          ],
          height:0.5*screenWidth,
          width:0.5*screenWidth
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
          mapTransitionAnim={mapTransitionAnim}
        />
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mindMap: {
    position:'absolute',
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
