import {
  finalizeStructures,
  linkModule,
  usePrimitive,
  useArray,
  usePointer,
  useVector,
  useStruct,
  useSlice,
  useEnumeration,
  useErrorSet,
  useErrorUnion,
  useArgStruct,
  useUint,
  useObject,
  useInt,
  useFloat,
  useType,
  useBool,
  useEnumerationItem,
} from "zigar-runtime";

// activate features
usePrimitive();
useArray();
usePointer();
useVector();
useStruct();
useSlice();
useEnumeration();
useErrorSet();
useErrorUnion();
useArgStruct();
useUint();
useObject();
useInt();
useFloat();
useType();
useBool();
useEnumerationItem();

// define structures
const s = {
  constructor: null,
  typedArray: null,
  type: 0,
  name: undefined,
  byteSize: 4,
  align: 2,
  isConst: false,
  hasPointer: false,
  instance: {
    members: [],
    methods: [],
    template: null
  },
  static: {
    members: [],
    methods: [],
    template: null
  },
  options: {"runtimeSafety":false},
};
const m = {
  type: 0,
  isRequired: false,
  bitSize: 32,
  byteSize: 4,
};
const s0 = {}, s1 = {}, s2 = {}, s3 = {}, s4 = {}, s5 = {}, s6 = {}, s7 = {}, s8 = {}, s9 = {};
const s10 = {}, s11 = {}, s12 = {}, s13 = {}, s14 = {}, s15 = {}, s16 = {}, s17 = {}, s18 = {}, s19 = {};
const s20 = {}, s21 = {}, s22 = {}, s23 = {}, s24 = {}, s25 = {}, s26 = {}, s27 = {}, s28 = {}, s29 = {};
const s30 = {}, s31 = {}, s32 = {}, s33 = {}, s34 = {}, s35 = {}, s36 = {}, s37 = {}, s38 = {}, s39 = {};
const s40 = {}, s41 = {}, s42 = {}, s43 = {}, s44 = {}, s45 = {}, s46 = {}, s47 = {}, s48 = {}, s49 = {};
const s50 = {}, s51 = {}, s52 = {}, s53 = {}, s54 = {}, s55 = {}, s56 = {}, s57 = {}, s58 = {}, s59 = {};
const s60 = {}, s61 = {};
Object.assign(s0, {
  ...s,
  name: "u8",
  length: 1,
  byteSize: 1,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        bitSize: 8,
        byteSize: 1,
        structure: s0,
      },
    ],
    methods: [],
    template: null
  },
  slot: 5,
});
Object.assign(s1, {
  ...s,
  type: 1,
  name: "[14:0]u8",
  length: 14,
  byteSize: 15,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitSize: 8,
        byteSize: 1,
        structure: s0,
      },
    ],
    methods: [],
    template: null
  },
  slot: 4,
});
Object.assign(s2, {
  ...s,
  type: 11,
  name: "*const [14:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s1,
      },
    ],
    methods: [],
    template: null
  },
  slot: 3,
});
Object.assign(s3, {
  ...s,
  type: 11,
  name: "*const *const [14:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s2,
      },
    ],
    methods: [],
    template: null
  },
  slot: 2,
});
Object.assign(s4, {
  ...s,
  type: 1,
  name: "[11:0]u8",
  length: 11,
  byteSize: 12,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitSize: 8,
        byteSize: 1,
        structure: s0,
      },
    ],
    methods: [],
    template: null
  },
  slot: 8,
});
Object.assign(s5, {
  ...s,
  type: 11,
  name: "*const [11:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s4,
      },
    ],
    methods: [],
    template: null
  },
  slot: 7,
});
Object.assign(s6, {
  ...s,
  type: 11,
  name: "*const *const [11:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s5,
      },
    ],
    methods: [],
    template: null
  },
  slot: 6,
});
Object.assign(s7, {
  ...s,
  name: "i32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 2,
        bitOffset: 0,
        structure: s7,
      },
    ],
    methods: [],
    template: null
  },
  slot: 10,
});
Object.assign(s8, {
  ...s,
  type: 11,
  name: "*const i32",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s7,
      },
    ],
    methods: [],
    template: null
  },
  slot: 9,
});
Object.assign(s9, {
  ...s,
  name: "f32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 0,
        structure: s9,
      },
    ],
    methods: [],
    template: null
  },
  slot: 42,
});
Object.assign(s10, {
  ...s,
  type: 13,
  name: "@Vector(3, f32)",
  length: 3,
  byteSize: 16,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        structure: s9,
      },
    ],
    methods: [],
    template: null
  },
  slot: 31,
});
Object.assign(s11, {
  ...s,
  type: 1,
  name: "[3]@Vector(3, f32)",
  length: 3,
  byteSize: 48,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitSize: 96,
        byteSize: 16,
        structure: s10,
      },
    ],
    methods: [],
    template: null
  },
  slot: 30,
});
Object.assign(s12, {
  ...s,
  name: "f64",
  length: 1,
  byteSize: 8,
  align: 3,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 0,
        bitSize: 64,
        byteSize: 8,
        structure: s12,
      },
    ],
    methods: [],
    template: null
  },
  slot: 60,
});
Object.assign(s13, {
  ...s,
  type: 11,
  name: "*const f64",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s12,
      },
    ],
    methods: [],
    template: null
  },
  slot: 59,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 104, 30, 16, 0 ]);
const a2 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 191 ]);
const a3 = new Uint8Array([ 104, 30, 16, 0 ]);
const a4 = new Uint8Array([ 104, 30, 16, 0 ]);
Object.assign(s14, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "0",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s13,
      },
    ],
    methods: [],
    template: {
      memory: { array: a0 },
      slots: {
        0: {
          structure: s13,
          memory: { array: a1 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a2 },
              address: 1056360,
            },
          },
        },
        1: {
          structure: s13,
          memory: { array: a3 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a2 },
              address: 1056360,
            },
          },
        },
        2: {
          structure: s13,
          memory: { array: a4 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a2 },
              address: 1056360,
            },
          },
        },
      },
    },
  },
  slot: 50,
});
Object.assign(s15, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s14,
      },
    ],
    methods: [],
    template: null
  },
  slot: 49,
});
const a5 = new Uint8Array([  ]);
const a6 = new Uint8Array([ 170, 170, 170, 170 ]);
const a7 = new Uint8Array([  ]);
const a8 = new Uint8Array([ 170, 170, 170, 170 ]);
const a9 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s16, {
  ...s,
  type: 2,
  name: "struct{comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "0",
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s15,
      },
    ],
    methods: [],
    template: {
      memory: { array: a5 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a6 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a8 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s15,
          memory: { array: a9 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 44,
});
Object.assign(s17, {
  ...s,
  type: 11,
  name: "*const struct{comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s16,
      },
    ],
    methods: [],
    template: null
  },
  slot: 43,
});
const a10 = new Uint8Array([  ]);
const a11 = new Uint8Array([ 80, 30, 16, 0 ]);
const a12 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a13 = new Uint8Array([ 80, 30, 16, 0 ]);
const a14 = new Uint8Array([ 80, 30, 16, 0 ]);
Object.assign(s18, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "0",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s13,
      },
    ],
    methods: [],
    template: {
      memory: { array: a10 },
      slots: {
        0: {
          structure: s13,
          memory: { array: a11 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a12 },
              address: 1056336,
            },
          },
        },
        1: {
          structure: s13,
          memory: { array: a13 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a12 },
              address: 1056336,
            },
          },
        },
        2: {
          structure: s13,
          memory: { array: a14 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a12 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 52,
});
Object.assign(s19, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s18,
      },
    ],
    methods: [],
    template: null
  },
  slot: 51,
});
const a15 = new Uint8Array([  ]);
const a16 = new Uint8Array([ 170, 170, 170, 170 ]);
const a17 = new Uint8Array([ 170, 170, 170, 170 ]);
const a18 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s20, {
  ...s,
  type: 2,
  name: "struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "0",
        structure: s19,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s19,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s19,
      },
    ],
    methods: [],
    template: {
      memory: { array: a15 },
      slots: {
        0: {
          structure: s19,
          memory: { array: a16 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s19,
          memory: { array: a17 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s19,
          memory: { array: a18 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 46,
});
Object.assign(s21, {
  ...s,
  type: 11,
  name: "*const struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s20,
      },
    ],
    methods: [],
    template: null
  },
  slot: 45,
});
const a19 = new Uint8Array([  ]);
const a20 = new Uint8Array([ 96, 30, 16, 0 ]);
const a21 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 224, 63 ]);
const a22 = new Uint8Array([ 88, 30, 16, 0 ]);
const a23 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a24 = new Uint8Array([ 88, 30, 16, 0 ]);
Object.assign(s22, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.5, comptime comptime_float = 0, comptime comptime_float = 0}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "0",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s13,
      },
    ],
    methods: [],
    template: {
      memory: { array: a19 },
      slots: {
        0: {
          structure: s13,
          memory: { array: a20 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a21 },
              address: 1056352,
            },
          },
        },
        1: {
          structure: s13,
          memory: { array: a22 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a23 },
              address: 1056344,
            },
          },
        },
        2: {
          structure: s13,
          memory: { array: a24 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a23 },
              address: 1056344,
            },
          },
        },
      },
    },
  },
  slot: 54,
});
Object.assign(s23, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.5, comptime comptime_float = 0, comptime comptime_float = 0}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s22,
      },
    ],
    methods: [],
    template: null
  },
  slot: 53,
});
const a25 = new Uint8Array([  ]);
const a26 = new Uint8Array([ 56, 30, 16, 0 ]);
const a27 = new Uint8Array([ 51, 51, 51, 51, 51, 51, 211, 63 ]);
const a28 = new Uint8Array([ 80, 30, 16, 0 ]);
const a29 = new Uint8Array([ 72, 30, 16, 0 ]);
const a30 = new Uint8Array([ 102, 102, 102, 102, 102, 102, 230, 63 ]);
Object.assign(s24, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.3, comptime comptime_float = 1, comptime comptime_float = 0.7}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "0",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s13,
      },
    ],
    methods: [],
    template: {
      memory: { array: a25 },
      slots: {
        0: {
          structure: s13,
          memory: { array: a26 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a27 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s13,
          memory: { array: a28 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a12 },
              address: 1056336,
            },
          },
        },
        2: {
          structure: s13,
          memory: { array: a29 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a30 },
              address: 1056328,
            },
          },
        },
      },
    },
  },
  slot: 56,
});
Object.assign(s25, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.3, comptime comptime_float = 1, comptime comptime_float = 0.7}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s24,
      },
    ],
    methods: [],
    template: null
  },
  slot: 55,
});
const a31 = new Uint8Array([  ]);
const a32 = new Uint8Array([ 64, 30, 16, 0 ]);
const a33 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 185, 63 ]);
const a34 = new Uint8Array([ 56, 30, 16, 0 ]);
const a35 = new Uint8Array([ 48, 30, 16, 0 ]);
const a36 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 233, 63 ]);
Object.assign(s26, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.1, comptime comptime_float = 0.3, comptime comptime_float = 0.8}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "0",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s13,
      },
    ],
    methods: [],
    template: {
      memory: { array: a31 },
      slots: {
        0: {
          structure: s13,
          memory: { array: a32 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a33 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s13,
          memory: { array: a34 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a27 },
              address: 1056312,
            },
          },
        },
        2: {
          structure: s13,
          memory: { array: a35 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a36 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 58,
});
Object.assign(s27, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.1, comptime comptime_float = 0.3, comptime comptime_float = 0.8}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s26,
      },
    ],
    methods: [],
    template: null
  },
  slot: 57,
});
const a37 = new Uint8Array([  ]);
const a38 = new Uint8Array([ 170, 170, 170, 170 ]);
const a39 = new Uint8Array([ 170, 170, 170, 170 ]);
const a40 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s28, {
  ...s,
  type: 2,
  name: "struct{comptime struct{comptime comptime_float = 0.5, comptime comptime_float = 0, comptime comptime_float = 0} = .{0.5, 0, 0}, comptime struct{comptime comptime_float = 0.3, comptime comptime_float = 1, comptime comptime_float = 0.7} = .{0.3, 1, 0.7}, comptime struct{comptime comptime_float = 0.1, comptime comptime_float = 0.3, comptime comptime_float = 0.8} = .{0.1, 0.3, 0.8}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "0",
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s25,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s27,
      },
    ],
    methods: [],
    template: {
      memory: { array: a37 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a38 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s25,
          memory: { array: a39 },
          slots: {
            0: {
              structure: s24,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a40 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 48,
});
Object.assign(s29, {
  ...s,
  type: 11,
  name: "*const struct{comptime struct{comptime comptime_float = 0.5, comptime comptime_float = 0, comptime comptime_float = 0} = .{0.5, 0, 0}, comptime struct{comptime comptime_float = 0.3, comptime comptime_float = 1, comptime comptime_float = 0.7} = .{0.3, 1, 0.7}, comptime struct{comptime comptime_float = 0.1, comptime comptime_float = 0.3, comptime comptime_float = 0.8} = .{0.1, 0.3, 0.8}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s28,
      },
    ],
    methods: [],
    template: null
  },
  slot: 47,
});
const a41 = new Uint8Array([  ]);
const a42 = new Uint8Array([ 170, 170, 170, 170 ]);
const a43 = new Uint8Array([ 170, 170, 170, 170 ]);
const a44 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s30, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = [3]@Vector(3, f32), comptime minValue: struct{comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}} = .{.{-1, -1, -1}, .{-1, -1, -1}, .{-1, -1, -1}}, comptime maxValue: struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}} = .{.{1, 1, 1}, .{1, 1, 1}, .{1, 1, 1}}, comptime defaultValue: struct{comptime struct{comptime comptime_float = 0.5, comptime comptime_float = 0, comptime comptime_float = 0} = .{0.5, 0, 0}, comptime struct{comptime comptime_float = 0.3, comptime comptime_float = 1, comptime comptime_float = 0.7} = .{0.3, 1, 0.7}, comptime struct{comptime comptime_float = 0.1, comptime comptime_float = 0.3, comptime comptime_float = 0.8} = .{0.1, 0.3, 0.8}} = .{.{0.5, 0, 0}, .{0.3, 1, 0.7}, .{0.1, 0.3, 0.8}}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s17,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s29,
      },
    ],
    methods: [],
    template: {
      memory: { array: a41 },
      slots: {
        0: {
          structure: s17,
          memory: { array: a42 },
          slots: {
            0: {
              structure: s16,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a43 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s29,
          memory: { array: a44 },
          slots: {
            0: {
              structure: s28,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 37,
});
Object.assign(s31, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = [3]@Vector(3, f32), comptime minValue: struct{comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}} = .{.{-1, -1, -1}, .{-1, -1, -1}, .{-1, -1, -1}}, comptime maxValue: struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}} = .{.{1, 1, 1}, .{1, 1, 1}, .{1, 1, 1}}, comptime defaultValue: struct{comptime struct{comptime comptime_float = 0.5, comptime comptime_float = 0, comptime comptime_float = 0} = .{0.5, 0, 0}, comptime struct{comptime comptime_float = 0.3, comptime comptime_float = 1, comptime comptime_float = 0.7} = .{0.3, 1, 0.7}, comptime struct{comptime comptime_float = 0.1, comptime comptime_float = 0.3, comptime comptime_float = 0.8} = .{0.1, 0.3, 0.8}} = .{.{0.5, 0, 0}, .{0.3, 1, 0.7}, .{0.1, 0.3, 0.8}}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s30,
      },
    ],
    methods: [],
    template: null
  },
  slot: 36,
});
const a45 = new Uint8Array([  ]);
const a46 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s32, {
  ...s,
  type: 2,
  name: "struct{comptime transform: struct{comptime type: type = [3]@Vector(3, f32), comptime minValue: struct{comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}} = .{.{-1, -1, -1}, .{-1, -1, -1}, .{-1, -1, -1}}, comptime maxValue: struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}} = .{.{1, 1, 1}, .{1, 1, 1}, .{1, 1, 1}}, comptime defaultValue: struct{comptime struct{comptime comptime_float = 0.5, comptime comptime_float = 0, comptime comptime_float = 0} = .{0.5, 0, 0}, comptime struct{comptime comptime_float = 0.3, comptime comptime_float = 1, comptime comptime_float = 0.7} = .{0.3, 1, 0.7}, comptime struct{comptime comptime_float = 0.1, comptime comptime_float = 0.3, comptime comptime_float = 0.8} = .{0.1, 0.3, 0.8}} = .{.{0.5, 0, 0}, .{0.3, 1, 0.7}, .{0.1, 0.3, 0.8}}} = .{.type = [3]@Vector(3, f32), .minValue = .{.{-1, -1, -1}, .{-1, -1, -1}, .{-1, -1, -1}}, .maxValue = .{.{1, 1, 1}, .{1, 1, 1}, .{1, 1, 1}}, .defaultValue = .{.{0.5, 0, 0}, .{0.3, 1, 0.7}, .{0.1, 0.3, 0.8}}}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "transform",
        structure: s31,
      },
    ],
    methods: [],
    template: {
      memory: { array: a45 },
      slots: {
        0: {
          structure: s31,
          memory: { array: a46 },
          slots: {
            0: {
              structure: s30,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 12,
});
Object.assign(s33, {
  ...s,
  type: 11,
  name: "*const struct{comptime transform: struct{comptime type: type = [3]@Vector(3, f32), comptime minValue: struct{comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1, -1}} = .{.{-1, -1, -1}, .{-1, -1, -1}, .{-1, -1, -1}}, comptime maxValue: struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}} = .{.{1, 1, 1}, .{1, 1, 1}, .{1, 1, 1}}, comptime defaultValue: struct{comptime struct{comptime comptime_float = 0.5, comptime comptime_float = 0, comptime comptime_float = 0} = .{0.5, 0, 0}, comptime struct{comptime comptime_float = 0.3, comptime comptime_float = 1, comptime comptime_float = 0.7} = .{0.3, 1, 0.7}, comptime struct{comptime comptime_float = 0.1, comptime comptime_float = 0.3, comptime comptime_float = 0.8} = .{0.1, 0.3, 0.8}} = .{.{0.5, 0, 0}, .{0.3, 1, 0.7}, .{0.1, 0.3, 0.8}}} = .{.type = [3]@Vector(3, f32), .minValue = .{.{-1, -1, -1}, .{-1, -1, -1}, .{-1, -1, -1}}, .maxValue = .{.{1, 1, 1}, .{1, 1, 1}, .{1, 1, 1}}, .defaultValue = .{.{0.5, 0, 0}, .{0.3, 1, 0.7}, .{0.1, 0.3, 0.8}}}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s32,
      },
    ],
    methods: [],
    template: null
  },
  slot: 11,
});
const a47 = new Uint8Array([  ]);
const a48 = new Uint8Array([ 112, 30, 16, 0 ]);
const a49 = new Uint8Array([ 3, 0, 0, 0 ]);
Object.assign(s34, {
  ...s,
  type: 2,
  name: "struct{comptime channels: comptime_int = 3}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "channels",
        structure: s8,
      },
    ],
    methods: [],
    template: {
      memory: { array: a47 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a48 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a49 },
              address: 1056368,
            },
          },
        },
      },
    },
  },
  slot: 39,
});
Object.assign(s35, {
  ...s,
  type: 11,
  name: "*const struct{comptime channels: comptime_int = 3}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s34,
      },
    ],
    methods: [],
    template: null
  },
  slot: 38,
});
const a50 = new Uint8Array([  ]);
const a51 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s36, {
  ...s,
  type: 2,
  name: "struct{comptime src: struct{comptime channels: comptime_int = 3} = .{.channels = 3}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "src",
        structure: s35,
      },
    ],
    methods: [],
    template: {
      memory: { array: a50 },
      slots: {
        0: {
          structure: s35,
          memory: { array: a51 },
          slots: {
            0: {
              structure: s34,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 14,
});
Object.assign(s37, {
  ...s,
  type: 11,
  name: "*const struct{comptime src: struct{comptime channels: comptime_int = 3} = .{.channels = 3}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s36,
      },
    ],
    methods: [],
    template: null
  },
  slot: 13,
});
const a52 = new Uint8Array([  ]);
const a53 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s38, {
  ...s,
  type: 2,
  name: "struct{comptime dst: struct{comptime channels: comptime_int = 3} = .{.channels = 3}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "dst",
        structure: s35,
      },
    ],
    methods: [],
    template: {
      memory: { array: a52 },
      slots: {
        0: {
          structure: s35,
          memory: { array: a53 },
          slots: {
            0: {
              structure: s34,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 16,
});
Object.assign(s39, {
  ...s,
  type: 11,
  name: "*const struct{comptime dst: struct{comptime channels: comptime_int = 3} = .{.channels = 3}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s38,
      },
    ],
    methods: [],
    template: null
  },
  slot: 15,
});
const a54 = new Uint8Array([  ]);
const a55 = new Uint8Array([  ]);
const a56 = new Uint8Array([ 240, 73, 16, 0 ]);
const a57 = new Uint8Array([ 122, 73, 16, 0 ]);
const a58 = new Uint8Array([ 89, 111, 117, 114, 32, 78, 97, 109, 101, 115, 112, 97, 99, 101, 0 ]);
const a59 = new Uint8Array([ 236, 73, 16, 0 ]);
const a60 = new Uint8Array([ 100, 73, 16, 0 ]);
const a61 = new Uint8Array([ 89, 111, 117, 114, 32, 86, 101, 110, 100, 111, 114, 0 ]);
const a62 = new Uint8Array([ 232, 73, 16, 0 ]);
const a63 = new Uint8Array([ 1, 0, 0, 0 ]);
const a64 = new Uint8Array([ 170, 170, 170, 170 ]);
const a65 = new Uint8Array([ 170, 170, 170, 170 ]);
const a66 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s40, {
  ...s,
  type: 2,
  name: "simple.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a54 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        name: "namespace",
        structure: s3,
      },
      {
        ...m,
        type: 6,
        slot: 1,
        name: "vendor",
        structure: s6,
      },
      {
        ...m,
        type: 6,
        slot: 2,
        name: "version",
        structure: s8,
      },
      {
        ...m,
        type: 6,
        slot: 3,
        name: "parameters",
        structure: s33,
      },
      {
        ...m,
        type: 6,
        slot: 4,
        name: "inputImages",
        structure: s37,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "outputImages",
        structure: s39,
      },
    ],
    methods: [],
    template: {
      memory: { array: a55 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a56 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a57 },
              address: 1067504,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a58 },
                  address: 1067386,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a59 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a60 },
              address: 1067500,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a61 },
                  address: 1067364,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a62 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a63 },
              address: 1067496,
            },
          },
        },
        3: {
          structure: s33,
          memory: { array: a64 },
          slots: {
            0: {
              structure: s32,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s37,
          memory: { array: a65 },
          slots: {
            0: {
              structure: s36,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s39,
          memory: { array: a66 },
          slots: {
            0: {
              structure: s38,
              memory: { array: a7 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
Object.assign(s41, {
  ...s,
  type: 13,
  name: "@Vector(4, u8)",
  length: 4,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitSize: 8,
        byteSize: 1,
        structure: s0,
      },
    ],
    methods: [],
    template: null
  },
  slot: 21,
});
Object.assign(s42, {
  ...s,
  type: 12,
  name: "[_]const @Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s41,
      },
    ],
    methods: [],
    template: null
  },
  slot: 20,
});
Object.assign(s43, {
  ...s,
  type: 11,
  name: "[]const @Vector(4, u8)",
  length: 1,
  byteSize: 8,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        structure: s42,
      },
    ],
    methods: [],
    template: null
  },
  slot: 19,
});
Object.assign(s44, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s44,
      },
    ],
    methods: [],
    template: null
  },
  slot: 22,
});
const a67 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s45, {
  ...s,
  type: 9,
  name: "simple.ColorSpace",
  length: 1,
  byteSize: 1,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 2,
        name: "srgb",
        structure: s7,
      },
      {
        ...m,
        type: 2,
        name: "display-p3",
        structure: s7,
      },
    ],
    methods: [],
    template: {
      memory: { array: a67 },
    },
  },
  slot: 23,
});
Object.assign(s46, {
  ...s,
  name: "bool",
  length: 1,
  byteSize: 1,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 1,
        bitOffset: 0,
        bitSize: 1,
        byteSize: 1,
        structure: s46,
      },
    ],
    methods: [],
    template: null
  },
  slot: 24,
});
Object.assign(s47, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s47,
      },
    ],
    methods: [],
    template: null
  },
  slot: 25,
});
const a68 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a69 = new Uint8Array([  ]);
const a70 = new Uint8Array([ 112, 30, 16, 0 ]);
Object.assign(s48, {
  ...s,
  type: 2,
  name: "simple.Image(u8,3,false)",
  length: 1,
  byteSize: 24,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        name: "data",
        structure: s43,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s44,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s44,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s45,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s46,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s47,
      },
    ],
    methods: [],
    template: {
      memory: { array: a68 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s41,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s10,
      },
      {
        ...m,
        type: 6,
        slot: 0,
        name: "channels",
        structure: s8,
      },
    ],
    methods: [],
    template: {
      memory: { array: a69 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a70 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a49 },
              address: 1056368,
            },
          },
        },
      },
    },
  },
  slot: 18,
});
const a71 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a72 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a73 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a74 = new Uint8Array([  ]);
Object.assign(s49, {
  ...s,
  type: 2,
  name: "simple.KernelInput(u8,simple.kernel)",
  length: 1,
  byteSize: 24,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 192,
        byteSize: 24,
        slot: 0,
        name: "src",
        structure: s48,
      },
    ],
    methods: [],
    template: {
      memory: { array: a71 },
      slots: {
        0: {
          structure: s48,
          memory: { array: a72 },
          slots: {
            0: {
              structure: s43,
              memory: { array: a73 },
              slots: {
                0: {
                  structure: s42,
                  memory: { array: a74 },
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 17,
});
Object.assign(s50, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s41,
      },
    ],
    methods: [],
    template: null
  },
  slot: 20,
});
Object.assign(s51, {
  ...s,
  type: 11,
  name: "[]@Vector(4, u8)",
  length: 1,
  byteSize: 8,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        structure: s50,
      },
    ],
    methods: [],
    template: null
  },
  slot: 28,
});
const a75 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a76 = new Uint8Array([  ]);
const a77 = new Uint8Array([ 112, 30, 16, 0 ]);
Object.assign(s52, {
  ...s,
  type: 2,
  name: "simple.Image(u8,3,true)",
  length: 1,
  byteSize: 24,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        name: "data",
        structure: s51,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s44,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s44,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s45,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s46,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s47,
      },
    ],
    methods: [],
    template: {
      memory: { array: a75 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s41,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s10,
      },
      {
        ...m,
        type: 6,
        slot: 0,
        name: "channels",
        structure: s8,
      },
    ],
    methods: [],
    template: {
      memory: { array: a76 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a77 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a49 },
              address: 1056368,
            },
          },
        },
      },
    },
  },
  slot: 27,
});
const a78 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a79 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a80 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s53, {
  ...s,
  type: 2,
  name: "simple.KernelOutput(u8,simple.kernel)",
  length: 1,
  byteSize: 24,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 192,
        byteSize: 24,
        slot: 0,
        name: "dst",
        structure: s52,
      },
    ],
    methods: [],
    template: {
      memory: { array: a78 },
      slots: {
        0: {
          structure: s52,
          memory: { array: a79 },
          slots: {
            0: {
              structure: s51,
              memory: { array: a80 },
              slots: {
                0: {
                  structure: s50,
                  memory: { array: a74 },
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 26,
});
const a81 = new Uint8Array([ 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 153, 153, 62, 0, 0, 128, 63, 51, 51, 51, 63, 0, 0, 0, 0, 205, 204, 204, 61, 154, 153, 153, 62, 205, 204, 76, 63, 0, 0, 0, 0 ]);
Object.assign(s54, {
  ...s,
  type: 2,
  name: "simple.KernelParameters(simple.kernel)",
  length: 1,
  byteSize: 48,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 352,
        byteSize: 48,
        slot: 0,
        name: "transform",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a81 },
    },
  },
  slot: 29,
});
Object.assign(s55, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(simple.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
  length: 1,
  byteSize: 2,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 22,
        name: "OutOfMemory",
      },
    ],
    methods: [],
    template: null
  },
  slot: 40,
});
Object.assign(s56, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(simple.createOutput)).Fn.return_type.?).ErrorUnion.error_set!simple.KernelOutput(u8,simple.kernel)",
  length: 1,
  byteSize: 28,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 192,
        byteSize: 24,
        slot: 0,
        name: "value",
        structure: s53,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s55,
      },
    ],
    methods: [],
    template: null
  },
  slot: 34,
});
Object.assign(s57, {
  ...s,
  type: 3,
  name: "createOutput",
  length: 1,
  byteSize: 112,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 384,
        slot: 0,
        name: "0",
        structure: s44,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 416,
        slot: 1,
        name: "1",
        structure: s44,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 448,
        bitSize: 192,
        byteSize: 24,
        slot: 2,
        name: "2",
        structure: s49,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 384,
        byteSize: 48,
        slot: 3,
        name: "3",
        structure: s54,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 640,
        bitSize: 224,
        byteSize: 28,
        slot: 4,
        name: "retval",
        structure: s56,
      },
    ],
    methods: [],
    template: null
  },
  slot: 32,
});
Object.assign(s58, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(simple.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
  length: 1,
  byteSize: 2,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 22,
        name: "OutOfMemory",
      },
    ],
    methods: [],
    template: null
  },
  slot: 41,
});
Object.assign(s59, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(simple.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!simple.KernelOutput(u8,simple.kernel)",
  length: 1,
  byteSize: 28,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 192,
        byteSize: 24,
        slot: 0,
        name: "value",
        structure: s53,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s58,
      },
    ],
    methods: [],
    template: null
  },
  slot: 35,
});
Object.assign(s60, {
  ...s,
  type: 3,
  name: "createPartialOutput",
  length: 1,
  byteSize: 128,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 384,
        slot: 0,
        name: "0",
        structure: s44,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 416,
        slot: 1,
        name: "1",
        structure: s44,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 448,
        slot: 2,
        name: "2",
        structure: s44,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 480,
        slot: 3,
        name: "3",
        structure: s44,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 512,
        bitSize: 192,
        byteSize: 24,
        slot: 4,
        name: "4",
        structure: s49,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 384,
        byteSize: 48,
        slot: 5,
        name: "5",
        structure: s54,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 704,
        bitSize: 224,
        byteSize: 28,
        slot: 6,
        name: "retval",
        structure: s59,
      },
    ],
    methods: [],
    template: null
  },
  slot: 33,
});
const f0 = {
  argStruct: s57,
  thunk: 5,
  name: "createOutput",
};
const f1 = {
  argStruct: s60,
  thunk: 1,
  name: "createPartialOutput",
};
Object.assign(s61, {
  ...s,
  type: 2,
  name: "simple",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a74 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s40,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s49,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s53,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s54,
      },
    ],
    methods: [ f0, f1 ],
    template: null
  },
  slot: 0,
});

// finalize structures
const structures = [
  s0, s1, s2, s3, s4, s5, s6, s7, s8, s9,
  s10, s11, s12, s13, s14, s15, s16, s17, s18, s19,
  s20, s21, s22, s23, s24, s25, s26, s27, s28, s29,
  s30, s31, s32, s33, s34, s35, s36, s37, s38, s39,
  s40, s41, s42, s43, s44, s45, s46, s47, s48, s49,
  s50, s51, s52, s53, s54, s55, s56, s57, s58, s59,
  s60, s61,
];
const linkage = finalizeStructures(structures);
const module = s61.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_790546c9;
  return fetch(url);
})();
const __init = linkModule(wasmPromise, { ...linkage, writeBack: true });

// export functions, types, and constants
const {
  createOutput,
  createPartialOutput,
  kernel,
  Input,
  Output,
  Parameters,
} = module;

// rollup-plugin-pb2zig additions
export function createImageData(width, height, source = {}, params = {}) {
  return createPartialImageData(width, height, 0, height, source, params);
}

export function createPartialImageData(width, height, start, count, source = {}, params = {}) {
  if (Array.isArray(source)) {
    const list = source;
    source = {};
    for (const [ index, key ] of Object.keys(kernel.inputImages).entries()) {
      source[key] = list[index];
    }
  }
  const input = new Input(undefined);
  const inputKeys = Object.keys(kernel.inputImages);
  const missing = [];
  let colorSpace;
  for (const key of inputKeys) {
    let imageData = source[key];
    if (!imageData) {
      // use the source as the sole input image when there's just one
      if (inputKeys.length === 1 && [ 'data', 'width', 'height' ].every(k => !!source[k])) {
        imageData = source;
      } else {
        missing.push(key);
      }
    }
    input[key] = imageData;
    if (colorSpace) {
      if (imageData.colorSpace !== colorSpace) {
        throw new Error(`Input images must all use the same color space: ${colorSpace}`);
      }
    } else {
      colorSpace = imageData.colorSpace;
    }
  }
  if (missing.length > 0) {
    throw new Error(`Missing input image${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`);
  }
  const output = createPartialOutput(width, height, start, count, input, params);
  const createResult = (output) => {
    const outputKeys = Object.keys(output);
    const resultSet = {};
    for (const key of outputKeys) {
      const { data: { typedArray: ta }, width, height } = output[key];
      let imageData;
      if (typeof(ImageData) === 'function') {
        // convert Uint8Array to Uint8ClampedArray required by ImageData
        const clampedArray = new Uint8ClampedArray(ta.buffer, ta.byteOffset, ta.byteLength);
        imageData = new ImageData(clampedArray, width, count, { colorSpace });
      } else {
        // for Node.js, which doesn't have ImageData
        imageData = { data: ta, width, height };
      }
      if (outputKeys.length === 1) {
        // just return the one image
        return imageData;
      }
      resultSet[key] = imageData;
    }
    return resultSet;
  };
  if (output[Symbol.toStringTag] === 'Promise') {
    // top-level await isn't used and WASM is not ready
    return output.then(createResult);
  }
  return createResult(output);
}

export function getKernelInfo() {
  const info = {};
  for (let [ name, value ] of Object.entries(kernel)) {
    if (name === 'parameters') {
      const params = {};
      for (const [ pname, pvalue ] of Object.entries(value)) {
        const param = params[pname] = {};
        for (let [ aname, avalue ] of Object.entries(pvalue)) {
          if (typeof(avalue) === 'object') {
            if ('string' in avalue) {
              avalue = avalue.string;
            } else {
              avalue = toArray(avalue);
            }
          } else if (typeof(avalue) === 'function') {
            avalue = getPBType(avalue.name);
          }
          param[aname] = avalue;
        }
      }
      value = params;
    } else {
      if (typeof(value) === 'object') {
        if ('string' in value) {
          value = value.string;
        } else {
          value = value.valueOf();
        }
      }
    }
    info[name] = value;
  }
  return info;
}

function toArray(tuple) {
  const result = [];
  for (let [ index, value ] of Object.entries(tuple)) {
    if (typeof(value) === 'object') {
      value = toArray(value);
    }
    result[index] = value;
  }
  return result;
}

function getPBType(zigType) {
  const types = {
    'bool': 'bool',
    '@Vector(2, bool)': 'bool2',
    '@Vector(3, bool)': 'bool3',
    '@Vector(4, bool)': 'bool4',

    'i32': 'int',
    '@Vector(2, i32)': 'int2',
    '@Vector(3, i32)': 'int3',
    '@Vector(4, i32)': 'int4',

    'f32': 'float',
    '@Vector(2, f32)': 'float2',
    '@Vector(3, f32)': 'float3',
    '@Vector(4, f32)': 'float4',

    '[2]@Vector(2, f32)': 'float2x2',
    '[3]@Vector(3, f32)': 'float3x3',
    '[4]@Vector(4, f32)': 'float4x4',
  };
  return types[zigType];
}

export { __init };

onmessage = (evt) => {
  const [ name, jobID, ...args ] = evt.data;
  runFunction(name, args).then(([ result, transfer ]) => {
    postMessage([ name, jobID, result ], { transfer });
  }).catch((err) => {
    postMessage([ 'error', jobID, err ]);
  });
};

async function runFunction(name, args) {
  switch (name) {
    case 'getKernelInfo':
      const kernel = getKernelInfo(...args);
      return [ kernel ];
    case 'createPartialImageData':
    // await needed here since we're not using top-level await
    // and Zigar functions can return promises initially
    const output = await createPartialImageData(...args);
      const transfer = [];
      if ('data' in output && 'width' in output && 'height' in output) {
        transfer.push(output.data.buffer);
      } else {
        for (const image of Object.entries(output)) {
          transfer.push(output.data.buffer);
        }
      }
      return [ output, transfer ];
    default:
      throw new Error(`Unknown function: ${name}`);
  }
}