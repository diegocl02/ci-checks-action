"use strict";
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-loops */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const utility_1 = require("./utility");
describe('flatten()', function () {
    it('should return a result that excludes empty arrays', function () {
        const actual = [...utility_1.flatten([
                [{
                        "path": "src/check-general.schema.json",
                        "message": "File ignored because of a matching ignore pattern. Use \"--no-ignore\" to override.",
                        "start_line": 0,
                        "end_line": 0,
                        "annotation_level": "warning"
                    }],
                [],
                [],
                [],
                []
            ])];
        const expected = [{
                "path": "src/check-general.schema.json",
                "message": "File ignored because of a matching ignore pattern. Use \"--no-ignore\" to override.",
                "start_line": 0,
                "end_line": 0,
                "annotation_level": "warning"
            }];
        assert.deepEqual(actual, expected);
    });
    it('should treat strings as primitives, not iterables', function () {
        const actual = [...utility_1.flatten([["annotation"], ["simplicity"]])];
        const expected = ["annotation", "simplicity"];
        assert.deepEqual(actual, expected);
    });
});
describe('take()', function () {
    it('should return array with length equal to the smaller of input array length and take count', function () {
        assert.deepEqual([...utility_1.take([10, 20, 30, 40], 7)], [10, 20, 30, 40]);
        assert.deepEqual([...utility_1.take([10, 20, 30, 40], 2)], [10, 20]);
    });
    it('should return empty array for an input empty array', function () {
        assert.deepEqual([...utility_1.take([], 7)], []);
    });
    it('should return empty array for take count of 0', function () {
        assert.deepEqual([...utility_1.take([5, 2, 3, 1], 0)], []);
    });
    it('should return empty array for negative take count', function () {
        assert.deepEqual([...utility_1.take([5, 2, 3, 1], -3)], []);
    });
    it('should be idempotent for pure iterables', function () {
        const arr = [10, 20, 99, 3, 30, 40];
        assert.deepEqual([...utility_1.take(arr, 4)], [...utility_1.take(arr, 4)]);
    });
});
describe('chunk()', function () {
    it('should return empty array when given empty array', function () {
        assert.deepEqual([...utility_1.chunk([], 50)], []);
    });
    it('should return a one-element array for an input array of length less than chunk size', function () {
        const actual = [...utility_1.chunk([{
                    "path": "src/check-general.schema.json",
                    "message": "File ignored because of a matching ignore pattern. Use \"--no-ignore\" to override.",
                    "start_line": 0,
                    "end_line": 0,
                    "annotation_level": "warning"
                }], 50)];
        const expected = [[{
                    "path": "src/check-general.schema.json",
                    "message": "File ignored because of a matching ignore pattern. Use \"--no-ignore\" to override.",
                    "start_line": 0,
                    "end_line": 0,
                    "annotation_level": "warning"
                }]];
        assert.deepEqual(actual, expected);
    });
});
describe('hasValue()', function () {
    it('should return true for an empty array', function () {
        assert.equal(utility_1.hasValue([]), true);
    });
    it('should return true for a non-empty array', function () {
        assert.equal(utility_1.hasValue([1, 2, 3]), true);
    });
    it('should return false for an empty string', function () {
        assert.equal(utility_1.hasValue(""), false);
    });
    it('should return false for a whitespace string', function () {
        assert.equal(utility_1.hasValue(" "), false);
        assert.equal(utility_1.hasValue(`
		`), false);
        assert.equal(utility_1.hasValue("		"), false);
    });
    it('should return true for a non-empty string', function () {
        assert.equal(utility_1.hasValue("abc"), true);
    });
    it('should return true for the boolean value "false"', function () {
        assert.equal(utility_1.hasValue(false), true);
    });
    it('should return true for a function', function () {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        assert.equal(utility_1.hasValue(() => { }), true);
    });
    it('should return true for an empty object', function () {
        assert.equal(utility_1.hasValue({}), true);
    });
    it('should return true for a symbol', function () {
        assert.equal(utility_1.hasValue(Symbol()), true);
    });
    it('should return false for the value "undefined"', function () {
        assert.equal(utility_1.hasValue(undefined), false);
    });
    it('should return true for the number "0"', function () {
        assert.equal(utility_1.hasValue(0), true);
    });
    it('should return false for the number "NaN"', function () {
        assert.equal(utility_1.hasValue(NaN), false);
        assert.equal(utility_1.hasValue(Number.NaN), false);
    });
});
