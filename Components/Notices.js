import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ShowNotices from './ShowNotices';

export default function Notices(props) {
  const stuClass = (global.user.user === "teacher") ? props.stuClass : global.user.class;
  return (
    <View style={styles.container}>
        <ShowNotices stuClass={stuClass} />
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