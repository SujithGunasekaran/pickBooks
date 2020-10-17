import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../Css/signup.css';
import axios from 'axios';
import loginimage from '../Images/login.svg';
import Avatar from '@material-ui/core/Avatar';


class Signup extends Component
{
    constructor(props)
    {
        super(props);
        const token = sessionStorage.getItem("userToken");
        this.handleChange=this.handleChange.bind(this);
        let loggedIn = false;
        if(token !== null)
        {
            loggedIn = true;
        }
        this.state={
            username:"",
            email:"",
            password:"",
            usernameError:false,emailError:false,passwordError:false,
            successMessage : false,passwordLengthError:false,userAlreadyError:false,loggedIn
        }
    }
    componentDidMount()
    {
        window.scrollTo(0,0);
    }
    handleChange = e =>
    {
        this.setState({[e.target.name] : e.target.value})
    }
    updateUser = e =>
    {
        this.setState({usernameError:false,userAlreadyError:false})
    }
    updateEmail = e =>
    {
        this.setState({emailError:false})
    }
    updatePassword = e =>
    {
        this.setState({passwordError:false,passwordLengthError:false})
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
        if(!this.state.email)
        {
            this.setState({emailError:true})
        }
    }
    formSubmit = e =>
    {
        e.preventDefault();
        this.validate();
        const userInfo = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        if(this.state.username && this.state.email && this.state.password.length >=8)
        {
            axios.post('https://pickbooks.herokuapp.com/userinfo/add',userInfo)
            .then(responseData =>{
                if(responseData.status === 200)
                {
                    this.setState({successMessage : true})
                    this.resetInput();
                }
            })
            .catch(err=>{
                this.setState({userAlreadyError : true})
            })
        }
        if(this.state.password.length>1 && this.state.password.length<7)
        {
            this.setState({passwordLengthError : true})
        }
    }

    resetInput = () =>
    {
        this.setState({username : '', email : '', password : ''})
    }
    render()
    {
        if(this.state.loggedIn === true)
        {
            return <Redirect to="/"/>
        }

        document.title = "Signup | Pick-Books";

        return(
            <div>
            <div className="sign-main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 sign-column-background">
                            <div className="sign-icon-combine">
                                <Avatar style={{backgroundColor:'#335eea',fontSize:'19px',fontFamily: "'PT Sans', sans-serif"}}>PB</Avatar>
                                <div className="sign-name-image">Pick-Books</div>
                            </div>
                            <div className="sign-left-heading">Welcome to Pick-books</div>
                            <div className="sign-left-subheading">Please sign to explore book world and get exclusive offer</div>
                            <img src={loginimage} width="100%" height="400px" className="sign-left-image" alt="login" />
                        </div>
                        <div className="col-md-5">
                            <div className="sign-container">
                                <div className="sign-heading">Create Account</div>
                                <hr className="sign-hr"/>
                                <form onSubmit={this.formSubmit}>
                                    <div className="sign-input-label">Username</div>
                                    <input type="text" className="sign-input" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} onInputCapture={this.updateUser} />
                                    <div className="sign-input-error">
                                        {
                                            this.state.usernameError?
                                            <div className="hideme-sign">Please Enter Username</div>:null
                                        }
                                        {
                                            this.state.userAlreadyError?
                                            <div className="hideme-sign">Username Already Exist</div>:null
                                        }
                                    </div>
                                    <div className="sign-input-label">Email</div>
                                    <input type="email" className="sign-input" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleChange} onInputCapture={this.updateEmail}/>
                                    <div className="sign-input-error">
                                        {
                                            this.state.emailError?
                                            <div className="hideme-sign">Please Enter Email Address</div>:null
                                        }
                                    </div>
                                    <div className="sign-input-label">Password</div>
                                    <input type="password" className="sign-input" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} onInputCapture={this.updatePassword}/>
                                    <div className="sign-input-error">
                                        {
                                            this.state.passwordError?
                                            <div className="hideme-sign">Please Enter Password</div>:null
                                        }
                                        {
                                            this.state.passwordLengthError ? 
                                            <div className="hideme-sign">Password Must be atleast 8 Character</div>:null
                                        }
                                    </div>
                                    <button className="sign-btn">Create Account</button>
                                    {
                                        this.state.successMessage ?
                                        <div className="signup-success-container">
                                            <div className="signup-success-name">Successfully Regeistered <Link to="/Login">Click Here</Link> to Login to your account</div>
                                        </div>:null
                                    }
                                    <div className="sign-login-account">Already Have An account ? <Link to="/Login">Login</Link></div><br/><br/>
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

export default Signup