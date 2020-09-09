import React,{ useEffect, useState, useRef } from 'react';
import {
  Animated,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  View,
  BackHandler
} from 'react-native';
import Ftext from '../common_components/Ftext';
import ButtonRound from '../common_components/ButtonRound';
import NoteEditArea from './NoteEditArea';
import ChooseColorArea from './ChooseColorArea';
import funx from '../../functions';

export default function CreateNote(props) {
  const [activeBtn,setActiveBtn] = useState('note');
  const [currentColor,setCurrentColor] = useState('#5CAB7D');
  const [noteValue,onChangeNote] = useState('');
  const [descValue,onChangeDesc] = useState('');

  const swipeAnim = useRef(new Animated.Value(500)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const data = props.operatingValue;

  let newId = (function uniqueId() {
    let d = new Date();
    let unID = d.getTime();
    return unID;
  })();

  function saveNote() {
    if (props.entryType === 'newmap') {
      data[newId] = {
        id:newId,
        title:noteValue,
        desc:descValue,
        color:currentColor,
        subdata:[],
        parent:'home'
      }
      props.setObjectValue(data);
    } else if (props.entryType === 'newnote') {
      data[newId] = {
        id:newId,
        title:noteValue,
        desc:descValue,
        color:currentColor,
        subdata:[],
        parent:props.parentId
      }
      data[props.parentId].subdata.push(newId);
    } else {
      data[id] = {
        ...data[id],
        title:noteValue,
        desc:descValue,
        color:currentColor
      }
    }
    funx.initiateAnim(swipeAnim,500,fadeAnim,0,() => props.setShowCreateNote(false));
  }

  useEffect(() => {
    console.log(props.entryType);
  })

  useEffect(() => {
    funx.initiateAnim(swipeAnim,0,fadeAnim,1);
  });

  useEffect(() => {
    function backAction() {
      funx.initiateAnim(swipeAnim,500,fadeAnim,0,() => props.setShowCreateNote(false));
      return true;
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",backAction
    );
    return () => backHandler.remove();
  });

  return (
    <Animated.View style={{
      ...styles.createNote,
      opacity:fadeAnim,
      top:swipeAnim
    }}>
      <View style={[
        styles.tabsHeader,
        {
          height: 0.25*props.width
        }
      ]}>
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
          width={props.width}
        /> :
        <ChooseColorArea
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          width={props.width}
        />
      }
      <ButtonRound
        text='✓'
        handlePress={() => saveNote()}
        width={props.width}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  createNote: {
    height:'100%',
    width:'100%',
    position:'absolute',
    left:0,
    elevation:5,
    backgroundColor:'#FFF'
  },
  tabsHeader: {
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-around',
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
