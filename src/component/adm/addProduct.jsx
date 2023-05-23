

import css from './adm.module.css'
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import {auth, db} from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 




export default function AddProduct() {
    const storage = getStorage();

    const objList = [
        {
            name: "Назва товару",
            transliter: "prodName",
        },
        {
            name: "Опис товару",
            transliter: "descProduct",
        },
        {
            name: "Складники",
            transliter: "prodSclad",
        },
        {
            name: "Вага",
            transliter: "weight",
        },
        {
            name: "Ціна",
            transliter: "price",
        },
        {
            name: "Фото",
            transliter: "foto",
        },
        {
            name: "Категорія",
            transliter: "category",
        },
     
    ]



    const [formData, setFormData] = useState({});

//     const handleFormSubmit = (event) => {
//       event.preventDefault(); // prevent the default form submission behaviour
  
//       // Collect form data and update the state
//       const form = event.target;
      
//       const data = new FormData(form);
//       const formDataObj = Object.fromEntries(data.entries());
//       setFormData(formDataObj);

//       console.log('перший форм дата',formData)
//       //добавка товару якщо є два фото
//       if (formData.foto.name){
//         const newObj = formData;
//         const storageRef1 = ref(storage, formData.foto.name);
  
//   const uploadTask1 = uploadBytesResumable(storageRef1, formData.foto);

//   uploadTask1.on('state_changed',
//   (snapshot) => {
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('progress1', progress);
//   },
//   (error) => {
//     console.log('error uploading file1', error);
//   }
// );




// uploadTask1.on('state_changed', async () => {
//     const downloadURL1 = await getDownloadURL(uploadTask1.snapshot.ref);
    
//       newObj.foto = downloadURL1;
     
//       newObj.uid = uuidv4();
//       const frankDocRef = doc(db, 'product', newObj.uid);
//       await setDoc(frankDocRef, newObj);
   
//   });


        



//       }else if(formData.foto){
//         console.log('нема імя')
//       }

//       // Log the form data to the console

      

      
//     };



const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const form = event.target;
    const data = new FormData(form);
    const formDataObj = Object.fromEntries(data.entries());
    setFormData(formDataObj);
  
    console.log('перший форм дата', formDataObj.foto.name);
  
    if (formDataObj.foto && formDataObj.foto.name) {
      const newObj = formDataObj;
      const storageRef = ref(storage, formDataObj.foto.name);
      const uploadTask = uploadBytesResumable(storageRef, formDataObj.foto);
  
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('progress', progress);
        },
        (error) => {
          console.log('error uploading file', error);
        }
      );
  
      const unsubscribe = uploadTask.on('state_changed', async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        newObj.foto = downloadURL;
        newObj.uid = uuidv4();
  
        const docRef = doc(db, 'product', newObj.uid);
        await setDoc(docRef, newObj);
        window.location.reload();
      });
  
      // Відписатися від прослуховування подій
      unsubscribe();

    } else if (formData.foto) {
      console.log('нема імені');
    }
  
  };






    return(
        <div className={css.addProdWrap}>
            <form onSubmit={handleFormSubmit}>
            {objList.map((el, index) => {
                if(el.name === 'Фото'){
                    return  <div key={index} >

<p >{el.name}</p>
 <input type="file" name={el.transliter} id='nameProp'/>

</div>
                }else{
                    return  <div key={index} >

                    <p >{el.name}</p>
                     <input type="text" name={el.transliter} id='nameProp'/>
                    
                    </div>
                }
             

            })}
            <button type='submit'>Додати книгу</button>
            </form>
        </div>
    )
}