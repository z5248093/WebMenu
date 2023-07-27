import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserStore from "../store/UserStore";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardList } from "./CardList";
import { getCardDetail } from "../Service";



export default function PayBillItemCard({ rows, id }) {

    return (

        <div style={{ marginTop: 50 }}>
            <div style={{ width: '100%', display: "flex", flexDirection: "column" }}>
                {
                    rows.map((item, idx) => {
                        return <div style={{ width: '100%', display: "flex", flexDirection: "row", marginTop: 20, justifyContent: "space-between" }}><span>{item.name}</span><span>{item.price}</span></div>
                    })
                }
            </div>
        </div>

    );
};
