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
        lib.addClass(this.main, 'ef-item-string');

        this.main.innerHTML = '<div class="ef-item-key">' + u.escape(this.schema['displayName']) + '</div>';
        var container = document.createElement('div');
        lib.addClass(container, 'ef-item-value');
        this.main.appendChild(container);

        var Constructor = this.getControlClass('TEXTBOX');
        this.control = new Constructor({
            container: container,
            multiline: !!this.schema['multiline'],
            placeholder: this.schema['tip']
        });
        this.control.render();
    };

    /**
     * 获取元素值
     */
    StringElement.prototype.getValue = function() {
        return this.control.getValue();
    };

    /**
     * 设置元素值
     */
    StringElement.prototype.setValue = function(value) {
        this.control.setValue(value);
    };

    lib.inherits(StringElement, BaseElement);

    return StringElement;
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
