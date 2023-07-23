import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Dimensions, Image } from 'react-native'
import { ref, getDatabase, get } from 'firebase/database'
import { app } from './firebaseConfig'
import { useNavigate } from 'react-router-native';

import { EMPTY_INPUT_FIELDS, INVALID_PASSWORD, CONTANT_NUMBER_DOES_NOT_EXISTS, INVALID_CLASS, INVALID_CONTACT_NUMBER, ERROR_MSG, CLASS_NOT_FOUND } from './AppConstant';
import { Storage } from 'expo-storage'
import { async } from '@firebase/util';

export default function StudentLogin() {
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [stuClass, setStuClass] = useState("");

    const navigate = useNavigate();
    const database = getDatabase(app);

    useEffect(() => {
        (async () => {
                var loggedUser = await Storage.getItem({key: "loggedUser"});
                if(!loggedUser){
                    return null;
                }
                if(loggedUser === "teacher"){
                    global.user = {
                        user: "teacher",
                    }
                    navigate('/home/enrolled-students');
                }
                else if(loggedUser === "student"){
                    var stuClassValue = await Storage.getItem({key: "class"});
                    var stuNameValue = await Storage.getItem({key:"name"});
                    var stuContactValue = await Storage.getItem({key:"contact"});
                    global.user = {
                        user: "student",
                        class: stuClassValue,
                        name: stuNameValue,
                        contact: stuContactValue
                    }
                    navigate('/home/class' + stuClassValue + "-content");
                }
                else{
                    return;
                }
            
        })();
    }, [])

    const handleLogin = () => {

        if (contact == "" || password == "" || stuClass == "") {
            ToastAndroid.show(EMPTY_INPUT_FIELDS, ToastAndroid.SHORT);
            return;
        }


        if (contact.length != 10) {
            ToastAndroid.show(INVALID_CONTACT_NUMBER, ToastAndroid.SHORT);
            return;
        }

        if (stuClass != "11" && stuClass != "12") {
            ToastAndroid.show(INVALID_CLASS, ToastAndroid.SHORT);
            return;
        }


        const studentPath = "/class" + stuClass;
        console.log(studentPath);
        const studentRef = ref(database, studentPath);
        console.log(studentRef, "stu");

        get(studentRef).then(async (data) => {
            if (data && data.val()) {
                const getAvailableContact = data.val()[contact];
                if (getAvailableContact) {
                    if (getAvailableContact.password == password) {
                        global.user = {
                            user: "student",
                            class: stuClass,
                            name: getAvailableContact.name,
                            contact: getAvailableContact.contact
                        }
                        await Storage.setItem({key:"loggedUser", value:"student"});
                        await Storage.setItem({key:"class", value:stuClass});
                        await Storage.setItem({key: "name", value:getAvailableContact.name});
                        await Storage.setItem({key: "contact", value:getAvailableContact.contact});

                        navigate('/home/class' + stuClass + "-content");
                    }
                    else {
                        ToastAndroid.show(INVALID_PASSWORD, ToastAndroid.SHORT);
                    }
                } else {
                    ToastAndroid.show(CONTANT_NUMBER_DOES_NOT_EXISTS, ToastAndroid.SHORT);
                }
            }
            else {
                ToastAndroid.show(CLASS_NOT_FOUND, ToastAndroid.SHORT);
            }
        }).catch(() => {
            ToastAndroid.show(ERROR_MSG, ToastAndroid.SHORT);
        });
    }

    const goToRegister = () => {
        navigate("/register");
    }

    const goToLoginAsTeacher = () => {
        navigate("/teacher-login");
    }
    return (
        <View>
            <Image source={require('../assets/appLogo.png')} style={styles.logo} />
            <View style={styles.iccName}>
                <Text style={styles.nameTitle}>Ishant Commerce Classes</Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.title}>Login As Student</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    placeholder="Contact Number"
                    value={contact}
                    keyboardType="numeric"
                    maxLength={10}
                    onChangeText={setContact}
                    style={styles.input}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Class"
                    maxLength={2}
                    keyboardType="numeric"
                    value={stuClass}
                    onChangeText={setStuClass}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
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
    logo: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    iccName: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#3B3B3B'
    },
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
        marginTop: 15,
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
