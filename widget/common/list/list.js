import {tableColumns, urls}   from "./../config/config.js";
import {keyToCity}   from "./../config/keyToCity.js";
import {extend, req} from "./../../../static/js/util.js";
import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Icon, Pagination, Modal} from 'antd';
import HDForms from './../../headline/hdForm/form.js';
import AForms from './../../activity/aForm/form.js';
import HForms from './../../hot/hForm/form.js';
let $ = require('jquery/src/core');
require('jquery/src/core/init');

class Lists extends React.Component {
  constructor(props) {
    super(props);

    let {tableColumnsName, dataSource, filter, formType, isFormHide, isListHide} = props;
    this.state = {
      dataSource: dataSource,
      filter: filter,
      formType: formType,
      isFormHide: isFormHide,
      isListHide: isListHide
    }
  }
  

  edit(key, e){
    let props = this.props;
    if (!props) return;
    props.startEdit();
    this.setState({
      formData: props.dataSource && props.dataSource[key]
    })
  }

  showConfirm(key, e) {
    let that = this;
    Modal.confirm({
      title: '确定删除？',
      onOk() {
        let {formType} = that.props;

        req({
          url: urls[formType][2],
          m_param: {
            id: key
          },
          loading: "正在删除",
          success: function() {
             window.location.reload();
          }
        });
      },
      onCancel() {},
    });
  }
  rank(key, i) {
    let {formType} = this.props,
        {dataSource} = this.state,
        that = this;

    req({
      url: urls[formType][3],
      m_param: {
        id: key
      },
      loading: "正在提交排序修改",
      success: function() {
        if (!i) window.location.reload();

        that.setState({
          dataSource: (function(){
            let tmp = dataSource[i];
            dataSource[i] = dataSource[i-1];
            dataSource[i-1] = tmp;
            return dataSource;
          })()
        })
      },
      error: function(){
      
      }
    });
  }
  componentWillReceiveProps(nextProps) {
      this.setState({
        dataSource: nextProps.dataSource,
        isFormHide: nextProps.isFormHide,
        isListHide: nextProps.isListHide
      });
  }

  addCommonColumn(datas) {
    //debugger;
    let len = datas && datas.length;
    for (let i = 0; i < len; i++) {
      let data = datas[i];
      
      extend(data, {
        key: i,
        rank: <Icon type="arrow-up" key={"rank"+i} className="op_icons" onClick={this.rank.bind(this, data.id, i)}/>,
        edit: <Icon type="edit" key={"edit"+i} className="op_icons" onClick={this.edit.bind(this, i)}/>,
        delete: <Icon type="delete" key={"delete"+i} className="op_icons" onClick={this.showConfirm.bind(this, data.id)}/>,
      }) 
    }
  }

  changePage(idx, num) {
    this.props.getNewPage(idx, num);
  }


  render() {
    let state = this.state,
        {tableColumnsName, openMenu, listsTotal, getNewPage, defaultAddressIds, openMenuId, search, startEdit, endEdit, loc} = this.props,
        tableColumn = tableColumns[tableColumnsName],
        {dataSource, isFormHide, isListHide, formData, formType} = state;
        
    tableColumn.push(
      {
        title: "适用地址",
        dataIndex: "address",
        key: "address",
        width: "10%",
        render: addresses => <span>
          {!addresses ? "":(JSON.parse(addresses)).map((address,idx)=>idx != 0 ? ","+keyToCity[address]:keyToCity[address])}
        </span>
      },
      {
        title: "起始时间",
        dataIndex: "start_time",
        key: "starttime",
        width: "9%"
      },
      {
        title: "结束时间",
        dataIndex: "end_time",
        key: "endtime",
        width: "9%"
      },
      {
        title: "状态",
        dataIndex: "state",
        key: "state",
        width: "7%",
        render: state => <span>{state == "1" ? "未发布" : state == "2" ? "已发布" : "已失效"}</span>
      },
      // {
      //   title: "排序",
      //   dataIndex: "rank",
      //   key: "rank",
      //   width: "5%"
      // },
      {
        title: "编辑",
        dataIndex: "edit",
        key: "edit",
        width: "5%"
      },
      {
        title: "删除",
        dataIndex: "delete",
        key: "delete",
        width: "5%"
      }
    );
    
    this.addCommonColumn(dataSource);
    
    let hide = (isListHide ? " hide" : ""),
        listName = "list" + hide,
        pannelName = "pannel" + hide,
        pagiName = "pagination" + hide;
    
    return (
      <div>
        <div className={pannelName}>
          <Button type="primary" className="mt-top" onClick={this.edit.bind(this)}>
            <Icon type="plus" />
            添加
          </Button>
        </div>
        <Table className={listName} dataSource={dataSource} columns={tableColumn} pagination={false}/>
        {listsTotal ? 
          <div><Pagination className={pagiName}  onChange={this.changePage.bind(this)}  defaultCurrent={1}  total={listsTotal} />
          每页10条</div>: ""}
        {
          isFormHide ? "" : formType == "hot" ? 
          <HForms openMenu={openMenu} openMenuId={openMenuId} loc={loc} onSearch={search.bind(this)}  defaultAddressIds={defaultAddressIds} classname="mt-top" formData={formData} endEdit={endEdit.bind(this)}/> : 
          formType == "headline" ? 
          <HDForms openMenu={openMenu} openMenuId={openMenuId} loc={loc} onSearch={search.bind(this)} defaultAddressIds={defaultAddressIds} classname="mt-top"  formData={formData} endEdit={endEdit.bind(this)}/> :
          <AForms openMenu={openMenu} openMenuId={openMenuId}  loc={loc} onSearch={search.bind(this)} defaultAddressIds={defaultAddressIds} classname="mt-top" formData={formData} endEdit={endEdit.bind(this)}/> 
        }
      </div>);
  }
}

export default Lists;