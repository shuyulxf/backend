require("./page.less");
import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, Button, message, Pagination } from 'antd';
import Aside from './../common/aside/aside.js';
import Main from './../common/main/main.js';
import List from './../common/list/list.js';
import {keyToCity} from "./../common/config/keyToCity.js";
import {extend, req, getLocInfo} from "./../../static/js/util.js";
import {urls}   from "./../common/config/config.js";
import {locations}   from "./../common/config/locations.js";

class Page extends React.Component {
  constructor(props) {
    super(props);

    let infos = props.infos,
        {breadcrumbs, dataSource, openMenu, openMenuId} = props.infos;
        
    this.state = {
      date: '',
      eidt: false,
      breadcrumbs: breadcrumbs,
      dataSource: dataSource,
      defaultAddressIds: getLocInfo(locations, openMenu, openMenuId),
      filter: {
        cur_page_num: 1,
        per_page_num: 10
      },
      listsTotal: 11
    };

  }

  onChangeLoc(v) {
    let {breadcrumbs, filter} = this.state,
        loc = keyToCity[v],
        newFilter = {
          location: v
        };
    this.setState({
      breadcrumbs: [loc, breadcrumbs[1]],
      filter: extend(filter, newFilter)
    });
    this.onSearch();
  }

  onListEdit(data) {

  }

  onFilter(type, state){
    let newFilter = {
      title : type,
      state: state
    }, {filter} = this.state;

    this.setState({
      filter: extend(filter, newFilter)
    });

    this.onSearch();
  }

  getNewPage(idx, num){
    let newFilter = {};
   
    newFilter.cur_page_num = idx;
    if (num) newFilter.per_page_num = num;

    let {filter} = this.state;
    this.setState({
      filter: extend(filter, newFilter)
    });

    this.onSearch();
  }

  changePerPage(num){
    let newFilter = {
      per_page_num: num
    }, {filter} = this.state;

    this.setState({
      filter: extend(filter, newFilter)
    });

    this.onSearch();
  }
  onSearch() {
    let that = this;
    req({
      url: urls.getLists,
      m_param: this.state.filter,
      success: function(data) {
        that.state.dataSource = data;
      }
    })
  }


  render() {
    let props = this.props.infos,
        {headerCurMenu, openMenu, defaultAddressIds, openMenuId} = props,
        state = this.state,
        {breadcrumbs, dataSource, filter, listsTotal, defaultAddressIds} = state;

    return (
      <article className="ant-layout-aside">
        <Aside loc={defaultAddressIds}  openMenu={openMenu} menuClickCallback={this.onChangeLoc.bind(this)} defaultAddressIds={defaultAddressIds}/>
        <Main breadcrumbs={breadcrumbs} headerCurMenu={headerCurMenu} onFilter={this.onFilter.bind(this)}>
          <List openMenu={openMenu} loc={defaultAddressIds} openMenuId={openMenuId} className="lists" formType={headerCurMenu} defaultAddressIds={defaultAddressIds} filter={filter} tableColumnsName={headerCurMenu} changePerPage={this.changePerPage.bind(this)} getNewPage={this.getNewPage.bind(this)} listsTotal={listsTotal} dataSource={dataSource} onSearch={this.search}/> 
        </Main>
      </article>
    );
  }
}

export default Page;
