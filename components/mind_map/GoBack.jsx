import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import Ftext from '../common_components/Ftext';
import funx from '../../functions';

const screenWidth = Dimensions.get('window').width;

export default function GoBack(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.traverse()}
        style={styles.goBack}
      >
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    overflow:'hidden',
    height:0.5*screenWidth,
    width:0.5*screenWidth,
    borderRadius:0.25*screenWidth,
    transform: [
      { translateX: -0.2*screenWidth },
      { translateY: -0.2*screenWidth },
    ]
  },
  goBack: {
    backgroundColor:'#5CAB7D',
    width:'100%',
    height:'100%'
  }
});
