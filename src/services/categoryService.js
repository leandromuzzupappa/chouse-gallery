import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const getCategoriesSnapshot = async () => {
  const categoriesRef = collection(db, "categories");
  const categoriesSnapshot = await getDocs(categoriesRef);

  return categoriesSnapshot;
};

export const getCategories = async () => {
  const snapshot = await getCategoriesSnapshot();
  const categoriesData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return categoriesData;
};

export const getCategoryById = async (id) => {
  const snapshot = await getCategoriesSnapshot();
  const category = snapshot.docs.find((doc) => doc.id === id);

  return category.data();
};

export const getCategoryBySlug = async (slug) => {
  const snapshot = await getCategoriesSnapshot();
  const categoriesData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return categoriesData.find((category) => category.slug === slug);
};
