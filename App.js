import { StyleSheet, View, StatusBar, useColorScheme } from 'react-native';
import { NativeRouter, Route, Routes } from "react-router-native";
import Login from './Components/Login';
import PdfItems from './Components/PdfItems';
import DownloadedItem from './Components/DownloadedItem';
import Register from './Components/Register';
import StudentRequests from './Components/TeachersSection/StudentRequests';
import StudentLogin from './Components/StudentLogin';
import UpdateNotice from './Components/UpdateNotice';
import Notices from './Components/Notices';
import EnrolledStudents from './Components/TeachersSection/EnrolledStudents';
import Home from './Components/Home';




export default function App() {
  return (
    <NativeRouter>
    <StatusBar barStyle={useColorScheme() === 'dark' ? 'light-content' : 'dark-content'} />
    <View style={styles.container}>
      <Routes>
        <Route path="/"  element={<StudentLogin />} />
        {/* <Route path="/"  element={<Home />} /> */}
        <Route path="/login"  element={<StudentLogin />} />
        <Route path="/teacher-login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/download" element={<DownloadedItem  />} />
      </Routes>
    </View>
    </NativeRouter>
    // <Register />
    // <StudentRequests/>
    // <StudentLogin />
    // <UpdateNotice />
    // <Notices />
    // <EnrolledStudents />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%", 
    height: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
