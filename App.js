import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Link, Routes } from "react-router-native";

import Login from './Login';
import UploadPdf from './UploadPdf'
import PdfItems from './PdfItems';
import DownloadedItem from './DownloadedItem';



export default function App() {
  return (
    <NativeRouter>
    <View style={styles.container}>
      {/* <PdfItems /> */}
      
      {/* <TouchableOpacity onPress={selectFile}><Text>Select</Text></TouchableOpacity> */}
      {/* <StatusBar style="auto" /> */}
      {/* <DownloadedItem /> */}
      <Routes>
        <Route path="/"  element={<Login />} />
        <Route path="/download" element={<DownloadedItem />}/>
        <Route path="/pdfs" element={<PdfItems />}/>
      </Routes>
      {/* <UploadPdf /> */}
    </View>
    </NativeRouter>
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
