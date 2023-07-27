import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function NoResult({ pageName, title = 'The shopping cart is empty' }) {
    return <Box
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
            //  border: '1px dashed grey'
        }}
    >
        <Typography variant="h4" gutterBottom>
            {pageName}
        </Typography>
        <h3 style={{
            textAlign: 'center',
            marginTop: 200
        }}>{title} </h3>   </Box>

};
