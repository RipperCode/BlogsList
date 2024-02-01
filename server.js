/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json())
const blogRouter = require('./controllers/blogsC')

require('dotenv').config()
const PORT = process.env.PORT

app.use('/api/blogs', blogRouter)

app.get('/', (req, res) => {
	res.send('Hello remote world!\n');
});

app.listen(PORT)