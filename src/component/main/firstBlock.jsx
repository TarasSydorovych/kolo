
import { useState } from 'react'
import AdresFalse from './adresComp/adresFalse';
import AdresTrue from './adresComp/adresTrue'
import css from './mainPage.module.css'
import { BsCart4 } from "react-icons/bs";
import Cart from '../standartComponent/cart/cart';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
export function FirstBlock({clickCard, priceForCard, setPriceForCard, dostavka, setDostavka}) {
    const [cart, setCart] = useState(false);
    const orders = useSelector(state => state.orders);
    
const [fullPrice, setFullPrice] = useState(0)
   
  useEffect(() => {
    

    const total = orders.products.reduce((acc, product) => {
        const productTotal = product.price * product.quantity;
        return acc + productTotal;
      }, 0);
      setFullPrice(total)
    

  }, [orders, clickCard])


    return(
        <section className={css.blockAdresWrap}>
<div className={css.wrapAdr}>
    <div className={css.adressBlock}>
        {dostavka &&
        <AdresTrue/>
        }
         {!dostavka &&
        <AdresFalse/>
        }
        {fullPrice === 0 &&
        <div className={css.cardWrap}>

<BsCart4 className={css.card} onClick={() => setCart(!cart)}/>

{cart && 
<Cart setPriceForCard={setPriceForCard} setCart={setCart}/>
}
</div>
}
{fullPrice > 0 &&
        <div className={css.cardWrapWhisPrice} setCart={setCart}>

<BsCart4 className={css.cardWhisPrice} onClick={() => setCart(!cart)}/>

<p className={css.iconCardWrapPriceP}>{fullPrice}</p>

{cart && 
<Cart setPriceForCard={setPriceForCard} setCart={setCart}/>
}
</div>
}




<div className={css.buttonWrap}>
        <button onClick={() => setDostavka(true)} className={dostavka ? css.buttonDostavkaOn : css.buttonDostavkaOf}>Доставка</button>
        <button onClick={() => setDostavka(false)} className={!dostavka ? css.buttonSamovuvizOn : css.buttonSamovuvizOf}>Самовивіз</button>
    </div>
    </div>
    
</div>


        </section>

    )
}