import React,{ useEffect,useState } from 'react';
import { TextInput, TouchableHighlight, StyleSheet, View, BackHandler } from 'react-native';
import Ftext from './Ftext';
import ButtonRound from './ButtonRound';
import NoteEditArea from './NoteEditArea';
import ChooseColorArea from './ChooseColorArea';

export default function CreateNote(props) {
  const [activeBtn,setActiveBtn] = useState('note');
  const [currentColor,setCurrentColor] = useState('#5CAB7D');
  const [noteValue,onChangeNote] = useState('');
  const [descValue,onChangeDesc] = useState('');

  const data = props.operatingValue;

  let newId = (function uniqueId() {
    let d = new Date();
    let unID = d.getTime();
    return unID;
  })();

  function saveNote(id=null) {
    if (props.entryType === 'newmap') {
      data[newId] = {
        title:noteValue,
        desc:descValue,
        color:currentColor,
        subdata:[],
        parent:'home'
      }
      props.setObjectValue(data);
    } else if (props.entryType === 'newnote') {
      data[newId] = {
        title:noteValue,
        desc:descValue,
        color:currentColor,
        subdata:[],
        parent:id
      }
      data[id].subdata.push(newId);
    } else {
      data[id] = {
        ...data[id],
        title:noteValue,
        desc:descValue,
        color:currentColor
      }
    }
    props.setShowCreateNote(false);
  }

  useEffect(() => {
    function backAction() {
      props.setShowCreateNote(false);
      return true;
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",backAction
    );
    return () => backHandler.remove();
  });

  return (
    <View style={styles.createNote}>
      <View style={styles.tabsHeader}>
        <TouchableHighlight style={styles.touchWrapperTabs} onPress={() => setActiveBtn('note')}>
          <View style={{...styles.tab,backgroundColor: activeBtn === 'note' ? '#5CAB7D' : '#DDD'}}>
            <Ftext color={activeBtn === 'note' ? '#FFF' : '#5CAB7D'}>NOTE</Ftext>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.touchWrapperTabs} onPress={() => setActiveBtn('color')}>
          <View style={{...styles.tab,backgroundColor: activeBtn === 'color' ? '#5CAB7D' : '#DDD'}}>
            <Ftext color={activeBtn === 'color' ? '#FFF' : '#5CAB7D'}>COLOR</Ftext>
          </View>
        </TouchableHighlight>
      </View>
      {activeBtn === 'note' ?
        <NoteEditArea
          noteValue={noteValue}
          onChangeNote={onChangeNote}
          descValue={descValue}
          onChangeDesc={onChangeDesc}
        /> :
        <ChooseColorArea
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
        />
      }
      <ButtonRound text='✓' handlePress={() => saveNote()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  createNote: {
    height:'100%',
    width:'100%',
    position:'absolute',
    top:0,
    left:0,
    zIndex:2,
    backgroundColor:'#FFF',
    elevation:5
  },
  tabsHeader: {
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-around',
    height:125
  },
  tab: {
    backgroundColor:'#DDD',
    height:'100%',
    alignItems:'center',
    justifyContent:'flex-end',
    paddingBottom:30
  },
  touchWrapperTabs: {
    flex:1
  }
});
