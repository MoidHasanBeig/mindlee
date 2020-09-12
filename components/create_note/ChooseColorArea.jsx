import React from 'react';
import {
  TouchableHighlight,
  View,
  TextInput,
  StyleSheet
} from 'react-native';
import Noteball from '../common_components/Noteball';
import colors from './colors';
import funx from '../../functions';

export default function ChooseColorArea(props) {

  return (
    <View style={styles.chooseColorArea}>
      <View style={styles.section1}>
        <Noteball color={props.currentColor} size={40} />
      </View>
      <View style={styles.section2}>
        <View style={styles.colorPalette}>
          {
            colors.map((color,index) => {
              return (
                <View key={funx.uniqueId(index)} style={{padding:0.04 * props.width}}>
                  <TouchableHighlight
                    style={{borderRadius:50}}
                    onPress={() => props.setCurrentColor(color)}
                  >
                    <Noteball color={color} size={9}/>
                  </TouchableHighlight>
                </View>
              );
            })
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chooseColorArea: {
    flex:1,
    paddingTop:40
  },
  section1: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  section2: {
    flex:2
  },
  colorPalette: {
    flexDirection:'row',
    justifyContent:'space-around',
    flexWrap:'wrap'
  }
});
