import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';

import { File } from 'react-native'

import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { app } from './firebaseConfig';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, listAll, list } from "firebase/storage";

import PdfItems from './PdfItems';

export default function App() {
  const [doc, setDoc] = useState();
  const [uploading, setUploading] = useState(false);

  const storage = getStorage(app, "gs://test-d7c04.appspot.com");


  const selectFile = async () => {
    const doc = await DocumentPicker.getDocumentAsync({});
    console.log(doc);
    setDoc(doc);
    uploadFileAsync(doc);

  }


  async function uploadFileAsync(doc) {
    // console.log(listAll(ref(storage)));

    const storageRef = ref(storage, doc.name);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", doc.uri, true);
      xhr.send(null);
    });

    //CORRECT ONE
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });


  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectFile}><Text>Select</Text></TouchableOpacity>
      <StatusBar style="auto" />
      <PdfItems />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
