import React, { useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import SideDrawer from './SideDrawer';
import { Routes, Route, Link } from 'react-router-native';
import StudentRequests from './TeachersSection/StudentRequests';
import EnrolledStudents from './TeachersSection/EnrolledStudents';
import PdfItems from './PdfItems';
import MainContent from './MainContent';


export default function Home() {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openSideDrawer = () => {
    console.log("Opening")
    setIsDrawerOpen(true)
  }

  const closeSideDrawer = () => {
    console.log("closing");
    setIsDrawerOpen(false);
  }
  const drawerVisibility = isDrawerOpen ? 'flex' : 'none';
  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.header}>
        {/* <Text style={styles.title}>Ishant Commerce Classes</Text> */}
        <TouchableOpacity onPress={openSideDrawer}>
        <Text style={styles.openDrawerButton}>Open Side Drawer</Text>
      </TouchableOpacity>
      </View>

      
      <View>
      
      </View>
      <View style={styles.mainContainer}>
      <Routes>
        <Route path="/student-requests" element={<StudentRequests closeSideDrawer={closeSideDrawer} />}/>
        <Route path="/enrolled-students" element={<EnrolledStudents closeSideDrawer={closeSideDrawer}/>}/>
        <Route path="/main-content/*" element={<MainContent />} />
      </Routes>
      </View>
      <View style={[styles.drawerContainer, { display: drawerVisibility }]}>
        <SideDrawer closeSideDrawer={closeSideDrawer} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  mainContainer: {
    borderWidth: 1,
    borderColor: 'red',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-50
  },
  header: {
    backgroundColor: '#000',
    height: 50,
    width: "100%",
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignSelf: 'flex-start'

  },
  openDrawerButton: {
    color: 'white'
  }
})
