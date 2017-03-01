import { TreeSelect } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
import {locations} from './../config/locations.js';
import {getLocInfo} from "./../../../static/js/util.js";

const CitySelect = React.createClass({
  getInitialState() {
    return {
      value: this.props.addressIds,
    };
  },
  onChange(value,e,n) {
    this.setState({ value });

    this.props.addressSelect(value);
  },
  render() {
    let {openMenu, addressSelect,loc} = this.props,
        {value} = this.state;

    const tProps = {
      treeData: [loc],
      value: value && value.indexOf("1000") != -1 ? loc.key: value,
      onChange: this.onChange,
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择',
      style: {
        width: 300,
      },
    };
    return <TreeSelect {...tProps} addressSelect={addressSelect.bind(this)}/>;
  },
});

export default CitySelect;