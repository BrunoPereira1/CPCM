import React, { Component } from "react";

import Header from "../components-system/header/Header";
import Menu from "../components-system/menu/Menu";
import SchedulesContent from "../components-system/contents/SchedulesContent";
import Footer from "../components-system/footer/Footer";

export default class SchedulesPending extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu menuConfig="2"/>
        <SchedulesContent
          typeRequest="/List"
          namePage="Pendentes"
          menuConfig="2"
          hrefPage="/SchedulesPending"
        />
        <Footer />
      </div>
    );
  }
}
