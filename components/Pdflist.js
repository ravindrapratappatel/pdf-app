import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';
import {img_add, p_name} from './Spalash';
function Pdflist() {
  ///read pdf
  function view_pdf() {
    console.log('hello');
    const path = '/storage/emulated/0/Android/data/com.easypdfconverter/files/'+p_name;
    FileViewer.open(path)
      .then(() => {
        //success
        console.log('kk')
      })
      .catch(error => {
        // error
        console.log(error);
      });
  }

  //////share
  async function share_pdf() {
    const options2 = {
      message: 'Hello India',
      title: 'pdf testing',
      url: 'file:///storage/emulated/0/Android/data/com.easypdfconverter/files/'+p_name,
      type: 'application/pdf',
    };

    await Share.open(options2)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  }

  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          backgroundColor: '#6F6060',
        }}>
        <Text style={{fontSize: 22}}>Your Pdf List</Text>
      </View>
      <ScrollView>
        <View style={styles.item}>
          <View style={styles.col1}>
            <TouchableOpacity onPress={view_pdf}>
              <Text style={{fontSize: 15}}>{p_name}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col2}>
            <Text>
              <TouchableOpacity onPress={share_pdf}>
                <Icon size={26} name="share" />
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 0,
  },
  item: {
    marginTop: 30,
    margin: 5,
    flexDirection: 'row',
    elevation: 60,
    height: 40,
    width: '100%',
    borderColor: 'red',
  },
  col1: {
    flex: 0.5,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  col2: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
  },
});

export default Pdflist;
