/***************************************************************************
 *
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 *
 **************************************************************************/


/*
 * path:    src/element/EnumElement.js
 * desc:    下拉框渲染类
 * author:  Kyle He(hekai02@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/09/22 19:27:13$
 */

define(function(require) {
    var u = require('underscore');
    var lib = require('../lib');
    var BaseElement = require('./BaseElement');

    /**
     * 下拉框渲染类
     *
     * @extends {BaseElement}
     * @constructor
     */
    function EnumElement() {
        BaseElement.apply(this, arguments);
    }

    /**
     * 渲染函数
     * @override
     */
    EnumElement.prototype.render = function() {
        BaseElement.prototype.render.apply(this, arguments);
        lib.addClass(this.main, 'ef-item-enum');

        this.main.innerHTML = '<div class="ef-item-key">' + u.escape(this.schema['displayName']) + '</div>';
        var container = document.createElement('div');
        lib.addClass(container, 'ef-item-value');
        this.main.appendChild(container);

        var Constructor = this.getControlClass('SELECTBOX');
        this.control = new Constructor({
            container: container,
            datasource: this.schema['enumValues'],
            selectedIndex: this.selectedIndex || 0
        });
        this.control.render();
    };

    /**
     * 获取元素值
     */
    EnumElement.prototype.getValue = function() {
        return this.control.getValue();
    };

    /**
     * 设置元素值
     */
    EnumElement.prototype.setValue = function(value) {
        this.control.setValue(value);
    };

    lib.inherits(EnumElement, BaseElement);

    return EnumElement;
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
