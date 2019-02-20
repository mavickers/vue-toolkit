import vuexHelpers from "./vuex-helpers/vuex-helpers";
import mapStateLazilyMapper from "./vuex-helpers/mappings/map-state-lazily/map-state-lazily";

/*
 * Vuex Helpers
 *
 */

// mappers
export const mapStateLazily = mapStateLazilyMapper;

// mutations
export const buildMutations = vuexHelpers.mutations.buildMutations;
export const noMutator = vuexHelpers.mutations.noMutator;
export const straightMutator = vuexHelpers.mutations.straightMutator;
