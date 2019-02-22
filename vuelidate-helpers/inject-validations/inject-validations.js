/*
 * inject-validations
 *
 */

import _ from "lodash";
import "../../vue-helpers/extensions/extensions";

const functionName = "[inject-validations]";

export default function(component, newValidations) {
    if (!_.isVueComponent(component)) throw `${functionName} component parameter is not valid`;
    if (!_.isObject(component.$v)) throw `${functionName} component parameter does not appear to include vuelidate`;
    if (!_.isObject(newValidations)) throw `${functionName} validators parameter is not valid`;

    component.$options.__proto__.validations = component.$options.__proto__.validations || { };

    const componentValidations = component.$options.__proto__.validations;

    _.forEach(_.keys(newValidations), field => {
        const validations = _.isArray(newValidations[field]) ? newValidations[field] : [newValidations[field]];

        componentValidations[field] = componentValidations[field] || { };

        _.forEach(validations, (validation, index) => {
            const validatorName = `injected-validator-${_.padLeft(index.toString(), "0", 2)}`;

            if (!_.isFunction(validation)) return;

            componentValidations[field][validatorName] = validation;
        });
    });
}
