import React from 'react'
import { View } from 'react-native'
import PdfItems from '../PdfItems'

export default function Tests({stuClass}) {
    const filePath = "/tests" + stuClass;
  return (
    <View>
        <PdfItems filePath={filePath} />
    </View>
  )
}
