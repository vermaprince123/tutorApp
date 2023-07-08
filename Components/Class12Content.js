import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import MainContent from './MainContent'

export default function Class12Content({closeSideDrawer}) {
    useEffect(() => {
        return () => {
            closeSideDrawer()
        }
    }, [])
  return (
    <View style={styles.container}>
        <MainContent stuClass={12} />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      },
})