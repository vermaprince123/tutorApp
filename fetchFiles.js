import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, listAll } from "firebase/storage";
import { app } from './firebaseConfig';
const fArray = [];
var count = 0;
const storage = getStorage(app, "gs://test-d7c04.appspot.com");
const listRef = ref(storage, '');

// Find all the prefixes and items.
listAll(listRef && listRef)
    .then((res) => {
        console.log(res, "response");
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
            }).catch((error) => {
                console.log(error)
            })
        });

    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error)
    });

    export default fArray;