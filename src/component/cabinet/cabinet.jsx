import { Footer } from '../standartComponent/footer/footer'
import Header from '../standartComponent/header/header'
import css from './cabinet.module.css'
import {auth, db} from '../../firebase'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPhoneNumber, signOut , onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 
import { getFirestore,  query, where, getDocs, onSnapshot  } from 'firebase/firestore';


export default function Cabinet() {
    const [dataFromBase, setDataFromBase] = useState(null);
    const [user, setUser] = useState('');
const [personalData, setPersonalData] = useState(true);
const [orderHistoru, setOrderHistoru] = useState(false);
const [response, setResponse] = useState(false);
const [responseDocuments, setResponseDocuments] = useState([]);
    const navigate = useNavigate();
    const personalDataFunc = () => {
        setPersonalData(true);
        setOrderHistoru(false)
        setResponse(false)
    }
    const orderHistoruFunc = () => {
        setPersonalData(false);
        setOrderHistoru(true)
        setResponse(false)
    }
    const responseFunc = () => {
        setPersonalData(false);
        setOrderHistoru(false)
        setResponse(true)
    }


    useEffect(() => {
      const fetchData = async () => {
        try {
          const db = getFirestore();
          const responseRef = collection(db, 'response');
          const q = query(responseRef, where('autorId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          
          const documents = [];
          querySnapshot.forEach((doc) => {
            documents.push(doc.data());
          });
  
          setResponseDocuments(documents);
        } catch (error) {
          console.error('Error getting response documents:', error);
        }
      };
  
      if (user) {
        fetchData();
      }
    }, [user]);



   useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
           
            // Користувач увійшов в систему
            setUser(currentUser);
          } else {
            // Користувач вийшов з системи
        
            navigate('/')
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



      const [orders, setOrders] = useState([]);

      useEffect(() => {
       
        const fetchOrders = async () => {
          const db = getFirestore();
          const ordersRef = collection(db, 'orders');
          const q = query(ordersRef, where('user', '==', dataFromBase.uid));
    
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersData = [];
            snapshot.forEach((doc) => {
              ordersData.push({ id: doc.id, ...doc.data() });
            });
            setOrders(ordersData);
            
          });
    
          return () => unsubscribe();
        };
    
        if (dataFromBase && dataFromBase.uid) {
          fetchOrders();
        }
      }, [dataFromBase]);


      const handleLogout = () => {
       
        signOut(auth)
          .then(() => {
            
            navigate('/')
            // Додайте необхідну логіку після виходу користувача
          })
          .catch((error) => {
            console.log('Помилка під час виходу з системи:', error);
          });
      };















    return(
        <div>
            <Header/>
            {dataFromBase &&
<div className={css.cabinetUserWrap}>
<div className={css.smallCabinetWrap}>
<div className={css.profileWrap}>
<h3 className={css.profileWrapH3}>Профіль</h3>

<p className={css.profileWrapP} onClick={personalDataFunc}>Особисті дані</p>
<p className={css.profileWrapP} onClick={orderHistoruFunc}>Історія замовлень</p>
<p className={css.profileWrapP} onClick={responseFunc}>Мої відгуки</p>
<p className={css.profileWrapP} onClick={handleLogout}>Вийти</p>

</div>
<div className={css.infoWrap}>


{personalData &&
<>
<h3 className={css.profileWrapH3}>Особисті дані</h3>
<div className={css.wrapInfoTr}>
<div className={css.wrapInfoTrSmall}>
    <p className={css.nameOptionInfo}>ID Користувача:</p>
    <p className={css.optionInfo}>{dataFromBase.uid}</p>
</div>
<div className={css.wrapInfoTrSmall}>
    <p className={css.nameOptionInfo}>Ім'я:</p>
    <p className={css.optionInfo}>{dataFromBase.name}</p>
</div>
<div className={css.wrapInfoTrSmall}>
    <p className={css.nameOptionInfo}>Телефон:</p>
    <p className={css.optionInfo}>{dataFromBase.phone}</p>
</div>
<div className={css.wrapInfoTrSmall}>
    <p className={css.nameOptionInfo}>Email:</p>
    <p className={css.optionInfo}>{dataFromBase.email}</p>
</div>


</div>
</>
}
{orderHistoru && 
<>
{orders.map((el, index) => {
    return(
        <div className={css.wrapInfoTr} key={index}>
<div className={css.wrapInfoTrSmall} >
    <p className={css.nameOptionInfo}>ID Замовлення:</p>
    <p className={css.optionInfo}>{el.uid}</p>
</div>
<div className={css.wrapInfoTrSmall} >
    <p className={css.nameOptionInfo}>Загальна вартість:</p>
    <p className={css.optionInfo}>{el.totalPrice}</p>
</div>
</div>
    )
})}
</>

}

{response && 
<>
{responseDocuments.map((el, index) => {
    return(
        <div className={css.wrapInfoTr} key={index}>
<div className={css.wrapInfoTrSmall} >
    <p className={css.nameOptionInfo}>Дата додавання:</p>
    <p className={css.optionInfo}>{el.data}</p>
</div>
<div className={css.wrapInfoTrSmall} >
    <p className={css.nameOptionInfo}>Відгук:</p>
    <p className={css.optionInfo}>{el.text}</p>
</div>
</div>
    )
})}
</>

}
            

</div>





</div>



</div>
}
            <Footer/>
        </div>
    )
}