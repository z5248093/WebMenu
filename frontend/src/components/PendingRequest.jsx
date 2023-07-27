import { Button, TextField } from "@mui/material";
import { message } from "antd";
import React, { useState, useEffect } from "react";
import { addAssistance, deleteAssistance, getListAssistances, getOrder, orderStatusChange } from "../Service";
import { ServiceRequest } from "./ServiceRequest";

const mock = [{
    "assistance_id": '12',
    "table_number": '20',
    "create_time": 'str',
    "is_completed": true

}, {
    "assistance_id": '13',
    "table_number": '21',
    "create_time": 'str',
    "is_completed": true

}, {
    "assistance_id": '14',
    "table_number": '22',
    "create_time": 'str',
    "is_completed": false

}, {
    "assistance_id": '14',
    "table_number": '22',
    "create_time": 'str',
    "is_completed": false

}, {
    "assistance_id": '14',
    "table_number": '22',
    "create_time": 'str',
    "is_completed": false

}, {
    "assistance_id": '14',
    "table_number": '22',
    "create_time": 'str',
    "is_completed": false

}, {
    "assistance_id": '14',
    "table_number": '22',
    "create_time": 'str',
    "is_completed": false

}, {
    "assistance_id": '14',
    "table_number": '22',
    "create_time": 'str',
    "is_completed": false

}, {
    "assistance_id": '14',
    "table_number": '22',
    "create_time": 'str',
    "is_completed": false

}]
const keys = ['Table Number', 'Create Time', 'STATUS']
export const PendingRequest = () => {
    const [listData, setListData] = useState([])
    const onLoadData = () => {
        getListAssistances().then(({ data }) => {
            setListData(data)
        })
    }
    useEffect(() => {
        onLoadData()
    }, [])
    return <div style={{ width: '100%', height: 470 }}>
        <h1>Requests</h1>
        <div style={{ width: '100%', height: 400, overflow: 'scroll' }}>
            <div style={{ width: '100%', display: "flex", flexDirection: 'row', justifyContent: 'space-around', borderBottom: '1px solid #ccc' }}>
                {
                    keys.map((item, idx) => {
                        return <h4 style={{ flex: '1', textAlign: "center" }}>{item}</h4>
                    })
                }
            </div>
            <div style={{ width: '100%', display: "flex", flexDirection: "column", height: 350, overflow: 'scroll' }}>
                {
                    Array.isArray(listData) && listData.map((item, idx) => {
                        return <div style={{ display: "flex", flexDirection: "row", marginTop: 10, justifyContent: "space-around", width: '100%', borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
                            <span style={{ flex: 1, textAlign: "center" }}>{item.table_number}</span>
                            <span style={{ flex: 1, textAlign: "center" }}> {item.create_time}</span>
                            {
                                item.is_completed != true ? <div style={{ flex: 1, textAlign: "center" }}>
                                    <Button variant="contained" style={{ background: 'red', borderRadius: 20, height: 25, width: 100 }} onClick={() => {
                                        deleteAssistance(item.assistance_id).then(() => {
                                            message.success('Cancellation succeeded！')
                                            onLoadData()
                                        })
                                    }}>Cancel</Button>
                                </div> : <span style={{ flex: 1, textAlign: "center" }}>Completed</span>
                            }
                        </div>
                    })
                }
            </div>
            
        </div>
    </div>
}