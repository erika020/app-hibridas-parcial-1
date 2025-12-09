const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Debe iniciar sesión" });
    }

    if (req.user.rol !== "admin") {
        return res.status(403).json({ msg: "Acceso denegado (solo admin)" });
    }

    next();
};

export { isAdmin };