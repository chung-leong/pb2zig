export function walk(tree, cb) {
  const f = (node, key, parent) => {
    if (Array.isArray(node)) {
      for (const [ key, child ] of node.entries()) {
        const res = f(child, key, node);
        // end iteration if callback returns false
        if (res === false) {
          return false;
        }
      }
    } else if (node instanceof Object) {
      const res = cb(node, key, parent);
      if (res !== undefined) {
        return res;
      }
      if (parent && node !== parent[key]) {
        // object has been swapped out--scan the new object instead
        return f(parent[key], key, parent);
      }
      // scan sub-nodes if callback doesn't return anything
      for (const [ key, child ] of Object.entries(node)) {
        const res = f(child, key, node);
        if (res === false) {
          return false;
        }
      }
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

export function map(object, cb) {
  const result = {};
  for (const [ name, value ] of Object.entries(object)) {
    const newValue = cb(value, name);
    if (newValue !== undefined) {
      result[name] = newValue;
    }
  }
  return result;
}
