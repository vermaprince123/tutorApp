import React, { useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ToastAndroid } from 'react-native';
import SideDrawer from './SideDrawer';
import { Routes, Route, Link, useNavigate } from 'react-router-native';
import { getAuth, signOut } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import StudentRequests from './TeachersSection/StudentRequests';
import EnrolledStudents from './TeachersSection/EnrolledStudents';
import PdfItems from './PdfItems';
import MainContent from './MainContent';
import Class11Content from './Class11Content';
import Class12Content from './Class12Content';


export default function Home() {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();


  const isTeacherLoggedIn = (global.user.user === "teacher");



  const openSideDrawer = () => {
    console.log("Opening")
    setIsDrawerOpen(true)
  }

  const closeSideDrawer = () => {
    console.log("closing");
    setIsDrawerOpen(false);
  }

  console.log(global.user);

  const handleSignOut = () => {

    if (global.user && global.user.user === "teacher") {
      const auth = getAuth();
      signOut(auth).then(() => {
        ToastAndroid.show("Signed out of Teacher mode", ToastAndroid.SHORT);
      }).catch((error) => {
        ToastAndroid.show(ERROR_MSG + " Please Retry", ToastAndroid.SHORT);
      });
    }
    else {
      ToastAndroid.show("Signed out successfully", ToastAndroid.SHORT);
    }

    global.user = null;
    navigate("/login");
  }

  const drawerVisibility = isDrawerOpen ? 'flex' : 'none';
  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.header}>
        {isTeacherLoggedIn && <TouchableOpacity onPress={openSideDrawer}>
          <Text style={styles.openDrawerButton}>
            <Icon name="menu" size={30} color="#fff"></Icon>
          </Text>
        </TouchableOpacity>}
        <Text style={styles.title}>  Ishant Commerce Classes</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.logOutButtonContainer}>
          <Text style={styles.logOutButton}>
            <Icon name="logout" size={30} color="#fff"></Icon>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <Routes>
          <Route path="/student-requests" element={<StudentRequests closeSideDrawer={closeSideDrawer} />} />
          <Route path="/enrolled-students" element={<EnrolledStudents closeSideDrawer={closeSideDrawer} />} />
          <Route path="/class11-content/*" element={<Class11Content closeSideDrawer={closeSideDrawer} />} />
          <Route path="/class12-content/*" element={<Class12Content closeSideDrawer={closeSideDrawer} />} />
          {/* <Route path="/*" element={<MainContent closeSideDrawer={closeSideDrawer} />} /> */}
        </Routes>
      </View>
      <View style={[styles.drawerContainer, { display: drawerVisibility }]}>
        <SideDrawer closeSideDrawer={closeSideDrawer} handleSignOut={handleSignOut} />
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50
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
  },
  logOutButton: {
    color: 'white',

  },
  logOutButtonContainer: {
    position: 'absolute',
    right: 2
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 600
  }
})
