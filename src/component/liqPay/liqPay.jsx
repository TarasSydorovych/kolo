import axios from 'axios';
import { useEffect } from 'react';
import sha1 from 'sha1'
import { Buffer } from 'buffer';
import base64 from 'base-64'
import utf8  from 'utf8'


export default function LiqPay() {

 
  const str_to_sign = (str) => {
    const utf8 = Buffer.from(str, 'utf8');
    const sha1 = crypto.createHash('sha1');
    sha1.update(utf8);
    return sha1.digest('base64');
  };
        const generateSignature = () => {
          const publicKey = 'sandbox_i47427856209';
          const privateKey = 'sandbox_nLRix8HatIf5clJkORUvGIFrNFCgRbbjOZQnneIK';
    
          const params = {"public_key": publicKey,"version":"3","action":"pay","amount":"3","currency":"UAH","description":"test","order_id":"000002"}
    
          const data = Buffer.from(JSON.stringify(params)).toString('base64');
          const fi = privateKey + data + privateKey;
          const signString = privateKey + data + privateKey;
          const hash = sha1(signString);
          const signature = Buffer.from(hash, 'hex').toString('base64');

          
          return { data, signature };
        };
    const payParam = (e) => {
        e.preventDefault();
        const { data, signature } = generateSignature();
      
        const form = document.getElementById('liqpay-form');

        form.elements.data.value = data;
        form.elements.signature.value = signature;
        form.submit();
       
    }
       
    

    return(
        <div style={{background: 'white'}}>
          <form id="liqpay-form" onSubmit={payParam} method="POST" action="https://www.liqpay.ua/api/3/checkout" 
accept-charset="utf-8">
<input type="hidden" name="data" value=""/>
<input type="hidden" name="signature" value=""/>
<input type="image" 
src="//static.liqpay.ua/buttons/p1ru.radius.png"/>
</form>
        </div>
    )
}