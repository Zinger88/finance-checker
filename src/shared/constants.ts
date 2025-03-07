export const SignUpErrorEnum = {
    ALREADY_EXIST: 'ALREADY_EXIST',
} as const;
export type SignUpErrorEnum =
    (typeof SignUpErrorEnum)[keyof typeof SignUpErrorEnum];
