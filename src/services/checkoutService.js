import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export const addCheckoutSnapshot = async (data) => {
  const checkoutRef = collection(db, "orders");
  const checkoutSnapshot = await addDoc(checkoutRef, data);

  return checkoutSnapshot.id;
};
