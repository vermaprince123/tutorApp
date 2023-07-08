import React from 'react'
import { View } from 'react-native'
import PdfItems from '../PdfItems'

export default function Material({stuClass}) {
    const filePath = "/class" + stuClass;
  return (
    <View>
        <PdfItems filePath={filePath} />
    </View>
  )
}
