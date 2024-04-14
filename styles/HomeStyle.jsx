import { StyleSheet } from "react-native"
import { borderUnder, item, mainColor } from "../assets/color"

const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: mainColor,
        borderBottomLeftRadius: 10,
        paddingBottom:20,
        borderBottomRightRadius: 10
    },
    headerTitle: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    nameTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    iconHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    content: {
        marginTop: 20,
    },
    contentTitle:{
        paddingHorizontal:20,

    },
    // ItemHome
    text: {
        opacity: 0.5,
        marginLeft: 2
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
        paddingRight:10
    },
    cardJourney: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection:'column',
        marginHorizontal:20,
        borderRadius:10,
        elevation:5
    },
    cardImage:{
        flex:1,
    },
    cardContent: {
        flex: 1,
        padding:10
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
        borderWidth: 1,
        width: 1,
        height: 15,
        marginLeft: 14,
        opacity: 0.2
    },
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnAddJourney:{
        marginTop:20,
        marginBottom:10
    }
})

export default HomeStyle
