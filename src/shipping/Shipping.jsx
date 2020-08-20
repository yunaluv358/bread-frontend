import React, {useEffect, useState} from 'react';
import List from '../admin/List'
import axios from 'axios'
const ShippingTypes = {REQUEST: 'Chart/REQUEST'}
const ShippingRequest = action => ({type: ShippingTypes.REQUEST, payload: action.payload})
const ShippingReducer = ( state, action ) => {
    switch (action.type) {
        case ShippingTypes.REQUEST: return {...state, payload: action.payload}
        default: return state
    }
}


export const Shipping = () => {
    const [data,setData] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8080/shipping/findAll`)
            .then((res)=>{
                setData(res.data)
            })
            .catch(() =>{

            })
    },[])
    const columns = [
        {
            title:'배송시작날짜',field:'shippingDate'
        },
        {
            title:'배송자명',field: 'shippingName'
        },
        {
            title:'배송상태',field: 'shippingStatus'
        }
    ]
    const editable = {
        onRowUpdate: (newData,oldData) =>
            new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    const dataUpdate = [...data]
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData
                    setData([...dataUpdate])
                    resolve(
                        axios.post(`http://localhost:8080/shipping/allUpdate`,[...dataUpdate])
                            .then((res)=>{

                            })
                            .catch(()=>{
                                alert("통신실패")
                            })
                    )
                })
            })
    }
    return (
        <>
            <table title="배송 진행 목록" parent="Users" />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <h5>배송 진행 목록</h5>
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
                            <List title={"배송"} data={data} columns={columns} editable={editable} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



export default ShippingReducer;
