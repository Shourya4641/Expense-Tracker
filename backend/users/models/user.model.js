import User from '../../libs/userModel.db.js';

export const add = async (req) => {
    // parse the input
    const { budget, month } = req.body;

    // check if the required parameters are present
    if (!budget || !month) {
        throw new Error('Missing required parameters');
    }
    
    // check if month is a valid month
    const validMonths = Object.values(User.schema.path('month').enumValues);

    if (!validMonths.includes(month)) {
        throw new Error("Enter valid Month.");
    }

    // check if any existing month expense is already registered
    const existingMonth = await User.findOne({ month });

    if (existingMonth) {
        throw new Error('Expense for the month already exists.');
    }
        
    // add the user
    const user = new User({
        budget,
        month
    });

    await user.save();

    return user;
};