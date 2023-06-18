import React, { useState } from 'react'
import { Button, Text, View, TextInput } from 'react-native';
import { getDatabase, ref, set, } from 'firebase/database'
import { app } from './firebaseConfig';


export default function Register() {
    const [stuName, setStuName] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [className, setClassName] = useState("");
    const [dob, setDob] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");

    const database = getDatabase(app);

    const uploadData = () => {
        const id = contactNumber+stuName.toLowerCase();
        set(ref(database, "studentRequests/"+id), {
                name: stuName,
                school: schoolName,
                class: className,
                dob: dob,
                contactNumber: contactNumber,
                password: password
        })
    }

    return (
        <View>
            <Text> Register</Text>
            <TextInput
            placeholder="Name"
            value={stuName}
            onChangeText={setStuName}
            />
            <TextInput
            placeholder="School name"
            value={schoolName}
            onChangeText={setSchoolName}
            />
            <TextInput
            placeholder="Class"
            value={className}
            onChangeText={setClassName}
            />
            <TextInput
            placeholder="Date of Birth (DD-MM-YYYY) Format"
            value={dob}
            onChangeText={setDob}
            />
            <TextInput
            placeholder="Contact Number"
            value={contactNumber}
            onChangeText={setContactNumber}
            />
            <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            />
            <Button onPress={uploadData} title='Click'></Button>
        </View>

    )
}
