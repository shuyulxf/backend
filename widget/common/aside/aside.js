import {keyToLoc} from "./../config/config.js";
import {locations} from "./../config/locations.js";
import {getLocInfo} from "./../../../static/js/util.js";
import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, Breadcrumb, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class Aside extends React.Component {
  constructor(props) {
    super(props);
    let loc = this.props.loc;
    console.log(loc)
    this.state = {
      loc: loc,
      current: '0' + loc.key
    }
  }
  
  

  /*change the folder icon state*/
  onTitleClick(e,target){
    //edit icons
    let rgxOpen = /-open$/g,
        rgxClose = /folder$/g,
        icon = document.getElementsByClassName(e.key+"Icon")[0],
        className = icon.className;
  
    if (rgxOpen.test(className)) className = className.replace(rgxOpen, "");
    else className = className.replace(rgxClose, "folder-open");

    icon.className = className;

    //add class
  }

  /*select menu item*/
  menuItemClick(e) {
    
    this.setState({
      current: e.key,
    });
    
    this.search(e.key);
    
  }

  subMenuOpen(e) {
   // debugger
    this.props.menuClickCallback && this.props.menuClickCallback(e.key);
    this.setState({
      current: "",
    })
    // options.item.className = "ant-menu-item-selected ";

  }

  search(key){
    let dataSource = [];
    this.props.menuClickCallback && this.props.menuClickCallback(key, dataSource);
  }
  /* return the menuLists. if loc is not undefined, then just show loc info */
  returnMenu(location) {
    let cnts = location instanceof Array ? location : location.children,
        len = cnts ? cnts.length : 0,
        menuLists = [],
        openMenu = this.props.openMenu;

    for (let i = 0; i < len; i++) {
      let cnt = cnts[i],
          children = cnt.children;

      if (children && children.length) {
        let subMenu,
            subMenuList = [],
            name = cnt.label,
            key = cnt.key,
            subCnts = children;
            console.log("subcnts",subCnts)
            subMenu = (
               <SubMenu key={key}
                      className={key}
                      value={name}
                      onTitleClick={this.onTitleClick.bind(this)}
                      title={<span><Icon type="folder" className={key+"Icon"}/><span>{name}</span></span>}>
                      {
                        subCnts.map((subcnt,idx) => <Menu.Item key={subcnt.key}>{subcnt.label}</Menu.Item>)
                      }
              </SubMenu>
            );

            menuLists.push(subMenu);
      } else {  
        menuLists.push(<Menu.Item key={cnt.key}>{cnt.label}</Menu.Item>)
      }      
    }
    console.log("menuLists",menuLists);
    let name = location.label,
        key  = location.key;
    let menus = (
      <SubMenu key={key}
               className={key}
               value={name}
               onTitleClick={this.onTitleClick.bind(this)}
               title={<span><Icon type="folder-open" className={key+"Icon"}/><span ref="item">{name}</span></span>}>
        {menuLists}
      </SubMenu>
    )

    return menus;

  }

  render() {

    let menus = this.returnMenu(this.state.loc);
    
    return (
     <aside className="ant-layout-sider" ref="aside">
        <Menu mode="inline" 
              theme="dark"
              onOpen={this.subMenuOpen.bind(this)}
              onClick={this.menuItemClick.bind(this)}
              defaultOpenKeys={[this.state.loc.key]}
              selectedKeys={[this.state.current]}>
          {menus}
        </Menu>
      </aside>
    );
  }
}

export default Aside;