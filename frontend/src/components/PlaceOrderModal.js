import { Button, TextField } from "@mui/material";
import { message } from "antd";
import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export function PlaceOrderModal(props) {
    const { onClose, selectedValue, open, onSubmit, buttonStatus, price } = props;
    const [inpVal, setInpVal] = useState(0)
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <div style={{ width: 400, height: 190, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <span>({buttonStatus})</span>
                <span>Cost:{price}</span>
                {buttonStatus === 'Order to Table' && <TextField
                    id="outlined-number"
                    label="Table Number"
                    value={inpVal}
                    type="number"
                    style={{marginTop:10}}
                    onChange={(e) => {
                        setInpVal(e.target.value)
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />}
                <Button variant="contained" style={{ background: 'red', marginTop: 20, width: 200 }} onClick={() => {
                    onSubmit(buttonStatus === 'Order to Table' ? +inpVal : undefined)
                }}>CONFIRM ORDER</Button>
            </div>
        </Dialog>
    );
}

