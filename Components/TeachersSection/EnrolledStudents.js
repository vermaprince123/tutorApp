import React from 'react'
import { View, Text } from 'react-native'
import StudentsOfSingleClass from './StudentsOfSingleClass'

export default function EnrolledStudents() {
  return (
    <View>
        <Text>EnrolledStudents</Text>
        <StudentsOfSingleClass stuClass={11}/>
        <StudentsOfSingleClass stuClass={12}/>
    </View>
  )
}
