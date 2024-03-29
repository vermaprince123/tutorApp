import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Image,
    Dimensions
} from 'react-native';
import { ERROR_MSG, USER_EMAIL } from './AppConstant';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-native';

import { app } from './firebaseConfig';



export default function Login() {
    const auth = getAuth(app);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onLogin = () => {
        const email = USER_EMAIL;
        password ? signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            global.user = userCredentials?.user;
            ToastAndroid.show("Signed In as a Teacher", ToastAndroid.SHORT);
            navigate('/pdfs');
        }).catch((error) => {
            console.log(error,"onLogin function")
            ToastAndroid.show(ERROR_MSG, ToastAndroid.SHORT);
        }) : ToastAndroid.show("Please Enter password to login as Teacher", ToastAndroid.SHORT);
    };

    const stuLogin = () => {
        global.user = null;
        navigate('/pdfs');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('./assets/appLogo.png')} style={styles.logo} />
            <View style={styles.iccName}>
                <Text style={styles.nameTitle}>Ishant Commerce Classes</Text>
            </View>
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
    iccName: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: Dimensions.get('window').width*0.6,
        height: Dimensions.get('window').width*0.6,
        resizeMode: 'contain'
    },
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
    nameTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#3B3B3B'
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
