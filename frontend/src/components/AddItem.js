import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MenuStore from '../store/MenuStore';
import { Preview } from './EditItem';
import axios from 'axios';
import Navbar from './Navbar'

function AddItem() {

  const [menu, setMenu] = useState(MenuStore.getMenuDict())

  let pathname = window.location.pathname;
  let itemInfo = pathname.split('/');
  let catagoery = itemInfo[2]

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [offer_status, setOfferStatus] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let param = new URLSearchParams();
    param.append("name", title);
    param.append("price", cost);
    param.append("image", image);
    param.append("description", description)
    param.append("ingredients", ingredients)
    param.append("category_id", catagoery);
    param.append("offer_status", offer_status ? 1 : 0);
    try {
      const response = await axios({
        url: "http://127.0.0.1:8000/addItems",
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
        <div className="row" style={{margin: "10vh"}}> 
        <div className='col d-flex justify-content-start mx-5'>
            <div className='col'>
                <div className='col'>
                    <h1>ADD {menu?.[catagoery]?.category?.toUpperCase()}</h1>
                </div>
                <div className='col'>
                    <form onSubmit={handleSubmit}>
                        <label>Title</label>
                        <input
                            label="Title"
                            id="title"
                            name="title"
                            onChange={(e) => setTitle(e.target.value) }
                            value={title}
                            required
                        />
                        <label>Description</label>
                        <textarea
                            label="Description"
                            id="description"
                            name="description"
                            type="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        />
                        <label>Ingredients</label>
                            <textarea
                                id="Ingredients"
                                onChange={(e) => setIngredients(e.target.value)}
                                value={ingredients}
                                required
                            />
                        <label>Cost</label>
                        <input
                            label="Cost"
                            id="cost"
                            name="cost"
                            type="float"
                            onChange={(e) => setCost(e.target.value)}
                            value={cost}
                            required
                        />
                        <label>Image URL</label>
                        <textarea
                            label="Image URL"
                            id="image-url"
                            name="image-url"
                            type="image-url"
                            onChange={(e) => setImage(e.target.value)}
                            value={image}
                            required
                        />
                        <div>
                            <label id="checkbox_id">Item currently offered 
                                <input
                                    type="checkbox"
                                    id="checkbox_id"
                                    checked={offer_status}
                                    onChange={(e) => setOfferStatus(e.target.checked)}
                                />
                            </label>
                        </div>
                        <input className='submit my-4' type="submit" />
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
                    <Preview title={title} cost={cost} description={description} image={image} ingredients={ingredients} status={offer_status}/>  
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}

export default AddItem;