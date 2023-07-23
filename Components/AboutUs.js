import React, { useEffect } from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default function AboutUs({closeSideDrawer}) {
    useEffect(() => {
        return(() => {
            closeSideDrawer();
        })  
    }, []);
  return (
    <View style={styles.container}>
        <View style={styles.detailContainer}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.abtDesc}>Mr. Ishant Verma is an alumnus of Sri Ram College of Commerce, Delhi University with a Masters Degree from Delhi University. He has been teaching for the last ten years and has vast knowledge in the field of Commerce. He has also qualified for UGC NET two times and has a very good academic record. He has achieved many awards and has a very good method of teaching.</Text>
        </View>
    </View>

  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    abtDesc: {
        fontSize: 20,
        lineHeight: 30,
    },
    detailContainer: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 15
    }
})
