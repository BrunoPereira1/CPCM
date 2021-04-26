import React, { Component } from "react";

import Header from "../components-system/header/Header";
import Menu from "../components-system/menu/Menu";
import ManagerUsers from "../components-system/contents/ManagerUsers"; 
import Footer from "../components-system/footer/Footer";

export default class UsersManager extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu menuConfig="6"/>
        <ManagerUsers/>
        <Footer />
      </div>
    );
  }
}