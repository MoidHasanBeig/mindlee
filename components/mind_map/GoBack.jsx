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
      {
        props.id!=='home'
        ? <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.traverse()}
          style={[
            styles.goBack,
            { backgroundColor: props.color || '#5CAB7D'}
          ]}
        >
          <Ftext size={35}>{props.title}</Ftext>
        </TouchableOpacity>
        : <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.traverse()}
            style={styles.goHome}
          >
          <Ftext color='#000' size={35}>🏠</Ftext>
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    overflow:'hidden',
    height:'100%',
    width:'100%',
    borderRadius:0.35*screenWidth,
  },
  goBack: {
    width:'100%',
    height:'100%',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  goHome: {
    width:'100%',
    height:'100%',
    position:'absolute',
    top:'60%',
    left:'55%'
  }
});
