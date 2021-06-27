import React, { useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/userContext";
import { NotificationContext } from "../../context/notificationContext";
import { PostContext } from "../../context/postContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Axios from "axios";
import BASE_URL from "../../api";

const { height } = Dimensions.get("window");

const Notification = () => {
  const navigation = useNavigation();
  const { state: userState } = useContext(AuthContext);
  const { state: notiState, dispatch: notiDispatch } = useContext(
    NotificationContext
  );
  const { dispatch: postDispatch } = useContext(PostContext)

  const user = JSON.parse(localStorage.getItem("user"));
  const resturantId = user && user.resturantId?._id;

  const token = localStorage.getItem("token");
  const refreshtoken = localStorage.getItem("refresh-token");

  const deleteNotification = (notiId, resNotiId, notiUserId) => {
    console.log(notiId, resNotiId, notiUserId);
    let reqBody = {};
    if (
      resNotiId !== undefined
    ) {
      reqBody = { notiId, resturantId: resNotiId };
    } else if (
      notiUserId !== undefined
    ) {
      reqBody = { notiId, userId: notiUserId };
    }
    Axios.post(`${BASE_URL}/api/notification/deleteNotification`, reqBody, {
      headers: {
        "x-token": token,
        "x-refresh-token": refreshtoken,
      },
    })
      .then((res) => {
        console.log(res.data.msg, notiId);
        if (
          resNotiId !== undefined &&
          resturantId.toString() === resNotiId.toString()
        ) {
          notiDispatch({
            type: "DELETE_RESTAURANT_NOTIFICATION",
            payload: notiId,
          });
        } else if (
          notiUserId !== undefined &&
          notiUserId.toString() === user._id.toString()
        ) {
          notiDispatch({
            type: "DELETE_USER_NOTIFICATION",
            payload: notiId,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const allNotifications = () => {
    if (
      notiState &&
      notiState.userNotifications &&
      notiState.userNotifications.length > 0 &&
      notiState.restaurantNotifications &&
      notiState.restaurantNotifications.length > 0
    ) {
      return (
        <View
          style={{
            width: "100%",
            height: height * 0.95,
          }}>
          <ScrollView contentContainerStyle={{ padding: 10, width: "100%" }}>
            {notiState &&
              notiState.userNotifications !== undefined &&
              notiState.userNotifications.map((noti, idx) => (
                <View
                  key={idx}
                  style={{
                    backGroundColor: "#ffffff",
                    width: "100%",
                    height: 100,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <TouchableOpacity

                    style={{
                      width: "100%",
                      height: 80,
                      borderRadius: 10,
                      backgroundColor: "#eeeeee",
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                      marginHorizontal: "auto",
                      boxShadow: "0 1px 2px 0 #bdbdbd, 0 2px 4px 0 #bdbdbd",
                    }}>
                    <Text
                      style={{
                        color: "#616161",
                        fontSize: 15,
                        fontWeight: "700",
                        fontFamily: "Open Sans",
                        letterSpacing: 1,
                      }}>
                      {noti.body}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        deleteNotification(
                          noti._id,
                          noti.resturantId,
                          noti.userId
                        )
                      }>
                      <Icon
                        name='times'
                        type='font-awesome'
                        color='#e91e63'
                        size={24}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              ))}
            {notiState &&
              notiState.restaurantNotifications !== undefined &&
              notiState.restaurantNotifications.map((noti, idx) => (
                <View
                  key={idx}
                  style={{
                    backGroundColor: "#ffffff",
                    width: "100%",
                    height: 100,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <View
                    style={{
                      width: "100%",
                      height: 80,
                      borderRadius: 10,
                      backgroundColor: "#cfd8dc",
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                      marginHorizontal: "auto",
                      boxShadow: "0 1px 2px 0 #bdbdbd, 0 2px 4px 0 #bdbdbd",
                    }}>
                    <Text
                      style={{
                        color: "#616161",
                        fontSize: 15,
                        fontWeight: "700",
                        fontFamily: "Open Sans",
                        letterSpacing: 1,
                      }}>
                      {noti.body}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        deleteNotification(
                          noti._id,
                          noti.resturantId,
                          noti.userId
                        )
                      }>
                      <Icon
                        name='times'
                        type='font-awesome'
                        color='#e91e63'
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      );
    } else if (
      notiState &&
      notiState.userNotifications &&
      notiState.userNotifications.length > 0
    ) {
      return (
        <View
          style={{
            width: "100%",
            height: height * 0.95,
          }}>
          <ScrollView contentContainerStyle={{ padding: 10 }}>
            {notiState.userNotifications.map((noti, idx) => (
              <View
                key={idx}
                style={{
                  backGroundColor: "#ffffff",
                  width: "100%",
                  height: 100,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (noti.postId !== undefined) {
                      postDispatch({
                        type: "GET_SINGLE_POST",
                        payload: noti.postId
                      })
                      navigation.navigate("Social", {
                        screen: "PostDetails",
                        params: { postId: noti.postId }
                      })
                    }
                  }
                  }
                  style={{
                    width: "100%",
                    height: 80,
                    borderRadius: 10,
                    backgroundColor: "#eeeeee",
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginHorizontal: "auto",
                    boxShadow: "0 1px 2px 0 #bdbdbd, 0 2px 4px 0 #bdbdbd",
                  }}>
                  <Text
                    style={{
                      color: "#616161",
                      fontSize: 15,
                      fontWeight: "700",
                      fontFamily: "Open Sans",
                      letterSpacing: 2,
                    }}>
                    {noti.body}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      deleteNotification(
                        noti._id,
                        noti.resturantId,
                        noti.userId
                      )
                    }>
                    <Icon
                      name='times'
                      type='font-awesome'
                      color='#e91e63'
                      size={24}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      );
    } else if (
      notiState &&
      notiState.restaurantNotifications &&
      notiState.restaurantNotifications.length > 0
    ) {
      return (
        <View
          style={{
            width: "100%",
            height: height * 0.95,
          }}>
          <ScrollView contentContainerStyle={{ padding: 10 }}>
            {notiState.restaurantNotifications.map((noti, idx) => (
              <View
                key={idx}
                style={{
                  backGroundColor: "#ffffff",
                  width: "100%",
                  height: 100,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <View
                  style={{
                    width: "100%",
                    height: 80,
                    borderRadius: 10,
                    backgroundColor: "#cfd8dc",
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginHorizontal: "auto",
                    boxShadow: "0 1px 2px 0 #bdbdbd, 0 2px 4px 0 #bdbdbd",
                  }}>
                  <Text
                    style={{
                      color: "#616161",
                      fontSize: 15,
                      fontWeight: "700",
                      fontFamily: "Open Sans",
                      letterSpacing: 2,
                    }}>
                    {noti.body}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      deleteNotification(
                        noti._id,
                        noti.resturantId,
                        noti.userId
                      )
                    }>
                    <Icon
                      name='times'
                      type='font-awesome'
                      color='#e91e63'
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", width: "100%" }}>
      {allNotifications()}
      {notiState.userNotifications === null && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}>
          <LazyLoadImage
            style={{
              marginBottom: 10,
              width: 220,
              height: 200,
              resizeMode: "cover",
              borderRadius: 25,
            }}
            src={require("../../assets/images/notification.webp")}
            effect='blur'
          />
          <Text
            style={{
              marginTop: 20,
              marginBottom: 10,
              fontSize: 15,
              letterSpacing: 1,
              fontWeight: "600",
              fontFamily: "Open Sans",
              textAlign: "center",
            }}>
            OOPS!! YOU HAVE NO NOTIFICATIONS
          </Text>
          {!userState.isLogin && (
            <Button
              onPress={() => navigation.navigate("User", { screen: "Login" })}
              title='LOGIN FIRST'
              type='outline'
              buttonStyle={{
                backgroundColor: "#ffffff",
                borderRadius: 10,
              }}
              containerStyle={{
                marginVertical: 10,
                width: "70%",
                marginHorizontal: "auto",
                borderRadius: 10,
                border: "none",
                boxShadow: "3px 4px 6px #C9CCD1, -3px -4px 6px #ffffff",
              }}
              titleStyle={{
                fontSize: 13,
                textShadow: "1px 0 #ffffff",
                fontWeight: "600",
                letterSpacing: 3,
                fontFamily: "Roboto Slab",
              }}
            />
          )}
        </View>
      )}
      {notiState.userNotifications && notiState.userNotifications.length === 0 && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}>
          <LazyLoadImage
            style={{
              marginBottom: 10,
              width: 220,
              height: 200,
              resizeMode: "cover",
              borderRadius: 25,
            }}
            src={require("../../assets/images/notification.webp")}
            effect='blur'
          />
          <Text
            style={{
              marginTop: 20,
              marginBottom: 10,
              fontSize: 15,
              letterSpacing: 1,
              fontWeight: "600",
              fontFamily: "Open Sans",
              textAlign: "center",
            }}>
            OOPS!! YOU HAVE NO NOTIFICATIONS
          </Text>
          {!userState.isLogin && (
            <Button
              onPress={() => navigation.navigate("User", { screen: "Login" })}
              title='LOGIN FIRST'
              type='outline'
              buttonStyle={{
                backgroundColor: "#ffffff",
                borderRadius: 10,
              }}
              containerStyle={{
                marginVertical: 10,
                width: "70%",
                marginHorizontal: "auto",
                borderRadius: 10,
                border: "none",
                boxShadow: "3px 4px 6px #C9CCD1, -3px -4px 6px #ffffff",
              }}
              titleStyle={{
                fontSize: 13,
                textShadow: "1px 0 #ffffff",
                fontWeight: "600",
                letterSpacing: 3,
                fontFamily: "Roboto Slab",
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
