import React from 'react';
import {
  TouchableHighlight,
  View,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';
import Noteball from '../common_components/Noteball';
import colors from './colors';
import funx from '../../functions';

const screenWidth = Dimensions.get('window').width;

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
                <View
                  key={funx.uniqueId(index)}
                  style={{padding:0.04 * screenWidth}}
                >
                  <Noteball
                    color={color}
                    size={9}
                    onPress={() => props.setCurrentColor(color)}
                  />
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
