import { useEffect } from 'react'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default function StudentProfile({ closeSideDrawer }) {
    useEffect(() => {
        return (() => {
            closeSideDrawer();
        })
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.detailContainer}>
                <Icon name="person-circle-outline" size={100} color="#000" style={styles.profileIcon}></Icon>
                <Text style={styles.title}>{"       "}  Student's Profile</Text>
                <Text style={styles.stuName}>Name: {global.user.name}</Text>
                <Text style={styles.stuClass}>Class-{global.user.class}</Text>
                <Text style={styles.stuContact}>Contact: {global.user.contact}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    detailContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height*0.25,
        alignSelf: 'center',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign: 'center'
    },
    profileIcon: {
        position: 'absolute',
        top: -35,
        left: -35,
        padding: 0,
        margin: 0,
        backgroundColor: "#fff",
        borderRadius: 100,
        borderWidth: 1,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    stuName: {
        fontSize: 17,
        fontWeight: '500'
    },
    stuClass: {
        fontSize: 17,
    },
    stuContact: {
        fontSize: 17,
        textDecorationLine: 'underline' 
    }
})