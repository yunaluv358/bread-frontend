import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {  Grid } from '@material-ui/core';
import {Chart} from "../chart/Chart";
import {Shipping} from "../shipping/Shipping";
import {MemberManagement} from "./MemberManagement";
import ProductRegistration from "./ProductRegistration";
import {Map} from "../vendor/map";
import UserList from "./UserList";



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={5}
      >
        <Grid style={{position:'relative',left:"0%",width:'30%',height:'100%'}}
        >
          <Chart />
        </Grid>
        <Grid style={{position:'relative',left:"33%",width:'40%',height:'1000px'}}
        >
          <Map />
        </Grid >
        <Grid style={{position:'relative',left:"-38%",width:'30%',height:'100%',top:'0px'}}
        >
          <Shipping />
        </Grid>

        <Grid style={{position:"relative",top:'-650px',width:'30%',height:'30%'}}
        >
          <UserList />
        </Grid>

        <Grid style={{position:'relative',left:"2%",width:'30%',height:'22%',top:'-620px'}}
        >
          <ProductRegistration />
        </Grid>

      </Grid>
    </div>
  );
};

export default Dashboard;
