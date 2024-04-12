import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import HomeStyle from "../styles/HomeStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SearchCpm from "./components/SearchCpm";
import axios from "axios";
import { item, mainColor } from "../assets/color";
import ButtonMain from "./components/ButtonMain";

export default function HomeScreen() {
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchAlbums();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchAlbums = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/albums');
            const data = await response.json();
            setAlbums(data);
            setLoading(false) 
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    // const renderAlbumItem = ({ item }) => (
    //     <View style={HomeStyle.contentItem}>
    //         <Image source={require('../assets/welcome.png')} style={HomeStyle.imgJourney}></Image>
    //         <View style={HomeStyle.contentJourney}>
    //             <Text style={HomeStyle.nameJourney}>{item.title}</Text>
    //             <View>
    //                 <View style={HomeStyle.goStart}>
    //                     <Icon name="map-marker" color={mainColor} size={30}></Icon>
    //                     <Text style={HomeStyle.text}>Điểm đi</Text>
    //                 </View>
    //                 <View style={HomeStyle.line}></View>
    //                 <View style={HomeStyle.goStart}>
    //                     <Icon name="map-marker" color={mainColor} size={30}></Icon>
    //                     <Text style={HomeStyle.text}>Điểm đến</Text>
    //                 </View>
    //             </View>
    //             <View style={{ marginVertical: 10, marginLeft: 4 }}>
    //                 <View style={HomeStyle.goStart}>
    //                     <Icon name="clock-time-four-outline" size={25}></Icon>
    //                     <Text style={HomeStyle.text}>Thời gian khởi hành</Text>
    //                 </View>
    //             </View>
    //             <View style={HomeStyle.btnAddJourney}>
    //                 <View style={HomeStyle.goStart}>
    //                     <Icon name="star-outline" color={'gold'} size={30}></Icon>
    //                     <Text>Điểm</Text>
    //                 </View>
    //                 <View>
    //                     <ButtonMain title={'Tham gia'}></ButtonMain>
    //                 </View>
    //             </View>
    //         </View>
    //     </View>
    // );

    return (
        <View style={HomeStyle.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={HomeStyle.header}>
                    <View>
                        <Text style={HomeStyle.nameTitle}>HK Journey</Text>
                    </View>
                    <View style={HomeStyle.iconHeader}>
                        <TouchableOpacity>
                            <Icon name="chat-outline" size={25} style={{ marginLeft: 20 }}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>

                <SearchCpm placeholder={'Tìm kiếm hành trình...'}></SearchCpm>

                <View style={HomeStyle.content}>
                    <View style={HomeStyle.containerItemHome}>
                        {
                            isLoading ? (<ActivityIndicator color={mainColor} size={"large"}/>) : (
                                <FlatList
                                    data={users}
                                    renderItem={({ item }) => (
                                        <View style={HomeStyle.titleItemHome}>
                                            <View >
                                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require('../assets/google.png')} style={HomeStyle.imgUser}></Image>
                                                    <Text style={HomeStyle.nameUser}>{item.name}</Text>
                                                    <Text style={HomeStyle.nameUser}>{item.id}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity>
                                                <Icon name="dots-vertical" size={25}></Icon>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()} />
                            )
                        }

                        {/* <View style={HomeStyle.optionHomeItem}>
                            <TouchableOpacity>
                                <Icon name="cards-heart-outline" size={25} style={{ marginRight: 15 }}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name="share-circle" size={25}></Icon>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>
            </ScrollView>
        </View>
    );

}
