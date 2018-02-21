export const debug = (...obj) => {
    console.log(JSON.stringify(obj, null, 4));
};

export const xor = (left, right) => !!(!!left ^ !!right);