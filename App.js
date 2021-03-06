import React,{ useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View
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
        />
      }
      {
        showMap &&
        <MindMap
          setShowMap={(note) => setShowMap(note)}
          setShowCreateNote={(type) => setShowCreateNote(type)}
          note={showMap}
          operatingValue={operatingValue}
        />
      }
      {
        showCreateNote &&
        <CreateNote
          entryType={showCreateNote.entryType}
          parentId={showCreateNote.parentId}
          index={showCreateNote.index}
          setShowCreateNote={setShowCreateNote}
          setObjectValue={setObjectValue}
          operatingValue={operatingValue}
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
