import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
// screens
import HomeScreen from "../Home";
import ProfileScreen from "../Profile";
import NotificationScreen from "../Notification";
import MessengerScreen from "../Messenger";


const Tab = createBottomTabNavigator();

export default function NaviBottom() {
  return (
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
            else if (route.name === "Trang cá nhân") {
                return(
                  <Image source={require('../../assets/topImage.jpg')} style={{width:28, height:28, borderRadius:50, resizeMode:'cover'}}/>
                )
            }
            return <Icon name={iconName} size={30} color={color} />;
          },
          tabBarLabel: () => null,
        })}
      >
        <Tab.Screen name="Trang chủ" component={HomeScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Thêm hành trình" component={NotificationScreen}/>
        <Tab.Screen name="Trang cá nhân" component={ProfileScreen} options={{headerShown:false}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
