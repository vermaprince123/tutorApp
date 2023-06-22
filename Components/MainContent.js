import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Route, Routes, useLocation } from 'react-router-native';
import PdfItems from './PdfItems';
import Assignments from './Assignments';
import Notices from './Notices';
import Tests from './Tests';
import BottomNavigator from './BottomNavigator';
import DownloadedItem from './DownloadedItem';

export default function MainContent() {
  const stuClass = (global.user.user === "teacher") ? useLocation().search.slice(1) : "";
  console.log(stuClass, "classssss")
  return (
    <View>
      <View style={styles.mainContainer} stuClass={stuClass}>
        <Routes>
          <Route path="/pdfs" element={<PdfItems prefix="class" stuClass={stuClass} />} />
          <Route path="/assignments" element={<PdfItems prefix="assignments" stuClass={stuClass} />} />
          <Route path="/notices" element={<Notices stuClass={stuClass} />} />
          <Route path="/tests" element={<PdfItems prefix="tests" stuClass={stuClass} />} />
        </Routes>
      </View>
      <BottomNavigator stuClass={stuClass} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: 'blue',
    height: Dimensions.get('window').height - 100,
    display: 'flex',
    justifyContent: 'center'
  }
})