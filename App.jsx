import React, {useState, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';

export default App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeaterData] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchWatherData = async () => {
    const APIKEY = '479f70e613d340039d0191548242102';

    try {
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${City}&days=5&aqi=yes&alerts=no`);
      const data = await res.json();
      setWeaterData(data);
      setError(null);
    }
    catch (err) {
      console.log('weather error ' + err);
      setError('Error fetching data. Try again');
    }
  }
    useEffect(() => {
      if(city){
        fetchWatherData();
      }
    }, [city]);

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
      <TouchableOpacity style={styles.button}
        OnPress={fetchWatherData}  
      >
        <Text>Get Weather</Text>
      </TouchableOpacity>
      {error && (
        <Text>{error}</Text>
        )}
      {weatherData && (
        <View>
          <Text>City:{weatherData.location.name}</Text>
          <Text>Temperature: {weatherData.current.temp_c}</Text>
          <Text>Condition: {weatherData.current.condition.text}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
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
  button: {
    marginTop: 20,
    padding: 10,
    color: 'white',
    width: '50%',
    height: 60,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
});