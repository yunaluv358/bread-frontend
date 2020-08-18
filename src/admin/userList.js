import React from 'react';
import Button from "@material-ui/core/Button";

const UserList = () => {
    return (
        <>
            <div>
                <center><h1>회원리스트</h1></center>
                <table border="1" style={{position: 'relative', width: '50%', height: '50%', left: '25%', top: '0%'}}>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>아이디</th>
                    <th>아이디</th>
                </table>
                <div style={{position: 'relative', left: '45%'}}>
                    <Button onClick={onUpdateCheck}>회원정보수정</Button>
                    <Button onClick={onDeleteCheck}>회원탈퇴</Button>
                    <Button>회원리스트</Button>
                </div>
            </div>

        </>
    );
};

export default UserList;