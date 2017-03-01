require("./../main.less");
import Page from './../page.js';
import React from 'react';
import ReactDOM from 'react-dom';
// import {setCookie, getCookie}   from "./../../static/js/util.js";
// var s = location.search ? location.search.substr(1) : "";
// var userid = s ? s.split("=")[1] : "";
// setCookie("search","?userid="+userid);
import {headers}   from "./../common/config/config.js";

let infos = {
  openMenu: openMenu,
  openMenuId: openMenuId,
  headerCurMenu: "activity",
  headerCurMenuId: "2",
}
infos.breadcrumbs = ["全部",headers["activity"].title]

ReactDOM.render(<Page infos={infos} ></Page>, document.getElementById('root'));
