import React, { useReducer } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
// screens
import HomeScreen from "../Home";
import ProfileScreen from "../Profile";
import NotificationScreen from "../Notification";
import MessengerScreen from "../Messenger";
import MyContext from "../../config/MyContext";
import UserReducer from "../../reducer/UserReducer";
import LoginScreen from "../Login";
import AddJourney from "../AddJourney";



const Tab = createBottomTabNavigator();

export default function NaviBottom() {
  const [user, dispatch] = useReducer(UserReducer, null)

  return (
    <MyContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Trang chủ") {
                iconName = focused ? "home" : "home";
              }
              else if (route.name === "Thêm hành trình") {
                iconName = focused ? "add-circle-outline" : "add-circle-outline"
              }
              else if (route.name === "Thông báo") {
                iconName = focused ? "notifications" : "notifications"
              }
              else if (route.name === "Nhắn tin") {
                iconName = focused ? "chatbubbles-outline" : "chatbubbles-outline"
              }
              else if (route.name === "Đăng nhập") {
                iconName = focused ? "person-circle-sharp" : "person-circle-sharp"
              }
              // else if (route.name === "Trang cá nhân") {
              //   // return (
              //   //   <Image source={require(user.avatar)} style={{ width: 28, height: 28, borderRadius: 50, resizeMode: 'cover' }} />
              //   // )
              //   iconName = focused ? "person-circle-outline" : "person-circle-outline"
              // }
              return <Icon name={iconName} size={26} color={color} />;
            },
            tabBarLabel: () => null,
          })}
        >
          <Tab.Screen name="Trang chủ" component={HomeScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Nhắn tin" component={MessengerScreen} />
          <Tab.Screen name="Thêm hành trình" component={AddJourney} />
          <Tab.Screen name="Thông báo" component={NotificationScreen} />
          {user == null ?
            <Tab.Screen name="Đăng nhập" component={LoginScreen} options={{ headerShown: false }}/> :
            <Tab.Screen name="Trang cá nhân" component={ProfileScreen} options={{ headerShown: false }} />}
        </Tab.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  );
}
