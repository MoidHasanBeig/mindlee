import React,{ useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import CreateNote from './components/CreateNote';

export default function App() {

  const [showCreateNote,setShowCreateNote] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Home setShowCreateNote={setShowCreateNote} />
      {showCreateNote && <CreateNote setShowCreateNote={setShowCreateNote} />}
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
