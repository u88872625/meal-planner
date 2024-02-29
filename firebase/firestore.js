import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// 取得所有分類
export const getTypes = async () => {
  try {
    const typeCollectionRef = collection(db, "type");
    const querySnapshot = await getDocs(typeCollectionRef);
    const types = querySnapshot.docs.map((doc) => doc.data().name);
    return types;
  } catch (error) {
    console.log("type讀取失敗", error);
  }
};
