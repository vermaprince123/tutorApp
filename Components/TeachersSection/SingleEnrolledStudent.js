import { getDatabase, ref, remove } from 'firebase/database';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { app } from '../firebaseConfig';

export default function SingleEnrolledStudent({id, student, stuClass}) {
    const database = getDatabase(app);
    const removeStudent = () => {
        const studentRef = ref(database, "class" + stuClass + "/" + id);
        console.log(studentRef)
        console.log("Removing...");
        remove(studentRef);
    }
  return (
    <View>
        <Text>{student.name}</Text>
        <Text>Mob: {student.contact}</Text>
        <Text>Studies in {student.school}</Text>
        <Button title="Remove" onPress={removeStudent}/>
    </View>
  )
}
