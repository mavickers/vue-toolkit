/*
 * mutations head
 *
 */

import _ from "lodash";
import noMutator from "./no-mutator/no-mutator";
import straightMutator from "./straight-mutator/straight-mutator";

export default {
    buildMutations: function(state, config) {
        const stateKeys = _.keys(state);
        const mutations = {};

        _.forEach(_.keys(config), configKey => {
            const mutator = config[configKey];
            const processingKeys = configKey.replace(/[\s,]+/g, ",").split(",");
            const allKeyIndex = processingKeys.indexOf("*");

            // we have the wildcard key
            if (allKeyIndex >= 0) {
                // splice the stateKeys into the array where the wildcard is
                processingKeys.splice(allKeyIndex, 0, ...stateKeys);
                // we are now going to remove duplicates - we want the last instance
                // of a duplicate; uniq() leaves the first instance, so we're going to
                // run uniq on the reverse order of the array then reverse order again.
                _.reverse(_.uniq(_.reverse(processingKeys)));
                // now pluck out the wildcard(s)
                _.remove(processingKeys, key => key === "*");
            }

            // now process the keys
            _.forEach(processingKeys, processingKey => {
                switch (mutator) {
                    case noMutator: {
                        // noMutator means don't add a mutator for the key... and
                        // delete it if one has been previously assigned
                        delete mutations[processingKey];
                        break;
                    }
                    case straightMutator: {
                        mutations[processingKey] = straightMutator(processingKey);
                        break;
                    }
                    default: {
                        mutations[processingKey] = mutator;
                        break;
                    }

                }
            });
        });

        return mutations;
    },
    // the noMutator is here just for syntactic sugar
    noMutator: noMutator,
    straightMutator: straightMutator
};

