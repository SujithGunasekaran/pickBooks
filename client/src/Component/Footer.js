import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Css/footer.css';
import {CardText, CardBody, Row, Col, Container} from 'reactstrap';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import ShopIcon from '@material-ui/icons/Shop';
import Avatar from '@material-ui/core/Avatar';


class Footer extends Component
{
    render()
    {
        return(
            <div className="main-footer">
                <div className="container-fluid">
                    <Row>
                        <Col sm={{size : 6, offset : 1}} md={{size : 6, offset : 1}}>
                            <CardBody>
                                <div className="footer-icon-combine">
                                    <Avatar style={{backgroundColor:'#335eea',fontSize:'19px',fontFamily: "'PT Sans', sans-serif"}}>PB</Avatar>
                                    <CardText className="footer-name-image">Pick-Books</CardText>
                                </div>
                                <CardText className="footer-about-para">We Provide you a best book which can be brought or you can download (Some books). These Books are most rated by the people</CardText>
                                <CardText className="footer-mobile"><span className="footer-mobile-heading">Mobile : </span> +82-99932-76986</CardText>
                                <CardText className="footer-email"><span className="footer-email-heading">Email : </span> mydeveloperstar@gmail.com</CardText>
                            </CardBody>
                        </Col>
                        <Col sm={{size : 3}} md={{size : 2}}>
                            <CardBody>
                                <CardText className="footer-business">Busniess Hour</CardText>
                                <div className="footer-logo-combine">
                                    <CardText className="footer-business-icon"><LocalShippingIcon style={{fontSize:'18px'}}/></CardText>
                                    <CardText className="footer-business-hour">24/7 Business</CardText>
                                </div>
                                <div className="footer-logo-combine">
                                    <CardText className="footer-business-icon"><ContactSupportIcon style={{fontSize:'18px'}}/></CardText>
                                    <CardText className="footer-business-hour">24/7 Support</CardText>
                                </div>
                            </CardBody>
                        </Col>
                        <Col sm={{size : 3}} md={{size : 2}}>
                            <CardBody>
                                <CardText className="footer-business">Quick Link</CardText>
                                <CardText className="footer-quick-link"><Link to="/">Home</Link></CardText>
                                <CardText className="footer-quick-link"><Link to="/About">About</Link></CardText>
                                <CardText className="footer-quick-link"><Link to="/Contact">Contact</Link></CardText>
                            </CardBody>
                        </Col>
                        <Col sm={{size : 6}} md={{size : 2}} >
                            <CardBody>
                                <CardText className="footer-business">Quick Shop</CardText>
                                <CardText className="footer-quick-shop"><Link to="/Shop/Science">Science</Link></CardText>
                                <CardText className="footer-quick-shop"><Link to="/Shop/Economic">Economic</Link></CardText>
                                <CardText className="footer-quick-shop"><Link to="/Shop/Adventure">Adventure</Link></CardText>
                            </CardBody>
                        </Col>
                    </Row>
                    <hr className="footer-hr"/>
                    <Row>
                        <Col sm={{size : 7}} md={{size : 6, offset : 1}}>
                            <CardText className="footer-copyright">© 2020, Pick-Books.in, All Rights Reserved</CardText>
                        </Col>
                        <Col sm={{size : 5}} md={{size : 6}}>
                            <div className="footer-bottom-display">
                                <CardText className="footer-bottom-icon"><a title="Twitter" href="https://twitter.com/?lang=en" type="twitter"><TwitterIcon style={{fontSize:'20px'}}/></a></CardText>
                                <CardText className="footer-bottom-icon"><a title="Facebook" href="https://www.facebook.com/"><FacebookIcon style={{fontSize:'20px'}}/></a></CardText>
                                <CardText className="footer-bottom-icon"><a title="Instagram" href="https://www.instagram.com/?hl=en"><InstagramIcon style={{fontSize:'20px'}}/></a></CardText>
                                <CardText className="footer-bottom-icon"><a title="Google Book Store" href="https://books.google.com/books?uid=117522004192189783614"><ShopIcon style={{fontSize:'20px'}}/></a></CardText>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Footer