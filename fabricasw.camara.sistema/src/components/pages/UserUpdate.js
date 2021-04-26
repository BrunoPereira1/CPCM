import React, { Component } from "react";

import Header from "../components-system/header/Header";
import Menu from "../components-system/menu/Menu";
import UpdateUser from "../components-system/contents/UpdateUser"; 
import Footer from "../components-system/footer/Footer";

export default class UsersManager extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu menuConfig="6"/>
        <UpdateUser idUser={this.props.location.state.idUser}/>
        <Footer />
      </div>
    );
  }
}
