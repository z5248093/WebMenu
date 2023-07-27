import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardList } from "./CardList";
import { cardClear, cartOrder, getCardDetail } from "../Service";
import { PlaceOrderModal } from "./PlaceOrderModal";
import NoResult from "./NoResultComponent";

const rows = []


const BUTTON_STATUS = {
  pickupOrder: 'Pickup Order',
  OrderToTable: 'Order to Table'
}
export default function Cart() {
  let [responseData, setResponseData] = useState(rows);
  let [buttonStatus, setButtonStatus] = useState(BUTTON_STATUS.OrderToTable);
  let [isOpen, setIsOpen] = useState(false)
  const setCartListData = (list) => {
    setResponseData(list)
  }
  const loadData = () => {
    getCardDetail().then((res) => {
      console.log('res', res)
      const { data = [] } = res || {}
      setCartListData(data)
    })
  }
  useEffect(() => {
    loadData()
  }, [])
  if (!Array.isArray(responseData) || responseData.length === 0) {
    return <NoResult pageName={'Shopping Cart'} title={'The shopping cart is empty'} />
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
        //  border: '1px dashed grey'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <div style={{ display: "flex", height: "100%", maxWidth: "80%" }}>
        <CardList setCartListData={setCartListData} listData={responseData} />
      </div>
      <Typography variant="h5" gutterBottom style={{ fontWeight: 600, marginTop: 30 }}>
        Toal Cost:${responseData[0]?.total_price || 0}
      </Typography>
      <div style={{ display: "flex", width: '100%', flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
        <div>
          {
            Object.keys(BUTTON_STATUS).map((itemKey, idx) => {
              let buttonItem = BUTTON_STATUS[itemKey];
              return <Button onClick={() => {
                setButtonStatus(buttonItem)
              }} variant="contained" style={{ background: buttonStatus === buttonItem ? '#000' : '#ccc', marginTop: 20, color: '#fff', marginRight: 20 }}>{buttonItem}</Button>
            })
          }
        </div>
        <Button variant="contained" style={{ background: 'red', marginTop: 20 }} onClick={() => {
          setIsOpen(true)
        }}>Place Order</Button>
      </div>

      <PlaceOrderModal buttonStatus={buttonStatus} price={responseData[0]?.total_price || 0} open={isOpen} onClose={() => { setIsOpen(false) }} onSubmit={(id) => {
        cartOrder(id).then((res) => {
          setIsOpen(false)
          cardClear().then(() => {
            loadData()
          })
        })
      }}></PlaceOrderModal>
    </Box>
  );
};
