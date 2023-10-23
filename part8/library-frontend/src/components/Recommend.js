
import { useQuery } from "@apollo/client"
import { ME } from "../queries"
const Recommend = ({books}) => {

    const user = useQuery(ME)
    const filteredBooks = books.filter(book => book.genres.includes(user.data.me.favoriteGenre))
    if(!user.data || user.loading){
        return(
            <div>loading</div>
        )
    }

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
