
import { useState, useEffect } from 'react'
import css from './response.module.css'
import ResponseOne from './responseOne'
import WriteResponse from './writeResponse'
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 
import { getFirestore,  query, where, getDocs, onSnapshot  } from 'firebase/firestore';
import {auth, db} from '../../firebase'
import { getAuth, signInWithPhoneNumber, signOut , onAuthStateChanged } from "firebase/auth";




export default function ResponseBlock() {

   const [loginUser, setLoginUser] = useState(false);
   const [dataFromBase, setDataFromBase] = useState(null);
   const [user, setUser] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setLoginUser(true)
            // Користувач увійшов в систему
            setUser(currentUser);
          } else {
            // Користувач вийшов з системи
            setLoginUser(false)
            
            setUser(null);
          }
        });
       
    
        return () => {
          // Відписка від слухача після розмонтовування компоненти
          unsubscribe();
        };
      },[])

    useEffect(() => {
        const fetchUser = async () => {
          const db = getFirestore();
          const usersRef = collection(db, 'users');
          if(user){
          const q = query(usersRef, where('uid', '==', user.uid));
          
          try {
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                // Отримайте дані документа
                const userData = doc.data();
                console.log('userData',userData)
               
                setDataFromBase(userData);
              });
            } else {
              // Документ не знайдено
              setUser(null);
            }
          } catch (error) {
            console.log('Помилка під час отримання даних:', error);
          }
        }
      
      
        };
      
        fetchUser();
      }, [user]);
const [allResp, setAllResp] = useState([]);
const [canUse, setCanUse] = useState(false);
      useEffect(() => {
 
        const fetchProducts = async () => {
          const productsRef = collection(db, 'response');
          const productsSnapshot = await getDocs(productsRef);
          const productsList = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setAllResp(productsList);
          setCanUse(true)
        
        
  
         
        };
      
        fetchProducts();
     
}, [])





    return(
<div className={css.responseBlockWrap}>
<div className={css.responseBlock}>
    {loginUser &&
    <WriteResponse dataFromBase={dataFromBase}/>
}
{!loginUser &&
    <div className={css.writeRespWrap}>
<h4 className={css.doNotAddResponse}>Для того щоб додати відгук зареєструйтесь</h4>
</div>
}
{canUse &&
allResp.map((el, index) => {
 return <ResponseOne el={el} key={index}/>
})
}
    
    

</div>

</div>
    )
}