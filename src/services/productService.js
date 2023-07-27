import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const getProductsSnapshot = async () => {
  const productsRef = collection(db, "products");
  const productsSnapshot = await getDocs(productsRef);

  return productsSnapshot;
};

export const getProducts = async () => {
  const snapshot = await getProductsSnapshot();
  const productsData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return productsData;
};

export const getProductById = async (id) => {
  const products = await getProducts();
  const product = products.find((product) => product.id === id);

  return product;
};

export const getProductsByCategorySlug = async (slug) => {
  const snapshot = await getProductsSnapshot();
  const productsData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return productsData.filter((product) => product.category === slug);
};

export const addProduct = async (product) => {
  const productsRef = collection(db, "products");
  await productsRef.add(product);
};

/* export const addBulkProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    productData.forEach(async (product) => {
      await addDoc(productsRef, product);
    });
  } catch (error) {
    console.error("Error adding product: ", error);
  }
}; */
