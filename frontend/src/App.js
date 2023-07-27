
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, {useState} from 'react';
import StartUp from './StartUp';
import LogIn from './components/LogIn';
import Cart from './components/Cart';
import SignUp from './components/SignUp';
import {Menu} from './components/Menu';
import ViewItem from './components/ViewItem';
import Navbar from './components/Navbar';
import MenuStore from './store/MenuStore';
import EditMenu from './components/EditMenu';
import AddItem from './components/AddItem';
import {EditItem} from './components/EditItem';
import { useEffect } from 'react';
import PayBill from './components/PayBill';
import OrderHistory from './components/OrderHistory';
import Booking from './components/Booking';
import ManageAccounts from './components/ManageAccounts';
import ReadyOrders from './components/ReadyOrders';
import AllBookings from './components/AllBookings';
import NeededAssistance from './components/NeededAssistance';
import CustomerBills from './components/CustomerBills';
import KitchenPageEntrance from './components/KitchenPageEntrance';
import 'antd/dist/antd.css';
import { NeedAssistance } from './components/NeedAssistance';
import { Orders } from "./components/Orders";
import { UpdataItem } from "./components/UpdataItem";
import {getUserInfo} from "./util";

function App() {

      const[menu, setMenu] = useState(MenuStore.getMenu())
      const[user, setUser] = useState(getUserInfo()?.Role)

      console.log("NEVE2 " + user)

      useEffect(() => {
            MenuStore.addChangeListener(updateMenu)
            StartUp.init();
            return (() => {
                  MenuStore.removeChangeListener(updateMenu)
            })
      }, [window.location])


      function updateMenu() {
            setMenu(MenuStore.getMenu())
      }
      return (
      <div style={{background: '#F5E9D4', minHeight: '100vh'}}>
            <Router>
                  <Switch>
                        <Route exact path="/login" component={LogIn} />
                        <Route exact path="/signup" component={SignUp} /> 
                        {user === "Manager" &&
                              <Route path='/manager' exact component={EditMenu}/> 
                        }
                        {user === "Manager" &&
                              <Route exact path="/edit-menu" component={EditMenu} />
                        }
                        {user === "Manager" &&
                             <Route exact path="/manage-accounts" component={ManageAccounts} />
                        }
                        {user === "Wait staff" &&
                             <Route exact path="/orders" component={ReadyOrders}/>
                        }
                        {user === "Wait staff" &&
                            <Route exact path="/all-bookings" component={AllBookings}/>
                        }
                        {user === "Wait staff" &&
                            <Route exact path="/needed-assistance" component={NeededAssistance}/>
                        }
                        {user === "Wait staff" &&
                             <Route exact path="/customer-bills" component={CustomerBills}/>
                        }
                        {user === "Wait staff" &&
                             <Route exact path="/wait-staff" component={ReadyOrders}/>
                        }
                        {user === "Kitchen staff" &&
                             <Route exact path="/kitche-page-entrance" component={Orders} />
                        }
                        {user === "Kitchen staff" &&
                              <Route exact path="/update-items" component={UpdataItem} />
                        }
                        {user === "Kitchen staff" &&
                              <Route exact path="/kitchen-orders" component={Orders} />
                        }
                        

                        {user === "Manager" &&
                              <div>
                                    {menu.map((dict, index) => {
                                          return (
                                                <div>
                                                      <Route exact path={`/add/${dict?.id}/`} component={AddItem} />
                                                      {dict?.items?.map((item, index) => {
                                                            return(<Route exact path={`/edit/${dict?.id}/${item?.id}`} component={EditItem} />)
                                                      })}
                                                </div>
                                          )
                                                
                                    })}
                              </div>
                        }
                        
                        
                        
                        <div> 
                              <Navbar />
                              <Route path='/' exact component={Menu}/>
                              <Route path='/menu' exact component={Menu}/>
                              <Route exact path="/shopping-cart" component={Cart} />
                              <Route exact path="/pay-bill" component={PayBill} />
                              <Route exact path="/order-history" component={OrderHistory} />
                              <Route exact path="/booking" component={Booking} />
                              <Route path='/need-assistance' exact component={NeedAssistance} />
                              {menu.map((dict, index) => {
                                    return (
                                          dict?.items?.map((item, index) => {
                                                return(<Route exact path={`/menu/${dict?.id}/${item.getId()}`} component={ViewItem} />)
                                          })
                                    )
                              })}
                              
                        </div>                              
                  </Switch>
            </Router>
      </div>
      );
      }

export default App;
