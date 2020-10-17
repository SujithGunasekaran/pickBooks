import React, { Component} from 'react';
import Address from '../Component/Address';
import PaymentCheck from '../Component/PaymentCheck';
import FinalPayment from '../Component/FinalPayment';
import BookList from '../Json/bookinfolist.json';
import '../Css/shipping.css';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Header from '../Component/Header';
import { Redirect } from 'react-router-dom';
import Footer from '../Component/Footer';

class Shipping extends Component
{
    constructor(props)
    {
        super(props);
        const token = sessionStorage.getItem("userToken");
        const username = sessionStorage.getItem("username");
        const email = sessionStorage.getItem("email");
        let loggedIn = false;
        let showUsername = null;
        let showEmail = null;
        if(token !== null)
        {
            loggedIn = true;
        }
        if(username !== null)
        {
            showUsername = username;
            showEmail = email;
        }
        this.state={
            page:['Address','Shipping','Payment'],pageIndex:0,
            receivedURL : '',
            email : showEmail,emailError : false,
            firstName : showUsername, firstNameError : false,
            lastName : '', lastNameError : false,
            doorNo : '', doorNoError : false,
            streetName : '', streetNameError : false,
            city : '', cityError : false,
            state : '', stateError : false,
            pincode : '', pincodeError : false,
            paymentCheckName : '',
            paymentCheckEmail : '',
            paymentDoorNo : '',
            paymentStreetName : '',
            paymentCity : '',
            paymentState : '',
            paymentPinCode : '',
            BookImageUrl : '',BookType:'',BookImageName : '',BookImagePrice : '',
            showBankDetails : false, modeOfTransaction:'', bankName:'', showCVV : false,showPayButton : false,
            cardNumber:'',CvvNumber:'',loggedIn,showUsername,showEmail
        }
    }
    componentDidMount()
    {
        window.scrollTo(0,0);
        this.setState({receivedURL : window.location.pathname})
    }
    PreviousStep = e =>
    {
        e.preventDefault();
        this.setState({pageIndex : this.state.pageIndex-1})
    }
    handleErrorUpdate = e =>
    {
        if(e.target.name === "email") {this.setState({emailError:false})}
        if(e.target.name === "firstName"){this.setState({firstNameError:false})}
        if(e.target.name === "doorNo"){this.setState({doorNoError : false})}
        if(e.target.name === "streetName"){this.setState({streetNameError:false})}
        if(e.target.name === "city"){this.setState({cityError:false})}
        if(e.target.name === "state"){this.setState({stateError : false})}
        if(e.target.name === "pincode"){this.setState({pincodeError : false})}
    }
    validateForm()
    {
        if(this.state.email === "") {this.setState({emailError:true})}
        if(this.state.firstName === ""){this.setState({firstNameError:true})}
        if(this.state.doorNo === ""){this.setState({doorNoError : true})}
        if(this.state.streetName === ""){this.setState({streetNameError:true})}
        if(this.state.city === ""){this.setState({cityError:true})}
        if(this.state.state === ""){this.setState({stateError : true})}
        if(this.state.pincode === ""){this.setState({pincodeError : true})}
    }
    NextStep = e =>
    {
        e.preventDefault();
        if(this.state.pageIndex === 0)
        {
            this.validateForm();
        }
        if(this.state.email === "" || this.state.firstName === "" || this.state.doorNo === "" ||
            this.state.streetName === "" || this.state.city === "" || this.state.state === "" ||
            this.state.pincode === "")
        {
            this.setState({pageIndex : this.state.pageIndex + 0})
        }
        else
        {
            this.setState({pageIndex : this.state.pageIndex+1, showBankDetails:false,showPayButton:false,bankName:''})
        }
    }
    handleInputChange = e =>
    {
        this.setState({ [e.target.name] : e.target.value })
        if(e.target.name === 'email')
        {
            this.setState({paymentCheckEmail : e.target.value})
        }
        if(e.target.name === 'firstName')
        {
            this.setState({paymentCheckName : e.target.value})
        }
        if(e.target.name === 'doorNo'){this.setState({paymentDoorNo : e.target.value})}
        if(e.target.name === 'doorNo'){this.setState({paymentDoorNo : e.target.value})}
        if(e.target.name === 'streetName'){this.setState({paymentStreetName : e.target.value})};
        if(e.target.name === 'city'){this.setState({paymentCity : e.target.value})};
        if(e.target.name === 'state'){this.setState({paymentState : e.target.value})};
        if(e.target.name === 'pincode'){this.setState({paymentPinCode : e.target.value})};
    }

    handleRadioChange = e =>
    {
        this.setState({modeOfTransaction : e.target.id})
        if(e.target.id==="NetBanking" && this.state.bankName !=='')
        {
            this.setState({showBankDetails : false,showPayButton:true})
        }
        else if(this.state.bankName!=='')
        {
            this.setState({showPayButton : false,showBankDetails:true,showCVV:false,cardNumber:'',CvvNumber:''})
        }
    }
    handleBankRadioChange = e =>
    {
        this.setState({bankName : e.target.id})
        if(this.state.modeOfTransaction === 'DebitCard' || this.state.modeOfTransaction === 'CreditCard')
        {
            this.setState({showBankDetails : true,showCVV:false,showPayButton:false,cardNumber:'',CvvNumber:''})
        }
        else if(this.state.modeOfTransaction === 'NetBanking')
        {
            this.setState({showBankDetails : false,showPayButton:true})
        }
    }
    handleAccountNumberChange = e =>
    {
        this.setState({cardNumber : e.target.value})
        if(e.target.value.length === 16)
            this.setState({showCVV : true})
    }
    handleCvvChange = e =>
    {
        this.setState({CvvNumber : e.target.value})
        if(e.target.value.length === 4)
            this.setState({showPayButton : true})
    }
    render()
    {
        if(this.state.loggedIn !== true)
        {
            return <Redirect to="/Login" />
        }

        document.title = "Shipping | Pick-Books";

        let DeliveryCharges = 60;
        var BookPrice;
        var DiscountPrice;
        var ActualPrice;

        var url = this.state.receivedURL;
        var str_url = url.toString();
        var res1 = str_url.replace('%20',' ');
        var res2 = str_url.replace('/','');
        // var Page_Name = decodeURIComponent(res2.split("/")[0]);
        var Book_Type = decodeURIComponent(res2.split("/")[1]);
        var Book_Quantity = decodeURIComponent(res2.split("/")[2]);
        var Book_Name = decodeURIComponent(res1.split("/")[4]);


        return(
            <div>
                <Header />
            <div style={{marginTop:'100px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            {
                                this.state.page[this.state.pageIndex] === 'Address' ? 
                                <Address 
                                email={this.state.email} emailError={this.state.emailError}
                                firstName={this.state.firstName} firstNameError={this.state.firstNameError}
                                lastName={this.state.lastName}
                                doorNo={this.state.doorNo} doorNoError={this.state.doorNoError}
                                streetName={this.state.streetName} streetNameError={this.state.streetNameError}
                                city={this.state.city} cityError={this.state.cityError}
                                state={this.state.state} stateError={this.state.stateError}
                                pincode={this.state.pincode} pincodeError={this.state.pincodeError}
                                inputChange = {this.handleInputChange}
                                inputErrorUpdate = {this.handleErrorUpdate}
                                /> : null
                            }
                            {
                                this.state.page[this.state.pageIndex] === 'Shipping' ? 
                                <PaymentCheck
                                customerName = {this.state.firstName}
                                customerEmail = {this.state.email} 
                                customerDoorNo = {this.state.paymentDoorNo}
                                customerStreetName = {this.state.paymentStreetName}
                                customerCity = {this.state.paymentCity}
                                customerState = {this.state.paymentState}
                                customerPinCode = {this.state.pincode}
                                receivedURL = {this.state.receivedURL}
                                /> :null
                            }
                            {
                                this.state.page[this.state.pageIndex] === 'Payment' ? 
                                <FinalPayment
                                handleRadioChange={this.handleRadioChange}
                                handleBankRadioChange = {this.handleBankRadioChange}
                                handleAccountNumberChange = {this.handleAccountNumberChange}
                                showBankDetails = {this.state.showBankDetails}
                                CardNumber = {this.state.cardNumber}
                                showCVV = {this.state.showCVV}
                                handleCvvChange = {this.handleCvvChange}
                                showPayButton = {this.state.showPayButton}
                                /> : null
                            }
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                {
                                    this.state.pageIndex >= 1 ?  <button onClick={this.PreviousStep} className="shipping-back-btn"><i className="fa fa-angle-left" style={{paddingRight:'7px'}}></i>Return to {this.state.page[this.state.pageIndex-1]}</button> : null
                                }
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                {
                                    this.state.pageIndex <= 1 ?  <button onClick={this.NextStep} className="shipping-next-btn">Continue to {this.state.page[this.state.pageIndex+1]}</button> : null
                                }
                                </div><br/><br/><br/><br/><br/><br/><br/><br/>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6">
                            {
                                BookList.BookType.map((bookname)=>
                                {
                                    if(Book_Type === bookname.Title)
                                    {
                                        return(bookname.BookInfo.map((booklist,index)=>
                                        {
                                            if(booklist.BookName === Book_Name)
                                            {
                                                DiscountPrice = Math.round(Number(((booklist.DiscountPrice * Book_Quantity)*12)/100)+ Number(booklist.DiscountPrice * Book_Quantity))
                                                ActualPrice = Math.round(Number(((booklist.ActualPrice * Book_Quantity)*12)/100)+ Number(booklist.ActualPrice * Book_Quantity))
                                                BookPrice = ActualPrice - DiscountPrice;

                                                return(
                                                    <div key={index}>
                                                        <div className="row">
                                                            <div className="col-xs-offset-0 col-sm-offset-0 col-sm-12 col-md-offset-1 col-md-11 col-xs-12">
                                                                <div className="shipping-price-details-conatiner">
                                                                    <div className="shipping-price-details-heading">PRICE <span style={{paddingLeft:'3px'}}>DETAILS</span></div>
                                                                    <hr className="shipping-price-details-conatiner-hr"/>
                                                                    <div className="shipping-price-display-new">
                                                                        <div className="shipping-price-name-head">Price (1 item)</div>
                                                                        <div className="shipping-price-show">&#8377; {Number(booklist.DiscountPrice * Book_Quantity).toLocaleString('en-US')}</div>
                                                                    </div>
                                                                    <div className="shipping-price-display-new">
                                                                        <div className="shipping-price-name-head">GST</div>
                                                                        <div className="shipping-price-show">12 %</div>
                                                                    </div>
                                                                    {
                                                                        booklist.DiscountPrice * Book_Quantity >= 1000 ?
                                                                        <div>
                                                                            <div className="shipping-price-display-new">
                                                                                <div className="shipping-price-name-head">Delivery Charges</div>
                                                                                <div className="shipping-price-show">&#8377; 0</div>
                                                                            </div>
                                                                        </div>:
                                                                         <div className="shipping-price-display-new">
                                                                            <div className="shipping-price-name-head">Delivery Charges</div>
                                                                            <div className="shipping-price-show">&#8377; {DeliveryCharges}</div>
                                                                        </div>
                                                                    }
                                                                    <hr className="shipping-price-details-conatiner-hr2"/>
                                                                    {
                                                                        booklist.DiscountPrice * Book_Quantity >= 1000 ?
                                                                        <div className="shipping-price-display-new">
                                                                            <div className="shipping-price-name-total">TOTAL <span style={{paddingLeft:'4px'}}>PAYABLE</span></div>
                                                                            <div className="shipping-price-total">&#8377; {(Number(DiscountPrice + 0)).toLocaleString('en-US')}</div>
                                                                        </div> :
                                                                        <div className="shipping-price-display-new">
                                                                            <div className="shipping-price-name-total">TOTAL <span style={{paddingLeft:'4px'}}>PAYABLE</span></div>
                                                                            <div className="shipping-price-total">&#8377; {(Number(DiscountPrice + DeliveryCharges)).toLocaleString('en-US')}</div>
                                                                        </div>
                                                                    }
                                                                    <hr className="shipping-price-details-conatiner-hr"/>
                                                                    {
                                                                        booklist.DiscountPrice * Book_Quantity >= 1000 ?
                                                                        <div className="shipping-price-display-new">
                                                                            <div className="shipping-price-save-name">You Save Total of &#8377; {(Number(BookPrice + 0)).toLocaleString('en-US')}</div>
                                                                        </div> :
                                                                        <div className="shipping-price-display-new">
                                                                            <div className="shipping-price-save-name">You Save Total of &#8377; {(Number(BookPrice + DeliveryCharges)).toLocaleString('en-US')}</div>
                                                                        </div>
                                                                    }<br/>
                                                                </div>
                                                                <hr/>
                                                                <div className="shipping-secure-container">
                                                                    <VerifiedUserIcon style={{color:'#253447',fontSize:'28px',marginLeft:'10px',marginTop:'8px'}} />
                                                                    <div className="shipping-secure-notes">Safe and Secure Payments, Each returns. 100% Authentic products.</div>
                                                                </div>
                                                            </div>
                                                        </div><br/><br/><br/><br/>
                                                    </div>
                                                )
                                            }
                                        }))
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}
export default Shipping