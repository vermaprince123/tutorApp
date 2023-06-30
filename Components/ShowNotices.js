import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {getDatabase, ref, get} from 'firebase/database'
import { app } from './firebaseConfig'
import SingleNotice from './SingleNotice';

export default function ShowNotices({stuClass}) {
  const [notices, setNotices] = useState(null);
  const [noticeIds, setNoticeIds] = useState([]);

  const database = getDatabase(app);
  const noticesRef = ref(database, "notices/class" + stuClass);

  useEffect(()=> {
    get(noticesRef).then((data)=>{
      console.log(data);
      return data;
    }).then((data) => {
      console.log(data.val(), "notices");
      setNotices(data.val());
      setNoticeIds(Object.keys(data.val()));
    })
  }, [])
  return (
    <View>
        {(notices && noticeIds.length >= 0) ?
        noticeIds.map((id) => {
          console.log(notices[id])
          return(
            <SingleNotice key={id} id={id} notice={notices[id]}/>
          )
        })
         : <Text>Fetching</Text>}
    </View>
  )
}


const styles = StyleSheet.create({
  detailContainer: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      borderColor: 'light-grey',
      shadowColor: 'black',
      borderWidth: .5,
      borderRadius: 10,
      width: "100%"
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
});