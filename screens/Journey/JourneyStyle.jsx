import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { borderUnder, white, black, mainColor, txt18, txt16, txt22, item, txt20, textWeight, txt24 } from "../../assets/color";
const { width } = Dimensions.get('window');
const itemWidth = (width / 2);
const windowWidth = Dimensions.get('window').width
const JourneyStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonContainer: {
        marginTop: 50,
        width: '90%'
    },
    searchContainer: {
        backgroundColor: white,
    },
    itemContainer: {
        marginBottom: 20,
        width: '90%'
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
        paddingRight: 40,
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
        fontWeight: textWeight
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
        elevation: 5,
        borderRadius: 10,
    },
    itemImage: {
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    styleImage: {
        width: '100%',
        resizeMode: 'cover',
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
    headerContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
    },

    floadTingContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    headerText:{
        fontWeight:'bold',
        fontSize:txt24,
        color:white
    },
    floadTingButton: {
        position: 'absolute',
        top: 30,
        backgroundColor: borderUnder,
        padding: 5,
        backgroundColor: mainColor,
        borderRadius: 10,
        zIndex: 1
    },
    floadTingAddPost: {
        width: 50,
        height: 50,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        elevation: 3
    },
    floadTingEnd: {
        width: 160,
        height: 40,
        backgroundColor: mainColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        borderRadius: 10,
    },
    //post
    containerPost: {
        flex: 1,
        paddingBottom: 10,
        marginBottom: 20,
        backgroundColor: white
    },
    coverImage: {
        flex: 1,
    },
    postHeader: {
        marginTop: 10,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameOwner: {
        fontSize: txt16,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    postContent: {
        marginHorizontal: 16,
        marginVertical: 10
    },
    postFeeling: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10
    },
    postInteract: {
        borderTopWidth: 0.5,
        borderColor: borderUnder,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    interactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 10
    },
    backDrop: {
        flex: 1,
        backgroundColor: white,
        borderRadius: 20,
    },
    itemSheet: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    // comment post
    commentContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        bottom: 10,
        left: 0,
        right: 0,
    },
    inputComment: {
        width: '80%',
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: borderUnder,
        padding: 10,
        borderRadius: 10,
        backgroundColor: white
    },
    viewComment: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        marginHorizontal: 8,
        justifyContent: 'space-between',
        flex: 1
    },
    contentComment: {
        backgroundColor: borderUnder,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 10,
        borderRadius: 20,
        flex: 1
    },
    viewCommentRep:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 8,
        justifyContent: 'space-between',
        flex: 1,
        marginLeft:10
    },
    contentCommentRep:{

    },
    listMember: {
        marginBottom:20,
        marginTop:10,
        marginHorizontal: 16,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleMember: {
        fontSize: txt18,
        fontWeight: textWeight,
        opacity: 0.8,
    },
    contentMember: {
        flexDirection: 'row'
    },
    imageMember: {
        marginLeft: 2
    },
    ownerJourney: {
        position: 'absolute',
        right: 16,
        bottom: 16
    },
    styleModel: {
        width: '90%',
        backgroundColor: white,
        borderRadius: 20,
        padding: 20,
        elevation: 5,
    },
    headerModel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ratingStyle: {
        marginBottom: 30,
    },
    headerImage: {
        width: '100%', height: 280, resizeMode: 'cover'
    },
    imagePost:{
        width: windowWidth - 30,
        height: 460,
        resizeMode: 'cover',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: borderUnder,
        marginHorizontal:5,
    }
    ,deleteImagePost:{
        position:'absolute',
        top:10,
        right:20,
        zIndex:1
    }


})

export default JourneyStyle