import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import MenuStore from '../store/MenuStore';
import UserStore from '../store/UserStore';
import axios from 'axios';

function ViewItem() {

  const [menu, setMenu] = useState(MenuStore.getMenuDict())

  let pathname = window.location.pathname;
  let itemInfo = pathname.split('/');
  let catagoery = itemInfo[2]
  let id = itemInfo[3]
  let cat = menu?.[catagoery]
  const item = cat?.items?.find(x => x.id == id);

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        url: `http://127.0.0.1:8000/cart/add/${item?.id}/`,
        method: "GET",
      })
      console.log(JSON.stringify(response?.data));
      alert("Successfully added to order")
    } catch (err) {
      console.log("wrong");
      alert("There has been an issue adding this to your order")
    }
  };

  return (
    <div className='row mx-5 my-5'>
      <div className='col'>
        <img style={{filter: item?.offer_status ? '' : 'grayscale(100%)'}} className="view-item-image" src={item?.image}></img> 
      </div >
      <div className='col my-4'>
        <MDBCard style={{backgroundColor: '#282828', color: '#F5E9D4'}} >
            <MDBCardBody>
                <MDBCardTitle style={{color: '#F5E9D4'}}>${item?.cost} {item?.title}</MDBCardTitle>
                <MDBCardText>{item?.description}</MDBCardText>
                <MDBCardText style={{fontSize: '12px'}}>Ingredients: {item?.ingredients}</MDBCardText>
                {item?.offer_status ? <button className='submit order-btn' style={{borderRadius: '8px'}} onClick={handleSubmit}>Add To Order</button> : <MDBCardText style={{fontSize: '22px'}}><b>OUT OF STOCK</b></MDBCardText>}
            </MDBCardBody>
        </MDBCard>
      </div>
    </div>
  );
}

export default ViewItem;