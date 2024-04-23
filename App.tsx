/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
navigator.geolocation = require('@react-native-community/geolocation');
import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
  locationProvider: 'android',
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [state, setState] = useState<GeolocationResponse | undefined>();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Lon: {state?.coords.longitude}</Text>
          <Text>Lat: {state?.coords.latitude}</Text>
          <Text>Speed: {state?.coords.speed}</Text>
          <Text>Altitude: {state?.coords.altitude}</Text>
          <Text>Altitude: {state?.coords.accuracy}</Text>
          <Button
            title="Test"
            onPress={() => {
              Geolocation.watchPosition(
                pos => {
                  console.log(JSON.stringify(pos, null, 2));
                  setState(pos);
                },
                () => {},
                {
                  enableHighAccuracy: true,
                  interval: 500,
                  maximumAge: 100,
                },
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
