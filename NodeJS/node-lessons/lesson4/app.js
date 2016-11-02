var superagent = require('superagent'),
    cheerio = require('cheerio'),
    eventproxy = require('eventproxy'),
    url = require('url'),
    cnodeUrl = 'https://cnodejs.org/';
superagent.get(cnodeUrl)
    .end(function(err, res) {
        if (err) {
            return console.error(err);
        }
        var topicUrls = [],
            userUrls = [],
            $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function(idx, element) {
            var $element = $(element);
            var href = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(href);
        })
        var eq = eventproxy();
        eq.after('topic_html', topicUrls.length, function(topics) {
            var topices = topics.map(function(topicPair) {
                    var topicUrl = topicPair[0];
                    var topicHtml = topicPair[1];
                    var $ = cheerio.load(topicHtml);
                    var userUrl = $('.user_avatar').attr('href');
                    window.score1 = '';
                    if ($('.topic_full_title').text().trim() === '') {
                        return;
                    }
                    if (userUrl) {
                        userUrl = url.resolve(cnodeUrl, userUrl);
                    }
                    superagent.get(userUrl)
                        .end(function(err, res) {
                            var $ = cheerio.load(res.text);
                            window.score1 = $('.unstyled .big').text();
                        });
                    console.log(window.score1);

                    return ({
                        title: $('.topic_full_title').text().trim(),
                        href: topicUrl,
                        comment1: $('.reply_content').eq(0).text().trim(),
                        author1: $('.user_avatar').find('img').attr('title'),
                        score1: ''
                    })
                })
                // console.log('final:');
                // console.log(topices);
        });
        topicUrls.forEach(function(topicUrl) {
            superagent.get(topicUrl)
                .end(function(err, res) {
                    // console.log('fetch' + topicUrl + 'successful');
                    eq.emit('topic_html', [topicUrl, res.text]);
                });
        });
    });
