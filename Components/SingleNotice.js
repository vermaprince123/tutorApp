import React from 'react';
import { View, Text, Button } from 'react-native';
import { getDatabase, ref, remove } from 'firebase/database';

import { app } from './firebaseConfig';

export default function SingleNotice({notice, id}) {
    const database = getDatabase(app);
    const noticeRef = ref(database, "notices/"+id);
    
    const handleDelete = () => {
        console.log("Deleting");
        remove(noticeRef);
    }

    const handleEdit = () => {
        console.log("Editing")
    }
  return (
    <View>
        <Text>{notice.title}</Text>
        <Text>{notice.description}</Text>
        <Button title="Edit" onPress={handleEdit}/>
        <Button title="Delete" onPress={handleDelete}/>
    </View>
  )
}
