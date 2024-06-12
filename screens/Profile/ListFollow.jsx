// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
// import HomeStyle from "../../styles/HomeStyle";
// import JourneyStyle from "../Journey/JourneyStyle";
// import UIHeader from "../components/UIHeader";
// import API, { endpoints } from "../../config/API";

// const ListFollow = ({ route, navigation }) => {

//     const { userID, isFollow } = route.params;
//     const [isLoading, setLoading] = useState(true)
//     const [followers, setFollowers] = useState([])
//     const [following, setFollowing] = useState([])


//     return (
//         <View style={{ flex: 1 }}>
//             <UIHeader
//                 title={'Người theo dõi'}
//                 leftIcon={'arrow-left'}
//                 handleLeftIcon={() => navigation.navigate("ProfileUserScreen", {
//                     userId: userID
//                 })}
//                 handleRightIcon={() => navigation.navigate("MapMember")} />
//             {/* {isLoading ? <ActivityIndicator color={black} size={'large'} style={HomeStyle.styleLoading} /> : <>
//                 <FlatList
//                     data={member}
//                     keyExtractor={item => item.id.toString()}
//                     renderItem={({ item }) => (
//                         <View
//                             key={item.id}
//                             style={HomeStyle.containerMember}
//                         >
//                             <TouchableOpacity onPress={() => {
//                                 if (user.id !== item.id) {
//                                     goToProfileUser(item.id);
//                                 }
//                             }}>
//                                 <Avatar.Image source={{ uri: item.avatar }} size={50} style={JourneyStyle.imageMember} />
//                             </TouchableOpacity>
//                             <Text>{item.username}</Text>
//                             <Text>{item.full_name}</Text>
//                             {item.ownerJourney ? (<Icon name="check-decagram" size={24} color={mainColor} />) :
//                                 (<TouchableOpacity onPress={() => handleDeleteMember(item.id)}>
//                                     <Icon name="close" size={24} color={'red'} />
//                                 </TouchableOpacity>)}
//                         </View>
//                     )}
//                 />
//             </>} */}
//         </View>
//     )
// }

// export default ListFollow