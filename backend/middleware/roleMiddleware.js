const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).send('Forbidden: You do not have access to this resource.');
        }
        next();
    };
};

module.exports = roleMiddleware;
