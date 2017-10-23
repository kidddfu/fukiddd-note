/* 单体模式Basic Singleton */

var Singleton = {
    attribute: true,
    method1: function(){},
    method2: function(){}

};



/* 简单工厂模式 */

var XMLHttpFactory = function(){};      //这就是一个简单工厂
XMLHttpFactory.createXMLHttp = function(){
    var XMLHttp = null;
    if (window.XMLHttpRequest){
        XMLHttp = new XMLHttpRequest;
    }else if (window.ActiveXObject){
         XMLHttp = new ActiveXObject("Microsoft.XMLHttp");
    }
     return XMLHttp;
    }
    // XMLHttpFactory.createXMLHttp()这个方法根据当前环境的具体情况返回一个XHR对象
var AjaxHander = function(){
    var XMLHttp = XMLHttpFactory.createXMLHttp();
// ...
}



/* 复杂工厂模式 */
// 复杂工厂模式先设计一个抽象类，这个类不能被实例化只能用以派生子类，最后通过子类的扩展实现工厂方法

var XMLHttpFactory = function(){};      //这是一个抽象工厂

XMLHttpFactory.prototype = {
    //抽象工厂不能被实例化，只能用来派生子类。如果真的要调用这个方法会抛出错误。
    createFactory : function(){
        throw new Error("This is an abstract class, can not use");
    }
}

var XHRHandler = function(){};      //定义一个子类

//子类继承父类原型方法。
extend(XHRHandler, XMLHttpFactory);

XHRHandler.prototype = new XMLHttpFactory();        //把超类原型引用传递给子类
XHRHandler.prototype.constructor = XHRHandler;      //重置子类原型的构造器为子类自身

//重新定义createFactory方法
XHRHandler.prototype.createFactory = function(){
    var XMLHttp = null;
    if(window.XMLHttpRequest){
        XMLHttp = new XMLHttpRequest;
    }else if(window.ActiveXObject){
        XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return XMLHttp;
}
//可以实现一些相同的方法，这些相同的方法我们可以放在父类中编写代码，那么需要实现具体的业务逻辑，那么可以放在子类中重写该父类的方法，去实现自己的业务逻辑；



/* 单例模式 */
//单例模式定义了一个对象的创建过程，此对象只有一个单独的示例并提供一个访问它的全局访问点
//实现：先判断实例存在与否，
//如果存在直接返回，如果不存在创建了再返回

var single = (function(){
    var unique;

    function getInstance(){
        //
        if(unique === undefined){
            unique = new Construct();
        }
        return unique;
    }
    function Construct(){
        // ...生成单例构造函数的代码
        return{
            getInstance : getInstance
        }
    }
}) ();
//单例模式是一种常用的模式，有一些对象我们往往只需要一个，比如全局缓存、浏览器的window对象。在js开发中，单例模式的用途同样非常广泛。试想一下，当我们
//单击登录按钮的时候，页面中会出现一个登录框，而这个浮窗是唯一的，无论单击多少次登录按钮，这个浮窗只会被创建一次。因此这个登录浮窗就适合用单例模式。



/* 观察者模式(发布订阅模式) */
//定义对象间的一种一对多的依赖关系，以便当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并自动刷新，也被称为是发布订阅模式。

var pubsub = {};        //定义发布者

(function (q){

    var list = [];      //回调函数存放的数组，也就是记录多少人订阅
    subUid = -1;

    //发布消息，遍历订阅者
    q.publish = function(type, content){
        //type为文章类型，content为文章内容
        //如果没人订阅直接返回
        if(!list[type]){
            return false;
        }
        setTimeout(function(){
            var subscribers = list[type];
            len = subscribers ? subscribers.length : 0;

            while(len--){
                //将内容注入到订阅者那里
                subscribers[len].func(type, content);
            }
        }, 0);

        return true;

    };
    //订阅方法，由订阅者执行
    q.subscribers = function(type, func){
        //如果之前未订阅过
        if(!list[type]){
            list[type] = [];
        }

        //token相当于订阅者的id，这样的话如果退订，我们可以根据token知道谁退订了
        var token = (++subUid).toString();
        //每订阅一个就存入到数组中。
        list[type].push({
            token : token,
            func : func
        });
        return token;
    };
    //退订方法
    q.unsubscribe = function(token){
        for(var m in list){
            if(list[m]){
                for(var i = 0, j = list[m].length; i < j; i++){
                    if(list[m][i].token === token){
                        list[m].splice(i,1);
                        return token;
                    }
                }
            }
            return false;
        };
    } (pubsub);
})

//将订阅赋值给一个变量，以便退订
var girlA = pubsub.subscribe("js类文章", function(type,content){
    console.log("girlA订阅的" +type + "：内容内容为" +content);
});
var girlB = pubsub.subscribe("js类文章", function(type,content){
    console.log("girlB订阅的" +type + "：内容内容为" +content);
});
var girlC = pubsub.subscribe("js类文章", function(type,content){
    console.log("girlC订阅的" +type + "：内容内容为" +content);
});

//发布通知
pubsub.publish("js类的文章", "关于js的内容");

//girlA退订了关于js类的文章
setTimeout(function(){
    pubsub.unsubscribe(girlA);
},0);

//再发布一次，验证一下是否还能输出信息
pubsub.publish("js类的文章", "关于js的第二篇文章");



/*策略模式*/
//目的就是将算法的使用与算法的实现分离开来。说白了就是以前要很多判断的写法，现在把判断里面的内容抽离开来，变成一个个小的个体。

//不使用策略模式，分会员打折的实现
function Price (personType, price){
    //vip5折
    if(personType === 'vip'){
        return price * 0.5;
    }else if(personType === 'old'){
        return price * 0.3;
    }else{
        return price;
    }
}

//使用策略模式后
function vipPrice(){
    this.discount = 0.5;
}

vipPrice.prototype.getPrice = function(price){
    return price * this.discount;
}

function oldPrice(){
    this.discount = 0.3;
}

oldPrice.prototype.getPrice = function(price){
    return price * this.discount;
}

function Price(){
    this.discount = 1;
}

Price.prototype.getPrice = function(price){
    return price;
}

//
function context(){
    this.name = '';
    this.strategy = null;
    this.price = 0;
}

Context.prototype.set = function(name, strategy, price){
    this.name = name;
    this.strategy = startegy;
    this.price = price;
}
Context.prototype.getResult = function(){
    console.log(this.name + '的结账价为:' + this.strategy.getPrice(this.price));
}

var context = new Context();
var vip = new vipPrice();
context.set('vip客户',vip, 200);
context.getResult();

var old = new Context();
context.set('老顾客', old, 200);
context.getResult();



/*模板模式*/
var Interview = function(){};

Interview.prototype.writtenText = function(){
    console.log("前端笔试题。");
}

Interview.prototype.ctoInterview = function(){
    console.log("技术官面试");
}

Interview.prototype.leader = function(){
    console.log("领导面试");
}

Interview.prototype.hrInterview = function(){
    console.log("hr面试");
}

//等通知
Interview.prototype.waitNotice = function(){
    console.log("等通知吧，不写假简历也想找工作？");
}

Interview.prototype.init = function(){
    this.writtenText();
    this.ctoInterview();
    this.leader();
    this.hrInterview();
    this.waitNotice();
}

//阿里巴巴的鄙视和技术面不同，重写父类方法，其他继承父类方法。
var AliInterview = function(){};
AliInterview.prototype.writtenText = function(){
    console.log("阿里的笔试题，想都不要想");
}
AliInterview.prototype.ctoInterview = function(){
    console.log("阿里的CTO才能识别出假的三年工作经验");
}

var AliInterview = new Interview();
AliInterview.init();



/*代理模式*/

//补打卡事件


$("#gridTable").onclick = function(){
    alert("XXXXXX");
    $.ajax({
        type: "POST",
        url: "XXXXXX",
        data: XXXXXX
    })
}