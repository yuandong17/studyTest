function foo(x) {
    var tmp = 3;

    function bar(y) {
        console.log(new Date().toLocaleString(), x + y + (++tmp));
    }

    bar(10)
}

foo(2);
foo(2);


function fooSync(x) {
    let tmp = 3;
    return (y) => {
        console.log(new Date().toLocaleString(), x + y + (++tmp));
    }
}


const bar = fooSync(2);
bar(10);
bar(10);

//闭包的理解

//闭包是基于正常的垃圾回收处理机制下,让作用域的变量,在函数执行完之后依旧保存, 没有被垃圾回收处理掉;
