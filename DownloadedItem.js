import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import { useLocation } from 'react-router-native';

import Pdf from 'react-native-pdf';



export default function DownloadedItem({ props }) {

    const url = "https://firebasestorage.googleapis.com/v0/b/test-d7c04.appspot.com/o/TED%20talks-1.pdf?alt=media&token=a446fef8-e9ff-4992-926f-369dfe5e8a3";

    console.log(useLocation().search.slice(1), 'loaction');
    const src = useLocation().search.slice(1);
    const source = { uri: src, cache: true }
    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Document</Text>
                </View>
            <Pdf
                trustAllCerts={false}
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginTop: 25,
        height: "100%",
        width: "100%"
    },
    pdf: {
        flex: 1,
        alignSelf: "stretch",
        borderColor: "red",
        // backgroundColor: "#fff"
        // width: "2",
        // height: Dimensions.get('window').height,
    },
    header: {
        backgroundColor: '#000',
        height: 50,
        width: "100%",
        padding: 10,
        justifyContent: 'center',
        // alignItems: 'center',
        color:'white',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
      },
    // pdf: {
    //     flex: 1,
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    // },
});
