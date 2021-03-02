"use strict";
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-loops */
/* eslint-disable brace-style */
Object.defineProperty(exports, "__esModule", { value: true });
function* flatten(nestedIterable) {
    //console.log(`\nInput to flatten: ${JSON.stringify(nestedIterable)}`)
    for (const element of nestedIterable) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof element !== "string" && typeof element[Symbol.iterator] === 'function') {
            //console.log(`flatten: element <${JSON.stringify(element)}> is iterable; flattening it *`)
            yield* flatten(element);
        }
        else {
            //console.log(`flatten: element <${JSON.stringify(element)}> is not iterable; yielding it *`)
            yield element;
        }
    }
}
exports.flatten = flatten;
function* take(iterable, n) {
    if (typeof n !== "number")
        throw new Error(`Invalid type ${typeof n} for argument "n"\nMust be number`);
    if (n < 0) {
        console.warn(`Warning: Negative value ${n} passed to argument <n> of take()`);
        return;
    }
    if (n > 0) {
        for (const element of iterable) {
            yield element;
            if (--n <= 0)
                break;
        }
    }
}
exports.take = take;
function* skip(iterable, n) {
    if (typeof n !== "number")
        throw new Error(`Invalid type ${typeof n} for argument "n"\nMust be number`);
    if (n < 0) {
        console.warn(`Warning: Negative value ${n} passed to argument <n> of skip()`);
        return;
    }
    for (const element of iterable) {
        if (n === 0)
            yield element;
        else
            n--;
    }
}
exports.skip = skip;
function* filter(iterable, predicate) {
    for (const element of iterable) {
        if (predicate(element))
            yield element;
        else
            continue;
    }
}
exports.filter = filter;
function last(collection, predicate) {
    // eslint-disable-next-line fp/no-let
    if ('length' in collection) {
        // Array-specific implementation of last() for better performance using direct elements access
        // eslint-disable-next-line fp/no-let
        for (let i = collection.length - 1; i >= 0; i--) {
            const element = collection[i];
            if (predicate === undefined || predicate(element))
                return element;
        }
        return undefined;
    }
    else {
        // eslint-disable-next-line fp/no-let
        let _last = undefined;
        const iterable = predicate === undefined ? collection : filter(collection, predicate);
        for (const element of iterable) {
            _last = element;
        }
        return _last;
    }
}
exports.last = last;
function* chunk(iter, chunkSize) {
    // console.log(`\n\tStarting chunk()`)
    const batch = [...take(iter, chunkSize)];
    // console.assert(batch.length === Math.min([...iter].length, chunkSize))
    // console.log(`\n\tBatch length ${batch.length}`)
    if (batch.length > 0) {
        // console.log(`\n\tYielding batch of length ${batch.length}`)
        // eslint-disable-next-line fp/no-unused-expression
        yield batch;
        // eslint-disable-next-line fp/no-unused-expression
        yield* chunk(skip(iter, chunkSize), chunkSize);
    }
}
exports.chunk = chunk;
function hasValue(value) {
    switch (typeof value) {
        case "function":
        case "boolean":
        case "bigint":
        case "object":
        case "symbol":
            return (value !== null);
        case "undefined":
            return false;
        case "number":
            return (value !== null && !isNaN(value) && !Number.isNaN(value) && value !== Number.NaN);
        case "string":
            return value !== undefined && value !== null && value.trim().length > 0 && !/^\s*$/.test(value);
        //if(str.replace(/\s/g,"") == "") return false
    }
    return true;
}
exports.hasValue = hasValue;
