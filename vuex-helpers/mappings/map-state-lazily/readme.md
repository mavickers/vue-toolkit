# mapStateLazily

This function maps vuex store getter/mutation for a field to a local component computed get/set pair for the same field name, but in a lazy fashion. The out-of-the-box mapState evals the getters/mutations immediately as well as on every get/set while this only evals during a get/set.

I am not in love with the name of this method. It may change eventually.

## Use Case

### General

While (I think) this can be used to replace mapState in general, the reason I wrote it was to suppress the vuex error received when adding a watch to a computed property that is coming from namespaced state. On setup of the watch the getter/setter is eval'd and you received an error from vuex stating that the namespace is not valid, although subsequent calls to the get/set will work fine.

### Unique Namespacing For Component Store Instances

In the case of using a property to build the namespace, this arises when using a component that is repeated (such as in a v-for loop) where you want to maintain individual state for each instance - otherwise each component instance will be reading/modifying the same state. Assuming you inject a unique identifier into the component via props, the uid can be used to namespace the state in the mapper.
 
 ## Usage
```
import { mapStateLazily } from "[path]/VuexToolkit";
import store from "[path]/yourStore";

export default {
	
	...

	computed: {
		// no namespacing
		...mapStateLazily([ "field1", "field2", ... ]),
		...mapStateLazily({
			internalFieldName1: "storeFieldName1",
			internalFieldName2: "storeFieldName2",
			...
		}),
		// regular namespacing
		...mapStateLazily("namespace", [ "field1", "field2", ... ]),
		...mapStateLazily("namespace", {
			internalFieldName1: "storeFieldName1",
			internalFieldName2: "storeFieldName2",
			...
		}),
		// namespacing that includes a component property value
		...mapStateLazily("namespace", "instanceId", [ "field1", "field2", ... ]),
		...mapStateLazily("namespace", "instanceId", {
			internalFieldName1: "storeFieldName1",
			internalFieldName2: "storeFieldName2",
			...
		})
	},
	created() {
		// no namespacing
		this.$store.registerModule(store);
		// regular namespacing
		this.$store.registerModule("component", storeFactory.create());
		// namespacing that includes a component property value
		this.$store.registerModule("component/" + this.instanceId, storeFactory.create());
	},
	props: [
		// a value passed into the component, presumed to be unique
		// for each instance of the component
		"instanceId"	
	],

	...

}
```
## Notes
 
- Namespace is optional.
- Property is optional and should be a reference to a property of the parent component. If the property does not exist it will throw. If a valid property is included it will be appended to the namespace with a slash. e.g.
  - mapStateLazily("namespace", ["field"]) = "namespace/\{field\}"
  - mapStateLazily("namespace", "property", ["field"]) = "namespace/property/\{field\}
- Field names specified in mapFields must exist either in root or specified namespace

