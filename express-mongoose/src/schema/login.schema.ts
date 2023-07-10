import * as yup from 'yup';

export const loginSchema = yup.object({
    body: yup.object({
        name: yup.string().required().label('Name'),
        password: yup
            .string()
            .required()
            .min(8)
            .matches(/[a-zA-Z]/)
            .label('Password'),
    }),
});
