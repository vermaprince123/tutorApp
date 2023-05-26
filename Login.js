import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { RedirectFunction, redirect, Link, useNavigate } from 'react-router-native';

import { app } from './firebaseConfig';



export default function Login() {
    const auth = getAuth(app);
    console.log(auth);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onLogin = () => {
        console.log(password);
        const email = "princevermasrcc@gmail.com"
        const pass = "!$#@nTv"
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            global.user = userCredentials.user
            console.log(global.user, "SUCCESS");
            navigate('/pdfs');
        })
        // TODO: Do something with the email and password
    };

    const stuLogin = () => {
        global.user = null;
        navigate('/pdfs');
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={useColorScheme() === 'dark' ? 'light-content' : 'dark-content'} />
                <View style={styles.header}>
                    <Text style={styles.title}>Login</Text>
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onLogin}
                >
                    <Text style={styles.buttonText}>Continue as Teacher</Text>
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={styles.title}>OR</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={stuLogin}
                >
                    <Text style={styles.buttonText}>Continue as Student</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
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
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },
    button: {
        width: "90%",
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
});
