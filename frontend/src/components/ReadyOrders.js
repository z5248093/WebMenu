import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Box from "@mui/material/Box";
import Navbar from './Navbar';
import { readyOrders } from '../Service';
import axios
 from 'axios';
 import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
  } from 'mdb-react-ui-kit';


function ReadyOrders() {

    const [orders, setOrder] = useState([])

    const loadData = () => {
        readyOrders().then((res) => {
          const { data = [] } = res || {};
          setOrder(data);
        });
      };
    
      useEffect(() => {
        loadData();
      }, []);

  
    async function handleSubmit(order, product) {
        let param = new URLSearchParams();
        param.append("order_id", order);
        param.append("product_id", product);
        try {
          const response = await axios({
            url: "http://127.0.0.1:8000/order/status/1to2/",
            method: "post",
            data: param,
          })
          console.log(JSON.stringify(response?.data));
          window.location.reload();
        } catch (err) {
          console.log("wrong");
        }
      };

 
    return (
        <div>
            <Navbar/>
            <div class="container">
                <div className='row justify-content-center my-5'>
                    <h3 className='row justify-content-center'>READY ITEMS</h3>
                    {true ?
                      <div className='row justify-content-center'>
                        {Object.keys(orders)?.map((order, index) => {
                          console.log(orders?.[order])
                            return (
                              <MDBCard style={{width: '100%', maxWidth: '900px', margin: '10px', minHeight: '130px', padding: '20px'}}>
                                <MDBCardTitle>ORDER NUMBER: {order}</MDBCardTitle>
                                {orders?.[order]?.map((item, index) => {
                                  return (
                                    <div className='row justify-content-center '>
                                    
                                        <MDBCardBody style={{marginLeft: '10px', marginRight: '10px', border: '1px solid black'}}>
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <MDBCardText>TABLE NUMBER: {item?.table_number}</MDBCardText>
                                                    <MDBCardText>{item?.product_name}</MDBCardText>
                                                    <MDBCardText>Quantity: {item?.quantity}</MDBCardText>
                                                </div>
                                                <div className='col-6 ' >
                                                    <button className='submit' style={{minWidth: '100%', borderRadius: '8px', height: '40%',  backgroundColor: '#145DA0'}} onClick={() => handleSubmit(order, item?.product_id)}>SERVED</button>
                                                </div>
                                            </div>
                                            
                                        </MDBCardBody>
                                    
                                    </div>
                                  )
                                })}
                             </MDBCard>
                            )
                        })}
                      </div>
                    :
                    <h4 className='row justify-content-center my-5'>No items currently ready</h4>
                    }
                </div>
            </div>
        </div>
       
        
    );
}

export default ReadyOrders;



