import vuex from "./vuex/vuex";

export const mapStateLazily = vuex.mappings.mapStateLazily;

export const buildMutations = vuex.mutations.buildMutations;
export const noMutator = vuex.mutations.noMutator;
export const straightMutator = vuex.mutations.straightMutator;

export default {
    vuex: vuex
}
