const memdb = require('..');
const assert = require('assert');


describe('memdb', ()=>{ //描述memdb功能

    beforeEach('每一个执行前定义的一个钩子',()=>{
        memdb.clear();
        //在每个测试用例之前都要清理数据库, 保持测试的无状态性
    });

    describe('synchronous.saveSync(doc)', ()=>{
        it('应该要保存一个文档数据', ()=>{
            const pet = {name:'Tobi'};
            memdb.saveSync(pet);
            const ret = memdb.first({name:"Tobi"});
            assert(ret == pet);
        })
    });

    describe('.frist(obj)',()=>{
        it('这里应该是返回相匹配的文档', ()=>{
            //对.first()的第一个期望
            const tobi = {name:'Tobi'};
            const loki = {name:'Loki'};

            //保存2个文档
            memdb.saveSync(tobi);
            memdb.saveSync(loki);

            let ret = memdb.first({name:'Tobi'});  //确保每个文档都可以正常返回
            assert(ret == tobi);

            ret = memdb.first({name:'Loki'});
            //console.log('ret', ret);
            assert(ret == loki);
        });

        it('当没有匹配到的时候应该返回null',()=>{
            const ret = memdb.first({name:'Manny'});

            assert(ret == null);
        })
    });



    describe('.saveSync(doc)', ()=>{ //描述memdb功能

        it('应该是要保存一个文档的', ()=>{  //描述期望值
            const pet = {name:'Tobi'};
            memdb.saveSync(pet);
            const ret = memdb.first({name:'Tobi'});

            assert(ret == pet);  //确保找到了pet
        })

    })

    describe('ansynronous .save(doc) 异步', ()=>{
        it('异步测试这里应该是要保存一个文档的',(done)=>{
            const pet = {name:'Tobi'};
            memdb.save(pet, ()=>{  //保存文档
                const ret = memdb.first({name:'Tobi'}); //用第一个文档调用回调
                assert(ret == pet);  //断言文档正确保存了
                done();
            })
        })
    })

})
