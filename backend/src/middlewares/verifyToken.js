const jwt = require('jsonwebtoken');
module.exports = {
	verify: async (req, res, next) => {
		try {
			if (!req.headers.authorization) {
				return res.status(401).send('Unauhtorized Request1');
			}
			let token = req.headers.authorization.split(' ')[1];
			if (token === 'null') {
				return res.status(401).send('Unauhtorized Request2');
			}
			const payload = await jwt.verify(token, 'secretkey');
			if (!payload) {
				return res.status(401).send('Unauhtorized Request3');
			}
			req.userId = payload._id;
			next();
		} catch(e) {
			console.log(e)
			return res.status(401).send('Unauhtorized Request4');
		}
	}
}

