import vuexMappingsImport from "./mappings/mappings";
import vuexMutationsImport from "./mutations/mutations";

export const mappings = vuexMappingsImport;
export const mutations = vuexMutationsImport;

export const mapStateLazily = vuexMappingsImport.mapStateLazily;

export const buildMutations = vuexMutationsImport.buildMutations;
export const noMutator = vuexMutationsImport.noMutator;
export const straightMutator = vuexMutationsImport.straightMutator;

export default {
    mappings: mappings,
    mutations: mutations
}
