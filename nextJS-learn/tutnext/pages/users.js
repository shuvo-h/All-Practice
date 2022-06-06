import User from "../components/user";

const UserList = ({users}) => {
    console.log(users);
    return (
        <div >
            <h2>List of users: {users.length}</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)"}}>
                {
                    users.map((user,index) =><User user={user} key={index}></User>)
                }
            </div>
        </div>
    );
};

export default UserList;




// from here, what you will return as name props, this props will be accessed from the Upper component function
// the props "users" is returning from here, so it will be accessed from the <UserList> component (Top of this js file)
export async function getStaticProps() { // function name must be this "getStaticProps"
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json();
    console.log(data);
  return {
      props:{users: data}
  }
}

/*
// getStaticProps main points
1) getStaticProps function func only on the server side, so, the data will be shown on VS code terminal, not in browser console
2) This function will never run on client side, as a result, the code will be written in this function will not be included in the JS bundle
3) you can write server side props directly in the server side props
4) getStaticProps function is only allowed in a page and cannot be run from a regular component file
5) it is only for pre-rendering and not client side data fetching
6) getStaticProps function should retuen an object and object should contain a props key which is an object
7) getStaticProps will run only one time at build time, and store the data as static data in the props variable


*/
