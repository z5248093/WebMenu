import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MenuStore from '../store/MenuStore';
import  {useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FootItem from '../store/components/FootItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

        // <FontAwesomeIcon icon={faMagnifyingGlass} />
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
  } from 'mdb-react-ui-kit';
import MenuConstants from '../constants/MenuConstants';

function Menu() {

    const [toggleState, setToggleState] = useState(1);
    
    const [keyword, setKeyword] = useState("")
    const [menu, setMenu] = useState(MenuStore.getMenu())
    const [assertLoaded, setAssertLoaded] = useState(MenuStore.getMenu()?.[1])

    const [matches, setMatches] = useState([])



    

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

    return (
        
            <div className='container'>
                <div className='row' style={{overflow:'auto'}}>
                    {menu.map((dict, index) => {
                        console.log("test")
                        return <button className={`my-3 col ${toggleState === dict?.id ? "menu-tab active-menu-tab" : "menu-tab"}`} onClick={e => setToggleState(dict?.id)}>{dict?.category}</button>
                        
                    })}
                   
                </div>
                <form className='row justify-content-md-center' onSubmit={handleSubmit}>
                    <table className='search-table'>
                        <tr>
                            <td>
                                <input className="search" 
                                        onClick={e => {
                                            setToggleState(menu.length + 1)
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
                <div >
                    {menu.map((dict, index) => {
                        return (
                        <div className={toggleState === dict?.id ? "content  active-content" : "content"}>
                            <div className='row justify-content-md-center' >
                                {dict?.items?.map((item, index) => {
                                    return <MenuItem option={dict?.id} item={item}/>
                                })}
                            </div>
                        </div>
                        )
                    })}
                    <div className={toggleState === menu.length + 1 ? "content  active-content" : "content"}>
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
        
    );

};

function MenuItem(props) {
    console.log(props.item?.image);
    return (
        <div style={{maxWidth: '400px', margin: '20px'}} >
            <Link 
                to={`/menu/${props.option}/${props.item?.id}`}
                style={{ textDecoration: 'none', color: 'black'}}
            >
                <MDBCard className='foot-card' style={{filter: props.item?.offer_status ? '' : 'grayscale(100%)'}}>
                    <MDBCardImage className='foot-card-img ' src={props.item?.image} position='top' alt='...' />
                    <MDBCardBody>
                        <MDBCardTitle style={{color: '#F5E9D4'}}>{props.item?.title}{!props.item?.offer_status && <b> - OUT OF STOCK</b>}</MDBCardTitle>
                        <MDBCardText>{'$'}{props.item?.cost} </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </Link>
        </div>
    )
}

export {Menu, MenuItem};
