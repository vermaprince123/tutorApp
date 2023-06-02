import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image, Linking, Button, ScrollView, ToastAndroid, Dimensions, ActivityIndicator } from 'react-native';

import { File } from 'react-native'

import * as DocumentPicker from 'expo-document-picker';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { app } from './firebaseConfig';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import fetchFiles from './fetchFiles';
import { NativeRouter, Route, Link, Routes } from "react-router-native";
import DownloadedItem from './DownloadedItem';
import UploadPdf from './UploadPdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import fArray from './fetchFiles';

export default function PdfItems() {
  // console.log("PDFITEMS CALLED", fArray.length)
  const auth = getAuth(app);
  const [fArray, setfArray] = useState(null);
  const [login, setLogin] = useState(false);


  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      global.user = null
      ToastAndroid.show("Signed Out of Teacher mode", ToastAndroid.SHORT);
    }).catch((error) => {
      // An error happened.
    });
  }
  // const fArray = null;
  useEffect(() => {
    (async () => {
      console.log("INSIDE IFFIE")
      var arr = await fetchFiles();
      console.log(arr, "ret arr")
      setfArray(arr);
    })();
    console.log("fetchong")
    const user = global.user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setLogin(true);
        // ...
      } else {
        // User is signed out
        setLogin(false);
        // ...
      }
    });

  }, []);

  const handleDelete = (name) => {
    // console.log(name, "NAAAAMMMMMMMEEEE")
    console.log(fArray.length, "BEFORE LENGTH");
    const arr = fArray.filter((file) => {
      console.log(file.name, name, "ARRRAY IN FILTER")
      if (file.name == name) {
        console.log(file.name, name, "MATCHED !!!!");
        return false;
      }
      return true;
    });
    console.log(arr, "AARRRRAAAYY LENGTH");
    setfArray(arr);
    
    const storage = getStorage(app, "gs://test-d7c04.appspot.com");

    // Create a reference to the file to delete
    const desertRef = ref(storage, name);

    deleteObject(desertRef && desertRef).then(() => {
      // File deleted successfully
      console.log("DELETED")
    }).catch((error) => {
      console.log(error)
      // Uh-oh, an error occurred!
    });
    console.log(fArray.length, "AFTER LENGTH");
  }

  const SinglePdf = (props) => {
    const fname = props.file.name
    return (
      <View style={styles.pdfContainer}>
        <Text>{props.file.name}</Text>
        <View style={styles.buttons}>
          <Link
            to={"/download?" + props.file.src}
            component={Button}
            style={styles.button}
          >
            <Text style={styles.btnText}>View</Text>
          </Link>
          {login && <TouchableOpacity onPress={() => handleDelete(fname)} style={styles.button} >
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>}

        </View>
      </View>
    )
  }

  // console.log(fetchFiles(), "dsdsd")

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Ishant Commerce Classes</Text>
        {login && <TouchableOpacity onPress={handleLogout}><Icon name='logout' color={'white'} size={25} style={styles.logout} /></TouchableOpacity> }
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.sview}
        scrollEnabled={true}
      >
        <Text>Choose a PDF to view</Text>
        {fArray ? fArray.map((file) => <SinglePdf file={file} key={file.name} />) :  <ActivityIndicator size="large" color="black" style={styles.loader} />}

        {/* <Routes>
        <Route path="/" element={<PdfItems />} />
        <Route path="/download" element={<DownloadedItem />}/>
      </Routes> */}
      </ScrollView>
      <UploadPdf login={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    position: 'relative',
    top: 25,
    display: 'flex',
    flexDirection: 'column',
    height: Dimensions.get('screen').height,
    paddingTop: 15
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    margin: 15,
    backgroundColor: '#fff',
    flexDirection: 'column'

  },
  pdfContainer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderColor: 'light-grey',
    shadowColor: 'black',
    borderWidth: .5,
    borderRadius: 10,
    width: "100%"
  },
  singleItem: {
    width: "100%"
  },
  sview: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
  },
  header: {
    backgroundColor: '#000',
    height: 50,
    width: "100%",
    padding: 10,
    // justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    flexDirection: 'row',
    // position: 'absolute',
    // top: -35,
    alignSelf: 'flex-start'
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  logout: {
    position: 'relative',
    left: 72
  },
  buttons: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: "40%",
    marginTop: 5,
    marginHorizontal: 10,
    padding: 10,
    height: 40,
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  btnText: {
    color: 'white'
  },
  loader: {
    alignSelf: 'center'
  }
});