import React from 'react'
import { View } from 'react-native'
import PdfItems from '../PdfItems'

export default function Assignments({stuClass}) {
  console.log("ASSIGNMENTSSSSS")
    const filePath = "/assignments" + stuClass;
  return (
    <View>
        <PdfItems filePath={filePath} />
    </View>
  )
}
