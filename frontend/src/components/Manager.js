import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MenuStore from '../store/MenuStore';
import { Link } from 'react-router-dom';
import EditMenu from './EditMenu';

function Manager() {

  const [menu, setMenu] = useState(MenuStore.getMenu())
  useEffect(() => {
    MenuStore.addChangeListener(updateMenu)
    return (() => {
        MenuStore.removeChangeListener(updateMenu)
    })
    }, [])

  function updateMenu() {
      setMenu(MenuStore.getMenu())
  }

  return (
    <div className='container'>
       <div className='row justify-content-md-center'>
          <div className='col-md-6'>
            <Link to={`/edit-menu`}>
              <button class='staff-options my-5 '>EDIT MENU</button>
            </Link>
          </div>
          <div className='col-md-6'>
            <Link to={`/edit-menu`}>
              <button class='staff-options my-5 col-md-auto'>MANAGE<br/>ACCOUNTS</button>
            </Link>
          </div>

    
          
        
      </div>
    </div>
  );
}

export default Manager;