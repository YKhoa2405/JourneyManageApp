import { StyleSheet } from "react-native"
import { black, borderUnder, item, mainColor, white } from "../assets/color"

const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: mainColor,
        borderBottomLeftRadius: 10,
        paddingBottom: 12,
        borderBottomRightRadius: 10
    },
    headerTitle: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10
    },
    nameTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        color:white
    },
    iconHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    content: {
        marginTop: 20,
    },
    contentTitle: {
        paddingHorizontal: 20,

    },
    // ItemHome
    text: {
        opacity: 0.7,
        marginLeft: 5
    },

    containerItemHome: {
        marginVertical: 5,
        borderBottomWidth: 1,
        borderColor: borderUnder,
        paddingVertical: 10
    },
    titleItemHome: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    nameUser: {
        padding: 10,
        fontWeight: 'bold'
    },
    optionHomeItem: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    cardJourney: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 5
    },
    cardImage: {
        flex: 1,
    },
    cardContent: {
        flex: 1,
        padding: 10
    },
    nameJourney: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    goStart: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        borderWidth: 0.5,
        width: 1,
        height: 15,
        marginLeft: 12,
        opacity: 0.2
    },
    btnAddJourney: {
        marginTop: 20,
        marginBottom: 10
    },
    styleLoading: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    containerMember: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: borderUnder,
        backgroundColor: white,
        flex: 1,
        justifyContent: 'space-between'
    }

})

export default HomeStyle
