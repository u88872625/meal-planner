import React, { Component, useEffect, useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { getTypes } from "../../firebase/firestore";

const Types = ({ selectedType, setSelectedType }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const handleGetTypes = async () => {
      const types = await getTypes();
      setTypes(types);
    };
    handleGetTypes();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginHorizontal: 10,
      }}
    >
      {types.map((type) => (
        <Pressable
          onPress={() => setSelectedType(type)}
          style={{
            backgroundColor: selectedType == type ? "#e9967a" : "white",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: selectedType == type ? "white" : "black",
            }}
          >
            {type}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Types;
const styles = StyleSheet.create({});
