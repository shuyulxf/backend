import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Input, DatePicker, message, Upload,Icon } from 'antd';
import CitySelect from './../../common/citySelect/citySelect.js'
const RangePicker = DatePicker.RangePicker;
import {req, format, extend} from "./../../../static/js/util.js";
import {urls} from "./../../common/config/config.js";
import {idForAllCountry} from './../../common/config/locations.js';
let $ = require('jquery/src/core');
require('jquery/src/core/init');

const createForm = Form.create;
const FormItem = Form.Item;

class AForms extends React.Component {
  constructor(props) {
    super(props);
  
    let {formData, defaultAddressIds} = props,
        address = formData && formData.address;

    let img_url = formData && formData.img_url;
    this.state = {
      addressIds: address ? address : defaultAddressIds,
      end_time: formData && formData.end_time,
      isEditing: formData ? 1 : 0,
      id: formData && formData.id,
      imgFile: formData ? {
        uid: -2,
        name: 'prev.png',
        status: 'done',
        url: formData && formData.img_url,
        thumbUrl: formData && formData.img_url
      }: null,
      img_url: img_url
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

      let {end_time, addressIds, isEditing, id, img_url} = this.state;
      //let {submitSuccess} = this.props;
      values.id = id;
      values.start_time = format(values.start_time);
      values.end_time   = end_time;
      
      if(!addressIds || !addressIds.length) addressIds = [this.props.openMenuId];
      values.address = addressIds;
      values.userid = userid;
      
      if (img_url) values.img_url = img_url;
      else {
        message.error("请上传图片!");
        return;
      }

      console.log(values)
     
      let that = this;
      req({
        url: urls["activity"][isEditing],
        m_param: values,
        loading: "正在提交",
        success:  that.updateSuccess.bind(that)
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

  change(e){
    console.log(e);
  }

  render() {
    let {form, classname, openMenu, formData, updateListData, loc} = this.props,
        that = this,
        {imgFile} = this.state;

  	//formItem layout
  	const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    //validate rules
    const { getFieldProps } = this.props.form;
    
    const validTitle = getFieldProps('title', {
      rules: [
        { required: true, message: '请输入活动标题' },
      ],
      initialValue: formData && formData.title 
    });
    const validDes = getFieldProps('description', {
      rules: [
        { required: true, message: '请输入活动描述' }
      ],
      initialValue: formData && formData.description 
    });
    const validLink = getFieldProps('link', {
      rules: [
        { required: true, message: '请输入活动链接' },
      ],
      initialValue: formData && formData.link 
    });
    // const validateDate = getFieldProps('validTime', {
    //   rules: [
    //    { validator: this.checkRangeDate },
    //   ],
    //   onChange: this.dateChange.bind(this)
    // });
    const props = {
      action: urls["upload"],
      listType: 'picture',
      onChange: function(e){
        //let {imgList} = that.state;
        console.log(e);
        let {file, fileList} = e;
        let {status, response} = file;
        let img_url = response && response.datas && response.datas.img_url;
        if (status == "done") {
          that.setState({
            imgFile: file,
            img_url: img_url
          })
        }
        
      },
      beforeUpload: function(e){
        let MAX_IMG_SIZE = 1024 * 60;
        
        const isLarge = e.size > MAX_IMG_SIZE;
        if (isLarge) {
          message.error('上传图片不能大于60K');
        }
        return !isLarge;

      },
      onRemove: function(e){
        that.setState({
          imgFile: null,
          img_url: ""
        })
      }
      // defaultFileList: [{
      //   uid: -1,
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      //   thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      // }, {
      //   uid: -2,
      //   name: 'yyy.png',
      //   status: 'done',
      //   url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      //   thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      // }],
    };
    const validateStartDate = getFieldProps('start_time', {
      rules: [
       { validator: this.checkStartDate}
      ],
      initialValue: formData && formData.start_time
    });

  	return (
  		<Form horizontal  form={form} className={classname}>
          <FormItem   {...formItemLayout}
                label="适用省市">
            <CitySelect id="address" loc={loc}  openMenu={openMenu} addressIds={formData && JSON.parse(formData.address)} addressSelect={this.addressSelect.bind(this)}/>
            <p className="tips">不选择默认为全国或全省</p>
          </FormItem>
	        <FormItem 	{...formItemLayout}
	        			label="活动图片">
	          <Upload {...props} fileList={imgFile?[imgFile]:[]}>
              <Button type="ghost">
                <Icon type="upload" /> 点击上传
              </Button> 建议100*100，图片不大于60K
            </Upload>
	        </FormItem>
          <FormItem   {...formItemLayout}
                label="活动标题">
            <Input placeholder="请输入活动标题" 
                 {...validTitle} name="title"/>
          </FormItem>
          <FormItem   {...formItemLayout}
                label="活动描述">
            <Input placeholder="请输入活动描述" 
                 {...validDes} name="des"/>
          </FormItem>
	        <FormItem 	{...formItemLayout}
	        			label="活动链接">
	          <Input placeholder="请输入活动链接" 
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
AForms = createForm()(AForms);
export default AForms;