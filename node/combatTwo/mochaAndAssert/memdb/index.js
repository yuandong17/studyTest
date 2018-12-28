const db = [];

exports.saveSync = (doc)=>{
    db.push(doc);  //将doc添加到数据库数组中
 };

exports.save = (doc, cb)=>{
    db.push(doc);
    if(cb){
        setTimeout(()=>{
            cb();
        }, 1000)
    }
}

exports.first = (obj)=>{
    return db.filter((doc)=>{
        //选择跟obj的所有属性相匹配的doc

        for(let key in obj){
            if(doc[key] != obj[key]){
                return false;  //不匹配, 返回false; 不选择这个doc
            }
        }

        return true;  //全部匹配, 返回并选择这个doc
    }).shift();  //只要第一个doc或null
}
exports.clear = ()=>{
    db.length = 0;
}
