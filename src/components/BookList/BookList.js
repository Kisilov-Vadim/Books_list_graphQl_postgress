import React, {useState} from 'react';
// import { graphql } from 'react-apollo';
import {useQuery} from '@apollo/react-hooks';

//import Components
import BookDetails from '../BookDetails/BookDetails';

//import query functions
import { getBooksQuery } from '../../queries/queries';

function BookList() {
  const [selectedBook, setSelectedBook] = useState(null)
  const {loading, error, data} = useQuery(getBooksQuery);

  const displayBooks = () => {
    if (loading) {
      return(<div>Loading books...</div>)
    } else if (error) {
      return (
        <div>Sorry, err...</div>
      )
    } else {
      return data.books.map(book => {
        return(
          <li key={book.id} onClick={(e) => setSelectedBook(book.id)}>{book.name}</li>
        )
      })
    }
  }

  return (
    <>
      <ul className="book-list">
        {
          displayBooks()
        }
      </ul>
      <BookDetails bookId={selectedBook} setSelectedBook={setSelectedBook}/>
    </>
  );
}

export default BookList;
