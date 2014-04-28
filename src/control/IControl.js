/***************************************************************************
 * 
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 * $Id$
 * 
 **************************************************************************/
 
 
/*
 * path:    src/control/IControl.js
 * desc:    控件接口类
 * author:  songao(songao@baidu.com)
 * version: $Revision$
 * date:    $Date: 2014/04/09 20:20:54$
 */

define(function(require) {
    /**
     * @interface
     */
    function IControl() {}

    /**
     * 获取控件值
     */
    IControl.prototype.getValue = function() {};

    /**
     * 设置控件值
     */
    IControl.prototype.setValue = function(value) {};

    /**
     * 控件值变化事件HOOK
     */
    IControl.prototype.onchange = function() {}

    return IControl;
});



















/* vim: set ts=4 sw=4 sts=4 tw=100 : */
