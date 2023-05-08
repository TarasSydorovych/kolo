import { db } from './firebase';

export const fetchProducts = async () => {
  const collectionRef = collection(db, 'product');
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addProductToCollection = async (product) => {
  const collectionRef = collection(db, 'product');
  await addDoc(collectionRef, product);
};