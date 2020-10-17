import React from 'react';
import '../Css/booktype.css';
import Book_Type_Name from '../Json/booktype.json';
import { Link } from 'react-router-dom';



const BookType =  (props) =>
{
    let update = props.updateNumber;
    return (
        <div>
            {
                Book_Type_Name.BookType.map((type,index) =>
                {
                    return(
                    <div key={index}>
                        <ul className="book-type-ul">
                            <Link to={`/Shop/${type.BookTypeName}`}>
                                <li id={type.id} onClick={()=>update(type.BookTypeAvailable)}> {type.BookTypeName} <span className="book-type-li-number">{type.BookTypeAvailable}</span></li>
                            </Link>
                        </ul>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default BookType