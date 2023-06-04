import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useLocation, useNavigate } from 'react-router-native';
// import { usePreventScreenCapture } from 'expo-screen-capture';
import RNScreenRecordPrevent from 'react-native-screen-record-prevent';


import Icon from 'react-native-vector-icons/FontAwesome';
import Pdf from 'react-native-pdf';
import { useEffect } from 'react';



export default function DownloadedItem() {
   useEffect(() => {
    console.log(RNScreenRecordPrevent, "Screen Record zprevent")
   })

    // usePreventScreenCapture();
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
                <Text style={styles.title}> <TouchableOpacity  onPress={goBack} >
                    <Icon name="arrow-left" size={20} style={styles.backBtn} />
                </TouchableOpacity>
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
    },
    header: {
        backgroundColor: '#000',
        height: 50,
        width: "100%",
        padding: 10,
        justifyContent: 'center',
        color: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    backBtn: {
        color: 'white'
    }
});
