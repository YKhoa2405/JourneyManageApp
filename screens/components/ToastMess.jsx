import React from "react";
import Toast from "react-native-toast-message";

export const ToastMess = ({ type, text1 }) => {
    Toast.show({
        type: type,
        text1: text1,
        visibilityTime: 4000, // Thời gian tồn tại của toast (milliseconds)
        autoHide: true, // Tự động ẩn toast sau khi hết thời gian tồn tại
    });
}