import { StyleSheet } from "react-native";
import { borderUnder, item, mainColor, textWeight, txt16, txt20, txt22, white } from "../../assets/color";

const ProfileStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileHeader: {
        paddingHorizontal: 20,
        paddingTop: 20, paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerItem: {
        alignItems: 'center'
    },
    lableTop: {
        fontWeight: 'bold',
        fontSize: txt20
    },
    fullnameUser: {
        paddingLeft: 20,
    },
    fullnameStar: {
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    lableFullname: {
        fontWeight: textWeight,
        fontSize: txt16,
        marginLeft: 5
    },
    buttonFollow: {
        paddingHorizontal: 28,
        paddingVertical: 8,
        backgroundColor: borderUnder,
        borderRadius: 10
    },
    lableButton: {
        fontSize: 16,
        fontWeight: '600'
    },
    contentIcon: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: borderUnder
    },

    // Style JourneyHistory
    editContainer: {
        margin: 20,
        marginTop: 30,
        alignContent: 'center',
        flex: 1,
        flexDirection: 'column'
    },
    fabContainer: {
        position: 'absolute',
        top: 90,
        left: '50%'
    },
    fabAvatar: {
        left: 0,
        top: 0,
        backgroundColor: white
    },
    profileContentDel: {
        backgroundColor: 'red',
        paddingHorizontal: 20,

    }
})

export default ProfileStyle