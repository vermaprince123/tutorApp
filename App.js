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




export default function App() {
  return (
    // <NativeRouter>
    // <StatusBar barStyle={useColorScheme() === 'dark' ? 'light-content' : 'dark-content'} />
    // <View style={styles.container}>
    //   <Routes>
    //     <Route path="/"  element={<Login />} />
    //     <Route path="/download" element={<DownloadedItem />}/>
    //     <Route path="/pdfs" element={<PdfItems />}/>
    //   </Routes>
    // </View>
    // </NativeRouter>
    // <Register />
    // <StudentRequests/>
    // <StudentLogin />
    // <UpdateNotice />
    // <Notices />
    <EnrolledStudents />
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
