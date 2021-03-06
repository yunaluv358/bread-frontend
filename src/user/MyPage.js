import React from "react";
import {PageTemplate} from "../home";
import styled from "styled-components";
import Route from "react-router-dom/es/Route";
import OrderDetail from "./OrderDetail";
import {Link} from "react-router-dom"
import Navigation from "../home/Navigation";
import EditProfile from "./EditProfile";

const MyNavDiv = styled.div`
    
    padding: 30px 0 0; 
    border-bottom: 1px solid #ccc;
    button {
        border: 1px solid transparent; 
        border-bottom: 0; 
        cursor: pointer; 
        font-weight: 600;
        background-color: transparent;
        font-size: 18px;
        outline: none;
        padding: 15px;
        @media (max-width: 600px) {
            padding: 10px;
        }
        :hover {
            color: black;
        }
    }
`;

const MypageTypes= {REQUEST: 'Mypage/REQUEST', SUCCESS: 'Mypage/SUCCESS', FAIL: 'Mypage/FAIL'}
const MypageRequest = action => ({types: MypageTypes.REQUEST, payload: action.payload})
const MypageSuccess = action => ({types: MypageTypes.SUCCESS, payload: action.payload})
const MypageFail = action => ({types: MypageTypes.FAIL, payload: action.payload})

const MypageReducer = (state, action) => {
    switch (action.type) {
        case MypageTypes.REQUEST:
            return {
                ...state, payload: action.payload
            }
        case MypageTypes.SUCCESS:
            return {
                ...state, payload: action.payload
            }
        case MypageTypes.FAIL:
            return {
                ...state, payload: action.payload
            }
        default:
            return state
    }
}


export const MyPage = () => {
    return <>
    <PageTemplate>
        <section className="signin">

            <h1 className="h3-bread"></h1>
            <div className="gaukuF"><h2 className="sc-jTzLTM btRZwy">My Page</h2>
                <button type="button" className="sc-dnqmqq qrXFy">LogOut</button>
            </div>

            <MyNavDiv>
                <p><Link to="/MyPage/OrderDetail">OrderList</Link></p>
                <p><Link to="/MyPage/EditProfile">Edit Profile</Link></p>
            </MyNavDiv>

            {/* 이중 라우팅 */}
            <Route path="/MyPage/OrderDetail" component={OrderDetail}/>
            <Route path="/MyPage/EditProfile" component={EditProfile}/>



    </section></PageTemplate>
    </>

}

export default MypageReducer





