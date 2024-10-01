import { add } from '../models/user.model.js';
export const addUser = async (req, res) => {
    try {
        const user = await add(req);

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.log('error in sign up:' + error.message);
        res.status(500).json({message: 'internal server-error'});
    }
};