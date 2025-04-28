const { userModel } = require('../models');

function login(req, res) {
    const { email, password } = req.body;

    userModel.findUserByEmail(email, (err, user) => {
        if (err || !user || user.password !== password) { // 나중에는 bcrypt 로 암호화 된 걸로 비교해야함.
            return res.status(401).json({'error': '로그인에 실패하였습니다.'});
        }

        // 로그인 성공시 내가 원하는것 세션에 저장하기. 뭘?? 내가 원하는것...
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        res.json({ message: '로그인 성공!' });
    })
}

function logout(req, res) {
    req.session.destroy(() => {
        res.json({ message: '로그아웃 성공!' });
    });
}

module.exports = {
    login,
    logout,
};
