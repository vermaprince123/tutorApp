import { getDatabase, ref, remove } from 'firebase/database';
import React from 'react';
import { Button, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { app } from '../firebaseConfig';

import { ERROR_MSG } from '../AppConstant';

export default function SingleEnrolledStudent({ id, student, stuClass, removeStudent }) {
  const database = getDatabase(app);
  const handleRemove = () => {
    const studentRef = ref(database, "class" + stuClass + "/" + id);
    console.log(studentRef)
    console.log("Removing...");
    remove(studentRef).then(() => {
      removeStudent(id);
    }).catch((e) => {
      console.log(e.message);
      ToastAndroid.show(ERROR_MSG, ToastAndroid.SHORT);
    })
  }
  return (
    <View style={styles.detailContainer}>
      <Text>{student.name},</Text>
      <Text>Mob: {student.contact}</Text>
      <Text>Studies in {student.school}</Text>
      <TouchableOpacity onPress={handleRemove} style={styles.button}>
        <Text style={styles.btnText}>Remove</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  detailContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderColor: 'light-grey',
    shadowColor: 'black',
    borderWidth: .5,
    borderRadius: 10,
    width: "100%"
  },
  button: {
    width: "40%",
    marginTop: 5,
    marginHorizontal: 10,
    padding: 5,
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
});
