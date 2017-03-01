require("./filter.less");
import {headers}   from "./../config/config.js";
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon, Form, Row, Col, Input, DatePicker, Select } from 'antd';
const FormItem = Form.Item,
      Option = Select.Option;

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      state: ''
    }
  }
  onSelect(v){
    console.log(v)
    this.setState({
      state: v
    })
  }

  onChange(e){
    this.setState({
      title: e.target.value
    })
  }

  search(){
    let {title, state} = this.state,
        {onFilter} = this.props; 
    onFilter && onFilter(title, state);    
  }


  render() {

    return (
     	<div className="filter">
        <Form horizontal className="ant-advanced-search-form">
          <Row gutter={16}>
            <Col sm={8}>
              <FormItem
                label="标题"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}>
                <Input placeholder="请输入搜索标题" size="default" name="title" onChange={this.onChange.bind(this)}/>
              </FormItem>
            </Col>
            <Col sm={8}>
              <FormItem
                label="状态"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}>
                <Select size="default"
                  placeholder="请选择状态"
                  onSelect={this.onSelect.bind(this)}>
                  <Option value="0">请选择</Option>
                  <Option value="1">未发布</Option>
                  <Option value="2">已发布</Option>
                  <Option value="3">已失效</Option>
                </Select>
              </FormItem>
            </Col>
            <Col sm={8} className="submit-btn">
              <Button type="primary" htmlType="submit" onClick={this.search.bind(this)}>搜索</Button>
            </Col>
          </Row>
      </Form>
     	</div>
    );
  }
}

export default Filter;