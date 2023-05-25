import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';

import Pdf from 'react-native-pdf';



export default function DownloadedItem({ navigation, route }) {

    const url = "https://firebasestorage.googleapis.com/v0/b/test-d7c04.appspot.com/o/TED%20talks-1.pdf?alt=media&token=a446fef8-e9ff-4992-926f-369dfe5e8a3";
    const source = { uri: url, cache: true }
    console.log(route);
    return (
        <View style={styles.container}>
            <Pdf
            trustAllCerts={true}
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
        marginTop: 25,
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
      }
    // pdf: {
    //     flex: 1,
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    // },
});
