import React, { useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import Box from "@mui/material/Box";
import { Orders } from "./Orders";
import { UpdataItem } from "./UpdataItem";
import logo from '../images/logo2.png'
import Navbar from "./Navbar";
const BUTTON_STATUS = {
  updateItems: 'Update Items',
  orders: 'Orders'
}
export default function KitchenPageEntrance() {
  let [buttonStatus, setButtonStatus] = useState();

  return (
    <Box
      sx={{
        width: '100%',
        height: "auto",
        m: "auto",
      }}
    >
       
      <Navbar></Navbar>
      {
        buttonStatus === BUTTON_STATUS.orders && <Orders />
      }
      {
        buttonStatus === BUTTON_STATUS.updateItems && <UpdataItem></UpdataItem>
      }
      {
         !buttonStatus && <>
               <div style={{ display:"flex",flexDirection:"row",justifyContent:'space-evenly',alignItems:'center',marginTop:180 }}>
        {
          Object.keys(BUTTON_STATUS).map((item,idx)=>{
            return <div onClick={()=>{
              setButtonStatus(BUTTON_STATUS[item])
            }} style={{width:300,height:150,backgroundColor:'rgb(146 143 143)',borderRadius:6,textAlign:"center",lineHeight:'150px',fontSize:30,fontWeight:500}}>{BUTTON_STATUS[item]}</div>
          })
        }
      </div>
   
      
      </>
      }

    </Box>
  );
};
