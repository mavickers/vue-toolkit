/*
 * AsyncValidator
 *
 * Use this to attach async validators to a field in a Vue component. Usage
 * takes fours steps:
 *
 * 1) Include in your component - import "./AsyncValidator"
 * 2) Instantiate an instance - const asyncValidator = new AsyncValidator()
 * 3) Expose the add() method in the component -
 *      methods: {
 *          addAsyncValidator: asyncValidator.add,
 *          ...
 *      }
 *
 *    This step is actually not necessary if you are attaching the validators from
 *    inside the component, but that (I think) should be a corner case.
 * 4) Attach the processor method to the validations section of your component.
 *    Method 1: calling it with the name of the field to be validated.
 *
 *      validations: {
 *          field1: {
 *              required,
 *              minLength: minLength(10),
 *              asyncValidations: asyncValidatorInstance.process("field1")
 *          }
 *      }
 *
 *    Method 2: calling the attachProcessor method in the mounted section
 *    of the component, which will attach the processor to all fields listed in the
 *    validations section of the component.
 *
 *      asyncValidatorInstance.attachProcessor(vueComponentInstance.validations);
 *
 *  The processor will execute all validators, using AND (&&) to finalize
 *  the validation results, returning true or false.
 *
 */

import _ from "lodash";

export default class {
    constructor() {
        const validators = {};

        /**
         * add()
         *
         * Add an async validator to the given field.
         *
         * @param {string} fieldName
         *  The name of the field to validate.
         * @param {function} validator
         *  An async function that performs the validation. It must accept a string (for the value
         *  of the field to be validated) and return a boolean (indicating if validaton was
         *  successful).
         * @returns {boolean}
         *
         */

        this.addValidator = function(fieldName, validator) {
            if (_.isEmpty(fieldName)) return false;
            if (!_.isFunction(validator)) return false;

            validators[fieldName] = validators[fieldName] || [];
            validators[fieldName].push(validator);

            return true;
        };

        /**
         * attachProcessor()
         *
         * Attach asyncValidation processors to each of the fields listed in the
         * vue component validations.
         *
         * Use case: execute this in the mounted() event of the component if you
         * want to attach the async processor to all the fields listed in the validations
         * section rather than adding them individually.
         *
         * If an "asyncValidators" property is already attached to a field in the validations
         * section then attachment is skipped for that field.
         *
         * @param {} validations
         * @returns {}
         *
         */

        this.attachProcessor = function(validations) {
            if (validations === undefined || validations === null) return;

            for (let field in validations) {
                if (validations.hasOwnProperty(field)) {
                    if (validations[field]["asyncValidators"] !== undefined &&
                        validations[field]["asyncValidators"] !== null) continue;

                    validations[field]["asyncValidators"] = this.processor(field);
                }
            }
        };

        /**
         * processor()
         *
         * The async validation processor that runs on a field during the vuelidate
         * validation process.
         *
         * See #4 in class notes for usage.
         *
         * @param {} fieldName
         * @returns {}
         */

        this.processor = function (fieldName) {
            if (_.isEmpty(fieldName)) throw "fieldName parameter is invalid (null or short)";

            return async function(value) {
                if (_.isEmpty(value)) return true;
                if (validators === undefined || validators === null) return true;
                if (!(validators[fieldName] instanceof Array)) return true;
                if (validators[fieldName].length === 0) return true;

                let finalResult = true;

                for (let i = 0; i < validators[fieldName].length; i++) {
                    if (!(validators[fieldName][i] instanceof Function)) continue;

                    const result = await validators[fieldName][i](value);

                    finalResult = finalResult && ((typeof result === "boolean" || result instanceof Boolean) && result);
                }

                return finalResult;
            };
        };
    }
};
