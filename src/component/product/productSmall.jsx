import css from './product.module.css'
import p from '../../img/p.jpg'
import { AiFillHeart } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import ProductBig from './productBig';
import addToCart from '../../function/addToCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {auth, db} from '../../firebase'
import { useSelector } from 'react-redux';
import { addProduct, updateQuantity, removeProductFromCart } from '../../function/orderSlice';
import { doc, setDoc, addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore"; 

export default function ProductSmall({clickCard, serClickCard, bigProduct, setBigProduct, el, setCurrentProd}) {

const dispatch = useDispatch();

 
const [products, setProducts] = useState([]);
const [haveProduct, setHaveProduct] = useState(false);
const [cartProducts, setCartProducts] = useState();
const orders = useSelector(state => state.orders);

const bigWindowOpen = () => {
    setCurrentProd(el)
    setBigProduct(true)
}
useEffect(() => {
 
        const fetchProducts = async () => {
          const productsRef = collection(db, 'product');
          const productsSnapshot = await getDocs(productsRef);
          const productsList = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          setHaveProduct(true);
          setProducts(productsList);    
          const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
          const productsWithQuantities = cartProducts.map(product => {
            const foundProduct = productsList.find(p => p.id === product.uid);
            return {
              ...foundProduct,
              quantity: product.quantity
            }
          });
          setCartProducts(productsWithQuantities);
        
          dispatch(addProduct(productsWithQuantities));
         
        };
      
        fetchProducts();
     
}, [clickCard])
const funcAddProd = (uid) => {
    
    addToCart(uid)
    
      for(let i = 0; i < orders.products.length; i++){
        if(orders.products[i].uid === uid){
          
            let quantity = orders.products[i].quantity + 1;
            
            dispatch(updateQuantity({ uid, quantity }));
        }
      }
    
    serClickCard(!clickCard)
}


    return(
        <div className={css.productWrap}>
           <div className={css.picBlockWrap}>
            <img src={el.foto} className={css.productPic} onClick={bigWindowOpen}/>
            <div className={css.prodLike}><AiFillHeart className={css.likeStyle}/></div>
            <div className={css.prodLikeLink}><BsLink45Deg className={css.likeStyle}/></div>
           </div>

<div className={css.descriptionWrap}>
    <h1 className={css.productName} onClick={bigWindowOpen}>{el.prodName}</h1>
    <p className={css.productDescription}>{el.descProduct}</p>
    <p className={css.pWeigthProduct}>{el.weight} г.</p>
</div>

<div className={css.priceWrapCard}>
<p className={css.prodPriceFull}>{el.price} ₴</p>

<p className={css.inCart} onClick={() => funcAddProd(el.uid)}>У КОШИК</p>
</div>



        </div>
    )
}