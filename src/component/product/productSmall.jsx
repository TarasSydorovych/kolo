import css from './product.module.css'
import p from '../../img/p.jpg'
import { AiFillHeart } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import ProductBig from './productBig';


export default function ProductSmall({bigProduct, setBigProduct, el, setCurrentProd}) {

const bigWindowOpen = () => {
    setCurrentProd(el)
    setBigProduct(true)
}


    return(
        <div className={css.productWrap}>
           <div className={css.picBlockWrap}>
            <img src={el.foto} className={css.productPic} onClick={bigWindowOpen}/>
            <div className={css.prodLike}><AiFillHeart className={css.likeStyle}/></div>
            <div className={css.prodLikeLink}><BsLink45Deg className={css.likeStyle}/></div>
           </div>

<div className={css.descriptionWrap}>
    <h1 className={css.productName} onClick={bigWindowOpen}>{el.prodName}</h1>
    <p className={css.productDescription}>{el.descProduct}</p>
    <p className={css.pWeigthProduct}>{el.weight} г.</p>
</div>

<div className={css.priceWrapCard}>
<p className={css.prodPriceFull}>{el.price} ₴</p>

<p className={css.inCart}>У КОШИК</p>
</div>



        </div>
    )
}