import React from "react";
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import HomeStyle from "../styles/HomeStyle";
import Icon from "react-native-vector-icons/Ionicons";
import SearchCpm from "./components/SearchCpm";
import axios from "axios";
import { mainColor } from "../assets/color";
import ItemHome from "./components/ItemHome";

export default function HomeScreen(){
    return(
        <View style={HomeStyle.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={HomeStyle.header}>
                    <View>
                        <Text style={HomeStyle.nameTitle}>HK Journey</Text>
                    </View>
                    <View style={HomeStyle.iconHeader}>
                        <TouchableOpacity>
                            <Icon name="notifications-sharp" size={25}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="chatbubble-outline" size={25} style={{marginLeft:20}}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>

                <SearchCpm placeholder={'Tìm kiếm hành trình...'}></SearchCpm> 

                <View style={HomeStyle.content}>
                    <ItemHome></ItemHome>        
                </View>
            </ScrollView>
        </View>
    );
}