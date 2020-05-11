const graphql = require('graphql');
const db = require('../dataBase/index');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return db
          .query(`select * from authors where id = $1`, [parent.authorId])
          .then(res => {
            return res[0]
          })
          .catch(err => console.error(err))
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return db
          .query(`select * from books where "authorId" = $1`, [parent.id])
          .then(res => {
            return res;
          }, err => console.error(err))
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLID }},
      resolve(parent, args) {
        return db
          .query(`select * from books`)
          .then(res => {
            return res.find(item => item.id == args.id);
          })
          .catch(err => console.error(err))
      }
    },
    author: {
      type: AuthorType,
      args: {id: { type: GraphQLID }},
      resolve(parent, args) {
        return db
          .query('select * from authors')
          .then(res => {
            let author = res.find(author => author.id == args.id)
            return author;
          })
          .catch(err => console.error(err))
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return db
          .query('select * from books')
          .then(res => {
            return res;
          })
          .catch(err => console.error(err))
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return db
          .query('select * from authors')
          .then(res => {
            return res;
          })
          .catch(err => console.error(err))
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
