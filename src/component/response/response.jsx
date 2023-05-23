
import { FirstBlock } from '../main/firstBlock'
import { Footer } from '../standartComponent/footer/footer'
import Header from '../standartComponent/header/header'
import css from './response.module.css'
import ResponseBlock from './responseBlock'


export default function Response({priceForCard, setDostavka, dostavka}) {




    return(
        <div>
            <Header/>
            <FirstBlock priceForCard={priceForCard} dostavka={dostavka} setDostavka={setDostavka}/>
           <ResponseBlock/>
            <Footer/>

        </div>
    )
}