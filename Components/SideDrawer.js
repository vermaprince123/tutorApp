import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native';

export default function SideDrawer({ closeSideDrawer }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={closeSideDrawer}>
                <Text>Close Drawer</Text>
            </TouchableOpacity>
            <Text>Side Drawer</Text>

            <Link to="/student-requests"><Text>Student Requests</Text></Link>
            <Link to="/main-content"><Text>Class 11</Text></Link>
            <Link to="/enrolled-students"><Text>Enrolled Students</Text></Link>

            {/* <TouchableOpacity>
                <Text></Text>
            </TouchableOpacity> */}
            {/* <Link to="/student-requests">Student Requests</Link>
            <Link to="/enrolled-students">Enrolled Students</Link> */}
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
