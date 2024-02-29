import React, { Component, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const MenuScreen = () => {
  const route = useRoute();
  const [option, setOption] = useState("");
  const [type, setType] = useState("");
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
        <Text style={{ flex: 1, color: "white" }}>Back</Text>
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
          there is no menu
        </Text>
      </Pressable>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginHorizontal: 10,
        }}
      >
        <Pressable
          onPress={() => setType("雞肉")}
          style={{
            backgroundColor: type == "雞肉" ? "#e9967a" : "white",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ fontSize: 15, color: type == "雞肉" ? "white" : "black" }}
          >
            雞肉
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setType("豬肉")}
          style={{
            backgroundColor: type == "豬肉" ? "#e9967a" : "white",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ fontSize: 15, color: type == "豬肉" ? "white" : "black" }}
          >
            豬肉
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setType("牛肉")}
          style={{
            backgroundColor: type == "牛肉" ? "#e9967a" : "white",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ fontSize: 15, color: type == "牛肉" ? "white" : "black" }}
          >
            牛肉
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setType("蔬菜")}
          style={{
            backgroundColor: type == "蔬菜" ? "#e9967a" : "white",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ fontSize: 15, color: type == "蔬菜" ? "white" : "black" }}
          >
            蔬菜
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setType("湯品")}
          style={{
            backgroundColor: type == "湯品" ? "#e9967a" : "white",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ fontSize: 15, color: type == "湯品" ? "white" : "black" }}
          >
            湯品
          </Text>
        </Pressable>
      </View>
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
    </SafeAreaView>
  );
};

export default MenuScreen;
const styles = StyleSheet.create({});
