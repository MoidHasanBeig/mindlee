import React from 'react';
import {
  TouchableOpacity,
  useWindowDimensions,
  View,
  StyleSheet,
  Animated
} from 'react-native';
import Ftext from '../common_components/Ftext';
import funx from '../../functions';

export default function GoBack(props) {
  return (
    <Animated.View style={[
      styles.container,
      {
        height:0.3*props.width,
        width:0.3*props.width,
        borderBottomRightRadius:0.3*props.width
      }
    ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.traverse()}
        style={styles.goBack}
      >
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    overflow:'hidden'
  },
  goBack: {
    backgroundColor:'#5CAB7D',
    width:'100%',
    height:'100%'
  }
});
