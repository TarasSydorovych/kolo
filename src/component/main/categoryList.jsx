
import css from './mainPage.module.css'
import {useState, useEffect} from 'react'
import {auth, db} from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore"; 


export default function CategoryList({setCategory}) {
    const [categoriesList, setCategoriesList] = useState([]);
    const [haveCategory, setHaveCategory] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            const productsRef = collection(db, 'category');
            const productsSnapshot = await getDocs(productsRef);
            const productsList = productsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            
            setHaveCategory(true)
            setCategoriesList(productsList);
            console.log('Список продуктів',categoriesList);
          };
          fetchCategory();
      }, []);
      const changeCategory = (name) => {
        setCategory(name);
      }

    return(
        <div className={css.categoryListWrap}>
         <ul className={css.ulListCategory}>
            {haveCategory &&
            categoriesList.map((el, index) => {
             return   <li onClick={() => changeCategory(el.category)} key={el.uid} className={css.ulListLi}>{el.category}</li>
            })
            }



         </ul>

        </div>
    )
}