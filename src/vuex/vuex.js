import mappings from "./mappings/mappings";
import mutations from "./mutations/mutations";

export const mapStateLazily = mappings.mapStateLazily;

export const buildMutations = mutations.buildMutations;
export const noMutator = mutations.noMutator;
export const straightMutator = mutations.straightMutator;

export default {
    mappings: mappings,
    mutations: mutations
}
