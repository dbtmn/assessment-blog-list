import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Home from './modules/Home';
import Blog from './modules/Blog';
import Navbar from "./components/Navbar";
import mainLogo from "../public/logo.svg";
import backgroundImage from "../public/background.png";

import { Routes as RoutesEnum } from "./constants/Routes";

import './App.scss';

interface AppState {
  isTitleAvailable: boolean
}

class App extends React.Component<{/* do-nothing */}, AppState> {
  state = {
    isTitleAvailable: false
  };

  handleLinkClick = (route: string) => {
    this.setState({ isTitleAvailable: route === location.pathname });
  }

  getTitle = () => {
    return window.location.pathname === RoutesEnum.BLOG && <div className="app__title">Blog</div>;
  }

  render() {
    return (
        <Routes>
          <Route
            element={<div className="app">
              <div className="app__header" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="app__logo-wrapper">
                  <img className="app__logo" src={mainLogo} alt="mainLogo" />
                  <Navbar onLinkClick={(route) => this.handleLinkClick(route)} />
                </div>
                {this.getTitle()}
              </div>
              <div className="app__container">
                <Outlet />
              </div>
            </div>}>
            <Route path={RoutesEnum.HOME} element={<Home />} />
            <Route path={RoutesEnum.BLOG} element={<Blog />} />
          </Route>
        </Routes>
    );
  }
}

export default App;
