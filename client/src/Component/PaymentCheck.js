import React, { useEffect } from 'react'
import '../Css/paymentShipping.css';
import BookList from '../Json/bookinfolist.json';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';



function PaymentCheck(props)
{
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    var url = props.receivedURL;
    var str_url = url.toString();
    var res1 = str_url.replace('%20',' ');
    var res2 = str_url.replace('/','');
    var Book_Type = decodeURIComponent(res2.split("/")[1]);
    var Book_Quantity = decodeURIComponent(res2.split("/")[2]);
    var Book_Name = decodeURIComponent(res1.split("/")[4]);


    return(
        <div>
            <div className="payment-shipping-icon-combine">
                <div className="payment-shipping-logo">1</div>
                <div className="payment-shipping-name-image">Address</div>
                <i className="fa fa-angle-right payment-shipping-icon-right"></i>
                <div className="payment-shipping-logo2">2</div>
                <div className="payment-shipping-name-image">Shipping</div>
            </div>
            <div className="payment-shipping-container">
                <div className="shipping-price-details-heading">Address and Contact Details</div>
                <hr className="payment-shipping-price-details-conatiner-hr" />
                <div className="payment-shipping-main-name-display">
                    <div className="payment-shipping-main-name">Email</div>
                    <div className="payment-shipping-sub-name">{props.customerEmail}</div>
                </div>
                <div className="payment-shipping-main-name-display">
                    <div className="payment-shipping-main-name">Name</div>
                    <div className="payment-shipping-sub-name">{props.customerName}</div>
                </div>
                <div className="payment-shipping-main-name-display">
                    <div className="payment-shipping-main-name">Address</div>
                    <div className="payment-shipping-sub-name">{props.customerDoorNo} {props.customerStreetName},<br/>
                    {props.customerCity}, {props.customerState} - {props.customerPinCode}</div>
                </div>
            </div>
            <div className="order-summary-heading">Order Summary</div>
            <hr/>
            {
                BookList.BookType.map((booktype)=>
                {
                    if(booktype.Title === Book_Type)
                    {
                        return(booktype.BookInfo.map((bookinfo,index)=>
                        {
                            if(bookinfo.BookName === Book_Name)
                            {
                                return(
                                    <div key={index}>
                                        <div className="order-summary-book-container">
                                            <img src={process.env.PUBLIC_URL + bookinfo.Imgsrc} className="order-summary-book-image" alt="Card image cap" />
                                            <div className="order-summary-book-name-display">
                                                <div className="order-summary-book-type">{booktype.Title}</div>
                                                <div className="order-summary-book-name">{bookinfo.BookName}</div>
                                                <Box component="fieldset" mb={3} borderColor="transparent">
                                                    <Rating name="read-only"  className="order-summary-book-rating" defaultValue={bookinfo.DefaultRating} precision={0.5} size="medium"  readOnly />
                                                </Box>
                                                <div className="order-summary-book-price">price : &#8377; {Number(bookinfo.DiscountPrice).toLocaleString('en-US')}</div>
                                            </div>
                                        </div>
                                        <div className="order-summary-container">
                                            <div className="order-summary-bookdetails-display">
                                                <div className="order-summary-booklist-name">Book Name</div>
                                                <div className="order-summary-booklist-name-details">{bookinfo.BookName}</div>
                                            </div>
                                            <div className="order-summary-bookdetails-display">
                                                <div className="order-summary-booklist-name">Quantity</div>
                                                <div className="order-summary-booklist-name-details">{Book_Quantity}</div>
                                            </div>
                                            <div className="order-summary-bookdetails-display">
                                                <div className="order-summary-booklist-name">Book Price</div>
                                                <div className="order-summary-booklist-name-details">&#8377; {Number(bookinfo.DiscountPrice).toLocaleString('en-US')}</div>
                                            </div>
                                            <div className="order-summary-bookdetails-display">
                                                <div className="order-summary-booklist-name">Total Price <br/><span style={{fontSize:'11px'}}><i>(*Includes GST and Delivery Charges, Delivery Charges Apply below Rs.1,000)</i></span></div>
                                                {
                                                    bookinfo.DiscountPrice * Book_Quantity >=1000 ?
                                                    <div className="order-summary-booklist-name-details">&#8377; {Math.round((Number(((bookinfo.DiscountPrice * Book_Quantity)*12)/100)) + Number(bookinfo.DiscountPrice * Book_Quantity)).toLocaleString('en-US')}</div>:
                                                    <div className="order-summary-booklist-name-details">&#8377; {Math.round((Number(((bookinfo.DiscountPrice * Book_Quantity)*12)/100) + Number(bookinfo.DiscountPrice * Book_Quantity))+60).toLocaleString('en-US')}</div>
                                                }
                                               
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                                
                        }))
                    }
                })
            }
        </div>
    )
}

export default PaymentCheck