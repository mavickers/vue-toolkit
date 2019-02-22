# injectValidators

## Use Case
Well, here is my use case.

I have a top-level component with sub-components. One of the sub-components is a repository containing api method calls. Other sub-components are various ui widgets. 

I like to keep the sub-components SOLID-ly clean, so they only involve markup and form/field state (if they are mainly concerned with ui) or they only handle api calls (in the case of the repo).

The ui components use Vuelidate and have their own set of validations for the fields they contain. In one case however I would like to validate a field to make sure the value entered by the user is unique in the database. This requires an api call to the repo, and I'd rather not drop the repo onto the sub-component. I want to control all the api calls from the top-level component.

So I wrote injectValidators, allowing one to inject validation methods on sub-component fields without the sub-component knowing anything about it.

## Usage
```
injectValidators(subComponent, {
    fieldInSubComponent: (value) => someSynchronousMethod(value),
    anotherFieldInSubComponent: [
        (value) => anotherSynchronousMethod(value),
        (value) => alsoMaybeAnAsynchronousMethod(value)
    ]
})
```

## Example

Here is something loosely based on my use case.

```
parent-component.js

import { injectValidators } from "@mavickers/vue-toolkit";
import RepoComponent from "../somewhere/repo-component";
import SubComponent from "../somewhereElse/sub-component";

export const Vue = new Vue({
    ...
    
    components: {
        "repo": RepoComponent,
        "subComponent": SubComponent
    },
    mounted() {
        const 
    
        injectValidators(this.subComponent, {
            someField: [ value => this.repo.someMethod(value) ]
        });
    }
    ...
});

```

And that's it.
