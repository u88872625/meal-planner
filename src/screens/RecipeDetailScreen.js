import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const RecipeDetailScreen = (props) => {
  const navigation = useNavigation();
  let { image, name, step } = props.route.params;
  //   console.log(items);
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 400,
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        ></Image>
      </View>
      <View
        style={{
          position: "absolute",
          paddingTop: 50,
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            padding: 8,
            backgroundColor: "white",
            marginLeft: 10,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#fd5c63", fontSize: 16, fontWeight: "600" }}>
            Back
          </Text>
        </Pressable>
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>{name}</Text>
        {step.map((item, index) => (
          <Text key={index} style={{ marginTop: 10 }}>
            {item}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default RecipeDetailScreen;
