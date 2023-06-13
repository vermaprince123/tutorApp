import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { app } from './firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { USER_EMAIL, ERROR_MSG, UPLOAD_LINK } from './AppConstant';


export default function UploadPdf(props) {
  const [doc, setDoc] = useState();
  const [uploading, setUploading] = useState(false);

  const storage = getStorage(app, UPLOAD_LINK);
  const navigate = useNavigate();


  const selectFile = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf'],
      });
      setDoc(doc);
      uploadFileAsync(doc);
    } catch (error) {
      console.log(error,"selectFile function");
      ToastAndroid.show(ERROR_MSG, ToastAndroid.SHORT);
    }
  }

  async function uploadFileAsync(doc) {
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
        console.log(e, "onerror function");
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", doc.uri, true);
      xhr.send(null);
    });

    //CORRECT ONE
    uploadBytes(storageRef, blob).then(() => {
      ToastAndroid.show("File Uploaded Successfully", ToastAndroid.SHORT);
    }).then(() => {
      const fileRef = ref(storage, doc.name);
      const url = getDownloadURL(fileRef)
      return url;
    }).then((url) => {
      props.updateFiles({name: doc.name, src: url});
    }).catch((error)=>{
      console.log(error, "uploadBytes");
      ToastAndroid.show(ERROR_MSG, ToastAndroid.SHORT);
    })


  }

  const handleLogin = () => {
    navigate('/');
  }

  return (
    <View style={styles.container}>
      {props.login ? <TouchableOpacity style={styles.buttonContainer} onPress={selectFile}><Text style={styles.uploadButton}>+</Text></TouchableOpacity> :
      <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}><Text style={styles.loginButton}><Icon
      name='login'
      size={25}
      /></Text></TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingLeft: 7,
    paddingRight: 5
  },
  container: {
    position: "absolute",
    bottom: Dimensions.get('window').height*0.12,
    right: 20,
    // paddingVertical: 7,
    // paddingHorizontal: 15,
    // borderRadius: 10,
    // backgroundColor: '#000',
   
  },
  uploadButton: {
    color: "white",
    fontSize: 30,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#000',
    
  },
  loginButton: {
    color: "white",
    fontSize: 30,
    // paddingVertical: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#000',
  }
});
