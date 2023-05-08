import css from '../mainPage.module.css'
import { HiLocationMarker } from "react-icons/hi";

export default function AdresTrue() {





    return(
        <div className={css.adresTrueWrap}>
            <HiLocationMarker className={css.iconLocGr}/>

<div className={css.adrWrap}>
    <p className={css.pTopAdres}>Район доставки</p>
    <p className={css.pDownAdres}>В межах міста</p>
</div>

        </div>
    )
}