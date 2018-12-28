
class Todo {
    constructor(){
        this.todos = [];
    }

    add(item){
        if(!item) throw new Error('todo requires an item error');
        this.todos.push(item);
    }

    deleteAll(){
        this.todos = [];
    }

    getLength(){
        //取得代办事项的数量
        return this.todos.length;
    }

    doAsync(cb){
        setTimeout(cb, 2000, true);
    }
}


module.exports = Todo;
