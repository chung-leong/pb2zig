import { expect } from 'chai';

import { walk } from '../src/utils.js';

describe('Utilities', function() {
  describe('walk', function() {
    it('should scan through all items when callback returns nothing', function() {
      let last = 0;
      walk([ 1, 2, 3 ], (v) => {
        last = v;
      });
      expect(last).to.equal(3);
      walk([ { a: 1 }, { a: 2 } ], (v) => {
        last = v;
      });
      expect(last).to.equal(2);
    })
    it('should stop when callback returns false', function() {
      let last = 0;
      walk([ 1, 2, 3 ], (v) => {
        last = v;
        return false;
      });
      expect(last).to.equal(1);
      walk([ { a: 1 }, { a: 2 } ], (v) => {
        last = v;
        if (typeof(v) === 'number') {
          return false;
        }
      });
      expect(last).to.equal(1);
    })
  })
})
