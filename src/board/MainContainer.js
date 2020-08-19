import React from "react";
import {connect} from 'react-redux';
import {useHistory} from "react-router-dom";


import Main from "../components/Main";

import {joinApi, loginApi} from '../store/api/userApi';
import {joinFail, loginFail, loginSuccess, pageChange} from "../store/modules/main/action";


const MainContainer = ({isLoginPage, errorMessage, loginSuccess, loginFail, pageChange, joinFail}) => {
    let history = useHistory();

    const loginSubmit = async (id, password) => {
        var response = await loginApi(id, password);
        if (typeof response.data.code != "undefined") {
            loginFail(response.data.message);
        } else {
            loginSuccess(response.data.accountId, response.data.role);
            alert("로그인에 성공하셨습니다. 게시판으로 이동합니다.");
            history.push("/board");
        }
    }

    const joinSubmit = async (id, password) => {
        var response = await joinApi(id, password);
        if (typeof response.data.code != "undefined") {
            joinFail(response.data.message);
        } else {
            alert("회원 가입에 성공하셨습니다. 로그인 페이지로 이동합니다.");
            pageChange();
        }
    }

    return <Main
        handleClick={isLoginPage ? loginSubmit : joinSubmit}
        message={errorMessage}
        isLoginPage={isLoginPage}
        pageChange={pageChange}
    />;
}

const mapStateToProps = state => ({
    errorMessage: state.main.errorMessage,
    isLoginPage: state.main.isLoginPage,
})

const mapDispatchToProps = dispatch => ({
    loginSuccess: (accountId, role) => dispatch(loginSuccess(accountId, role)),
    loginFail: (errorMessage) => dispatch(loginFail(errorMessage)),
    pageChange: () => dispatch(pageChange()),
    joinFail: (errorMessage) => dispatch(joinFail(errorMessage))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer);
