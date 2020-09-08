import React,{ useRef, useEffect } from 'react';
import {
  Animated,
  BackHandler,
  TouchableHighlight,
  StyleSheet,
  View,
  ImageBackground
} from 'react-native';
import Ftext from './Ftext';
import Noteball from './Noteball';
import funx from '../functions';

const image = require('./assets/bg.png');

export default function MindMap(props) {
  const swipeAnim = useRef(new Animated.Value(500)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    funx.initiateAnim(swipeAnim,0,fadeAnim,1);
  });

  useEffect(() => {
    function backAction() {
      funx.initiateAnim(swipeAnim,500,fadeAnim,0,() => props.setShowMap(false));
      return true;
    }
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
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mindMap: {
    position:'absolute',
    left:0,
    justifyContent: "center",
    width:'100%',
    height:'100%',
    elevation:5,
  },
  image: {
    resizeMode: "cover",
    width:'100%',
    flex:1
  }
});
