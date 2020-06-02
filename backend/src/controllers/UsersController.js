const User = require("../models/UsersModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/key.json");

module.exports = {
    async create(req, res) {
        try {
            const data = req.body;

            data.password = crypto.createHash("md5").update(data.password).digest("hex");

            const exists = await User.findOne({ email: data.email });

            if (exists) return res.status(409).json({ message: "usuário já existe!" });

            const user = await User.create(data);

            return res.status(201).json({
                message: "Usuario Criado com sucesso!",
                user: user
            });

        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Erro Inesperado!" });
        }
    },

    async middleAuth(req, res, next) {
        const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;

        if (!token) return res.status(403).json("Não existe Token");

        jwt.verify(token, secret, (err, decoded) => {
            if (err) return res.status(500).json(err);

            req.decoded = decoded;
            return next();
        });
    },
    auth(req, res) {
        res.sendFile(path.join(__dirname + '/invite.html'));
    },
    convite(req, res) {

    }
    ,
    async autentic(req, res) {
        try {
            const { email } = req.body;
            let { password } = req.body;
            console.log(req.body)
            password = crypto.createHash("md5").update(password).digest("hex");

            const user = await User.findOne({ email: email, password: password });
            if (!user) return res.status(403).json({ message: "Senha ou Email incorretos!" });

            const token = jwt.sign({ "id": user.id }, secret, {
                expiresIn: 86400
            });

            return res.status(202).json({ user, token });

        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Erro Inesperado!" });
        }
    },

    async indexAll(req, res) {
        const users = await User.find();
        return res.status(200).json({ users })
    },

    async index(req, res) {
        const { id } = req.headers;
        const user = await User.findById(id);

        res.status(200).json({ user });
    },

    async update(req, res) {
        const { _id } = req.body;
        const event = await User.findOneAndUpdate({ _id: _id }, req.body);
        console.log(event)
        return res.json({ event });
    },

}
