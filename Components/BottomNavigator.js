import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Link, useLocation } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { set } from 'firebase/database';

export default function BottomNavigator({ stuClass }) {

    const activeScreen = useRef("home");
    const location = useLocation();
    const path = location.pathname.replace("/home", "");

    console.log(path, "PATH")


    if (path == "/" || path == "/class") {
        activeScreen.current = "home"
    }
    else if (path == "/assignments") {
        activeScreen.current = "assignments"
    }
    else if (path == "/tests") {
        activeScreen.current = "tests"
    }
    else {
        activeScreen.current = "notices"
    }


    const iconSize = 22;
    const activeTabColor = "#000";
    const passiveTabColor = "#fff";




    console.log(stuClass, "BN")
    useEffect(() => {
        return (() => {
            console.log("Unmounting")
        })
    }, [])
    return (
        <View style={styles.bottomTab}>
            <Link to={"/home/?" + stuClass} component={TouchableOpacity}
                style={activeScreen.current == "home" ? styles.activeNavLink : styles.bottomLinks}>
                <>
                    <Icon name="notebook-multiple" size={iconSize} 
                    color={activeScreen.current == "home" ? activeTabColor : passiveTabColor} 
                    />
                    <Text style={activeScreen.current == "home" ? styles.activeNavLinkText : styles.navLinkText}>
                        Material
                    </Text>
                </>
            </Link>
            <Link to={"/home/assignments?" + stuClass} component={TouchableOpacity}
                style={activeScreen.current == "assignments" ? styles.activeNavLink : styles.bottomLinks}>
                <>
                    <Icon name="note-multiple" size={iconSize} 
                    color={activeScreen.current == "assignments" ? activeTabColor : passiveTabColor} 
                    />
                    <Text style={activeScreen.current == "assignments" ? styles.activeNavLinkText : styles.navLinkText}>
                        Assigns.
                    </Text>
                </>
            </Link>
            <Link to={"/home/tests?" + stuClass} component={TouchableOpacity}
                style={activeScreen.current == "tests" ? styles.activeNavLink : styles.bottomLinks}>
                <>
                    <Icon name="clipboard-edit" size={iconSize} 
                    color={activeScreen.current == "tests" ? activeTabColor : passiveTabColor} 
                    />
                    <Text style={activeScreen.current == "tests" ? styles.activeNavLinkText : styles.navLinkText}>
                        Tests
                    </Text>
                </>
            </Link>
            <Link to={"/home/notices?" + stuClass} component={TouchableOpacity}
                style={activeScreen.current == "notices" ? styles.activeNavLink : styles.bottomLinks}>
                <>
                    <Icon name="bell-alert" size={iconSize} 
                    color={activeScreen.current == "notices" ? activeTabColor : passiveTabColor} 
                    />
                    <Text style={activeScreen.current == "notices" ? styles.activeNavLinkText : styles.navLinkText}>
                        Notices
                    </Text>
                </>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomTab: {
        width: "100%",
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        height: 10,
        flexDirection: 'row',
        color: '#fff',
    },
    bottomLinks: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: "20%",
        height: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    navLinkText: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center'
    },
    activeNavLink: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: "20%",
        height: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: "#e2e2e2",
    },
    activeNavLinkText: {
        color: '#000',
        fontSize: 12,
        textAlign: 'center'
    },
})
