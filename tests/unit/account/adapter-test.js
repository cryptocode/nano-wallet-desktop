import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:account', 'Unit | Adapter | account', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
  needs: ['service:rpc'],
});

// Replace this with your real tests.
test('it exists', function (assert) {
  const adapter = this.subject();
  assert.ok(adapter);
});