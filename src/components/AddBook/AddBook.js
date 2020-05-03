import React, {useState} from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
// import { graphql } from 'react-apollo';
// import { flowRight as compose } from 'lodash';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../../queries/queries';

function AddBook() {
  const [name, setName] = useState(null)
  const [genre, setGenre] = useState(null)
  const [authorId, setAuthorId] = useState(null)
  const [addBook] = useMutation(addBookMutation);
  const {loading, data} = useQuery(getAuthorsQuery);

  const displayAuthors = () => {
    if (loading) {
      return(<option disabled>Loading Authors...</option>)
    } else {
      return(
        data.authors.map(author => {
          return(
            <option key={author.id} value={author.id}>{author.name}</option>
          )
        })
      )
    }
  }

  const submitForm = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name, genre, authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  return (
    <form id="add-book" onSubmit={submitForm}>
      <label className="field">
        <span>Book name:</span>
        <input type="text" onChange={({target:{value}}) => setName(value)}/>
    </label>

      <label className="field">
        <span>Genre:</span>
      <input type="text" onChange={({target:{value}}) => setGenre(value)}/>
      </label>

      <label className="field">
        <span>Author:</span>
        <select onChange={({target:{value}}) => setAuthorId(value)}>
          <option>Select author</option>
          {
            displayAuthors()
          }
        </select>
      </label>

      <button>+</button>
    </form>
  );
}

export default AddBook;
