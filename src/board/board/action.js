import type from './type'
import {get, update, getForSearch} from "../boardApi";
import {getData} from "../boardHelper";

export const changePage = (pageNumber, pageSize, searchType, keyword, isSearch) => dispatch => {

    const requestApi = (isSearch && keyword.trim() != "" ?
        getForSearch(pageNumber + 1, pageSize, searchType, keyword) : get(pageNumber + 1, pageSize));

    return requestApi.then(response => {
        if (typeof response.data.code != "undefined") {
            dispatch(apiRequestError("", response.data.message))
        } else {
            const selectedData = getData(pageNumber, pageSize, response);
            dispatch({
                type: type.CHANGE_PAGE,
                payload: {
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    selectedData: selectedData
                }
            })
        }
    }).catch(error => {
        dispatch(apiRequestError(error.response.status, error.message))
    })
}

export const keywordSearch = (pageSize, searchType, keyword) => dispatch => {
    const pageNumber = 0;
    return getForSearch(pageNumber + 1, pageSize, searchType, keyword)
        .then(response => {
            if (typeof response.data.code != "undefined") {
                dispatch(apiRequestError("", response.data.message))
            } else {
                const selectedData = getData(pageNumber, pageSize, response);
                dispatch({
                    type: type.KEYWORD_SEARCH,
                    payload: {
                        keyword: keyword,
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                        selectedData: selectedData
                    }
                })
            }
        }).catch(error => {
            dispatch(apiRequestError(error.response.status, error.message))
        })
}

export const changeShowAllContents = (pageSize) => dispatch => {
    const pageNumber = 0;

    return get(pageNumber + 1, pageSize)
        .then(response => {
            if (typeof response.data.code != "undefined") {
                dispatch(apiRequestError("", response.data.message))
            } else {
                const selectedData = getData(pageNumber, pageSize, response);
                dispatch({
                    type: type.CHANGE_SHOWING_ALL_CONTENTS,
                    payload: {
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                        selectedData: selectedData
                    }
                })
            }
        }).catch(error => {
            dispatch(apiRequestError(error.response.status, error.message))
        })
}

export const clickRow = (rowData) => ({
    type: type.CLICK_ROW,
    payload: rowData
})

export const closeModal = () => ({
    type: type.CLOSE_MODAL,
})

export const clickWriteButton = () => ({
    type: type.CLICK_WRITE_BUTTON,
})


export const modifyData = (id, updatedData, allData) => dispatch => {
    return update(id, updatedData)
        .then(response => {
            if (typeof response.data.code != "undefined") {
                dispatch(apiRequestError("", response.data.message))
            } else {
                allData.forEach(function (element) {
                    if (element.id == id) {
                        for (var key in updatedData) {
                            element[key] = updatedData[key];
                        }
                        return;
                    }
                })
            }
            dispatch({
                type: type.MODIFY_DATA,
                payload: allData,
            })
        }).catch(error => {
            dispatch(apiRequestError(error.response.status, error.message))
        })
}

export const searchTypeSelectorChange = (value) => ({
    type: type.SEARCH_TYPE_SELECTOR_CHANGE,
    payload: value
})

export const apiRequestError = (errorCode, errorMessage) => ({
    type: type.API_REQUEST_ERROR,
    payload: {
        code: errorCode,
        message: errorMessage
    }
})
