import React, {useEffect, useState} from 'react';
import axios from 'axios'
import List from './List'
import {Button} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const BreadList = () => {
    const [data,setData] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/bread/findAll`)
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
            title:'빵이름',field:'breadName'
        },
        {
            title:'빵사진',field:'breadImage'
        },
        {
            title:'빵가격',field:'breadPrice'
        },
        {
            title:'상세설명',field:'breadDescription'
        }
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
                    axios.post(`http://localhost:8080/bread/allUpdate`, [...dataUpdate])
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
            {/*<td>상품목록</td>*/}
            {/*<button type="submit" className="btn btn-primary btn-block" onClick={handle}>Submit</button>*/}
            {/*<tbody>*/}
            {/*{breadList.map((i, index) => (*/}
            {/*    <tr key={index}>*/}
            {/*        <td>테스트</td>*/}
            {/*        <td>{i.breadName}</td>*/}
            {/*        <td><img src={i.breadImage} /></td>*/}
            {/*        <td>{i.breadPrice}</td>*/}
            {/*        <td>{i.breadDescription}</td>*/}
            {/*    </tr>*/}
            {/*))}*/}
            {/*</tbody>*/}
            <table title="회원 리스트" parent="Users" />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h5>상품</h5>
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
                            <List title={"빵리스트"} data={data} columns={columns} editable={editable} />
                        </div>
                    </div>
                </div>
            </div>
            <Button
                color="primary"
                size="small"
                variant="text"
                href="/breadList"
            >
                전체보기<ArrowRightIcon/>
            </Button>
        </>
    );
};

export default BreadList;