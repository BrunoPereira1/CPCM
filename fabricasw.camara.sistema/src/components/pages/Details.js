import React, { Component } from 'react'

import Header from "../components-system/header/Header";
import Menu from "../components-system/menu/Menu";
import Footer from "../components-system/footer/Footer";
import DetailsSchedules from "../components-system/contents/DetailsSchedules";

export default class Details extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Menu menuConfig={this.props.location.state.menuConfig} />
                <DetailsSchedules
                    idSchedule={this.props.location.state.idSchedule}
                    namePage={this.props.location.state.namePage}
                    hrefPage={this.props.location.state.hrefPage}
                />
                <Footer/>
            </div>
        )
    }
}
