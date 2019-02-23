# extensions

This are various and sundry helper methods that don't have a place to stand alone. Since lodash is a dependency I've generally attached them to lodash.

The methods in this module are more or less candidates to be migrated to another package as they generally will not be Vue specific.

## isVueComponent

### Usage
```
_.isVueComponent(obj {,name})
```

**obj**: The object to be tested.

**name** (optional): The name of the component if you want to test for a specific component.

## _.padLeft

### Usage
```
_.padLeft(sourceString, paddingCharacter, minLength)
```

**sourceString**: The string to pad.

**paddingCharacter**: The character to use for padding.

**minLength**: The minimum length of the sourceString

### Example

_.padLeft("1", "0", 4)

// => "0001"
