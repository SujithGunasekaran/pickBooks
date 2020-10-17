import React from 'react';
import LastestArrival from '../Json/LatestArraival.json';
import '../Css/latestbooks.css';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';


function LatestBooks()
{
    return(
        <div>
            {
                LastestArrival.BookType.map((name,index)=>
                {
                    return  <div key={index}>
                                <div className="col-sm-6 col-md-4">
                                    <div className="latest-book-row-head">{name.Title}</div>
                                    <hr/>
                                    {
                                        name.BookInfo.map((bookInfo,index)=>
                                        {
                                            return(
                                                <div className="latest-book-display" key={index}>
                                                    <Link to={`/Product/${name.Title}/BookName=${bookInfo.BookName}`}>
                                                    <div className="latest-book-card">
                                                        <div className="latest-book-card-display">
                                                            <img className="latest-book-img" src={process.env.PUBLIC_URL + bookInfo.Imgsrc} alt="Card" />
                                                            <div className="latest-book-card-info-display">
                                                                <div className="latest-book-name">{bookInfo.BookName}</div>
                                                                <div className="latest-book-rating-display">
                                                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                                                        <Rating name="read-only"  className="latest-book-rating" defaultValue={bookInfo.DefaultRating} precision={0.5} size="large"  readOnly />
                                                                    </Box>
                                                                    <div className="latest-book-rating-name">{bookInfo.DefaultRating}</div>
                                                                </div>
                                                                <div className="latest-book-card-price">&#8377; {bookInfo.DiscountPrice}<s className="latest-book-card-strike"> &#8377; {bookInfo.ActualPrice}</s></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                })
            }
        </div>
    )
}

export default LatestBooks