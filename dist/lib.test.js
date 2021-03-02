"use strict";
/* eslint-disable no-useless-escape */
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
const lib_1 = require("./lib");
// import { GitHubAnnotation, GithubCheckInfo } from "./check-github"
describe('parse()', function () {
    const lintReport = JSON.stringify({
        "description": "ES Lint results",
        "counts": {
            "failure": 0,
            "warning": 29,
            "notice": 0
        },
        "byFile": {
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/async/index.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 3
                },
                "details": [
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 8,
                        "endLine": 8,
                        "startColumn": 8,
                        "endColumn": 34
                    },
                    {
                        "message": "'unlock' is defined but never used.",
                        "category": "warning",
                        "startLine": 55,
                        "endLine": 55,
                        "startColumn": 45,
                        "endColumn": 51
                    },
                    {
                        "message": "Unallowed reassignment",
                        "category": "warning",
                        "startLine": 60,
                        "endLine": 60,
                        "startColumn": 31,
                        "endColumn": 42
                    }
                ]
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/collections/containers/array.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 2
                },
                "details": [
                    {
                        "message": "Unallowed use of `get`",
                        "category": "warning",
                        "startLine": 25,
                        "endLine": 32,
                        "startColumn": 4,
                        "endColumn": 5
                    },
                    {
                        "message": "Unallowed use of `get`",
                        "category": "warning",
                        "startLine": 33,
                        "endLine": 40,
                        "startColumn": 4,
                        "endColumn": 5
                    }
                ]
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/collections/containers/dictionary.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 1
                },
                "details": [
                    {
                        "message": "'Set' is defined but never used.",
                        "category": "warning",
                        "startLine": 6,
                        "endLine": 6,
                        "startColumn": 10,
                        "endColumn": 13
                    }
                ]
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/collections/containers/index.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/collections/containers/linked-list.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/collections/containers/queue.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/collections/containers/sequence.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/collections/containers/set.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 1
                },
                "details": [
                    {
                        "message": "Unallowed use of `get`",
                        "category": "warning",
                        "startLine": 32,
                        "endLine": 32,
                        "startColumn": 4,
                        "endColumn": 43
                    }
                ]
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/collections/containers/table.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 3
                },
                "details": [
                    {
                        "message": "'ArrayNumeric' is defined but never used.",
                        "category": "warning",
                        "startLine": 11,
                        "endLine": 11,
                        "startColumn": 10,
                        "endColumn": 22
                    },
                    {
                        "message": "'start' is assigned a value but never used.",
                        "category": "warning",
                        "startLine": 40,
                        "endLine": 40,
                        "startColumn": 9,
                        "endColumn": 14
                    },
                    {
                        "message": "Forbidden non-null assertion.",
                        "category": "warning",
                        "startLine": 206,
                        "endLine": 206,
                        "startColumn": 8,
                        "endColumn": 46
                    }
                ]
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/collections/index.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/collections/iterable-async.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/collections/iterable.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/collections/object.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/datetime/index.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 5
                },
                "details": [
                    {
                        "message": "Unallowed reassignment",
                        "category": "warning",
                        "startLine": 51,
                        "endLine": 51,
                        "startColumn": 3,
                        "endColumn": 16
                    },
                    {
                        "message": "Unallowed reassignment",
                        "category": "warning",
                        "startLine": 54,
                        "endLine": 54,
                        "startColumn": 3,
                        "endColumn": 16
                    },
                    {
                        "message": "Unallowed reassignment",
                        "category": "warning",
                        "startLine": 62,
                        "endLine": 62,
                        "startColumn": 3,
                        "endColumn": 22
                    },
                    {
                        "message": "Unallowed reassignment",
                        "category": "warning",
                        "startLine": 65,
                        "endLine": 65,
                        "startColumn": 3,
                        "endColumn": 26
                    },
                    {
                        "message": "Unallowed reassignment",
                        "category": "warning",
                        "startLine": 68,
                        "endLine": 68,
                        "startColumn": 3,
                        "endColumn": 26
                    }
                ]
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/functional/index.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/index.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/numeric/index.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/statistical/index.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 1
                },
                "details": [
                    {
                        "message": "'noop' is defined but never used.",
                        "category": "warning",
                        "startLine": 5,
                        "endLine": 5,
                        "startColumn": 18,
                        "endColumn": 22
                    }
                ]
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/text/char.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 7
                },
                "details": [
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 17,
                        "endLine": 17,
                        "startColumn": 2,
                        "endColumn": 11
                    },
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 20,
                        "endLine": 20,
                        "startColumn": 2,
                        "endColumn": 11
                    },
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 23,
                        "endLine": 23,
                        "startColumn": 2,
                        "endColumn": 15
                    },
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 28,
                        "endLine": 28,
                        "startColumn": 8,
                        "endColumn": 39
                    },
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 38,
                        "endLine": 38,
                        "startColumn": 8,
                        "endColumn": 38
                    },
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 42,
                        "endLine": 42,
                        "startColumn": 8,
                        "endColumn": 38
                    },
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 46,
                        "endLine": 46,
                        "startColumn": 8,
                        "endColumn": 42
                    }
                ]
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/text/index.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/text/string.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/utility.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 0
                },
                "details": []
            },
            "/Users/diegocisneros/Projects/coding/hypothesize/standard2/src/web/index.ts": {
                "counts": {
                    "failure": 0,
                    "warning": 6
                },
                "details": [
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 371,
                        "endLine": 371,
                        "startColumn": 8,
                        "endColumn": 144
                    },
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 428,
                        "endLine": 428,
                        "startColumn": 2,
                        "endColumn": 37
                    },
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 445,
                        "endLine": 445,
                        "startColumn": 8,
                        "endColumn": 72
                    },
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 454,
                        "endLine": 454,
                        "startColumn": 8,
                        "endColumn": 54
                    },
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 466,
                        "endLine": 466,
                        "startColumn": 8,
                        "endColumn": 53
                    },
                    {
                        "message": "Missing return type on function.",
                        "category": "warning",
                        "startLine": 489,
                        "endLine": 489,
                        "startColumn": 8,
                        "endColumn": 55
                    }
                ]
            }
        }
    });
    const testReport = `{
		"name": "Mocha unit tests",
		"description": "Mocha unit tests",
		"summary": "",
		"counts": {
			"failure": 0,
			"warning": 0,
			"notice": 21
		},
		"byFile": {
			"/Users/prmph/Code/ci-checks-action/dist/index.test.js": {
			"counts": {
				"failure": 0,
				"warning": 0,
				"notice": 21
			},
			"details": [
				{
				"Id": "flatten()",
				"title": "flatten() should return a result that excludes empty arrays",
				"message": "'should return a result that excludes empty arrays' passed",
				"category": "notice"
				},
				{
				"Id": "flatten()",
				"title": "flatten() should treat strings as primitives, not iterables",
				"message": "'should treat strings as primitives, not iterables' passed",
				"category": "notice"
				},
				{
				"Id": "take()",
				"title": "take() should return array with length equal to the smaller of input array length and take count",
				"message": "'should return array with length equal to the smaller of input array length and take count' passed",
				"category": "notice"
				},
				{
				"Id": "take()",
				"title": "take() should return empty array for an input empty array",
				"message": "'should return empty array for an input empty array' passed",
				"category": "notice"
				},
				{
				"Id": "take()",
				"title": "take() should return empty array for take count of 0",
				"message": "'should return empty array for take count of 0' passed",
				"category": "notice"
				},
				{
				"Id": "take()",
				"title": "take() should return empty array for negative take count",
				"message": "'should return empty array for negative take count' passed",
				"category": "notice"
				},
				{
				"Id": "take()",
				"title": "take() should be idempotent for pure iterables",
				"message": "'should be idempotent for pure iterables' passed",
				"category": "notice"
				},
				{
				"Id": "chunk()",
				"title": "chunk() should return empty array when given empty array",
				"message": "'should return empty array when given empty array' passed",
				"category": "notice"
				},
				{
				"Id": "chunk()",
				"title": "chunk() should return a one-element array for an input array of length less than chunk size",
				"message": "'should return a one-element array for an input array of length less than chunk size' passed",
				"category": "notice"
				},
				{
				"Id": "hasValue()",
				"title": "hasValue() should return true for an empty array",
				"message": "'should return true for an empty array' passed",
				"category": "notice"
				},
				{
				"Id": "hasValue()",
				"title": "hasValue() should return true for a non-empty array",
				"message": "'should return true for a non-empty array' passed",
				"category": "notice"
				},
				{
				"Id": "hasValue()",
				"title": "hasValue() should return false for an empty string",
				"message": "'should return false for an empty string' passed",
				"category": "notice"
				},
				{
				"Id": "hasValue()",
				"title": "hasValue() should return false for a whitespace string",
				"message": "'should return false for a whitespace string' passed",
				"category": "notice"
				},
				{
				"Id": "hasValue()",
				"title": "hasValue() should return true for a non-empty string",
				"message": "'should return true for a non-empty string' passed",
				"category": "notice"
				},
				{
				"Id": "hasValue()",
				"title": "hasValue() should return true for the boolean value <false>",
				"message": "'should return true for the boolean value <false>' passed",
				"category": "notice"
				},
				{
				"Id": "hasValue()",
				"title": "hasValue() should return true for a function",
				"message": "'should return true for a function' passed",
				"category": "notice"
				},
				{
				"Id": "hasValue()",
				"title": "hasValue() should return true for an empty object",
				"message": "'should return true for an empty object' passed",
				"category": "notice"
				},
				{
				"Id": "hasValue()",
				"title": "hasValue() should return true for a symbol",
				"message": "'should return true for a symbol' passed",
				"category": "notice"
				},
				{
				"Id": "hasValue()",
				"title": "hasValue() should return false for the value <undefined>",
				"message": "'should return false for the value <undefined>' passed",
				"category": "notice"
				},
				{
				"Id": "hasValue()",
				"title": "hasValue() should return true for the number <0>",
				"message": "'should return true for the number <0>' passed",
				"category": "notice"
				},
				{
				"Id": "hasValue()",
				"title": "hasValue() should return false for the number <NaN>",
				"message": "'should return false for the number <NaN>' passed",
				"category": "notice"
				}
			]
			}
		}
	}`;
    const changedFiles = [
        `/Users/prmph/Code/ci-checks-action/.github/workflows/default.yml`,
        `/Users/prmph/Code/ci-checks-action/dist/index.js`,
        `/Users/prmph/Code/ci-checks-action/package-lock.json`,
        `/Users/prmph/Code/ci-checks-action/package.json`,
        `/Users/prmph/Code/ci-checks-action/src/index.ts`,
        `/Users/prmph/Code/ci-checks-action/test/index.test.ts`
    ];
    // Conclusion = "success" | "failure" | "neutral" | "cancelled" | "timed_out" | "action_required" | undefined
    it('should return no annotations, if changed files is an empty array', function () {
        /*const expected = {
            "title": "lint",
            "summary": "File ignored because of a matching ignore pattern. Use \"--no-ignore\" to override.",
            "conclusion": "failure",
            "text": "",
            "annotations": []
        }*/
        const annotations = [...lib_1.parse(lintReport, [], undefined).annotations];
        assert.deepEqual(annotations, []);
    });
    it('should return all annotations, if changed files is undefined', function () {
        const annotations = [...lib_1.parse(lintReport, undefined, "lint").annotations];
        assert.deepEqual(annotations.map(a => a.path), [
            `/Users/prmph/Code/ci-checks-action/src/check-general.schema.json`,
            `/Users/prmph/Code/ci-checks-action/src/index.ts`
        ]);
    });
    it('should return annotations for changed files only, if changed files is a non-empty array', function () {
        const annotations = [...lib_1.parse(lintReport, changedFiles, "lint").annotations];
        assert.deepEqual(annotations.map(a => a.path), [`/Users/prmph/Code/ci-checks-action/src/index.ts`]);
    });
    it('should not repeat annotations', function () {
        const annotations = [...lib_1.parse(testReport, changedFiles, "lint").annotations];
        assert.deepEqual(annotations.length, new Set(annotations).size);
    });
});
