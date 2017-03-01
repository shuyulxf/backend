import React from 'react';
// let base = "http://localhost:8080/webpack-dev-server/",
let  urlBase= "/APPOnlineCustomer/";
//let urlBase= "http://192.168.253.1:8080/APPOnlineCustomer/";
//let base = "file:///Users/shuyu/Documents/WEB/git/webpack/backend/";
let base = "/APPOnlineCustomer/";
//let base= "http://192.168.253.1:8080/APPOnlineCustomer/";
import {getCookie}   from "./../../../static/js/util.js";
var s = location.search ? location.search.substr(1) : "";
var search = s ? s.split("=")[1] : "";
const config = {
  base: base,
  headers: {
    "hot" : {
      title: "实时热点",
      url  : urlBase+"servlet/hot?userid="+search
    },
    "headline" : {
      title: "小知头条",
      url  : urlBase + "servlet/headline?userid="+search
    },
    "activity" : {
      title: "热门活动",
      url  : urlBase + "servlet/activity?userid="+search
    }
  },
  tableColumns: {
    "hot": [
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
        width: "15%"
      },
      {
        title: "标题简写(建议10个字以内)",
        dataIndex: "title_for_short",
        key: "title_for_short",
        width: "15%"
      },
      {
        title: "热点链接",
        dataIndex: "link",
        key: "link",
        width: "18%"
      }
    ],
    "headline": [
      // {
      //   title: "小知头条类型",
      //   dataIndex: "type",
      //   key: "type",
      //   width: "13%"
      // },
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
        width: "12%"
      },
      {
        title: "头条链接",
        dataIndex: "link",
        key: "link",
        width: "15%"
      }],
    "activity": [
      {
        title: "图片(100*100)",
        dataIndex: "img_url",
        key: "img_url",
        render: img_url => <img className="activityImg" src={img_url} />,
        width: "10%"
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
        width: "8%"
      },
      {
        title: "详细描述",
        dataIndex: "description",
        key: "description",
        width: "12%"
      },
      {
        title: "活动链接",
        dataIndex: "link",
        key: "link",
        width: "10%"
      }],
  },
  urls: {
    "hot": [
      urlBase+"./handle/submitRealHot.action",  urlBase+"./handle/updateRealHot.action", urlBase+"./handle/deleteRealHot.action", urlBase+"./handle/rankRealHot.action"
    ],
    "headline" : [
      urlBase+"./handle/submitHeadline.action", urlBase+"./handle/updateHeadline.action", urlBase+"./handle/deleteHeadline.action", urlBase+"./handle/rankHeadline.action"
    ],
    "activity" : [
      urlBase+"./handle/submitActivity.action", urlBase+"./handle/updateActivity.action", urlBase+"./handle/deleteActivity.action", urlBase+"./handle/rankActivity.action"
    ],
    "getLists" : urlBase+"./handle/realhotOrHeadlineOrActivity.action",
    "upload"   : urlBase+"./servlet/uploader"
  }
}

const locations = config.locations,
      headers   = config.headers,
      tableColumns = config.tableColumns,
      urls  = config.urls;
export {locations, headers, tableColumns, urls};