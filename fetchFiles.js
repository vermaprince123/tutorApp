import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, listAll } from "firebase/storage";
import { app } from './firebaseConfig';

const storage = getStorage(app, "gs://test-d7c04.appspot.com");
const listRef = ref(storage, '');
const fArray = [];


const fetchF = async () => {
    //return promise
    return new Promise(async (resolve, reject) => {
        //call listAll() to get all the items in the folder
        const res = await listAll(listRef);
        len = res.items.length;

        //iterate over the items
        res.items.forEach(async (itemRef) => {
            const itempath = itemRef['_location']['path_'];
            const itemstorage = ref(storage, itempath);

            //get the download url of the item
            await getDownloadURL(itemstorage).then((url) => {
                //push the item to the array with the obj containing name and src
                fArray.push({ name: itemRef.name, src: url });
                //if the array is full, resolve the promise
                if (fArray.length == len) {
                    resolve(fArray);
                } 

            });
        });
    });
}


const fetchFiles = async () => {
    await fetchF();
    return new Promise((resolve, reject) => {
        resolve(fArray);
    });
}


export default fetchFiles;