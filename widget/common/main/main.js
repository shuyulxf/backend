require("./main.less");
import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, Breadcrumb, Icon } from 'antd';
import Header from './../header/header.js';
import Filter from './../filter/filter.js';

const SubMenu = Menu.SubMenu;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbs: props.breadcrumbs,
      headerCurMenu: props.headerCurMenu
    }
  }
  // componentWillReceiveProps(nextProps) {
  //     this.setState({dataSource: nextProps.dataSource});
  // }
  render() {
    let props = this.props,
        state = this.state;

    return (
      <section className="ant-layout-main">
        <Header headerCurMenu={state.headerCurMenu}/>
        <div className="ant-layout-breadcrumb">
          <Breadcrumb>
            {
              props.breadcrumbs.map(breadcrumb => <Breadcrumb.Item key={breadcrumb}>{breadcrumb}</Breadcrumb.Item>)
            }
          </Breadcrumb>
        </div>
        <div className="ant-layout-container">
          <div className="ant-layout-content">
            <div>
              <Filter onFilter={props.onFilter.bind(this)}/>
              {this.props.children}
            </div>
          </div>
        </div>
        <div className="ant-layout-footer">
          2016-06-08 by @shuyu
        </div>
      </section>
    );
  }
}


export default Main;