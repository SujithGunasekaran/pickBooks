import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../Css/contact.css';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';



class Contact extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            pageName: ''
        }
    }
    componentDidMount()
    {
        window.scrollTo(0,0);
        var url = window.location.pathname
        var str_url = url.toString()
        var res1 = str_url.replace('/','')
        var Page_Name = decodeURIComponent(res1.split("/")[0])
        this.setState({ pageName : Page_Name})

    }
    render()
    {
        document.title = "Contact | Pick-Books";

        return(
            <div>
                <Header />
                <div className="contact-main">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="contact-head-bread">
                                    <div className="contact-bread-heading">{this.state.pageName}</div>
                                    <div className="contact-bread-para-display">
                                        <div className="contact-bread-para"><Link to="/">Home</Link></div>
                                        <div className="contact-bread-split"><i className="fa fa-angle-right"></i></div>
                                        <div className="contact-bread-para2">{this.state.pageName}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="contact-main-heading">Contact Us</h2>
                    <div className="contact-subheading">Any question or remarks? Just write us a message!</div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="contact-container">
                                    <div className="contact-container-heading">Contact Information</div>
                                    <div className="contact-container-subheading">Fill up the form and our team will get back to you within 24 hours </div>
                                    <div className="contact-info-display">
                                        <PhoneRoundedIcon style={{marginTop:'15px',marginLeft:'18px',fontSize:'22px',color:'#f06c84'}}/>
                                        <div className="contact-info-name">+91 9874329976</div>
                                    </div>
                                    <div className="contact-info-display">
                                        <MailRoundedIcon style={{marginTop:'15px',marginLeft:'18px',fontSize:'22px',color:'#f06c84'}}/>
                                        <div className="contact-info-name">mydevelopstar@gmail.com</div>
                                    </div>
                                    <div className="contact-info-display">
                                        <BusinessRoundedIcon style={{marginTop:'15px',marginLeft:'18px',fontSize:'22px',color:'#f06c84'}}/>
                                        <div className="contact-info-name">47 w 13th St, New York, NY 10011, USA</div>
                                    </div><br/><br/><br/>
                                    <div className="contact-icon">
                                        <i className="fa fa-twitter contact-icon-color"></i>
                                        <i className="fa fa-instagram contact-icon-color2"></i>
                                        <i className="fa fa-facebook contact-icon-color2"></i>
                                        <i className="fa fa-linkedin contact-icon-color2"></i>
                                    </div>
                                    <div className="contact-color2"></div>
                                    <div className="contact-color"></div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="contact-form-container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="contact-form-label">First Name</div>
                                            <input type="text" className="contact-form-input" placeholder="Enter First Name" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="contact-form-label">Last Name</div>
                                            <input type="text" className="contact-form-input" placeholder="Enter Last Name" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="contact-form-label2">Email</div>
                                            <input type="text" className="contact-form-input" placeholder="Enter Email Address" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="contact-form-label2">Phone</div>
                                            <input type="text" className="contact-form-input" placeholder="Enter Mobile Number" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="contact-form-label2">Message</div>
                                            <input type="text" maxLength="260" className="contact-form-input" placeholder="Enter Email Address" />
                                        </div>
                                    </div>
                                    <button className="contact-form-button">Send Message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Contact