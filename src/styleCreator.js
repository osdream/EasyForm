/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/styleCreator.js
 * desc:    CSS打包到JS里发布的情况下，此模块用于创建相应的style标签
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/06/13 13:18:40$
 */

define(function(require) {
    var styleCode = '%STYLE_CONTENT%';
    /**
     * 动态的创建样式
     * @param {?string} id Style节点的Id.
     * @param {Node} refNode Style节点需要插入到这个节点前面.
     */
    function create(id, refNode) {
        if (styleCode != '*STYLE_CONTENT*'.replace(/\*/g, '%')) {
            var refParent = refNode.parentNode;
            if (!refParent) {
                return;
            }
            var style = document.createElement('style');
            style.type = 'text/css';
            style.media = 'screen';
            if (id) {
                style.id =  id;
            }
            // XXX: 一定要先append到dom，然后再设置style的内容，否则IE8下会将hack丢掉
            // see: http://www.phpied.com/the-star-hack-in-ie8-and-dynamic-stylesheets/#comment-72253
            refParent.insertBefore(style, refNode);
            if (style.styleSheet) {
                style.styleSheet.cssText = styleCode;
            }
            else {
                style.appendChild(document.createTextNode(styleCode));
            }
        }
    }

    return {
        create: create
    };
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
