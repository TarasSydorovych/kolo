import { useState } from 'react'
import ProductSmall from '../product/productSmall'
import css from './mainPage.module.css'








export default function ProductWrap({clickCard, serClickCard, bigProduct, setBigProduct, products, setCurrentProd}) {


    



    return(
        <section className={css.blockAdresWrap}>
        <div className={css.wrapAdr}>
            <div className={css.blockProductWrap}>
                {products.map((el,index) => {

return <ProductSmall clickCard={clickCard} serClickCard={serClickCard} setCurrentProd={setCurrentProd} key={index} el={el} setBigProduct={setBigProduct} bigProduct={bigProduct}/>
                })}





                </div>
                </div>
                </section>
    )
}