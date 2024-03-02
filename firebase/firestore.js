import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import moment from "moment";

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

// 取得所有食譜
export const getAllRecipes = async () => {
  try {
    const recipeCollectionRef = collection(db, "recipe");
    const querySnapshot = await getDocs(recipeCollectionRef);
    const recipes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return recipes;
  } catch (error) {
    console.log("Recipes讀取失敗", error);
  }
};

// 新增menu
export const addMenu = async (recipe) => {
  try {
    await addDoc(collection(db, "menus"), recipe);
    console.log("新增成功");
  } catch (error) {
    console.log("新增失敗", error);
  }
};

// 取得所有menu
export const getAllMenus = async () => {
  try {
    const menuCollectionRef = collection(db, "menus");
    const querySnapshot = await getDocs(menuCollectionRef);
    const menus = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return menus;
  } catch (error) {
    console.log("Recipes讀取失敗", error);
  }
};

// 取得一週菜單
export const fetchWeekMenus = async () => {
  function formatDateToCustomString(date) {
    return moment(date).format("ddd DD"); // 使用moment格式化日期
  }

  let weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = moment().startOf("week").add(i, "days");
    weekDates.push(formatDateToCustomString(date.toDate()));
  }

  const weekMenusPromises = weekDates.map((dateString) => {
    const q = query(collection(db, "menus"), where("date", "==", dateString));
    return getDocs(q);
  });

  try {
    const weekMenusResults = await Promise.all(weekMenusPromises);
    const weekMenus = weekMenusResults.flatMap((querySnapshot) =>
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );

    return weekMenus;
  } catch (error) {
    console.error("查詢失敗：", error);
  }
};

// 複製menu
export const copyMenu = async ({ prevDate, nextDate }) => {
  try {
    const menusCollectionRef = collection(db, "menus");
    const q = query(menusCollectionRef, where("date", "==", prevDate));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      const menuData = doc.data();
      await addDoc(menusCollectionRef, { ...menuData, date: nextDate });
    });

    console.log("Menu copied successfully");
  } catch (error) {
    console.error("Error copying menu:", error);
  }
};

// 刪除menu
export const deleteMenu = async (dateToDelete) => {
  try {
    const menusCollectionRef = collection(db, "menus");
    const q = query(menusCollectionRef, where("date", "==", dateToDelete));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    console.log("Menu delete successfully");
  } catch (error) {
    console.error("Error delete menu:", error);
  }
};
