import { NEVER, object, string, TypeOf, ZodIssueCode } from 'zod';

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email')
    .refine( async (eml) => {
        //TODO: verify email is unique
        return true
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password is too should. It should contain atleast 8 characters')
    .superRefine((p, ctx) => {

        if (!/[A-Z]/.test(p)) {
            ctx.addIssue({
                code: ZodIssueCode.custom,
                message: "password should have atleast one upper case letter",
                fatal: true
            });
            return NEVER;
        }
        if (!/[a-z]/.test(p)) {
            ctx.addIssue({
                code: ZodIssueCode.custom,
                message: "password should have atleast one lower case letter",
                fatal: true
            });
            return NEVER;
        }
        if (!/[0-9]/.test(p)) {
            ctx.addIssue({
                code: ZodIssueCode.custom,
                message: "password should have atleast one digit",
                fatal: true
            });
            return NEVER;
        }
        if (!/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(p)) {
            ctx.addIssue({
                code: ZodIssueCode.custom,
                message: "password should have atleast one special character",
                fatal: true
            });
        }

    }),
    passwordConfirmation: string({
        required_error: 'Password confirmation is required',
    })
  }).refine((data:any) => data.password === data.passwordConfirmation, {
    message: 'Passwords do no match',
    path: ['passwordConfirmation'],
  })
});
  

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>['body'], "passwordConfirmation">;