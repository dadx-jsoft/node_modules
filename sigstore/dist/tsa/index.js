"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSAClient = void 0;
/*
Copyright 2022 The Sigstore Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const error_1 = require("../error");
const external_1 = require("../external");
const util_1 = require("../util");
class TSAClient {
    constructor(options) {
        this.tsa = new external_1.TimestampAuthority({
            baseURL: options.tsaBaseURL,
            retry: options.retry,
            timeout: options.timeout,
        });
    }
    async createTimestamp(signature) {
        const request = {
            artifactHash: util_1.crypto.hash(signature).toString('base64'),
            hashAlgorithm: 'sha256',
        };
        try {
            return await this.tsa.createTimestamp(request);
        }
        catch (err) {
            throw new error_1.InternalError({
                code: 'TSA_CREATE_TIMESTAMP_ERROR',
                message: 'error creating timestamp',
                cause: err,
            });
        }
    }
}
exports.TSAClient = TSAClient;
