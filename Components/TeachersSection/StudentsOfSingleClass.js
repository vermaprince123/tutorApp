import { get, getDatabase, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { app } from '../firebaseConfig'
import SingleEnrolledStudent from './SingleEnrolledStudent';

export default function StudentsOfSingleClass({ stuClass }) {

    const [enrolledStudents, setEnrolledStudents] = useState(null);
    const [enrolledStudentIds, setEnrolledStudentIds] = useState([]);

    const database = getDatabase(app);
    const enrolledStudentsRef = ref(database, "class" + stuClass + "/");

    useEffect(() => {
        get(enrolledStudentsRef).then((data) => {
            console.log(data)
            return data;
        }).then((data) => {
            if (data != null) {
                console.log(data.val());
                setEnrolledStudents(data.val());
                setEnrolledStudentIds(Object.keys(data.val()));
            }
        })
    }, [])
    return (
        <View>
            <Text>{stuClass}</Text>
            {(enrolledStudents && enrolledStudentIds.length) ?
            enrolledStudentIds.map((id) => {
                console.log(enrolledStudents[id]);
                return (
                    <SingleEnrolledStudent key={id} id={id} student={enrolledStudents[id]} stuClass={stuClass}/>
                )
            })
             : <Text>Fetching</Text>  }
        </View>
    )
}
