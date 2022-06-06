
const User = ({user}) => {
    return (
        <div style={{border:"1px solid", margin:"3px"}}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.website}</p>
        </div>
    );
};

export default User;