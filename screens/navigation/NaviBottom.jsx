import React, { useReducer } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
import { black, mainColor } from "../../assets/color";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import UserReducer from "../../reducer/UserReducer";
import MyContext from "../../config/MyContext";

// screens
import ProfileScreen from "../Profile/Profile";
import NotificationScreen from "../Notifi/Notification";
import MessengerScreen from "../Message/Messenger";
import AddJourney from "../Journey/AddJourney";
import HomeScreen from "../Home/Home";
import MyJourney from "../Journey/MyJourney";
import JourneyDetail from "../Journey/JourneyDetail";
import EditProfile from "../Profile/EditProfile";
import CommentScreen from "../Journey/Comment";
import AddPost from "../Journey/AddPost";
import MessageDetail from "../Message/MessageDetail";
import CommentJourneyScreen from "../Home/CommentJourney";
import MapSearch from "../Journey/MapSearch";
import ProfileUserScreen from "../Profile/ProfileUser";
import RegisterScreen from "../SignInAndUp/Register";
import LoginScreen from "../SignInAndUp/Login";
import ListMember from "../Journey/ListMember";
import MapMember from "../Journey/MapMember";
import EditPost from "../Journey/EditPost";
import FollowList from "../Profile/FollowList";
import EditJourney from "../Journey/EditJourney";
import VNPayScreen from "../SignInAndUp/VNPayScreen";
import AdminScreen from "../SignInAndUp/AdminScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const openConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    duration: 500,
  },
};

const closeConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 1,
    duration: 500,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default function NaviBottom() {
  const [user, dispatch] = useReducer(UserReducer, null);

  return (
    <MyContext.Provider value={[user, dispatch]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Trang chủ") {
                  iconName = focused ? "home" : "home";
                } else if (route.name === "Thêm hành trình") {
                  iconName = focused
                    ? "add-circle-outline"
                    : "add-circle-outline";
                } else if (route.name === "Thông báo") {
                  iconName = focused ? "notifications" : "notifications";
                } else if (route.name === "Nhắn tin") {
                  iconName = focused
                    ? "chatbubbles-outline"
                    : "chatbubbles-outline";
                } else if (route.name === "Đăng nhập") {
                  iconName = focused
                    ? "person-circle-sharp"
                    : "person-circle-sharp";
                } else if (route.name === "Trang cá nhân") {
                  return (
                    <Image
                      source={{ uri: user.avatar }}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: mainColor,
                        resizeMode: "cover",
                      }}
                    />
                  );
                }
                return (
                  <Icon name={iconName} size={size} color={focused ? mainColor : color} />
                );
              },
              tabBarLabel: () => null,
              tabBarHideOnKeyboard: true,  // This will hide the tab bar when the keyboard is open
            })}
          >
            <Tab.Screen name="Trang chủ" component={HomeStackNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Nhắn tin" component={MessStackNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Thêm hành trình" component={AddJourneyStackNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Thông báo" component={NotifiStackNavigator} options={{ headerShown: false }} />
            {user == null ? (
              <Tab.Screen name="Đăng nhập" component={LoginStackNavigator} options={{ headerShown: false }} />
            ) : (
              <Tab.Screen name="Trang cá nhân" component={ProfileStackNavigator} options={{ headerShown: false }} />
            )}
          </Tab.Navigator>
          <Toast />
        </NavigationContainer>
      </KeyboardAvoidingView>
    </MyContext.Provider>
  );
}

function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        transitionSpec: {
          open: openConfig,
          close: closeConfig,
        },
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MyJourney" component={MyJourney} options={{ headerShown: false }} />
      <Stack.Screen name="JourneyDetail" component={JourneyDetail} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Chỉnh sửa thông tin" }} />
      <Stack.Screen name="CommentScreen" component={CommentScreen} options={{ title: "Bình luận bài đăng" }} />
      <Stack.Screen name="AddPost" component={AddPost} options={{ title: "Thêm bài viết" }} />
      <Stack.Screen name="ProfileUserScreen" component={ProfileUserScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ListMember" component={ListMember} options={{ headerShown: false }} />
      <Stack.Screen name="MapMember" component={MapMember} options={{ headerShown: false }} />
      <Stack.Screen name="EditJourney" component={EditJourney} options={{ title: "Chỉnh sửa hành trình " }} />
      <Stack.Screen name="MapSearch" component={MapSearch} options={{ headerShown: false }} />
      <Stack.Screen name="EditPost" component={EditPost} options={{ title: "Chỉnh sửa bài viết" }} />
      <Stack.Screen name="FollowList" component={FollowList} options={{ headerShown: false }} />
      <Stack.Screen name="VNPayScreen" component={VNPayScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function MessStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: openConfig,
          close: closeConfig,
        },
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      <Stack.Screen name="MessengerScreen" component={MessengerScreen} />
      <Stack.Screen name="MessageDetail" component={MessageDetail} />
    </Stack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        transitionSpec: {
          open: openConfig,
          close: closeConfig,
        },
        // tùy chỉnh chuyển động khi màn hình chuyển đổi
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
        headerShown: false, // Tất cả các màn hình không hiển thị header
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CommentJourneyScreen" component={CommentJourneyScreen} />
      <Stack.Screen name="ProfileUserScreen" component={ProfileUserScreen} />
      <Stack.Screen name="JourneyDetail" component={JourneyDetail} />
      <Stack.Screen name="MessageDetail" component={MessageDetail} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="FollowList" component={FollowList} />
    </Stack.Navigator>
  );
}

function AddJourneyStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddJourney" component={AddJourney} options={{ headerShown: false }} />
      <Stack.Screen name="MapSearch" component={MapSearch} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function LoginStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }} />

      
    </Stack.Navigator>
  );
}

function NotifiStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        transitionSpec: {
          open: openConfig,
          close: closeConfig,
        },
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileUserScreen" component={ProfileUserScreen} options={{ headerShown: false }} />
      <Stack.Screen name="JourneyDetail" component={JourneyDetail} options={{ headerShown: false }} />
      <Stack.Screen name="CommentJourneyScreen" component={CommentJourneyScreen} />
    </Stack.Navigator>
  );
}
