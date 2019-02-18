/*
 * straightMutator
 *
 */

export default function(name) {
    return (state, value) => state[name] = value;
};
