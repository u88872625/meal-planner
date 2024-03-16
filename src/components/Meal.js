import React from "react";
import { View, Text } from "react-native";

const Meal = ({ mealType, menuForDate }) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "#fd5c63",
          paddingHorizontal: 7,
          paddingVertical: 4,
          borderRadius: 20,
          marginTop: 5,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: 13,
            textAlign: "center",
            color: "white",
          }}
        >
          {mealType}
        </Text>
      </View>

      {menuForDate.map((menu, menuIndex) =>
        menu.items
          .filter((item) => item.mealType == mealType)
          .map((item, index) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
              key={index}
            >
              <View
                style={{
                  backgroundColor: "#fd5c63",
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginRight: 10,
                }}
              ></View>
              <Text style={{ fontWeight: "500" }}>{item.name}</Text>
            </View>
          ))
      )}
    </View>
  );
};

export default Meal;
