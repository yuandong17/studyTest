module.exports = (cb, perpage)=>{
//
// const Entry = require('../models/entry');
//
// module.exports = (perpage)=>{



    perpage = perpage || 10;

    return (req, res, next) =>{
        let page = Math.max(parseInt(req.params.page || '1', 10),1) -1;
        // console.log(new Date().toLocaleString(), page);



        // Entry.count((err, total) => {
        //     if (err) return next(err);
        //     req.page = res.locals.page = {
        //         number: page,
        //         perpage: perpage,
        //         from: page * perpage,
        //         to: page * perpage + perpage - 1,
        //         total: total,
        //         count: Math.ceil(total / perpage)
        //     };
        //
        //     next();
        // })

        cb && cb((err, total)=>{
            if(err) return next(err);
            req.page = res.locals.page = {
                number:page,
                perpage:perpage,
                from:page * perpage,
                to: page * perpage + perpage -1,
                total:total,
                count:Math.ceil(total / perpage)
            };

            next();

        })
    }
}
