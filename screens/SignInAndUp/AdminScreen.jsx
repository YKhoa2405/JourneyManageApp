import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';

export default function AdminScreen() {
    return (
        <View style={{ flex: 1 }}>
            <WebView
                style={styles.container}
                source={{ uri: 'https://hieujourney3.pythonanywhere.com/admin/' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
