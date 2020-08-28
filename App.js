import React,{ useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Home from './components/Home';
import CreateNote from './components/CreateNote';

export default function App() {
  const [operatingValue, setOperatingValue] = useState({});
  const [showCreateNote,setShowCreateNote] = useState(false);


  const getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@key')
      if (jsonValue != null) {
        setOperatingValue(JSON.parse(jsonValue));
        return JSON.parse(jsonValue);
      }
      return null;
    } catch(e) {
      // read error
    }
    console.log('Done.')
  }


  const setObjectValue = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('key', jsonValue)
      setOperatingValue(value);
    } catch(e) {
      // save error
    }
    console.log('Done.')
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Home allMaps={operatingValue} setShowCreateNote={() => setShowCreateNote('newmap')} />
      {
        showCreateNote &&
        <CreateNote
          entryType={showCreateNote}
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
  },
});
