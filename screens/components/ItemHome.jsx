import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import HomeStyle from "../../styles/HomeStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonMain from "./ButtonMain";
import { mainColor } from "../../assets/color";


export default function ItemHome(){
    return(
        <View style={HomeStyle.containerItemHome}>
            <View style={HomeStyle.titleItemHome}>
                <View >
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Image source={require('../../assets/google.png')} style={HomeStyle.imgUser}></Image>
                        <Text style={HomeStyle.nameUser}>Tên chủ bài</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Icon name="dots-vertical" size={25}></Icon>
                </TouchableOpacity>
            </View>

            <View style={HomeStyle.contentItem}>
                <Image source={require('../../assets/welcome.png')} style={HomeStyle.imgJourney}></Image>
                <View style={HomeStyle.contentJourney}>
                    <Text style={HomeStyle.nameJourney}>Tên hành trình</Text>
                    <View>
                        <View style={HomeStyle.goStart}>
                            <Icon name="map-marker" color={mainColor} size={30}></Icon>
                            <Text style={HomeStyle.text}>Điểm đi</Text>
                        </View>
                        <View style={HomeStyle.line}></View>
                        <View style={HomeStyle.goStart}>
                            <Icon name="map-marker" color={mainColor} size={30}></Icon>
                            <Text style={HomeStyle.text}>Điểm đến</Text>
                        </View>
                        
                    </View>
                    <View style={{marginVertical:10, marginLeft:4}}>
                        <View style={HomeStyle.goStart}>
                            <Icon name="clock-time-four-outline" size={25}></Icon>
                            <Text style={HomeStyle.text}>Thời gian khởi hành</Text>
                        </View>
                    </View>
                    <View style={HomeStyle.btnAddJourney}>
                        <View style={HomeStyle.goStart}>
                            <Icon name="star-outline" color={'gold'} size={30}></Icon>
                            <Text>Điểm</Text>
                        </View>
                        <View>
                            <ButtonMain title={'Tham gia'}></ButtonMain>
                        </View>
                    </View>
                </View>
            </View>

            <View style={HomeStyle.optionHomeItem}>
                <TouchableOpacity>
                    <Icon name="cards-heart-outline" size={25} style={{marginRight:15}}></Icon>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="share-circle" size={25}></Icon>
                </TouchableOpacity>
            </View>

        </View>
    )
}