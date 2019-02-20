# Mutations

##buildMutations

### Use Case

I was writing a lot of code like this.

state.js
```
export const state = {
    someField1: "value number 1",
    someField2: "value number 2",
    someField3: "value number 3",
    someField4: "value number 3",
    someField5: "value number 3",
    someField6: "value number 3",
    someField7: [ new SomeObject ],
    someField8: [ new SomeObject ],
    someField9: [ new SomeObject ]
}; 
```

mutations.js
```
export const mutations = {
    someField1: (state, value) => state.someField1 = value,
    someField2: (state, value) => state.someField1 = value,
    someField3: (state, value) => state.someField1 = value,
    someField4: (state, value) => state.someField1 = value,
    someField5: (state, value) => state.someField1 = value,
    someField6: (state, value) => state.someField1 = value,
    someField7: (state, value) => doSomethingDifferent(state, value)
    someField8: (state, value) => doSomethingDifferent(state, value)
    someField9: (state, value) => doSomethingDifferent(state, value)
};
```

Multiply that by the number of component stores in my project.

buildMutations is a scaffolding function replacing a lot of the boilerplate in the mutations file.

### Usage

```
buildMutations(stateObject, { 
    "*": mainMutatorFunction,
    "field4,field5,field6": anotherMutatorFunction,
    "field7,field8,field9": yetAnothermutatorFunction
})
```

#### Example - Standard Mutation Build
mutations.js
```
import { buildMutations } from "@mavickers/vue-toolkit";
import state from "./state";

const myMutator = function(name) { return (state, value) => state[name] = value; };

export const mutations = {
    ...buildMutations(state, {
        "someField1,someField2,someField3,someField4,someField5,someField6": myMutator
    }),
    someField7: (state, value) => doSomethingDifferent(state, value),
    someField8: (state, value) => doSomethingDifferent(state, value),
    someField9: (state, value) => doSomethingDifferent(state, value)
};
```

The field names can (and should) be a string array of field names from the state object. buildMutations will iterate through the field name list and apply the specified mutator to each field.

myMutator is a mutator function that you write. buildMutation will pass in the name of the state property to your mutator function, and your function should return a function that accepts state and value and mutates state according to your wishes.

#### Example - Wildcard and noMutator

buildMutations accepts the wildcard "*" which instructs the method to apply the mutator to **all** fields in the state object.

Vue Toolkit includes a mutator function named _noMutator_. When this mutator is specified buildMutations does not assign a mutator to the field and also removes any mutators that were previously assigned to the field.

Why would you want to do that? It allows you to say "apply this mutator to everything in the state object, except for this field (or these fields)."

mutations.js
```
import { buildMutations, noMutator } from "@mavickers/vue-toolkit";
import state from "./state";

const myMutator = function(name) { return (state, value) => state[name] = value; };

export const mutations = {
    ...buildMutations(state, {
        "*": myMutator,
        "someField5,someField6": noMutator,
    }),
    someField7: (state, value) => doSomethingDifferent(state, value),
    someField8: (state, value) => doSomethingDifferent(state, value),
    someField9: (state, value) => doSomethingDifferent(state, value)
};
```

#### Example - Wildcard and straightMutator

So back to my original situation. Since I was writing a lot of code where the mutation was merely assigning value back to the state field I included _straightMutator_ which does just that. You can read more about straightMutator below.

mutations.js
```
import { buildMutations, noMutator, straightMutator } from "@mavickers/vue-toolkit";
import state from "./state";

export const mutations = {
    ...buildMutations(state, {
        "*": straightMutator,
        "someField5,someField6": noMutator,
    }),
    someField7: (state, value) => doSomethingDifferent(state, value),
    someField8: (state, value) => doSomethingDifferent(state, value),
    someField9: (state, value) => doSomethingDifferent(state, value)
};
```

## noMutator
A mutation function that doesn't do anything (it returns null). You shouldn't actually be using it functionally, but rather to indicate that a state field (when processed with _buildMutations_) should not have a mutator attached. [See example in the buildMutations documentation](#example---wildcard-and-nomutator).

## straightMutator
