import React from 'react';
import '../Css/bookinfo.css';
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Col} from 'reactstrap';
import BookList from '../Json/bookinfolist.json';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';



  
const BookInfo = (props) =>
{

    let id = props.name;
    let showSize = props.size;
    // let CardId = props.CardId;
    // let showDescription = props.isOpen;
    let sizeResult;
    let count = 0;
    return(
        <div>
                {
                    BookList.BookType.map((type , index)=>
                    {
                        if(showSize === 4)
                        {
                            sizeResult = '3';
                            count = 3;
                        }
                        if(showSize === '3')
                        {
                            sizeResult = '4';
                        }
                        if(type.Title===id && showSize !== 1)
                        {
                            return <div key={index}>
                            {
                                type.BookInfo.map((name,index)=>
                                {
                                    if( ( showSize === 4 && index <= count ) || ( showSize === 3) || ( showSize === '3') )
                                    {
                                        return  <Col key={name.id} sm={{size: 4}} md={{size : sizeResult}}>
                                                <Card className="book-card">
                                                <Link to={`/Product/${type.Title}/BookName=${name.BookName}`}>
                                                    <CardImg top className="book-card-image" src={process.env.PUBLIC_URL + name.Imgsrc} alt="Card image cap" />
                                                    <CardBody>
                                                        <CardTitle className="book-card-name">{name.BookName}</CardTitle>
                                                        <CardSubtitle className="book-card-rating">
                                                        <div className="book-card-rating-display">
                                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                                            <Rating name="read-only"  className="book-card-rating" defaultValue={name.DefaultRating} precision={0.5} size="large"  readOnly />
                                                        </Box>
                                                        <div className="book-card-rating-name">{name.DefaultRating}</div>
                                                        </div>
                                                        </CardSubtitle>
                                                        {/* <Button onClick={()=>props.toggleOpen(name.id)} id="info-dropdown" className="book-card-dropdown">Book Information <i id="arrow" className="fa fa-angle-down"></i></Button>
                                                        {
                                                            CardId === name.id ?
                                                            <Card>
                                                                {
                                                                    showDescription?
                                                                    <div className="book-card-dropdown-info">
                                                                        <CardBody><span className="book-span-name1">Availbility : </span><span className="book-span-name2">{name.Available}</span></CardBody>
                                                                        <CardBody className="book-card-dropdown-name"><span className="book-span-name1">Author : </span><span className="book-span-name2">{name.Author}</span></CardBody>
                                                                        <CardBody className="book-card-dropdown-name"><span className="book-span-name1">Published Date : </span><span className="book-span-name2">{name.Published}</span></CardBody><br/>
                                                                        <button className="book-card-close-btn" onClick={()=>props.toggleClose(name.id)}>Close</button><br/><br/>
                                                                    </div>:null
                                                                }
                                                            </Card>:null
                                                        }   */}
                                                        <CardText className="book-card-price">&#8377; {Number(name.DiscountPrice).toLocaleString('en-US')}<s className="book-card-strike"> &#8377; {Number(name.ActualPrice).toLocaleString('en-US')}</s></CardText>
                                                    </CardBody><br/>
                                                    </Link>

                                                </Card>
                                            </Col>
                                    }
                                })  
                            }</div>
                        }
                        else if(type.Title===id && showSize === 1)
                        {
                            return <div key={index}>
                            <Col key={type.id} xs={{size: 12}} sm={{size: 12}} md={{size : 12}}>
                            {
                                type.BookInfo.map((booklist,index)=>{
                                    return(
                                            <div className="bookinfo-one-book-card" key={index}>
                                                <Link to={`/Product/${type.Title}/BookName=${booklist.BookName}`}>
                                                    <div className="bookinfo-one-book-card-display">
                                                        <img className="bookinfo-one-book-img" src={process.env.PUBLIC_URL + booklist.Imgsrc} alt="Card" />
                                                        <div className="bookinfo-one-book-card-info-display">
                                                            <div className="bookinfo-one-book-name">{booklist.BookName}</div>
                                                            <div className="bookinfo-one-book-rating-display">
                                                                <Box component="fieldset" mb={3} borderColor="transparent">
                                                                    <Rating name="read-only"  className="bookinfo-one-book-rating" defaultValue={booklist.DefaultRating} precision={0.5} size="large"  readOnly />
                                                                </Box>
                                                                <div className="bookinfo-one-book-rating-name">{booklist.DefaultRating}</div>
                                                            </div>
                                                            <div className="bookinfo-one-book-card-price">&#8377; {booklist.DiscountPrice}<s className="bookinfo-one-book-card-strike"> &#8377; {booklist.ActualPrice}</s></div>
                                                            <hr className="bookinfo-one-book-card-hr"/>
                                                            <div className="bookinfo-one-book-card-author-display">
                                                                <div className="bookinfo-one-book-card-author-name">Available :</div>
                                                                <div className="bookinfo-one-book-card-author-subname">{booklist.Available}</div>
                                                            </div>
                                                            <div className="bookinfo-one-book-card-author-display">
                                                                <div className="bookinfo-one-book-card-author-name2">Author :</div>
                                                                <div className="bookinfo-one-book-card-author-subname2">{booklist.Author}</div>
                                                            </div>
                                                            <div className="bookinfo-one-book-card-author-display">
                                                                <div className="bookinfo-one-book-card-author-name2">Published Date :</div>
                                                                <div className="bookinfo-one-book-card-author-subname2">{booklist.Published}</div>
                                                            </div>
                                                            {/* <div className="bookinfo-one-book-info1">Dropdown</div>
                                                            <div className="bookinfo-one-book-info">Hello</div> */}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                    )
                                })
                            }
                            </Col>
                            </div>
                        }
                    })
                }
        </div>
    )
}


export default BookInfo
