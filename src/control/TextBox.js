/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/control/TextBox.js
 * desc:    文本框控件
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/04/11 18:26:41$
 */

define(function(require) {
    var u = require('underscore');
    var lib = require('../lib');
    var BaseControl = require('./BaseControl');
    var ETextBox = require('esui/TextBox');

    /**
     * TextBox构造函数
     *
     * @param {Object} [options] 配置参数
     * @implements {IControl}
     * @extends {BaseControl}
     * @constructor
     */
    function TextBox(options) {
        /**
         * 可配置的 option 的字段
         *
         * @type {Array.<string>}
         */
        this.optionKeys = ['placeholder', 'multiline'];

        BaseControl.apply(this, arguments);
    }

    /**
     * 初始化工作：创建esui控件等
     */
    TextBox.prototype.init = function() {
        // 创建esui控件
        this.control = new ETextBox({
            mode: (this.multiline ? 'textarea' : 'text'),
            placeholder: this.placeholder
        });
    };

    /**
     * 渲染控件和绑定控件事件
     */
    TextBox.prototype.render = function() {
        // 渲染控件到容器
        this.control.appendTo(this.container);

        // 输入框值变化事件
        var that = this;
        this.control.on(
            'input',
            function () {
                that.onchange();
            }
        );
    };

    lib.inherits(TextBox, BaseControl);

    return TextBox;
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
