export const reqiuredField = value => {
    if (value) {
        return undefined;
    }
    return "Field is required.";
};