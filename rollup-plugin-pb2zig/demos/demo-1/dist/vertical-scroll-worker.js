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
const s70 = {}, s71 = {}, s72 = {}, s73 = {}, s74 = {}, s75 = {}, s76 = {}, s77 = {}, s78 = {}, s79 = {};
const s80 = {}, s81 = {}, s82 = {}, s83 = {}, s84 = {};
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
  name: "[9:0]u8",
  length: 9,
  byteSize: 10,
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
  name: "*const [9:0]u8",
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
  name: "*const *const [9:0]u8",
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
  slot: 60,
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
  slot: 59,
});
Object.assign(s12, {
  ...s,
  type: 1,
  name: "[15:0]u8",
  length: 15,
  byteSize: 16,
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
  slot: 63,
});
Object.assign(s13, {
  ...s,
  type: 11,
  name: "*const [15:0]u8",
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
  slot: 62,
});
Object.assign(s14, {
  ...s,
  type: 11,
  name: "*const *const [15:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s13,
      },
    ],
    methods: [],
    template: null
  },
  slot: 61,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 48, 30, 16, 0 ]);
const a2 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a3 = new Uint8Array([ 96, 30, 16, 0 ]);
const a4 = new Uint8Array([ 0, 0, 0, 0, 0, 64, 143, 64 ]);
const a5 = new Uint8Array([ 136, 30, 16, 0 ]);
const a6 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 89, 64 ]);
const a7 = new Uint8Array([ 144, 30, 16, 0 ]);
const a8 = new Uint8Array([ 1, 31, 16, 0 ]);
const a9 = new Uint8Array([ 84, 111, 112, 32, 82, 111, 108, 108, 32, 82, 97, 100, 105, 117, 115, 0 ]);
Object.assign(s15, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 100, comptime displayName: *const [15:0]u8 = \"Top Roll Radius\"}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "displayName",
        structure: s14,
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
              address: 1056304,
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
        3: {
          structure: s14,
          memory: { array: a7 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a8 },
              address: 1056400,
              slots: {
                0: {
                  structure: s12,
                  memory: { array: a9 },
                  address: 1056513,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 37,
});
Object.assign(s16, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 100, comptime displayName: *const [15:0]u8 = \"Top Roll Radius\"}",
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
  slot: 36,
});
Object.assign(s17, {
  ...s,
  type: 1,
  name: "[18:0]u8",
  length: 18,
  byteSize: 19,
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
  slot: 66,
});
Object.assign(s18, {
  ...s,
  type: 11,
  name: "*const [18:0]u8",
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
  slot: 65,
});
Object.assign(s19, {
  ...s,
  type: 11,
  name: "*const *const [18:0]u8",
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
  slot: 64,
});
const a10 = new Uint8Array([  ]);
const a11 = new Uint8Array([ 48, 30, 16, 0 ]);
const a12 = new Uint8Array([ 96, 30, 16, 0 ]);
const a13 = new Uint8Array([ 136, 30, 16, 0 ]);
const a14 = new Uint8Array([ 128, 30, 16, 0 ]);
const a15 = new Uint8Array([ 238, 30, 16, 0 ]);
const a16 = new Uint8Array([ 66, 111, 116, 116, 111, 109, 32, 82, 111, 108, 108, 32, 82, 97, 100, 105, 117, 115, 0 ]);
Object.assign(s20, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 100, comptime displayName: *const [18:0]u8 = \"Bottom Roll Radius\"}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "displayName",
        structure: s19,
      },
    ],
    methods: [],
    template: {
      memory: { array: a10 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a11 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a12 },
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
          memory: { array: a13 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a6 },
              address: 1056392,
            },
          },
        },
        3: {
          structure: s19,
          memory: { array: a14 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a15 },
              address: 1056384,
              slots: {
                0: {
                  structure: s17,
                  memory: { array: a16 },
                  address: 1056494,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 39,
});
Object.assign(s21, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 100, comptime displayName: *const [18:0]u8 = \"Bottom Roll Radius\"}",
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
  slot: 38,
});
Object.assign(s22, {
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
  slot: 69,
});
Object.assign(s23, {
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
        structure: s22,
      },
    ],
    methods: [],
    template: null
  },
  slot: 68,
});
Object.assign(s24, {
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
        structure: s23,
      },
    ],
    methods: [],
    template: null
  },
  slot: 67,
});
const a17 = new Uint8Array([  ]);
const a18 = new Uint8Array([ 48, 30, 16, 0 ]);
const a19 = new Uint8Array([ 96, 30, 16, 0 ]);
const a20 = new Uint8Array([ 112, 30, 16, 0 ]);
const a21 = new Uint8Array([ 0, 0, 0, 0, 0, 64, 127, 64 ]);
const a22 = new Uint8Array([ 124, 30, 16, 0 ]);
const a23 = new Uint8Array([ 226, 30, 16, 0 ]);
const a24 = new Uint8Array([ 82, 111, 108, 108, 32, 72, 101, 105, 103, 104, 116, 0 ]);
Object.assign(s25, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 500, comptime displayName: *const [11:0]u8 = \"Roll Height\"}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "displayName",
        structure: s24,
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
              address: 1056304,
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
        3: {
          structure: s24,
          memory: { array: a22 },
          slots: {
            0: {
              structure: s23,
              memory: { array: a23 },
              address: 1056380,
              slots: {
                0: {
                  structure: s22,
                  memory: { array: a24 },
                  address: 1056482,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 41,
});
Object.assign(s26, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 500, comptime displayName: *const [11:0]u8 = \"Roll Height\"}",
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
  slot: 40,
});
Object.assign(s27, {
  ...s,
  type: 1,
  name: "[13:0]u8",
  length: 13,
  byteSize: 14,
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
  slot: 72,
});
Object.assign(s28, {
  ...s,
  type: 11,
  name: "*const [13:0]u8",
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
  slot: 71,
});
Object.assign(s29, {
  ...s,
  type: 11,
  name: "*const *const [13:0]u8",
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
  slot: 70,
});
const a25 = new Uint8Array([  ]);
const a26 = new Uint8Array([ 48, 30, 16, 0 ]);
const a27 = new Uint8Array([ 96, 30, 16, 0 ]);
const a28 = new Uint8Array([ 48, 30, 16, 0 ]);
const a29 = new Uint8Array([ 120, 30, 16, 0 ]);
const a30 = new Uint8Array([ 212, 30, 16, 0 ]);
const a31 = new Uint8Array([ 82, 111, 108, 108, 32, 79, 102, 102, 115, 101, 116, 32, 89, 0 ]);
Object.assign(s30, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 0, comptime displayName: *const [13:0]u8 = \"Roll Offset Y\"}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "displayName",
        structure: s29,
      },
    ],
    methods: [],
    template: {
      memory: { array: a25 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a26 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a27 },
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
          memory: { array: a28 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056304,
            },
          },
        },
        3: {
          structure: s29,
          memory: { array: a29 },
          slots: {
            0: {
              structure: s28,
              memory: { array: a30 },
              address: 1056376,
              slots: {
                0: {
                  structure: s27,
                  memory: { array: a31 },
                  address: 1056468,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 43,
});
Object.assign(s31, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 0, comptime displayName: *const [13:0]u8 = \"Roll Offset Y\"}",
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
  slot: 42,
});
Object.assign(s32, {
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
  slot: 75,
});
Object.assign(s33, {
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
        structure: s32,
      },
    ],
    methods: [],
    template: null
  },
  slot: 74,
});
Object.assign(s34, {
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
        structure: s33,
      },
    ],
    methods: [],
    template: null
  },
  slot: 73,
});
const a32 = new Uint8Array([  ]);
const a33 = new Uint8Array([ 48, 30, 16, 0 ]);
const a34 = new Uint8Array([ 96, 30, 16, 0 ]);
const a35 = new Uint8Array([ 112, 30, 16, 0 ]);
const a36 = new Uint8Array([ 104, 30, 16, 0 ]);
const a37 = new Uint8Array([ 201, 30, 16, 0 ]);
const a38 = new Uint8Array([ 82, 111, 108, 108, 32, 87, 105, 100, 116, 104, 0 ]);
Object.assign(s35, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 500, comptime displayName: *const [10:0]u8 = \"Roll Width\"}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "displayName",
        structure: s34,
      },
    ],
    methods: [],
    template: {
      memory: { array: a32 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a33 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a34 },
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
          memory: { array: a35 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a21 },
              address: 1056368,
            },
          },
        },
        3: {
          structure: s34,
          memory: { array: a36 },
          slots: {
            0: {
              structure: s33,
              memory: { array: a37 },
              address: 1056360,
              slots: {
                0: {
                  structure: s32,
                  memory: { array: a38 },
                  address: 1056457,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 45,
});
Object.assign(s36, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 500, comptime displayName: *const [10:0]u8 = \"Roll Width\"}",
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
  slot: 44,
});
const a39 = new Uint8Array([  ]);
const a40 = new Uint8Array([ 48, 30, 16, 0 ]);
const a41 = new Uint8Array([ 96, 30, 16, 0 ]);
const a42 = new Uint8Array([ 48, 30, 16, 0 ]);
const a43 = new Uint8Array([ 92, 30, 16, 0 ]);
const a44 = new Uint8Array([ 187, 30, 16, 0 ]);
const a45 = new Uint8Array([ 82, 111, 108, 108, 32, 79, 102, 102, 115, 101, 116, 32, 88, 0 ]);
Object.assign(s37, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 0, comptime displayName: *const [13:0]u8 = \"Roll Offset X\"}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "displayName",
        structure: s29,
      },
    ],
    methods: [],
    template: {
      memory: { array: a39 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a40 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a41 },
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
          memory: { array: a42 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056304,
            },
          },
        },
        3: {
          structure: s29,
          memory: { array: a43 },
          slots: {
            0: {
              structure: s28,
              memory: { array: a44 },
              address: 1056348,
              slots: {
                0: {
                  structure: s27,
                  memory: { array: a45 },
                  address: 1056443,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 47,
});
Object.assign(s38, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 0, comptime displayName: *const [13:0]u8 = \"Roll Offset X\"}",
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
  slot: 46,
});
Object.assign(s39, {
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
const a46 = new Uint8Array([  ]);
const a47 = new Uint8Array([ 48, 30, 16, 0 ]);
const a48 = new Uint8Array([ 48, 30, 16, 0 ]);
const a49 = new Uint8Array([ 48, 30, 16, 0 ]);
Object.assign(s40, {
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
      memory: { array: a46 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a47 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a48 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056304,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a49 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 77,
});
Object.assign(s41, {
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
        structure: s40,
      },
    ],
    methods: [],
    template: null
  },
  slot: 76,
});
Object.assign(s42, {
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
  slot: 80,
});
Object.assign(s43, {
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
        structure: s42,
      },
    ],
    methods: [],
    template: null
  },
  slot: 79,
});
Object.assign(s44, {
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
        structure: s43,
      },
    ],
    methods: [],
    template: null
  },
  slot: 78,
});
const a50 = new Uint8Array([  ]);
const a51 = new Uint8Array([ 170, 170, 170, 170 ]);
const a52 = new Uint8Array([  ]);
const a53 = new Uint8Array([ 170, 170, 170, 170 ]);
const a54 = new Uint8Array([ 170, 170, 170, 170 ]);
const a55 = new Uint8Array([ 88, 30, 16, 0 ]);
const a56 = new Uint8Array([ 178, 30, 16, 0 ]);
const a57 = new Uint8Array([ 99, 111, 108, 111, 114, 82, 71, 66, 0 ]);
const a58 = new Uint8Array([ 84, 30, 16, 0 ]);
const a59 = new Uint8Array([ 167, 30, 16, 0 ]);
const a60 = new Uint8Array([ 70, 111, 103, 32, 67, 111, 108, 111, 117, 114, 0 ]);
Object.assign(s45, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime parameterType: *const [8:0]u8 = \"colorRGB\", comptime displayName: *const [10:0]u8 = \"Fog Colour\"}",
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
        structure: s41,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s41,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "parameterType",
        structure: s44,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "displayName",
        structure: s34,
      },
    ],
    methods: [],
    template: {
      memory: { array: a50 },
      slots: {
        0: {
          structure: s41,
          memory: { array: a51 },
          slots: {
            0: {
              structure: s40,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s41,
          memory: { array: a53 },
          slots: {
            0: {
              structure: s40,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s41,
          memory: { array: a54 },
          slots: {
            0: {
              structure: s40,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s44,
          memory: { array: a55 },
          slots: {
            0: {
              structure: s43,
              memory: { array: a56 },
              address: 1056344,
              slots: {
                0: {
                  structure: s42,
                  memory: { array: a57 },
                  address: 1056434,
                },
              },
            },
          },
        },
        4: {
          structure: s34,
          memory: { array: a58 },
          slots: {
            0: {
              structure: s33,
              memory: { array: a59 },
              address: 1056340,
              slots: {
                0: {
                  structure: s32,
                  memory: { array: a60 },
                  address: 1056423,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 49,
});
Object.assign(s46, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime parameterType: *const [8:0]u8 = \"colorRGB\", comptime displayName: *const [10:0]u8 = \"Fog Colour\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s45,
      },
    ],
    methods: [],
    template: null
  },
  slot: 48,
});
const a61 = new Uint8Array([  ]);
const a62 = new Uint8Array([ 48, 30, 16, 0 ]);
const a63 = new Uint8Array([ 72, 30, 16, 0 ]);
const a64 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 36, 64 ]);
const a65 = new Uint8Array([ 64, 30, 16, 0 ]);
const a66 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a67 = new Uint8Array([ 80, 30, 16, 0 ]);
const a68 = new Uint8Array([ 153, 30, 16, 0 ]);
const a69 = new Uint8Array([ 70, 111, 103, 32, 73, 110, 102, 108, 117, 101, 110, 99, 101, 0 ]);
Object.assign(s47, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime displayName: *const [13:0]u8 = \"Fog Influence\"}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "displayName",
        structure: s29,
      },
    ],
    methods: [],
    template: {
      memory: { array: a61 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a62 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a63 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a64 },
              address: 1056328,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a65 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a66 },
              address: 1056320,
            },
          },
        },
        3: {
          structure: s29,
          memory: { array: a67 },
          slots: {
            0: {
              structure: s28,
              memory: { array: a68 },
              address: 1056336,
              slots: {
                0: {
                  structure: s27,
                  memory: { array: a69 },
                  address: 1056409,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 51,
});
Object.assign(s48, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime displayName: *const [13:0]u8 = \"Fog Influence\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s47,
      },
    ],
    methods: [],
    template: null
  },
  slot: 50,
});
Object.assign(s49, {
  ...s,
  type: 1,
  name: "[4:0]u8",
  length: 4,
  byteSize: 5,
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
  slot: 83,
});
Object.assign(s50, {
  ...s,
  type: 11,
  name: "*const [4:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s49,
      },
    ],
    methods: [],
    template: null
  },
  slot: 82,
});
Object.assign(s51, {
  ...s,
  type: 11,
  name: "*const *const [4:0]u8",
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
  slot: 81,
});
const a70 = new Uint8Array([  ]);
const a71 = new Uint8Array([ 48, 30, 16, 0 ]);
const a72 = new Uint8Array([ 72, 30, 16, 0 ]);
const a73 = new Uint8Array([ 64, 30, 16, 0 ]);
const a74 = new Uint8Array([ 60, 30, 16, 0 ]);
const a75 = new Uint8Array([ 148, 30, 16, 0 ]);
const a76 = new Uint8Array([ 70, 97, 100, 101, 0 ]);
Object.assign(s52, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime displayName: *const [4:0]u8 = \"Fade\"}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "displayName",
        structure: s51,
      },
    ],
    methods: [],
    template: {
      memory: { array: a70 },
      slots: {
        0: {
          structure: s11,
          memory: { array: a71 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a2 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s11,
          memory: { array: a72 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a64 },
              address: 1056328,
            },
          },
        },
        2: {
          structure: s11,
          memory: { array: a73 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a66 },
              address: 1056320,
            },
          },
        },
        3: {
          structure: s51,
          memory: { array: a74 },
          slots: {
            0: {
              structure: s50,
              memory: { array: a75 },
              address: 1056316,
              slots: {
                0: {
                  structure: s49,
                  memory: { array: a76 },
                  address: 1056404,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 53,
});
Object.assign(s53, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime displayName: *const [4:0]u8 = \"Fade\"}",
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
  slot: 52,
});
const a77 = new Uint8Array([  ]);
const a78 = new Uint8Array([ 170, 170, 170, 170 ]);
const a79 = new Uint8Array([ 170, 170, 170, 170 ]);
const a80 = new Uint8Array([ 170, 170, 170, 170 ]);
const a81 = new Uint8Array([ 170, 170, 170, 170 ]);
const a82 = new Uint8Array([ 170, 170, 170, 170 ]);
const a83 = new Uint8Array([ 170, 170, 170, 170 ]);
const a84 = new Uint8Array([ 170, 170, 170, 170 ]);
const a85 = new Uint8Array([ 170, 170, 170, 170 ]);
const a86 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s54, {
  ...s,
  type: 2,
  name: "struct{comptime topRollRadius: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 100, comptime displayName: *const [15:0]u8 = \"Top Roll Radius\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 100, .displayName = \"Top Roll Radius\"}, comptime bottomRollRadius: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 100, comptime displayName: *const [18:0]u8 = \"Bottom Roll Radius\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 100, .displayName = \"Bottom Roll Radius\"}, comptime rollHeight: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 500, comptime displayName: *const [11:0]u8 = \"Roll Height\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 500, .displayName = \"Roll Height\"}, comptime rollOffsetY: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 0, comptime displayName: *const [13:0]u8 = \"Roll Offset Y\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 0, .displayName = \"Roll Offset Y\"}, comptime rollWidth: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 500, comptime displayName: *const [10:0]u8 = \"Roll Width\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 500, .displayName = \"Roll Width\"}, comptime rollOffsetX: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 0, comptime displayName: *const [13:0]u8 = \"Roll Offset X\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 0, .displayName = \"Roll Offset X\"}, comptime fogColour: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime parameterType: *const [8:0]u8 = \"colorRGB\", comptime displayName: *const [10:0]u8 = \"Fog Colour\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{0, 0, 0}, .defaultValue = .{0, 0, 0}, .parameterType = \"colorRGB\", .displayName = \"Fog Colour\"}, comptime fogInfluence: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime displayName: *const [13:0]u8 = \"Fog Influence\"} = .{.type = f32, .minValue = 0, .maxValue = 10, .defaultValue = 1, .displayName = \"Fog Influence\"}, comptime fade: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime displayName: *const [4:0]u8 = \"Fade\"} = .{.type = f32, .minValue = 0, .maxValue = 10, .defaultValue = 1, .displayName = \"Fade\"}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "topRollRadius",
        structure: s16,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "bottomRollRadius",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "rollHeight",
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "rollOffsetY",
        structure: s31,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "rollWidth",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "rollOffsetX",
        structure: s38,
      },
      {
        ...m,
        type: 8,
        slot: 6,
        name: "fogColour",
        structure: s46,
      },
      {
        ...m,
        type: 8,
        slot: 7,
        name: "fogInfluence",
        structure: s48,
      },
      {
        ...m,
        type: 8,
        slot: 8,
        name: "fade",
        structure: s53,
      },
    ],
    methods: [],
    template: {
      memory: { array: a77 },
      slots: {
        0: {
          structure: s16,
          memory: { array: a78 },
          slots: {
            0: {
              structure: s15,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a79 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s26,
          memory: { array: a80 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s31,
          memory: { array: a81 },
          slots: {
            0: {
              structure: s30,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s36,
          memory: { array: a82 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s38,
          memory: { array: a83 },
          slots: {
            0: {
              structure: s37,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s46,
          memory: { array: a84 },
          slots: {
            0: {
              structure: s45,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        7: {
          structure: s48,
          memory: { array: a85 },
          slots: {
            0: {
              structure: s47,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        8: {
          structure: s53,
          memory: { array: a86 },
          slots: {
            0: {
              structure: s52,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 12,
});
Object.assign(s55, {
  ...s,
  type: 11,
  name: "*const struct{comptime topRollRadius: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 100, comptime displayName: *const [15:0]u8 = \"Top Roll Radius\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 100, .displayName = \"Top Roll Radius\"}, comptime bottomRollRadius: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 100, comptime displayName: *const [18:0]u8 = \"Bottom Roll Radius\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 100, .displayName = \"Bottom Roll Radius\"}, comptime rollHeight: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 500, comptime displayName: *const [11:0]u8 = \"Roll Height\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 500, .displayName = \"Roll Height\"}, comptime rollOffsetY: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 0, comptime displayName: *const [13:0]u8 = \"Roll Offset Y\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 0, .displayName = \"Roll Offset Y\"}, comptime rollWidth: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 500, comptime displayName: *const [10:0]u8 = \"Roll Width\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 500, .displayName = \"Roll Width\"}, comptime rollOffsetX: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 0, comptime displayName: *const [13:0]u8 = \"Roll Offset X\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 0, .displayName = \"Roll Offset X\"}, comptime fogColour: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime parameterType: *const [8:0]u8 = \"colorRGB\", comptime displayName: *const [10:0]u8 = \"Fog Colour\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{0, 0, 0}, .defaultValue = .{0, 0, 0}, .parameterType = \"colorRGB\", .displayName = \"Fog Colour\"}, comptime fogInfluence: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime displayName: *const [13:0]u8 = \"Fog Influence\"} = .{.type = f32, .minValue = 0, .maxValue = 10, .defaultValue = 1, .displayName = \"Fog Influence\"}, comptime fade: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime displayName: *const [4:0]u8 = \"Fade\"} = .{.type = f32, .minValue = 0, .maxValue = 10, .defaultValue = 1, .displayName = \"Fade\"}}",
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
  slot: 11,
});
const a87 = new Uint8Array([  ]);
const a88 = new Uint8Array([ 56, 30, 16, 0 ]);
const a89 = new Uint8Array([ 4, 0, 0, 0 ]);
Object.assign(s56, {
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
      memory: { array: a87 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a88 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a89 },
              address: 1056312,
            },
          },
        },
      },
    },
  },
  slot: 55,
});
Object.assign(s57, {
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
        structure: s56,
      },
    ],
    methods: [],
    template: null
  },
  slot: 54,
});
const a90 = new Uint8Array([  ]);
const a91 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s58, {
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
        structure: s57,
      },
    ],
    methods: [],
    template: {
      memory: { array: a90 },
      slots: {
        0: {
          structure: s57,
          memory: { array: a91 },
          slots: {
            0: {
              structure: s56,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 14,
});
Object.assign(s59, {
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
        structure: s58,
      },
    ],
    methods: [],
    template: null
  },
  slot: 13,
});
const a92 = new Uint8Array([  ]);
const a93 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s60, {
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
        structure: s57,
      },
    ],
    methods: [],
    template: {
      memory: { array: a92 },
      slots: {
        0: {
          structure: s57,
          memory: { array: a93 },
          slots: {
            0: {
              structure: s56,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 16,
});
Object.assign(s61, {
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
        structure: s60,
      },
    ],
    methods: [],
    template: null
  },
  slot: 15,
});
const a94 = new Uint8Array([  ]);
const a95 = new Uint8Array([  ]);
const a96 = new Uint8Array([ 136, 86, 16, 0 ]);
const a97 = new Uint8Array([ 59, 86, 16, 0 ]);
const a98 = new Uint8Array([ 119, 119, 119, 46, 116, 98, 121, 114, 110, 101, 46, 111, 114, 103, 0 ]);
const a99 = new Uint8Array([ 132, 86, 16, 0 ]);
const a100 = new Uint8Array([ 39, 86, 16, 0 ]);
const a101 = new Uint8Array([ 84, 111, 109, 32, 66, 121, 114, 110, 101, 0 ]);
const a102 = new Uint8Array([ 128, 86, 16, 0 ]);
const a103 = new Uint8Array([ 1, 0, 0, 0 ]);
const a104 = new Uint8Array([ 170, 170, 170, 170 ]);
const a105 = new Uint8Array([ 170, 170, 170, 170 ]);
const a106 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s62, {
  ...s,
  type: 2,
  name: "vertical-scroll.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a94 },
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
        structure: s55,
      },
      {
        ...m,
        type: 6,
        slot: 4,
        name: "inputImages",
        structure: s59,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "outputImages",
        structure: s61,
      },
    ],
    methods: [],
    template: {
      memory: { array: a95 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a96 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a97 },
              address: 1070728,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a98 },
                  address: 1070651,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a99 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a100 },
              address: 1070724,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a101 },
                  address: 1070631,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a102 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a103 },
              address: 1070720,
            },
          },
        },
        3: {
          structure: s55,
          memory: { array: a104 },
          slots: {
            0: {
              structure: s54,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s59,
          memory: { array: a105 },
          slots: {
            0: {
              structure: s58,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s61,
          memory: { array: a106 },
          slots: {
            0: {
              structure: s60,
              memory: { array: a52 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
Object.assign(s63, {
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
Object.assign(s64, {
  ...s,
  type: 12,
  name: "[_]const @Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s63,
      },
    ],
    methods: [],
    template: null
  },
  slot: 20,
});
Object.assign(s65, {
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
        structure: s64,
      },
    ],
    methods: [],
    template: null
  },
  slot: 19,
});
Object.assign(s66, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s66,
      },
    ],
    methods: [],
    template: null
  },
  slot: 22,
});
const a107 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s67, {
  ...s,
  type: 9,
  name: "vertical-scroll.ColorSpace",
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
      memory: { array: a107 },
    },
  },
  slot: 23,
});
Object.assign(s68, {
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
        structure: s68,
      },
    ],
    methods: [],
    template: null
  },
  slot: 24,
});
Object.assign(s69, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s69,
      },
    ],
    methods: [],
    template: null
  },
  slot: 25,
});
Object.assign(s70, {
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
  slot: 56,
});
const a108 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a109 = new Uint8Array([  ]);
const a110 = new Uint8Array([ 56, 30, 16, 0 ]);
Object.assign(s71, {
  ...s,
  type: 2,
  name: "vertical-scroll.Image(u8,4,false)",
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
        structure: s65,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s66,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s66,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s67,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s68,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s69,
      },
    ],
    methods: [],
    template: {
      memory: { array: a108 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s63,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s70,
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
      memory: { array: a109 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a110 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a89 },
              address: 1056312,
            },
          },
        },
      },
    },
  },
  slot: 18,
});
const a111 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a112 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a113 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a114 = new Uint8Array([  ]);
Object.assign(s72, {
  ...s,
  type: 2,
  name: "vertical-scroll.KernelInput(u8,vertical-scroll.kernel)",
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
        structure: s71,
      },
    ],
    methods: [],
    template: {
      memory: { array: a111 },
      slots: {
        0: {
          structure: s71,
          memory: { array: a112 },
          slots: {
            0: {
              structure: s65,
              memory: { array: a113 },
              slots: {
                0: {
                  structure: s64,
                  memory: { array: a114 },
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
Object.assign(s73, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s63,
      },
    ],
    methods: [],
    template: null
  },
  slot: 20,
});
Object.assign(s74, {
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
        structure: s73,
      },
    ],
    methods: [],
    template: null
  },
  slot: 28,
});
const a115 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a116 = new Uint8Array([  ]);
const a117 = new Uint8Array([ 56, 30, 16, 0 ]);
Object.assign(s75, {
  ...s,
  type: 2,
  name: "vertical-scroll.Image(u8,4,true)",
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
        structure: s74,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s66,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s66,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s67,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s68,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s69,
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
        structure: s63,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s70,
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
      memory: { array: a116 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a117 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a89 },
              address: 1056312,
            },
          },
        },
      },
    },
  },
  slot: 27,
});
const a118 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a119 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a120 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s76, {
  ...s,
  type: 2,
  name: "vertical-scroll.KernelOutput(u8,vertical-scroll.kernel)",
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
        structure: s75,
      },
    ],
    methods: [],
    template: {
      memory: { array: a118 },
      slots: {
        0: {
          structure: s75,
          memory: { array: a119 },
          slots: {
            0: {
              structure: s74,
              memory: { array: a120 },
              slots: {
                0: {
                  structure: s73,
                  memory: { array: a114 },
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
const a121 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 66, 0, 0, 200, 66, 0, 0, 250, 67, 0, 0, 0, 0, 0, 0, 250, 67, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 128, 63 ]);
Object.assign(s77, {
  ...s,
  type: 2,
  name: "vertical-scroll.KernelParameters(vertical-scroll.kernel)",
  length: 1,
  byteSize: 48,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 128,
        slot: 0,
        name: "topRollRadius",
        structure: s9,
      },
      {
        ...m,
        type: 4,
        bitOffset: 160,
        slot: 1,
        name: "bottomRollRadius",
        structure: s9,
      },
      {
        ...m,
        type: 4,
        bitOffset: 192,
        slot: 2,
        name: "rollHeight",
        structure: s9,
      },
      {
        ...m,
        type: 4,
        bitOffset: 224,
        slot: 3,
        name: "rollOffsetY",
        structure: s9,
      },
      {
        ...m,
        type: 4,
        bitOffset: 256,
        slot: 4,
        name: "rollWidth",
        structure: s9,
      },
      {
        ...m,
        type: 4,
        bitOffset: 288,
        slot: 5,
        name: "rollOffsetX",
        structure: s9,
      },
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 96,
        byteSize: 16,
        slot: 6,
        name: "fogColour",
        structure: s39,
      },
      {
        ...m,
        type: 4,
        bitOffset: 320,
        slot: 7,
        name: "fogInfluence",
        structure: s9,
      },
      {
        ...m,
        type: 4,
        bitOffset: 352,
        slot: 8,
        name: "fade",
        structure: s9,
      },
    ],
    methods: [],
    template: {
      memory: { array: a121 },
    },
  },
  slot: 29,
});
Object.assign(s78, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(vertical-scroll.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 57,
});
Object.assign(s79, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(vertical-scroll.createOutput)).Fn.return_type.?).ErrorUnion.error_set!vertical-scroll.KernelOutput(u8,vertical-scroll.kernel)",
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
        structure: s76,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s78,
      },
    ],
    methods: [],
    template: null
  },
  slot: 34,
});
Object.assign(s80, {
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
        structure: s66,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 416,
        slot: 1,
        name: "1",
        structure: s66,
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
        structure: s72,
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
        structure: s77,
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
        structure: s79,
      },
    ],
    methods: [],
    template: null
  },
  slot: 32,
});
Object.assign(s81, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(vertical-scroll.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 58,
});
Object.assign(s82, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(vertical-scroll.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!vertical-scroll.KernelOutput(u8,vertical-scroll.kernel)",
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
        structure: s76,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s81,
      },
    ],
    methods: [],
    template: null
  },
  slot: 35,
});
Object.assign(s83, {
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
        structure: s66,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 416,
        slot: 1,
        name: "1",
        structure: s66,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 448,
        slot: 2,
        name: "2",
        structure: s66,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 480,
        slot: 3,
        name: "3",
        structure: s66,
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
        structure: s72,
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
        structure: s77,
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
        structure: s82,
      },
    ],
    methods: [],
    template: null
  },
  slot: 33,
});
const f0 = {
  argStruct: s80,
  thunk: 3,
  name: "createOutput",
};
const f1 = {
  argStruct: s83,
  thunk: 1,
  name: "createPartialOutput",
};
Object.assign(s84, {
  ...s,
  type: 2,
  name: "vertical-scroll",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a114 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s62,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s72,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s76,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s77,
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
  s70, s71, s72, s73, s74, s75, s76, s77, s78, s79,
  s80, s81, s82, s83, s84,
];
const linkage = finalizeStructures(structures);
const module = s84.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_610761f8;
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