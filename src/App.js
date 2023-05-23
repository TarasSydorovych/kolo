import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react'
import MainPage from './component/main/mainPage';
import AddProduct from './component/adm/addProduct';
import AboutUs from './component/aboutUs/aboutUs';
import Response from './component/response/response';
import {auth, db} from './firebase'
import { useDispatch } from 'react-redux';
import { addProduct, updateProductQuantity, removeProductFromCart } from './function/orderSlice';
import { doc, setDoc, addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore"; 
import { query, where } from "firebase/firestore";
import AddCategory from './component/adm/addCategory';
import FinalOrder from './component/finalOrder/finalOrder';
import LiqPay from './component/liqPay/liqPay';
import Cabinet from './component/cabinet/cabinet';

function App() {
  const [dostavka, setDostavka] = useState(true);
  const [clickCard, serClickCard] = useState(false)
  const [currentProd, setCurrentProd] = useState();
  const [category, setCategory] = useState('Всі товари');
  const [priceForCard, setPriceForCard] = useState(0);
  const dispatch = useDispatch();

 
  const [products, setProducts] = useState([]);
    const [haveProduct, setHaveProduct] = useState(false);
    const [cartProducts, setCartProducts] = useState();
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const productsRef = collection(db, 'product');
  //     const productsSnapshot = await getDocs(productsRef);
  //     const productsList = productsSnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }));
      
  //     setHaveProduct(true);
  //     setProducts(productsList);
  //     console.log('Список продуктів', productsList);

  //     const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
  //     const productsWithQuantities = cartProducts.map(product => {
  //       const foundProduct = productsList.find(p => p.id === product.uid);
  //       return {
  //         ...foundProduct,
  //         quantity: product.quantity
  //       }
  //     });
  //     setCartProducts(productsWithQuantities);
    
  //     dispatch(addProduct(productsWithQuantities));
  //     console.log('Товари в корзині', productsWithQuantities);
  //   };
  
  //   fetchProducts();
  // }, [haveProduct]);


  useEffect(() => {
    const fetchProducts = async () => {
      if(category === 'Всі товари'){
      const productsRef = collection(db, 'product');
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setHaveProduct(true)
      setProducts(productsList);
      console.log('Список продуктів',products);
    }else {
      let collectionRef = collection(db, 'product');
      collectionRef = query(collectionRef, where('category', "==", category));
      const snapshot = await getDocs(collectionRef);
      const products = snapshot.docs.map((doc) => doc.data());
      
      setProducts(products);
    }
  };
    fetchProducts();
  }, [category]);



  return (
    <Routes>
    <Route path='/' element={<MainPage clickCard={clickCard} serClickCard={serClickCard} priceForCard={priceForCard} setPriceForCard={setPriceForCard} setCategory={setCategory} currentProd={currentProd} setCurrentProd={setCurrentProd} products={products} haveProduct={haveProduct} dostavka={dostavka} setDostavka={setDostavka}/>}/>
    <Route path='/about' element={<AboutUs  priceForCard={priceForCard} dostavka={dostavka} setDostavka={setDostavka}/>}/>
    <Route path='/response' element={<Response priceForCard={priceForCard} dostavka={dostavka} setDostavka={setDostavka}/>}/>
    <Route path='/adm' element={<AddProduct/>}/>
    <Route path='/order' element={<FinalOrder/>}/>
    <Route path='/admC' element={<AddCategory/>}/>
    <Route path='/liq' element={<LiqPay/>}/>
    <Route path='/cabinet' element={<Cabinet/>}/>
    </Routes>
  );
}

export default App;
