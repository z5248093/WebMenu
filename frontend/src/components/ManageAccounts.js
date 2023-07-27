import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';
import axios
 from 'axios';

function ManageAccounts() {

    const [toggleState, setToggleState] = useState(1);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("CUSTOMER");

    const handleSubmit = async (event) => {
        event.preventDefault();
        let param = new URLSearchParams();
        param.append("username", username);
        param.append("role", role);
        try {
            const response = await axios({
            url: "http://127.0.0.1:8000/setRole",
            method: "post",
            data: param,
            });
            console.log(JSON.stringify(response?.data));
            alert(JSON.stringify(response?.data))
        } catch (err) {
            console.log("wrong");
            alert(err)
        }
    };

    const handleDelete= async (event) => {
        event.preventDefault();
        let param = new URLSearchParams();
        param.append("username", username);
        try {
            const response = await axios({
            url: "http://127.0.0.1:8000/deleteAccount",
            method: "post",
            data: param,
            });
            console.log(JSON.stringify(response?.data));
            alert(JSON.stringify(response?.data))
        } catch (err) {
            console.log("wrong");
        }
    };

    return (
        <div>
                <Navbar/>
                <div class="container">
                    <div className='row justify-content-center my-5'>
                        <h3 className='row justify-content-center'>UPDATE USER ACCOUNTS</h3>
                        <div className="my-5" style={{ border: '2px solid #000', maxWidth: '700px', height: 500, borderRadius: 10, position: 'relative', marginTop: '20px' }}>
                            <div className='row' style={{maxWidth: '400px', top: '-35px', position: 'relative' }}>
                                <button className={`my-3 col ${toggleState === 1 ? "menu-tab active-menu-tab" : "menu-tab"}`} style={{margin: '0px'}} onClick={() => setToggleState(1)}>Update Account</button>
                                <button className={`my-3 col ${toggleState === 2 ? "menu-tab active-menu-tab" : "menu-tab"}`} style={{margin: '0px'}} onClick={() => setToggleState(2)}>Delete Account</button>
                            </div>
                            <div className={toggleState === 1 ? "content  active-content" : "content"}>
                                <div className='row justify-content-center my-5' >
                                    <form  onSubmit={handleSubmit} style={{maxWidth: '500px'}}>
                                        <label>Username</label>
                                        <input
                                            id="username"
                                            type="text"
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
                                        />
                                        <label>User Role</label>
                                        <select name="select" onChange={(e) => setRole(e.target.value)}>
                                            {["Customer", "Wait staff", "Kitchen staff", "Manager"].map(function(n) { 
                                                return (<option value={n} selected={role === n}>{n}</option>);
                                            })}
                                        </select>
                                        <div className='row justify-content-center my-4'>
                                            <input className='submit' type="submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className={toggleState === 2 ? "content  active-content" : "content"}>
                                <div className='row justify-content-center my-5' >
                                    <form onSubmit={handleDelete} style={{maxWidth: '500px'}}>
                                        <label>Username</label>
                                        <input
                                            id="username"
                                            type="text"
                                            onChange={(e) => setUsername(e.target.value)}
                                            value={username}
                                        />
                                        <div className='row justify-content-center my-4 '>
                                            <button className='submit' style={{borderRadius: '4px'}}>Delete</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
       
        
    );
}

export default ManageAccounts;