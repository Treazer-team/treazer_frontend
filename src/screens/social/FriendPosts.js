import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Snackbar, Portal, Dialog } from "react-native-paper";
import { PostContext } from "../../context/postContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PostActions from "./PostActions";
// const { width, height } = Dimensions.get("window");
const FriendPosts = ({ route }) => {
  // console.log(route);
  const { state: postState } = useContext(PostContext);

  const [isLogin, setisLogin] = useState(false);
  const onDismissSnackBar = () => setisLogin(false);

  return (
    <View>
      {postState?.friendPosts?.map((post, idx) => (
        <View style={styles.container} key={idx}>
          <LazyLoadImage
            src={post.photo}
            resizemode='cover'
            effect='blur'
            placeholderSrc={require("../../assets/images/lazyimage.webp")}
            style={{
              marginLeft: "auto",
              width: "100%",
              flex: 1,
              borderRadius: 20,
            }}
          />

          <View
            style={{
              position: "absolute",
              backgroundColor: "#ffffff",
              bottom: 0,
              width: "100%",
              height: 50,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <PostActions post={post} route={route} setisLogin={setisLogin} />
          </View>
        </View>
      ))}
      <Portal>
        <Dialog
          visible={isLogin}
          onDismiss={onDismissSnackBar}
          style={{ justifyContent: "center" }}>
          <Snackbar
            visible={isLogin}
            onDismiss={onDismissSnackBar}
            style={{
              bottom: 50,
              backgroundColor: "#ff5252",
            }}
            duration={3000}>
            <Text
              style={{
                textAlign: "center",
                width: "100%",
                fontFamily: "Open Sans",
                fontWeight: "700",
                fontSize: 15,
              }}>
              You are not logged in
            </Text>
          </Snackbar>
        </Dialog>
      </Portal>
    </View>
  );
};

export default FriendPosts;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    flex: 1,
    marginHorizontal: "auto",
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    boxShadow: "0px 2px 4px 0px #bdbdbd",
  },
});
