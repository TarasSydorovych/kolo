
import { useState } from 'react'
import AdresFalse from './adresComp/adresFalse';
import AdresTrue from './adresComp/adresTrue'
import css from './mainPage.module.css'
import { BsCart4 } from "react-icons/bs";

export function FirstBlock({dostavka, setDostavka}) {

   


    return(
        <section className={css.blockAdresWrap}>
<div className={css.wrapAdr}>
    <div className={css.adressBlock}>
        {dostavka &&
        <AdresTrue/>
        }
         {!dostavka &&
        <AdresFalse/>
        }
        <div className={css.cardWrap}>
<BsCart4 className={css.card}/>
</div>

<div className={css.buttonWrap}>
        <button onClick={() => setDostavka(true)} className={dostavka ? css.buttonDostavkaOn : css.buttonDostavkaOf}>Доставка</button>
        <button onClick={() => setDostavka(false)} className={!dostavka ? css.buttonSamovuvizOn : css.buttonSamovuvizOf}>Самовивіз</button>
    </div>
    </div>
    
</div>


        </section>

    )
}