// VALIDATION MESSGES
// export let STATUS = {
//     unauthorized: 401,
//     internalError: 500,
//     noResponse: 0,
// };

export let MESSAGES = {
    password: {
        required: 'Please enter valid EventName.',
        blankspace: 'Please enter valid EventName.',
        pattern: 'Only char allowed.',
        maxLength: `Only 100 char allowed.`
    },
    time: {
        required: 'Please enter valid time.',
    },
    address: {
        required: 'Please enter valid Address.',
    },
    city: {
        required: 'Please enter valid city.',
    },
    country: {
        required: 'Please enter valid country.',
    },
};
// INPUT PATTERN
export let PATTERN = {
    alphaNum: '^[a-zA-Z ]*$',
};