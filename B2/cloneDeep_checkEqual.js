const deepCloneObject = (params = {}) => {
    //Check object is empty or not, if empty, return
    if (JSON.stringify(params) === "{}") {
        return params;
    }

    const cloneObject = {};

    for (const key in params) {
        //Check current value type is object or primitive
        if (typeof params[key] === "object" && params[key] !== null) {
            cloneObject[key] = { ...deepCloneObject(params[key]) };
        } else {
            //Primitive
            cloneObject[key] = params[key];
        }
    }

    return cloneObject;
};

const source = {
    name: "dang",
    age: 92,
    entity: {
        address: "Bac Lieu",
        City: "HCM",
        object: { key: "test", value: "123" }
    }
};

// const cloneSource = deepCloneObject(source);

const checkIsEqual = (param1, param2) => {
    //compare type
    if (typeof param1 !== typeof param2) {
        return false;
    }

    //Check 2 params is object or primitive

    if (typeof param1 !== "object") {
        //Primitive
        return param1 === param2;
    }

    let isEqual = true;

    // Array
    if (Array.isArray(param1)) {
        if (param1.length !== param2.length) {
            // two arrays do not have same length, return false
            isEqual = false;
        } else {
            const param1Sort = param1.sort((a, b) => a - b);
            const param2Sort = param2.sort((a, b) => a - b);

            for (let index = 0; index < param1Sort.length; index++) {
                if (!checkIsEqual(param1Sort[index], param2Sort[index])) {
                    isEqual = false;
                    break;
                }
            }
        }
    } else {
        //object
        for (const key in param1) {
            if (!param2[key]) {
                isEqual = false;
            } else {
                if (!checkIsEqual(param1[key], param2[key])) {
                    isEqual = false;
                }
            }
        }
    }

    return isEqual;
};
