export function walk(tree, cb) {
  const f = (node) => {
    if (Array.isArray(node)) {
      for (const n of node) {
        const res = f(n);
        // end iteration if callback returns false
        if (res === false) {
          return false;
        }
      }
    } else if (node instanceof Object) {
      const res = cb(node);
      if (res !== undefined) {
        return res;
      }
      // scan sub-nodes if callback doesn't return anything
      f(Object.values(node));
    }
  };
  f(tree);
}

export function find(tree, classes, recursive = false) {
  if (!Array.isArray(classes)) {
    classes = [ classes ];
  }
  const list = [];
  walk(tree, (node) => {
    if (classes.some(c => node instanceof c)) {
      list.push(node);
      if (!recursive) {
        return true;
      }
    }
  });
  return list;
}
