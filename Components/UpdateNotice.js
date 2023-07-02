import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { getDatabase, ref, set } from 'firebase/database';

import { app } from './firebaseConfig';
import { useLocation, useNavigate } from 'react-router-native';

import { EMPTY_INPUT_FIELDS } from './AppConstant';


export default function UpdateNotice() {
  console.log("Update Notice")
  const location = useLocation();
  const arr = location.search.split("?");
  console.log(arr);
  
  const navigate = useNavigate();
  const [title, setTitle] = useState(arr[2]);
  const [description, setDescription] = useState(arr[3]);

  const [stuClass, setStuClass] = useState(arr[4]);
  const [stuId, setstuId] = useState(arr[1]);



  const database = getDatabase(app);

  const handleSubmit = () => {
    const id = stuId != "" ? stuId : Date.now();
    const noticeRef = ref(database, "/notices/" +"class" + stuClass + "/" + id);
    
    if(!areValidInputs()){
      ToastAndroid.show(EMPTY_INPUT_FIELDS, ToastAndroid.SHORT);
      return;
    }
    set(noticeRef, {
      title: title,
      description: description
    })
    navigate(-1);
  }

  const handleCancel = () => {
    navigate(-1);
  }

  const areValidInputs = () => {
    if(title && description){
      return true;
    }
    return false;
  }

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add/ Edit Notice</Text>
      </View>
      <KeyboardAvoidingView style={styles.form}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  header: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    width: 300,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    textAlign: 'center',
    // alignItems: 'center'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: 300,
    padding: 10,
    height: 40,
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  otherLinks: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    gap: 15
  },
  otherLinkText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 15
  }

})