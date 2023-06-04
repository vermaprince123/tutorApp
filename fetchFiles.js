import { getStorage, ref, uploadBytes, uploadString, getDownloadURL, listAll } from "firebase/storage";
import { app } from './firebaseConfig';

const storage = getStorage(app, "gs://ishantcommerceclasses.appspot.com");
const listRef = ref(storage, '');
var fArray = [];


const fetchF = async () => {
    if(fArray.length > 0){
        fArray = [];
    }
    return new Promise(async (resolve, reject) => {
        //call listAll() to get all the items in the folder
        const res = await listAll(listRef);
        len = res.items.length;
        console.log(fArray.length, res.items.length, "LENGTHS OF ARRAYS");
        if(fArray.length == res.items.length){
            console.log("ITEMS ALREADY FETCHED");
            resolve(fArray);
            return;
        }
        // console.log("INSIDE PROMISE")
        // console.log(res.items.length, "PROMISE")
        //iterate over the items
        res.items.forEach(async (itemRef) => {
            const itempath = itemRef['_location']['path_'];
            const itemstorage = ref(storage, itempath);
            console.log("FORE EACH LOOP")
            //get the download url of the item
            await getDownloadURL(itemstorage).then((url) => {
                //push the item to the array with the obj containing name and src
                fArray.push({ name: itemRef.name, src: url });

                console.log(fArray.length, "ARRAY URL")
                //if the array is full, resolve the promise
                if (fArray.length == len) {
                    resolve(fArray);
                } 

            });
        });
    });
}


const fetchFiles = async () => {
   try{
        await fetchF();
        return new Promise((resolve, reject) => {
            resolve(fArray);
        });
   }catch(e){

   }
}

 
export default fetchFiles;