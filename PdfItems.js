import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image, Linking } from 'react-native';

import { File } from 'react-native'

import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { app } from './firebaseConfig';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, listAll } from "firebase/storage";
import fArray from './fetchFiles';

export default function PdfItems() {

  return (
    <View style={styles.container}>
      <Text>PDF Items</Text>
      {fArray.map((file) => {
        return <Text key={file.name}>{file.name}</Text>
      })}
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