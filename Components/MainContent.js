import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Route, Routes } from 'react-router-native';
import PdfItems from './PdfItems';
import Assignments from './Assignments';
import Notices from './Notices';
import Tests from './Tests';
import BottomNavigator from './BottomNavigator';

export default function MainContent() {
  return (
    <View>
        <View style={styles.mainContainer}>
          <Text>877</Text>
          <Routes>
            <Route path="/pdfs" element={<PdfItems />}/>
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/tests" element={<Tests />} />
          </Routes>
        </View>
        <BottomNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: 'blue',
    height: Dimensions.get('window').height-100,
    display: 'flex',
    justifyContent: 'center'
  }
})