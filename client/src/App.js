import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Homepage from "componants/scenes/HomePage";
import LoginPage from "componants/scenes/LoginPage";
import ProfilePage from "componants/scenes/ProfilePage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/*SETTING UP THE ROUTES*/}
          <Route path="/" element={<LoginPage />} /> 
           {/* Login page route this will be the first route user see when they open the application home path */}
          <Route path="/home" element={<Homepage />} />
            {/* When path will home then homepage will render  */}
          <Route path="/profile/:userId" element={<ProfilePage />} />
          {/*Taking user id from the params we gonna render the profile page of the user */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
