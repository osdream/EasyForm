/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/element/ObjectElement.js
 * desc:    JSON MAP渲染器类
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/04/09 19:34:51$
 */

define(function(require) {
    var u = require('underscore');
    var lib = require('../lib');
    var BaseElement = require('./BaseElement');

    /**
     * JSON MAP渲染类
     *
     * @extends {BaseElement}
     * @constructor
     */
    function ObjectElement() {
        BaseElement.apply(this, arguments);
    }

    /**
     * 渲染元素
     * @param {HTMLElement} main
     */
    ObjectElement.prototype.render = function() {
        BaseElement.prototype.render.apply(this, arguments);
        lib.addClass(this.main, 'ef-item-object');

        var schema = this.schema;
        var tipHtml = schema.tip
            ? ('<div class="ef-tip ef-tip-object">' + schema.tip + '</div>')
            : '';
        this.main.innerHTML = tipHtml;

        var items = schema.items;
        this.children = [];
        for (var i = 0; i < items.length; i ++) {
            var item = items[i];
            if (!item.datatype) {
                item.datatype = "STRING";
            }
            var container = document.createElement('div');
            lib.addClass(container, 'ef-item');
            this.main.appendChild(container);

            var Constructor = this.getElementClass(item.datatype);
            var child = new Constructor(item, {
                'parent': this
            });
            child.render(container);
            this.children.push(child);
        }
        // TODO: html.push('<div id="' + this.getId() + '-valid-ctner"></div>');
        // TODO: toggle
        // var toggleTpl = [
        //     '<fieldset class="pref-block-fieldset">',
        //         '<legend class="pref-block-legend">',
        //             '<div id="${block_id}-toggle" class="pref-toggle-visible" title="收起与展开"></div>',
        //             '<div id="${block_id}-title" class="pref-block-title pref-toggle-title">${block_name}</div>',
        //         '</legend>',
        //         '<div id="${block_id}-body" class="pref-level1-block">${form_html}</div>',
        //         '<div id="${block_id}-ellipsis" class="pref-block-ellipsis" style="display:none;">...</div>',
        //     '</fieldset>'
        // ].join('');
    };

    /**
     * 遍历子元素
     * @param {Function} callback 回调
     */
    ObjectElement.prototype.forEach = function(callback) {
        if (this.children && this.children.length) {
            u.each(this.children, function(child, index) {
                callback(child, index);
            });
        }
    };

    /**
     * 获取元素值
     */
    ObjectElement.prototype.getValue = function() {
        var value = {};
        this.forEach(function(element, index) {
            value[element.getName()] = element.getValue();
        });

        return value;
    };

    /**
     * 设置元素值
     */
    ObjectElement.prototype.setValue = function(value) {
        value = this.pickValue(value, this.getDefaultValue(), {});

        var that = this;
        this.forEach(function(element, index) {
            element.setValue(value[element.getName()]);
        });
    };

    lib.inherits(ObjectElement, BaseElement);

    return ObjectElement;
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
