import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'react-router-native';

export default function BottomNavigator({stuClass}) {
    console.log(stuClass, "BN")
    useEffect(()=>{
        return(() =>{
            console.log("Unmounting")
        })
    }, [])
  return (
    <View style={styles.bottomTab}>
         <Link to={"/home/pdfs?"+stuClass}><Text>A</Text></Link>
         <Link to={"/home/assignments?"+stuClass}><Text>B</Text></Link>
         <Link to={"/home/notices?"+stuClass}><Text>C</Text></Link>
         <Link to={"/home/tests?"+stuClass}><Text>D</Text></Link>
    </View>
  )
}

const styles = StyleSheet.create({
    bottomTab:{
        width: Dimensions.get('window').width,
        borderWidth: 1,
        display: 'flex',
        gap: 50,
        height: 50,
        flexDirection: 'row',
        marginLeft: 20
    }
})
