import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react'
import MainPage from './component/main/mainPage';
import AddProduct from './component/adm/addProduct';
import AboutUs from './component/aboutUs/aboutUs';
import Response from './component/response/response';
import {auth, db} from './firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore"; 

function App() {
  const [dostavka, setDostavka] = useState(true);
  const [products, setProducts] = useState([]);
  const [haveProduct, setHaveProduct] = useState(false)
  const [currentProd, setCurrentProd] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'product');
      const productsSnapshot = await getDocs(productsRef);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setHaveProduct(true)
      setProducts(productsList);
      console.log('Список продуктів',products);
    };
    fetchProducts();
  }, []);



  return (
    <Routes>
    <Route path='/' element={<MainPage currentProd={currentProd} setCurrentProd={setCurrentProd} products={products} haveProduct={haveProduct} dostavka={dostavka} setDostavka={setDostavka}/>}/>
    <Route path='/about' element={<AboutUs dostavka={dostavka} setDostavka={setDostavka}/>}/>
    <Route path='/response' element={<Response dostavka={dostavka} setDostavka={setDostavka}/>}/>
    <Route path='/adm' element={<AddProduct/>}/>
   
    </Routes>
  );
}

export default App;
