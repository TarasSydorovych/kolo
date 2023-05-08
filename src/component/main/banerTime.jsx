import css from './mainPage.module.css'
import { BiTimeFive } from "react-icons/bi";
import { BsWallet2 } from "react-icons/bs";
import { TbTruckDelivery, TbFreeRights } from "react-icons/tb";


export default function BanerTime({dostavka, setDostavka}) {



    return(
        <section className={css.blockAdresWrap}>
<div className={css.wrapAdr}>
    <div className={css.adressBlockTimer}>
      {dostavka &&
      <>
      <div className={css.wrapTimeToOrder}>
<BiTimeFive className={css.timerIcon}/>
<div className={css.smolerWrapTime}>
    <p className={css.timerIconFirstP}>до 60 хв.</p>
    <p className={css.timerIconSecondP}>ЧАС ДОСТАВКИ</p>
</div>

      </div>



<div className={css.wrapTimeToOrder}>
<BsWallet2 className={css.timerIcon}/>
<div className={css.smolerWrapTime}>
    <p className={css.timerIconFirstP}>0 ₴</p>
    <p className={css.timerIconSecondP}>МІН. СУМ. ЗАМОВЛЕННЯ</p>
</div>

      </div>


      <div className={css.wrapTimeToOrder}>
<TbTruckDelivery className={css.timerIcon}/>
<div className={css.smolerWrapTime}>
    <p className={css.timerIconFirstP}>80 ₴</p>
    <p className={css.timerIconSecondP}>ВАРТ. ДОСТАВКИ</p>
</div>

      </div>

      <div className={css.wrapTimeToOrder}>
<TbFreeRights className={css.timerIcon}/>
<div className={css.smolerWrapTime}>
    <p className={css.timerIconFirstP}>від 800 ₴</p>
    <p className={css.timerIconSecondP}>БЕЗКОШТ. ДОСТАВКА ВІД</p>
</div>

      </div>
      </>
      }


{!dostavka &&
      <>
      <div className={css.wrapTimeToOrder}>
<BiTimeFive className={css.timerIcon}/>
<div className={css.smolerWrapTime}>
    <p className={css.timerIconFirstP}>до 15 хв.</p>
    <p className={css.timerIconSecondP}>ЧАС ДОСТАВКИ</p>
</div>

      </div>



<div className={css.wrapTimeToOrder}>
<BsWallet2 className={css.timerIcon}/>
<div className={css.smolerWrapTime}>
    <p className={css.timerIconFirstP}>0 ₴</p>
    <p className={css.timerIconSecondP}>МІН. СУМ. ЗАМОВЛЕННЯ</p>
</div>

      </div>


      
      </>
      }



    </div>
    
</div>


        </section>
    )
}