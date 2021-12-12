import React from 'react';
import {View, Button, Text, Image, StyleSheet} from 'react-native';

function Main({navigation}) {
  return (
    <View style={styles.main}>
      <View style={styles.top}>
        <Image style={styles.logo} source={require('../assets/logop.png')} />
      </View>
      <View style={styles.bottom}>
        <View style={styles.login_button}>
          <Button
            title="Continue To App"
            backgroundColor="#1C1A1A"
            onPress={() => {
              navigation.navigate('Spalash');
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  top: {
    padding: 50,
    flex: 0.8,
    backgroundColor: 'white',
  },
  logo: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  bottom: {
    flex: 0.2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  login_button: {
    //backgroundColor: '#1C1A1A',
    width: '80%',
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default Main;
