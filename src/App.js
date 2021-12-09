import "./App.css";
import CreateUser from "./components/create-user/createUser";
import AppBar from "./components/header/header";
import ShowUsers from "./components/show-users/showUsers";

import { useState } from "react";
function App() {
  const [page, setPage] = useState(0);
  return (
    <div className="App">
      <AppBar page={page} setPage={setPage} />
      {page === 0 && <CreateUser />}
      {page === 1 && <ShowUsers />}
    </div>
  );
}

export default App;
