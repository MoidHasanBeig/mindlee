import React,{ useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Home from './components/home/Home';
import MindMap from './components/mind_map/MindMap';
import CreateNote from './components/create_note/CreateNote';

export default function App() {
  const [operatingValue, setOperatingValue] = useState({});
  const [showHome,setShowHome] = useState(true);
  const [showMap,setShowMap] = useState(false);
  const [showCreateNote,setShowCreateNote] = useState(false);
  const width = useWindowDimensions().width;

  const getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@key')
      if (jsonValue != null) {
        setOperatingValue(JSON.parse(jsonValue));
        console.log('Loaded.');
        return JSON.parse(jsonValue);
      }
      return null;
    } catch(e) {
      console.log(e);
    }
  }


  const setObjectValue = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('key', jsonValue)
      setOperatingValue(value);
    } catch(e) {
      console.log(e);
    }
    console.log('Done.')
  }

  useEffect(() => {
    getMyObject();
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {
        showHome &&
        <Home
          allMaps={operatingValue}
          setShowCreateNote={() => setShowCreateNote({entryType:'newmap'})}
          setShowMap={(note) => setShowMap(note)}
          width={width}
        />
      }
      {
        showMap &&
        <MindMap
          setShowMap={() => setShowMap(false)}
          setShowCreateNote={(type) => setShowCreateNote(type)}
          note={showMap}
          operatingValue={operatingValue}
          width={width}
        />
      }
      {
        showCreateNote &&
        <CreateNote
          entryType={showCreateNote.entryType}
          parentId={showCreateNote.parentId}
          setShowCreateNote={setShowCreateNote}
          setObjectValue={setObjectValue}
          operatingValue={operatingValue}
          width={width}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});
