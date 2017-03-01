require("./header.less");
import {headers}   from "./../config/config.js";
import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, Breadcrumb, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.headerCurMenu
    }
  }

  menuItemClick(e) {
    this.setState({
      current: e.key,
    });
   // this.props.menuClickCallback && this.props.menuClickCallback(e.key);
  }
  getMenus(headers) {
    var menuLists = [];
    for(let key in headers) {
      let header = headers[key];
      menuLists.push(<Menu.Item key={key}><a href={header.url}>{header.title}</a></Menu.Item>);
    }
    return menuLists;
  }
  render() {
    let menuLists = this.getMenus(headers);

    return (
     <header>
         <Menu mode="inline" 
               selectedKeys={[this.state.current]}
               onClick={this.menuItemClick.bind(this)}
               mode="horizontal">
          {menuLists}
        </Menu>
      </header>
    );
  }
}

export default Header;