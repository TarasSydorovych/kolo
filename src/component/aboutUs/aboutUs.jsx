import PaymentInfo from '../main/paymentInfo'
import { Footer } from '../standartComponent/footer/footer'
import Header from '../standartComponent/header/header'
import AboutCompany from './aboutCompany'
import css from './aboutUs.module.css'
import OurContact from './ourContact'
import Rekviz from './rekviz'
import WorkTime from './workTime'




export default function AboutUs({priceForCard, setDostavka, dostavka}) {




    return(
        <div>
            <Header/>
            <WorkTime priceForCard={priceForCard} dostavka={dostavka} setDostavka={setDostavka}/>
            <AboutCompany/>
            <OurContact/>
            <Rekviz/>
            <PaymentInfo/>
            <Footer/>

        </div>
    )
}