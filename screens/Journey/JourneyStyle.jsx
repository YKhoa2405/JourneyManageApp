import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { borderUnder, white, black, mainColor, txt18, txt16 } from "../../assets/color";
const { width } = Dimensions.get('window');
const itemWidth = (width / 2);
const JourneyStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
    },
    addButtonContainer: {
        marginTop: 50
    },
    searchContainer: {
        position: 'absolute',
        width: '100%',
        backgroundColor: white,
        top: 0,
        paddingTop: 23
    },
    itemContainer: {
        marginHorizontal: 20,
        marginVertical: 5
    },
    icon: {
        paddingVertical: 13,
        paddingHorizontal: 10,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    InputTime: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        padding: 10,
        backgroundColor: white,
        color: black
    },
    suggestion: {
        backgroundColor: white,
        position: 'absolute',
        top: 200,
        width: '90%',
        left: '5%',
        alignItems: 'center',
        zIndex: 999,
    },
    txtsugestion: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: borderUnder
    },
    buttonCancel: {
        backgroundColor: white,
        padding: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: mainColor,
        marginTop: 15,
        elevation: 4,
        marginBottom: 20
    },
    buttonText: {
        color: mainColor,
        fontSize: 16,
        fontWeight: '500'
    },
    containerMap: {
        marginTop: 20,
        borderRadius: 10
    },
    map: {
        width: '100%',
        height: '100%',
    },
    // My Journey
    JourneyContainer: {
        flex: 1
    },
    itemJourney: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
        height: 280,
        width: itemWidth - 20,
        backgroundColor: white,
        elevation: 4,
        borderRadius: 10,
    },
    itemImage: {
        flex: 1,
        overflow:'hidden',
        resizeMode:'contain',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    itemContent: {
        flex: 1,
        padding:10
    },
    infoJourney:{
        flex:1,
    },
    userJourney:{
        flexDirection:'row',
        alignItems:'center',

    },
    emptyList: {
        fontSize: txt16,
    },

    // journey Detail
    addPostButton: {
        position: 'absolute',
        top: 680,
        right: 10,
        width: 60,
        height: 60,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    }

})

export default JourneyStyle