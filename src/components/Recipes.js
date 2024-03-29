import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";

const Recipes = ({ recipes, addDishToMenu }) => {
  const navigation = useNavigation();
  return (
    <ScrollView style={{ marginHorizontal: 16, marginVertical: 12 }}>
      <Text>Recipe</Text>
      {recipes.map((recipe) => (
        <Pressable
          onPress={() => navigation.navigate("RecipeDetail", recipe)}
          key={recipe.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            backgroundColor: "white",
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "black",
            }}
          >
            {recipe.name}
          </Text>
          <Pressable
            onPress={() => addDishToMenu(recipe)}
            style={{
              padding: 10,
              backgroundColor: "#fd5c63",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                textAlign: "center",
                color: "white",
              }}
            >
              Add
            </Text>
          </Pressable>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Recipes;
