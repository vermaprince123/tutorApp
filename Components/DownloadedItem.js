import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useLocation, useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pdf from 'react-native-pdf';
import { useState } from 'react';
// import { useEffect } from 'react';



export default function DownloadedItem() {
    //    useEffect(() => {
    //     console.log(RNScreenRecordPrevent, "Screen Record zprevent")
    //    })

    const src = useLocation().search.slice(1);
    const source = { uri: src, cache: true }
    const navigate = useNavigate();
    const [verticalOrientation, setVerticalOrientation] = useState(true);

    const goBack = () => {
        navigate(-1);
    }
    const changeOrientation = () => {
        console.log(verticalOrientation);
        if (verticalOrientation) {
            console.log("TRUE")
            setVerticalOrientation(false)
        }
        else {
            console.log("FALSE")
            setVerticalOrientation(true)
        }
        // setVerticalOrientation(!verticalOrientation);
        console.log(verticalOrientation)
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backBtn} >
                    <Icon name="arrow-left-thick" size={25} style={styles.iconStyle}/>
                </TouchableOpacity>
                <Text style={styles.title}>
                    {"  "}Document
                </Text>
                <TouchableOpacity onPress={changeOrientation} style={styles.rotatekBtn} >
                    <Icon name="crop-rotate" size={25} style={styles.iconStyle}/>
                </TouchableOpacity>
            </View>
            <View style={(verticalOrientation) ? styles.pdfContainerVertical : styles.pdfContainerHorizontal}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: "100%",
        width: "100%",
        // borderWidth: 1,
        display: 'flex'
    },
    pdfContainerVertical: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
    },
    pdfContainerHorizontal: {
        flex: 1,
        paddingTop: 150,
        paddingBottom: 150,
        width: Dimensions.get('window').height - 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        transform: [{
            rotateZ: "90deg"
        }]
    },

    pdf: {
        flex: 1,
        alignSelf: "stretch",
    },
    header: {
        backgroundColor: '#000',
        height: 50,
        width: "100%",
        padding: 10,
        justifyContent: 'flex-start',
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    backBtn: {
        color: 'white',
    },
    rotatekBtn: {
        color: 'white',
        position: 'absolute',
        right: 10,
        top: 12,
    },
    iconStyle: {
        color: 'white'
    }
});
