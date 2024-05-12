import ErrorResponse from "../helpers/errorResponse.js";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

// Verificar si el usuario está autenticado
export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    // Asegurarse de que el token exista
    if (!token) {
        return next(new ErrorResponse('You must Log In...', 401));
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('You must Log In', 401));
    }
};

// Middleware para admin
export const isAdmin = (req, res, next) => {
    if (req.user.role === 'user') {
        return next(new ErrorResponse('Access denied, you must be an admin', 401));
    }
    next();
};
