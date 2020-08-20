import React, {useEffect, useState} from "react";
import {Bar} from 'react-chartjs-2'
import axios from 'axios'

const ChartBar = props => {
    const [totalKey,settotalKey] = useState([]);
    const [totalValue,settotalValue] =useState([]);
    const [chart,setChart] =useState({})
    useEffect(()=>{
        axios
            .get(`http://localhost:8080/chart/total/user`)
            .then((res)=>{
                const keykey =[];
                const valuesvalues =[];
                Object.entries(res.data).forEach(([key,value])=>{
                    keykey.push(key)
                    valuesvalues.push(value)
                })
                 settotalKey(keykey);
                 settotalValue(valuesvalues)
            })

            .catch((err)=>{
                throw err;
            })
    },[])
    const chartData = {
        labels: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        datasets: [
            {
                label: '판매량',
                data: totalValue,
                backgroundColor: 'rgba(120,29,29,0.3)',
                borderWidth: 4,
                LineTension: 0
            },
            {
                label: '방문자',
                data: [40, 30, 20, 50, 10, 60, 22, 34],
                backgroundColor: '#FFE4C4'
            },
        ]
    }
    const {chartValue} = props
    const [dataType, setDataType] = useState(chartData)
    const switchCase = (param) =>{
        switch(param){
            case "Sales": return setDataType(chartData)
        }
    }
    switchCase(chartValue)
    return (
        <div>
            <h2>{chartValue}</h2>
            <Bar
                data={chartData}
            />
        </div>
    );
}

export default ChartBar