import React from 'react';
import { View, Text } from 'react-native';

import ShowNotices from './ShowNotices';

export default function Notices(props) {
  const stuClass = (global.user.user === "teacher") ? props.stuClass : global.user.class;
  return (
    <View>
        <Text>Notices</Text>
        <ShowNotices stuClass={stuClass} />
    </View>
  )
}
