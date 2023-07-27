import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserStore from "../store/UserStore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardList } from "./CardList";
import { getCardDetail, getOrderHistory } from "../Service";
import NoResult from "./NoResultComponent";
const tmp = [];

const columns = [
    {
        field: "image",
        headerName: "Image",
        width: 150,

        editable: true,
        renderCell: (params) => (
            <img style={{ width: "auto", height: "100%" }} src={params.value} />
        ),
    },
    {
        field: "name",
        headerName: "Name",
        width: 150,

        editable: true,
    },
    {
        field: "quantity",
        headerName: "Quantity",
        width: 150,
    },
    {
        field: "price",
        headerName: "Price",
        width: 150,
    },
];
// const rows = []
function setRows(responseData) {
    var dict = responseData
    var arr = [];

    for (var key in dict) {
        rows.push(dict[key]);
    }
    console.log("setrows")
    // console.log(rows)
};
const rows = [
    {
        'product_id': 12,
        'product_name': "Lasagna",
        'price': 18,
        'quantity': 1,
        'total_price': 26.5,
        'time': '2020-09-10'
    },
    {
        'product_id': 8,
        'product_name': "Strawberry Milkshake",
        'price': 8.5,
        'quantity': 1,
        'total_price': 26.5,
        'time': '2020-09-10'
    }, {
        'product_id': 12,
        'product_name': "Lasagna",
        'price': 18,
        'quantity': 1,
        'total_price': 26.5,
        'time': '2020-09-10'
    },
    {
        'product_id': 8,
        'product_name': "Strawberry Milkshake",
        'price': 8.5,
        'quantity': 1,
        'total_price': 26.5,
        'time': '2020-09-10'
    }, {
        'product_id': 12,
        'product_name': "Lasagna",
        'price': 18,
        'quantity': 1,
        'total_price': 26.5,
        'time': '2020-09-10'
    },
    {
        'product_id': 8,
        'product_name': "Strawberry Milkshake",
        'price': 8.5,
        'quantity': 1,
        'total_price': 26.5,
        'time': '2020-09-10'
    }, {
        'product_id': 12,
        'product_name': "Lasagna",
        'price': 18,
        'quantity': 1,
        'total_price': 26.5,
        'time': '2020-09-10'
    },
    {
        'product_id': 8,
        'product_name': "Strawberry Milkshake",
        'price': 8.5,
        'quantity': 1,
        'total_price': 26.5,
        'time': '2020-09-10'
    }, {
        'product_id': 12,
        'product_name': "Lasagna",
        'price': 18,
        'quantity': 1,
        'total_price': 26.5,
        'time': '2020-09-10'
    },
    {
        'product_id': 8,
        'product_name': "Strawberry Milkshake",
        'price': 8.5,
        'quantity': 1,
        'total_price': 26.5,
        'time': '2020-09-10'
    }
];

const keys = ['Product Name','Quantity','Price','Order Time']

export default function OrderHistory() {
    let [responseData, setResponseData] = useState([]);
    const setCartListData = (list) => {
        setResponseData(list)
    }
    const loadData = () => {
        getOrderHistory().then((res) => {
            console.log('res', res)
            const { data = [] } = res || {}
            setCartListData(data)
        })
    }
    useEffect(() => {
        loadData()
    }, [])
    if (!Array.isArray(responseData) || responseData.length === 0) {
        return <NoResult pageName={'Order History'} title={'The Order History is empty'} />
    }
    return (
        <Box
            sx={{
                width: 800,
                height: "auto",
                m: "auto",
                // backgroundColor: "primary.dark",
                // "&:hover": {
                //   backgroundColor: "primary.main",
                //   opacity: [0.9, 0.8, 0.7],
                // },
                p: 2,
            }}
        >
           
            <div style={{ width: '100%', display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                <div style={{ width: 800,border:'2px solid #000',borderRadius:10 }}>
                <Typography variant="h4" gutterBottom style={{ fontWeight: 600,marginLeft:30,marginTop:20 }}>
                Order History
            </Typography>
            <div style={{ width: 800, display: "flex", flexDirection: 'row', justifyContent: 'space-around',borderBottom:'1px solid #ccc',marginTop:20 }}>
                        {
                            keys.map((item, idx) => {
                                return <h5 style={{ flex: '1', textAlign: "center" }}>{item}</h5>
                            })
                        }
                    </div>
                    <div style={{ width: '100%', display: "flex", flexDirection: "column",height:350,overflow:'scroll' }}>
                        {
                            responseData.map((item, idx) => {
                                return <div style={{ display: "flex", flexDirection: "row", marginTop: 10, justifyContent: "space-around", width: '100%',borderBottom:'1px solid #ccc',paddingBottom:10 }}>
                                    <span style={{ flex: 1 ,textAlign: "center"}}>{item.product_name}</span>
                                    <span style={{ flex: 1, textAlign: "center" }}>{item.quantity}</span>
                                    <span style={{ flex: 1, textAlign: "center",color: 'red' }}>$ {item.price}</span>

                                    <span style={{ flex: 1, textAlign: "center" }}>{item.time}</span>
                                </div>
                            })
                        }
                    </div>


                </div>
            </div>

        </Box>
    );
};
