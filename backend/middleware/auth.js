const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Autorização negada' });
  }
  token = token.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contém, por exemplo, { id: ..., role: ... }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

exports.admin = (req, res, next) => {
  // Verifica se o usuário possui a role "admin"
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acesso restrito a administradores' });
  }
};
