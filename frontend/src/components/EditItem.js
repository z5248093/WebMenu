import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import MenuStore from '../store/MenuStore';
import 'react-dropdown/style.css';
import axios from 'axios';
import Navbar from './Navbar'

function EditItem() {

const [menu, setMenu] = useState(MenuStore.getMenuDict())

  let pathname = window.location.pathname;
  let itemInfo = pathname.split('/');
  let catagoery = itemInfo[2]
  let id = itemInfo[3]
  let cat = menu?.[catagoery]
  const item = cat?.items?.find(x => x.id == id);
  
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [cost, setCost] = useState(null);
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [offer_status, setOffer_status] = useState(item?.offer_status);
  const [newCategory, setNewCategory] = useState(cat?.id);


  const handleSubmit = async (event) => {
    event.preventDefault();
    let param = new URLSearchParams();
    param.append("id", id);
    param.append("name", title ? title : item?.title);
    param.append("price", cost ? cost : item?.cost);
    param.append("image", image ? image : item?.image);
    param.append("description", description ? description : item?.description)
    param.append("ingredients", ingredients ? ingredients : item?.ingredients)
    param.append("category_id", newCategory);
    param.append("offer_status", offer_status ? 1 : 0);
    try {
      const response = await axios({
        url: "http://127.0.0.1:8000/updateItems",
        method: "post",
        data: param,
      })
      console.log(JSON.stringify(response?.data));
      window.open("/edit-menu", "_self");
    } catch (err) {
      console.log("wrong");
    }
  };

  const handleSubmitDelete = async (event) => {
    event.preventDefault();
    let param = new URLSearchParams();
    param.append("id", id);
    try {
      const response = await axios({
        url: "http://127.0.0.1:8000/deleteItems",
        method: "post",
        data: param,
      })
      console.log(JSON.stringify(response?.data));
      window.open("/edit-menu", "_self");
    } catch (err) {
      console.log("wrong");
    }
  };


  return (
    <div>
    <Navbar/>
    <div className="row" style={{margin: "10vh"}}>
        <div className='col d-flex justify-content-start mx-5'>
            <div className='col'>
                <div className='col'>
                    <h1>EDIT {item?.title?.toUpperCase()}</h1>
                </div>
                <div className='col'>
                    <form onSubmit={handleSubmit}>
                        <label>Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={item?.title}
                            value={title}
                        />
                        <label>Description</label>
                        <textarea
                            id="description"
                            name="description"
                            type="description"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={item?.description}
                            value={description}
                        />
                        <label>Ingredients</label>
                        <textarea
                            id="Ingredients"
                            onChange={(e) => setIngredients(e.target.value)}
                            placeholder={item?.ingredients}
                            value={ingredients}
                        />
                        <label>Cost</label>
                        <input
                            id="cost"
                            name="cost"
                            type="float"
                            onChange={(e) => setCost(e.target.value)}
                            placeholder={item?.cost}
                            value={cost}
                        />
                        <label>Image URL</label>
                        <textarea
                            id="image-url"
                            name="image-url"
                            type="image-url"
                            onChange={(e) => setImage(e.target.value)}
                            placeholder={item?.image}
                            value={image}
                        />
                        <label>Item catagoery</label>
                        <select name="select" onChange={(e) => setNewCategory(e.target.value)}>
                        {menu.map((dict, index) => {
                          return <option value={dict?.id} selected={newCategory === dict?.id}>{dict?.category}</option>;
                          
                        })}
                           
                        </select>
                        <div>
                            <label id="checkbox_id">Item currently offered 
                                <input
                                    type="checkbox"
                                    id="checkbox_id"
                                    checked={offer_status}
                                    onChange={(e) => setOffer_status(e.target.checked)}
                                />
                            </label>
                        </div>
                        <div className='my-4'>
                            <input className='submit' type="submit" />
                            <button className='delete' onClick={handleSubmitDelete}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
            
            
        </div>
        <div className='col d-flex justify-content-center mx-5'>
            <div className='col'>
                <div className='col'>
                    <h2>PREVIEW</h2>
                </div>
                <div className='col'>
                    <Preview title={title ? title : item?.title} cost={cost ? cost : item?.cost} description={description ? description : item?.description} image={image ? image : item?.image} ingredients={ingredients ? ingredients : item?.ingredients} status={offer_status}/>  
                </div>
            </div>
        </div>
    </div>
    </div>
  );

 
}

function Preview(props) {
    return (
        <MDBCard style={{filter: props.status ? '' : 'grayscale(100%)', backgroundColor: '#282828', color: '#F5E9D4'}}>
            <MDBCardImage style={{maxHeight: '500px', objectFit: 'cover'}} src={props.image} position='top' alt='...' />
            <MDBCardBody>
                <MDBCardTitle style={{color: '#F5E9D4'}}>{props.title} ${props.cost}</MDBCardTitle>
                <MDBCardText>{props.description}</MDBCardText>
                {props.status ? <MDBCardText style={{fontSize: '12px'}}>Ingredients: {props.ingredients}</MDBCardText> 
                : <MDBCardText style={{fontSize: '20px'}}>OUT OF STOCK</MDBCardText>}
            </MDBCardBody>
        </MDBCard>
    )
  }

export {EditItem, Preview};