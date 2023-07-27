import React from "react";
import { Card } from "./Card";
export const CardList = ({ listData = [], setCartListData }) => {
    return <div>
        {
            Array.isArray(listData) && listData.map(item => <Card setCartListData={setCartListData} {...item} />)
        }

    </div>

}
