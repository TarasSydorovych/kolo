
import css from './mainPage.module.css'



export default function CategoryList() {




    return(
        <div className={css.categoryListWrap}>
         <ul className={css.ulListCategory}>
<li className={css.ulListLi}>Піца</li>
<li className={css.ulListLi}>Популярне</li>
<li className={css.ulListLi}>Гриль</li>
<li className={css.ulListLi}>Бургери</li>


         </ul>

        </div>
    )
}