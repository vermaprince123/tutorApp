import React, { useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { ref, getDatabase, get } from 'firebase/database'

import { app } from './firebaseConfig'
import { Link, useNavigate } from 'react-router-native';


export default function StudentLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [stuClass, setStuClass] = useState("");

    const navigate = useNavigate();

    const database = getDatabase(app);

    const handleLogin = () => {
        const studentPath = "class" + stuClass + "/" + username + "/";
        console.log(studentPath);
        const studentRef = ref(database, studentPath);
        console.log(studentRef);

        get(studentRef).then((data) => {
            if (data && data.val()) {
                if (data.val().password == password) {
                    console.log("Logged In");
                    global.user = {
                        user: "student",
                        class: stuClass,
                        ...data.val()
                    }
                    navigate('/home/?' + stuClass);
                }
                else {
                    console.log("Invalid Password");
                }
            }
            else {
                console.log("Invalid Username or class");
            }
        })

    }

    const goToRegister = () => {
        navigate("/register");
    }

    const goToLoginAsTeacher = () => {
        navigate("/teacher-login");
    }
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Login As Student</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="class"
                    value={stuClass}
                    onChangeText={setStuClass}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Click here to Login</Text>
                </TouchableOpacity >
                <View style={styles.header}>
                    <Text style={styles.title}>OR</Text>
                </View>
                <View style={styles.otherLinks}>
                    <TouchableOpacity onPress={goToRegister}>
                        <Text style={styles.otherLinkText}>Not Enrolled? Register Yourself</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToLoginAsTeacher}>
                        <Text style={styles.otherLinkText}>Login As Teacher</Text>
                    </TouchableOpacity>
                </View>
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
