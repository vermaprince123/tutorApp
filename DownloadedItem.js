import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import { useLocation, useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Pdf from 'react-native-pdf';



export default function DownloadedItem({ props }) {




    console.log(useLocation().search.slice(1), 'loaction');
    const src = useLocation().search.slice(1);
    const source = { uri: src, cache: true }
    const navigate = useNavigate();

    const goBack = () => {
        console.log("going back")
        navigate('/pdfs');
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> <Icon.Button name="arrow-left" size={20} onPress={goBack}/>
                {"  "}Document</Text>
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
        color: 'white',
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
