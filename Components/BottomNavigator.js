import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'react-router-native';

export default function BottomNavigator() {
    useEffect(()=>{
        return(() =>{
            console.log("Unmounting")
        })
    }, [])
  return (
    <View style={styles.bottomTab}>
         <Link to="/main-content/pdfs"><Text>A</Text></Link>
         <Link to="/main-content/assignments"><Text>B</Text></Link>
         <Link to="/main-content/notices"><Text>C</Text></Link>
         <Link to="/main-content/tests"><Text>D</Text></Link>
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
        flexDirection: 'row'
    }
})
