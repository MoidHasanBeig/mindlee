import React,{ useRef, useEffect } from 'react';
import {
  Animated,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  View,
  ImageBackground
} from 'react-native';
import Ftext from './Ftext';
import Noteball from './Noteball';
import funx from '../functions';

const image = require('./assets/bg.png');

const AddItemButton = function AddItemButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.addItemButton,
        {
          width: 0.05*props.width,
          height: 0.05*props.width,
          borderRadius: 0.025*props.width,
          transform: [
            { translateX: -0.025*props.width},
            { translateY: -0.025*props.width},
            { rotate: '45deg' },
            { translateX: 0.3*props.width},
            { rotate: '-45deg' }
          ]
        }
      ]}
      onPress={() => console.log('hi')}
    >
      <Ftext>+</Ftext>
    </TouchableOpacity>
  );
}

const MapContainer = function MapContainer(props) {

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
      <AddItemButton width={props.width} />
    </View>
  );
}

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
        <MapContainer width={props.width}/>
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
  },
  mapContainer: {
    position:'absolute',
    borderWidth:1,
    borderColor:'#DDD',
    top:'50%',
    left:'50%',
  },
  addItemButton: {
    backgroundColor:'#CCC',
    justifyContent:'center',
    alignItems:'center',
    top:'50%',
    left:'50%'
  }
});
