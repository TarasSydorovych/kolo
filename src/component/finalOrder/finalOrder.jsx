import { FirstBlock } from "../main/firstBlock";
import { Footer } from "../standartComponent/footer/footer";
import Header from "../standartComponent/header/header";
import css from './finalOrder.module.css'
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1'
import { getFirestore,  query, where, getDocs } from 'firebase/firestore';
import { getAuth, signInWithPhoneNumber, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Buffer } from 'buffer';
import {auth, db} from '../../firebase'
import { clearProducts } from '../../function/orderSlice';
import { useDispatch } from 'react-redux';
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"; 
import { useSelector } from 'react-redux';
export default function FinalOrder() {
    const [phone, setPhone] = useState("+380");
    const [name, setName] = useState();
    const [stret, setStret] = useState();
    const [building, setBuilding] = useState();
    const [korpus, setKorpus] = useState();
    const [pidizd, setPidizd] = useState();
    const [personCount, setPersonCount] = useState(1)
    const [whatSelect, setWhatSelect] = useState(0)
    const uiddd = uuidv4();
    const [user, setUser] = useState('');
const [comment, setComment] = useState();
const [visibleForm, setVisibleForm] = useState(false);
const orders = useSelector(state => state.orders);
const [fullPrice, setFullPrice] = useState();
const [dataFromBase, setDataFromBase] = useState(null);
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
          setName(userData.name);
          setPhone(userData.phone);
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
const dispatch = useDispatch();

const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    // Виконайте потрібні дії на основі стану чекбоксу
  };


useEffect(() => {
 

    const total = orders.products.reduce((acc, product) => {
        const productTotal = product.price * product.quantity;
        return acc + productTotal;
      }, 0);
      setFullPrice(total)
    

  }, [orders])
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('дані користувача', currentUser);
        // Користувач увійшов в систему
        setUser(currentUser);
      } else {
        // Користувач вийшов з системи
        setUser({uid: 'null'});
      }
    });
  
    return () => {
      // Відписка від слухача після розмонтовування компоненти
      unsubscribe();
    };
  },[])
const handleChange = (event) => {
    const selectedValue = event.target.value;
    
    if (selectedValue === '1') {
        setVisibleForm(true)
        setWhatSelect(1)
    }else  if (selectedValue === '0') {
        setWhatSelect(0)
    }

  };

// генерація підпису для відправки форми
  const generateSignature = () => {
    const publicKey = 'sandbox_i47427856209';
    const privateKey = 'sandbox_nLRix8HatIf5clJkORUvGIFrNFCgRbbjOZQnneIK';

    const params = {"public_key": publicKey,"version":"3","action":"pay","amount":fullPrice,"currency":"UAH","description":"test","order_id":uiddd}

    const data = Buffer.from(JSON.stringify(params)).toString('base64');
    const fi = privateKey + data + privateKey;
    const signString = privateKey + data + privateKey;
    const hash = sha1(signString);
    const signature = Buffer.from(hash, 'hex').toString('base64');

    
    return { data, signature };
  };
const payParam = async (e) => {
  e.preventDefault();
  const json = JSON.stringify(orders.products);

  if(whatSelect === 1){
    try {
        // Створюємо об'єкт документу для запису в Firestore
        const newProduct = {
          uid: uiddd,
          choice: json,
          totalPrice: fullPrice,
          phone: phone,
          name: name,
          stret:stret,
          building:building,
          korpus:korpus,
          pidizd:pidizd,
          personCount:personCount,
          comment:comment,
          isChecked:isChecked,
          paymentStatus: 'false',
          user: user.uid
          // Додайте інші поля форми за необхідності
        };
  
        // Записуємо новий продукт в Firestore
        const docRef = await addDoc(collection(db, 'orders'), newProduct);
        console.log('Документ успішно додано з ID:', docRef.id);
      } catch (error) {
        console.error('Помилка при додаванні документа:', error);
      }
    const { data, signature } = generateSignature();

    const form = document.getElementById('liqpay-form');
  
    form.elements.data.value = data;
    form.elements.signature.value = signature;
    form.submit();
  }else if(whatSelect === 0){
    try {
        // Створюємо об'єкт документу для запису в Firestore
        const newProduct = {
          uid: uiddd,
          choice: json,
          totalPrice: fullPrice,
          phone: phone,
          name: name,
          stret:stret,
          building:building,
          korpus:korpus,
          pidizd:pidizd,
          personCount:personCount,
          comment:comment,
          isChecked:isChecked,
          paymentStatus: 'false',
          user: user.uid
          // Додайте інші поля форми за необхідності
        };
  
        // Записуємо новий продукт в Firestore
        const docRef = await addDoc(collection(db, 'orders'), newProduct);
        console.log('Документ успішно додано з ID:', docRef.id);
      } catch (error) {
        console.error('Помилка при додаванні документа:', error);
      }



  }
  localStorage.removeItem('cart');
  dispatch(clearProducts());
 
}



//зміна значень телефону
    const handlePhoneChange  = (event) => {
        const newPhone = event.target.value;
    
        // Перевірка, чи починається телефонний номер на +380
        if (newPhone.startsWith("+380")  && newPhone.length <= 13) {
          setPhone(newPhone);
        }
    }
    const handleNameChange = (event) => {
        const newPhone = event.target.value;
        setName(newPhone)
    }


    return(
        <>
        <Header/>
        <div className={css.fullOrderWrap}>
<div className={css.orderWrapDetail}>
    <h2 className={css.ofOrder}>Оформлення замовлення</h2>
    <div className={css.clienNamePhoneWrap}>
    <h2 className={css.ofOrder}>Відправник</h2>
    <div className={css.wrapSmallElement}>
        <p className={css.nameOfInp}>Ім'я</p>
    <input className={css.userInfoInputPhone}   value={name}
        onChange={handleNameChange} type="text"  required/>
        </div>
        <div className={css.wrapSmallElement}>
        <p className={css.nameOfInp}>Телефон:</p>
    <input className={css.userInfoInputPhone}   value={phone}
        onChange={handlePhoneChange} type="tel" pattern="\+380[0-9]{9}" required/>
        </div>
    </div>


<div className={css.adressBlockWrap}>
<h2 className={css.ofOrder}>Адрес доставки</h2>
<div className={css.inputAdressWrap}>
<div className={css.wrapSmallElement}>
        <p className={css.nameOfInpAdr}>Вулиця:</p>
    <input className={css.userInfoInputPhoneAdr}   value={stret}
        onChange={(e) => setStret(e.target.value)} type="text"  required/>
        </div>
        <div className={css.wrapSmallElement}>
        <p className={css.nameOfInpAdr}>Будинок:</p>
    <input className={css.userInfoInputPhoneAdr}   value={building}
        onChange={(e) => setBuilding(e.target.value)} type="text" required/>
        </div>
        <div className={css.wrapSmallElement}>
        <p className={css.nameOfInpAdr}>Корпус:</p>
    <input className={css.userInfoInputPhoneAdr}   value={korpus}
        onChange={(e) => setKorpus(e.target.value)} type="text" required/>
        </div>
        <div className={css.wrapSmallElement}>
        <p className={css.nameOfInpAdr}>Під'їзд:</p>
    <input className={css.userInfoInputPhoneAdr}   value={pidizd}
        onChange={(e) => setPidizd(e.target.value)} type="text" required/>
        </div>
</div>
</div>


<div className={css.adressBlockWrap}>
<h2 className={css.ofOrder}>Додаткова інформація</h2>
<div className={css.wrapSmallElementNew}>
        <p className={css.nameOfInpAdr}>Кількість персон</p>
    <input className={css.userInfoInputPhoneCount}   value={personCount}
        onChange={(e) => setPersonCount(e.target.value)} type="text" required/>
        </div>
        <div className={css.commentWrap}>
        <p className={css.nameOfInpAdr}>Коментар:</p>
        <textarea className={css.commentStyle} onChange={(e) => setComment(e.target.value)} 
         type='text' value={comment}/>
        </div>
        <div className={css.wrapSmallElement}>
        <p className={css.nameOfInpAdr}>Столове приладдя</p>


        <label className={css.toggleButton}>
  <input type="checkbox" onChange={handleCheckboxChange}/>
  <span className={css.slider}></span>
</label>
        </div>


    
</div>
<div className={css.sectionWrap}>
    <p className={css.payP}>Метод оплати</p>
<select className={css.customSelect} onChange={handleChange}> 
                            <option className={css.customOpin}  value="0">Готівкка</option>
                            <option className={css.customOpin}  value="1">Карта онлайн</option>
                            </select>
                            </div>
                            {visibleForm &&
                              <form id="liqpay-form" onSubmit={payParam} method="POST" action="https://www.liqpay.ua/api/3/checkout" 
                              accept-charset="utf-8">
                              <input type="hidden" name="data" value=""/>
                              <input type="hidden" name="signature" value=""/>
                             
                              </form>
                            }
<button onClick={payParam} className={css.bottonFullOrder}>Замовити</button>

</div>


        </div>
        <Footer/>
        </>
    )
}