import React, {useEffect, useState} from 'react';
import List from './List'
import axios from "axios";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import {Button} from "@material-ui/core";
const UserList = () => {

    const [data,setData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/user/findAll`)
            .then((res)=>{
                alert("회원리스트 가져옵니다")
                setData(res.data)
            })
            .catch(()=>{
                alert("재시도 바랍니다")
            })
    },[])

    const columns = [
        {
            title:'아이디',field:'userId'
        },
        {
            title:'비밀번호',field:'password'
        },
        {
            title:'이름',field:'name'
        },
        {
            title:'휴대전화',field:'phone'
        },
        {
            title:'이메일',field:'email'
        },
    ]
    const editable = {
        onRowUpdate: (newData,oldData) =>
            new Promise((resolve,reject) =>{
                setTimeout(()=>{
                    const dataUpdate = [...data]
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData
                    setData([...dataUpdate])
                    resolve()
                    axios.post(`http://localhost:8080/user/allUpdate`, [...dataUpdate])
                        .then((res) => {
                        })
                        .catch(() => {
                            alert("통신실패")
                        })
                })
            })
    }
    return (
        <>
                <table title="회원 리스트" parent="Users" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h5>회원 리스트</h5>
                        </div>
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body sell-graph">
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="clearfix"/>
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                <List title={"회원"} data={data} columns={columns} editable={editable} />
                            </div>
                        </div>
                    </div>
                </div>
            <Button
                color="primary"
                size="small"
                variant="text"
                href="/userList"
            >
                전체보기<ArrowRightIcon/>
            </Button>
        </>
    );
};

export default UserList;