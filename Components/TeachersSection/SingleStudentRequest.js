import React from 'react'
import { Button, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

import { app } from '../firebaseConfig'
import { ref, getDatabase, set, remove } from 'firebase/database'


export default function SingleStudentRequest({ student, id, removeRequestFromList }) {
    console.log(student)
    const database = getDatabase(app);
    const studentRequestRef = ref(database, "studentRequests/" + id + "/");

    const approveStudent = () => {
        const classPath = "class" + student.class + "/";
        console.log(classPath + id + "/");
        set(ref(database, classPath + id + "/"), {
            name: student.name,
            contact: student.contact,
            school: student.school,
            dob: student.dob,
            password: student.password,
        })
        remove(studentRequestRef);
        removeRequestFromList(student.contact, student.class);
        
    }

    const declineStudent = () => {
        remove(studentRequestRef).then(() => {

            console.log(studentRequestRef)
        })
        removeRequestFromList(student.contact, student.class);
    }
    return (
        <View style={styles.detailContainer}>
            
            <Text>{student.name}</Text>
            <Text>Mob: {student.contact}</Text>
            <Text>From {student.school}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={approveStudent}>
                    <Text style={styles.btnText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={declineStudent}>
                    <Text style={styles.btnText}>Decline</Text>
                </TouchableOpacity>
            </View>
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
