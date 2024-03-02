import { useFocusEffect, useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
  use,
  Alert,
} from "react-native";
import {
  getAllMenus,
  fetchWeekMenus,
  copyMenu,
  deleteMenu,
} from "../../firebase/firestore";
import { BottomModal } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import { Modal } from "react-native-modals";

const HomeScreen = () => {
  const currentDate = moment();
  const startOfWeek = currentDate.clone().startOf("week");
  const endOfWeek = currentDate.clone().endOf("week");
  const [date, setDate] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [menuData, setMenuData] = useState([]);
  const [weekMenu, setWeekMenu] = useState([]);
  const [ingredientsSummary, setIngredientsSummary] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const navigation = useNavigation();

  const openMadal = (date) => {
    setDate(date.format("ddd") + " " + date.format("DD"));
    const nextDate = moment(date, "ddd DD").add(1, "day").format("ddd DD");
    setNextDate(nextDate);
    setModalVisible(!modalVisible);
  };

  // 取得所有menu
  const handleGetMenu = async () => {
    try {
      const menus = await getAllMenus();
      setMenuData(menus);
    } catch (error) {
      console.log(讀取失敗, error);
    }
  };

  // 取得一週menu
  const handleGetWeekMenus = async () => {
    const weekMenus = await fetchWeekMenus(startOfWeek, endOfWeek);
    console.log("weekMenus", weekMenus);
    setWeekMenu(weekMenus);
  };

  const copyItems = async () => {
    const formattedPrevDate = date;
    const formattedNextDate = nextDate;
    await copyMenu({
      prevDate: formattedPrevDate,
      nextDate: formattedNextDate,
    });

    setModalVisible(false);

    handleGetMenu();
    handleGetWeekMenus();
    Alert.alert("Success", "Items copie");
  };

  // 刪除menu
  const deleteItems = (date) => {
    setModal(!modal);
    setSelectedDate(date.format("ddd") + " " + date.format("DD"));
  };

  const deleteItemsByDate = async () => {
    const dateToDelete = selectedDate;
    await deleteMenu(dateToDelete);
    handleGetMenu();
    handleGetWeekMenus();
    setModal(false);
  };

  useEffect(() => {
    handleGetWeekMenus();
    handleGetMenu();
  }, []);

  useFocusEffect(
    useCallback(() => {
      handleGetWeekMenus();
      handleGetMenu();
    }, [])
  );

  // 合併相同日期的menu
  const mergedMenuData = menuData.reduce((acc, current) => {
    const found = acc.find((item) => item.date === current.date);
    if (found) {
      found.items = [...found.items, ...current.items];
    } else {
      acc.push(current);
    }
    return acc;
  }, []);

  // 計算一週食材總量
  useEffect(() => {
    let newIngredientsSummary = {};
    weekMenu.forEach((menu) => {
      menu.items.forEach((item) => {
        item.ingredients.forEach((ingredient) => {
          const { name, quantity, unit } = ingredient;
          let quantityNumber = parseFloat(quantity);

          if (!newIngredientsSummary[name]) {
            newIngredientsSummary[name] = { quantity: 0, unit: unit };
          }

          if (!isNaN(quantityNumber)) {
            newIngredientsSummary[name].quantity += quantityNumber;
          } else {
            if (
              typeof newIngredientsSummary[name].quantity === "number" &&
              newIngredientsSummary[name].quantity === 0
            ) {
              newIngredientsSummary[name].quantity = quantity;
            }
          }
        });
      });
    });
    setIngredientsSummary(newIngredientsSummary);
  }, [weekMenu]);

  const renderIngredientsSummary = () => {
    return Object.entries(ingredientsSummary).map(
      ([ingredient, info], index) => (
        <View
          key={index}
          style={{
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <Text style={{ fontSize: 16 }}>{`${ingredient}: ${info.quantity}${
            info.unit ? " " + info.unit : ""
          }`}</Text>
        </View>
      )
    );
  };

  const renderWeekDates = (startOfWeek) => {
    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.clone().add(i, "days");
      const formattedDate = date.format("ddd DD");
      const menuForDate = menuData.find((menu) => menu.date == formattedDate);
      const isCurrentDate = date.isSame(currentDate, "day");

      weekDates.push(
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            // marginTop: 2,
            maxHeight: 250,
            overflow: "hidden",
          }}
        >
          <View
            style={[
              {
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: "white",
                marginVertical: 10,
                justifyContent: "center",
                alignItems: "center",
              },
              isCurrentDate && { backgroundColor: "black" },
            ]}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: "500",
                color: isCurrentDate ? "white" : "black",
              }}
            >
              {date.format("DD")}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "500",
                color: isCurrentDate ? "white" : "black",
              }}
            >
              {date.format("ddd")}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate("Menu", {
                date: date.format("ddd") + " " + date.format("DD"),
                items: menuForDate?.items,
              });
            }}
            style={[
              {
                backgroundColor: "white",
                borderRadius: 8,
                padding: 10,
                width: "85%",
              },
              menuForDate && {
                height: "auto",
                maxHeight: 250,
              },
              !menuForDate && {
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
              {menuForDate ? "Meal Plan" : "there is no menu"}
            </Text>
            {menuForDate && (
              <View>
                {menuForDate?.items.some((item) => item.mealType == "早餐") && (
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
                    {menuForDate?.items
                      .filter((item) => item.mealType == "早餐")
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
                          <Text style={{ fontWeight: "500" }}>
                            {item?.name}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {menuForDate?.items.some((item) => item.mealType == "午餐") && (
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
                        午餐
                      </Text>
                    </View>
                    {menuForDate?.items
                      .filter((item) => item.mealType == "午餐")
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
                          <Text style={{ fontWeight: "500" }}>
                            {item?.name}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {menuForDate?.items.some((item) => item.mealType == "晚餐") && (
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
                        晚餐
                      </Text>
                    </View>
                    {menuForDate?.items
                      .filter((item) => item.mealType == "晚餐")
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
                          <Text style={{ fontWeight: "500" }}>
                            {item?.name}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            )}

            <Pressable
              onPress={() => openMadal(date)}
              style={{ position: "absolute", bottom: 5, right: 30 }}
            >
              <Text style={{ fontSize: 10, fontWeight: "500", color: "gray" }}>
                Copy
              </Text>
            </Pressable>
            <Pressable
              onPress={() => deleteItems(date)}
              style={{ position: "absolute", bottom: 5, right: 10 }}
            >
              <Text style={{ fontSize: 10, fontWeight: "500", color: "gray" }}>
                Del
              </Text>
            </Pressable>
          </Pressable>
        </View>
      );
    }
    return weekDates;
  };

  const renderWeeks = (numWeeks) => {
    let weeks = [];
    for (let i = 0; i < numWeeks; i++) {
      weeks.push(
        <View>
          <Text>
            {startOfWeek
              .clone()
              .add(i * 7, "days")
              .format("DD MMM")}
          </Text>

          <Text>{renderWeekDates(startOfWeek.clone().add(i * 7, "days"))}</Text>
        </View>
      );
    }
    return weeks;
  };

  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{ flex: 1, padding: 12 }}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", padding: 10 }}>
              本週用到的食材有：
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {renderIngredientsSummary()}
            </View>
          </View>
          {renderWeeks(3)}
        </View>
      </ScrollView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent>
          <View>
            <Text
              style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}
            >
              Copy or move
            </Text>
            <View
              style={{
                backgroundColor: "#fd5c63",
                padding: 10,
                borderRadius: 6,
                justifyContent: "center",
                alignContent: "center",
                marginTop: "12",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {date}-{nextDate}
              </Text>
            </View>
            <View
              style={{
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={copyItems}
                style={{
                  backgroundColor: "#db7093",
                  width: 100,
                  padding: 10,
                  borderRadius: 20,
                  marginVertical: 12,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Copy
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#db7093",
                  width: 100,
                  padding: 10,
                  borderRadius: 20,
                  marginVertical: 12,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Move
                </Text>
              </Pressable>
            </View>
          </View>
        </ModalContent>
      </BottomModal>

      <BottomModal
        onBackdropPress={() => setModal(!modal)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModal(!modal)}
        visible={modal}
        onTouchOutside={() => setModal(!modal)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <Text
            style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}
          >
            Delete Menu
          </Text>
          <View>
            <Pressable
              onPress={deleteItemsByDate}
              style={{
                backgroundColor: "#db7093",
                width: 140,
                padding: 10,
                borderRadius: 20,
                marginVertical: 12,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Delete Menu
              </Text>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
