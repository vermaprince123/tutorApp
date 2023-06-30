import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import { Link, useNavigate, useLocation } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { ERROR_MSG } from './AppConstant';
import { useRef } from 'react';


export default function SideDrawer({ closeSideDrawer, handleSignOut }) {
    const location = useLocation();
    console.log(location, "LOCATION");
    const path = location.pathname.replace("/home", "");
    const search = location.search.replace("?", "");



    const isTeacherLoggedIn = (global.user.user == "teacher");

    const activeScreen = useRef("enrolled-students");

    if (path == "/enrolled-students") {
        activeScreen.current = "enrolled-students"
    }
    else if (path == "/student-requests") {
        activeScreen.current = "student-requests"
    }
    else {
        if (search == "11") {
            activeScreen.current = "class11"
        }
        else {
            activeScreen.current = "class12"
        }
    }


    return (
        <View style={styles.container} elevation={7}>
            <Image source={require('../assets/appLogo.png')} style={styles.logo} />
            <View style={styles.header}>
                <Text style={styles.title}>Ishant Commerce Classes</Text>
            </View>
            <TouchableOpacity onPress={closeSideDrawer} style={styles.closeButton}>
                <Icon name="close" size={30} color="#000"></Icon>
            </TouchableOpacity>


            <View style={styles.navLinkContainer}>
                <Link to="/home/enrolled-students" component={TouchableOpacity}
                    style={activeScreen.current == "enrolled-students" ? styles.activeNavLink : styles.navLink}>
                    <Text style={activeScreen.current == "enrolled-students" ? styles.activeNavLinkText : styles.navLinkText}>
                        Enrolled Students
                    </Text>
                </Link>
                <Link to="/home/student-requests" component={TouchableOpacity}
                    style={activeScreen.current == "student-requests" ? styles.activeNavLink : styles.navLink}>
                    <Text style={activeScreen.current == "student-requests" ? styles.activeNavLinkText : styles.navLinkText}>
                        Student Requests
                    </Text>
                </Link>
                <Link to="/home/main-content?11" component={TouchableOpacity}
                    style={activeScreen.current == "class11" ? styles.activeNavLink : styles.navLink}>
                    <Text style={activeScreen.current == "class11" ? styles.activeNavLinkText : styles.navLinkText}>
                        Class 11
                    </Text>
                </Link>
                <Link to="/home/main-content?12" component={TouchableOpacity}
                    style={activeScreen.current == "class12" ? styles.activeNavLink : styles.navLink}>
                    <Text style={activeScreen.current == "class12" ? styles.activeNavLinkText : styles.navLinkText}>
                        Class 12
                    </Text>
                </Link>
            </View>

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
    activeNavLink: {
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
    activeNavLinkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    navLink: {
        width: "90%",
        padding: 10,
        height: 40,
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    navLinkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000'
    },

});
