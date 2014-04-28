/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/element/StringElement.js
 * desc:    文本框渲染类
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/04/09 19:12:53$
 */

define(function(require) {
    var u = require('underscore');
    var lib = require('../lib');
    var BaseElement = require('./BaseElement');

    /**
     * 文本框渲染类
     *
     * @extends {BaseElement}
     * @constructor
     */
    function StringElement() {
        BaseElement.apply(this, arguments);
    }

    /**
     * 渲染函数
     * @override
     */
    StringElement.prototype.render = function() {
        BaseElement.prototype.render.apply(this, arguments);

        this.main.innerHTML = '';// '<input type="text" id="' + this.getId() + '" />';;
        var Constructor = this.getControlClass('TEXTBOX');
        this.control = new Constructor({
            container: this.main,
            multiline: !!this.schema['multiline'],
            placeholder: this.schema['tip']
        });
        this.control.render();
    };

    /**
     * 获取元素值
     */
    StringElement.prototype.getValue = function() {
        // var value = lib.trim(lib.g(this.getId()).value);
        return this.control.getValue();
    };

    /**
     * 设置元素值
     */
    StringElement.prototype.setValue = function(value) {
        // lib.g(this.getId()).value = value;
        this.control.setValue(value);
    };

    lib.inherits(StringElement, BaseElement);

    return StringElement;
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
