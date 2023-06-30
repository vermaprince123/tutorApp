import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ShowNotices from './ShowNotices';
import { Route, Routes } from 'react-router-native';
import UpdateNotice from './UpdateNotice';

export default function Notices(props) {
  const stuClass = (global.user.user === "teacher") ? props.stuClass : global.user.class;
  return (
    <View style={styles.container}>
      <Routes>
        <Route path="/" element={<ShowNotices stuClass={stuClass} />}/>
        <Route path="/add-edit-notice" element={<UpdateNotice />}/>
      </Routes>
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 10
  },
})