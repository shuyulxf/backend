import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Input,DatePicker, message ,alert} from 'antd';
import CitySelect from './../../common/citySelect/citySelect.js';
import {req, format} from "./../../../static/js/util.js";
import {urls, locations} from "./../../common/config/config.js";
//import {idForAllCountry} from './../../common/config/locations.js';
let $ = require('jquery/src/core');
require('jquery/src/core/init');

const RangePicker = DatePicker.RangePicker;
const createForm = Form.create;
const FormItem = Form.Item;

class HForms extends React.Component {
  constructor(props) {
    super(props);
  
    let {formData} = props,
        address = formData && formData.address;

    this.state = {
      //addressIds: address ? address : "",
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

      let {end_time, addressIds, isEditing, id} = this.state;
      //let {submitSuccess} = this.props;
      values.id = id;
      values.start_time = format(values.start_time);
      values.end_time   = end_time;
      
      if(!addressIds || !addressIds.length) addressIds = [this.props.openMenuId];
      values.address = addressIds;
      values.userid = userid;
     
      let that = this;
      req({
        url: urls["hot"][isEditing],
        m_param: values,
        loading: "正在提交",
        success: isEditing ? that.updateSuccess.bind(that) : that.submitSuccess
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

  // checkRangeDate(rule, value, callback){
  //   if (!value || !value[0] || !value[1]) callback(new Error("请选择热点有效时间"));
  //   else callback();
  // }

  checkAdress(rule, value, callback){
    let {addressIds} = this.state;
    
    if (!addressIds || !addressIds.length) callback(new Error("请选择热点有效区域"));
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
    let {form, classname, openMenu, formData, onSearch,loc} = this.props;
    
    console.log(formData)
  	
  	const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    
    //validate rules
    const { getFieldProps } = this.props.form;
    const validTitle = getFieldProps('title', {
      rules: [
        { required: true, message: '请输入热点标题' },
      ],
      initialValue: formData && formData.title
    });

    const validTitleForShort = getFieldProps('title_for_short', {
      rules: [
        { required: true, message: '请输入标题缩写,建议不超过10个字' }
      ],
      onChange: function(e){
      	let val = e.target.value;
    		if (val.length > 10) message.warning('已经超过10个字');		
      },
      initialValue: formData && formData.title_for_short
    });

    const validLink = getFieldProps('link', {
      rules: [
        { required: true, message: '请输入热点链接' },
      ],
      initialValue: formData && formData.link
    });


    // const validateDate = getFieldProps('validTime', dateOptions);
    const validateStartDate = getFieldProps('start_time', {
      rules: [
       { validator: this.checkStartDate}
      ],
      initialValue: formData && formData.start_time
    });
    // const validateEndDate = getFieldProps('end_time', {
    //   initialValue: formData && formData.start_time,
    //   onChange: function(v){
    //       console.log(v)
    //       debugger
    //   },
    // });

    classname = classname + " form-width";
    console.log(formData)
  	return (
  		<Form horizontal  form={this.props.form} className={classname}>
          <FormItem   {...formItemLayout}
                label="适用省市" className="province">
            <CitySelect openMenu={openMenu} loc={loc} addressIds={formData && JSON.parse(formData.address)} addressSelect={this.addressSelect.bind(this)}/> 
            <p className="tips">不选择默认为全国或全省</p>
          </FormItem>
	        <FormItem 	{...formItemLayout}
	        			label="标题">
	          <Input placeholder="请输入热点标题" 
	          		 {...validTitle} name="title"/>
	        </FormItem>
	        <FormItem 	{...formItemLayout}
	        			label="标题缩写">
	          <Input placeholder="请输入标题缩写,建议不超过10个字" 
	          		 {...validTitleForShort} name="titleForShort" />
	        </FormItem>
	        <FormItem 	{...formItemLayout}
	        			label="热点链接">
	          <Input placeholder="请输入热点链接" 
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
	          <Button type="primary" onClick={this.handleSubmit.bind(this)} >确定</Button>
            <Button type="primary" onClick={this.cancel.bind(this)} className="ml">取消</Button>
	        </FormItem>
      </Form>
  	);
  }
}
HForms = createForm()(HForms);
export default HForms;