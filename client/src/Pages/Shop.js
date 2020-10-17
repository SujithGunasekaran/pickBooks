import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../Css/shop.css';
import AppsIcon from '@material-ui/icons/Apps';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import BookType from '../Component/BookType';
import BookInfo from '../Component/BookInfo';
import book_shop from '../Images/book-shop.jpg';
import Header from '../Component/Header';
import Footer from '../Component/Footer';


class Shop extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            menuItem : '',setMenuItem:'',resultNumberOfBook:'',openToggle:false,cardId:'',
            pageColumn : 3,pageName:'',bookType:''
        }
    }

    handleChange = e =>
    {
        this.setState({setMenuItem : e.target.value})
    }
    handlePageColumn = e =>
    {
        if(e.target.id === '3Grid')
        {
            this.setState({pageColumn : 3})
        }
        else
        {
            this.setState({pageColumn : 1})
        }
    }
    updateResultNumber = (noofbooks) =>
    {
        this.setState({resultNumberOfBook : noofbooks})
    }
    componentDidMount()
    {
        window.scrollTo(0,0);
        var url = window.location.pathname
        var str_url = url.toString()
        var res1 = str_url.replace('/','')
        var Page_Name = decodeURIComponent(res1.split("/")[0])
        var Book_Type = decodeURIComponent(res1.split("/")[1])
        this.setState({pageName : Page_Name, bookType : Book_Type})
    }
    componentWillReceiveProps()
    {
        window.scrollTo(0,0);
        var url = window.location.pathname
        var str_url = url.toString()
        var res1 = str_url.replace('/','')
        var Page_Name = decodeURIComponent(res1.split("/")[0])
        var Book_Type = decodeURIComponent(res1.split("/")[1])
        this.setState({pageName : Page_Name, bookType : Book_Type})
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
        document.title = `${this.state.pageName} | Pick-Books`;
        
        var BookResultCount;
        
        // var url = this.state.receiverBookTypeUrl;
        // var str_url = url.toString();
        // var res1 = str_url.replace('/','');
        // var Page_Name = decodeURIComponent(res1.split("/")[0]);
        // var Book_Type = decodeURIComponent(res1.split("/")[1]);


        return(
            <div>
                <Header />
            <div className="shop-main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="shop-head-bread">
                            <div className="shop-bread-heading">{this.state.pageName}</div>
                                <div className="shop-bread-para-display">
                                    <div className="shop-bread-para"><Link to="/">Home</Link></div>
                                    <div className="shop-bread-split"><i className="fa fa-angle-right"></i></div>
                                    <div className="shop-bread-para2">{this.state.pageName}</div>
                                    <div className="shop-bread-split"><i className="fa fa-angle-right"></i></div>
                                    <div className="shop-bread-para2">{this.state.bookType}</div>
                                </div><br/>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="shop-top">
                                <div className="shop-grid-icon" title="3 * 3 Grid view" ><AppsIcon style={{fontSize:'25px'}} id="3Grid" onClick={this.handlePageColumn} /></div>
                                <div className="shop-grid-icon" title="1 * 1 Grid view" ><ViewHeadlineIcon style={{fontSize:'25px'}} id="1Grid" onClick={this.handlePageColumn} /></div>
                                    <div className="shop-grid-cat">Showing Categories : <span className="shop-grid-cat-name">{this.state.bookType}</span></div>
                                    <div className="shop-grid-result">Showing : <span className="shop-grid-cat-name">1-{this.state.resultNumberOfBook} of {this.state.resultNumberOfBook} result</span></div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-9 col-md-push-3">
                            <div className="row">
                                <BookInfo   
                                CardId={this.state.cardId} 
                                toggleOpen={this.openDescription} 
                                toggleClose={this.closeDescription}
                                isOpen={this.state.openToggle} 
                                name={this.state.bookType} 
                                size={this.state.pageColumn}
                                />
                            </div>
                            <br/><br/><br/><br/>
                        </div>
                        <div className="col-md-3 col-md-pull-9">
                            <div className="shop-Categories-sidebar">
                                <div className="shop-Categories-name">Categories</div>
                                <BookType updateNumber={this.updateResultNumber}/>
                                <hr/>
                                <div className="shop-Categories-name">Quick Link</div>
                                <div className="shop-quick-type-ul"><Link to="/">Home</Link></div>
                                <div className="shop-quick-type-ul"><Link to="/About">About</Link></div>
                                <div className="shop-quick-type-ul"><Link to="/Contact">Contact</Link></div>
                                <hr/>
                                <div className="shop-Categories-name">Banner</div>
                                <img src={book_shop} width="100%" height="200px" alt='book-shop'/>
                            </div>
                        </div>
                    </div><br/><br/><br/><br/>
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}

export default Shop