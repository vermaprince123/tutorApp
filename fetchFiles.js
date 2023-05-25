import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, listAll } from "firebase/storage";
import { app } from './firebaseConfig';

const storage = getStorage(app, "gs://test-d7c04.appspot.com");
const listRef = ref(storage, '');
const fArray = [];
var count = 0;
var len = 0;


const fetchF = async () => {
    
    await listAll(listRef && listRef)
        .then((res) => {
            console.log(res, "response");
            console.log(res.items.length, "res length");
            len = res.items.length;
            res.items.forEach((itemRef) => {
                // All the items under listRef.
                const itemPath = itemRef["_location"]["path_"]
                const itemStorage = ref(storage, itemPath);

                getDownloadURL(itemStorage && itemStorage).then((url) => {
                    const i = itemPath.indexOf('.');
                    const fName = itemPath.substr(0, i);
                    const fileObj = {
                        name: fName,
                        src: url
                    }
                    fArray.push(fileObj);
                    count++;
                    console.log(count)
                    console.log(fArray.length, "length")

                }).catch((error) => {
                    console.log(error)
                })
                
            });

        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error)
        });
}


const fetchFiles = async () => {
    console.log("start");
    await fetchF();
    console.log(fArray, "after fetf call")
    return fArray;

    // return fArray;
}


export default fetchFiles;
