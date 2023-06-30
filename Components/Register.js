import React, { useState } from 'react'
import { Button, Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getDatabase, ref, set, } from 'firebase/database'
import { app } from './firebaseConfig';
import { useNavigate } from 'react-router-native';


export default function Register() {
    const [stuName, setStuName] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [className, setClassName] = useState("");
    const [dob, setDob] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const database = getDatabase(app);

    const uploadData = () => {
        const id = contactNumber + stuName.split(" ")[0].toLowerCase();
        set(ref(database, "studentRequests/" + id), {
            name: stuName,
            school: schoolName,
            class: className,
            dob: dob,
            contactNumber: contactNumber,
            password: password
        })
    }

    const goToStudentLogin = () => {
        navigate("/")
    }

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Register Yourself</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={stuName}
                    onChangeText={setStuName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="School name"
                    value={schoolName}
                    onChangeText={setSchoolName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Class"
                    value={className}
                    onChangeText={setClassName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date of Birth (DD-MM-YYYY) Format"
                    value={dob}
                    onChangeText={setDob}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChangeText={setContactNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={uploadData} style={styles.button}>
                    <Text style={styles.buttonText}>Register Yourself</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.title}>OR</Text>
            </View>
            <View style={styles.otherLinks}>
                <TouchableOpacity onPress={goToStudentLogin} >
                    <Text style={styles.otherLinkText}>Already Registered? Login</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    header: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    form: {
        width: 300,
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        textAlign: 'center'
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },
    button: {
        width: 300,
        padding: 10,
        height: 40,
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    otherLinks: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        gap: 15
    },
    otherLinkText: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: 15
    }

})