import React, {useEffect, useState} from 'react';
import axios from 'axios'
import List from './List'
import {Button} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const Breads = () => {
    const [data,setData] = useState([])

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/bread/findAll`)
    //         .then((res)=>{
    //             alert("회원리스트 가져옵니다")
    //             setData(res.data)
    //         })
    //         .catch(()=>{
    //             alert("재시도 바랍니다")
    //         })
    // },[])
    useEffect(()=>{
        axios.get(`http://localhost:8080/bread/findAll`)
            .then((response) => {
                    alert("브레드리스트 가져오기 성공")
                    setData(response.data)
                }
            ).catch((error => {
                alert("실패")
                throw (error)
            }
        ))
    },[])

    return (
        <>
            <td>상품목록</td>

            <tbody>
            {data.map((i, index) => (
                <tr key={index}>
                    <td>테스트</td>
                    <td>{i.breadName}</td>
                    <td><img src={i.breadImage} /></td>
                    <td>{i.breadPrice}</td>
                    <td>{i.breadDescription}</td>
                </tr>
            ))}

            </tbody>
        </>
    );
};
export default Breads;
