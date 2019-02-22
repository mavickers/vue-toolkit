/*
 * extensions
 *
 * Helper functions stapled onto lodash.
 */

// this library is dependent on lodash so I'm not going to do any checks for it

import _ from "lodash";

if (_.isNil(_.isVueComponent)) {
    _.isVueComponent = function (obj, name) {
        if (!_.isObject(obj)) return false;
        if (_.isNil(obj.constructor)) return false;
        if (obj.constructor.name !== "VueComponent") return false;
        if (_.isNil(obj.$options)) return false;
        if (!_.isNil(name) && obj.$options.name !== name) return false;

        return true;
    };
}

if (_.isNil(_.padLeft)) {
    _.padLeft = function (sourceString, paddingCharacter, minLength) {
        if (!_.isString(sourceString)) return sourceString;
        if (!_.isString(paddingCharacter)) return sourceString;
        if (!_.isInteger(minLength)) return sourceString;

        while (sourceString.length < minLength) sourceString = `${paddingCharacter}${sourceString}`;

        return sourceString;
    }
}
