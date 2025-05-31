import {User} from '../models/user.model.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';

export  const getUsersForSidebar = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user.id } })
            .select("username profilePicture")
            .lean();

        if (!users || users.length === 0) {
            return res.status(404).json(new apiResponse(404, "No users found"));
        }

        return res.status(200).json(
            new apiResponse(200, "Users retrieved successfully", { users })
        );
    } catch (error) {
        console.error("Error retrieving users for sidebar:", error);
        return next(new apiError(500, "Unable to retrieve users"));
        
    }
}
