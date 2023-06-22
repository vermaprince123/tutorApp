import React, { useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import { ref, getDatabase, get } from 'firebase/database'

import {app} from './firebaseConfig'
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
            if(data && data.val()){
                if(data.val().password == password){
                    console.log("Logged In");
                    global.user = {
                        user: "student",
                        class: stuClass,
                        ...data.val()
                    }
                    navigate('/home/?'+stuClass);
                }
                else{
                    console.log("Invalid Password");
                }
            }
            else{
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
            <Text>Login</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="class"
                value={stuClass}
                onChangeText={setStuClass}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={goToRegister}>
                <Text>Not Enrolled? Register Yourself</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToLoginAsTeacher}>
                <Text>Login As Teacher</Text>
            </TouchableOpacity>
            {/* <Link to="/teacher-login">Login as Teacher</Link> */}
        </View>
    )
}
