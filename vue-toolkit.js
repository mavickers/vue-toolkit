import vuex from "./vuex-helpers/vuex-helpers";

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
    vuex: vuex
}
