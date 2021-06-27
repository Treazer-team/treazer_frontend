import React, { useContext, useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import dynamic from "next/dynamic";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from "react-native"
const { width, height } = Dimensions.get("window")
import { Badge } from "react-native-elements"
import {
  createBottomTabNavigator,
  BottomTabBar
} from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { AuthContext } from "../context/userContext"
import { CartContext } from "../context/cartContext"
import { Path } from "react-native-svg"
import Svg from "react-native-svg"
import { getCartItems } from "../functions/cartfunction"
const Loading = () => (
  <View
    style={{
      width,
      height,
      justifyContent: "center",
      marginHorizontal: "auto",
      marginVertical: "auto",
      backgroundColor: "#ffffff",
      alignItems: "center"
    }}>
    <ActivityIndicator
      size='large'
      color='#82b1ff'
      style={{
        margin: "auto"
      }}
    />
  </View>
)
const Tab = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const CartStack = createStackNavigator()
const FoodFormStack = createStackNavigator()
const SocialStack = createStackNavigator()
//====================================================================================
// PROFILE
//=====================================================================================
const PROFILE_SCREEN = {
  About: dynamic(() => import("../screens/proile/about"), {
    loading: () => Loading(),
    ssr: false
  }),
  Privecypolicy: dynamic(() => import("../screens/proile/privecypolicy"), {
    loading: () => Loading(),
    ssr: false
  }),
  Refundpolicy: dynamic(() => import("../screens/proile/refundpolicy"), {
    loading: () => Loading(),
    ssr: false
  }),
  ProfileBio: dynamic(() => import("../screens/proile/ProfileBio"), {
    loading: () => Loading(),
    ssr: false
  }),
  Profile: dynamic(() => import("../screens/proile/profile"), {
    loading: () => Loading(),
    ssr: false
  }),
  MyRestaurent: dynamic(() => import("../screens/proile/myrestaurent"), {
    loading: () => Loading(),
    ssr: false
  }),
  Myrestaurentfoodlist: dynamic(() => import("../screens/proile/myrestaurentfoodlist"), {
    loading: () => Loading(),
    ssr: false
  }),
  Orderist: dynamic(() => import("../screens/proile/orderist"), {
    loading: () => Loading(),
    ssr: false
  }),
  Mybill: dynamic(() => import("../screens/proile/mybill"), {
    loading: () => Loading(),
    ssr: false
  }),
  Businessform: dynamic(() => import("../screens/proile/businessform"), {
    loading: () => Loading(),
    ssr: false
  }),
}
const ProfileStackScreen = () => {
  const { state } = useContext(AuthContext)
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      {!state.isLogin ? (
        <ProfileStack.Screen
          name='Login'
          component={PROFILE_SCREEN.Profile}
        />
      ) : (
        <>
          <ProfileStack.Screen name='Profile' component={PROFILE_SCREEN.ProfileBio} />
          <ProfileStack.Screen name='BusinessForm' component={PROFILE_SCREEN.Businessform} />
          <ProfileStack.Screen name='MyRestaurent' component={PROFILE_SCREEN.MyRestaurent} />
          <ProfileStack.Screen name='MyMenu' component={PROFILE_SCREEN.Myrestaurentfoodlist} />
          <ProfileStack.Screen name='MyOrder' component={PROFILE_SCREEN.Orderist} />
        </>
      )}
      <ProfileStack.Screen name='About' component={PROFILE_SCREEN.About} />
      <ProfileStack.Screen name='PrivecyPolicy' component={PROFILE_SCREEN.Privecypolicy} />
      <ProfileStack.Screen name='RefundPolicy' component={PROFILE_SCREEN.Refundpolicy} />
      <ProfileStack.Screen name='MyBill' component={PROFILE_SCREEN.Mybill} />
    </ProfileStack.Navigator>
  )
}
//=====================================================================================
//CART
//=====================================================================================
const CART_SCREEN = {
  cart: dynamic(() => import("../screens/cart/cart"), {
    loading: () => Loading(),
    ssr: false
  }),
  Emptycartscreen: dynamic(() => import("../screens/cart/emptycartscreen"), {
    loading: () => Loading(),
    ssr: false
  }),
}
const CartStackScreen = () => {
  const { state, dispatch } = useContext(CartContext)
  const user = JSON.parse(localStorage.getItem("user"))
  const id = user && user._id
  const [cartReq, setCartReq] = useState(true)
  useEffect(() => {
    if (!user || state.cartItems === null) {
      getCartItems(id, dispatch, setCartReq)
    }
  }, [])
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    // initialRouteName={"CartItem"}
    >
      {state &&
        state.cartItems !== null &&
        state.cartItems.cartItem.length !== 0 &&
        state.cartItems.userId.toString() === id.toString() ? (
        <CartStack.Screen
          name='CartItem'
          component={props => (
            <View
              style={{
                height,
                backgroundColor: "#ffffff",
                justifyContent: "center",
                alignItems: "center"
              }}>
              {cartReq ? (
                <CART_SCREEN.Cart {...props} />
              ) : (
                <ActivityIndicator
                  size='large'
                  color='#82b1ff'
                  style={{
                    margin: "auto"
                  }}
                />
              )}
            </View>
          )}
        />
      ) : (
        <CartStack.Screen
          name='EmptyCart'
          component={CART_SCREEN.Emptycartscreen}
        />
      )}
    </CartStack.Navigator>
  )
}
//==================================================================================
// SOCIAL
//==================================================================================
const SOCIAL_SCREEN = {
  SocialHome: dynamic(() => import("../screens/social/SocialHome"), {
    loading: () => Loading(),
    ssr: false
  }),
  PostDetails: dynamic(() => import("../screens/social/PostDetails"), {
    loading: () => Loading(),
    ssr: false
  }),
  UserProfile: dynamic(() => import("../screens/social/UserProfile"), {
    loading: () => Loading(),
    ssr: false
  }),
  Notification: dynamic(() => import("../screens/notification/notification"), {
    loading: () => Loading(),
    ssr: false
  }),
}
const SocialStackScreen = () => {
  return (
    <SocialStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"SocialHome"}
    >
      <SocialStack.Screen name='SocialHome' component={SOCIAL_SCREEN.SocialHome} />
      <SocialStack.Screen name='Notification' component={SOCIAL_SCREEN.Notification} />
      <SocialStack.Screen name='PostDetails' component={SOCIAL_SCREEN.PostDetails} />
      <SocialStack.Screen name='FriendProfile' component={SOCIAL_SCREEN.UserProfile} />
    </SocialStack.Navigator>
  )
}
//==================================================================================
//RESTAURANT
//==================================================================================
const RESTAURANT_SCREEN = {
  Home: dynamic(() => import("../screens/restaurant/Home"), {
    loading: () => Loading(),
    ssr: false
  }),
  Foodlist: dynamic(() => import("../screens/restaurant/foodlist"), {
    loading: () => Loading(),
    ssr: false
  }),
  SingleRestaurent: dynamic(() => import("../screens/restaurant/singleRestaurent"), {
    loading: () => Loading(),
    ssr: false
  }),
  FilterProduct: dynamic(() => import("../screens/restaurant/filterProduct"), {
    loading: () => Loading(),
    ssr: false
  }),
  OrderDelivery: dynamic(() => import("../screens/restaurant/OrderDelivery"), {
    loading: () => Loading(),
    ssr: false
  }),
  MapPage: dynamic(() => import("../screens/restaurant/map"), {
    loading: () => Loading(),
    ssr: false
  }),
}
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={"Index"}>
      <HomeStack.Screen name='Index' component={RESTAURANT_SCREEN.Home} />
      <HomeStack.Screen name='Filter_product' component={RESTAURANT_SCREEN.FilterProduct} />
      <HomeStack.Screen name='Menu' component={RESTAURANT_SCREEN.Foodlist} />
      <HomeStack.Screen name='Restaurant' component={RESTAURANT_SCREEN.SingleRestaurent} />
      <HomeStack.Screen name='Location' component={RESTAURANT_SCREEN.OrderDelivery} />
      <HomeStack.Screen name='UserLocation' component={RESTAURANT_SCREEN.MapPage} />
    </HomeStack.Navigator>
  )
}
//==================================================================================
//FOODADD
//==================================================================================
const FOODADD_SCREEN = {
  Additems: dynamic(() => import("../screens/add/Additems"), {
    loading: () => Loading(),
    ssr: false
  }),
  Emptyfoodaddscreen: dynamic(() => import("../screens/add/emptyfoodaddscreen"), {
    loading: () => Loading(),
    ssr: false
  }),
  AddPost: dynamic(() => import("../screens/add/AddPost"), {
    loading: () => Loading(),
    ssr: false
  }),
  SelectChoice: dynamic(() => import("../screens/add/SelectChoice"), {
    loading: () => Loading(),
    ssr: false
  }),
}
const FoodFormStackScreen = () => {
  const { state } = useContext(AuthContext)
  return (
    <FoodFormStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      {!state.isLogin ? (
        <FoodFormStack.Screen
          name='Emptyfoodaddscreen'
          component={FOODADD_SCREEN.Emptyfoodaddscreen}
        />
      ) : (
        <>
          <FoodFormStack.Screen name='SelectChoice' component={FOODADD_SCREEN.SelectChoice} />
          <FoodFormStack.Screen name='AddFood' component={FOODADD_SCREEN.Additems} />
          <FoodFormStack.Screen name='AddPost' component={FOODADD_SCREEN.AddPost} />
        </>
      )}
    </FoodFormStack.Navigator>
  )
}
//=============================================================================

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  var isSelected = accessibilityState.selected

  if (isSelected) {
    return (
      <View
        style={{ flex: 1, alignItems: "center", backgroundColor: "#ffffff" }}>
        <View style={{ flexDirection: "row", position: "absolute", top: 0 }}>
          <Svg width={75} height={0} viewBox='0 0 75 0'>
            <Path
              d='M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z'
              fill='#ffffff'
            />
          </Svg>
        </View>
        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#00A7FF"
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 49,
          backgroundColor: "white"
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    )
  }
}

const CustomTabBar = props => {
  return <BottomTabBar {...props.props} />
}

const Tabs = () => {
  const { state: cartState } = useContext(CartContext)
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0
        }
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      <Tab.Screen
        name='Social'
        component={SocialStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='fas'
              data-icon='house-user'
              className='svg-inline--fa fa-house-user fa-w-18'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 576 512'
              width={30}
              height={30}
            >
              <path
                fill={focused ? "#ffffff" : "#00A7FF"}
                d='M570.69,236.27,512,184.44V48a16,16,0,0,0-16-16H432a16,16,0,0,0-16,16V99.67L314.78,10.3C308.5,4.61,296.53,0,288,0s-20.46,4.61-26.74,10.3l-256,226A18.27,18.27,0,0,0,0,248.2a18.64,18.64,0,0,0,4.09,10.71L25.5,282.7a21.14,21.14,0,0,0,12,5.3,21.67,21.67,0,0,0,10.69-4.11l15.9-14V480a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V269.88l15.91,14A21.94,21.94,0,0,0,538.63,288a20.89,20.89,0,0,0,11.87-5.31l21.41-23.81A21.64,21.64,0,0,0,576,248.19,21,21,0,0,0,570.69,236.27ZM288,176a64,64,0,1,1-64,64A64,64,0,0,1,288,176ZM400,448H176a16,16,0,0,1-16-16,96,96,0,0,1,96-96h64a96,96,0,0,1,96,96A16,16,0,0,1,400,448Z'></path>
            </svg>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />
        }}
      />
      <Tab.Screen
        name='Home'
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='fas'
              data-icon='utensils'
              className='svg-inline--fa fa-utensils fa-w-13'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 416 512'
              width={30}
              height={30}
            >
              <path
                fill={focused ? "#ffffff" : "#00A7FF"}
                d='M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z'></path>
            </svg>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />
        }}
      />
      <Tab.Screen
        name='AddItem'
        component={FoodFormStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='far'
              data-icon='plus-square'
              className='svg-inline--fa fa-plus-square fa-w-14'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 448 512'
              width={30}
              height={30}>
              <path
                fill={focused ? "#ffffff" : "#00A7FF"}
                d='M352 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm96-160v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z'></path>
            </svg>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <svg
                aria-hidden='true'
                focusable='false'
                data-prefix='fas'
                data-icon='shopping-basket'
                className='svg-inline--fa fa-shopping-basket fa-w-18'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 576 512'
                width={30}
                height={30}>
                <path
                  fill={focused ? "#ffffff" : "#00A7FF"}
                  d='M576 216v16c0 13.255-10.745 24-24 24h-8l-26.113 182.788C514.509 462.435 494.257 480 470.37 480H105.63c-23.887 0-44.139-17.565-47.518-41.212L32 256h-8c-13.255 0-24-10.745-24-24v-16c0-13.255 10.745-24 24-24h67.341l106.78-146.821c10.395-14.292 30.407-17.453 44.701-7.058 14.293 10.395 17.453 30.408 7.058 44.701L170.477 192h235.046L326.12 82.821c-10.395-14.292-7.234-34.306 7.059-44.701 14.291-10.395 34.306-7.235 44.701 7.058L484.659 192H552c13.255 0 24 10.745 24 24zM312 392V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24zm112 0V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24zm-224 0V280c0-13.255-10.745-24-24-24s-24 10.745-24 24v112c0 13.255 10.745 24 24 24s24-10.745 24-24z'></path>
              </svg>

              {cartState && cartState.cartItems && (
                <Badge
                  status='error'
                  value={cartState.cartItems.cartItem.length}
                  containerStyle={{ position: "absolute", top: -4, right: -4 }}
                />
              )}
            </View>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />
        }}
      />

      <Tab.Screen
        name='User'
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='fas'
              data-icon='user'
              className='svg-inline--fa fa-user fa-w-14'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 448 512'
              width={30}
              height={30}
            >
              <path
                fill={focused ? "#ffffff" : "#00A7FF"}
                d='M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z'></path>
            </svg>
          ),
          tabBarButton: props => <TabBarCustomButton {...props} />
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
