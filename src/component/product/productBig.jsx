
import css from './product.module.css'
import p from '../../img/p.jpg'
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import addToCart from '../../function/addToCard';
export default function ProductBig({setBigProduct, scrollHeight, currentProd}) {
    const productBigWrapRef = useRef(null);

const [countProd, setCountProd] = useState(1);
const countMin = () => {
if(countProd > 1){
    setCountProd(prev => prev - 1)
}
}
const countPlus = () => {
    setCountProd(prev => prev + 1)
}
const closeWindow = () => {
    setBigProduct(false)
}
useEffect(() => {
    const productBigWrapElement = productBigWrapRef.current;
    if (productBigWrapElement) {
        productBigWrapElement.style.top = `${scrollHeight}px`;
    }

},[productBigWrapRef])


    return(
        <div className={css.productBigWrap} ref={productBigWrapRef}>
<div className={css.prodBigWrapProd}>
    <AiOutlineClose className={css.closeBigProd} onClick={closeWindow}/>
    <img src={currentProd.foto} className={css.pictureProductBig}/>
     <h1 className={css.nameProdutBig}>{currentProd.prodName}</h1>
     <p className={css.prodDescriptionBig}>{currentProd.descProduct}</p>
     <p className={css.pWeigthProductBig}>{currentProd.weight} г.</p>
     <div className={css.fullPriceCountWrap}>
        <div className={css.summaWrap}>
            <p className={css.sumaProdBig}>Ціна</p>
            <p className={css.sumaProdBigPrice}>{currentProd.price} ₴</p>
        </div>
        <div className={css.countWrap}>
        <p className={css.sumaProdBig}>Кількість</p>
         <div className={css.counterWa}>
            <div className={css.countButton} onClick={countMin}>-</div>
<p className={css.theSameCount}>{countProd}</p>
            <div className={css.countButton} onClick={countPlus}>+</div>
         </div>

        </div>

     </div>
<div className={css.wrapButtonOreder}>
    <button className={css.buttonOrder} onClick={() => addToCart(currentProd.uid)}>
    ДОДАТИ ТОВАР НА {currentProd.price} ₴
    </button>
</div>


</div>



        </div>
    )
}