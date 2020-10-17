import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Css/header.css';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import axios from 'axios';




class Header extends Component
{

    constructor(props)
    {
        super(props);
        const token = sessionStorage.getItem("userToken");
        const username = sessionStorage.getItem("username");
        const cartBadge = sessionStorage.getItem("userCount");
        let loggedIn = false;
        let showLogin = true;
        let showSignup = true;
        let showUsername = null;
        let showuserCapital = null
        let showLogout = false;
        let cartBadgeCount = null;
        if(token !== null)
        {
            loggedIn = true;
            showLogout=true;
            showLogin=false;
            showSignup=false;
            cartBadgeCount = cartBadge;
        }
        if(username !== null)
        {
            showUsername = username;
            showuserCapital = username.charAt(0).toUpperCase();
        }
        this.state={
            loggedIn,showLogin,showSignup,showLogout,showUsername,showuserCapital,
            Cartlist:'',cartBadgeCount
        }
    }

    componentDidMount()
    {
        if( this.state.loggedIn === true)
        {
            if(this.state.cartBadgeCount === '1')
            {
                const userInfo = {
                    username : this.state.showUsername
                }
                if(this.state.showUsername)
                {
                    axios.post('https://pickbooks.herokuapp.com/usercart/userCartGet',userInfo)
                    .then(responseData => {
                        if(responseData.status === 200)
                        {
                            sessionStorage.setItem("userCartCount",responseData.data.length);
                            this.setState({Cartlist : responseData.data.length})
                        }
                    })
                    .catch(err => {
                        console.log("error while reteriving document");
                    })
                }
                sessionStorage.setItem("userCount", 0);
            }
        }
    }

    render()
    {
        var userCartCount = sessionStorage.getItem("userCartCount");
        return(
            <div>
                <nav className="navbar navbar-default navbar-fixed-top my-nav-nav nav-header">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle nav-toggle-btn nav-bar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar" style={{color:'whitesmoke'}}></span>
                                <span className="icon-bar" style={{color:'whitesmoke'}}></span>
                                <span className="icon-bar" style={{color:'whitesmoke'}}></span>                        
                            </button>
                            <div className="my-nav-img-container" style={{width:'200px'}}>
                                <div className="nav-icon-combine">
                                    <div className="nav-logo">PB</div>
                                    <div className="nav-name-image">Pick-Books</div>
                                </div>
                            </div>
                        </div>
                        <div className="collapse navbar-collapse nav-list" id="myNavbar">
                            <ul className="nav navbar-nav navbar nav-link-list">
                                <li className="nav-list-home"><Link to="/" className="link1">Home</Link></li>
                                <li className="dropdown" >
                                    <div className="dropdown-toggle nav-list-shop" data-toggle="dropdown">Shop<span className="dropdown-symbol">&#9660;</span></div>
                                    <ul className="dropdown-menu" >
                                        <div className="row dropdown-row-width">
                                            <div className="col-sm-3 col-md-4">
                                                <div className="dropdown-flex-container">
                                                    <div className="dropdown-first-column">
                                                        <div className="heading">BOOK TYPE</div>
                                                        <ul className="ul1">
                                                            <li><Link to="/Shop/Science">Science</Link></li>
                                                            <li><Link to="/Shop/Technology">Technology</Link></li>
                                                            <li><Link to="/Shop/History">History</Link></li>
                                                            <li><Link to="/Shop/Adventure">Adventure</Link></li>
                                                        </ul><br/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 col-md-4">
                                                <div className="dropdown-flex-container">
                                                        <div className="dropdown-first-column">
                                                        <div className="heading">AUTHOR</div>
                                                        <ul className="ul2">
                                                            <li><Link to="/Product/Technology/BookName=T‑Minus AI">Michael Kanaan</Link></li>
                                                            <li><Link to="/Product/Science/BookName=Bottle of Lies">Katherine Eban</Link></li>
                                                            <li><Link to="/Product/Mystery/BookName=The Suspect">Fiona Barton</Link></li>
                                                            <li><Link to="/Product/Mystery/BookName=The Turn Of The Key">Ruth Ware</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3 col-md-4">
                                                <div className="dropdown-flex-container">
                                                    <div className="dropdown-first-column">
                                                        <div className="heading">BEST SELLER</div>
                                                        <ul className="ul2">
                                                            <li><Link to="/Product/Mystery/BookName=The Turn Of The Key">The Turn Of The Key</Link></li>
                                                            <li><Link to="/Product/Technology/BookName=T‑Minus AI">T‑Minus AI</Link></li>
                                                            <li><Link to="/Product/Technology/BookName=The Internet in Everything">The Internet in Everything</Link></li>
                                                            <li><Link to="/Product/Adventure/BookName=Into Thin Air">Into Thin Air</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                                <li className="nav-list-about"><Link to="/About" className="link3">About</Link></li>
                                <li className="nav-list-contact"><Link to="/Contact" className="link3">Contact</Link></li>
                            </ul>
                            {
                                this.state.showLogout ?
                                <ul className="nav navbar-nav navbar-right nav-link-list">
                                <li className="nav-list-about" style={{marginTop :'0px'}}>
                                    <Link to="/Cart">
                                        <Badge badgeContent={userCartCount} color="secondary" fontSize="10px">
                                            <ShoppingCartIcon style={{fontSize:'26px',marginLeft:'14px',color:'#335eea'}}/>
                                        </Badge>
                                    </Link>
                                </li>
                                <li className="dropdown">
                                    <div className="dropdown-toggle nav-list-username-display" data-toggle="dropdown">
                                        <div className="nav-list-username-combine">
                                            <div className="nav-username-name">{this.state.showUsername}</div>
                                            <Avatar style={{backgroundColor:'#335eea'}}>{this.state.showuserCapital}</Avatar>
                                        </div>
                                    </div>
                                    <ul className="dropdown-menu dropdown-menu-username">
                                        <ul className="nav-ul-username">
                                            <div className="username-name-heading">Hello, {this.state.showUsername}</div>
                                            <hr/>
                                            <div className="icon-name-display">
                                                <Link to="/Profile">
                                                    <div className="nav-username-profile-display">
                                                        <PersonSharpIcon style={{fontSize:'18px',marginTop:'6px',marginLeft:'14px'}} className="a-icon"/>
                                                        <div className="nav-username-profile-display-name">Profile</div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="icon-name-display">
                                                <Link to="/Cart">
                                                    <div className="nav-username-profile-display">
                                                        <ShoppingCartIcon style={{fontSize:'18px',marginTop:'6px',marginLeft:'14px'}} className="a-icon"/>
                                                        <div className="nav-username-profile-display-name">Cart</div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="icon-name-display">
                                                <Link to="/Logout">
                                                    <div className="nav-username-profile-display">
                                                        <ExitToAppOutlinedIcon style={{fontSize:'18px',marginTop:'6px',marginLeft:'14px'}} className="a-icon"/>
                                                        <div className="nav-username-profile-display-name">Logout</div>
                                                    </div>
                                                </Link>
                                            </div><br/>
                                        </ul>
                                    </ul> 
                                </li>
                                </ul>: null
                            }
                            {
                                this.state.showLogin ?
                                <ul className="nav navbar-nav navbar-right nav-link-list">
                                    <li className="nav-list-login"><Link to="/Login">Login</Link></li>
                                    <li className="nav-list-signup"><Link to="/Signup">Signup</Link></li>
                                </ul>:null
                            }
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header