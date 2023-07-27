import React from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addCardQuantity, cartItemClear, removeCardQuantity } from "../Service";
export const Card = (props) => {
    const { food_id: id, image, name, price, quantity, setCartListData } = props || {}
    const handleClick = (type) => {
        if (type === 'remove') {
            if (quantity === 1) {
                cartItemClear(id).then((res) => {
                    typeof setCartListData === 'function' && setCartListData(res?.data || [])
                })
            } else {
                removeCardQuantity(id).then((res) => {
                    typeof setCartListData === 'function' && setCartListData(res?.data || [])
                })
            }

        } else {
            addCardQuantity(id).then((res) => {
                typeof setCartListData === 'function' && setCartListData(res?.data || [])
            })
        }
    }
    return <div style={{ width: 900, height: 180, border: '2px solid #ccc', display: "flex", alignItems: "center", borderRadius: 10, marginTop: 20 }}>
        <div style={{
            marginLeft: 13
        }}>
            <img src={image} style={{ width: 250, height: 150, borderRadius: 5, objectFit: 'cover' }}></img>
        </div>
        <div style={{
            display: "flex",
            flexDirection: 'column',
            marginLeft: 10,
            justifyContent: "space-around",
            height: '100%',
            width: 300
        }}>
            <span style={{ fontSize: 24, fontWeight: 600 }}>{name}</span>
            <span style={{ color: 'red' }}>$:{price}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 150 }}>
            <RemoveIcon onClick={() => {
                handleClick('remove')
            }} style={{ fontSize: 30 }}></RemoveIcon>
            <span style={{ fontSize: 20, fontWeight: 600, margin: '0 15px 0 15px' }}>
                {
                    quantity
                }
            </span>

            <AddIcon onClick={() => {
                handleClick('add')
            }} style={{ fontSize: 30 }}></AddIcon>
        </div>
    </div>

}
