/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/control/BaseControl.js
 * desc:    控件基础类
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/04/11 18:45:49$
 */

define(function(require) {
    var u = require('underscore');
    var lib = require('../lib');
    var IControl = require('./IControl');

    // TODO: esui config

    /**
     * Control 基类：对esui控件做包装
     *
     * @implements {IControl}
     * @constructor
     * @param {Object} [options] 配置参数
     */
    function BaseControl(options) {
        /**
         * @type {Object}
         */
        this.options = options;

        /**
         * DOM 元素
         */
        this.container = null;

        /**
         * 控件
         */
        this.control = null;

        /**
         * 可配置的 option 的字段
         *
         * @type {Array.<string>}
         */
        this.optionKeys = (this.optionKeys || []).concat(['container']);

        this.initOptions(options);

        this.init();
    }

    /**
     * 初始化选项
     *
     * @param {Object} [options] 构造函数传入的选项
     */
    BaseControl.prototype.initOptions = function(options) {
        options = options || {};

        var that = this;
        u.each(this.optionKeys, function(key, index) {
            if (options[key] != null) {
                that[key] = options[key];
            }
        });
    };

    /**
     * 初始化工作：创建esui控件等
     */
    BaseControl.prototype.init = function() {};

    /**
     * 渲染控件和绑定控件事件
     */
    BaseControl.prototype.render = function() {};

    /**
     * 获取控件值
     */
    BaseControl.prototype.getValue = function() {
        return this.control.getValue();
    };

    /**
     * 设置控件值
     */
    StringElement.prototype.setValue = function(value) {
        this.control.setValue(value);
    };

    return BaseControl;
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
