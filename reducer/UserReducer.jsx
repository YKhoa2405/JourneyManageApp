const UserReducer = (currentState, action) => {
    switch (action.type) {
        case 'login':
            return action.payload;
        case 'logout':
            return null;
        case 'update_user':
            return action.payload
        case 'delete_journey':
            return action.payload
    }
    return currentState
}

export default UserReducer