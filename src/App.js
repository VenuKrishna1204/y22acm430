import React from "react";
import {BrowserRouter as Router,Route,Routes,Link } from "react-router-dom";
import ShortenerPage from "./pages/ShortPage";
import StatisticsPage from "./pages/StatisticsPage";
import {AppBar,Toolbar,Button} from "@mui/material";

function App(){
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Shortener</Button>
          <Button color="inherit" component={Link} to="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
