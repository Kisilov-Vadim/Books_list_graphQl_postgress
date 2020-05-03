import React, {useState} from 'react';
import { graphql } from 'react-apollo';

//import Components
import BookDetails from '../BookDetails/BookDetails';

//import query functions
import { getBooksQuery } from '../../queries/queries';

function BookList(props) {
  const [selectedBook, setSelectedBook] = useState(null)

  const displayBooks = () => {
    let data = props.data;
    if (data.loading) {
      return(<div>Loading books...</div>)
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

export default graphql(getBooksQuery)(BookList);
