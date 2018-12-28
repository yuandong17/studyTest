const assert = require('assert');
const Todo = require('./todo');
const todo = new Todo();
let testCompleted = 0;


function deleteTest() {

    todo.add('删我');  //添加用户来测试删除的数据

    assert.equal(todo.getLength(), 1, '里面应该是有一条数据的'); //断言数据添加成功

    todo.deleteAll();  //删除所有记录

    assert.equal(todo.getLength(), 0, '现在应该是没有记录'); //断言删除成功

    testCompleted++;   //记录测试已完成
}


function addTest() {
    todo.deleteAll(); //删除之前所有的事项

    todo.add('添加');  //添加事项

    //断言有事项存在
    assert.notEqual(todo.getLength(), 0, 'add里面是应该有1条数据的');

    testCompleted++; //记录测试已完成
}


function doAsyncTest(cb) {
    todo.doAsync(value=>{
        assert.ok(value, '回调返回的结果为true才能通过!'); //断言值为true
        testCompleted++; //记录测试已完成
        cb(); //完成后出发回调函数
    })
}


function throwTest(cb) {

    assert.throws(todo.add, /requires/); //没有参数的todo.add调用

    testCompleted++; //记录测试已完成
}


deleteTest();
addTest();
throwTest();
doAsyncTest(()=>{
    console.log(`Completed ${testCompleted} tests;`); //表明完成数
});
