import React, { useState } from 'react'
import { Button, Text, View, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { getDatabase, ref, set, get } from 'firebase/database'
import { app } from './firebaseConfig';
import { useNavigate } from 'react-router-native';
import { EMPTY_INPUT_FIELDS, INVALID_CLASS, INVALID_DOB, REQUEST_SENT, CONTANT_NUMBER_EXISTS, ERROR_MSG} from './AppConstant';


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

        //validate data
        if (stuName == "" || schoolName == "" || className == "" || dob == "" || contactNumber == "" || password == "") {
            ToastAndroid.show(EMPTY_INPUT_FIELDS, ToastAndroid.SHORT);
            return;
        }

        //validate class only 12 and 11 are allowed
        if (className != "11" && className != "12") {
            ToastAndroid.show(INVALID_CLASS, ToastAndroid.SHORT);
            return;
        }


        //validate dob only DD-MM-YYYY format is allowed
        const dobRegex = /^\d{2}-\d{2}-\d{4}$/;
        if (!dobRegex.test(dob)) {
            ToastAndroid.show(INVALID_DOB, ToastAndroid.SHORT);
            return;
        }


        //get the reference of the database and if contact number already exists then return
        const studentRef = ref(database, "studentRequests/" + contactNumber);
        get(studentRef).then((data) => {

            if (data && data.val()) {
                ToastAndroid.show(CONTANT_NUMBER_EXISTS, ToastAndroid.SHORT);
                return;
            }

            set(ref(database, "studentRequests/" + contactNumber + "/class" + className), {
                name: stuName,
                school: schoolName,
                class: className,
                dob: dob,
                contactNumber: contactNumber,
                password: password
            }).then(() => {
                setStuName("");
                setSchoolName("");
                setClassName("");
                setDob("");
                setContactNumber("");
                setPassword("");
                ToastAndroid.show(REQUEST_SENT, ToastAndroid.SHORT);
            }).catch((error) => {
                ToastAndroid.show(ERROR_MSG, ToastAndroid.SHORT);
            });

        }).catch((error) => {
            ToastAndroid.show(ERROR_MSG, ToastAndroid.SHORT);
        }); 
       
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
                    autoFocus={true}
                    style={styles.input}
                    maxLength={30}
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
                    maxLength={2}
                    keyboardType="numeric"
                    onChangeText={setClassName}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={10}
                    placeholder="Date of Birth (DD-MM-YYYY) Format"
                    value={dob}
                    onChangeText={setDob}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contact Number"
                    value={contactNumber}
                    keyboardType="numeric"
                    maxLength={10}
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