import React, { useRef } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import { Link, useLocation } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



export default function SideDrawer({ closeSideDrawer, handleSignOut }) {
    const location = useLocation();
    console.log(location, "LOCATION");
    const path = location.pathname.replace("/home/", "");
    console.log(path)




    const activeScreen = useRef("enrolled-students");

    if (path == "enrolled-students") {
        activeScreen.current = "enrolled-students"
    }
    else if (path == "student-requests") {
        activeScreen.current = "student-requests"
    }
    else if (path == "about-us") {
        activeScreen.current = "about-us"
    }
    else if(path == "student-profile"){
        activeScreen.current = "student-profile"
    }
    else {
        let class11Pattern = /class11-content.*/
        let class12Pattern = /class12-content.*/

        if (class11Pattern.test(path)) {
            activeScreen.current = "class11-content"
        }
        else if (class12Pattern.test(path)) {
            activeScreen.current = "class12-content"
        }

    }
    console.log(global.user, "USER")

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
                <Link to="/home/about-us" component={TouchableOpacity}
                    style={activeScreen.current == "about-us" ? styles.activeNavLink : styles.navLink}>
                    <Text style={activeScreen.current == "about-us" ? styles.activeNavLinkText : styles.navLinkText}>
                        About Us
                    </Text>
                </Link>
                {global.user.user === "teacher" && <Link to="/home/enrolled-students" component={TouchableOpacity}
                    style={activeScreen.current == "enrolled-students" ? styles.activeNavLink : styles.navLink}>
                    <Text style={activeScreen.current == "enrolled-students" ? styles.activeNavLinkText : styles.navLinkText}>
                        Enrolled Students
                    </Text>
                </Link>}
                {global.user.user === "teacher" && <Link to="/home/student-requests" component={TouchableOpacity}
                    style={activeScreen.current == "student-requests" ? styles.activeNavLink : styles.navLink}>
                    <Text style={activeScreen.current == "student-requests" ? styles.activeNavLinkText : styles.navLinkText}>
                        Student Requests
                    </Text>
                </Link>}
                {(global.user.user === "teacher" || global.user.class == "11") && <Link to="/home/class11-content" component={TouchableOpacity}
                    style={activeScreen.current == "class11-content" ? styles.activeNavLink : styles.navLink}>
                    <Text style={activeScreen.current == "class11-content" ? styles.activeNavLinkText : styles.navLinkText}>
                        {global.user.user === "teacher" ? "Class 11" : "Home"}
                    </Text>
                </Link>}
                {(global.user.user === "teacher" || global.user.class == "12") && <Link to="/home/class12-content" component={TouchableOpacity}
                    style={activeScreen.current == "class12-content" ? styles.activeNavLink : styles.navLink}>
                    <Text style={activeScreen.current == "class12-content" ? styles.activeNavLinkText : styles.navLinkText}>
                        {global.user.user === "teacher" ? "Class 12" : "Home"}
                    </Text>
                </Link>}
                {global.user.user === "student" && <Link to="/home/student-profile" component={TouchableOpacity}
                    style={activeScreen.current == "student-profile" ? styles.activeNavLink : styles.navLink}>
                    <Text style={activeScreen.current == "student-profile" ? styles.activeNavLinkText : styles.navLinkText}>
                        Profile
                    </Text>
                </Link>}
            </View>

            <TouchableOpacity onPress={handleSignOut}>
                <Text style={styles.signOutText}>Sign Out</Text>
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
    signOutText: {
        textDecorationLine: 'underline'
    }

});
