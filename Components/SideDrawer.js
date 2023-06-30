import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import { Link, useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { ERROR_MSG } from './AppConstant';


export default function SideDrawer({ closeSideDrawer, handleSignOut }) {
    const navigate = useNavigate();


    const isTeacherLoggedIn = (global.user.user == "teacher");
    return (
        <View style={styles.container} elevation={7}>
            <Image source={require('../assets/appLogo.png')} style={styles.logo} />
            <View style={styles.header}>
                <Text style={styles.title}>Ishant Commerce Classes</Text>
            </View>
            <TouchableOpacity onPress={closeSideDrawer} style={styles.closeButton}>
                <Icon name="close" size={30} color="#000"></Icon>
            </TouchableOpacity>


            {isTeacherLoggedIn && <View style={styles.navLinkContainer}>
                <Link to="/home/enrolled-students" component={TouchableOpacity} style={styles.navLink}>
                    <Text style={styles.navLinkText}>Enrolled Students</Text>
                </Link>
                <Link to="/home/student-requests" component={TouchableOpacity} style={styles.navLink}>
                    <Text style={styles.navLinkText}>Student Requests</Text>
                </Link>
                <Link to="/home/main-content?11" component={TouchableOpacity} style={styles.navLink}>
                    <Text style={styles.navLinkText}>Class 11</Text>
                </Link>
                <Link to="/home/main-content?12" component={TouchableOpacity} style={styles.navLink}>
                    <Text style={styles.navLinkText}>Class 12</Text>
                </Link>
            </View>}

            <TouchableOpacity onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        position: 'relative',
        zIndex: 10000,
        top: 0,
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height,
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 15
    },
    closeButton: {
        position: 'absolute',
        top: 2,
        right: 2,
    },
    logo: {
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        resizeMode: 'contain'
    },
    header: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    navLinkContainer: {
        width: "95%",
        height: "50%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
        // alignSelf: 'center'
    },
    navLink: {
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
    navLinkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    },

});
