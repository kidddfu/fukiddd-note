//1. 默认参数
/* 在ES5中，我们可以直接把默认专辑放在函数生命中。*/
var link = function(height = 50, color = 'red', url = "https://github.com/kidddfu"){
    //
}


// 2. 模板对象
var name = `UR name is $(first) $(last)". `;

var url = `
    http://localhost:3000/api/message/$(id)
`;



// 3. 反引号实现多行字符串
var roadPoem = `
    Then took the other, as just as fair,
    And having perhaps the better chaim.
    Because it was grassy andwanted wear.
    thoughas for that the passing there.
    hadworn them really about the same.
`;



// 4. 解构赋值



// 5.增强的对象字面量



// 6. 箭头函数
var logUpperCase = function () {
    this.string.toUpperCase();
    return() => console.log(this.string);

}


// 7. Promises
var wait1000 = new Promise(function(resolve, reject){
    setTimeout(resolve, 1000);
}).then(function(){
    console("Good!");
});

/*(箭头法)*/

var wait1001 = new Promise((resolve, reject)=>{
    setTimeout(resolve, 1000);
}).then(()=>{
    console.log("Nice!");
});



// 8. 块级作用域和构造let和const
/* let */
function calculateTotalAmount (vip) {
    var amount = 0;
    if(vip){
        let amount = 1;     //前面创建的amount仍然为0
    }
}

/* const */
/* 一样 */



// 9. classes
class baseModel {
    constructor(options, data){
        this.name = 'Base';
        this.url = 'https://github.com/kidddfu';
        this.data = data;
        this.options = options;
    }
}