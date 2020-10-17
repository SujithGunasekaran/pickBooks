import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../Json/productBook.json';
import BookInfo from '../Component/BookInfo';
import {CardImg, CardText, CardBody,CardTitle, Row, Col, Container, Button} from 'reactstrap';
import '../Css/product.css';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import axios from 'axios';
import AddToCart from '../Component/AddToCart';


class Product extends Component 
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
            recivedURL:'',quantityCount:1,countError:false,openToggle:false,cardId:'',
            quantityBook : 1, showUsername, pageName:'',bookType:'',bookName:'',showCartDetails:false,
            loginError:false,addToCartError:false,bookDownloadError:false,loggedIn
        }
    }
    reduceCount = e =>
    {
        if(this.state.quantityCount!==1)
            this.setState({quantityCount:this.state.quantityCount-1,countError:false})
        else
            return null;
    }
    addCount = e =>
    {
        if(this.state.quantityCount!==5)
            this.setState({quantityCount:this.state.quantityCount+1})
        else
            this.setState({countError:true,loginError:false,addToCartError:false,bookDownloadError:false})
    }
    componentDidMount()
    {
        window.scrollTo(0,0);
        var url = window.location.pathname
        var str_url = url.toString()
        var res1 = str_url.replace('%20',' ')
        var res2 = str_url.replace('/','')
        var Page_Name = decodeURIComponent(res2.split("/")[0])
        var Book_Type = decodeURIComponent(res2.split("/")[1])
        var Book_Name = decodeURIComponent(res1.split("=")[1])
        this.setState({pageName : Page_Name})
        this.setState({bookType : Book_Type})
        this.setState({bookName : Book_Name})

    }
    componentWillReceiveProps()
    {
        window.scrollTo(0,0);
        var url = window.location.pathname
        var str_url = url.toString()
        var res1 = str_url.replace('%20',' ')
        var res2 = str_url.replace('/','')
        var Page_Name = decodeURIComponent(res2.split("/")[0])
        var Book_Type = decodeURIComponent(res2.split("/")[1])
        var Book_Name = decodeURIComponent(res1.split("=")[1])
        this.setState({pageName : Page_Name})
        this.setState({bookType : Book_Type})
        this.setState({bookName : Book_Name})
    }
    openDescription = (id) =>
    {   
        this.setState({openToggle : true,cardId:id})
    }
    closeDescription = (id) =>
    {
        this.setState({openToggle : false,cardId:id})
    }

    // API Call

    handleCartAdd = e =>
    {
        if(this.state.loggedIn === true)
            {
            const userInfo = {
                username : this.state.showUsername,
                booktype : this.state.bookType,
                bookname : this.state.bookName,
                quantity : this.state.quantityCount
            }
            if(this.state.showUsername)
            {
                axios.post('https://pickbooks.herokuapp.com/usercart/userCartAdd',userInfo)
                .then(responseData => {
                    if(responseData.status === 200)
                    {
                        sessionStorage.setItem("userCount",1)
                        this.setState({showCartDetails : true})
                    }
                })
                .catch(err => {
                    this.setState({addToCartError : true,loginError:false,bookDownloadError:false,countError:false})
                })
            }
        }
        else
        {
            this.setState({loginError : true,addToCartError:false,bookDownloadError:false,countError:false})
        }
    }
    handleClose = () =>
    {
        this.setState({showCartDetails : false})
    }
    handleBookDownload = e =>
    {
        if(this.state.loggedIn !== true)
        {
            this.setState({bookDownloadError : true,loginError:false,addToCartError:false,countError:false})
        }
    }
    render()
    {
        document.title = `${this.state.pageName} | Pick-Books`;
    
        return(
            <div>
                <Header />
            <div className="main-product">
                <div className="container">
                    <Row>
                        <Col md={{size : 12}}>
                            <div className="product-head-bread">
                                <div className="product-bread-heading">{this.state.pageName}</div>
                                <div className="product-bread-para-display">
                                    <div className="product-bread-para"><Link to="/">Home</Link></div>
                                    <div className="product-bread-split"><i className="fa fa-angle-right"></i></div>
                                    <div className="product-bread-para2">{this.state.bookType}</div>
                                    <div className="product-bread-split"><i className="fa fa-angle-right"></i></div>
                                    <div className="product-bread-para2">{this.state.bookName}</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div><br/><br/>
                <Container>
                    {
                        ProductList.ProductType.map((type)=>
                        {
                            if(type.Title===this.state.bookType)
                            {
                                return<Row key={type.mainID}>
                                {
                                    type.ProductInfo.map((name) => 
                                    {
                                        if(name.BookName===this.state.bookName)
                                        {
                                            return  (
                                                    <div key={name.id}>
                                                        <Col md={{size : 6, offset : 1}} sm={{size : 6, offset : 1}}>
                                                            <CardImg top className="product-image" src={process.env.PUBLIC_URL + name.Imgsrc} alt="Card image cap" />
                                                        </Col>
                                                        <Col md={{size : 6}} sm={{size : 5}}>
                                                            <CardBody>
                                                                <CardText className="product-type-name">{type.Title}</CardText>
                                                                <CardTitle className="product-book-name">{name.BookActualName}</CardTitle>
                                                                <div className="product-book-rating-display">
                                                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                                                        <Rating name="read-only"  className="product-book-rating" defaultValue={name.DefaultRating} precision={0.5} size="large"  readOnly />
                                                                    </Box>
                                                                    <div className="product-book-rating-name">{name.DefaultRating}</div>
                                                                </div>
                                                                <CardText className="product-book-discount-price">M.R.P : <s> &#8377; {Number(name.ActualPrice).toLocaleString('en-US')}</s></CardText>
                                                                <CardText className="product-book-price">Price : &#8377; {Number(name.DiscountPrice).toLocaleString('en-US')}</CardText>
                                                                <CardText className="product-book-available">Available : {name.Available}</CardText>
                                                                <hr className="product-hr"/>
                                                                <CardText className="product-book-discription"><span className="product-book-discription-heading">Discription : </span> {name.Discription}</CardText>
                                                                <CardText className="product-book-author"><span className="product-book-author-heading">Author : </span> {name.Author}</CardText>
                                                                <CardText className="product-book-published"><span className="product-book-published-heading">Published Date : </span> {name.Published}</CardText>
                                                                <hr className="product-hr"/>
                                                                <div className="product-item">
                                                                    <CardText className="product-book-quantity-heading">Quantity :</CardText>
                                                                    <CardText className="product-book-quantity-icon"  onClick={this.reduceCount}><i className="fa fa-minus"></i></CardText>
                                                                    <CardText className="product-book-quantity-count">{this.state.quantityCount}</CardText>
                                                                    <CardText className="product-book-quantity-icon"  onClick={this.addCount}><i className="fa fa-plus"></i></CardText>
                                                                </div>
                                                                <div className="product-item2">
                                                                    <CardText className="product-book-cart">Add To Cart </CardText>
                                                                    <ShoppingCartIcon className="product-book-icon" style={{fontSize:'17px'}} onClick={this.handleCartAdd}/> 
                                                                    
                                                                    <AddToCart 
                                                                    showCartDetails={this.state.showCartDetails} 
                                                                    handleClose={this.handleClose} 
                                                                    bookName = {name.BookName}
                                                                    />
                                                                    
                                                                    <CardText className="product-book-download">Free Download </CardText>
                                                                    <GetAppOutlinedIcon className="product-book-icon" style={{fontSize:'20px'}} onClick={this.handleBookDownload}/>
                                                                </div>
                                                                {
                                                                    this.state.loginError ? 
                                                                    <CardText className="product-book-login-Error">*You have not loggedIn</CardText> : null
                                                                }
                                                                {
                                                                    this.state.addToCartError ? 
                                                                    <CardText className="product-book-login-Error">*Book Already Added to your Cart</CardText> : null
                                                                }
                                                                {
                                                                    this.state.bookDownloadError ? 
                                                                    <CardText className="product-book-login-Error">*Please Login to download book</CardText> : null
                                                                }
                                                                {
                                                                    this.state.countError?
                                                                    <CardText className="product-book-login-Error">*Maximum Count for single book is (Five)</CardText>:null
                                                                }
                                                                <Button className="product-book-buy-btn"><Link to={`/Shipping/${this.state.bookType}/${this.state.quantityCount}/${this.state.bookName}`}>Buy Now</Link></Button>
                                                            </CardBody><br/><br/>
                                                        </Col>
                                                        
                                                    </div>
                                                    )
                                        }
                                        else return null
                                    })
                                }
                                </Row>
                            }
                            else return null
                        })
                    }
                </Container>
                <div className="product-member-back-color">
                    <div className="container">
                        <Row>
                            <Col md={{size : 12}}>
                            <div className="product-member-heading">Special Offer for Subscribers with</div> 
                            <div className="product-member-subheading">TEN Percent Member Discount</div>
                            <div className="product-member-para">Subscribe to our newsletters now and stay up to date with new collections, the latest lookbooks and exclusive offers.</div>
                            </Col>
                        </Row>
                        <div className="row">
                            <div className="col-md-offset-3 col-md-6">
                                <div className="product-member-text">
                                    <input text="email" placeholder="Enter Email Address" className="product-member-textfiled"/>
                                    <button className="product-member-btn">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div><br/><br/><br/><br/><br/><br/>
                </div>
                <Container>
                    <hr className="product-member-hr"/>
                    <Row>
                        <Col md={{offset : 1, size : 12}}>
                            <CardBody>
                                <CardText className="product-related-name">People Also Look for</CardText>
                                <CardText className="product-related-description">{this.state.bookType} Books</CardText>
                            </CardBody>
                        </Col>
                    </Row>
                    <BookInfo 
                    CardId={this.state.cardId} 
                    toggleOpen={this.openDescription} 
                    toggleClose={this.closeDescription}
                    isOpen={this.state.openToggle}  
                    name={this.state.bookType} size={4} 
                    />
                </Container>
                <br/><br/><br/><br/>
            </div>
            <Footer/>
            </div>
        )
    }
}

export default Product