import css from './mainPage.module.css'
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import pozza from '../../img/banerNew.JPG'




export default function Baner() {




    return(
        <section className={css.banerSectionWrap}>
<div className={css.banerWrap}>
    <div className={css.baner}>
        <img src={pozza} className={css.banerImg}/>
        <div className={css.arrowLeft}>
<MdArrowBackIosNew className={css.arrowSlideLeft}/>
        </div>
        <div className={css.arrowRight}>
            <MdArrowForwardIos className={css.arrowSlideRight}/>
            </div>
            {/*
            <div className={css.pointerWrap}>
                <div className={css.point}></div>
                <div className={css.point}></div>
                <div className={css.point}></div>
                <div className={css.point}></div>
                <div className={css.point}></div>
            </div>
    */}
    </div>

</div>

        </section>
    )
}