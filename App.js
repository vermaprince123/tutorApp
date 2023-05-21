import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';

import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { storage, app } from './firebaseConfig';
import { getStorage, ref, uploadBytes } from "firebase/storage";


export default function App() {
  const [doc, setDoc] = useState();
  const [uploading, setUploading] = useState(false);
  const selectFile = async () => {
    const doc = await DocumentPicker.getDocumentAsync({});
    console.log(doc);
    setDoc(doc);
    // uploadFile(doc);
    uploadImageAsync(doc.uri);

  }

  // const uploadFile = async (doc) => {
  //   setUploading(true);
  //   const response = await fetch(doc.uri);

  //   const blob = await response.blob();
  //   const filename = doc.name;

  //   const storageRef = ref(storage, filename);

  //   // 'file' comes from the Blob or File API
  //   uploadBytes(storageRef, blob).then((snapshot) => {
  //     console.log('Uploaded a blob or file!');
  //   }).catch((e) => {console.log(e)});
  // }

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log("ERROR");
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
      console.log(xhr.open)
    });

    // console.log(blob, "BLOB")

    const fileRef = ref(storage, '12123');
    // console.log(fileRef, "FILEREF")
    const result = await uploadBytes(fileRef, blob);


    // We're done with the blob, close and release it
    blob.close();

    // console.log(result);
  }

  return (
    <View style={styles.container}>
      <Text onPress={selectFile}>Select</Text>
      <Text>{doc && doc.uri}</Text>
      <StatusBar style="auto" />
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
