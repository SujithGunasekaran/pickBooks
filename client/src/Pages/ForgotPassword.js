import React, { Component } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import axios from 'axios';
import '../Css/forgotpassword.css';
import { Link } from 'react-router-dom';

class ForgotPassword extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            username : '',
            email : '',
            password : '',
            emailError : false,
            usernameError : false,
            passswordError : false,
            passwordLengthError : false,
            page : ['username','password'],
            pageIndex : 0,
            successMessage : false,
            userInfoError : false
        }
    }

    handleInputChange = e =>
    {
        this.setState({[e.target.name] : e.target.value})
    }

    updateEmail = () =>
    {
        this.setState({emailError : false ,userInfoError:false})
    }
    updateUser = () =>{
        this.setState({usernameError : false,userInfoError:false})
    }
    updatePassword = () =>{
        this.setState({passswordError : false,passwordLengthError:false})
    }

    validate()
    {
        if(!this.state.username)
        {
            this.setState({usernameError : true})
        }
        if(!this.state.email)
        {
            this.setState({emailError : true})
        }
    }

    validatePassword()
    {
        if(!this.state.password)
        {
            this.setState({passswordError : true,passwordLengthError:false})
        }
    }

    CheckUserAndPassword = e =>
    {
        e.preventDefault();
        this.validate();
        const userInfo = {
            username : this.state.username,
            email : this.state.email
        }
        if(this.state.username && this.state.email)
        {
            axios.post('https://pickbooks.herokuapp.com/userinfo/getUser',userInfo)
            .then(responseData =>{
                if(responseData.status === 200)
                {
                    this.setState({pageIndex : this.state.pageIndex +1})
                }
            })
            .catch(err => {
                this.setState({userInfoError : true})
                console.log("Error")
            })
        }
    }

    ResetPassword = e =>
    {
        e.preventDefault();
        this.validatePassword();
        const userInfo = {
            email : this.state.email,
            password : this.state.password
        }
        if(this.state.email && this.state.password.length >= 8)
        {
            axios.post('https://pickbooks.herokuapp.com/userinfo/updatePassword',userInfo)
            .then(responseData =>{
                if(responseData.status === 200)
                {
                    this.setState({successMessage : true})
                }
            })
            .catch(err => {
                console.log("Error")
            })
        }
        if(this.state.password.length>1 && this.state.password.length <8)
        {
            this.setState({passwordLengthError : true,passswordError:false})
        }
    }

    render()
    {

        document.title = "ForgotPassword | Pick-Books";

        return(
            <div>
                <Header />
                <div className="forgot-main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-offset-4 col-md-4">
                                <div className="forgot-container">
                                    <div className="forgot-icon-combine">
                                        <div className="forgot-logo">PB</div>
                                        <div className="forgot-name-image">Pick-Books</div>
                                    </div>
                                    <hr className="forgot-hr" />
                                    <div className="forgot-heading">Forgot Password</div>
                                    <div className="forgot-para">Don't worry you can recover your account</div>
                                    {
                                        this.state.page[this.state.pageIndex] === 'username' ?
                                        <div>
                                            <input type="text" 
                                            placeholder="Enter Your UserName" 
                                            value={this.state.username}
                                            name="username" 
                                            className="forgot-input"
                                            onChange={this.handleInputChange}
                                            onInputCapture={this.updateUser}
                                            />
                                            <div className="forgot-input-error">
                                                {
                                                    this.state.usernameError?
                                                    <div className="forgot-login">Please Enter Username</div>:null
                                                }
                                            </div>
                                            <input type="email" 
                                            placeholder="Enter Your Email Address" 
                                            value={this.state.email}
                                            name="email" 
                                            className="forgot-input2"
                                            onChange={this.handleInputChange}
                                            onInputCapture={this.updateEmail}
                                            />
                                            <div className="forgot-input-error">
                                                {
                                                    this.state.emailError?
                                                    <div className="forgot-login">Please Enter Email Address</div>:null
                                                }
                                            </div>
                                            <button className="forgot-btn" onClick={this.CheckUserAndPassword}>Next</button><br/>
                                            <div className="forgot-input-error">
                                                {
                                                    this.state.userInfoError?
                                                    <div className="forgot-login">Invalid Username or Email Address</div>:null
                                                }
                                            </div><br/><br/>
                                        </div>:null
                                    }
                                    {
                                        this.state.page[this.state.pageIndex] === 'password' ?
                                        <div>
                                            <input type="password" 
                                            placeholder="Enter Your New Password" 
                                            name="password" 
                                            className="forgot-input"
                                            onChange={this.handleInputChange}
                                            onInputCapture={this.updatePassword}
                                            />
                                            <div className="forgot-input-error">
                                                {
                                                    this.state.passswordError?
                                                    <div className="forgot-login">Please Enter Password</div>:null
                                                }
                                                {
                                                    this.state.passwordLengthError ? 
                                                    <div className="forgot-login">Password length must be atleast 8 Character</div>:null
                                                }
                                            </div>
                                            <button className="forgot-btn" onClick={this.ResetPassword}>Reset Password</button>
                                            {
                                                this.state.successMessage ?
                                                <div className="forgot-success-container">
                                                    <div className="forgot-success-name">Your Password have been update <Link to="/Login">Click Here</Link> to login</div>
                                                </div>:null
                                            }<br/><br/>
                                        </div>:null
                                    }
                                </div><br/><br/><br/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default ForgotPassword