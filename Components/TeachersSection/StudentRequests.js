import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { getDatabase, ref, onValue, set, remove, get } from 'firebase/database'
import {app} from '../firebaseConfig'
import SingleStudentRequest from './SingleStudentRequest';

export default function StudentRequests() {
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
        // onValue(studentRequestRef, (snapshot) => {
        //     const data = snapshot.val();
        //     return data;
        //   });
    }, []);

    
  return (
    <View>
        {(studentRequests && studentRequestIds.length >=0) ?
        studentRequestIds.map((id) => {
            // console.log(studentRequests[id], id);
            const student = studentRequests[id];
            return(
                <SingleStudentRequest key={id} id={id} student={student}/>
            )
        })
         :<Text>Loading</Text>}
    </View>
  )
}
