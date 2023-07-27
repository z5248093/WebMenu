import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getOrder, getSuppliesList, orderStatusChange, suppliesStatusChange } from "../Service";
import Navbar from "./Navbar";
const BOOKING_TYPE = {
    stopSupply: 'stop supply',
    restoreSupply: 'restore supply'
}
const requestParams = {
    [BOOKING_TYPE.orders]:1,
    [BOOKING_TYPE.completedOrders]:0,
}
const mock = [{item_name: 'str',
    item_id:'123',
    picture :'https://www.thewholesomedish.com/wp-content/uploads/2018/07/Best-Lasagna-550.jpg',
    },{item_name: 'str',
    item_id:'123',
    picture :'https://www.thewholesomedish.com/wp-content/uploads/2018/07/Best-Lasagna-550.jpg',
    },{item_name: 'str',
    item_id:'123',
    picture :'https://www.thewholesomedish.com/wp-content/uploads/2018/07/Best-Lasagna-550.jpg',
    }]
const keys = ['TABLE NUMBER','ORDER NUMBER','ITEM','QUANTITY','STATUS']
export const UpdataItem = ()=>{
  const [activePage,setActivePage] = useState(BOOKING_TYPE.stopSupply)
  const [listData,setListData] = useState(mock)
  const onLoadData = ()=>{
    getSuppliesList(activePage === BOOKING_TYPE.stopSupply ? 1 : 2).then(({data})=>{
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
            </div>
            <div style={{height:'446px',overflow:'scroll',width:'100%',paddingLeft:40}}>
                <h1>Items</h1>
            {
                listData.map((item,idx)=>{
                    return <div style={{width:500,height:150,border:'2px solid #ccc',borderRadius:10,display:"flex",flexDirection:"row",alignItems:"center",position:'relative',overflow:'hidden',marginBottom:10}}>
                        < img src={item.picture} style={{width:200,height:150}}></img>
                        <div style={{ display:"flex",flexDirection:"column",marginLeft:10  }}>
                            <span>Item Name: {item.item_name}</span>
                            <span>Item Id: {item.item_id}</span>
                        </div>
                        <Button variant="contained" style={{ background:'red', marginTop: 20, borderRadius: 20,position:"absolute",bottom:'0',right:0 }} onClick={() => {
                        //   setActivePage(itemVal)
                        suppliesStatusChange(activePage !== BOOKING_TYPE.stopSupply ? 1 : 2,item.item_id).then(()=>{
                            onLoadData()
                        })
                    }}>
                        {
                            activePage !== BOOKING_TYPE.stopSupply ? 'restore supply' : 'off the shelf'
                        }
                        </Button>
                    </div>
                })
            }
            </div>
        </div>
    </div>
  )
}
