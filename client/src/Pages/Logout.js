import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import '../Css/loader.css';

class LogOut extends Component
{
    constructor(props)
    {
        super(props)
        sessionStorage.removeItem("userToken")
        sessionStorage.clear()
        sessionStorage.removeItem("username")
        sessionStorage.clear()
        sessionStorage.removeItem("email")
        sessionStorage.clear()
        this.state = {
            redirect : false,
            loading : true
        }
    }
    componentDidMount()
    {
        this.id = setTimeout (()=> this.setState({redirect:true,loading : false}),3500);
    }
    componentWillUnmount()
    {
        clearTimeout(this.id)
    }
    render()
    {
        return(
            <div>
                <div style={{marginTop:'100px'}}>
                    {
                        this.state.redirect ?
                        <Redirect to="/" />:
                        <div>
                            <div class="triple-spinner"></div>
                        </div> 
                    }
                </div>
            </div>
        )
    }
}

export default LogOut