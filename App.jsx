import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';

export default App = () => {
  const [city, setCity] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Weather App!</Text>
      <TextInput
        style = {styles.TextInput}
        placeholder='Enter your location'
        value = {city}
        onChangeText = {(text) =>{
          setCity(text);
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textInput: {
    height: 24,
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    padding: 10,
    marginTop: 20,
  },
});