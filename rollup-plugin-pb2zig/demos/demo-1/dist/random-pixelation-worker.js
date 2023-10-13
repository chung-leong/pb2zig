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
  name: "[22:0]u8",
  length: 22,
  byteSize: 23,
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
  name: "*const [22:0]u8",
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
  name: "*const *const [22:0]u8",
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
  name: "[8:0]u8",
  length: 8,
  byteSize: 9,
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
  name: "*const [8:0]u8",
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
  name: "*const *const [8:0]u8",
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
  slot: 30,
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
  slot: 54,
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
  slot: 53,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 104, 30, 16, 0 ]);
const a2 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a3 = new Uint8Array([ 96, 30, 16, 0 ]);
const a4 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 89, 64 ]);
const a5 = new Uint8Array([ 136, 30, 16, 0 ]);
const a6 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 42, 64 ]);
Object.assign(s12, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 13}",
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
              address: 1056360,
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
              address: 1056352,
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
              address: 1056392,
            },
          },
        },
      },
    },
  },
  slot: 37,
});
Object.assign(s13, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 13}",
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
  slot: 36,
});
const a7 = new Uint8Array([  ]);
const a8 = new Uint8Array([ 104, 30, 16, 0 ]);
const a9 = new Uint8Array([ 96, 30, 16, 0 ]);
const a10 = new Uint8Array([ 128, 30, 16, 0 ]);
const a11 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 49, 64 ]);
Object.assign(s14, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 17}",
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
      memory: { array: a7 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a8 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056360,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a9 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a4 },
              address: 1056352,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a10 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a11 },
              address: 1056384,
            },
          },
        },
      },
    },
  },
  slot: 39,
});
Object.assign(s15, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 17}",
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
  slot: 38,
});
const a12 = new Uint8Array([  ]);
const a13 = new Uint8Array([ 104, 30, 16, 0 ]);
const a14 = new Uint8Array([ 96, 30, 16, 0 ]);
const a15 = new Uint8Array([ 120, 30, 16, 0 ]);
const a16 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 51, 64 ]);
Object.assign(s16, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 19}",
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
      memory: { array: a12 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a13 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056360,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a14 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a4 },
              address: 1056352,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a15 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a16 },
              address: 1056376,
            },
          },
        },
      },
    },
  },
  slot: 41,
});
Object.assign(s17, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 19}",
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
  slot: 40,
});
const a17 = new Uint8Array([  ]);
const a18 = new Uint8Array([ 104, 30, 16, 0 ]);
const a19 = new Uint8Array([ 96, 30, 16, 0 ]);
const a20 = new Uint8Array([ 112, 30, 16, 0 ]);
const a21 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 53, 64 ]);
Object.assign(s18, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 21}",
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
      memory: { array: a17 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a18 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056360,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a19 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a4 },
              address: 1056352,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a20 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a21 },
              address: 1056368,
            },
          },
        },
      },
    },
  },
  slot: 43,
});
Object.assign(s19, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 21}",
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
  slot: 42,
});
const a22 = new Uint8Array([  ]);
const a23 = new Uint8Array([ 104, 30, 16, 0 ]);
const a24 = new Uint8Array([ 96, 30, 16, 0 ]);
const a25 = new Uint8Array([ 88, 30, 16, 0 ]);
const a26 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 55, 64 ]);
Object.assign(s20, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 23}",
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
      memory: { array: a22 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a23 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056360,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a24 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a4 },
              address: 1056352,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a25 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a26 },
              address: 1056344,
            },
          },
        },
      },
    },
  },
  slot: 45,
});
Object.assign(s21, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 23}",
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
  slot: 44,
});
Object.assign(s22, {
  ...s,
  type: 13,
  name: "@Vector(2, f32)",
  length: 2,
  byteSize: 8,
  align: 3,
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
const a27 = new Uint8Array([  ]);
const a28 = new Uint8Array([ 72, 30, 16, 0 ]);
const a29 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 89, 192 ]);
const a30 = new Uint8Array([ 72, 30, 16, 0 ]);
Object.assign(s23, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -100, comptime comptime_float = -100}",
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
    ],
    methods: [],
    template: {
      memory: { array: a27 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a28 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a29 },
              address: 1056328,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a30 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a29 },
              address: 1056328,
            },
          },
        },
      },
    },
  },
  slot: 56,
});
Object.assign(s24, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -100, comptime comptime_float = -100}",
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
  slot: 55,
});
const a31 = new Uint8Array([  ]);
const a32 = new Uint8Array([ 64, 30, 16, 0 ]);
const a33 = new Uint8Array([ 0, 0, 0, 0, 0, 64, 143, 64 ]);
const a34 = new Uint8Array([ 64, 30, 16, 0 ]);
Object.assign(s25, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 1000, comptime comptime_float = 1000}",
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
    ],
    methods: [],
    template: {
      memory: { array: a31 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a32 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a33 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a34 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a33 },
              address: 1056320,
            },
          },
        },
      },
    },
  },
  slot: 58,
});
Object.assign(s26, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 1000, comptime comptime_float = 1000}",
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
  slot: 57,
});
const a35 = new Uint8Array([  ]);
const a36 = new Uint8Array([ 56, 30, 16, 0 ]);
const a37 = new Uint8Array([ 0, 0, 0, 0, 0, 48, 107, 64 ]);
const a38 = new Uint8Array([ 48, 30, 16, 0 ]);
const a39 = new Uint8Array([ 205, 204, 204, 204, 204, 108, 136, 64 ]);
Object.assign(s27, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 217.5, comptime comptime_float = 781.6}",
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
    ],
    methods: [],
    template: {
      memory: { array: a35 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a36 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a37 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a38 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a39 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 60,
});
Object.assign(s28, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 217.5, comptime comptime_float = 781.6}",
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
  slot: 59,
});
const a40 = new Uint8Array([  ]);
const a41 = new Uint8Array([ 170, 170, 170, 170 ]);
const a42 = new Uint8Array([  ]);
const a43 = new Uint8Array([ 170, 170, 170, 170 ]);
const a44 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s29, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -100, comptime comptime_float = -100} = .{-100, -100}, comptime maxValue: struct{comptime comptime_float = 1000, comptime comptime_float = 1000} = .{1000, 1000}, comptime defaultValue: struct{comptime comptime_float = 217.5, comptime comptime_float = 781.6} = .{217.5, 781.6}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s22,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s24,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s28,
      },
    ],
    methods: [],
    template: {
      memory: { array: a40 },
      slots: {
        0: {
          structure: s24,
          memory: { array: a41 },
          slots: {
            0: {
              structure: s23,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a43 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s28,
          memory: { array: a44 },
          slots: {
            0: {
              structure: s27,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 47,
});
Object.assign(s30, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -100, comptime comptime_float = -100} = .{-100, -100}, comptime maxValue: struct{comptime comptime_float = 1000, comptime comptime_float = 1000} = .{1000, 1000}, comptime defaultValue: struct{comptime comptime_float = 217.5, comptime comptime_float = 781.6} = .{217.5, 781.6}}",
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
  slot: 46,
});
const a45 = new Uint8Array([  ]);
const a46 = new Uint8Array([ 170, 170, 170, 170 ]);
const a47 = new Uint8Array([ 170, 170, 170, 170 ]);
const a48 = new Uint8Array([ 170, 170, 170, 170 ]);
const a49 = new Uint8Array([ 170, 170, 170, 170 ]);
const a50 = new Uint8Array([ 170, 170, 170, 170 ]);
const a51 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s31, {
  ...s,
  type: 2,
  name: "struct{comptime n0: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 13} = .{.type = f32, .minValue = 1, .maxValue = 100, .defaultValue = 13}, comptime n1: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 17} = .{.type = f32, .minValue = 1, .maxValue = 100, .defaultValue = 17}, comptime n2: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 19} = .{.type = f32, .minValue = 1, .maxValue = 100, .defaultValue = 19}, comptime n3: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 21} = .{.type = f32, .minValue = 1, .maxValue = 100, .defaultValue = 21}, comptime n4: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 23} = .{.type = f32, .minValue = 1, .maxValue = 100, .defaultValue = 23}, comptime randomPoint: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -100, comptime comptime_float = -100} = .{-100, -100}, comptime maxValue: struct{comptime comptime_float = 1000, comptime comptime_float = 1000} = .{1000, 1000}, comptime defaultValue: struct{comptime comptime_float = 217.5, comptime comptime_float = 781.6} = .{217.5, 781.6}} = .{.type = @Vector(2, f32), .minValue = .{-100, -100}, .maxValue = .{1000, 1000}, .defaultValue = .{217.5, 781.6}}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "n0",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "n1",
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "n2",
        structure: s17,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "n3",
        structure: s19,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "n4",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "randomPoint",
        structure: s30,
      },
    ],
    methods: [],
    template: {
      memory: { array: a45 },
      slots: {
        0: {
          structure: s13,
          memory: { array: a46 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a47 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s17,
          memory: { array: a48 },
          slots: {
            0: {
              structure: s16,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s19,
          memory: { array: a49 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s21,
          memory: { array: a50 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s30,
          memory: { array: a51 },
          slots: {
            0: {
              structure: s29,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 12,
});
Object.assign(s32, {
  ...s,
  type: 11,
  name: "*const struct{comptime n0: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 13} = .{.type = f32, .minValue = 1, .maxValue = 100, .defaultValue = 13}, comptime n1: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 17} = .{.type = f32, .minValue = 1, .maxValue = 100, .defaultValue = 17}, comptime n2: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 19} = .{.type = f32, .minValue = 1, .maxValue = 100, .defaultValue = 19}, comptime n3: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 21} = .{.type = f32, .minValue = 1, .maxValue = 100, .defaultValue = 21}, comptime n4: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 23} = .{.type = f32, .minValue = 1, .maxValue = 100, .defaultValue = 23}, comptime randomPoint: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -100, comptime comptime_float = -100} = .{-100, -100}, comptime maxValue: struct{comptime comptime_float = 1000, comptime comptime_float = 1000} = .{1000, 1000}, comptime defaultValue: struct{comptime comptime_float = 217.5, comptime comptime_float = 781.6} = .{217.5, 781.6}} = .{.type = @Vector(2, f32), .minValue = .{-100, -100}, .maxValue = .{1000, 1000}, .defaultValue = .{217.5, 781.6}}}",
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
  slot: 11,
});
const a52 = new Uint8Array([  ]);
const a53 = new Uint8Array([ 80, 30, 16, 0 ]);
const a54 = new Uint8Array([ 4, 0, 0, 0 ]);
Object.assign(s33, {
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
        structure: s8,
      },
    ],
    methods: [],
    template: {
      memory: { array: a52 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a53 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a54 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 49,
});
Object.assign(s34, {
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
        structure: s33,
      },
    ],
    methods: [],
    template: null
  },
  slot: 48,
});
const a55 = new Uint8Array([  ]);
const a56 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s35, {
  ...s,
  type: 2,
  name: "struct{comptime src: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
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
        structure: s34,
      },
    ],
    methods: [],
    template: {
      memory: { array: a55 },
      slots: {
        0: {
          structure: s34,
          memory: { array: a56 },
          slots: {
            0: {
              structure: s33,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 14,
});
Object.assign(s36, {
  ...s,
  type: 11,
  name: "*const struct{comptime src: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
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
  slot: 13,
});
const a57 = new Uint8Array([  ]);
const a58 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s37, {
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
        structure: s34,
      },
    ],
    methods: [],
    template: {
      memory: { array: a57 },
      slots: {
        0: {
          structure: s34,
          memory: { array: a58 },
          slots: {
            0: {
              structure: s33,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 16,
});
Object.assign(s38, {
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
        structure: s37,
      },
    ],
    methods: [],
    template: null
  },
  slot: 15,
});
const a59 = new Uint8Array([  ]);
const a60 = new Uint8Array([  ]);
const a61 = new Uint8Array([ 104, 63, 16, 0 ]);
const a62 = new Uint8Array([ 22, 63, 16, 0 ]);
const a63 = new Uint8Array([ 114, 97, 110, 100, 111, 109, 32, 115, 105, 122, 101, 32, 112, 105, 120, 101, 108, 97, 116, 105, 111, 110, 0 ]);
const a64 = new Uint8Array([ 112, 63, 16, 0 ]);
const a65 = new Uint8Array([ 3, 63, 16, 0 ]);
const a66 = new Uint8Array([ 112, 105, 120, 101, 108, 101, 114, 111, 0 ]);
const a67 = new Uint8Array([ 108, 63, 16, 0 ]);
const a68 = new Uint8Array([ 1, 0, 0, 0 ]);
const a69 = new Uint8Array([ 104, 63, 16, 0 ]);
const a70 = new Uint8Array([ 170, 170, 170, 170 ]);
const a71 = new Uint8Array([ 170, 170, 170, 170 ]);
const a72 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s39, {
  ...s,
  type: 2,
  name: "random-pixelation.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a59 },
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
        name: "description",
        structure: s3,
      },
      {
        ...m,
        type: 6,
        slot: 4,
        name: "parameters",
        structure: s32,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "inputImages",
        structure: s36,
      },
      {
        ...m,
        type: 6,
        slot: 6,
        name: "outputImages",
        structure: s38,
      },
    ],
    methods: [],
    template: {
      memory: { array: a60 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a61 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a62 },
              address: 1064808,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a63 },
                  address: 1064726,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a64 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a65 },
              address: 1064816,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a66 },
                  address: 1064707,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a67 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a68 },
              address: 1064812,
            },
          },
        },
        3: {
          structure: s3,
          memory: { array: a69 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a62 },
              address: 1064808,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a63 },
                  address: 1064726,
                },
              },
            },
          },
        },
        4: {
          structure: s32,
          memory: { array: a70 },
          slots: {
            0: {
              structure: s31,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s36,
          memory: { array: a71 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s38,
          memory: { array: a72 },
          slots: {
            0: {
              structure: s37,
              memory: { array: a42 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
Object.assign(s40, {
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
Object.assign(s41, {
  ...s,
  type: 12,
  name: "[_]const @Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s40,
      },
    ],
    methods: [],
    template: null
  },
  slot: 20,
});
Object.assign(s42, {
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
        structure: s41,
      },
    ],
    methods: [],
    template: null
  },
  slot: 19,
});
Object.assign(s43, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s43,
      },
    ],
    methods: [],
    template: null
  },
  slot: 22,
});
const a73 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s44, {
  ...s,
  type: 9,
  name: "random-pixelation.ColorSpace",
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
      memory: { array: a73 },
    },
  },
  slot: 23,
});
Object.assign(s45, {
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
        structure: s45,
      },
    ],
    methods: [],
    template: null
  },
  slot: 24,
});
Object.assign(s46, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s46,
      },
    ],
    methods: [],
    template: null
  },
  slot: 25,
});
Object.assign(s47, {
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
  slot: 50,
});
const a74 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a75 = new Uint8Array([  ]);
const a76 = new Uint8Array([ 80, 30, 16, 0 ]);
Object.assign(s48, {
  ...s,
  type: 2,
  name: "random-pixelation.Image(u8,4,false)",
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
        structure: s42,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s43,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s43,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s44,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s45,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s46,
      },
    ],
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
        name: "Pixel",
        structure: s40,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s47,
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
      memory: { array: a75 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a76 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a54 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 18,
});
const a77 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a78 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a79 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a80 = new Uint8Array([  ]);
Object.assign(s49, {
  ...s,
  type: 2,
  name: "random-pixelation.KernelInput(u8,random-pixelation.kernel)",
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
      memory: { array: a77 },
      slots: {
        0: {
          structure: s48,
          memory: { array: a78 },
          slots: {
            0: {
              structure: s42,
              memory: { array: a79 },
              slots: {
                0: {
                  structure: s41,
                  memory: { array: a80 },
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
        structure: s40,
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
const a81 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a82 = new Uint8Array([  ]);
const a83 = new Uint8Array([ 80, 30, 16, 0 ]);
Object.assign(s52, {
  ...s,
  type: 2,
  name: "random-pixelation.Image(u8,4,true)",
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
        structure: s43,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s43,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s44,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s45,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s46,
      },
    ],
    methods: [],
    template: {
      memory: { array: a81 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s40,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s47,
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
      memory: { array: a82 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a83 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a54 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 27,
});
const a84 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a85 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a86 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s53, {
  ...s,
  type: 2,
  name: "random-pixelation.KernelOutput(u8,random-pixelation.kernel)",
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
      memory: { array: a84 },
      slots: {
        0: {
          structure: s52,
          memory: { array: a85 },
          slots: {
            0: {
              structure: s51,
              memory: { array: a86 },
              slots: {
                0: {
                  structure: s50,
                  memory: { array: a80 },
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
const a87 = new Uint8Array([ 0, 128, 89, 67, 102, 102, 67, 68, 0, 0, 80, 65, 0, 0, 136, 65, 0, 0, 152, 65, 0, 0, 168, 65, 0, 0, 184, 65, 0, 0, 0, 0 ]);
Object.assign(s54, {
  ...s,
  type: 2,
  name: "random-pixelation.KernelParameters(random-pixelation.kernel)",
  length: 1,
  byteSize: 32,
  align: 3,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 64,
        slot: 0,
        name: "n0",
        structure: s9,
      },
      {
        ...m,
        type: 4,
        bitOffset: 96,
        slot: 1,
        name: "n1",
        structure: s9,
      },
      {
        ...m,
        type: 4,
        bitOffset: 128,
        slot: 2,
        name: "n2",
        structure: s9,
      },
      {
        ...m,
        type: 4,
        bitOffset: 160,
        slot: 3,
        name: "n3",
        structure: s9,
      },
      {
        ...m,
        type: 4,
        bitOffset: 192,
        slot: 4,
        name: "n4",
        structure: s9,
      },
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 64,
        byteSize: 8,
        slot: 5,
        name: "randomPoint",
        structure: s22,
      },
    ],
    methods: [],
    template: {
      memory: { array: a87 },
    },
  },
  slot: 29,
});
Object.assign(s55, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(random-pixelation.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 51,
});
Object.assign(s56, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(random-pixelation.createOutput)).Fn.return_type.?).ErrorUnion.error_set!random-pixelation.KernelOutput(u8,random-pixelation.kernel)",
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
  byteSize: 96,
  align: 3,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 256,
        slot: 0,
        name: "0",
        structure: s43,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 288,
        slot: 1,
        name: "1",
        structure: s43,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 320,
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
        bitSize: 256,
        byteSize: 32,
        slot: 3,
        name: "3",
        structure: s54,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 512,
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
  name: "@typeInfo(@typeInfo(@TypeOf(random-pixelation.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 52,
});
Object.assign(s59, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(random-pixelation.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!random-pixelation.KernelOutput(u8,random-pixelation.kernel)",
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
  byteSize: 104,
  align: 3,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 256,
        slot: 0,
        name: "0",
        structure: s43,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 288,
        slot: 1,
        name: "1",
        structure: s43,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 320,
        slot: 2,
        name: "2",
        structure: s43,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 352,
        slot: 3,
        name: "3",
        structure: s43,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 384,
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
        bitSize: 256,
        byteSize: 32,
        slot: 5,
        name: "5",
        structure: s54,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 576,
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
  thunk: 2,
  name: "createPartialOutput",
};
Object.assign(s61, {
  ...s,
  type: 2,
  name: "random-pixelation",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a80 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s39,
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
  const url = import.meta.ROLLUP_FILE_URL_b07187d6;
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