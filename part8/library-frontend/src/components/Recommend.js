
import { useQuery } from "@apollo/client"
import { ME, ALL_BOOKS } from "../queries"
const Recommend = ({books}) => {

    const user = useQuery(ME)
    const qlBookFilter = useQuery(ALL_BOOKS,{variables: {genre:user.data && user.data.me.favoriteGenre}})
  
 
    if( user.loading || qlBookFilter.loading){
        return(
            <div>loading</div>
        )
    }
    const filteredBooks = qlBookFilter.data.allBooks

    
    return(
        <div>
            <h2>Recommendations</h2>
            books in your favorite genre <b>{user.data.me.favoriteGenre}</b>
            <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    
    
        </div>
    )


}
export default Recommend
