require("./../main.less");
import Page from './page.js';
import React from 'react';
import ReactDOM from 'react-dom';
import {headers}   from "./../common/config/config.js";


let infos = {
  openMenu: "",
  headerCurMenu: "activity",
  breadcrumbs: ["全国",headers["activity"].title],
  dataSource: [
{
  key: '1',
  title: 'testtest',
  img: "https://tpc.googlesyndication.com/simgad/4713983577003525163",
  link: 'https://tpc.googlesyndication.com/simgad/4713983577003525163',
  address: JSON.stringify(["1000"]),
  state: "1",
  title_for_short: "test",
  start_time: "2014-05-09 00:00:00",
  end_time: "2014-05-10 00:00:00",
  id: 1
}, {
  key: '2',
  title: 'testtest',
  title_for_short: "test",
  img: "https://tpc.googlesyndication.com/simgad/4713983577003525163",
  link: 'https://tpc.googlesyndication.com/simgad/4713983577003525163',
  address: JSON.stringify(["1200"]),
  state: "2",
  start_time: "2014-05-09 00:00:00",
  end_time: "2014-05-10 00:00:00",
  id: 2
}
, {
  key: '3',
  title: 'testtest',
  img: "https://tpc.googlesyndication.com/simgad/4713983577003525163",
  link: 'https://tpc.googlesyndication.com/simgad/4713983577003525163',
  address: JSON.stringify(["1200"]),
  state: "3",
  start_time: "2014-05-09 00:00:00",
  end_time: "2014-05-10 00:00:00"
}
, {
  key: '4',
  title: 'testtest',
  img: "https://tpc.googlesyndication.com/simgad/4713983577003525163",
  link: 'https://tpc.googlesyndication.com/simgad/4713983577003525163',
  address: JSON.stringify(["1200"]),
  state: "已发布",
  starttime: "2014-05-09 00:00:00",
  endtime: "2014-05-10 00:00:00"
}
, {
  key: '5',
  title: 'testtest',
  img: "https://tpc.googlesyndication.com/simgad/4713983577003525163",
  link: 'https://tpc.googlesyndication.com/simgad/4713983577003525163',
  address: JSON.stringify(["1200"]),
  state: "已发布",
  starttime: "2014-05-09 00:00:00",
  endtime: "2014-05-10 00:00:00"
}
, {
  key: '6',
  title: 'testtest',
  img: "https://tpc.googlesyndication.com/simgad/4713983577003525163",
  link: 'https://tpc.googlesyndication.com/simgad/4713983577003525163',
  address: JSON.stringify(["1200"]),
  state: "已发布",
  starttime: "2014-05-09 00:00:00",
  endtime: "2014-05-10 00:00:00"
}
, {
  key: '7',
  title: 'testtest',
  img: "https://tpc.googlesyndication.com/simgad/4713983577003525163",
  link: 'https://tpc.googlesyndication.com/simgad/4713983577003525163',
  address: JSON.stringify(["1200"]),
  state: "已发布",
  starttime: "2014-05-09 00:00:00",
  endtime: "2014-05-10 00:00:00"
}
, {
  key: '8',
  title: 'testtest',
  img: "https://tpc.googlesyndication.com/simgad/4713983577003525163",
  link: 'https://tpc.googlesyndication.com/simgad/4713983577003525163',
  address: JSON.stringify(["1200"]),
  state: "已发布",
  starttime: "2014-05-09 00:00:00",
  endtime: "2014-05-10 00:00:00"
},
{
  key: '9',
  title: 'testtest',
  img: "https://tpc.googlesyndication.com/simgad/4713983577003525163",
  link: 'https://tpc.googlesyndication.com/simgad/4713983577003525163',
  address: JSON.stringify(["1200"]),
  state: "已发布",
  starttime: "2014-05-09 00:00:00",
  endtime: "2014-05-10 00:00:00"
},
{
  key: '10',
  title: 'testtest',
  img: "https://tpc.googlesyndication.com/simgad/4713983577003525163",
  link: 'https://tpc.googlesyndication.com/simgad/4713983577003525163',
  address: JSON.stringify(["1200"]),
  state: "已发布",
  starttime: "2014-05-09 00:00:00",
  endtime: "2014-05-10 00:00:00"
}, {
  key: '11',
  title: 'testtest',
  img: "https://tpc.googlesyndication.com/simgad/4713983577003525163",
  link: 'https://tpc.googlesyndication.com/simgad/4713983577003525163',
  address: JSON.stringify(["1200"]),
  state: "已发布",
  starttime: "2014-05-09 00:00:00",
  endtime: "2014-05-10 00:00:00"
}],

}

ReactDOM.render(<Page infos={infos} ></Page>, document.getElementById('root'));
