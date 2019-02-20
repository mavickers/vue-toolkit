import vue from "./vue-helpers/vue-helpers";
import vuex from "./vuex-helpers/vuex-helpers";

/*
 * Vue Helpers
 *
 */

export const vueHelpers = vue;

// validators
export const vueValidators = vue.validators;
export const AsyncValidator = vue.validators.AsyncValidator;



/*
 * Vuex Helpers
 *
 */

export const vuexHelpers = vuex;

// mappers
export const vuexMappings = vuex.mappings;
export const mapStateLazily = vuexMappings.mapStateLazilyMapper;

// mutations
export const vuexMutations = vuex.mutations;
export const buildMutations = vuexMutations.buildMutations;
export const noMutator = vuexMutations.noMutator;
export const straightMutator = vuexMutations.straightMutator;

export default {
    vue: vue,
    vuex: vuex
}
