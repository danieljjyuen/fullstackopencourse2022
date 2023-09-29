const UserSingleView = ({userSelected}) => {
if(!userSelected){
return(<div></div>)
}
    return(
        <div>
            <h3>{userSelected.name}</h3>
            <h4>added blogs</h4>
            <ul>
                {userSelected.blogs.map(blog=> 
                    <li key={blog.id}>{blog.title}</li>
                )
                }
            </ul>
        </div>
    )
}

export default UserSingleView