/* eslint-disable prettier/prettier */
import {CREATE_USER_ACTION} from '../actionTypes';

const initialState = {
  boarding: false,
  token: '',
  isLogin: false,
  profile: {},
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER_ACTION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export const updateUserDetails = data => {
  return {
    type: CREATE_USER_ACTION,
    payload: data,
  };
};
