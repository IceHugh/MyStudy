var express = require('express'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    app = express();
app.get('/',function (req,res,next) {
    superagent.get('https://cnodejs.org/')
    .end(function (err,sres) {
        if(err){
            return next(err);
        }
        var $ = cheerio.load(sres.text),
            items = [];
        $('#topic_list .topic_title').each(function (index,element) {
            var $element = $(element);
            var $user = $element.parent().siblings('.user_avatar').find('img');
            items.push({
                title: $element.attr('title'),
                href: $element.attr('href'),
                author: $user.attr('title')
            })
        });
        res.send(items);
    })
});
app.listen(3000,function () {
    console.log('app is listening at port 3000');
});