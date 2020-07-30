// JQ匿名函数自调用：避免全局污染问题(闭包原理)
// 传参window的好处：
// 1. 减少对window的查找过程/作用域链
// 2. 有利于代码压缩
// 传参undefined的目的：解决undefined在ie678中存在被篡改的问题

;(function(window, undefined){

    // 定义jQuery构造函数
    let jQuery = function (el) {
        return new jQuery.init(el)
    }

    // 静态方法
    jQuery.init = function(el) {
        // 获取所有DOM标签
        let els = document.querySelectorAll(el)
        // 遍历绑定到实例对象上
        els.forEach((item, index) => {
            this[index] = item
        })
        // 绑定长度属性
        this.length = els.length
    }

    // 原型方法
    jQuery.init.prototype = {
        //设置css样式方法
        css: function(cssAttr, cssValue) {
            for (let i = 0; i<this.length; i++) {
                // this[i].style.CSS属性名 = CSS属性值 
                this[i].style[cssAttr] = cssValue
            }
            // 保证链式条用
            return this
        },
        //设置css属性方法
        attr: function(objAttr,objVal) {
            for(let i = 0; i < this.length; i++){
                this[i].setAttribute(objAttr,objVal)
            }
            return this
        }
    }

    // 将jQuery这个函数暴露到全局对象window上，供外部使用
    window.jQuery = window.$ = jQuery
})(window)