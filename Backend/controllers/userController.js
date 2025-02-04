import User from '../models/userModel.js';

export const getUsers = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({ success:false, message: 'User not found' });
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified,
            }

        });

    } catch (error) {
        return res.status(500).json({ success:false, message: error.message });
    }
}