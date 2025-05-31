import mongoose  from "mongoose";
import { apiError } from "../utils/apiError.js";



const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof apiError)) {
        const statusCode = error.statusCode || (error instanceof mongoose.Error ? 400 : 500);
        const message = error.message || "Something went wrong";
        error = new apiError(statusCode, message, error?.errors || [], err.stack);
    }

    const response = {
        success: false,
        statusCode: error.statusCode,
        message: error.message,
        data: null, // <-- Always include data field for consistency
        errors: error.errors || [],
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    };

    return res.status(error.statusCode || 500).json(response);
};



export { errorHandler }