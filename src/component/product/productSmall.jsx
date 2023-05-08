import css from './product.module.css'
import p from '../../img/p.jpg'
import { AiFillHeart } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";


export default function ProductSmall() {




    return(
        <div className={css.productWrap}>
           <div className={css.picBlockWrap}>
            <img src={p} className={css.productPic}/>
            <div className={css.prodLike}><AiFillHeart className={css.likeStyle}/></div>
            <div className={css.prodLikeLink}><BsLink45Deg className={css.likeStyle}/></div>
           </div>

<div className={css.descriptionWrap}>
    <h1 className={css.productName}>Піца з прошуто та руколою</h1>
    <p className={css.productDescription}>Тісто для піци готуємо на основі борошна Stagioni ( з твердих сортів пшениці), яке дозріває 48 годин та легко засвоюється</p>
    <p className={css.pWeigthProduct}>460 г.</p>
</div>

<div className={css.priceWrapCard}>
<p className={css.prodPriceFull}>328 $</p>

<p className={css.inCart}>У КОШИК</p>
</div>



        </div>
    )
}