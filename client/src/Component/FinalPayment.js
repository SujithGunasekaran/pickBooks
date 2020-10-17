import React, { useEffect } from 'react'
import '../Css/payment.css';

function FinalPayment(props)
{
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return(
        <div>
            <div className="payment-shipping-icon-combine">
                <div className="payment-shipping-logo">1</div>
                <div className="payment-shipping-name-image">Address</div>
                <i className="fa fa-angle-right payment-shipping-icon-right"></i>
                <div className="payment-shipping-logo2">2</div>
                <div className="payment-shipping-name-image">Shipping</div>
                <i className="fa fa-angle-right payment-shipping-icon-right"></i>
                <div className="payment-shipping-logo2">3</div>
                <div className="payment-shipping-name-image">Payment</div>
            </div>
            <div className="final-payment-mode-container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="final-payment-mode-name">Mode Of Payment</div>
                    </div>
                    <div className="col-md-4">
                        <input className="form-check-input final-payment-mode-radio" type="radio" name="exampleRadios" id="DebitCard" value="option1" onClick={props.handleRadioChange}/>
                        <label className="form-check-label final-payment-mode-radio-label" htmlFor="exampleRadios1">
                            Debit Card
                        </label>
                    </div>
                    <div className="col-md-4">
                        <input className="form-check-input final-payment-mode-radio" type="radio" name="exampleRadios" id="CreditCard" value="option1" onClick={props.handleRadioChange}/>
                        <label className="form-check-label final-payment-mode-radio-label" htmlFor="exampleRadios1">
                            Credit Card
                        </label>
                    </div>
                </div>
                <div className="row bank-row-margin">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <input className="form-check-input final-payment-mode-radio" type="radio" name="exampleRadios" id="NetBanking" value="option1" onClick={props.handleRadioChange}/>
                        <label className="form-check-label final-payment-mode-radio-label" htmlFor="exampleRadios1">
                            Net Banking
                        </label>
                    </div>
                </div>
                <div className="row" style={{marginTop:'35px'}}>
                    <div className="col-md-4">
                        <div className="final-payment-mode-name">Select Bank</div>
                    </div>
                    <div className="col-md-4">
                        <input className="form-check-input final-payment-mode-radio" type="radio" name="exampleRadios2" id="StateBank" value="option2" onClick={props.handleBankRadioChange}/>
                        <label className="form-check-label final-payment-mode-radio-label" htmlFor="exampleRadios2">
                            State Bank
                        </label>
                    </div>
                    <div className="col-md-4">
                        <input className="form-check-input final-payment-mode-radio" type="radio" name="exampleRadios2" id="HDFC" value="option2" onClick={props.handleBankRadioChange}/>
                        <label className="form-check-label final-payment-mode-radio-label" htmlFor="exampleRadios2">
                            HDFC
                        </label>
                    </div>
                </div>
                <div className="row bank-row-margin">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <input className="form-check-input final-payment-mode-radio" type="radio" name="exampleRadios2" id="ICICI" value="option2" onClick={props.handleBankRadioChange}/>
                        <label className="form-check-label final-payment-mode-radio-label" htmlFor="exampleRadios2">
                            ICICI
                        </label>
                    </div>
                    <div className="col-md-4">
                        <input className="form-check-input final-payment-mode-radio" type="radio" name="exampleRadios2" id="Axis" value="option2" onClick={props.handleBankRadioChange}/>
                        <label className="form-check-label final-payment-mode-radio-label" htmlFor="exampleRadios2">
                            Axis Bank
                        </label>
                    </div>
                </div>
                {
                    props.showBankDetails === true ?
                    <div className="bank-container">
                        <div className="bank-heading">Card Details</div>
                        <div className="bank-label-name">Card Number</div>
                        <input type="Text" maxLength="16" placeholder="Enter Card Number" value={props.CardNumber} className="bank-textfield" onChange={props.handleAccountNumberChange}/>
                        {
                            props.showCVV === true ?
                            <div>
                                <div className="bank-label-name">CVV Number</div>
                                <input type="Password" maxLength="4" placeholder="Enter CVV Number" className="bank-textfield" onChange={props.handleCvvChange}/>
                            </div>:null
                        }
                    </div>:null
                }
                {
                    props.showPayButton ? 
                    <button className="bank-next-btn">Pay</button>:null
                }
            </div>
        </div>
    )
}

export default FinalPayment