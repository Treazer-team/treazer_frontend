import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useClearCache } from "react-clear-cache";
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { Dimensions, View, ActivityIndicator } from "react-native";
const { width, height } = Dimensions.get("window");
const Rootnavigation = dynamic(
  () => import("./src/navigation/rootnavigation"),
  {
    loading: () => (
      <View
        style={{
          width,
          height,
          justifyContent: "center",
          marginHorizontal: "auto",
          marginVertical: "auto",
          backgroundColor: "#ffffff",
          alignItems: "center",
        }}>
        <ActivityIndicator
          size='large'
          color='#82b1ff'
          style={{
            margin: "auto",
          }}
        />
      </View>
    ),
    ssr: false,
  }
);
// import Rootnavigation from "./src/navigation/rootnavigation";
import { UserContextProvider } from "./src/context/userContext";
import { RestaurentContextProvider } from "./src/context/restaurentContext";
import { ProductContextProvider } from "./src/context/productcontext";
import { CartContextProvider } from "./src/context/cartContext";
import { LocationContextProvider } from "./src/context/locationcontext";
import { OrderContextProvider } from "./src/context/ordercontext";
import { NotificationContextProvider } from "./src/context/notificationContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-native-paper";
import { StylesProvider } from "@material-ui/styles";
import { PostContextProvider } from "./src/context/postContext";

const Main = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user && user._id;
  useEffect(() => {
    window.navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      const beamsClient = new PusherPushNotifications.Client({
        instanceId: "36674458-c456-44a3-823b-616088fa88e1",
        serviceWorkerRegistration: serviceWorkerRegistration,
      });

      if (userId) {
        beamsClient
          .start()
          .then((deviceId) =>
            console.log(
              "Successfully registered with Beams. Device ID:",
              deviceId
            )
          )
          .then(() => beamsClient.clearDeviceInterests())
          .then(() => console.log("device interest clear"))
          .then(() => beamsClient.getDeviceInterests())
          .then((interests) => {
            console.log("Current interests:", interests);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }, []);

  return (
    <StylesProvider injectFirst>
      <Provider>
        <SafeAreaProvider>
          <PostContextProvider>
            <NotificationContextProvider>
              <OrderContextProvider>
                <LocationContextProvider>
                  <CartContextProvider>
                    <ProductContextProvider>
                      <RestaurentContextProvider>
                        <UserContextProvider>
                          <Rootnavigation />
                        </UserContextProvider>
                      </RestaurentContextProvider>
                    </ProductContextProvider>
                  </CartContextProvider>
                </LocationContextProvider>
              </OrderContextProvider>
            </NotificationContextProvider>
          </PostContextProvider>
        </SafeAreaProvider>
      </Provider>
    </StylesProvider>
  );
};

const App = () => {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {!isLatestVersion ? (
        <p>
          <a
            href='#'
            onClick={(e) => {
              e.preventDefault();
              emptyCacheStorage();
            }}>
            Update version
          </a>
        </p>
      ) : (
        <Main />
      )}
    </View>
  );
};
export default App;
