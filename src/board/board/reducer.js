import {handleActions} from 'redux-actions'
import type from './type'
import {BOARD_PAGE_SIZE} from '../constant';

const initialState = {
    pageNumber: 0,
    pageSize: BOARD_PAGE_SIZE,
    selectedData: [],
    isModalOpen: false,
    modalData: {},
    isWriteModal: false,
    isSearch: false,
    keyword: "",
    boardId: 0,
    searchType: "",
    isRequestFail: false,
    errorCode: "",
    errorMessage: "",
};

export default handleActions({
        [type.CHANGE_PAGE]: (state, action) => ({
            ...state,
            pageNumber: action.payload.pageNumber,
            pageSize: action.payload.pageSize,
            selectedData: action.payload.selectedData,
            isRequestFail: false,
        }),
        [type.CLICK_ROW]: (state, action) => ({
            ...state,
            isModalOpen: true,
            modalData: action.payload,
        }),
        [type.CLOSE_MODAL]: (state, action) => ({
            ...state,
            isModalOpen: false,
            isWriteModal: false,
            modalData: {},
        }),
        [type.MODIFY_DATA]: (state, action) => ({
            ...state,
            selectedData: action.payload,
            isRequestFail: false,
        }),
        [type.CLICK_WRITE_BUTTON]: (state, action) => ({
            ...state,
            isModalOpen: true,
            isWriteModal: true,
        }),
        [type.CHANGE_SHOWING_ALL_CONTENTS]: (state, action) => ({
            ...state,
            isSearch: false,
            keyword: "",
            boardId: (state.boardId === 0 ? 1 : 0),
            pageNumber: action.payload.pageNumber,
            pageSize: action.payload.pageSize,
            selectedData: action.payload.selectedData,
            isRequestFail: false,
        }),
        [type.KEYWORD_SEARCH]: (state, action) => ({
            ...state,
            isSearch: true,
            keyword: action.payload.keyword,
            boardId: (state.boardId === 0 ? 1 : 0),
            pageNumber: action.payload.pageNumber,
            pageSize: action.payload.pageSize,
            selectedData: action.payload.selectedData,
            isRequestFail: false,
        }),
        [type.SEARCH_TYPE_SELECTOR_CHANGE]: (state, action) => ({
            ...state,
            searchType: action.payload
        }),
        [type.API_REQUEST_ERROR]: (state, action) => ({
            ...state,
            isRequestFail: true,
            errorCode: action.payload.code,
            errorMessage: action.payload.message,
        })
    }, initialState
)
