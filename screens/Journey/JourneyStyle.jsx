import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { borderUnder, white, black, mainColor, txt18, txt16, txt22, item } from "../../assets/color";
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
        flex: 1,
    },
    itemJourney: {
        flexDirection: 'column',
        margin: 10,
        height: 300,
        width: itemWidth - 20,
        backgroundColor: white,
        elevation: 4,
        borderRadius: 10,
    },
    itemImage: {
        flex: 1,
        overflow: 'hidden',
        resizeMode: 'contain',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    itemContent: {
        flex: 1,
        padding: 10
    },
    infoJourney: {
        flex: 1,
    },
    userJourney: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    emptyList: {
        fontSize: txt16,
    },

    // journey Detail
    imagesContainer:{
        height:450
    },
    addPostButton: {
        position: 'absolute',
        top: 670,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    //post
    containerPost: {
        flex: 1,
        paddingBottom: 10,
        marginBottom:25,
        backgroundColor:white
    },
    coverImage: {
        flex: 1,
    },
    timeHeader: {
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    time: {
        fontSize: 30,
        fontWeight: 'bold',
        marginRight: 10
    },
    horizontalLine: {
        flex: 1,
        backgroundColor: borderUnder,
        height: 4,
        borderRadius: 10
    },
    postHeader: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    owner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameOwner: {
        marginLeft: 5,
        opacity: 0.7
    },
    postContent: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    postImage: {
        height: 450,
        resizeMode: 'cover'
    },
    postFeeling: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10
    },
    postInteract: {
        borderTopWidth:0.5,
        borderColor:borderUnder,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    interactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop:10
    },
    headerIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: mainColor,
        paddingTop:25,
    },
    editIcon:{
        flexDirection:'row',
        alignItems:'center'
    },
    touIcon: {
        padding: 13,
    },
    listMember: {
        marginHorizontal: 20,
        marginTop: 30
    },
    backDrop:{
        flex:1,
        backgroundColor:white,
        borderRadius:20,
    },
    itemSheet: {
        flexDirection: 'row',
        alignItems: 'center',
        padding:20,
    },
    // comment post
    commentContainer: {
        position:'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        bottom:10,
        left:0,
        right: 0,
    },
    inputComment: {
        width: '80%',
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: borderUnder,
        padding: 10,
        borderRadius: 10,
        backgroundColor:white
    },
    viewComment: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 18
    },
    contentComment: {
        backgroundColor: borderUnder,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 10,
        borderRadius: 20
    }


})

export default JourneyStyle