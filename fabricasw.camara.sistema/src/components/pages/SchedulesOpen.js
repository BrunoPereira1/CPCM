import React, { Component } from "react";

import Header from "../components-system/header/Header";
import Menu from "../components-system/menu/Menu";
import SchedulesContent from "../components-system/contents/SchedulesContent";
import Footer from "../components-system/footer/Footer";

export default class SchedulesOpen extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu menuConfig="1"/>
        <SchedulesContent
          typeRequest="/List"
          namePage="Abertos"
          menuConfig="1"
          hrefPage="/SchedulesOpen"
        />
        <Footer />
      </div>
    );
  }
}
