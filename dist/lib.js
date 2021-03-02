"use strict";
/* eslint-disable camelcase */
/* eslint-disable no-await-in-loop */
/* eslint-disable fp/no-loops */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-namespace */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const ajv_1 = __importDefault(require("ajv"));
// import colors from 'colors/safe'
const utility_1 = require("./utility");
const generalCheckSchema = __importStar(require("./check-general.schema.json"));
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getChecksToReport() {
    const checks = JSON.parse(core.getInput('checks', { required: true }));
    console.log(`\nchecks input: ${JSON.stringify(checks)}`);
    return checks;
}
exports.getChecksToReport = getChecksToReport;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function parse(generalCheckJSON, changedFiles, checkName) {
    // console.log(`Parsing check JSON: "${generalCheckJSON}"`)
    // console.log(`changed files: ${changedFiles}`)
    var _a;
    const toValidate = JSON.parse(generalCheckJSON);
    const valid = new ajv_1.default().validate(generalCheckSchema, toValidate);
    if (valid === false) {
        throw new Error(`Error parsing check script output`);
    }
    const result = toValidate;
    // User-friendly markdown message text for the error/warning
    /*const link = `https://github.com/${OWNER}/${REPO}/blob/${SHA}/${filePathTrimmed}#L${line}:L${endLine}`
        let messageText = '### [`' + filePathTrimmed + '` line `' + line + '`](' + link + ')\n';
        messageText += '- Start Line: `' + line + '`\n';
        messageText += '- End Line: `' + endLine + '`\n';
        messageText += '- Message: ' + message + '\n';
        messageText += '  - From: [`' + ruleId + '`]\n';

        // Add the markdown text to the appropriate placeholder
        if (isWarning) {
            warningText += messageText
        }
        else {
            errorText += messageText
        }
    */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { byFile, summary, name, description, counts } = result;
    //console.info(`\nCheck results by file: ${JSON.stringify(byFile)}`)
    return {
        title: (_a = (checkName !== null && checkName !== void 0 ? checkName : name), (_a !== null && _a !== void 0 ? _a : "")),
        summary: (summary !== null && summary !== void 0 ? summary : `${counts.failure} failure(s) and ${counts.warning} warning(s) reported`),
        conclusion: counts.failure > 0 ? 'failure' : 'success',
        text: "",
        annotations: utility_1.flatten(Object.entries(byFile)
            .filter(kv => {
            const fileName = kv[0];
            //console.log(`\nParsed file name: ${fileName}`)
            return changedFiles === undefined || changedFiles.includes(fileName);
        })
            .map(kv => {
            const filePath = kv[0];
            // console.log(`Processing ${checkName} check file "${filePath}"`)
            const fileResult = kv[1];
            return fileResult.details.map(detail => {
                // console.log(`Processing "${checkName}" check\n\tfile "${filePath}"\n\tdetail "${JSON.stringify(detail)}"`)
                var _a, _b;
                return {
                    path: filePath.replace(`${process.env.GITHUB_WORKSPACE}/`, ''),
                    title: detail.title,
                    message: detail.message,
                    start_line: (_a = detail.startLine, (_a !== null && _a !== void 0 ? _a : 0)),
                    start_column: detail.startColumn,
                    end_line: (_b = detail.endLine, (_b !== null && _b !== void 0 ? _b : 0)),
                    end_column: detail.endColumn,
                    annotation_level: detail.category
                };
            });
        })),
    };
}
exports.parse = parse;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const pullRequest = github.context.payload.pull_request;
        const head_sha = pullRequest ? pullRequest.head.sha : github.context.sha;
        const owner = github.context.repo.owner;
        const repo = github.context.repo.repo;
        const githubToken = core.getInput('ghToken');
        const githubClient = new github.GitHub(githubToken);
        const BATCH_SIZE = 50;
        function getBaseInfo(opts) {
            return 'checkId' in opts
                ? { check_run_id: opts.checkId, owner, repo }
                : { name: opts.name, owner, repo, started_at: new Date().toISOString(), head_sha };
        }
        function getChangedFilesAsync(prNumber) {
            return __awaiter(this, void 0, void 0, function* () {
                const { data: prInfo } = yield githubClient.pulls.get({ owner, repo, number: prNumber });
                // eslint-disable-next-line fp/no-let
                let changedFiles = [];
                const fetchPerPage = 100;
                // eslint-disable-next-line fp/no-mutation, fp/no-let
                for (let pageIndex = 0; pageIndex * fetchPerPage < prInfo.changed_files; pageIndex++) {
                    const response = yield githubClient.pulls.listFiles({
                        owner,
                        repo,
                        number: prNumber,
                        page: pageIndex,
                        per_page: fetchPerPage,
                    });
                    // eslint-disable-next-line fp/no-mutation
                    changedFiles = changedFiles.concat(response.data.filter((f) => f.status !== "removed").map((f) => f.filename));
                }
                return changedFiles.map(fName => path.resolve(fName));
            });
        }
        function postCheckAsync(info) {
            return __awaiter(this, void 0, void 0, function* () {
                core.info(`Run Id ${JSON.stringify(info)}`);
                const { data: { id: checkId } } = 'check_run_id' in info
                    ? yield githubClient.checks.update(info)
                    : yield githubClient.checks.create(info);
                return checkId;
            });
        }
        try {
            const changedFiles = pullRequest ? yield getChangedFilesAsync(pullRequest.number) : undefined;
            //console.log(`changed files: ${changedFiles}`)
            for (const check of getChecksToReport()) {
                try {
                    if (check && check.name && check.fileName) {
                        const outputFilePath = path.resolve(check.fileName);
                        if (!fs.existsSync(outputFilePath)) {
                            core.warning(`Output file "${outputFilePath}" for the "${check.name}" check not found.`);
                            continue;
                        }
                        const file = fs.readFileSync(outputFilePath, 'utf8');
                        const { title, summary, conclusion, text, annotations: annotationsIterable } = parse(file, check.prChangesOnly ? changedFiles : undefined, check.name);
                        const annotations = [...annotationsIterable];
                        console.log(`\n${title} check annotations length: ${annotations.length}`);
                        if (conclusion !== "success") {
                            core.setFailed(`"${title}" check reported failures.`);
                        }
                        // core.info("This is a PR...")
                        const checkId = yield postCheckAsync(Object.assign(Object.assign({}, getBaseInfo(check)), { status: 'in_progress' }));
                        // console.log(`\nAnnotations: ${JSON.stringify([...annotations])}`)
                        const annotationBatches = [...utility_1.chunk(annotations, BATCH_SIZE)];
                        //console.log(`\nAnnotation Batches: ${JSON.stringify([...annotationBatches])}`)
                        const numBatches = annotationBatches.length;
                        console.log(`${check.name} check: number of batches = ${numBatches}`);
                        // eslint-disable-next-line fp/no-let
                        let batchIndex = 1;
                        for (const annotationBatch of utility_1.take(annotationBatches, numBatches - 1)) {
                            // eslint-disable-next-line fp/no-mutation
                            const batchMessage = `Processinggg annotations batch ${batchIndex++} of "${title}" check`;
                            core.info(batchMessage);
                            yield postCheckAsync(Object.assign(Object.assign({}, getBaseInfo({ checkId })), { status: 'in_progress', output: { title, summary: batchMessage, annotations: annotationBatch } }));
                        }
                        core.info(`Postinggg annotations completions for "${title}" check`);
                        const checkObj = Object.assign(Object.assign({}, getBaseInfo({ checkId })), { status: 'completed', conclusion, completed_at: new Date().toISOString(), output: { title, summary, text, annotations: utility_1.last(annotationBatches) } });
                        core.info(`test:  ${JSON.stringify(checkObj)}`);
                        yield postCheckAsync(checkObj);
                        /*if (push) {
                            core.info(`Processing last batch of "${title}" check`)
                            await postCheckAsync({
                                ...getBaseInfo({ name: check.name }),
                                ...getBaseInfo({ checkId }),
                                status: 'completed',
                                conclusion,
                                completed_at: new Date().toISOString(),
                                output: { title, summary, text }
                                output: { title, summary, text, annotations: last(annotationBatches) }
                            })
                        }*/
                    }
                }
                catch (e) {
                    const msg = `Error processing requested check "${check.name}"\n\t${'stack' in e ? e.stack : 'message' in e ? e.message : String(e)}\n`;
                    core.error(msg);
                    core.setFailed(msg);
                }
            }
        }
        catch (err) {
            core.setFailed(err.message ? err.message : 'Error creating checks');
        }
    });
}
exports.run = run;
