import React, { Component } from 'react';
import '../Css/cart.css';
import axios from 'axios';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { Link, Redirect } from 'react-router-dom';
import BookList from '../Json/bookinfolist.json';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';




class Cart extends Component
{
    constructor(props)
    {
        super(props);
        const token = sessionStorage.getItem("userToken");
        const username = sessionStorage.getItem("username");
        let loggedIn = false;
        let showUsername = null;
        if(token !== null)
        {
            loggedIn = true;
        }
        if(username !== null)
        {
            showUsername = username;
        }
        this.state={
            showUsername,loggedIn,userCartDetails:[],recivedURL:'',cartUpdate:'',loading:true
        }
    }


    componentDidMount()
    {
        window.scrollTo(0,0);
        this.setState({recivedURL : window.location.pathname})

        if(this.state.loggedIn === true)
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
                        this.setState({userCartDetails : responseData.data,cartUpdate:'cartUpdate'})
                        sessionStorage.setItem("userCount",1)
                        this.setState({loading : false})
                    }
                })
                .catch(err => {
                    console.log("Network Error");
                })
            }
        }
    }

    handleRemoveProduct = (bookName) =>
    {
        this.setState({loading : true})
        const userInfo = {
            username : this.state.showUsername,
            bookname : bookName
        }
        if(this.state.showUsername)
        {
            axios.post('https://pickbooks.herokuapp.com/usercart/userCartDelete',userInfo)
            .then(responseData => {
                if(responseData.status === 200)
                {
                    sessionStorage.setItem("userCount",1)
                    this.componentDidMount()
                }
            })
            .catch(err => {
                if(err.status === 400)
                {
                    console.log("Hello")
                }
                console.log("Error")
            })
        }
    }

    render()
    {
        if(this.state.loggedIn !== true)
        {
            return <Redirect to="/"/>
        }

        document.title = "Cart | Pick-Books";

        var url = this.state.recivedURL;
        var str_url = url.toString();
        var res2 = str_url.replace('/','');
        var Page_Name = decodeURIComponent(res2.split("/")[0]);

        var itemPrice = 0 ;
        var totalPrice = 0;
        var ActualTotalPrice = 0;
        var SavedPrice = 0;
        var productCount = 0;
        var bookQuantity = 1;

        return(
            <div>
                {
                    this.state.loading ? 
                    <div>
                        <div className="triple-spinner"></div>
                    </div> :
                    <div>
                        <Header/>
                        <div className="cart-main">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="cart-head-bread">
                                            <div className="cart-bread-heading">{Page_Name}</div>
                                            <div className="cart-bread-para-display">
                                                <div className="cart-bread-para"><Link to="/">Home</Link></div>
                                                <div className="cart-bread-split"><i className="fa fa-angle-right"></i></div>
                                                <div className="cart-bread-para1"><Link to="/Shop/Adventure">Continue Shopping</Link></div>
                                                <div className="cart-bread-split"><i className="fa fa-angle-right"></i></div>
                                                <div className="cart-bread-para2">{Page_Name}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="cart-offer-container">
                                            <div className="cart-offer-name">Your Cart</div>
                                        </div>
                                        {
                                            this.state.userCartDetails.map((responseData) =>{
                                                productCount ++;
                                                return BookList.BookType.map((bookCatogry,index) => {
                                                    if(responseData.booktype === bookCatogry.Title)
                                                    {
                                                        bookQuantity = responseData.quantity;
                                                        return(
                                                            <div className="cart-list-container" key={index}>
                                                                {
                                                                    bookCatogry.BookInfo.map((bookDetails,index) =>{
                                                                        if(responseData.bookname === bookDetails.BookName)
                                                                        {
                                                                            itemPrice = itemPrice + (Number(bookDetails.DiscountPrice * bookQuantity));
                                                                            totalPrice = totalPrice + Math.round(Number(((bookDetails.DiscountPrice * bookQuantity)*12)/100)+ Number(bookDetails.DiscountPrice * bookQuantity));
                                                                            ActualTotalPrice = totalPrice + Math.round(Number(((bookDetails.ActualPrice * bookQuantity)*12)/100)+ Number(bookDetails.ActualPrice * bookQuantity));
                                                                            SavedPrice = ActualTotalPrice - totalPrice;

                                                                            return(
                                                                                <div key={index}>
                                                                                    <div className="cart-book-display">
                                                                                        <div className="cart-book-card">
                                                                                            <div className="cart-book-card-display">
                                                                                                <img className="cart-book-img" src={process.env.PUBLIC_URL + bookDetails.Imgsrc} alt="Card" />
                                                                                                <div className="cart-book-card-info-display">
                                                                                                    <div className="cart-book-title">{bookCatogry.Title}</div>
                                                                                                    <div className="cart-book-name">{bookDetails.BookName}</div>
                                                                                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                                                                                        <Rating name="read-only"  className="cart-book-rating" defaultValue={Number(bookDetails.DefaultRating)} precision={0.5} size="medium"  readOnly />
                                                                                                    </Box>
                                                                                                    <div className="cart-book-quantity">Qtn : {responseData.quantity}</div>
                                                                                                    <div className="cart-book-card-price">&#8377; {bookDetails.DiscountPrice}<s className="cart-book-card-strike"> &#8377; {bookDetails.ActualPrice}</s></div>
                                                                                                    <div className="cart-btn-display" key={index}>
                                                                                                        <button className="cart-book-remove-btn" onClick={()=>this.handleRemoveProduct(bookDetails.BookName)}>Remove</button>
                                                                                                        <Link to={`/Shipping/${bookCatogry.Title}/${bookQuantity}/${bookDetails.BookName}`}> <button className="cart-book-buy-btn">Buy</button> </Link>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                })
                                            })
                                        }
                                    </div>
                                    <div className="col-sm-6 col-md-6">
                                        <div className="row">
                                            <div className="col-xs-offset-0 col-sm-offset-0 col-sm-12 col-md-offset-1 col-md-11 col-xs-12">
                                                <div className="cart-price-details-conatiner">
                                                    <div className="cart-price-details-heading">PRICE <span style={{paddingLeft:'3px'}}>DETAILS</span></div>
                                                    <hr className="cart-price-details-conatiner-hr"/>
                                                    <div className="cart-price-display-new">
                                                        <div className="cart-price-name-head">Price ({productCount} Items)</div>
                                                        <div className="cart-price-show">&#8377; {itemPrice.toLocaleString('en-US')}</div>
                                                    </div>
                                                    <div className="cart-price-display-new">
                                                        <div className="cart-price-name-head">GST</div>
                                                        <div className="cart-price-show">12 %</div>
                                                    </div>
                                                    <hr className="cart-price-details-conatiner-hr2"/>
                                                    <div className="cart-price-display-new">
                                                        <div className="cart-price-name-total">TOTAL <span style={{paddingLeft:'4px'}}>PAYABLE</span></div>
                                                        <div className="cart-price-total">&#8377; {Number(totalPrice).toLocaleString('en-US')}</div>
                                                    </div>
                                                    <hr className="cart-price-details-conatiner-hr"/>
                                                    <div className="cart-price-saved">You Save Total of &#8377; {SavedPrice}</div>
                                                    <br/>
                                                </div>
                                                <hr/>
                                                <div className="cart-secure-container">
                                                    <VerifiedUserIcon style={{color:'#253447',fontSize:'28px',marginLeft:'10px',marginTop:'8px'}} />
                                                    <div className="cart-secure-notes">Safe and Secure Payments, Each returns. 100% Authentic products.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br/><br/><br/><br/>
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

export default Cart