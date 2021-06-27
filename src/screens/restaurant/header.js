import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import Searchbar from "./searchbar";
import { useNavigation } from "@react-navigation/native";
import { LocationContext } from "../../context/locationcontext";
const Header = () => {
  const navigation = useNavigation();
  const { state: locationState } = useContext(LocationContext);
  return (
    <View style={{ flexDirection: "column", backgroundColor: "#ffffff" }}>
      <View
        style={{
          coureser: "pointer",
          flexDirection: "row",
          height: 50,
          backgroundColor: "white",
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <img
            src={require("../../assets/images/treazer logo.webp")}
            alt='Treazer'
            style={{
              marginLeft: 20,
              marginTop: 10,
              width: 120,
              height: 40,
            }}
          />
          {/* <LazyLoadImage
            src={require("../assets/images/treazer logo.webp")}
            resizemode='cover'
            effect='blur'
            alt='Treazer_logo'
            style={{
              marginLeft: 20,
              marginTop: 10,
              width: 120,
              height: 40,
            }}
          /> */}
        </View>
        <View
          style={{
            // flexDirection: "column-reverse",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 5,
            // border: "1px solid black",
            height: 55,
          }}>
          {/* <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              fontFamily: "Open Sans",
              textAlign: "center",
              // color: "#bdbdbd",
            }}>
            {locationState.landmark}
          </Text> */}
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              fontFamily: "Open Sans",
              letterSpacing: 1,
              textAlign: "center",
              marginTop: 5,
            }}>
            {locationState.landmark?.slice(0, 20)}...
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserLocation")}
          style={{
            width: 50,
            paddingRight: 20,
            justifyContent: "center",
          }}>
          <Icon
            name='map-marker-alt'
            type='font-awesome-5'
            color='#424242'
            size={24}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          background: "none",
        }}>
        {/* <Searchbar /> */}
      </View>
    </View>
  );
};

export default Header;

// const styles = StyleSheet.create({});
