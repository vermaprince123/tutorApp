import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image, Linking, FlatList, ScrollView } from 'react-native';

import { File } from 'react-native'

import * as DocumentPicker from 'expo-document-picker';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { app } from './firebaseConfig';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, listAll } from "firebase/storage";
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
  console.log(global.user, "IN PDFS");

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      global.user = null
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

  // console.log(fetchFiles(), "dsdsd")

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Ishant Commerce Classes</Text>
        <TouchableOpacity onPress={handleLogout}><Icon name='logout' color={'white'} size={25} style={styles.logout}/></TouchableOpacity>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.sview}
        scrollEnabled={true}
      >
        <Text>Choose a PDF to view</Text>
        {fArray ? fArray.map((file) => {
          // console.log(file);
          return <Link
            key={file.name}
            style={styles.pdfContainer}
            to={"/download?" + file.src}
          ><Text>{file.name}</Text></Link>
        }) : <Text>Loading...</Text>}

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
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    margin: 15,
    backgroundColor: '#fff',
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
    flexDirection: 'row'
},
title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
},
logout: {
  position: 'relative',
  left: 72
}
});