import React from 'react';
import {
  TouchableHighlight,
  View,
  TextInput,
  StyleSheet
} from 'react-native';
import Noteball from '../common_components/Noteball';
import funx from '../../functions';

export default function ChooseColorArea(props) {

  const colorArr = [
    "#368567",
    "#409c7e",
    "#4ab599",
    "#56d4ba",
    "#5ee2bf",
    "#8fd6c4",
    "#97bfb4",
    "#11566b",
    "#22737f",
    "#4598a0",
    "#40bac9",
    "#52d5ea",
    "#7dc8db",
    "#89b8cc",
    "#611923",
    "#9a2a26",
    "#c14926",
    "#d25a37",
    "#de6431",
    "#69648c",
    "#8b84a6",
    "#b2afc4",
    "#c7c5d3",
    "#cecdd2",
    "#a3a2a8"
  ];

  return (
    <View style={styles.chooseColorArea}>
      <View style={styles.section1}>
        <Noteball color={props.currentColor} size={40} />
      </View>
      <View style={styles.section2}>
        <View style={styles.colorPalette}>
          {
            colorArr.map((color,index) => {
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
