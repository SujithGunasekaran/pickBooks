import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Css/home.css';
import BookInfo from './BookInfo';
import home_book from '../Images/home.svg';
import LatestBook from './LatestBooks';
import {Row,Container} from 'reactstrap';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../Css/loader.css';


class Home extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            BookType:'Adventure',btnType:'Adventure',openToggle:false,cardId:''
        }
    }
    componentDidMount()
    {
        window.scrollTo(0,0);
    }
    redirectURL = e =>
    {
        this.setState({BookType:e.target.id,btnType:e.target.id})
    }
    openDescription = (id) =>
    {   
        this.setState({openToggle : true,cardId:id})
    }
    closeDescription = (id) =>
    {
        this.setState({openToggle : false,cardId:id})
    }
    render()
    {

        document.title = "Home | Pick-Books";

        let active=false;
        let active1=false;
        let active2=false;
        if(this.state.btnType==="Adventure")
        active=true;
        if(this.state.btnType==="Economic")
        active1=true;
        if(this.state.btnType==="Mystery")
        active2=true;

        let activebtn = active ? 'home-product-btn-active' : 'home-product-btn';
        let activebtn1 = active1 ? 'home-product-btn-active' : 'home-product-btn';
        let activebtn2 = active2 ? 'home-product-btn-active' : 'home-product-btn';


        return(
            <div>
                <Header/>
            <div className="home-main">
                <div className="home-main-background">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="home-top-heading">Welcome To <span className="home-top-heading-sub-color">Pick Books</span></div>
                                <div className="home-top-quote">" A Room without Books is like a body without Soul "</div>
                                <div className="home-top-para">For the majority of people, books are part of their everyday life. A book is like a best friend who will never walk away from you. Books are packed with knowledge, insights into a happy life, We are Providing a new Arrival of books, And also we providing all types of books. “ When you open a book, you open a new world ”</div>
                                <div className="home-top-link"><Link to={`/Shop/${this.state.BookType}`}>View All Books <span className="arrow-span"><i className="fa fa-arrow-right"></i></span></Link></div>
                            </div>
                            <div className="col-md-6">
                                <img src={home_book} alt="home_book" width="100%" height="400px" style={{marginTop:'65px'}}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <svg className="home-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,261.3C672,277,768,267,864,245.3C960,224,1056,192,1152,160C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> */}
                <svg className="home-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#335eea" fillOpacity="1" d="M0,0L60,42.7C120,85,240,171,360,218.7C480,267,600,277,720,256C840,235,960,181,1080,170.7C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                {/* <svg className="home-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,0L60,10.7C120,21,240,43,360,85.3C480,128,600,192,720,218.7C840,245,960,235,1080,218.7C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg> */}
                {/* <svg className="home-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,160L60,186.7C120,213,240,267,360,282.7C480,299,600,277,720,240C840,203,960,149,1080,138.7C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg> */}
                <br/><br/><br/><br/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="home-heading">Our Products</div>
                            <div className="home-subheading">We Provide you a best book which can be brought or you can download (Some books). These Books are most rated by the people</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-offset-1 col-sm-offset-1 col-md-offset-3 col-md-2">
                            <div className={activebtn} onClick={this.redirectURL} id="Adventure">Adventure</div>
                        </div>
                        <div className="col-xs-offset-1 col-sm-offset-1 col-md-offset-0 col-md-2">
                            <div className={activebtn1} onClick={this.redirectURL} id="Economic">Economic</div>
                        </div>
                        <div className="col-xs-offset-1 col-sm-offset-1 col-md-offset-0 col-md-2">
                            <div className={activebtn2} onClick={this.redirectURL} id="Mystery">Mystery</div>
                        </div>
                    </div>
                    <Container>
                        <Row>
                            <BookInfo 
                            CardId={this.state.cardId} 
                            toggleOpen={this.openDescription} 
                            toggleClose={this.closeDescription}
                            isOpen={this.state.openToggle} 
                            name={this.state.BookType} 
                            size={4} />
                        </Row>
                    </Container>
                </div>
                <div className="home-discount-back-color">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <div className="home-discount-heading1">Best Seller</div>
                                <div className="home-point-display">
                                    <div className="home-discount-point">&#10004;</div>
                                    <div className="home-discount-subheading">Most Valuable Books</div>
                                </div>
                                <div className="home-discount-para">We Provide Top rated books by the customer, And also these books are award winning books of the years.</div>
                                <div className="home-point-display">
                                    <div className="home-discount-point">&#10004;</div>
                                    <div className="home-discount-subheading">Top Rated Books</div>
                                </div>
                                <div className="home-discount-para">You will be finding a best books in our website with 100% garentee, Also our websites are userfriendly to use.</div>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <div className="home-discount-heading1">Big Discount</div>
                                <div className="home-point-display">
                                    <div className="home-discount-point">&#10004;</div>
                                    <div className="home-discount-subheading">With Exciting Offers</div>
                                </div>
                                <div className="home-discount-para">We are Providing with low price, Anyone can buy the books, read and gain knowledge. With exciting offers, let's explore the book world.</div>
                                <div className="home-point-display">
                                    <div className="home-discount-point">&#10004;</div>
                                    <div className="home-discount-subheading">Free Downloar</div>
                                </div>
                                <div className="home-discount-para">We allow customer to download books for free, Some people will ready books online those people can also start downloading books from our picks-books.</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="home-discount-heading2">Let's Start to Explore Your Books</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="home-discount-display">
                                    <Link to={`/Shop/${this.state.BookType}`} className="home-discount-btn">Explore <span className="arrow-span"><i className="fa fa-arrow-right"></i></span></Link>
                                </div>
                            </div>
                        </div><br/><br/><br/>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <LatestBook />
                    </div>
                </div>
                <div className="home-shipping-back-color">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <LocalShippingIcon className="home-shipping-icon" style={{fontSize:'58px',marginTop:'60px'}}/>
                                <div className="home-sipping-name">Free Shipping Offers Available</div>
                                <div className="home-shipping-name-info">We offer free shipping via Standard Shipping on orders over &#8377; 1000.00, Below 1,000 Rupees based on your location we will charge</div>
                            </div>
                            <div className="col-md-4">
                                <AttachMoneyIcon className="home-shipping-icon" style={{fontSize:'58px',marginTop:'60px'}}/>
                                <div className="home-sipping-name">Money Back Guarantee</div>
                                <div className="home-shipping-name-info">We Offer 100% money back, If any pages are damages, But you can exchnage it half day after your delivery, after that we will not accept</div>
                            </div>
                            <div className="col-md-4">
                                <ContactSupportIcon className="home-shipping-icon" style={{fontSize:'58px',marginTop:'60px'}}/>
                                <div className="home-sipping-name">Online Support 24/7 Available</div>
                                <div className="home-shipping-name-info">You can Contact our customer services we can help you at time, 24/7 online support will be given to customer, You can also share your feedback</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                            <div className="home-product-member-heading">Special Offer for Subscribers with</div> 
                            <div className="home-product-member-subheading">TEN Percent Member Discount</div>
                            <div className="home-product-member-para">Subscribe to our newsletters now and stay up to date with new collections, the latest lookbooks and exclusive offers.</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-offset-3 col-md-6">
                                <div className="home-product-member-text">
                                    <input text="email" placeholder="Enter Email Address" className="home-product-member-textfiled"/>
                                    <button className="home-product-member-btn">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div><br/><br/><br/><br/><br/><br/>
                </div><br/><br/>
            </div>
            <Footer/>
            </div>
        )
    }
}

export default Home