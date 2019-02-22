import vuexHelpersImport from "./vuex-helpers/vuex-helpers";
import vuelidateHelpersImport from "./vuelidate-helpers/vuelidate-helpers";


/*
 * Vue Helpers
 *
 */



/*
 * Vuex Helpers
 *
 */

export const vuexHelpers = vuexHelpersImport;

// mappers
export const vuexMappings = vuexHelpersImport.mappings;
export const mapStateLazily = vuexMappings.mapStateLazilyMapper;

// mutations
export const vuexMutations = vuexHelpersImport.mutations;
export const buildMutations = vuexMutations.buildMutations;
export const noMutator = vuexMutations.noMutator;
export const straightMutator = vuexMutations.straightMutator;


/*
 * Vuelidate Helpers
 *
 */

export const vuelidateHelpers = vuelidateHelpersImport;
export const injectValidators = vuelidateHelpersImport.injectValidators;





export default {
    vuex: vuexHelpersImport
}

