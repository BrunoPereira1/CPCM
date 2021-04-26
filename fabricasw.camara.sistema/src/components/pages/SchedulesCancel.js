import React, { Component } from "react";

import Header from "../components-system/header/Header";
import Menu from "../components-system/menu/Menu";
import SchedulesContent from "../components-system/contents/SchedulesContent";
import Footer from "../components-system/footer/Footer";

export default class SchedulesCancel extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu menuConfig="4"/>
        <SchedulesContent
          typeRequest="/List"
          namePage="Cancelados"
          menuConfig="4"
          hrefPage="/SchedulesCancel"
        />
        <Footer />
      </div>
    );
  }
}
