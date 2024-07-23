import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import NavBar from "./pages/navBar/nav.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import AllRecipe from "./pages/AllRecipe/AllRecipe.jsx";
import NewRecipe from "./pages/NewRecipe/newRecipe.jsx";
// import Layout from "./Layout"; // Import the Layout component

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<AllRecipe />} />
        <Route path="/addNewRecipe" element={<NewRecipe />} />
      </>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
