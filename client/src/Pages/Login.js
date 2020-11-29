import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../Css/login.css';
import Avatar from '@material-ui/core/Avatar';
import loginimage from '../Images/login.svg';


// TODO #1 remove all console.log @SujithGunasekaran 
// done!
class Login extends Component
{
    constructor(props)
    {
        super(props);
        const token = sessionStorage.getItem("userToken")
        let loggedIn = false;
        if(token !== null)
        {
            loggedIn = true;
        }
        this.state={
            username : "",
            password : "",
            usernameError:false,
            passwordError:false,
            formError:false,
            loggedIn
        }
    }
    componentDidMount()
    {
        localStorage.getItem("userToken")
        window.scrollTo(0,0);
    }
    handleChange = e =>
    {
        this.setState({[e.target.name] : e.target.value})
    }
    updateUser = e =>
    {
        this.setState({usernameError : false,formError:false})
    }
    updatePassword = e =>
    {
        this.setState({passwordError : false,formError:false})
    }
    validate()
    {
        if(!this.state.username)
        {
            this.setState({usernameError:true})
        }
        if(!this.state.password)
        {
            this.setState({passwordError:true})
        }
    }
    formSubmit = e =>
    {
        e.preventDefault();
        this.validate();
        const userInfo = {
            username : this.state.username,
            password : this.state.password
        }
        if(this.state.username && this.state.password)
        {
            axios.post('https://pickbooks.herokuapp.com/userinfo/getUserInfo',userInfo)
            .then(responseData =>{
                if(responseData.status===200)
                {
                    sessionStorage.setItem("userToken","sfksdngknskjdngidfsgdslg");
                    sessionStorage.setItem("username",responseData.data.username);
                    sessionStorage.setItem("email",responseData.data.email);
                    sessionStorage.setItem("userCount",1);
                    this.setState({loggedIn : true})
                }
                else if(responseData.status===400)
                {
                    console.log("Invalid Username or Password")
                }
            })
            .catch(err => {
                this.setState({formError:true})
            })
        }
    }
    render()
    {
        if(this.state.loggedIn === true)
        {
            return <Redirect to="/"/>
        }
        document.title = "Login | Pick-Books";
        return(
            <div>
            <div className="login-main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 login-column-background">
                            <div className="login-icon-combine">
                                <Avatar style={{backgroundColor:'#335eea',fontSize:'19px',fontFamily: "'PT Sans', sans-serif"}}>PB</Avatar>
                                <div className="login-name-image">Pick-Books</div>
                            </div>
                            <div className="login-left-heading">Welcome Back!</div>
                            <div className="login-left-subheading">Please login to your account</div>
                            <img src={loginimage} width="100%" height="400px" className="login-left-image" alt="login" />
                        </div>
                        <div className="col-md-5">
                            <div className="login-container">
                                <div className="login-heading">Customer Login</div>
                                <hr className="login-hr"/>
                                <form onSubmit={this.formSubmit}>
                                    <div className="login-input-label">Username</div>
                                    <input type="text" className="login-input" placeholder="Username" name="username" onChange={this.handleChange} onInputCapture={this.updateUser} />
                                    <div className="login-input-error">
                                        {
                                            this.state.usernameError?
                                            <div className="hideme-login">Please Enter Username</div>:null
                                        }
                                    </div>
                                    <div className="login-input-label">Password</div>
                                    <input type="password" className="login-input" placeholder="Password" name="password" onChange={this.handleChange} onInputCapture={this.updatePassword}/>
                                    <div className="login-input-error">
                                        {
                                            this.state.passwordError?
                                            <div className="hideme-login">Please Enter Password</div>:null
                                        }
                                    </div>
                                    <div className="login-forgot-name"><Link to="/ForgotPassword">Forgot Password?</Link></div>
                                    <button className="login-btn">Login</button>
                                    <div className="login-input-error">
                                        {
                                            this.state.formError?
                                            <div className="hideme-login">Invalid Uername or Password</div>:null
                                        }
                                    </div>
                                    <div className="login-signup-account">Don't Have an Account? <Link to="/Signup">Signup</Link></div><br/><br/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Login