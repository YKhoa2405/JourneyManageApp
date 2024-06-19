import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import UIHeader from '../components/UIHeader';

export default function VNPayScreen({ route }) {
    const { user_create, url } = route.params;
    console.log(url)
    console.log(user_create)
    return (
        <View style={{ flex: 1 }}>
            <UIHeader
                title={`Ủng hộ ${user_create.username}`}
            />
            <WebView
                style={styles.container}
                source={{ uri: url }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
