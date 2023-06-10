import { StyleSheet, Text, View, TouchableOpacity, Button, ScrollView, ToastAndroid, Dimensions, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ERROR_MSG, UPLOAD_LINK } from './AppConstant';
import { app } from './firebaseConfig';
import { getStorage, ref, deleteObject } from "firebase/storage";
import fetchFiles from './fetchFiles';
import { Link } from "react-router-native";
import UploadPdf from './UploadPdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function PdfItems() {
  const auth = getAuth(app);
  const [fArray, setfArray] = useState(null);
  const [login, setLogin] = useState(false);

  const updateFiles = (file) => {
    // console.log(file);
    const arr = [...fArray, file];
    console.log(arr);
    setfArray(arr);
  }


  const handleLogout = () => {
    signOut(auth).then(() => {
      global.user = null
      ToastAndroid.show("Signed Out of Teacher mode", ToastAndroid.SHORT);
    }).catch((error) => {
      console.log(error,"handleLogout function")
      global.user = null;
      ToastAndroid.show(ERROR_MSG, ToastAndroid.SHORT);
    });
  }
  
  useEffect(() => {
    (async () => {
      var arr = await fetchFiles();
      setfArray(arr || []);
    })();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, []);

  const handleDelete = (name) => {
    const storage = getStorage(app, UPLOAD_LINK);
    const desertRef = ref(storage, name);
    const arr = fArray.filter((file) =>(file.name != name));
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

  const SinglePdf = (props) => {
    const fname = props.file.name
    return (
      <View style={styles.pdfContainer}>
        <Text>{props.file.name}</Text>
        <View style={styles.buttons}>
          <Link
            to={"/download?" + props.file.src}
            component={Button}
            style={styles.button}
          >
            <Text style={styles.btnText}>View</Text>
          </Link>
          {login && <TouchableOpacity onPress={() => handleDelete(fname)} style={styles.button} >
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>}

        </View>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Ishant Commerce Classes</Text>
        {login && <TouchableOpacity onPress={handleLogout}><Icon name='logout' color={'white'} size={25} style={styles.logout} /></TouchableOpacity> }
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.sview}
        scrollEnabled={true}
      >
        <Text>Choose a PDF to view</Text>
        {fArray ? fArray.map((file) => <SinglePdf file={file} key={file.name} />) :  <ActivityIndicator size="large" color="black" style={styles.loader} />}
      </ScrollView>
      <UploadPdf login={login} updateFiles={updateFiles} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    position: 'relative',
    top: 25,
    display: 'flex',
    flexDirection: 'column',
    height: Dimensions.get('screen').height,
    paddingTop: 15
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    margin: 15,
    backgroundColor: '#fff',
    flexDirection: 'column'

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
    // justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    flexDirection: 'row',
    // position: 'absolute',
    // top: -35,
    alignSelf: 'flex-start'
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  logout: {
    position: 'relative',
    left: 72
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