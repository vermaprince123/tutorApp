import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database'
import { app } from './firebaseConfig'
import SingleNotice from './SingleNotice';
import { useNavigate } from 'react-router-native';

export default function ShowNotices({ stuClass }) {
  const [notices, setNotices] = useState(null);
  const [noticeIds, setNoticeIds] = useState([]);
  const navigate = useNavigate();
  const database = getDatabase(app);
  const noticesRef = ref(database, "notices/class" + stuClass);

  const isTeacherLoggedIn = (global.user.user === "teacher");


  useEffect(() => {
    get(noticesRef).then((data) => {
      console.log(data);
      return data;
    }).then((data) => {
      if (data != null && data.val() != null) {
        console.log(data.val(), "notices");
        setNotices(data.val());
        setNoticeIds(Object.keys(data.val()));
      }
      else{
        setNotices({});
        setNoticeIds([]);
      }
    }).catch((e) => {
      console.log(e);
      setNotices({});
      setNoticeIds([]);
    })
  }, [])

  const deleteNotice = (id) => {
    var newNotices = notices;
    var newNoticeIds = noticeIds;
    console.log(newNotices, "ffd");
    console.log(noticeIds);
    newNoticeIds =  newNoticeIds.filter((noticeId) => noticeId != id);
    delete (newNotices[id]);
    console.log(newNotices, "gfgf");
    console.log(noticeIds);
    setNotices(newNotices);
    setNoticeIds(newNoticeIds);
  }

  const addNotice = () => {
    navigate("/home/class"+stuClass+"-content/"+ "notices/add-edit-notice????" + stuClass)
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.noticeListContainer}>
      {(notices && noticeIds.length >= 0) ?
        noticeIds.map((id) => {
          console.log(notices[id])
          return (
            <SingleNotice key={id} id={id} notice={notices[id]} stuClass={stuClass} deleteNotice={deleteNotice} />
          )
        })
        :  <ActivityIndicator size="large" color="black" style={styles.loader} />}
        </ScrollView>
      {isTeacherLoggedIn && <TouchableOpacity style={styles.buttonContainer} onPress={addNotice}><Text style={styles.uploadButton}>+</Text></TouchableOpacity>}
    </View>
  )
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    
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
    padding: 5,
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
  buttonContainer: {
    paddingLeft: 7,
    paddingRight: 5,
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.03,
    right: 1,
  
  },
  uploadButton: {
    color: "white",
    fontSize: 30,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#000',

  },
  loader: {
    alignSelf: 'center'
  },
  noticeListContainer: {
    height: "100%"
  }
});