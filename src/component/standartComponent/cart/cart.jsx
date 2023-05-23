import css from './cart.module.css'
import { AiOutlineClose } from "react-icons/ai";
import {useState, useEffect} from 'react'
import {auth, db} from '../../../firebase'
import { useDispatch } from 'react-redux';
import { addProduct, updateQuantity, removeProduct  } from '../../../function/orderSlice';
import { doc, setDoc, addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore"; 
import ProductInCard from './productInCard';
import { useNavigate } from 'react-router-dom';

export default function Cart({setPriceForCard, setCart}) {
    const [products, setProducts] = useState([]);
    const [haveProduct, setHaveProduct] = useState(false);
    const [cartProducts, setCartProducts] = useState();
    const [finishPrice, setFinishPrice] = useState(0);
    const dispatch = useDispatch();
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
      }, [haveProduct, ]);
    const cartClose= () => {
        setCart(false)
    }


  const [totalQuantity, setTotalQuantity] = useState(0);
  const handleQuantityChange = (uid, quantity) => {
    const updatedCartProducts = cartProducts.map(product => {
      if (product.uid === uid) {
        return {
          ...product,
          quantity
        }
      } else {
        return product;
      }
    });
    const productToUpdate = updatedCartProducts.find(product => product.uid === uid);
    const totalPrice = updatedCartProducts.reduce((acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0);
    setFinishPrice(totalPrice);
    setPriceForCard(totalPrice)
    setCartProducts(updatedCartProducts);
    dispatch(updateQuantity({ uid, quantity }));
  
    // Update the quantity of the product with the corresponding uid in the localStorage
    if (productToUpdate) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      const updatedCart = cart.map(product => {
        if (product.uid === uid) {
          return {
            ...product,
            quantity
          }
        } else {
          return product;
        }
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  
    // Update the total quantity of products in the cart
    const totalQuantity = updatedCartProducts.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
    setTotalQuantity(totalQuantity);
  };


  const removeProductFromCart = (uid) => {
    
    const updatedCart = cartProducts.filter(product => product.uid !== uid);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartProducts(updatedCart);
  
    // Update the total quantity of products in the cart
    const totalQuantity = updatedCart.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
    setTotalQuantity(totalQuantity);
  
    // Update the total price of products in the cart
    const totalPrice = updatedCart.reduce((acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0);
    setFinishPrice(totalPrice || 0); // if updatedCart is empty, set totalPrice to 0
    dispatch(removeProduct(uid));
   
  };
  useEffect(() => {
    if (cartProducts && cartProducts.length) {
      const totalPrice = cartProducts.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
      }, 0);
      setFinishPrice(totalPrice);
  
      // Update the total quantity of products in the cart
      const totalQuantity = cartProducts.reduce((acc, product) => {
        return acc + product.quantity;
        }, 0);
        
        }
        }, [cartProducts]);
        const navigate = useNavigate();
const relocateOrder = () => {
  navigate('/order')
}


    return(
<div className={css.cartWrap}>
    <div className={css.cardTextOutWrap}>
        <h2 className={css.cardTitle}>Кошик</h2>
            <AiOutlineClose className={css.aOutlineClose} onClick={() => setCart(false)}/>
    </div>
    {cartProducts && 
    <>
    {cartProducts.map((el, index) => {
return <ProductInCard key={el.uid} el={el} handleQuantityChange={handleQuantityChange} removeProductFromCart={removeProductFromCart}/>


          })}
          </>
}
<div className={css.finalPriceAllWrap}>
<div className={css.namePrice}>
    <p className={css.symText}>Сума замовлення:</p>
    <p className={css.payText}>До сплати:</p>
</div>
<div className={css.namePrice}>
<p className={css.symText}>{finishPrice}₴</p>
    <p className={css.payText}>{finishPrice}₴</p>
</div>
</div>
<button onClick={relocateOrder} className={css.buttonOrder}>ОФОРМИТИ ЗАМОВЛЕННЯ</button>
    

</div>
    )
}