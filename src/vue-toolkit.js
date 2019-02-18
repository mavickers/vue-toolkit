import vuexHelpers from "./vuex-helpers/vuex-helpers";

/*
 * Vuex Helpers
 *
 */

// mappers
export const mapStateLazily = vuexHelpers.mappings.mapStateLazily;

// mutations
export const buildMutations = vuexHelpers.mutations.buildMutations;
export const noMutator = vuexHelpers.mutations.noMutator;
export const straightMutator = vuexHelpers.mutations.straightMutator;

