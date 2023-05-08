import ProductSmall from '../product/productSmall'
import css from './mainPage.module.css'








export default function ProductWrap() {




    return(
        <section className={css.blockAdresWrap}>
        <div className={css.wrapAdr}>
            <div className={css.blockProductWrap}>
<ProductSmall/>




                </div>
                </div>
                </section>
    )
}