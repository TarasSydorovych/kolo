
import css from './footer.module.css'


export function Footer() {




    return(
        <div className={css.footerWrap}>
            <ul className={css.ulFooter}>
<li className={css.liFooter}>Угода користувача</li>
<li className={css.liFooter}>Ліцензійну угода</li>
<li className={css.liFooter}>Умови акцій сервісу</li>
<li className={css.liFooter}>Політика конфіденційності</li>
<li className={css.liFooter}>Правила оплати</li>

            </ul>
        </div>
    )
}