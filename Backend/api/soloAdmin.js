function soloAdmin(req, res, next) {
  if (!req.user || req.user.rol !== 'admin') {
    return res.status(403).send("No tenés permisos para esta acción");
  }
  next();
}

module.exports = soloAdmin;