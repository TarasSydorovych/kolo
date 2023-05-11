
import Header from '../standartComponent/header/header'
import Baner from './baner'
import BanerTime from './banerTime'
import { FirstBlock } from './firstBlock'
import css from './mainPage.module.css'

import { useState, useEffect } from 'react'
import ProductWrap from './productWrap'
import ProductBig from '../product/productBig'
import CategoryList from './categoryList'
import PaymentInfo from './paymentInfo'
import { Footer } from '../standartComponent/footer/footer'


export default function MainPage({setDostavka, dostavka, haveProduct, products, setCurrentProd, currentProd}) {
    
    const [bigProduct, setBigProduct] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollHeight = window.pageYOffset;
        setScrollHeight(currentScrollHeight);
        console.log(currentScrollHeight);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    return(
        <div className={css.mainPageWrap}>
            <Header/>
            <FirstBlock setDostavka={setDostavka} dostavka={dostavka}/>
            <Baner/>
            <BanerTime setDostavka={setDostavka} dostavka={dostavka}/>
            <CategoryList/>
            {haveProduct && 
            <ProductWrap setCurrentProd={setCurrentProd} products={products} setBigProduct={setBigProduct} bigProduct={bigProduct}/>
          }
            {bigProduct &&
<ProductBig currentProd={currentProd} setBigProduct={setBigProduct} scrollHeight={scrollHeight}/>
}
<PaymentInfo/>
<Footer/>
        </div>
    )
}