import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import JourneyStyle from "./JourneyStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

const JourneyDetail = ({ route }) => {
    const { journeyID } = route.params;

    return (
        <View style={JourneyStyle.JourneyContainer}>

            <TouchableOpacity style={JourneyStyle.addPostButton}>
                <Icon name="add" size={30} />
            </TouchableOpacity>
        </View>
    );
};

export default JourneyDetail;