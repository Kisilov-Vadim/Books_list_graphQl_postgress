import React, {useState} from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../../queries/queries';

function AddBook(props) {
  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [authorId, setAuthorId] = useState('')

  const displayAuthors = () => {
    if (props.getAuthorsQuery.loading) {
      return(<option disabled>Loading Authors...</option>)
    } else {
      return(
        props.getAuthorsQuery.authors.map(author => {
          return(
            <option key={author.id} value={author.id}>{author.name}</option>
          )
        })
      )
    }
  }

  const submitForm = (e) => {
    e.preventDefault();
    props.addBookMutation({
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

export default compose(
  graphql(getAuthorsQuery, { name:"getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
