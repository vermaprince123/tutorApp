import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import {getDatabase, ref, get} from 'firebase/database'
import { app } from './firebaseConfig'
import SingleNotice from './SingleNotice';

export default function ShowNotices() {
  const [notices, setNotices] = useState(null);
  const [noticeIds, setNoticeIds] = useState([]);

  const database = getDatabase(app);
  const noticesRef = ref(database, "notices/");

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
        <Text>Show Notices</Text>
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
