import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Link, Routes } from "react-router-native";
import DownloadedItem from './DownloadedItem';
import UploadPdf from './UploadPdf'

import PdfItems from './PdfItems';



export default function App() {
  return (
    <NativeRouter>
    <View style={styles.container}>
      {/* <PdfItems /> */}
      
      {/* <TouchableOpacity onPress={selectFile}><Text>Select</Text></TouchableOpacity> */}
      {/* <StatusBar style="auto" /> */}
      {/* <DownloadedItem /> */}
      <Routes>
        <Route path="/"  element={<PdfItems />} />
        <Route path="/download" element={<DownloadedItem />}/>
      </Routes>
      <UploadPdf />
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
