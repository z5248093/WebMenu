import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';
import {getListAllAssistances} from '../Service';
import axios from 'axios';
 import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
  } from 'mdb-react-ui-kit';


function NeededAssistance() {

    const [assistance, setAssistance] = useState([])

    const loadData = () => {
        getListAllAssistances().then((res) => {
          const { data = [] } = res || {};
          setAssistance(data);
        });
      };
    
      useEffect(() => {
        loadData();
      }, []);

    async function handleSubmit(is) {
        let param = new URLSearchParams();
        param.append("id", is);
        try {
          const response = await axios({
            url: "http://127.0.0.1:8000/completeAssistance",
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
                    <h3 className='row justify-content-center'>NEEDED ASSISTANCE</h3>
                    {assistance.map((item, index) => {
                        return (
                            <div className='row justify-content-center '>
                            <MDBCard style={{width: '100%', maxWidth: '500px', margin: '10px', minHeight: '50px'}}>
                                <MDBCardBody>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <MDBCardTitle>TABLE NUMBER: {item?.table_number}</MDBCardTitle>
                                            <MDBCardText>Time: {item?.create_time}</MDBCardText>
                                        </div>
                                        <div className='col-6 ' >
                                            <button className='submit' style={{width: '100%', borderRadius: '8px', height: '100%', backgroundColor: '#145DA0'}} onClick={() => handleSubmit(item?.id)}>COMPLETED</button>
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
       
        
    );
}

export default NeededAssistance;