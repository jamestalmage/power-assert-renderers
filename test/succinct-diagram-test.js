import test from 'ava';
import baseAssert from 'assert';
import espowerSource from 'espower-source';
import empower from 'empower';
import formatter from 'power-assert-formatter';
import SuccinctRenderer from '../lib/succinct-diagram';

function weave (line, options) {
    var filepath = '/absolute/path/to/project/test/some_test.js';
    var sourceRoot = '/absolute/path/to/project';
    return espowerSource(line, filepath, {sourceRoot: sourceRoot});
}

function runTest (t, expected, body) {
    try {
        body();
        t.fail('AssertionError is not thrown');
    } catch (e) {
        t.is(e.message, expected);
        t.is(e.name, 'AssertionError');
    }
    t.end();
}

const options = {
    renderers: [
        './built-in/assertion',
        SuccinctRenderer
    ]
};
const assert = empower(baseAssert, formatter(options));


test('BinaryExpression of Identifier', t => {
    const expected =
`  
  assert.ok(hoge === fuga)
            |        |    
            "foo"    "bar"
  `;
    runTest(t, expected, () => {
        const hoge = 'foo';
        const fuga = 'bar';
        eval(weave('assert.ok(hoge === fuga);'));
    });
});


test('BinaryExpression of MemberExpression', t => {
    const expected =
`  
  assert.ok(en.foo === fr.toto)
               |          |    
               "bar"      "tata"
  `;
    runTest(t, expected, () => {
        const en = { foo: 'bar', toto: 'tata' };
        const fr = { toto: 'tata'};
        eval(weave('assert.ok(en.foo === fr.toto);'));
    });
});


test('BinaryExpression of CallExpression', t => {
    const expected =
`  
  assert.ok(en.foo() === fr.toto())
               |            |      
               "bar"        "tata" 
  `;
    runTest(t, expected, () => {
        const en = { foo: () => 'bar' };
        const fr = { toto: () => 'tata' };
        eval(weave('assert.ok(en.foo() === fr.toto());'));
    });
});


test('MemberExpression', t => {
    const expected =
`  
  assert.ok(en.foo)
               |   
               false
  `;
    runTest(t, expected, () => {
        const en = { foo: false };
        eval(weave('assert.ok(en.foo);'));
    });
});


test('deep MemberExpression', t => {
    const expected =
`  
  assert.ok(en.foo.bar)
                   |   
                   false
  `;
    runTest(t, expected, () => {
        const en = { foo: { bar: false } };
        eval(weave('assert.ok(en.foo.bar);'));
    });
});
