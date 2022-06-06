import Link from 'next/link';

const Home = () => {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"auto"}}>
      <h1>NextJS pre-rendering Home page</h1>
      <nav>
        <button><Link href={"/posts"}><a>All posts</a></Link></button>
        <button><Link href={"/users"}><a>All Users</a></Link></button>
      </nav>
    </div>
  );
};

export default Home;