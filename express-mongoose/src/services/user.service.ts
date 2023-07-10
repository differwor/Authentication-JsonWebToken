import * as bcrypt from 'bcrypt';
import User, { IUserInput } from '../models/user.model';

export const createUser = async (input: IUserInput) => {
    try {
        const isExist = await validateFieldExist(input.name);
        // check fieldname exist
        if (isExist) return false;

        const user = await User.create(input);
        return user;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const validateFieldExist = async (nameInput: String) => {
    try {
        const user = await User.findOne({ name: nameInput });
        return !!user;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const validatePassword = async (input: IUserInput) => {
    try {
        const { name, password } = input;
        const user: any = await User.findOne({ name });
        if (!user)
            return {
                status: 'fail',
                message: 'Your name is incorrect!',
            };

        const isValid = await bcrypt.compare(password, user.password);

        return isValid
            ? {
                  status: 'success',
                  data: user.toJSON(),
              }
            : {
                  status: 'fail',
                  message: 'Your password is incorrect!',
              };
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getAll = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error: any) {
        throw new Error(error);
    }
};
