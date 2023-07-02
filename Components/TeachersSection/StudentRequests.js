import React, { useEffect, useState, } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { getDatabase, ref, onValue, set, remove, get } from 'firebase/database'
import { app } from '../firebaseConfig'
import SingleStudentRequest from './SingleStudentRequest';

export default function StudentRequests({ closeSideDrawer }) {
  const database = getDatabase(app);
  const studentRequestRef = ref(database, "studentRequests/");
  const [class11Students, setClass11Students] = useState([]);
  const [class12Students, setClass12Students] = useState([]);

  useEffect(() => {
    get(studentRequestRef).then((data) => {
      console.log(data.val());
      return data;
    }).then((data) => {
      var stuReqs = data.val();
      var stuReqsIds = Object.keys(data.val());

      var arr11 = [];
      var arr12 = [];
      stuReqsIds.forEach((id) => {
        console.log(id);
        console.log(stuReqs[id]);
        if (stuReqs[id] && stuReqs[id].class11) {
          arr11.push(stuReqs[id].class11);
        }
        else {
          arr12.push(stuReqs[id].class12);
        }
      });
      console.log(arr11, "class 11 array");
      console.log(arr12, "class 12 array");
      setClass11Students(arr11);
      setClass12Students(arr12);
    }).catch((e) => {
      setClass11Students([]);
      setClass12Students([]);
    })
    return (() => {
      closeSideDrawer();
    })
  }, []);


  const removeRequestFromList = (contact, stuClass) => {
    if (stuClass == 11) {
      newClass11Requests = class11Students.filter(student => student.contact != contact);
      setClass11Students(newClass11Requests);
    }
    else {
      newClass12Requests = class12Students.filter(student => student.contact != contact);
      setClass12Students(newClass12Requests);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Student Requests</Text>
      </View>
      <ScrollView style={styles.requestContainer}>
      <Text style={styles.studentClassTitle}>Class 11</Text>
      {(class11Students && class11Students.length >= 0) ?
        class11Students.map((student) => {
          console.log(student.contact)
          return (
            <SingleStudentRequest key={student.contact} id={student.contact} student={student} removeRequestFromList={removeRequestFromList} />
          )
        })
        : <Text>Loading</Text>}
      <Text style={styles.studentClassTitle}>Class 12</Text>
      {(class12Students && class12Students.length >= 0) ?
        class12Students.map((student) => {

          return (
            <SingleStudentRequest key={student.contact} id={student.contact} student={student} removeRequestFromList={removeRequestFromList} />
          )
        })
        : <Text>Loading</Text>}
        </ScrollView>
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
  studentClassTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600'
  },
  requestContainer: {
    // borderWidth: 1
  }
})