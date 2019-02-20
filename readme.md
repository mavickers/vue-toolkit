# @mavickers/vue-toolkit

A set of helpers for Vue and major Vue modules. The current version only contains helpers for Vuex. 

In general the approach of this library is to address issues of repetition. I enjoy the structure and rigidity of Vue, but goodness gracious typing the same stuff over and over is tedious even for me.

This readme gets into the basics of the module. Links are included to readme's for items further down the tree that should dig into more detail.

## Installation

npm install @mavickers/vue-toolkit

## Use

vue-toolkit is written as an ESM module. I recommend using a packager such as Webpack to get it into your project, but I'm not preachy about such things.

The module is organized thusly:

```
vue-toolkit
    +-- vuexHelpers
    |   +-- mappings
    |   |   +-- mapStateLazily
    |   +-- mutations
    |       +-- buildMutations
    |       +-- noMutator
    |       +-- straightMutator
    |
    |   (the following are aliases to tree structure beneath vuex)
    |
    +-- vuexMappings 
    +-- vuexMutations 
    |
    |   (the following are aliases directly to helper methods in the vuex tree)
    |
    +-- mapStateLazily
    +-- buildMutations
    +-- noMutator
    +-- straightMutator
```

### Why is it organized like this?

To allow you to use it a few different ways, whatever you find most readable or expedient in your code.

You can just import the top-level object and use property/method names from there:

```
import vueToolkit from "@/mavickers/vue-toolkit";

export default {
    ...
    
    computed: {
        ...vueToolkit.mappings.mapStateLazily(...)
    },
    
    ...
}
```

Or you can use next level objects:

```
import { vuexMappings } from "@mavickers/vue-toolkit";

export default {
    ...
    
    computed: {
        ...vuexMappings.mapStateLazily(...)
    },
    
    ...
}
```

Or, just pluck what you need out of the module:

```
import { mapStateLazily } from "@mavickers/vue-toolkit";

export default {
    ...
    
    computed: {
        ...mapStateLazily(...)
    },
    
    ...
}
```

## Vuex Helpers

### Mappings


#### [map-state-lazily][1]
This method is intended to be used in place of mapState/mapAction. I was running into a situation with these would throw an error on page load of namespaced stores because the accessors were apparently not available yet, although they would work fine afterwards. So instead of evaluating the accessors immediately it checks them when used and will throw at that time if they are not valid. Hence the name "lazy".

Then I needed a way to have each instance of a component and it's own store to have unique namespace. A static namespace for a Vuex store in a component has the same name across all the instances of the component, so mapStateLazily has an optional parameter to include a component property as part of the store namespace.

### Mutations

#### [buildMutations][2]
A method for building a set of repetitive mutations against a given state object. 

#### no-mutator
This is a mutation function that does nothing. It returns null. It should only be used to indicate that the store field being processed in buildMutations should not have a mutation associated with it.

#### straight-mutator
This is a mutation function that merely assigns the given value straight back to the store field.

## License

Vue Toolkit is released under the MIT license. So without further ado, here is a copy from OSI's page:

Copyright 2019 LightPath Solutions, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[1]: https://github.com/mavickers/vue-toolkit/blob/master/vuex-helpers/mappings/map-state-lazily/
[2]: https://github.com/mavickers/vue-toolkit/tree/master/vuex-helpers/mutations#buildMutations
