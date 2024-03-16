import React from "react";
import { View, Text } from "react-native";

const MealInMenu = ({ mealType, menuItems }) => {
  return (
    <View>
      {menuItems.some((item) => item.mealType == mealType) && (
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
              早餐
            </Text>
          </View>
          {menuItems
            .filter((item) => item.mealType == mealType)
            .map((item, index) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginVertical: 4,
                }}
                key={index}
              >
                <View
                  style={{
                    backgroundColor: "#fd5c63",
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                  }}
                ></View>
                <Text style={{ fontWeight: "500" }}>{item?.name}</Text>
              </View>
            ))}
        </View>
      )}
    </View>
  );
};

export default MealInMenu;
