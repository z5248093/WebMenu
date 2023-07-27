import React, { useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MakeBooking from "./MakeBooking";
import UpcomingBooking from "./UpcomingBooking";

const BOOKING_TYPE = {
    MakeBooking: 'Make Booking',
    UpcomingBooking: 'Upcoming Booking'
}
const defaultFormData = { party_size: 1, seating_area: 'outside', book_time: '', book_date: '2022/11/1',type:'add' }
export default function Booking() {
    const [formData, setFormData] = useState(defaultFormData)
    let [bookingPageType, setBookingPageType] = useState(BOOKING_TYPE.MakeBooking)
    
    const editBooking = ({ party_size, seating_area, book_time, book_date,id }) => {
        setFormData({ party_size, seating_area, book_time, book_date, type: 'edit',id });
        setBookingPageType(BOOKING_TYPE.MakeBooking)
    }
    const gotoUpcomingBooking = ()=>{
        setFormData(defaultFormData);
        setBookingPageType(BOOKING_TYPE.UpcomingBooking)
    }
    const onValueChange = ({ type, value }) => {
        let newValue = JSON.parse(JSON.stringify(formData))
        newValue[type] = value;
        setFormData(newValue)
    }

    return (
        <Box
            sx={{
                width: 800,
                height: "auto",
                m: "auto",
                p: 2,
            }}
        >

            <div style={{ border: '2px solid #000', width: 800, minHeight: 500, borderRadius: 10, position: 'relative', marginTop: '60px' }}>
                <div style={{ position: 'absolute', top: '-50px' }}>
                    {
                        Object.keys(BOOKING_TYPE).map((item, idx) => {
                            let itemVal = BOOKING_TYPE[item]
                            return <Button variant="contained" style={{ background: itemVal === bookingPageType ? '#000' : '#ccc', marginTop: 20, borderRadius: 20 }} onClick={() => {
                                setFormData(defaultFormData)
                                setBookingPageType(itemVal)
                            }}>{itemVal}</Button>
                        })
                    }
                </div>
                {
                    bookingPageType === BOOKING_TYPE.MakeBooking && <MakeBooking gotoUpcomingBooking={gotoUpcomingBooking} onValueChange={onValueChange} formData={formData}></MakeBooking>
                }
                {
                    bookingPageType === BOOKING_TYPE.UpcomingBooking && <UpcomingBooking editBooking={editBooking}/>
                }
            </div>
        </Box>
    );
};
