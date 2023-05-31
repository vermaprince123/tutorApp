import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { app } from './firebaseConfig';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/AntDesign';


export default function UploadPdf(props) {
  const [doc, setDoc] = useState();
  const [uploading, setUploading] = useState(false);

  const storage = getStorage(app, "gs://test-d7c04.appspot.com");
  const navigate = useNavigate();


  const selectFile = async () => {
    const doc = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf'],
    });
    console.log(doc);
    setDoc(doc);
    uploadFileAsync(doc);
  }

  // console.log(props);

  async function uploadFileAsync(doc) {

    console.log(doc, "DOCUMENT FETCHED");

    if(doc.size > 2 * 1024 * 1024){
      ToastAndroid.show("File Size should be less than 2 MB", ToastAndroid.SHORT);
      return;
    }

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
      ToastAndroid.show("File Uploaded Successfully", ToastAndroid.SHORT);
    });


  }

  const handleLogin = () => {
    navigate('/');
  }

  return (
    <View style={styles.container}>
      {props.login ? <TouchableOpacity onPress={selectFile}><Text style={styles.uploadButton}>+</Text></TouchableOpacity> :
      <TouchableOpacity onPress={handleLogin}><Text style={styles.loginButton}><Icon
      name='login'
      size={25}
      /></Text></TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    position: "absolute",
    bottom: 60,
    right: 20,
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
  },
  loginButton: {
    color: "white",
    fontSize: 30,
    paddingVertical: 5
  }
});
