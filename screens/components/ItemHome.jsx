import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import HomeStyle from "../../styles/HomeStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonMain from "./ButtonMain";
import { mainColor } from "../../assets/color";


export default function ItemHome(){
    const [loading,setLoading] = useState(true);
    const [error,seteEror] = useState();
    const [response,setResponse] = useState();

    

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res=>res.json())
        .then((result)=>{
            setLoading(false);
            setResponse(result);
        },(error)=>{
            setLoading(false);
            seteEror(error);
        })
    }, [])

    const getContent = () =>{
        if(loading){
            return <ActivityIndicator/>
        }
        if(error){
            return <Text>{error}</Text>
        }
        if (response && response.length > 0) {
            const firstUser = response[4]; // Lấy thông tin của user đầu tiên
            return (
                <Text>{firstUser.name}</Text>
            );
        }
        return null;
    }

    return(
        <View style={HomeStyle.containerItemHome}>
            <View style={HomeStyle.titleItemHome}>
                <View >
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Image source={require('../../assets/google.png')} style={HomeStyle.imgUser}></Image>
                        <Text style={HomeStyle.nameUser}>Tên người đăng</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Icon name="dots-vertical" size={25}></Icon>
                </TouchableOpacity>
            </View>

            <View style={HomeStyle.contentItem}>
                <Image source={require('../../assets/welcome.png')} style={HomeStyle.imgJourney}></Image>
                <View style={HomeStyle.contentJourney}>
                    <Text style={HomeStyle.nameJourney}>Tên bài đăng</Text>
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