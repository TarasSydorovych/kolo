
import css from './mainPage.module.css'

import { AiFillInstagram } from "react-icons/ai";
export default function PaymentInfo() {





    return(
        <div className={css.payInfoWrapALL}>
            <h2 className={css.paymentH2A}>Інформація про оплату</h2>
            <div className={css.payBlockWrap}>
                <h3 className={css.payH4}>Готівковий розрахунок</h3>
                <p className={css.payP}>Оплата здійснюється готівкою кур'єру при доставці замовлення або самовивозом з точки продажів. При оформленні замовлення вкажіть суму, з якої Вам необхідна здача.</p>
                <h3 className={css.payH4}>Картою</h3>
                <p className={css.payP}>Оплата здійснюється банківською картою кур'єру при доставці замовлення або при самовивозі з точки продажів.</p>
            </div>
            <div className={css.socialWrap}>
                <h2 className={css.weAtSocial}>Ми у соцмережах</h2>
               <a href='https://www.instagram.com/kolo_poltava/' target="_blank"><AiFillInstagram className={css.instagram}/></a> 
            </div>
        </div>
    )
}