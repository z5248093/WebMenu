import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getOrder, orderStatusChange } from "../Service";
import Navbar from "./Navbar";
const BOOKING_TYPE = {
    orders: 'orders',
    completedOrders: 'completed orders'
}
const requestParams = {
    [BOOKING_TYPE.orders]:0,
    [BOOKING_TYPE.completedOrders]:1,
}
const mock = [{ 'product_id': 1,
'product_name': 'str',
'quantity': 'int',  
'status': 'str', 
'order_id': 'int',                   
'create_at': 'str',
},{ 'product_id': 2,
'product_name': 'str',
'quantity': 'int',  
'status': 'str', 
'order_id': 'int',                   
'create_at': 'str',
},{ 'product_id': 3,
'product_name': 'str',
'quantity': 'int',  
'status': 'str', 
'order_id': 'int',                   
'create_at': 'str',
}]
const keys = ['PRODUCT NUMBER','ORDER NUMBER','ITEM','QUANTITY','STATUS']
export const Orders = ()=>{
  const [activePage,setActivePage] = useState(BOOKING_TYPE.orders)
  const [listData,setListData] = useState(mock)
  const onLoadData = ()=>{
getOrder(requestParams[activePage]).then(({data})=>{
    setListData(data)
})
}
useEffect(()=>{
    onLoadData()
},[activePage])

  return (
    <div>
        <Navbar></Navbar>
  <div style={{ border: '2px solid #000', width: 800, height: 500, borderRadius: 10, position: 'relative',margin: '0 auto',marginTop: '90px' }}>
  <div style={{ position: 'absolute', top: '-50px' }}>
      {
          Object.keys(BOOKING_TYPE).map((item, idx) => {
              let itemVal = BOOKING_TYPE[item]
              return <Button variant="contained" style={{ background: itemVal === activePage ? '#000' : '#ccc', marginTop: 20, borderRadius: 20 }} onClick={() => {
                  setActivePage(itemVal)
              }}>{itemVal}</Button>
          })
      }
     
  </div>
  <div style={{ display:"flex",width:'100%',justifyContent:"space-evenly",marginTop:20 }}>
       {
        keys.map((item)=>{
            return <h6 style={{width:130,textAlign:'center'}}>{item}</h6>
        })
       }
    </div>
    <div style={{height:'446px',overflow:'scroll',width:'100%',borderTop:'1px solid #ccc'}}>
       {
        listData.map((item,idx)=>{
            return <div style={{ display:"flex",width:'100%',justifyContent:"space-evenly",borderBottom:'1px solid #ccc',padding:'20px 0 20px 0',position:"relative"}}>
                <div style={{width:130,textAlign:'center'}}>{item.product_id}</div>
                <div style={{width:130,textAlign:'center'}}>{item.order_id}</div>
                <div style={{width:130,textAlign:'center'}}>{item.product_name}</div>
                <div style={{width:130,textAlign:'center'}}>{item.quantity}</div>
              
                {
                    activePage !== BOOKING_TYPE.completedOrders ? <div>
                    <Button ariant="contained"  style={{ width:100,height:30,backgroundColor:'#000',color:'#fff'}} onClick={()=>{
                        orderStatusChange({
                            product_id:item?.product_id,
                            order_id:item?.order_id
                        }).then(()=>{
                            onLoadData()
                        })
                    }}>completed</Button>
                </div> :  <div style={{width:100,textAlign:'center'}}>{item.status}</div>
                }
                
            </div>
        })
       }
    </div>
</div>
</div>
  )
}