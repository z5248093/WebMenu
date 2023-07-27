import React ,{ useState }from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import image from '../images/display.png'
import axios from "axios";
import { setUserInfo } from '../util';
axios.defaults.withCredentials = true;
function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      let param = new URLSearchParams();
      param.append("username", email);
      param.append("passwd", password);
      param.append("login", true);

      const response = await axios({
        url: "http://127.0.0.1:8000/login",
        method: "post",
        data: param,
      }).catch(function (error) {
        if (error.response) {
          alert(error.response.data);
        }
      });

      if(response.status === 200) {
        let res = JSON.stringify(response?.data)
        setUserInfo(JSON.stringify(response?.data || "{}"));
        if(res.includes("manager")) {
         window.open("/manager", "_self");
        }
        else if(res.includes("wait")) {
          window.open("/wait-staff", "_self");
         }
         else if(res.includes("kitchen")) {
          window.open("/kitche-page-entrance", "_self");
         }
        else {
          window.open("/menu", "_self");
        }
      }
    };
  return (
    <div className="container-fluid">
        <div className='row d-flex justify-content-center'>
            <div class="col-sm-6 half-left my-5" style={{minWidth: '500px'}}>
                <div className='d-flex justify-content-center my-4'>
                    <img  src={logo} style={{width: '150px', height: '150px'}}></img>
                    <h3 style={{position: 'relative', top:'60px', left: '-20px'}}>Resturantable</h3>
                </div>
                <form onSubmit={handleSubmit} className='authForm auth'>
                    <div className='row ' style={{maxWidth: "400px", margin: 'auto', marginTop: '60px'}}>
                        <div  style={{marginBottom: '25px'}}>
                            <label for="inputEmail">User Name</label>
                            <input class="form-control my-1" placeholder="Username"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            />
                        </div>
                        <div>
                            <label for="inputPassword">Password</label>
                            <input class="form-control my-1" type='password' placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary my-2" style={{width: "100px", margin: 'auto'}}> Log In</button>
                    </div>
                    <div className='row my-4'>
                        <label style={{width: "250px", margin: 'auto',}}>Do not have a page? <Link to="/signup"> Sign Up</Link></label>
                    </div>
                </form>
            </div>
            <div class="col-sm-6 half-right ">
                <img class="img-responsive" src={image} style={{width: '100%',  height: '100%', objectFit: 'cover'}}></img>
            </div>
        </div>
    </div>
    
  
  );
}

export default LogIn;