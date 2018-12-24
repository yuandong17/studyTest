const express = require('express');

function messages(req) {

    return (msg, type)=>{
        type = type || 'info';
        let sess = req.session;
        sess.messages = sess.messages || [];
        sess.messages.push({type:type, string:msg});
        //es.error = msg => this.message(msg, 'error');
    }
}


module.exports = (req, res, next)=>{

    res.messages = messages(req);
    res.error = msg=>{
        return res.messages(msg, 'error');
    };

    res.locals.messages = req.session.messages || [];
    res.locals.removeMessages = ()=>{
        req.session.messages = [];
    };
    next();
};