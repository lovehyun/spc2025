const express = require('express');
const router = express.Router();

const { loginRequired } = require('../middlewares/authMiddleware')
const { db } = require('../models/db');

router.get('/tweets', (req, res) => {
    const query = `
        SELECT tweet.*, user.username 
        FROM tweet 
        JOIN user ON tweet.user_id = user.id
        ORDER BY tweet.id DESC
    `;

    db.all(query, [], (err, tweets) => {
        // 아래 내용을 줄때, 이거 이 요청자가 좋아한건지 같이 줄수 없을까??
        // 로그인 안했을수도 있고, 했을수도 있음.
        if (req.session.user) {
            const userId = req.session.user.id;

            const queryLike = 'SELECT tweet_id FROM like WHERE user_id=?';
            db.all(queryLike, [userId], (err, likes) => {
                // 내가 좋아하는 목록 전체 가져오기
                const likedTweetIds = likes.map(like => like.tweet_id);

                // 조회한 글에서 내가 좋아하는 글이 있는지 확인해서 true/false를 해당 글 뒤에 붙여서 반환
                const result = tweets.map(tweet => ({
                    ...tweet,
                    liked_by_current_user: likedTweetIds.includes(tweet.id)
                }));
                res.json(result);
            })
        } else {
            res.json(tweets.map(tweet => ({...tweet, liked_by_current_user: false})));
        }
    })
});

router.post('/tweet', loginRequired, (req, res) => {
    const { content } = req.body;

    const query = 'INSERT INTO tweet (content, user_id) VALUES (?, ?)';
    db.run(query, [content, req.session.user.id], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: '트윗 작성 실패' });
        } else {
            res.json({ message: '트윗 작성 완료' });
        }
    });
});

router.post('/like/:tweet_id', loginRequired, (req, res) => {
    const tweetId = req.params.tweet_id;

    // 미션1. 
    // DB에 쓴다... like 테이블에 쓴다...
    const query = 'INSERT INTO like (user_id, tweet_id) VALUES (?, ?)';
    db.run(query, [req.session.user.id, tweetId]);
    // like 를 증가시켰을때, tweet 테이블의 like_count 를 자동으로 증가하도록 trigger 설정 해보기

    const query2 = 'UPDATE tweet SET likes_count = likes_count + 1 WHERE id= ?';
    db.run(query2, [tweetId]);

    res.json({message: '성공'});
});

router.post('/unlike/:tweet_id', loginRequired, (req, res) => {
    const tweetId = req.params.tweet_id;

    const query = 'DELETE FROM like WHERE user_id=? AND tweet_id=?';
    db.run(query, [req.session.user.id, tweetId]);
    const query2 = 'UPDATE tweet SET likes_count = likes_count - 1 WHERE id= ?';
    db.run(query2, [tweetId]);

    res.json({message: '성공'});
});

module.exports = router;
