import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image, Linking, FlatList, ScrollView } from 'react-native';

import { File } from 'react-native'

import * as DocumentPicker from 'expo-document-picker';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { app } from './firebaseConfig';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, listAll } from "firebase/storage";
import fetchFiles from './fetchFiles';
import { NativeRouter, Route, Link, Routes } from "react-router-native";
import DownloadedItem from './DownloadedItem';
import UploadPdf from './UploadPdf';
// import fArray from './fetchFiles';

export default function PdfItems() {
  // console.log("PDFITEMS CALLED", fArray.length)
  const auth = getAuth(app);
  const [fArray, setfArray] = useState(null);
  const [login, setLogin] = useState(false);
  console.log(global.user, "IN PDFS");
  // const fArray = null;
  useEffect(()=>{
    (async ()=>{
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
    <ScrollView 
    style={styles.container}
    contentContainerStyle={styles.sview}
    scrollEnabled={true}
    >
      <Text>PDF Items {login ? "Logged in" : "Logged Out"}</Text>
      {fArray ? fArray.map((file) => {
        // console.log(file);
        return <Link 
        key={file.name} 
        style={styles.pdfContainer}
        to={"/download?" + file.src}
        ><Text>{file.name}</Text></Link>
      }) : <Text>Loading...</Text>}
      <UploadPdf />
      {/* <Routes>
        <Route path="/" element={<PdfItems />} />
        <Route path="/download" element={<DownloadedItem />}/>
      </Routes> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});