import {
  finalizeStructures,
  linkModule,
  usePrimitive,
  useArray,
  usePointer,
  useStruct,
  useVector,
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
useStruct();
useVector();
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
const s60 = {}, s61 = {}, s62 = {}, s63 = {}, s64 = {}, s65 = {}, s66 = {}, s67 = {}, s68 = {}, s69 = {};
const s70 = {}, s71 = {}, s72 = {}, s73 = {}, s74 = {};
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
  name: "[10:0]u8",
  length: 10,
  byteSize: 11,
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
  name: "*const [10:0]u8",
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
  name: "*const *const [10:0]u8",
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
  name: "i32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 2,
        bitOffset: 0,
        structure: s4,
      },
    ],
    methods: [],
    template: null
  },
  slot: 7,
});
Object.assign(s5, {
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
        structure: s4,
      },
    ],
    methods: [],
    template: null
  },
  slot: 6,
});
Object.assign(s6, {
  ...s,
  type: 1,
  name: "[24:0]u8",
  length: 24,
  byteSize: 25,
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
  slot: 10,
});
Object.assign(s7, {
  ...s,
  type: 11,
  name: "*const [24:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s6,
      },
    ],
    methods: [],
    template: null
  },
  slot: 9,
});
Object.assign(s8, {
  ...s,
  type: 11,
  name: "*const *const [24:0]u8",
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
  slot: 8,
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
  slot: 28,
});
Object.assign(s10, {
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
        structure: s10,
      },
    ],
    methods: [],
    template: null
  },
  slot: 52,
});
Object.assign(s11, {
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
        structure: s10,
      },
    ],
    methods: [],
    template: null
  },
  slot: 51,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 56, 30, 16, 0 ]);
const a2 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 185, 63 ]);
const a3 = new Uint8Array([ 160, 30, 16, 0 ]);
const a4 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 20, 64 ]);
const a5 = new Uint8Array([ 96, 30, 16, 0 ]);
const a6 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 64 ]);
Object.assign(s12, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 5, comptime defaultValue: comptime_float = 2}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s9,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a0 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a1 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a3 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a4 },
              address: 1056416,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a5 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a6 },
              address: 1056352,
            },
          },
        },
      },
    },
  },
  slot: 36,
});
Object.assign(s13, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 5, comptime defaultValue: comptime_float = 2}",
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
  slot: 35,
});
Object.assign(s14, {
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
  slot: 29,
});
const a7 = new Uint8Array([  ]);
const a8 = new Uint8Array([ 136, 30, 16, 0 ]);
const a9 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 24, 192 ]);
const a10 = new Uint8Array([ 136, 30, 16, 0 ]);
const a11 = new Uint8Array([ 128, 30, 16, 0 ]);
const a12 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 57, 192 ]);
Object.assign(s15, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -6, comptime comptime_float = -6, comptime comptime_float = -25}",
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
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a7 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a8 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a9 },
              address: 1056392,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a10 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a9 },
              address: 1056392,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a11 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a12 },
              address: 1056384,
            },
          },
        },
      },
    },
  },
  slot: 54,
});
Object.assign(s16, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -6, comptime comptime_float = -6, comptime comptime_float = -25}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s15,
      },
    ],
    methods: [],
    template: null
  },
  slot: 53,
});
const a13 = new Uint8Array([  ]);
const a14 = new Uint8Array([ 112, 30, 16, 0 ]);
const a15 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 24, 64 ]);
const a16 = new Uint8Array([ 112, 30, 16, 0 ]);
const a17 = new Uint8Array([ 72, 30, 16, 0 ]);
const a18 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s17, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 6, comptime comptime_float = 6, comptime comptime_float = 0}",
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
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a13 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a14 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a15 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a16 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a15 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a17 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a18 },
              address: 1056328,
            },
          },
        },
      },
    },
  },
  slot: 56,
});
Object.assign(s18, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 6, comptime comptime_float = 6, comptime comptime_float = 0}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s17,
      },
    ],
    methods: [],
    template: null
  },
  slot: 55,
});
const a19 = new Uint8Array([  ]);
const a20 = new Uint8Array([ 72, 30, 16, 0 ]);
const a21 = new Uint8Array([ 96, 30, 16, 0 ]);
const a22 = new Uint8Array([ 120, 30, 16, 0 ]);
const a23 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 16, 192 ]);
Object.assign(s19, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0, comptime comptime_float = 2, comptime comptime_float = -4}",
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
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a19 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a20 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a18 },
              address: 1056328,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a21 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a6 },
              address: 1056352,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a22 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a23 },
              address: 1056376,
            },
          },
        },
      },
    },
  },
  slot: 58,
});
Object.assign(s20, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0, comptime comptime_float = 2, comptime comptime_float = -4}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s19,
      },
    ],
    methods: [],
    template: null
  },
  slot: 57,
});
const a24 = new Uint8Array([  ]);
const a25 = new Uint8Array([ 170, 170, 170, 170 ]);
const a26 = new Uint8Array([  ]);
const a27 = new Uint8Array([ 170, 170, 170, 170 ]);
const a28 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s21, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -6, comptime comptime_float = -6, comptime comptime_float = -25} = .{-6, -6, -25}, comptime maxValue: struct{comptime comptime_float = 6, comptime comptime_float = 6, comptime comptime_float = 0} = .{6, 6, 0}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 2, comptime comptime_float = -4} = .{0, 2, -4}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s14,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s16,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s18,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s20,
      },
    ],
    methods: [],
    template: {
      memory: { array: a24 },
      slots: {
        0: {
          structure: s16,
          memory: { array: a25 },
          slots: {
            0: {
              structure: s15,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s18,
          memory: { array: a27 },
          slots: {
            0: {
              structure: s17,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s20,
          memory: { array: a28 },
          slots: {
            0: {
              structure: s19,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 38,
});
Object.assign(s22, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -6, comptime comptime_float = -6, comptime comptime_float = -25} = .{-6, -6, -25}, comptime maxValue: struct{comptime comptime_float = 6, comptime comptime_float = 6, comptime comptime_float = 0} = .{6, 6, 0}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 2, comptime comptime_float = -4} = .{0, 2, -4}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s21,
      },
    ],
    methods: [],
    template: null
  },
  slot: 37,
});
const a29 = new Uint8Array([  ]);
const a30 = new Uint8Array([ 112, 30, 16, 0 ]);
const a31 = new Uint8Array([ 112, 30, 16, 0 ]);
const a32 = new Uint8Array([ 104, 30, 16, 0 ]);
const a33 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 192 ]);
Object.assign(s23, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 6, comptime comptime_float = 6, comptime comptime_float = -2}",
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
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a29 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a30 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a15 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a31 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a15 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a32 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a33 },
              address: 1056360,
            },
          },
        },
      },
    },
  },
  slot: 60,
});
Object.assign(s24, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 6, comptime comptime_float = 6, comptime comptime_float = -2}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s23,
      },
    ],
    methods: [],
    template: null
  },
  slot: 59,
});
const a34 = new Uint8Array([  ]);
const a35 = new Uint8Array([ 72, 30, 16, 0 ]);
const a36 = new Uint8Array([ 96, 30, 16, 0 ]);
const a37 = new Uint8Array([ 88, 30, 16, 0 ]);
const a38 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 36, 192 ]);
Object.assign(s25, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0, comptime comptime_float = 2, comptime comptime_float = -10}",
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
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a34 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a35 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a18 },
              address: 1056328,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a36 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a6 },
              address: 1056352,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a37 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a38 },
              address: 1056344,
            },
          },
        },
      },
    },
  },
  slot: 62,
});
Object.assign(s26, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0, comptime comptime_float = 2, comptime comptime_float = -10}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s25,
      },
    ],
    methods: [],
    template: null
  },
  slot: 61,
});
const a39 = new Uint8Array([  ]);
const a40 = new Uint8Array([ 170, 170, 170, 170 ]);
const a41 = new Uint8Array([ 170, 170, 170, 170 ]);
const a42 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s27, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -6, comptime comptime_float = -6, comptime comptime_float = -25} = .{-6, -6, -25}, comptime maxValue: struct{comptime comptime_float = 6, comptime comptime_float = 6, comptime comptime_float = -2} = .{6, 6, -2}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 2, comptime comptime_float = -10} = .{0, 2, -10}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s14,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s16,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s24,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s26,
      },
    ],
    methods: [],
    template: {
      memory: { array: a39 },
      slots: {
        0: {
          structure: s16,
          memory: { array: a40 },
          slots: {
            0: {
              structure: s15,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s24,
          memory: { array: a41 },
          slots: {
            0: {
              structure: s23,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s26,
          memory: { array: a42 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 40,
});
Object.assign(s28, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -6, comptime comptime_float = -6, comptime comptime_float = -25} = .{-6, -6, -25}, comptime maxValue: struct{comptime comptime_float = 6, comptime comptime_float = 6, comptime comptime_float = -2} = .{6, 6, -2}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 2, comptime comptime_float = -10} = .{0, 2, -10}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s27,
      },
    ],
    methods: [],
    template: null
  },
  slot: 39,
});
const a43 = new Uint8Array([  ]);
const a44 = new Uint8Array([ 56, 30, 16, 0 ]);
const a45 = new Uint8Array([ 152, 30, 16, 0 ]);
const a46 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 32, 64 ]);
const a47 = new Uint8Array([ 96, 30, 16, 0 ]);
Object.assign(s29, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 8, comptime defaultValue: comptime_float = 2}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s9,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a43 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a44 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a45 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a46 },
              address: 1056408,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a47 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a6 },
              address: 1056352,
            },
          },
        },
      },
    },
  },
  slot: 42,
});
Object.assign(s30, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 8, comptime defaultValue: comptime_float = 2}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s29,
      },
    ],
    methods: [],
    template: null
  },
  slot: 41,
});
const a48 = new Uint8Array([  ]);
const a49 = new Uint8Array([ 72, 30, 16, 0 ]);
const a50 = new Uint8Array([ 72, 30, 16, 0 ]);
const a51 = new Uint8Array([ 72, 30, 16, 0 ]);
Object.assign(s31, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0}",
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
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a48 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a49 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a18 },
              address: 1056328,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a50 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a18 },
              address: 1056328,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a51 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a18 },
              address: 1056328,
            },
          },
        },
      },
    },
  },
  slot: 64,
});
Object.assign(s32, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s31,
      },
    ],
    methods: [],
    template: null
  },
  slot: 63,
});
const a52 = new Uint8Array([  ]);
const a53 = new Uint8Array([ 48, 30, 16, 0 ]);
const a54 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a55 = new Uint8Array([ 48, 30, 16, 0 ]);
const a56 = new Uint8Array([ 48, 30, 16, 0 ]);
Object.assign(s33, {
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
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a52 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a53 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a54 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a55 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a54 },
              address: 1056304,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a56 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a54 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 66,
});
Object.assign(s34, {
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
        structure: s33,
      },
    ],
    methods: [],
    template: null
  },
  slot: 65,
});
const a57 = new Uint8Array([  ]);
const a58 = new Uint8Array([ 80, 30, 16, 0 ]);
const a59 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 233, 63 ]);
const a60 = new Uint8Array([ 80, 30, 16, 0 ]);
const a61 = new Uint8Array([ 80, 30, 16, 0 ]);
Object.assign(s35, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.8, comptime comptime_float = 0.8, comptime comptime_float = 0.8}",
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
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a57 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a58 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a59 },
              address: 1056336,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a60 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a59 },
              address: 1056336,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a61 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a59 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 68,
});
Object.assign(s36, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.8, comptime comptime_float = 0.8, comptime comptime_float = 0.8}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s35,
      },
    ],
    methods: [],
    template: null
  },
  slot: 67,
});
const a62 = new Uint8Array([  ]);
const a63 = new Uint8Array([ 170, 170, 170, 170 ]);
const a64 = new Uint8Array([ 170, 170, 170, 170 ]);
const a65 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s37, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.8, comptime comptime_float = 0.8, comptime comptime_float = 0.8} = .{0.8, 0.8, 0.8}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s14,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s32,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s34,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a62 },
      slots: {
        0: {
          structure: s32,
          memory: { array: a63 },
          slots: {
            0: {
              structure: s31,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s34,
          memory: { array: a64 },
          slots: {
            0: {
              structure: s33,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a65 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 44,
});
Object.assign(s38, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.8, comptime comptime_float = 0.8, comptime comptime_float = 0.8} = .{0.8, 0.8, 0.8}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s37,
      },
    ],
    methods: [],
    template: null
  },
  slot: 43,
});
Object.assign(s39, {
  ...s,
  type: 13,
  name: "@Vector(4, f32)",
  length: 4,
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
  slot: 30,
});
const a66 = new Uint8Array([  ]);
const a67 = new Uint8Array([ 72, 30, 16, 0 ]);
const a68 = new Uint8Array([ 72, 30, 16, 0 ]);
const a69 = new Uint8Array([ 72, 30, 16, 0 ]);
const a70 = new Uint8Array([ 72, 30, 16, 0 ]);
Object.assign(s40, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0}",
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
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "3",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a66 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a67 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a18 },
              address: 1056328,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a68 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a18 },
              address: 1056328,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a69 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a18 },
              address: 1056328,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a70 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a18 },
              address: 1056328,
            },
          },
        },
      },
    },
  },
  slot: 70,
});
Object.assign(s41, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s40,
      },
    ],
    methods: [],
    template: null
  },
  slot: 69,
});
const a71 = new Uint8Array([  ]);
const a72 = new Uint8Array([ 48, 30, 16, 0 ]);
const a73 = new Uint8Array([ 48, 30, 16, 0 ]);
const a74 = new Uint8Array([ 48, 30, 16, 0 ]);
const a75 = new Uint8Array([ 48, 30, 16, 0 ]);
Object.assign(s42, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1}",
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
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "3",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a71 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a72 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a54 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a73 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a54 },
              address: 1056304,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a74 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a54 },
              address: 1056304,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a75 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a54 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 72,
});
Object.assign(s43, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s42,
      },
    ],
    methods: [],
    template: null
  },
  slot: 71,
});
const a76 = new Uint8Array([  ]);
const a77 = new Uint8Array([ 64, 30, 16, 0 ]);
const a78 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 169, 63 ]);
const a79 = new Uint8Array([ 56, 30, 16, 0 ]);
const a80 = new Uint8Array([ 48, 30, 16, 0 ]);
const a81 = new Uint8Array([ 48, 30, 16, 0 ]);
Object.assign(s44, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.05, comptime comptime_float = 0.1, comptime comptime_float = 1, comptime comptime_float = 1}",
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
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "3",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a76 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a77 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a78 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a79 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056312,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a80 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a54 },
              address: 1056304,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a81 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a54 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 74,
});
Object.assign(s45, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.05, comptime comptime_float = 0.1, comptime comptime_float = 1, comptime comptime_float = 1}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s44,
      },
    ],
    methods: [],
    template: null
  },
  slot: 73,
});
const a82 = new Uint8Array([  ]);
const a83 = new Uint8Array([ 170, 170, 170, 170 ]);
const a84 = new Uint8Array([ 170, 170, 170, 170 ]);
const a85 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s46, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.05, comptime comptime_float = 0.1, comptime comptime_float = 1, comptime comptime_float = 1} = .{0.05, 0.1, 1, 1}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s39,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s41,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s43,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s45,
      },
    ],
    methods: [],
    template: {
      memory: { array: a82 },
      slots: {
        0: {
          structure: s41,
          memory: { array: a83 },
          slots: {
            0: {
              structure: s40,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s43,
          memory: { array: a84 },
          slots: {
            0: {
              structure: s42,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s45,
          memory: { array: a85 },
          slots: {
            0: {
              structure: s44,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 46,
});
Object.assign(s47, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.05, comptime comptime_float = 0.1, comptime comptime_float = 1, comptime comptime_float = 1} = .{0.05, 0.1, 1, 1}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s46,
      },
    ],
    methods: [],
    template: null
  },
  slot: 45,
});
const a86 = new Uint8Array([  ]);
const a87 = new Uint8Array([ 170, 170, 170, 170 ]);
const a88 = new Uint8Array([ 170, 170, 170, 170 ]);
const a89 = new Uint8Array([ 170, 170, 170, 170 ]);
const a90 = new Uint8Array([ 170, 170, 170, 170 ]);
const a91 = new Uint8Array([ 170, 170, 170, 170 ]);
const a92 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s48, {
  ...s,
  type: 2,
  name: "struct{comptime viewPlaneDistance: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 5, comptime defaultValue: comptime_float = 2} = .{.type = f32, .minValue = 0.1, .maxValue = 5, .defaultValue = 2}, comptime lightPos: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -6, comptime comptime_float = -6, comptime comptime_float = -25} = .{-6, -6, -25}, comptime maxValue: struct{comptime comptime_float = 6, comptime comptime_float = 6, comptime comptime_float = 0} = .{6, 6, 0}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 2, comptime comptime_float = -4} = .{0, 2, -4}} = .{.type = @Vector(3, f32), .minValue = .{-6, -6, -25}, .maxValue = .{6, 6, 0}, .defaultValue = .{0, 2, -4}}, comptime sphere0Position: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -6, comptime comptime_float = -6, comptime comptime_float = -25} = .{-6, -6, -25}, comptime maxValue: struct{comptime comptime_float = 6, comptime comptime_float = 6, comptime comptime_float = -2} = .{6, 6, -2}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 2, comptime comptime_float = -10} = .{0, 2, -10}} = .{.type = @Vector(3, f32), .minValue = .{-6, -6, -25}, .maxValue = .{6, 6, -2}, .defaultValue = .{0, 2, -10}}, comptime sphere0Radius: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 8, comptime defaultValue: comptime_float = 2} = .{.type = f32, .minValue = 0.1, .maxValue = 8, .defaultValue = 2}, comptime sphere0Color: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.8, comptime comptime_float = 0.8, comptime comptime_float = 0.8} = .{0.8, 0.8, 0.8}} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0.8, 0.8, 0.8}}, comptime sphere0Material: struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.05, comptime comptime_float = 0.1, comptime comptime_float = 1, comptime comptime_float = 1} = .{0.05, 0.1, 1, 1}} = .{.type = @Vector(4, f32), .minValue = .{0, 0, 0, 0}, .maxValue = .{1, 1, 1, 1}, .defaultValue = .{0.05, 0.1, 1, 1}}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "viewPlaneDistance",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "lightPos",
        structure: s22,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "sphere0Position",
        structure: s28,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "sphere0Radius",
        structure: s30,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "sphere0Color",
        structure: s38,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "sphere0Material",
        structure: s47,
      },
    ],
    methods: [],
    template: {
      memory: { array: a86 },
      slots: {
        0: {
          structure: s13,
          memory: { array: a87 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s22,
          memory: { array: a88 },
          slots: {
            0: {
              structure: s21,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s28,
          memory: { array: a89 },
          slots: {
            0: {
              structure: s27,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s30,
          memory: { array: a90 },
          slots: {
            0: {
              structure: s29,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s38,
          memory: { array: a91 },
          slots: {
            0: {
              structure: s37,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s47,
          memory: { array: a92 },
          slots: {
            0: {
              structure: s46,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 12,
});
Object.assign(s49, {
  ...s,
  type: 11,
  name: "*const struct{comptime viewPlaneDistance: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 5, comptime defaultValue: comptime_float = 2} = .{.type = f32, .minValue = 0.1, .maxValue = 5, .defaultValue = 2}, comptime lightPos: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -6, comptime comptime_float = -6, comptime comptime_float = -25} = .{-6, -6, -25}, comptime maxValue: struct{comptime comptime_float = 6, comptime comptime_float = 6, comptime comptime_float = 0} = .{6, 6, 0}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 2, comptime comptime_float = -4} = .{0, 2, -4}} = .{.type = @Vector(3, f32), .minValue = .{-6, -6, -25}, .maxValue = .{6, 6, 0}, .defaultValue = .{0, 2, -4}}, comptime sphere0Position: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -6, comptime comptime_float = -6, comptime comptime_float = -25} = .{-6, -6, -25}, comptime maxValue: struct{comptime comptime_float = 6, comptime comptime_float = 6, comptime comptime_float = -2} = .{6, 6, -2}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 2, comptime comptime_float = -10} = .{0, 2, -10}} = .{.type = @Vector(3, f32), .minValue = .{-6, -6, -25}, .maxValue = .{6, 6, -2}, .defaultValue = .{0, 2, -10}}, comptime sphere0Radius: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 8, comptime defaultValue: comptime_float = 2} = .{.type = f32, .minValue = 0.1, .maxValue = 8, .defaultValue = 2}, comptime sphere0Color: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.8, comptime comptime_float = 0.8, comptime comptime_float = 0.8} = .{0.8, 0.8, 0.8}} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0.8, 0.8, 0.8}}, comptime sphere0Material: struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.05, comptime comptime_float = 0.1, comptime comptime_float = 1, comptime comptime_float = 1} = .{0.05, 0.1, 1, 1}} = .{.type = @Vector(4, f32), .minValue = .{0, 0, 0, 0}, .maxValue = .{1, 1, 1, 1}, .defaultValue = .{0.05, 0.1, 1, 1}}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s48,
      },
    ],
    methods: [],
    template: null
  },
  slot: 11,
});
const a93 = new Uint8Array([  ]);
Object.assign(s50, {
  ...s,
  type: 2,
  name: "@TypeOf(.{})",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a93 },
    },
  },
  slot: 14,
});
Object.assign(s51, {
  ...s,
  type: 11,
  name: "*const @TypeOf(.{})",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s50,
      },
    ],
    methods: [],
    template: null
  },
  slot: 13,
});
const a94 = new Uint8Array([  ]);
const a95 = new Uint8Array([ 144, 30, 16, 0 ]);
const a96 = new Uint8Array([ 4, 0, 0, 0 ]);
Object.assign(s52, {
  ...s,
  type: 2,
  name: "struct{comptime channels: comptime_int = 4}",
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
        structure: s5,
      },
    ],
    methods: [],
    template: {
      memory: { array: a94 },
      slots: {
        0: {
          structure: s5,
          memory: { array: a95 },
          slots: {
            0: {
              structure: s4,
              memory: { array: a96 },
              address: 1056400,
            },
          },
        },
      },
    },
  },
  slot: 48,
});
Object.assign(s53, {
  ...s,
  type: 11,
  name: "*const struct{comptime channels: comptime_int = 4}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s52,
      },
    ],
    methods: [],
    template: null
  },
  slot: 47,
});
const a97 = new Uint8Array([  ]);
const a98 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s54, {
  ...s,
  type: 2,
  name: "struct{comptime dst: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
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
        structure: s53,
      },
    ],
    methods: [],
    template: {
      memory: { array: a97 },
      slots: {
        0: {
          structure: s53,
          memory: { array: a98 },
          slots: {
            0: {
              structure: s52,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 16,
});
Object.assign(s55, {
  ...s,
  type: 11,
  name: "*const struct{comptime dst: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s54,
      },
    ],
    methods: [],
    template: null
  },
  slot: 15,
});
const a99 = new Uint8Array([  ]);
const a100 = new Uint8Array([  ]);
const a101 = new Uint8Array([ 44, 87, 16, 0 ]);
const a102 = new Uint8Array([ 246, 86, 16, 0 ]);
const a103 = new Uint8Array([ 78, 101, 119, 103, 114, 111, 117, 110, 100, 115, 0 ]);
const a104 = new Uint8Array([ 44, 87, 16, 0 ]);
const a105 = new Uint8Array([ 40, 87, 16, 0 ]);
const a106 = new Uint8Array([ 1, 0, 0, 0 ]);
const a107 = new Uint8Array([ 36, 87, 16, 0 ]);
const a108 = new Uint8Array([ 196, 86, 16, 0 ]);
const a109 = new Uint8Array([ 80, 105, 120, 101, 108, 32, 66, 108, 101, 110, 100, 101, 114, 32, 82, 97, 121, 116, 114, 97, 99, 105, 110, 103, 0 ]);
const a110 = new Uint8Array([ 170, 170, 170, 170 ]);
const a111 = new Uint8Array([ 170, 170, 170, 170 ]);
const a112 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s56, {
  ...s,
  type: 2,
  name: "raytracer.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a99 },
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
        structure: s3,
      },
      {
        ...m,
        type: 6,
        slot: 2,
        name: "version",
        structure: s5,
      },
      {
        ...m,
        type: 6,
        slot: 3,
        name: "description",
        structure: s8,
      },
      {
        ...m,
        type: 6,
        slot: 4,
        name: "parameters",
        structure: s49,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "inputImages",
        structure: s51,
      },
      {
        ...m,
        type: 6,
        slot: 6,
        name: "outputImages",
        structure: s55,
      },
    ],
    methods: [],
    template: {
      memory: { array: a100 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a101 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a102 },
              address: 1070892,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a103 },
                  address: 1070838,
                },
              },
            },
          },
        },
        1: {
          structure: s3,
          memory: { array: a104 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a102 },
              address: 1070892,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a103 },
                  address: 1070838,
                },
              },
            },
          },
        },
        2: {
          structure: s5,
          memory: { array: a105 },
          slots: {
            0: {
              structure: s4,
              memory: { array: a106 },
              address: 1070888,
            },
          },
        },
        3: {
          structure: s8,
          memory: { array: a107 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a108 },
              address: 1070884,
              slots: {
                0: {
                  structure: s6,
                  memory: { array: a109 },
                  address: 1070788,
                },
              },
            },
          },
        },
        4: {
          structure: s49,
          memory: { array: a110 },
          slots: {
            0: {
              structure: s48,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s51,
          memory: { array: a111 },
          slots: {
            0: {
              structure: s50,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s55,
          memory: { array: a112 },
          slots: {
            0: {
              structure: s54,
              memory: { array: a26 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
const a113 = new Uint8Array([  ]);
Object.assign(s57, {
  ...s,
  type: 2,
  name: "raytracer.KernelInput(u8,raytracer.kernel)",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a113 },
    },
  },
  slot: 17,
});
Object.assign(s58, {
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
  slot: 22,
});
Object.assign(s59, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s58,
      },
    ],
    methods: [],
    template: null
  },
  slot: 21,
});
Object.assign(s60, {
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
        structure: s59,
      },
    ],
    methods: [],
    template: null
  },
  slot: 20,
});
Object.assign(s61, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s61,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
const a114 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s62, {
  ...s,
  type: 9,
  name: "raytracer.ColorSpace",
  length: 1,
  byteSize: 1,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 2,
        name: "srgb",
        structure: s4,
      },
      {
        ...m,
        type: 2,
        name: "display-p3",
        structure: s4,
      },
    ],
    methods: [],
    template: {
      memory: { array: a114 },
    },
  },
  slot: 24,
});
Object.assign(s63, {
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
        structure: s63,
      },
    ],
    methods: [],
    template: null
  },
  slot: 25,
});
Object.assign(s64, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s64,
      },
    ],
    methods: [],
    template: null
  },
  slot: 26,
});
const a115 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a116 = new Uint8Array([  ]);
const a117 = new Uint8Array([ 144, 30, 16, 0 ]);
Object.assign(s65, {
  ...s,
  type: 2,
  name: "raytracer.Image(u8,4,true)",
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
        structure: s60,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s61,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s61,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s62,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s63,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s64,
      },
    ],
    methods: [],
    template: {
      memory: { array: a115 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s58,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s39,
      },
      {
        ...m,
        type: 6,
        slot: 0,
        name: "channels",
        structure: s5,
      },
    ],
    methods: [],
    template: {
      memory: { array: a116 },
      slots: {
        0: {
          structure: s5,
          memory: { array: a117 },
          slots: {
            0: {
              structure: s4,
              memory: { array: a96 },
              address: 1056400,
            },
          },
        },
      },
    },
  },
  slot: 19,
});
const a118 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a119 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a120 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a121 = new Uint8Array([  ]);
Object.assign(s66, {
  ...s,
  type: 2,
  name: "raytracer.KernelOutput(u8,raytracer.kernel)",
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
        structure: s65,
      },
    ],
    methods: [],
    template: {
      memory: { array: a118 },
      slots: {
        0: {
          structure: s65,
          memory: { array: a119 },
          slots: {
            0: {
              structure: s60,
              memory: { array: a120 },
              slots: {
                0: {
                  structure: s59,
                  memory: { array: a121 },
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 18,
});
const a122 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 128, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 32, 193, 0, 0, 0, 0, 205, 204, 76, 63, 205, 204, 76, 63, 205, 204, 76, 63, 0, 0, 0, 0, 205, 204, 76, 61, 205, 204, 204, 61, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s67, {
  ...s,
  type: 2,
  name: "raytracer.KernelParameters(raytracer.kernel)",
  length: 1,
  byteSize: 80,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 512,
        slot: 0,
        name: "viewPlaneDistance",
        structure: s9,
      },
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 96,
        byteSize: 16,
        slot: 1,
        name: "lightPos",
        structure: s14,
      },
      {
        ...m,
        type: 6,
        bitOffset: 128,
        bitSize: 96,
        byteSize: 16,
        slot: 2,
        name: "sphere0Position",
        structure: s14,
      },
      {
        ...m,
        type: 4,
        bitOffset: 544,
        slot: 3,
        name: "sphere0Radius",
        structure: s9,
      },
      {
        ...m,
        type: 6,
        bitOffset: 256,
        bitSize: 96,
        byteSize: 16,
        slot: 4,
        name: "sphere0Color",
        structure: s14,
      },
      {
        ...m,
        type: 6,
        bitOffset: 384,
        bitSize: 128,
        byteSize: 16,
        slot: 5,
        name: "sphere0Material",
        structure: s39,
      },
    ],
    methods: [],
    template: {
      memory: { array: a122 },
    },
  },
  slot: 27,
});
Object.assign(s68, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(raytracer.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 49,
});
Object.assign(s69, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(raytracer.createOutput)).Fn.return_type.?).ErrorUnion.error_set!raytracer.KernelOutput(u8,raytracer.kernel)",
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
        structure: s66,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s68,
      },
    ],
    methods: [],
    template: null
  },
  slot: 33,
});
Object.assign(s70, {
  ...s,
  type: 3,
  name: "createOutput",
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
        bitOffset: 640,
        slot: 0,
        name: "0",
        structure: s61,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 672,
        slot: 1,
        name: "1",
        structure: s61,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1024,
        bitSize: 0,
        byteSize: 0,
        slot: 2,
        name: "2",
        structure: s57,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 640,
        byteSize: 80,
        slot: 3,
        name: "3",
        structure: s67,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 704,
        bitSize: 224,
        byteSize: 28,
        slot: 4,
        name: "retval",
        structure: s69,
      },
    ],
    methods: [],
    template: null
  },
  slot: 31,
});
Object.assign(s71, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(raytracer.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 50,
});
Object.assign(s72, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(raytracer.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!raytracer.KernelOutput(u8,raytracer.kernel)",
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
        structure: s66,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s71,
      },
    ],
    methods: [],
    template: null
  },
  slot: 34,
});
Object.assign(s73, {
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
        bitOffset: 640,
        slot: 0,
        name: "0",
        structure: s61,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 672,
        slot: 1,
        name: "1",
        structure: s61,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 704,
        slot: 2,
        name: "2",
        structure: s61,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 736,
        slot: 3,
        name: "3",
        structure: s61,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1024,
        bitSize: 0,
        byteSize: 0,
        slot: 4,
        name: "4",
        structure: s57,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 640,
        byteSize: 80,
        slot: 5,
        name: "5",
        structure: s67,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 768,
        bitSize: 224,
        byteSize: 28,
        slot: 6,
        name: "retval",
        structure: s72,
      },
    ],
    methods: [],
    template: null
  },
  slot: 32,
});
const f0 = {
  argStruct: s70,
  thunk: 7,
  name: "createOutput",
};
const f1 = {
  argStruct: s73,
  thunk: 1,
  name: "createPartialOutput",
};
Object.assign(s74, {
  ...s,
  type: 2,
  name: "raytracer",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a121 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s56,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s57,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s66,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s67,
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
  s60, s61, s62, s63, s64, s65, s66, s67, s68, s69,
  s70, s71, s72, s73, s74,
];
const linkage = finalizeStructures(structures);
const module = s74.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_5da634cc;
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