webpackHotUpdate(0,{

/***/ 517:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _treeSelect = __webpack_require__(518);

	var _treeSelect2 = _interopRequireDefault(_treeSelect);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(39);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _locations = __webpack_require__(270);

	var _util = __webpack_require__(220);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SHOW_PARENT = _treeSelect2.default.SHOW_PARENT;


	var CitySelect = _react2.default.createClass({
	  displayName: 'CitySelect',
	  getInitialState: function getInitialState() {
	    return {
	      value: this.props.addressIds
	    };
	  },
	  onChange: function onChange(value, e, n) {
	    this.setState({ value: value });

	    console.log(value, e, n);
	    this.props.addressSelect(_typeof(value[0]) ? value[0] : value);
	  },
	  render: function render() {
	    var _props = this.props;
	    var openMenu = _props.openMenu;
	    var addressSelect = _props.addressSelect;
	    var loc = _props.loc;
	    var value = this.state.value;


	    var tProps = {
	      treeData: [loc],
	      value: value && value.indexOf("1000") != -1 ? loc.key : value,
	      onChange: this.onChange,
	      multiple: true,
	      treeCheckable: true,
	      showCheckedStrategy: SHOW_PARENT,
	      searchPlaceholder: '请选择',
	      style: {
	        width: 300
	      }
	    };
	    return _react2.default.createElement(_treeSelect2.default, _extends({}, tProps, { addressSelect: addressSelect.bind(this) }));
	  }
	});

	exports.default = CitySelect;

/***/ }

})