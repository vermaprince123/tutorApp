import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Route, Routes, useLocation } from 'react-router-native';
import PdfItems from './PdfItems';
import Notices from './Notices';
import BottomNavigator from './BottomNavigator';
import Assignments from './MainContents/Assignments';
import Material from './MainContents/Material';
import Tests from './MainContents/Tests';

export default function MainContent(props) {
  const stuClass = props.stuClass;

  console.log(useLocation());
  
  

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer} stuClass={stuClass}>
        <Routes>
          <Route path="/" element={<Material stuClass={stuClass}/>} />
          <Route path="/assignments" element={<Assignments stuClass={stuClass}/>} />
          <Route path="/notices/*" element={<Notices stuClass={stuClass} />} />
          <Route path="/tests" element={<Tests stuClass={stuClass} />} />
        </Routes>
      </View>
      <View style={styles.bottomNavContainer}>
        <BottomNavigator stuClass={stuClass} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  mainContainer: {
    height: Dimensions.get('window').height - 100,
    display: 'flex',
    justifyContent: 'center'
  },
  bottomNavContainer: {
    height: Dimensions.get('window').height*0.0685,
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center'
  }
})