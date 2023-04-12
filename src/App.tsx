import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { fetchPosts } from "./store/posts/actions";
import { SortBy } from "./store/posts/types";

import Home from './modules/Home';
import Blog from './modules/Blog';
import Navbar from "./components/Navbar";
import mainLogo from "../public/logo.svg";
import backgroundImage from "../public/background.png";

import './App.scss';
import { Routes as RoutesEnum } from "./constants/Routes";

// props from connect mapDispatchToProps
interface DispatchProps {
  fetchPosts: (page: number, categoryId: number, sortBy?: SortBy, searchPhrase?: string) => Promise<void>;
}

interface AppState {
  isTitleAvailable: boolean
}

class App extends React.Component<DispatchProps, AppState> {
  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts(1, 1);
  }

  state = {
    isTitleAvailable: false
  };

  handleLinkClick = (route: string) => {
    console.log(route);
    this.setState({ isTitleAvailable: route === location.pathname });
  }

  getTitle = () => {
    return window.location.pathname === RoutesEnum.BLOG && <div className="app__title">Blog</div>;
  }

  render() {

    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = {
  fetchPosts,
};

export default connect(null, mapDispatchToProps)(App);
