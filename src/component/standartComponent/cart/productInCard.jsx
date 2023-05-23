
import css from './cart.module.css'
import { useState } from 'react';
import { AiOutlineRest } from "react-icons/ai";
import { useEffect } from 'react';

export default function ProductInCard({removeProductFromCart, el, handleQuantityChange, removeProduct}) {

    const [finalPriseP, setFinalPriseP] = useState(el.price);
    const [countProd, setCountProd] = useState(el.quantity);
    const changeStateDown = () => {
        if(countProd > 1){
          const newCount = countProd - 1;
          setCountProd(newCount);
          handleQuantityChange(el.uid, newCount);
        }
      }
        
        const changeStateUp = () => {
          const newCount = countProd + 1;
          setCountProd(newCount);
          handleQuantityChange(el.uid, newCount);
        }
        useEffect(() => {
            setFinalPriseP(el.price * countProd)
        }, [countProd])


    return(
        <div className={css.prodInCardWrap}>
            <img src={el.foto} className={css.proInCardPic}/>
            <div className={css.prodCardDescWrap}>
                <h1 className={css.prodInCardName}>{el.prodName} - {el.weight}г.</h1>
                <p className={css.prodInCardDesc}>{el.prodSclad}</p>
            </div>
            <div className={css.counterWa}>
            <div className={css.countButton} onClick={changeStateDown}>-</div>
<p className={css.theSameCount}>{countProd}</p>
            <div className={css.countButton} onClick={changeStateUp}>+</div>
         </div>
         <p className={css.finalPrice}>{finalPriseP}₴</p>
         <AiOutlineRest className={css.aiOutlineRest} onClick={() => removeProductFromCart(el.uid)}/>

        </div>
    )
}