import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image, Linking } from 'react-native';

import { File } from 'react-native'

import * as DocumentPicker from 'expo-document-picker';
import { useEffect, useState } from 'react';
import { app } from './firebaseConfig';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, listAll } from "firebase/storage";
import fetchFiles from './fetchFiles';
// import fArray from './fetchFiles';

export default function PdfItems() {
  // console.log("PDFITEMS CALLED", fArray.length)
  const [fArray, setfArray] = useState(null);
  // const fArray = null;
  useEffect(()=>{
    (async ()=>{
      var arr = await fetchFiles();
      console.log(arr, "ret arr")
      setfArray(arr);
    })();
    // console.log(first)

  }, []);

  // console.log(fetchFiles(), "dsdsd")
  
  return (
    <View style={styles.container}>
      <Text>PDF Items</Text>
      {fArray ? fArray.map((file) => {
        console.log(file);
        return <Text key={file.name}>{file.name}</Text>
      }) : <Text>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});