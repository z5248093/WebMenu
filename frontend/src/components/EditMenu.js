import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MenuStore from '../store/MenuStore';
import { Link } from 'react-router-dom';
import FootItem from '../store/components/FootItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import Navbar from './Navbar';
import axios
 from 'axios';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardImage,
  } from 'mdb-react-ui-kit';

function EditMenu() {

    const [menu, setMenu] = useState(MenuStore.getMenu())
    const [assertLoaded, setAssertLoaded] = useState(MenuStore.getMenu()?.[1])
    const [keyword, setKeyword] = useState("")
    const [matches, setMatches] = useState([])
    const [add, setAdd] = useState(false)
    const [category, setCategory] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");

    useEffect(() => {
        MenuStore.addChangeListener(updateMenu)
        return (() => {
            MenuStore.removeChangeListener(updateMenu)
        })
    }, [])

    function updateMenu() {
        setMenu(MenuStore.getMenu())
        setAssertLoaded(MenuStore.getMenu()?.[1])
    }

  const [toggleState, setToggleState] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.get("http://127.0.0.1:8000/queryItems", {
            params: {
                keyword: keyword
            }
            })
            .then(function (response) {
            var tmp = response.data
            let items = []
            for (var i = 0; i < tmp.length; i++) {
                let foodItem = new FootItem(tmp[i].name, tmp[i].description, tmp[i].price, tmp[i].image, tmp[i].id, tmp[i].ingredients, tmp[i].offer_status, tmp[i]?.category)
                items.push(foodItem)
            }
            setMatches(items)
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
    }

    const handleSubmitCategory = async (event) => {
        event.preventDefault();
        let param = new URLSearchParams();
        param.append("name", category);
        try {
            const response = await axios({
            url: "http://127.0.0.1:8000/addCategory",
            method: "post",
            data: param,
            })
            console.log(JSON.stringify(response?.data));
            window.location.reload();
        } catch (err) {
            console.log("wrong");
        }
    };

    const handleSubmitUpdateCategory = async (event) => {
        event.preventDefault();
        let param = new URLSearchParams();
        param.append("id", toggleState);
        param.append("name", newCategoryName);
        try {
            const response = await axios({
            url: "http://127.0.0.1:8000/updateCategory",
            method: "post",
            data: param,
            })
            console.log(JSON.stringify(response?.data));
            window.location.reload();
        } catch (err) {
            console.log("wrong");
        }
    };

    const handleSubmitDeleteCategory = async (event) => {
        event.preventDefault();
        let param = new URLSearchParams();
        param.append("id", toggleState);
        try {
            const response = await axios({
            url: "http://127.0.0.1:8000/deleteCategory",
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
                <div className='row' style={{overflow:'auto'}}>
                    {menu.map((dict, index) => {
                        console.log("test")
                        return (
                            <button className={`my-3 col ${toggleState === dict?.id ? "menu-tab active-menu-tab" : "menu-tab"}`} onClick={e => setToggleState(dict?.id)}>{dict?.category}</button>
                            )
                    })}
                    {add &&
                        <form className='col my-3' onSubmit={handleSubmitCategory}>
                                <input style={{height: '100%'}} onChange={(e) => setCategory(e.target.value) }></input> 
                        </form>
                        
                    }
                    <div className='col'>
                        <button className="add-category" onClick={() => setAdd(!add)}>&#43;</button>
                    </div>
                </div>
                <form className='row justify-content-md-center' onSubmit={handleSubmit}>
                    <table className='search-table'>
                        <tr>
                            <td>
                                <input className="search" 
                                        onClick={e => {
                                            setToggleState("search")
                                        }}
                                        onChange={(e) => setKeyword(e.target.value)}>
                                    
                                </input>
                            </td>
                            <td>
                                <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
                            </td>
                        </tr>
                    </table>
                </form>
                {toggleState !== "search" &&
                        <form className='update-category row justify-content-md-center' onSubmit={handleSubmitUpdateCategory}>
                        <input  onChange={(e) => setNewCategoryName(e.target.value) } style={{maxWidth: '400px', textAlign: 'center'}} placeholder={"Update Category Name"}></input>
                    </form>
                }
                <div className="content-tabs">
                    {menu.map((dict, index) => {
                        return (
                            <div className={toggleState === dict?.id ? "content  active-content" : "content"}>
                                <div className='row justify-content-md-center' >
                                    {dict?.items?.map((item, index) => {
                                        return <MenuItem option={dict?.id} item={item}/>
                                    })}
                                    <div className='col-md-auto'>
                                        <Link to={`/add/${dict?.id}/`} style={{ textDecoration: 'none', color: 'black'}} className="add-item">&#43;</Link>
                                        
                                    </div>
                                </div>
                                <div className='row justify-content-md-center'>
                                    {!dict?.items?.length &&
                                        <button className='delete ' onClick={handleSubmitDeleteCategory}>Delete Category</button>
                                    }
                                </div>
                            </div>
                        )
                    })}
                    
                    <div className={toggleState === "search" ? "content  active-content" : "content"}>
                        {matches.length ?
                            <div className='row justify-content-md-center'>
                                {matches.map((item, index) => {
                                    return <MenuItem option={item?.category} item={item}/>
                                })}
                            </div>
                        :
                        <h1 className="d-flex justify-content-md-center my-5">Sorry no matches :(</h1>
                        }
                    </div>
                    
                </div>
            </div>
        </div>
       
        
    );

    function MenuItem(props) {
        return (
            <div className='col-md-auto' style={{width: '400px', margin: '20px'}} >
                <Link 
                    to={`/edit/${props.option}/${props.item?.id}`}
                    style={{ textDecoration: 'none', color: 'black'}}
                >
                    <MDBCard className='foot-card' style={{filter: props.item?.offer_status ? '' : 'grayscale(100%)'}}>
                        <MDBCardImage className='foot-card-img ' src={props.item?.image} position='top' alt='...' />
                        <MDBCardBody>
                            <MDBCardTitle style={{color: '#F5E9D4'}}>{props.item?.title}{!props.item?.offer_status && <b> - OUT OF STOCK</b>}</MDBCardTitle>
                        </MDBCardBody>
                    </MDBCard>
                </Link>
            </div>
        )
    }
}

export default EditMenu;