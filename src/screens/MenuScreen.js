import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Types from "../components/types";
import Recipes from "../components/Recipes";
import { addMenu, getAllRecipes } from "../../firebase/firestore";
import MealInMenu from "../components/MealInMenu";

const MenuScreen = () => {
  const route = useRoute();
  const [option, setOption] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const navigation = useNavigation();

  console.log(route?.params?.items);
  useEffect(() => {
    if (route?.params?.items) {
      setMenuItems(route?.params?.items);
    }
  }, [route?.params?.items]);

  useEffect(() => {
    const handleGetRecipes = async () => {
      const recipes = await getAllRecipes();

      setRecipes(recipes);
    };
    handleGetRecipes();
  }, []);

  const addDishToMenu = async (recipe) => {
    const dish = {
      date: route?.params.date,
      items: [
        {
          name: recipe.name,
          mealType: option,
          ingredients: recipe.ingredients,
        },
      ],
    };
    await addMenu(dish);
    setMenuItems((prevItems) => [...prevItems, dish.items[0]]);
  };

  const filteredRecipes = selectedType
    ? recipes.filter((recipe) => recipe.type === selectedType)
    : recipes;

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#fd5c63",
        }}
      >
        <Pressable onPress={() => navigation.goBack()} style={{ flex: 1 }}>
          <Text style={{ color: "white" }}>Back</Text>
        </Pressable>

        <View style={{ flex: 1 }}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {route?.params.date}
          </Text>
        </View>
        <Text style={{ color: "white" }}>Delete</Text>
      </View>
      <View
        style={{
          marginVertical: 12,
          flexDirection: "row",
          alignItems: "cente",
          gap: 12,
          alignSelf: "center",
        }}
      >
        <Pressable
          onPress={() => setOption("早餐")}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: option == "早餐" ? "#fd5c63" : "white",
            borderRadius: 25,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: option == "早餐" ? "white" : "black",
            }}
          >
            早餐
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption("午餐")}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: option == "午餐" ? "#fd5c63" : "white",
            borderRadius: 25,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: option == "午餐" ? "white" : "black",
            }}
          >
            午餐
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption("晚餐")}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: option == "晚餐" ? "#fd5c63" : "white",
            borderRadius: 25,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: option == "晚餐" ? "white" : "black",
            }}
          >
            晚餐
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={[
          {
            backgroundColor: "white",
            borderRadius: 8,
            padding: 10,
            width: "100%",
            height: 80,
            marginVertical: 12,
          },
          menuItems && {
            height: "auto",
          },
          !menuItems && {
            height: 80,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            fontWeight: "600",
            color: "gray",
          }}
        >
          {menuItems ? "Meal Plan" : "there is no menu"}
        </Text>
        {menuItems && (
          <View>
            <MealInMenu mealType={"早餐"} menuItems={menuItems} />
            <MealInMenu mealType={"午餐"} menuItems={menuItems} />
            <MealInMenu mealType={"晚餐"} menuItems={menuItems} />
          </View>
        )}
      </Pressable>

      <Types selectedType={selectedType} setSelectedType={setSelectedType} />

      <View
        style={{
          marginTop: 15,
          marginHorizontal: 10,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <TextInput
          style={{
            padding: 10,
            backgroundColor: "white",
            borderRadius: 6,
            flex: 1,
          }}
          placeholder="輸入關鍵字"
        />
        <Pressable
          style={{ padding: 10, backgroundColor: "#fd5c63", borderRadius: 6 }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              textAlign: "center",
              color: "white",
              width: 60,
            }}
          >
            Add
          </Text>
        </Pressable>
      </View>
      <Recipes recipes={filteredRecipes} addDishToMenu={addDishToMenu} />
    </SafeAreaView>
  );
};

export default MenuScreen;
const styles = StyleSheet.create({});
