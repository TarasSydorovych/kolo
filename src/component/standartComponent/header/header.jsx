
import css from './header.module.css'
import logoPic from '../../../img/logo.png'
import { ImLocation2 } from "react-icons/im";
import { HiUser } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import Login from '../../login/login';
import { useState, useEffect } from 'react';
import { getAuth, signInWithPhoneNumber, signOut , onAuthStateChanged } from "firebase/auth";
import { Buffer } from 'buffer';
import {auth, db} from '../../../firebase'

export default function Header() {
  const navigate = useNavigate();
const [login, setLogin] = useState(false);
const [user, setUser] = useState(null);
const [outSta, setOutSta] = useState(true);
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('дані користувача', currentUser.uid);
        // Користувач увійшов в систему
        setUser(currentUser);
      } else {
        // Користувач вийшов з системи
        setUser(null);
      }
    });
   

    return () => {
      // Відписка від слухача після розмонтовування компоненти
      unsubscribe();
    };
  },[outSta])

  const handleLogout = () => {
       
    signOut(auth)
      .then(() => {
        console.log('Користувач вийшов з системи');
        setOutSta(!outSta)
        // Додайте необхідну логіку після виходу користувача
      })
      .catch((error) => {
        console.log('Помилка під час виходу з системи:', error);
      });
  };
    
    return(
        <>
        <header className={css.headerWrap}>
              <img src={logoPic} className={css.logoStyle}/>
              <div className={css.locationWrap}>
<ImLocation2 className={css.locationIcon}/>
<h2 className={css.locationText}>
Полтава
</h2>


              </div>
              <ul className={css.navMenu}>
                <li className={css.navMenuLi}><Link to="/" className={css.navMenuLiA}> Головна</Link></li>
                <li className={css.navMenuLi}><Link className={css.navMenuLiA}> Акції</Link></li>
                <li className={css.navMenuLi}><Link to="/response" className={css.navMenuLiA}> Відгуки</Link></li>
                <li className={css.navMenuLi}><Link to="/about" className={css.navMenuLiA}> Про нас</Link></li>
              </ul>

              <div className={css.contactWrap}>
    <a className={css.phoneLink} href="tel:+380992297211">+380992297211</a>
    <div className={css.iconAuth}>
<HiUser className={css.iconUser} onClick={() => navigate('/cabinet')}/>
    </div>
    {user && 
     <p className={css.enterUs} onClick={handleLogout}>
     Вийти
 </p>
    }
     {!user && 
    <p className={css.enterUs} onClick={() => setLogin(true)}>
        Увійти
    </p>
}

</div>
        </header>
        {login &&

        <Login login={login} setLogin={setLogin}/>
    }
        </>
    )
}