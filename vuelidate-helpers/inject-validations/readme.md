# injectValidations

## Use Case
Well, here is my use case.

I have a top-level component with sub-components. One of the sub-components is a repository containing api method calls. Other sub-components are various ui widgets. 

I like to keep the sub-components SOLID-ly clean, so they only involve markup and form/field state (if they are mainly concerned with ui) or they only handle api calls (in the case of the repo).

The ui components use Vuelidate and have their own set of validations for the fields they contain. In one case however I would like to validate a field to make sure the value entered by the user is unique in the database. This requires an api call to the repo, and I'd rather not drop the repo onto the sub-component. I want to control all the api calls from the top-level component.

So I wrote injectValidations, allowing one to inject validation methods on sub-component fields without the sub-component knowing anything about it.

## Usage
```
injectValidations(subComponent, {
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

import { injectValidations } from "@mavickers/vue-toolkit";
import RepoComponent from "../somewhere/repo-component";
import SubComponent from "../somewhereElse/sub-component";

export const Vue = new Vue({
    ...
    
    components: {
        "repo": RepoComponent,
        "subComponent": SubComponent
    },
    mounted() {
        injectValidations(this.subComponent, {
            someField: [ value => this.repo.someMethod(value) ]
        });
    }
    ...
});

```

And that's it.

## Notes

- **THIS WILL ONLY WORK IN THE MOUNTED HOOK OF THE PARENT OBJECT.** The component references are not available in beforeCreate() or created(). 
- injectValidations will throw if there is something wrong with the parameters.
- If the validation parameter passed in for a field is not a function it is ignored without error.
- If the validation object does not exist in the sub-component it is created. 
- If a field is specified that does not exist in the validation object it is created.
