import { StyleSheet, Text, View, TouchableOpacity, Button, ToastAndroid, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { app } from './firebaseConfig';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Link, useLocation } from "react-router-native";


import { ERROR_MSG, UPLOAD_LINK } from './AppConstant';
import fetchFiles from './fetchFiles';
import UploadPdf from './UploadPdf';

export default function PdfItems(props) {
  console.log(props, "prps");

  // console.log("/" + props.prefix + props.stuClass);

  // const stuClass = (global.user.user == "student") ? global.user.class : useLocation().search.slice(1);
  console.log(props.filePath, "FILEPATH");
  const [filePath, setFilePath] = useState("");
  const [fArray, setfArray] = useState(null);
  const isTeacherLoggedIn = (global.user.user === "teacher");

  if (filePath !== props.filePath) {
    setFilePath(props.filePath);
    console.log(filePath, "ifff")
  }

  useEffect(() => {
    (async () => {
      var arr = await fetchFiles(filePath);
      setfArray(arr || []);
    })();
  }, [filePath]);

  const updateFiles = (file) => {
    const arr = [...fArray, file];
    console.log(arr);
    setfArray(arr);
  }



  const handleDelete = (name) => {
    const storage = getStorage(app, UPLOAD_LINK);
    const desertRef = ref(storage, filePath + "/" + name);
    const arr = fArray.filter((file) => (file.name != name));
    setfArray(arr || []);
    deleteObject(desertRef).then(() => {
      ToastAndroid.show("Deleted File Successfully !!", ToastAndroid.SHORT);
      console.log("deleteObject function")
      console.log(fArray);
    }).catch((error) => {
      console.log(error);
      ToastAndroid.show(ERROR_MSG, ToastAndroid.SHORT);
    });
  }

  const SinglePdf = ({ file }) => (
    <View style={styles.pdfContainer}>
      <Text>{file.item.name}</Text>
      <View style={styles.buttons}>
        <Link
          to={"/download?" + file.item.src}
          component={Button}
          style={styles.button}
        >
          <Text style={styles.btnText}>View</Text>
        </Link>
        {isTeacherLoggedIn && <TouchableOpacity onPress={() => handleDelete(file.item.name)} style={styles.button} >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>}

      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>

      {fArray ? <FlatList
        style={styles.container}
        scrollEnabled={true}
        data={fArray}
        renderItem={(file) => <SinglePdf file={file} key={file.name} />}
        keyExtractor={file => file.name}
        ListHeaderComponent={<Text style={styles.text}>Choose a PDF to view</Text>}
      />
        : <ActivityIndicator size="large" color="black" style={styles.loader} />}
      {isTeacherLoggedIn && <UploadPdf updateFiles={updateFiles} filePath={filePath} />}

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    height: Dimensions.get('screen').height * 0.75,
    paddingTop: 15
  },
  container: {
    flexGrow: 0,
    display: 'flex',
    margin: 15,
    marginTop: 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    height: Dimensions.get('window').height * 0.9
  },
  pdfContainer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderColor: 'light-grey',
    shadowColor: 'black',
    borderWidth: .5,
    borderRadius: 10,
    width: "100%"
  },
  singleItem: {
    width: "100%"
  },
  sview: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
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
    alignSelf: 'flex-start'

  },
  text: {

    alignSelf: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  logout: {
    position: 'relative',
    left: Dimensions.get('window').width * 0.2
  },
  buttons: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: "40%",
    marginTop: 5,
    marginHorizontal: 10,
    padding: 10,
    height: 40,
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  btnText: {
    color: 'white'
  },
  loader: {
    alignSelf: 'center'
  }
});
