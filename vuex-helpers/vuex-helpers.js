import vuexMappings from "./mappings/mappings";
import vuexMutations from "./mutations/mutations";


export const mappings = vuexMappings;
export const mutations = vuexMutations;

export const mapStateLazily = vuexMappings.mapStateLazily;

export const buildMutations = vuexMutations.buildMutations;
export const noMutator = vuexMutations.noMutator;
export const straightMutator = vuexMutations.straightMutator;

export default {
    mappings: mappings,
    mutations: mutations
}
