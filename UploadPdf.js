import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { app } from './firebaseConfig';
import { getStorage, ref, uploadBytes } from "firebase/storage";


export default function UploadPdf() {
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
      <TouchableOpacity onPress={selectFile}><Text style={styles.uploadButton}>+</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    position: "absolute",
    bottom: 35,
    right: 35,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 10
    // width: 10,
    // height: 10,
    // borderRadius: "10px"
  },
  uploadButton: {
    color: "white",
    fontSize: 30,
  }
});
