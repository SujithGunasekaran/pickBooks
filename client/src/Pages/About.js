import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../Css/about.css';
import aboutImage from '../Images/about.svg';


class About extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            pageName : ''
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
        document.title = "About | Pick-Books";
        return(
            <div>
                <Header />
                <div className="about-main">
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
                    <div className="container" style={{marginTop:'40px'}}>
                        <div className="row">
                            <div className="col-md-5">
                                <img src={aboutImage} width="100%" alt="aboutlogo"/>
                            </div>
                            <div className="col-md-7">
                                <div className="about-main-heading">About Our Team</div>
                                <hr className="about-main-heading-hr" />
                                <div className="about-main-para">We Providing you the best books from every category of books, And also over teams focusing on UI to make still better and aslo userfriendly. 
                                We are providing exclusive offer for customer, our customer feedbacks are positive we still brings you more books. Still many of them intrested to read stories in books and also in PDF format in mobile or laptop, We provide that features also just signup to our website and 
                                You can download any books for free of cost. If You'r willing to buy the books you can place order in our website</div>
                                <Link to="/Contact"><button className="about-contact-button">Contact Our Team</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default About