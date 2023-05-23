



import css from './login.module.css'
import { doc, setDoc } from "firebase/firestore"; 
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { getAuth, signInWithPhoneNumber, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../../firebase'





export default function Login({setLogin, login}) {
    const [phoneNumber, setPhoneNumber] = useState('+380');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [isValidEmail, setIsValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordToShort, setPasswordToShort] = useState(true);
const [userTrue, setUserTrue] = useState(false);



    const closeWindow = () => {
        setLogin(false)
    }
 
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (value.length <= 13) {
          setPhoneNumber(value);
        }
      };
    
      const handlePhoneNumberBlur = () => {
        const phoneNumberPattern = /^\+380\d{9}$/;
    
        if (!phoneNumberPattern.test(phoneNumber)) {
          setIsValidPhoneNumber(false);
        } else {
          setIsValidPhoneNumber(true);
        }
      };
    
    const handleNameChange = (event) => {
        const newPhone = event.target.value;
        setName(newPhone)
    }
    const handlePasswordChange = (event) => {
        const passwor = event.target.value;
        if(passwor.length < 5){
            setPasswordToShort(false)
            setPassword(passwor)
        }else {
            setPasswordToShort(true)
            setPassword(passwor)
        }
        
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
      const handleEmailBlur = () => {
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        if (!emailPattern.test(email)) {
          setIsValidEmail(false);
        } else {
          setIsValidEmail(true);
        }
      };

const handleRegister = async() => {
    try{
        
        const res = await createUserWithEmailAndPassword(auth, email, password);
      
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          name: name,
          email: email,
          phone:  phoneNumber
      
         })
         alert('Ви успішно зареєстровані')
         setLogin(false)
      }catch (error) {
              alert('Користувач з цим логіном не зареєструвався', error)
          }
       
}
const handleLogin = () => {
   

   
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Вхід користувача вдалося
        const user = userCredential.user;
        alert('Ви успішно увійшли')
        setLogin(false)
        // Додайте необхідну логіку після входу користувача
      })
      .catch((error) => {
        console.log('Помилка під час входу користувача:', error);
      });
  };


    return(
        <div className={css.loginWrap}>
<div className={css.logWrap}>
<AiOutlineClose className={css.closeBigProd} onClick={closeWindow}/>



{!userTrue && 
<>
<p className={css.loginP}>Реєстрація</p>
<p className={css.loginPvh}>Якщо вже зареєстровані <span onClick={() => setUserTrue(true)} className={css.loginPvhSpan}>вхід</span></p>
<div className={css.clienNamePhoneWrap}>
   
    <div className={css.wrapSmallElement}>
        <p className={css.nameOfInp}>Ім'я</p>
    <input className={css.userInfoInputPhone}   value={name}
        onChange={handleNameChange} type="text"  required/>
        </div>
        <div className={css.wrapSmallElement}>
        <p className={css.nameOfInp}>Email</p>
    <input className={css.userInfoInputPhone}   value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur} type="text"  required/>
        </div>
        {!isValidEmail && <p>Введено неправильний email</p>}
        <div className={css.wrapSmallElement}>
        <p className={css.nameOfInp}>Телефон:</p>
    <input className={css.userInfoInputPhone}  value={phoneNumber}
        onChange={handlePhoneNumberChange}
        onBlur={handlePhoneNumberBlur} type="tel"  required/>
        </div>
        {!isValidPhoneNumber && <p>Введено неправильний номер телефону</p>}
        <div className={css.wrapSmallElement}>
        <p className={css.nameOfInp}>Пароль:</p>
    <input className={css.userInfoInputPhone}   value={password}
        onChange={handlePasswordChange} type="password"  required/>
        
        </div>
        {!passwordToShort &&
        <p>Пароль надто короткий. Має бути 5 символів</p>}

    </div>
   


<button className={css.regButoon} onClick={handleRegister}>Зареєструватися</button>
</>
}

{userTrue && 
<>
    <p className={css.loginP}>Вхід</p>
<p className={css.loginPvh}>Якщо ще не зареєстровані <span onClick={() => setUserTrue(false)}  className={css.loginPvhSpan}>Реєстрація</span></p>
<div className={css.clienNamePhoneWrap}>
   
        <div className={css.wrapSmallElement}>
        <p className={css.nameOfInp}>Email</p>
    <input className={css.userInfoInputPhone}   value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur} type="text"  required/>
        </div>
        {!isValidEmail && <p>Введено неправильний email</p>}
    
        {!isValidPhoneNumber && <p>Введено неправильний номер телефону</p>}
        <div className={css.wrapSmallElement}>
        <p className={css.nameOfInp}>Пароль:</p>
    <input className={css.userInfoInputPhone}   value={password}
        onChange={handlePasswordChange} type="password"  required/>
        
        </div>
        {!passwordToShort &&
        <p>Пароль надто короткий. Має бути 5 символів</p>}

    </div>
<button className={css.regButoon} onClick={handleLogin}>Увійти</button>
</>
}



</div>


        </div>
    )
}