import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Input, DatePicker, message } from 'antd';
import CitySelect from './../../common/citySelect/citySelect.js'
const RangePicker = DatePicker.RangePicker;
import {req, format} from "./../../../static/js/util.js";
import {urls, locations} from "./../../common/config/config.js";
let $ = require('jquery/src/core');
require('jquery/src/core/init');

const createForm = Form.create;
const FormItem = Form.Item;

class HDForms extends React.Component {
  constructor(props) {
    super(props);
    let {formData, defaultAddressIds} = props,
        address = formData && formData.address;

    this.state = {
      addressIds: address ? address : defaultAddressIds,
      end_time: formData && formData.end_time,
      isEditing: formData ? 1 : 0,
      id: formData && formData.id,
    }
  }

  submitSuccess(){
    window.location.reload();
  }

  updateSuccess(){
    let {onSearch, endEdit} = this.props;
    
    onSearch && onSearch(0, function(){
      endEdit && endEdit();
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((errors, values) => {
      console.log(errors)
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

      let state = this.state;
      let {end_time, addressIds, id, isEditing} = state;
      console.log(this.state)
      //let {submitSuccess} = this.props;
      values.id = id;
      values.start_time = format(values.start_time);
      values.end_time   = end_time;
      
      if(!addressIds || !addressIds.length) addressIds = [this.props.openMenuId];
      values.address = addressIds;
      values.userid = userid;
      req({
        url: urls["headline"][isEditing],
        m_param: values,
        loading: "数据提交中",
        success: isEditing ? this.updateSuccess.bind(this) : this.submitSuccess
      })
      //console.log(values);
    });
  }

  
  cancel() {
    let endEdit = this.props.endEdit;
    endEdit && endEdit();
  }
  
  // dateChange(value, dateString) {
  //   this.setState({
  //     start_time: format(value[0]),
  //     end_time  : format(value[1])
  //   })
  // }

  checkAdress(rule, value, callback){
    console.log(value);
    let {addressIds} = this.state;
    
    if (!addressIds || !addressIds.length) callback(new Error("请选择小知头条有效区域"));
    else callback();
  }

  addressSelect(address) {
    this.setState({
      addressIds: address
    });
  }

  checkStartDate(rule, value, callback) {
    if (!value) callback(new Error('请输入小知头条起始时间'));
    else callback();
  }
  updateEndTime(v) {
    this.setState({
      end_time: format(v)
    })
  }

  render() {
    let {form, classname, openMenu, formData, updateListData, defaultAddressIds, onSearch, loc} = this.props;
  	//formItem layout
  	const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    //validate rules
    const { getFieldProps } = this.props.form;
    // const validType = getFieldProps('type', {
    //   rules: [
    //     { required: true, message: '请输入小知头条类别,例如：近期热门、常见问题' }
    //   ],
    //   initialValue: formData && formData.type   
    // });
    const validTitle = getFieldProps('title', {
      rules: [
        { required: true, message: '请输入小知头条标题' },
      ],
      initialValue: formData && formData.title
    });
    
    const validLink = getFieldProps('link', {
      rules: [
        { required: true, message: '请输入小知头条链接' },
      ],
      initialValue: formData && formData.link
    });

    const validateStartDate = getFieldProps('start_time', {
      rules: [
       { validator: this.checkStartDate}
      ],
      initialValue: formData && formData.start_time
    });

    // const validateAddress = getFieldProps('address', {
    //   rules: [
    //    { 
    //     validator: this.checkAdress.bind(this) 
    //   },
    //   ]
    // });

  	return (
  		<Form horizontal  form={form} className={classname}>
          <FormItem   {...formItemLayout}
                label="适用省市" className="province">
            <CitySelect id="address" loc={loc}  openMenu={openMenu} addressIds={formData && JSON.parse(formData.address)} addressSelect={this.addressSelect.bind(this)}/>
            <p className="tips">不选择默认为全国或全省</p>
          </FormItem>
          
	        <FormItem 	{...formItemLayout}
	        			label="标题">
	          <Input placeholder="请输入小知头条标题" 
	          		 {...validTitle} name="title"/>
	        </FormItem>
	        <FormItem 	{...formItemLayout}
	        			label="小知头条链接">
	          <Input placeholder="请输入小知头条链接" 
	                 {...validLink} name="link"/>
	        </FormItem>
          <FormItem   {...formItemLayout}
                label="起始时间">
              <DatePicker showTime id="start_time"  {...validateStartDate} format="yyyy-MM-dd HH:mm:ss"/>
          </FormItem> 
          <FormItem   {...formItemLayout}
                label="结束时间">
            <DatePicker showTime id="end_time" format="yyyy-MM-dd HH:mm:ss" onChange={this.updateEndTime.bind(this)} defaultValue={formData&&formData.end_time}/>
          </FormItem> 
	        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
	          <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
            <Button type="primary" onClick={this.cancel.bind(this)} className="ml">取消</Button>
	        </FormItem>
      </Form>
  	);
  }
}
HDForms = createForm()(HDForms);
export default HDForms;