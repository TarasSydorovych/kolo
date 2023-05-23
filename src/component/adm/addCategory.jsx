

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
            name: "Назва категорії",
            transliter: "catName",
        },
       
     
    ]



    const [formData, setFormData] = useState({});

    const handleFormSubmit = async (event) => {
        event.preventDefault(); // запобігаємо стандартній поведінці відправки форми
      
        const form = event.target;
        const data = new FormData(form);
        const formDataObj = Object.fromEntries(data.entries());
        setFormData(formDataObj);
      
        console.log('перший форм дата', formData);
      
        if (formData.catName) {
          try {
            // Створюємо об'єкт документу для запису в Firestore
            const newProduct = {
              uid: uuidv4(),
              category: formData.catName,
              // Додайте інші поля форми за необхідності
            };
      
            // Записуємо новий продукт в Firestore
            const docRef = await addDoc(collection(db, 'category'), newProduct);
            console.log('Документ успішно додано з ID:', docRef.id);
            form.reset();
          } catch (error) {
            console.error('Помилка при додаванні документа:', error);
          }
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