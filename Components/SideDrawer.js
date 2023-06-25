import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native'
import { Link, useNavigate } from 'react-router-native';

import { ERROR_MSG } from './AppConstant';

export default function SideDrawer({ closeSideDrawer, handleSignOut }) {
    const navigate = useNavigate();
    

    const isTeacherLoggedIn = (global.user.user == "teacher");
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={closeSideDrawer}>
                <Text>Close Drawer</Text>
            </TouchableOpacity>
            <Text>Side Drawer</Text>

            {isTeacherLoggedIn && <><Link to="/home/student-requests"><Text>Student Requests</Text></Link>
                <Link to="/home/main-content?11"><Text>Class 11</Text></Link>
                <Link to="/home/main-content?12"><Text>Class 12</Text></Link>
                <Link to="/home/enrolled-students"><Text>Enrolled Students</Text></Link></>}

            <TouchableOpacity onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'relative',
        zIndex: 10000,
        top: 0,
        width: Dimensions.get('window').width * 0.5,
        borderWidth: 1,
        height: Dimensions.get('window').height,
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
    },
});
