import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Box from "@mui/material/Box";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import NoResult from "./NoResultComponent";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MakeBooking from "./MakeBooking";
import Typography from "@mui/material/Typography";
import { deleteBooking, getlistBookingDetails } from "../Service";
const rows = [
  {
    id: 1,
    party_size: 10,
    book_date: "2022/10/2",
    seating_area: "outside",
    book_time: "20:00",
    customer_id: 23,
  },
  {
    id: 1,
    party_size: 10,
    book_date: "2022/10/2",
    seating_area: "outside",
    book_time: "20:00",
    customer_id: 23,
  },
];
const BOOKING_TYPE = {
  MakeBooking: "Make Booking",
  UpcomingBooking: "Upcoming Booking",
};
export default function UpcomingBooking({ editBooking }) {
  let [responseData, setResponseData] = useState([]);
  const setCartListData = (list) => {
    setResponseData(list);
  };
  const loadData = () => {
    getlistBookingDetails().then((res) => {
      const { data = [] } = res || {};
      setCartListData(data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!Array.isArray(responseData) || responseData.length === 0) {
    return <NoResult pageName={"Bookings"} title={"You havent booked yet"} />;
  }
  return (
    <div style={{ marginTop: 60, paddingLeft: 30 }}>
      <Typography variant="h4" gutterBottom>
        Bookings
      </Typography>
      <div>
        {responseData.map((item, idx) => {
          return (
            <div
              style={{
                width: 340,
                height: 120,
                border: "1px solid #000",
                borderRadius: "10px",
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                paddingLeft: 10,
                paddingTop: 10,
                position: "relative",
              }}
            >
              <span style={{ fontWeight: 600 }}>
                Party Size: {item.party_size}
              </span>
              <span style={{ fontWeight: 600 }}>Date: {item.book_date}</span>
              <span style={{ fontWeight: 600 }}>Time: {item.book_time}</span>
              <span style={{ fontWeight: 600 }}>
                Seating Area: {item.seating_area}
              </span>
              <Button
                variant="contained"
                style={{
                  background: "red",
                  width: 80,
                  height: 30,
                  bottom: 10,
                  right: 10,
                  position: "absolute",
                  borderRadius: 10,
                }}
                onClick={() => {
                  deleteBooking(item.id).then(() => {
                    loadData();
                  });
                }}
              >
                CanCel
              </Button>
              <ModeEditIcon
                style={{ bottom: 50, right: 30, position: "absolute" }}
                onClick={() => {
                  editBooking({ ...item });
                }}
              ></ModeEditIcon>
            </div>
          );
        })}
      </div>
    </div>
  );
}
