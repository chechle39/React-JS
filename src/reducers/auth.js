import {
    LOGIN,
    REGISTER,
    LOGIN_PAGE_UNLOADED,
    REGISTER_PAGE_UNLOADED,
    ASYNC_START,
    UPDATE_FIELD_AUTH
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case UPDATE_FIELD_AUTH:
            return { ...state, [action.key]: action.value };
        case LOGIN_PAGE_UNLOADED:
            return {}
        case LOGIN:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            }
        case ASYNC_START:
            if (action.subtype === LOGIN || action.subtype === REGISTER) {
                return { ...state, inProgress: true };
            }
            break;
        default:
            return state;
    }
    return state;
};