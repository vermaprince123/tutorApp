import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';

import { File } from 'react-native'

import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { app } from './firebaseConfig';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, listAll, list } from "firebase/storage";
import WebView from 'react-native-webview';



export default function DownloadedItem() {

    const url = "https://firebasestorage.googleapis.com/v0/b/test-d7c04.appspot.com/o/Kaagaz_20230511_101214077603%20(2).pdf?alt=media&token=f65e45d6-2bc1-4534-9d94-48558a79885b";
    const source = { uri: url, cache: true }

    return (
        <View style={styles.container}>
            <WebView source={{uri: url}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    // pdf: {
    //     flex: 1,
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    // },
});
