/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

const express = require('express');
require('dotenv').config()

const PORT = process.env.PORT

const app = express();
app.get('/', (req, res) => {
	res.send('Hello remote world!\n');
});
app.listen(PORT)