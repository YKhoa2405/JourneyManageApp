import React, { useReducer } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
// screens
import ProfileScreen from "../Profile/Profile";
import NotificationScreen from "../Notifi/Notification";
import MessengerScreen from "../Message/Messenger";
import MyContext from "../../config/MyContext";
import UserReducer from "../../reducer/UserReducer";
import AddJourney from "../Journey/AddJourney";
import HomeScreen from "../Home/Home";
import LoginScreen from "../SignInAndUp/Login";
import { mainColor } from "../../assets/color";
import { createStackNavigator } from "@react-navigation/stack";
import MyJourney from "../Journey/MyJourney";
import JourneyDetail, { EditPost } from "../Journey/JourneyDetail";
import EditProfile from "../Profile/EditProfile";
import Toast from "react-native-toast-message";
import CommentScreen from "../Journey/Comment";
import AddPost from "../Journey/AddPost";
import MessageDetail from "../Message/MessageDetail";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
              else if (route.name === "Trang cá nhân") {
                return (
                  <Image source={{ uri: user.avatar }} style={{ width: 26, height: 26, borderRadius: 50, borderWidth: 1, borderColor: mainColor, resizeMode: 'cover' }} />
                )
              }
              return <Icon name={iconName} size={26} color={color} />;
            },
            tabBarLabel: () => null,
          })}
        >
          <Tab.Screen name="Trang chủ" component={HomeScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Nhắn tin" component={MessStackNavigator} options={{headerShown:false}} />
          <Tab.Screen name="Thêm hành trình" component={AddJourney} options={{ headerShown: false }} />
          <Tab.Screen name="Thông báo" component={NotificationScreen} />
          {user == null ?
            <Tab.Screen name="Đăng nhập" component={LoginScreen} options={{ headerShown: false }} /> :
            <Tab.Screen name="Trang cá nhân" component={ProfileStackNavigator} options={{ headerShown: false }} />}
        </Tab.Navigator>
        <Toast />
      </NavigationContainer>
    </MyContext.Provider>
  );
}

function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MyJourney" component={MyJourney} options={{ title: 'Hành trình bạn tham gia' }} />
      <Stack.Screen name="JourneyDetail" component={JourneyDetail} options={{ title: 'Chi tiết hành trình', headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Chỉnh sửa thông tin' }} />
      <Stack.Screen name="CommentScreen" component={CommentScreen} options={{ title: 'Bình luận' }} />
      <Stack.Screen name="EditPost" component={EditPost} options={{ title: 'Chỉnh sử bài đăng' }} />
      <Stack.Screen name="AddPost" component={AddPost} options={{ title: 'Tạo bài viết' }} />
    </Stack.Navigator>
  );
}

function MessStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MessengerScreen" component={MessengerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MessageDetail" component={MessageDetail}  options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}


