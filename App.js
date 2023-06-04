import { StyleSheet, View, StatusBar, useColorScheme } from 'react-native';
import { NativeRouter, Route, Routes } from "react-router-native";
import Login from './Login';
import PdfItems from './PdfItems';
import DownloadedItem from './DownloadedItem';



export default function App() {
  return (
    <NativeRouter>
    <StatusBar barStyle={useColorScheme() === 'dark' ? 'light-content' : 'dark-content'} />
    <View style={styles.container}>
      <Routes>
        <Route path="/"  element={<Login />} />
        <Route path="/download" element={<DownloadedItem />}/>
        <Route path="/pdfs" element={<PdfItems />}/>
      </Routes>
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
