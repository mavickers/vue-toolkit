import vueHelpersImport from "./vue-helpers/vue-helpers";
import vuexHelpersImport from "./vuex-helpers/vuex-helpers";
import vuelidateHelpersImport from "./vuelidate-helpers/vuelidate-helpers";


/*
 * Vue Helpers
 *
 */

export const vueHelpers = vueHelpersImport;

export const eventBus = vueHelpersImport.eventBus;

/*
 * Vuex Helpers
 *
 */

export const vuexHelpers = vuexHelpersImport;

// mappers
export const vuexMappings = vuexHelpersImport.mappings;
export const mapStateLazily = vuexMappings.mapStateLazily;

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

export const injectValidations = vuelidateHelpersImport.injectValidations;




export default {
    vuex: vuexHelpersImport,
    vuelidate: vuelidateHelpersImport
}

