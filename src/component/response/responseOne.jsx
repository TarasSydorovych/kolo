
import css from './response.module.css'
import { BsCalendar3 } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";

export default function ResponseOne() {



    return(
        <div className={css.respOneWrap}>
            <div className={css.infoRespWrap}>
               <div className={css.respDate}>
                <BsCalendar3 className={css.aiFillLike}/>
<h4 className={css.data}>07/05/2023</h4>
                
               </div>
               <div className={css.respName}>
               <AiFillLike className={css.aiFillLike}/>
               <h4 className={css.data}>Taras</h4>
               </div>
            </div>
            <div className={css.theResponse}>
                <h2 className={css.finishResp}>Як завжди все супер💪💪💪</h2>
            </div>

        </div>
    )
}
