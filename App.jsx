import React, {useState, useEffect} from 'react';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';

import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from 'react-native';

export default App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });
  const fetchWeatherData = async () => {
    const API_KEY = '479f70e613d340039d0191548242102';
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes&alerts=no`,
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData;
    }
  }, [city]);
  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to Weather App!</Text>
        <Image
          source={{uri: 'https://m.media-amazon.com/images/I/51ZgFK-FbwL.png'}}
          style={styles.weatherImage}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Enter your location"
          value={city}
          onChangeText={text => {
            setCity(text);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>
        {error && (
          <Text>{error}</Text>
        )}
        {weatherData && weatherData.location && weatherData.current && (
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>{weatherData.location.name}</Text>
            <Text style={styles.dataText}>{weatherData.location.country}</Text>
            <Image
              source={{uri: `http:${weatherData.current.condition.icon}`}}
              style={styles.weatherImage}
            />
            <Text style={styles.dataText}>{weatherData.current.temp_c}°C</Text>
            <Text style={styles.dataText}>{weatherData.current.condition.text}</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74b9ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
    padding: 5,
    marginTop: 20,
    marginBottom: 15,
    width: 250,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#0984e3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Montserrat_400Regular',
    color: 'white',
    fontSize: 18,
  },
  weatherText: {
    fontFamily: 'Montserrat_400Regular',
    color: '#000',
    fontSize: 20,
    marginBottom: 20,

  },
  weatherImage:{
    width: 100,
    height: 100,
  },
  dataText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 18,
    marginBottom: 5,
  },
  dataContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 200,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});