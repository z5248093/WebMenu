import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';
 import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
  } from 'mdb-react-ui-kit';
import {allBookings,  deleteBooking} from '../Service';

function AllBookings() {

    const [bookings, setBookings] = useState([])

    const loadData = () => {
        allBookings().then((res) => {
          const { data = [] } = res || {};
          setBookings(data);
        });
      };
    
      useEffect(() => {
        loadData();
      }, []);

    return (
        <div>
            <Navbar/>
            <div class="container">
                <div className='row justify-content-center my-5'>
                    <h3 className='row justify-content-center'>BOOKINGS</h3>
                    
                    {bookings.map((booking, index) => {
                        return (
                            <div className='col-md-auto justify-content-center '>
                            <MDBCard style={{width: '100%', maxWidth: '400px', margin: '10px', minHeight: '100px'}}>
                                <MDBCardBody>
                                    <div className='row justify-content-center '>
                                        <div className='col' style={{minWidth: 'fit-content'}} >
                                            <MDBCardTitle>NAME: {booking?.book_name}</MDBCardTitle>
                                        </div>
                                    
                                    </div>
                                    <div className='row my-2 justify-content-center '>
                                        <div className='col' style={{minWidth: 'fit-content'}}>
                                            <MDBCardText>Date: {booking?.book_date}</MDBCardText>
                                            <MDBCardText>Time: {booking?.book_time}</MDBCardText>
                                        </div>
                                        <div className='col' style={{minWidth: 'fit-content'}}>
                                            <MDBCardText>Party Size: {booking?.party_size}</MDBCardText>
                                            <MDBCardText>Sitting: {booking?.seating_area}</MDBCardText>
                                        </div>
                                        
                                    </div>
                                    <div className='row justify-content-center '>
                                        <button className='submit' style={{width: '100%', borderRadius: '8px', height: '100%', margin:'10px', backgroundColor: '#145DA0'}} onClick={() => {deleteBooking(booking?.id).then(() => {loadData();});}}>Delete</button>
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

export default AllBookings;
