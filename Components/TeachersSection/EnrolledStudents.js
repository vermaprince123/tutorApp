import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import StudentsOfSingleClass from './StudentsOfSingleClass'

export default function EnrolledStudents({ closeSideDrawer }) {
  useEffect(() => {
    return (() => {
      closeSideDrawer();
    })
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Enrolled Students</Text>
      </View>
      <ScrollView style={styles.studentListContainer}>
        <StudentsOfSingleClass stuClass={11} />
        <StudentsOfSingleClass stuClass={12} />
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
  studentListContainer: {
    // borderWidth: 1
  }
})
