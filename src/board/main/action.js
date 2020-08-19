import {createAction} from "redux-actions";
import type from './type'

export const loginSuccess = createAction(
    type.LOGIN_SUCCESS, (accountId, role) => ({accountId, role})
);

export const loginFail = createAction(
    type.LOGIN_FAIL, errorMessage => errorMessage
)

export const pageChange = createAction(
    type.PAGE_CHANGE
)

export const joinFail = createAction(
    type.JOIN_FAIL, errorMessage => errorMessage
)

