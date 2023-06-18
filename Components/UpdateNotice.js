import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { getDatabase, ref, set } from 'firebase/database';

import { app } from './firebaseConfig';


export default function UpdateNotice() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const database = getDatabase(app);

    const handleSubmit = () => {
        const id = Date.now();
        const noticeRef = ref(database, "class11/notices/" + id);
        console.log(noticeRef);

        set(noticeRef, {
          title: title,
          description: description
        })
    }
  return (
    <View>
        <Text>Add/ Update a Notice</Text>
        <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        />
        <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        />
        <Button title="Submit" onPress={handleSubmit}/>
    </View>
  )
}
