import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Homepage from "componants/scenes/HomePage";
import LoginPage from "componants/scenes/LoginPage";
import ProfilePage from "componants/scenes/ProfilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <Routes>
          
            {/*SETTING UP THE ROUTES*/}
            <Route path="/" element={<LoginPage />} />
            {/* Login page route this will be the first route user see when they open the application home path */}
            <Route path="/home" element={<Homepage />} />
            {/* When path will home then homepage will render  */}
            <Route path="/profile/:userId" element={<ProfilePage />} />
            {/*Taking user id from the params we gonna render the profile page of the user */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
