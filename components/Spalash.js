import React, {useState, useEffect, useContext, createContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  TextInput,
  Modal,
  Button,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ImagePicker from 'react-native-image-crop-picker';

import RNImageToPdf from 'react-native-image-to-pdf';

import Share from 'react-native-share';

import FileViewer from 'react-native-file-viewer';

export var img_add = '';
export var p_name = '';

const screen = Dimensions.get('screen');

function Spalash({navigation}) {
  const [image, setimage] = useState([]);
  const [url, seturl] = useState([]);
  const [pdfname, setpdfname] = useState('');
  const [clicked, setclicked] = useState(false);
  const [isselected, setselected] = useState(false);
  const [isloading, setloading] = useState(false);

  ///select images
  function selectimage2() {
    ImagePicker.openPicker({
      multiple: true,
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(images => {
        // console.log(images);
        const imguri = images.map(item => {
          return item.path.slice(7, item.path.length);
        });
        //console.log(imguri);
        seturl(imguri);
        setimage(images);
        setselected(true);
      })
      .catch(() => {
        console.log('error');
      });
  }

  //pdf create
  const myAsyncPDFFunction = async () => {
    try {
      console.log(url);
      const options = {
        imagePaths: url,  //array of image path
        name: pdfname + '.pdf',
        maxSize: {
          // optional maximum image dimension - larger images will be resized
          width: 900,
          height: Math.round((screen.height / screen.width) * 900),
        },
        quality: 0.7, // optional compression paramter
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);

      console.log(pdf.filePath);
      img_add = pdf.filePath;
      p_name = pdfname + '.pdf';
      setloading(false);
     // setpdfname('');
      navigation.navigate('list');
    } catch (e) {
      console.log(e);
    }
    setclicked(!clicked);
    setimage([]);
    pdf_option();
  };

  //option to share

  const pdf_option = () =>
    Alert.alert('Pdf Created', 'Now You can share it', [
      {
        text: 'Open',
        onPress: () => view_pdf(),
      },
      {
        text: 'Share',
        onPress: () => share_pdf(),
        style: 'cancel',
      },
      {text: 'close', onPress: () => console.log('OK Pressed')},
    ]);

///view
function view_pdf() {
  console.log('hello');
  const path = '/storage/emulated/0/Android/data/com.easypdfconverter/files/'+p_name;
  FileViewer.open(path)
    .then(() => {
      //success
    })
    .catch(error => {
      // error
      console.log(error);
    });
}


  //// pdf share

  async function share_pdf() {
    const options2 = {
      message: 'Hello India',
      title: 'pdf testing',
      url: 'file:///storage/emulated/0/Android/data/com.easypdfconverter/files/'+pdfname+'.pdf',
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
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.logo}>
          <Text style={styles.text}> Easy PDF Converter</Text>
        </View>
        <ScrollView horizontal={false}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {image.map((img, index) => {
              if (img) {
                return (
                  <View
                    key={index}
                    style={{margin: 5, padding: 0, paddingBottom: 0}}>
                    <Image
                      key={index}
                      source={{uri: img.path}}
                      style={{width: 110, height: 110}}
                    />
                  </View>
                );
              }
            })}
          </View>
        </ScrollView>
      </View>
      {!clicked && (
        <View style={styles.middle}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Select Image
          </Text>
          <TouchableOpacity onPress={selectimage2}>
            <Text>
              {' '}
              <Icon size={40} name="image" />
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {!clicked && (
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              if (image.length == 0) {
                alert('No Image Selected. Please Select atleast one');
              } else {
                setclicked(true);
              }
            }}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
              Convert to pdf
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal transparent={true} visible={clicked}>
        <View styles={{flex: 1, backgroundColor: '#000000aa'}}>
          <View
            style={{
              backgroundColor: '#c5d5cb',
              marginTop: 200,
              margin: 50,
              padding: 40,
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Enter Pdf name"
              onChangeText={val => {
                setpdfname(val);
              }}
            />
            {isloading ? (
              <ActivityIndicator />
            ) : (
              <Button
                style={{marginTop: 20}}
                title="Convert to Pdf"
                onPress={async () => {
                  console.log(isloading);
                  if(pdfname===''){
                    alert("Enter Pdf name");
                  }else{
                  setloading(true);
                  console.log(isloading);
                  myAsyncPDFFunction();
                  }
                }}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                setclicked(!clicked);
                setimage([]);
              }}>
              <Text
                style={{
                  color: 'white',
                  justifyContent: 'center',
                  marginTop: 20,
                  marginLeft: 70,
                }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 22,
  },
  top: {
    flex: 0.86,
  },
  logo: {
    position: 'relative',
    width: '100%',
    height: 60,
    backgroundColor: '#1B1818',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    marginBottom: 10,
    flex: 0.07,
    backgroundColor: '#C4C4C4',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottom: {
    flex: 0.07,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spalash;
