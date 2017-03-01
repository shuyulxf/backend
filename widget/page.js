
import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, Button, message, Pagination, Spin } from 'antd';
import Aside from './common/aside/aside.js';
import Main from './common/main/main.js';
import List from './common/list/list.js';
import {keyToCity} from "./common/config/keyToCity.js";
import {extend, req, getLocInfo} from "./../static/js/util.js";
import {urls}   from "./common/config/config.js";
import {locations}   from "./common/config/locations.js";

class Page extends React.Component {
  constructor(props) {
    super(props);

    let infos = props.infos,
        {breadcrumbs, dataSource, openMenu, headerCurMenuId, openMenuId} = props.infos;

    this.state = {
      date: '',
      eidt: false,
      breadcrumbs: breadcrumbs,
      dataSource: dataSource,
      defaultAddressIds: getLocInfo(locations, openMenu, openMenuId),
      filter: {
        type: headerCurMenuId,
        cur_page_num: 1,
        per_page_num: 10,
        location: openMenuId
      },
      isFormHide: true,
      isListHide: false,
      listsTotal: 0
    };
  }
  componentWillMount(){
    this.onSearch();
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

  startEdit() {
    this.setState({
      isListHide: true,
      isFormHide: false
    });
  }

  endEdit(e) {
    this.setState({
      isListHide: false,
      isFormHide: true
    });
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

  getNewPage(idx){
    let newFilter = {};
   
    newFilter.cur_page_num = idx;

    let {filter} = this.state;
    this.setState({
      filter: extend(filter, newFilter)
    });

    this.onSearch(idx);
  }

  onSearch(idx, callback) {
    let that = this;
    this.endEdit();
    req({
      url: urls.getLists,
      m_param: extend(this.state.filter,{is_pagi: idx}),
      loading: <span>列表加载中</span>,
      success: function(data) {
        console.log(data.lists)
        that.setState({
          dataSource: data.lists,
          listsTotal: data.total || data.total == 0 ? data.total : that.state.listsTotal
        });

        callback && callback();
      }
    })
  }


  render() {
    let props = this.props.infos,
        {headerCurMenu, openMenu, openMenuId} = props,
        state = this.state,
        {breadcrumbs, dataSource, filter, listsTotal, isListHide, isFormHide, defaultAddressIds} = state;

    return (
      <article className="ant-layout-aside">
        <Aside  loc={defaultAddressIds}
                openMenu={openMenu} 
                menuClickCallback={this.onChangeLoc.bind(this)} 
                defaultAddressIds={defaultAddressIds}/>
        <Main breadcrumbs={breadcrumbs} headerCurMenu={headerCurMenu} onFilter={this.onFilter.bind(this)}>
          <List loc={defaultAddressIds}
                dataSource={dataSource}
                openMenu={openMenu} 
                openMenuId={openMenuId} 
                className="lists" 
                formType={headerCurMenu} 
                defaultAddressIds={defaultAddressIds} 
                filter={filter} 
                tableColumnsName={headerCurMenu} 
                getNewPage={this.getNewPage.bind(this)} 
                listsTotal={listsTotal}
                search={this.onSearch.bind(this)}
                startEdit={this.startEdit.bind(this)}
                endEdit={this.endEdit.bind(this)}
                isFormHide={isFormHide}
                isListHide={isListHide}/> 
        </Main>
      </article>
    );
  }
}

export default Page;
