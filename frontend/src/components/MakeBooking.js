import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { addBooking, updateBooking } from "../Service";

let dateArr = ['11:00', '11:30', '12:00', '12:30', '13:00','13:30', '14:00', '14:30', '15:00', '18:00','18:30',  '19:00',  '19:30', '20:00', '20:30']
export default function MakeBooking({ onValueChange, formData, gotoUpcomingBooking }) {


    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: 50 }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 600 }}>Party Size</span>
                    <Select
                        value={formData['party_size'] || ''}
                        onChange={(e) => { onValueChange({ type: 'party_size', value: e.target.value }) }}
                        style={{ height: 40, width: 150 }}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => {
                                return <MenuItem value={item}>{item}</MenuItem>
                            })
                        }

                    </Select>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 600 }}>Book Date</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs} style={{ height: 40, width: 150 }}>
                        <DesktopDatePicker
                            inputFormat="MM/DD/YYYY"
                            value={formData['book_date'] || null}
                            onChange={(e) => {
                                e.format("MM/DD/YYYY")
                                onValueChange({ type: 'book_date', value: e.format("MM/DD/YYYY") })
                            }}
                            renderInput={(params) => <TextField   {...params} style={{ height: 40, width: 150 }} />}
                        />
                    </LocalizationProvider>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 600 }}>Seating Area</span>
                    <Select
                        value={formData['seating_area'] || ''}
                        onChange={(e) => { onValueChange({ type: 'seating_area', value: e.target.value }) }}
                        style={{ height: 40, width: 150 }}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={'outside'}>outside</MenuItem>
                        <MenuItem value={'inside'}>inside</MenuItem>
                    </Select>
                </div>
                {/* <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: 600 }}>Book Time</span>
                        <Select
                            value={formData['book_time'] || ''}
                            onChange={(e) => { onValueChange({ type: 'book_time', value: e.target.value }) }}
                            style={{ height: 40, width: 150 }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </div> */}
            </div>
            <div style={{ fontWeight: 600, fontSize: 26, marginLeft: 27, marginTop: 30 }}>Time</div>

            <div style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: "space-evenly" }}>
                {
                    dateArr.map((item) => {
                        return <div onClick={() => { onValueChange({ type: 'book_time', value: item }) }} style={{ width: 140, border: '1px solid #000', textAlign: "center", borderRadius: 10, height: 60, lineHeight: '60px', marginTop: 10, backgroundColor: item === formData['book_time'] ? '#ccc' : '#fff' }}>{item}</div>
                    })
                }
            </div>
            <div style={{ textAlign: 'right', marginRight: 20, marginTop: 20 }}>
                <Button variant="contained" style={{ background: 'red', marginTop: 20, borderRadius: 20, width: 160 }} onClick={() => {
                    // setBookingPageType(itemVal)
                    let params = {
                        ...formData,
                        type: undefined
                    }
                    if (formData.type === 'add') {
                        addBooking(params).then(() => {
                            alert('Reservation succeeded！')
                        })
                    } else {
                        updateBooking(params).then(() => {
                            gotoUpcomingBooking()
                        })
                    }
                }}>{formData.type === 'add' ? 'submit' : 'update'}</Button>
            </div>
        </>
    );
};
