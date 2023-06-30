import React, { useEffect, useState,  } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getDatabase, ref, onValue, set, remove, get } from 'firebase/database'
import {app} from '../firebaseConfig'
import SingleStudentRequest from './SingleStudentRequest';

export default function StudentRequests({closeSideDrawer}) {
    const database = getDatabase(app);
    const studentRequestRef = ref(database, "studentRequests/");

    const [studentRequestIds, setStudentRequestIds] = useState([]);
    const [studentRequests, setStudentRequests] = useState(null);

    useEffect(()=>{
        get(studentRequestRef).then((data) => {
            console.log(data);
            return data;
        }).then((data) => {
            console.log(data.val(), "THen")
            setStudentRequests(data.val());
            setStudentRequestIds(Object.keys(data.val()));
        })
        return(() => {
            closeSideDrawer();
        })
    }, []);

    
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.title}>Student Requests</Text>
      </View>
        {(studentRequests && studentRequestIds.length >=0) ?
        studentRequestIds.map((id) => {
            const student = studentRequests[id];
            return(
                <SingleStudentRequest key={id} id={id} student={student}/>
            )
        })
         :<Text>Loading</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 0,
      paddingHorizontal: 10
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
  })