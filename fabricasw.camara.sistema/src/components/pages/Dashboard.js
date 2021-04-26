import React, { Component } from "react";

import Header from "../components-system/header/Header";
import Menu from "../components-system/menu/Menu";
import Footer from "../components-system/footer/Footer";
import DashboardContent from "../components-system/contents/DashboardContent";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu menuConfig="5"/>
        <DashboardContent/>
        <Footer />
      </div>
    );
  }
}