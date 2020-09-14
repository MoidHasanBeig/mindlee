import React,{ useRef, useEffect } from 'react';
import {
  Animated,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  View,
  ImageBackground
} from 'react-native';
import Ftext from '../common_components/Ftext';
import MapContainer from './MapContainer';
import GoBack from './GoBack';
import funx from '../../functions';
import animx from '../../animations';

const image = require('../assets/bg.png');

export default function MindMap(props) {
  const swipeAnim = useRef(new Animated.Value(500)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function backAction() {
    if (props.note.parent === 'home') animx.navigateScreenAnim(swipeAnim,500,fadeAnim,0,() => props.setShowMap(false));
    else funx.mapTraverse(props.note.parent,"out",props.setShowMap,props.operatingValue);
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
        <GoBack
          width={props.width}
          traverse={() => backAction()}
          id={props.note.parent}
        />
        <MapContainer
          note={props.note}
          width={props.width}
          setShowMap={(note) => props.setShowMap(note)}
          setShowCreateNote={(entry) => props.setShowCreateNote(entry)}
          operatingValue={props.operatingValue}
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
