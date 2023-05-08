
import css from './header.module.css'
import logoPic from '../../../img/logo.png'
import { ImLocation2 } from "react-icons/im";
import { HiUser } from "react-icons/hi";
import { Link } from 'react-router-dom';

export default function Header() {

    
    return(
        <header className={css.headerWrap}>
              <img src={logoPic} className={css.logoStyle}/>
              <div className={css.locationWrap}>
<ImLocation2 className={css.locationIcon}/>
<h2 className={css.locationText}>
Полтава
</h2>


              </div>
              <ul className={css.navMenu}>
                <li className={css.navMenuLi}><Link className={css.navMenuLiA}> Головна</Link></li>
                <li className={css.navMenuLi}><Link className={css.navMenuLiA}> Акції</Link></li>
                <li className={css.navMenuLi}><Link className={css.navMenuLiA}> Відгуки</Link></li>
                <li className={css.navMenuLi}><Link className={css.navMenuLiA}> Про нас</Link></li>
              </ul>

              <div className={css.contactWrap}>
    <a className={css.phoneLink} href="tel:+380992297211">+380992297211</a>
    <div className={css.iconAuth}>
<HiUser className={css.iconUser}/>
    </div>
    <p className={css.enterUs}>
        Увійти
    </p>

</div>
        </header>
    )
}