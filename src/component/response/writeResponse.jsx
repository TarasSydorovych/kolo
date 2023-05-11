
import css from './response.module.css'




export default function WriteResponse() {






    return(
        <div className={css.writeRespWrap}>
            <input type="text" className={css.inputResp} placeholder='Відгук'/>
            <button className={css.buttonResp}>Відправити відгук</button>
        </div>
    )
}