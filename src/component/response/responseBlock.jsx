
import css from './response.module.css'
import ResponseOne from './responseOne'
import WriteResponse from './writeResponse'





export default function ResponseBlock() {





    return(
<div className={css.responseBlockWrap}>
<div className={css.responseBlock}>
    <WriteResponse/>
     <ResponseOne/>
     <ResponseOne/>
     <ResponseOne/>
     <ResponseOne/>

</div>

</div>
    )
}