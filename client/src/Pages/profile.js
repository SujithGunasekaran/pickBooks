import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../Css/profile.css';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import '../Css/loader.css';

class Profile extends Component
{
    constructor(props)
    {
        super(props);
        const token = sessionStorage.getItem("userToken");
        const username = sessionStorage.getItem("username");
        let loggedIn = false;
        let userName = null;
        if(token !== null)
        {
            loggedIn = true;
            userName = username;
        }
        this.state={
            loggedIn,userName,userEmail:'',userProfileName:'',
            tabHeader : 'one',
            username:'',mobile:'+91 ',
            door:'',street:'',
            city:'',state:'',pincode:'',
            cartItems:null,pageName:'',
            loading : true
        }
    }

    handleUserInput = e => {
        this.setState({ [e.target.name] : e.target.value })
    }

    componentDidMount()
    {

        window.scrollTo(0,0);
        var url = window.location.pathname
        var str_url = url.toString()
        var res1 = str_url.replace('/','')
        var Page_Name = decodeURIComponent(res1.split("/")[0])
        this.setState({ pageName : Page_Name})


        if(this.state.loggedIn === true)
        {
            const userInfo = {
                username : this.state.userName
            }
            axios.post('https://pickbooks.herokuapp.com/userinfo/getProfile',userInfo)
            .then(responseData => {
                if(responseData.status === 200)
                {
                    this.setState({userEmail : responseData.data.email, userProfileName : responseData.data.username})
                    this.setState({loading : false})
                }
            })
            .catch(err => {
                console.log("Error")
            })

            /* Cart API */

            if(this.state.userName)
            {
                axios.post('https://pickbooks.herokuapp.com/usercart/userCartGet',userInfo)
                .then(responseData => {
                    if(responseData.status === 200)
                    {
                        this.setState({cartItems : responseData.data.length})
                    }
                })
                .catch(err => {
                    console.log("Network Error");
                })
            }
        }
    }

    componentWillUnmount()
    {
        clearTimeout(this.id)
    }

    handleTabHeader = tabID =>{
        this.setState({tabHeader : tabID})
    }

    render()
    {
        if(this.state.loggedIn === false)
        {
            return <Redirect to='/'/>
        }

        document.title = "Profile | Pick-Books";

        return(
            <div>
                {
                    this.state.loading ? 
                    <div>
                        <div class="triple-spinner"></div>
                    </div>:
                    <div>
                        <Header />
                        <div className="profile-main">
                            {/* <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="profile-head-bread">
                                            <div className="profile-bread-heading">{this.state.pageName}</div>
                                            <div className="profile-bread-para-display">
                                                <div className="profile-bread-para"><Link to="/">Home</Link></div>
                                                <div className="profile-bread-split"><i className="fa fa-angle-right"></i></div>
                                                <div className="profile-bread-para2">{this.state.pageName}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="profile-left-main-container">
                                            <div className="profile-background">
                                                <Avatar style={{backgroundColor:'white',margin:'auto',top:'60px',color:'rgb(21, 11, 59)',fontSize:'25px'}}>{this.state.userProfileName.charAt(0)}</Avatar>
                                                <div className="profile-name">Welcome, {this.state.userProfileName}</div>
                                            </div>
                                            <div className="profile-detail-heading">Contact details</div>
                                            <div className="profile-detail-label-name">Name</div>
                                            <div className="profile-detail-display">
                                                <div className="profile-detail-label-user-name">{this.state.userProfileName}</div>
                                                <PersonIcon style={{marginLeft:'auto',marginRight:'8px'}} />
                                            </div>
                                            <div className="profile-detail-label-name">Email</div>
                                            <div className="profile-detail-display">
                                                <div className="profile-detail-label-user-name">{this.state.userEmail}</div>
                                                <EmailRoundedIcon style={{marginLeft:'auto',marginRight:'8px'}} />
                                            </div><br/><br/><br/>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="profile-tab-container">
                                            <Nav tabs>
                                                <NavItem className="profile-tab-nav-border">
                                                    <NavLink
                                                        onClick={()=>this.handleTabHeader('one')}
                                                        className={this.state.tabHeader === 'one' ? 'profile-tab-nav-active' : 'profile-tab-nav'}
                                                    >
                                                        Update Contact Details
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        onClick={()=>this.handleTabHeader('two')}
                                                        className={this.state.tabHeader === 'two' ? 'profile-tab-nav-active' : 'profile-tab-nav'}
                                                    >
                                                        Your Cart items
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent style={{marginBottom:'40px'}}>
                                                {
                                                    this.state.tabHeader === 'one' ?
                                                    <TabPane>
                                                        <Row>
                                                            <Col sm="12">
                                                                <div className="profile-contact-container">
                                                                    <div className="profile-contact-heading">
                                                                        Update Address Details
                                                                    </div>
                                                                    <Row>
                                                                        <Col md='6'>
                                                                            <div className="profile-input-label">Username</div>
                                                                            <input type="text" placeholder="Username" value={this.state.userProfileName} name="username" className="profile-input-field" /> 
                                                                        </Col>
                                                                        <Col md='6'>
                                                                            <div className="profile-input-label">Email</div>
                                                                            <input type="Email" placeholder="Email Address" value={this.state.userEmail} name="email" className="profile-input-field2" readOnly /> 
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col md='6'>
                                                                            <div className="profile-input-label">Mobile Number</div>
                                                                            <input type="text" placeholder="Mobile Number" value={this.state.mobile} name="mobile" className="profile-input-field" onChange={this.handleUserInput} />
                                                                        </Col>
                                                                        <Col md='6'>
                                                                            <div className="profile-input-label">Door No</div>
                                                                            <input type="text" placeholder="Door No" value={this.state.door} name="door" className="profile-input-field2" onChange={this.handleUserInput} /> 
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col md='6'>
                                                                            <div className="profile-input-label">Street Name</div>
                                                                            <input type="Email" placeholder="Street" value={this.state.street} name="street" className="profile-input-field" onChange={this.handleUserInput} /> 
                                                                        </Col>
                                                                        <Col md='6'>
                                                                            <div className="profile-input-label">City</div>
                                                                            <input type="text" placeholder="City" value={this.state.city} name="city" className="profile-input-field2" onChange={this.handleUserInput} /> 
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col md='6'>
                                                                            <div className="profile-input-label">State</div>
                                                                            <select className="profile-input-field" placeholder="State" value={this.state.state} id="sel1" name="state" onChange={this.handleUserInput} >
                                                                                <option value="" disabled>State</option>
                                                                                <option>Tamil Nadu</option>
                                                                                <option>Kerala</option>
                                                                                <option>Karnataka</option>
                                                                                <option>Maharastra</option>
                                                                            </select>
                                                                        </Col>
                                                                        <Col md='6'>
                                                                            <div className="profile-input-label">Pincode</div>
                                                                            <input type="text" placeholder="Pincode" value={this.state.pincode} name="pincode" className="profile-input-field2" onChange={this.handleUserInput} /> 
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col md='12'>
                                                                            <button className="profile-update-btn">Update Address</button>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </TabPane> :
                                                    <TabPane>
                                                        <Row>
                                                            <Col md='12'>
                                                                <div className="profile-cart-heading">Your Cart items</div>
                                                                <div className="profile-cart-name">You have total of {this.state.cartItems} items in your cart list <Link to="/Cart">To view your cart click here</Link></div>
                                                            </Col>
                                                        </Row>
                                                    </TabPane>
                                                }
                                            </TabContent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                }
            </div>

        )
    }
}

export default Profile