import React from 'react';
import {useQuery} from '@apollo/react-hooks';

//import query functions
import { getBookQuery } from '../../queries/queries';

function BookDetails({bookId, setSelectedBook}) {
  const {data, loading} = useQuery(getBookQuery, {
    variables: { id: bookId },
  });

  const displaBookDetails = () => {
    if(loading) {
      return (
        <div>Loading...</div>
      )
    } else if (data.book) {
      return (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>All books by this author</p>
          <ul className="other-books">
              {data.book.author.books.map(item => {
                  return <li key={item.id} onClick={() => setSelectedBook(item.id)}>{item.name}</li>
              })}
          </ul>
        </div>
      )
    } else {
      return (
        <div>No book selected.</div>
      )
    }
  }

  return (
    <div id="book-details">
      {displaBookDetails()}
    </div>
  )
}

export default BookDetails;
