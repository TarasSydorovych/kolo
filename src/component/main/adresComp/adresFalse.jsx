
import css from '../mainPage.module.css'
import { HiLocationMarker } from "react-icons/hi";



export default function AdresFalse() {





    return(
        <div className={css.adresTrueWrap}>
        <HiLocationMarker className={css.iconLocGr}/>

<div className={css.adrWrap}>
<p className={css.pTopAdres}>Точка самовивозу</p>
<p className={css.pDownAdres}>м. Полтава, вул. Соборності 31а</p>
</div>

    </div>
    )
}