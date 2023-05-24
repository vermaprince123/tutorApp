import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';

import { File } from 'react-native'

import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { app } from './firebaseConfig';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, listAll } from "firebase/storage";


export default function PdfItems() {
  const storage = getStorage(app, "gs://test-d7c04.appspot.com");
  const listRef = ref(storage, '');

  // Find all the prefixes and items.
  listAll(listRef && listRef)
    .then((res) => {
      console.log(res, "response");
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        const itemPath = itemRef["_location"]["path_"]
        const itemStorage = ref(storage, itemPath);

        getDownloadURL(itemStorage && itemStorage).then((url) => {
          console.log(url)
        }).catch((error) => {
          console.log(error)
        })
      });
  
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error)
    });
  return (
    <View style={styles.container}>
      <Text>PDF Items</Text>
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