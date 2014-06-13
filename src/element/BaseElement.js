/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/element/BaseElement.js
 * desc:    Element基类
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/04/10 11:02:47$
 */

define(function(require) {
    var u = require('underscore');
    var lib = require('../lib');
    var EventTarget = require('mini-event/EventTarget');

    var IElement = require('./IElement');
    var elementMap = require('../elementMap');
    var IControl = require('../control/IControl');
    var controlMap = require('../controlMap');

    /**
     * Element 基类
     *
     * @constructor
     * @extends {mini-event.EventTarget}
     * @param {Object} schema 元素SCHEMA
     * @param {Object} [options] 配置参数
     *
     * @implements {IElement}
     */
    function BaseElement(schema, options) {
        /**
         * @type {Object}
         */
        this.schema = schema;

        /**
         * @type {Object}
         */
        this.options = options;

        /**
         * DOM 元素
         */
        this.main = null;

        /**
         * 元素ID
         */
        this.id = null;

        /**
         * 父元素
         */
        this.parent = null;

        /**
         * 可配置的 option 的字段
         *
         * @type {Array.<string>}
         */
        this.optionKeys = (this.optionKeys || []).concat(['id', 'parent', 'main']);

        this.initOptions(options);
    }

    /**
     * ID 分隔符
     * @type {string}
     */
    BaseElement.seperator = '_-_';

    /**
     * 初始化选项
     *
     * @param {Object} [options] 构造函数传入的选项
     */
    BaseElement.prototype.initOptions = function(options) {
        options = options || {};

        var that = this;
        u.each(this.optionKeys, function(key, index) {
            if (options[key] != null) {
                that[key] = options[key];
            }
        });
    };

    /**
     * 生成ID
     *
     * @param {string=} opt_id ID后半部分
     */
    BaseElement.prototype.getId = function(opt_id) {
        if (opt_id != null) {
            return this.id + BaseElement.seperator + opt_id;
        }
        return this.id;
    };

    /**
     * 根据Element类型获取构造函数
     *
     * @param {ElementType} elementType 元素类型
     * @return {BaseElement}
     */
    BaseElement.prototype.getElementClass = function(elementType) {
        return elementMap[elementType] || null;
    };

    /**
     * 根据Control类型获取构造函数
     *
     * @param {ControlType} controlType 元素类型
     * @return {IControl}
     */
    BaseElement.prototype.getControlClass = function(controlType) {
        return controlMap[controlType] || null;
    };

    /**
     * 获取字段名
     *
     * @return {string}
     */
    BaseElement.prototype.getName = function() {
        return this.schema['name'];
    };

    /**
     * 获取默认值
     *
     * @return {Mixed}
     */
    BaseElement.prototype.getDefaultValue = function() {
        return this.schema['defaultValue'];
    };

    /**
     * 渲染元素
     *
     * @param {HTMLElement=} opt_main 主元素
     */
    BaseElement.prototype.render = function(opt_main) {
        if (opt_main != null) {
            this.main = opt_main;
        }
    };

    /**
     * 绑定事件
     */
    BaseElement.prototype.bindEvent = function() {};

    /**
     * 获取元素值
     */
    BaseElement.prototype.getValue = function() {
        return this.value;
    };

    /**
     * 获取元素预览值
     */
    BaseElement.prototype.getPreviewValue = function() {
        return this.getValue();
    };

    /**
     * 设置元素值
     */
    BaseElement.prototype.setValue = function(value) {
        this.value = value;
    };

    lib.inherits(BaseElement, EventTarget);

    return BaseElement;
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
