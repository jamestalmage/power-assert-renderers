import test from 'ava';
import baseAssert from 'assert';
import renderers, {lookup} from '../index';

test('lookup()', t => {
  t.ok(lookup('./built-in/assertion') === renderers.AssertionRenderer);
  t.ok(lookup('./built-in/binary-expression') === renderers.BinaryExpressionRenderer);
  t.ok(lookup('./built-in/diagram') === renderers.DiagramRenderer);
  t.ok(lookup('./built-in/file') === renderers.FileRenderer);
  t.ok(lookup('./built-in/succinct-diagram') === renderers.SuccinctRenderer);
  t.end();
});
