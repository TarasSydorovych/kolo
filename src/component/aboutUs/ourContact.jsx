
import css from '../main/mainPage.module.css'



export default function OurContact() {


    return(
        <div className={css.payInfoWrapALLForContact}>
       
        <div className={css.payBlockWrap}>
            <h3 className={css.payH4}>Контакти</h3>
            <p className={css.payP}>Якщо у вас виникнуть запитання чи побажання, ви можете зв'язатися з нами будь-яким зручним способом:</p>
            <p className={css.payP}><span className={css.spanPayP}>Телефон:&nbsp;</span>+380992297211</p>
            <p className={css.payP}><span className={css.spanPayP}>Email:&nbsp;</span>kolo.pl.ua@gmail.com</p>
        </div>
    </div>
    )
}