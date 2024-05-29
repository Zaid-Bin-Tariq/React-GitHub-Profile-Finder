import { useState, useEffect } from "react";
import "./App.css";
import User from "./User.jsx";

function App() {
  const [username, setUsername] = useState("Zaid-Bin-Tariq");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleSubmit() {
    getGithubUserData();
  }

  async function getGithubUserData(params) {
    setLoading(true);
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    if (data) {
      setUserData(data);
      setLoading(false);
      setUsername("");
    }
  }

  useEffect(() => {
    getGithubUserData();
  }, []);

  if (loading) {
    return <h1>Loading data, please wait!</h1>;
  }

  return (
    <>
      <div className="github-profile-container">
        <div className="input-wrapper">
          <input
            name="search-by-username"
            placeholder="search github username..."
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>
        {userData !== null ? <User user={userData} /> : null}
      </div>
    </>
  );
}

export default App;
