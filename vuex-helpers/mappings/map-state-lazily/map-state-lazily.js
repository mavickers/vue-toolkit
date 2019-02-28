/*
 * mapStateLazily
 *
 * see the readme.md file which should be in the same folder
 *
 */

export default function () {
    const functionName = "[VuexMappers.mapStateLazily] ";
    const exporting = {};
    let namespace = null;
    let properties = null;
    let fields = null;

    // first let's parse/validate the arguments
    if (!_.inRange(arguments.length, 1, 4)) throw functionName + "invalid number of arguments";
    if (_.isString(arguments[0])) {
        namespace = arguments[0].trim();

        if (namespace === "") throw functionName + "namespace may not be empty string";
    }
    if (!_.isNull(namespace) && _.isString(arguments[1])) {
        properties = arguments[1].trim();

        if (namespace === "") throw functionName + "property may not be empty string";
    }

    const fieldsIndex = namespace === null ? 0 : properties === null ? 1 : 2;
    const fieldsParam = arguments[fieldsIndex];

    // this builds the namespace based on what parameters were passed in; if there
    // is a property name then the property is validated against the parent and
    // throws if the property is not found or not string.
    const getFullNamespace = function (context) {
        if (!namespace) return "";
        if (!properties) return namespace;

        const propertyArray = _.map(properties.split("."), item => item.trim());
        let finalProperty = context;

        if (propertyArray.length === 1 && fieldsParam.includes(propertyArray[0])) throw functionName + "field parameters may not include property parameter (this will cause a HACF loop)";

        _.forEach(propertyArray, property => {
            if (_.isNil(finalProperty[property])) throw functionName + "context is missing specified property '" + properties + "'";

            finalProperty = finalProperty[property];
        });

        return namespace + "/" + finalProperty.toString();
        //
        //
        // if (fieldsParam.includes(properties)) throw functionName + "field parameters may not include property parameter (this will cause a HACF loop)";
        // if (!_.isString(context[properties])) throw functionName + "context is missing specified property '" + properties + "'";

        //return namespace + "/" + context[properties].trim();
    };

    // this confirms that the store is available
    const storeIsValid = function (context) {
        if (_.isNil(context) || _.isNil(context.$store)) throw functionName + "store missing or invalid";

        return true;
    };

    // this confirms that there is a setter function for the store property
    const setterIsValid = function (context, fieldPath) {
        if (storeIsValid(context) && _.isNil(context.$store._mutations[fieldPath])) throw functionName + "store mutation missing for " + fieldPath;

        return true;
    };

    // make sure there is a valid field parameter passed in
    if (!_.isObject(fieldsParam)) throw functionName + "fields argument must be object or array";

    if (_.isArray(fieldsParam)) {
        // the fieldsParam is an array, so iterate through string items, create a
        // key / value pair from each item and push onto the fields array
        for (let i = 0; i < fieldsParam.length; i++) {
            if (_.isString(fieldsParam[i])) {
                let obj = {};

                obj[fieldsParam[i]] = fieldsParam[i];
                fields = fields || [];
                fields.push(obj);
            }
        }
    }
    else {
        // the fieldsParam is an object, so iterate through the items, create
        // key/value pairs for each item and push it onto the fields array
        for (const prop in fieldsParam) {
            if (fieldsParam.hasOwnProperty(prop)) {
                if (_.isNull(fieldsParam[prop]) || _.isString(fieldsParam[prop])) {
                    let obj = {};

                    obj[prop] = fieldsParam[prop];
                    fields = fields || [];
                    fields.push(obj);
                }
            }
        }
    }

    if (fields === null || fields.length === 0) throw functionName + "field name array is missing or invalid";

    namespace = namespace ? namespace.trim() : null;

    // parsing/validating done, so let's build the getter/setting exporting object
    for (let i = 0; i < fields.length; i++) {

        const field = fields[i];
        const computedKey = Object.keys(field)[0];
        const stateKey = field[computedKey];

        exporting[computedKey] = {
            get: function () {
                // we are not validating the store/state for the get - we are returning the state
                // directly and there is a use-case where the state value is not available when
                // getting; e.g., fetching namespaced state value via computed field.
                const fullNamespace = getFullNamespace(this);
                const state = fullNamespace === "" ? this.$store.state : this.$store.state[fullNamespace];

                return state === undefined ? null : state[stateKey];
            },
            set: function (value) {
                const fullNamespace = getFullNamespace(this);
                const fieldPath = fullNamespace + (_.isEmpty(fullNamespace) ? "" : "/") + stateKey;

                if (setterIsValid(this, fieldPath)) this.$store.commit(fieldPath, value);
            }
        };
    }

    return exporting;
};
