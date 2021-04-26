import React, { Component } from "react";

import Header from "../components-system/header/Header";
import Menu from "../components-system/menu/Menu";
import NewSchedules from "../components-system/contents/NewSchedules";
import Footer from "../components-system/footer/Footer";

export default class NewSchedule extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu menuConfig="0"/>
        <NewSchedules/>
        <Footer />
      </div>
    );
  }
}