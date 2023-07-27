import { Button, TextField } from "@mui/material";
import { message } from "antd";
import React, { useState, useEffect } from "react";
import { addAssistance, getOrder, orderStatusChange } from "../Service";
import { PendingRequest } from "./PendingRequest";
import { ServiceRequest } from "./ServiceRequest";
const BOOKING_TYPE = {
    ServiceRequest: 'Service Request',
    PendingRequest: 'Pending Request'
}
export const NeedAssistance = () => {
    const [activePage, setActivePage] = useState(BOOKING_TYPE.ServiceRequest)
    return <div style={{ border: '2px solid #000', width: 700, height: 500, borderRadius: 10, position: 'relative', margin: '0 auto', marginTop: '90px' }}>
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
        <div style={{ display: "flex", width: '100%', justifyContent: "space-evenly", marginTop: 20, display: "flex", flexDirection: 'column', alignItems: "center" }}>
            {
                activePage === BOOKING_TYPE.ServiceRequest && <ServiceRequest></ServiceRequest>
            }
            {
                activePage === BOOKING_TYPE.PendingRequest && <PendingRequest></PendingRequest>
            }
        </div>
    </div>
}