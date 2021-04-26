import React, { Component } from "react";

import Header from "../components-system/header/Header";
import Menu from "../components-system/menu/Menu";
import SchedulesContent from "../components-system/contents/SchedulesContent";
import Footer from "../components-system/footer/Footer";

export default class SchedulesComplete extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu menuConfig="3"/>
        <SchedulesContent
          typeRequest="/List"
          namePage="Concluídos"
          menuConfig="3"
          hrefPage="/SchedulesComplete"
        />
        <Footer />
      </div>
    );
  }
}
