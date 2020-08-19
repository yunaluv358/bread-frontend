import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card, CardActions,
  CardHeader,
  Divider
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios'
import {useHistory} from "react-router-dom";

const ProductRegistrationTypes = {REQUEST: 'MemberManagement/REQUEST'}
const ProductRegistrationRequest = action => ({type: ProductRegistrationTypes.REQUEST, payload: action.payload})
const ProductRegistrationReducer = ( state, action ) => {
  switch (action.type) {
    case ProductRegistrationTypes.REQUEST: return {...state, payload: action.payload}
    default: return state
  }
}



const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

export const ProductRegistration = () => {
  const [breadName,setBreadName] = useState('')
  const [breadPrice,setBreadPrice] = useState('')
  const [breadImage,setBreadImage] = useState('')
  const [breadDescription,setBreadDescription] = useState('')
  const history = useHistory();

  const onRegistratHandle = e => {
    e.preventDefault();
    const registratData = {
      breadName : breadName,
      breadPrice : breadPrice,
      breadImage : breadImage,
      breadDescription : breadDescription
    }
    axios.post(`http://localhost:8080/bread/product`, registratData)
        .then((res) => {
          alert("상품등록 성공!")
          history.push("/dashboard")
        })
        .catch( error => {
          alert("등록실패 재확인 해주세요")
          throw (error)
        })

  }

  const classes = useStyles();
  return (
      <div>
        <Card className={useStyles} style={{ position: 'relative',bottom:'0%',width :'100%', height :'80%',left:'0%'}}>
          <CardHeader title="상품등록"/>
          <Divider />
          <table border={"1"} style={{width : '100%', height : '50%'}}>
            <tr>
              <th>상품명</th>
              <th><input type="text" onChange={e => setBreadName(e.target.value)} /></th>
            </tr>
            <tr>
              <th>판매가</th>
              <th><input type="text" onChange={e => setBreadPrice(e.target.value)} /></th>
            </tr>
            <tr>
              <th>이미지등록</th>
              <th><input type="text" onChange={e => setBreadImage(e.target.value)} /></th>
            </tr>
            <tr>
              <th>상품설명</th>
              <th><input type="text" onChange={e => setBreadDescription(e.target.value)} /></th>
            </tr>
          </table>
          <input type="button" value={"상품등록"} onClick={onRegistratHandle}/>
          <CardActions className={classes.actions}>
            <Button
                color="primary"
                size="small"
                variant="text"
                href="/productRegistration"
            >
              전체보기<ArrowRightIcon/>
            </Button>
          </CardActions>
        </Card>
      </div>
  );
};



export default ProductRegistration;