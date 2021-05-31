const Home = ({ setIsLoggedIn }) => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => setIsLoggedIn(false)}>Log out</button>
    </div>
  );
};

export default Home;
