/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';
const http = require('http')
const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT

const server = http.createServer(app)

server.listen(PORT)