
import { async } from '@firebase/util';
import { useState } from 'react'
import css from './response.module.css'
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 
import { v4 as uuidv4 } from 'uuid';
import {auth, db} from '../../firebase'



export default function WriteResponse({dataFromBase}) {

const [responseText, setResponseText] = useState('');

const respFunc = (event) => {
const resp = event.target.value;
setResponseText(resp)
}
const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
const addResp = async () => {
    if (responseText.length > 4) {

        try {
            // Створюємо об'єкт документу для запису в Firestore
            const newProduct = {
              uid: uuidv4(),
              autorId: dataFromBase.uid,
              autorName: dataFromBase.name,
              data: getCurrentDate(),
              text: responseText,
              // Додайте інші поля форми за необхідності
            };
      
            // Записуємо новий продукт в Firestore
            const docRef = await addDoc(collection(db, 'response'), newProduct);
           alert("Відгук успішно додано невдовзі він з'явиться на сайті");
           
          } catch (error) {
            console.error('Помилка при додаванні документа:', error);
          }
    }
}


    return(
        <div className={css.writeRespWrap}>
            <input type="text" className={css.inputResp} value={responseText} onChange={respFunc} placeholder='Відгук'/>
            <button className={css.buttonResp} onClick={addResp}>Відправити відгук</button>
        </div>
    )
}