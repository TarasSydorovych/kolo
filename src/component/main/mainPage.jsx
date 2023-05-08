
import Header from '../standartComponent/header/header'
import Baner from './baner'
import BanerTime from './banerTime'
import { FirstBlock } from './firstBlock'
import css from './mainPage.module.css'

import { useState } from 'react'
import ProductWrap from './productWrap'


export default function MainPage() {
    const [dostavka, setDostavka] = useState(true);

    return(
        <div className={css.mainPageWrap}>
            <Header/>
            <FirstBlock setDostavka={setDostavka} dostavka={dostavka}/>
            <Baner/>
            <BanerTime setDostavka={setDostavka} dostavka={dostavka}/>
            <ProductWrap/>

        </div>
    )
}