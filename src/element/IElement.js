/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/element/IElement.js
 * desc:    Element接口类
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/04/09 19:08:27$
 */

define(function(require) {
    /**
     * @interface
     */
    function IElement() {}

    /**
     * 获取元素值
     */
    IElement.prototype.getValue = function() {};

    /**
     * 获取元素预览值
     */
    IElement.prototype.getPreviewValue = function() {};

    /**
     * 设置元素值
     */
    IElement.prototype.setValue = function(value) {};

    return IElement;
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
