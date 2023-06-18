import React from 'react'
import { Button, Text, View } from 'react-native'

import {app} from '../firebaseConfig'
import {ref, getDatabase, set, remove} from 'firebase/database'

export default function SingleStudentRequest({student, id}) {
    console.log(student)
    const database = getDatabase(app);
    const studentRequestRef = ref(database, "studentRequests/"+id+"/");

    const approveStudent = () => {
        const classPath = "class" + student.class + "/";
        set(ref(database, classPath+id+"/"), {
            name: student.name,
            contact: student.contactNumber,
            school: student.school,
            dob: student.dob,
            password: student.password,
        })

        remove(studentRequestRef);
    }

    const declineStudent = () => {
        console.log("Hii");
        remove(studentRequestRef);
    }
  return (
    <View>
        <Text>{student.name}</Text>
        <Text>Mob: {student.contactNumber}</Text>
        <Text>From {student.school}</Text>
        <Button title="Approve" onPress={approveStudent}/>
        <Button title="Decline" onPress={declineStudent}/>
    </View>
  )
}
