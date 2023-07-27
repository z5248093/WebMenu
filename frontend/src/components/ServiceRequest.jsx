import { Button, TextField } from "@mui/material";
import { message } from "antd";
import React, { useState, useEffect } from "react";
import { addAssistance, getOrder, orderStatusChange } from "../Service";
export const ServiceRequest = ()=>{
    const [inpVal,setInpVal] = useState('')
    return <>
    <div style={{width:'65%',height:100,fontWeight:600,fontSize:22,marginTop:30}}>
    Please enter you table number below to
submit a service request and a waiter will
be with you as soon as possible
    </div>
    <div style={{marginTop:50,display:"flex",flexDirection:'column',alignItems:"center"}}>
  
      <TextField
       id="outlined-number"
       label="Table Number"
       value={inpVal} 
       type="number"
       onChange={(e)=>{
         setInpVal(e.target.value)
       }}
       InputLabelProps={{
         shrink: true,
       }}
     />
      
    <Button variant="contained" style={{ background: 'red', marginTop: 20, borderRadius: 20,width:200 }} onClick={() => {
     addAssistance(inpVal).then(()=>{
         message.success('Service Request Success!')
         setInpVal(0)
     })
           }}>Submit</Button>
    </div>
    </>  
}