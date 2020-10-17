import React, { useEffect } from 'react';
import '../Css/address.css';


function Address (props)
{
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return(
        <div className="address-main">
            <div className="address-icon-combine">
                <div className="address-logo">1</div>
                <div className="address-name-image">Address</div>
            </div>
            <div className="address-form-container">
                <form>
                    <div className="address-contact-name">Contact Infomation</div>
                    <input type="email" placeholder="Email Address" className="address-contact-textfield1" value={props.email} name="email" onChange={props.inputChange} onInputCapture={props.inputErrorUpdate} />
                    {
                        props.emailError === true ?
                        <div>
                            <div className="address-shipping-input-error">
                                <div className="address-shipping-hideMe-login">Please Enter Email Address</div>
                            </div>
                        </div>:null
                    }
                    <div className="address-shipping-name">Shipping Information</div>
                        <div className="row">
                            <div className="col-sm-6 col-md-6">
                                <input type="text" placeholder="First Name" className="address-shipping-textfield" value={props.firstName} name="firstName" onChange={props.inputChange} onInputCapture={props.inputErrorUpdate} />
                                {
                                    props.firstNameError === true ?
                                    <div>
                                        <div className="address-shipping-input-error">
                                            <div className="address-shipping-hideMe-login">Please Enter First Name</div>
                                        </div>
                                    </div>:null
                                }
                            </div>
                            <div className="col-sm-6 col-md-6">
                                <input type="text" placeholder="Last Name" className="address-shipping-textfield" value={props.lastName} name="lastName" onChange={props.inputChange} onInputCapture={props.inputErrorUpdate} />
                            </div>
                        </div>
                        <input type="text" placeholder="D/No" className="address-shipping-textfield" value={props.doorNo} name="doorNo" onChange={props.inputChange} onInputCapture={props.inputErrorUpdate} />
                        {
                            props.doorNoError ? 
                            <div>
                                <div className="address-shipping-input-error">
                                    <div className="address-shipping-hideMe-login">Please Enter Door No</div>
                                </div>
                            </div>:null
                        }
                        <input type="text" placeholder="Street Name" className="address-shipping-textfield" value={props.streetName} name="streetName" onChange={props.inputChange} onInputCapture={props.inputErrorUpdate}  />
                        {
                            props.streetNameError ? 
                            <div>
                                <div className="address-shipping-input-error">
                                    <div className="address-shipping-hideMe-login">Please Enter Street Name</div>
                                </div>
                            </div>:null
                        }
                        <input type="text" placeholder="City" className="address-shipping-textfield" value={props.city} name="city" onChange={props.inputChange} onInputCapture={props.inputErrorUpdate} />
                        {
                            props.cityError ? 
                            <div>
                                <div className="address-shipping-input-error">
                                    <div className="address-shipping-hideMe-login">Please Enter City Name</div>
                                </div>
                            </div>:null
                        }
                        <div className="row">
                            <div className="col-sm-6 col-md-6">
                                <select className="form-control address-shipping-textfield" placeholder="State" value={props.state} id="sel1" name="state" onChange={props.inputChange} onSelect={props.inputErrorUpdate}>
                                    <option value="" disabled>State</option>
                                    <option>Tamil Nadu</option>
                                    <option>Kerala</option>
                                    <option>Karnataka</option>
                                    <option>Maharastra</option>
                                </select>
                                {
                                    props.stateError ? 
                                    <div>
                                        <div className="address-shipping-input-error">
                                            <div className="address-shipping-hideMe-login">Please Select State</div>
                                        </div>
                                    </div>:null
                                }
                            </div>
                            <div className="col-sm-6 col-md-6">
                                <input type="text" placeholder="Pin Code" value={props.pincode} className="address-shipping-textfield" name="pincode" onChange={props.inputChange} onInputCapture={props.inputErrorUpdate} />
                                {
                                    props.pincodeError ? 
                                    <div>
                                        <div className="address-shipping-input-error">
                                            <div className="address-shipping-hideMe-login">Please Enter PinCode</div>
                                        </div>
                                    </div>:null
                                }
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    )
}
export default Address