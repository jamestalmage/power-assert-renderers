/**
 * power-assert-renderers.js - Power Assert output renderers
 *
 * https://github.com/twada/power-assert-renderers
 *
 * Copyright (c) 2015 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/twada/power-assert-renderers/blob/master/MIT-LICENSE.txt
 */

'use strict';

var legacyPaths = {};

module.exports = {
    FileRenderer: legacy('file', require('./lib/file')),
    AssertionRenderer: legacy('assertion', require('./lib/assertion')),
    DiagramRenderer: legacy('diagram', require('./lib/diagram')),
    BinaryExpressionRenderer: legacy('binary-expression', require('./lib/binary-expression')),
    SuccinctRenderer: legacy('succinct-diagram', require('./lib/succinct-diagram'))
};

function legacy(path, val) {
    return legacyPaths['./built-in/' + path] = val;
}

module.exports.lookup = function (path) {
    if (typeof path === 'string') {
        return legacyPaths[path] || require(path);
    }
    return path;
};
