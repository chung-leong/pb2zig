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
  useType,
  useFloat,
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
useType();
useFloat();
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
const s80 = {}, s81 = {}, s82 = {}, s83 = {}, s84 = {}, s85 = {}, s86 = {}, s87 = {}, s88 = {}, s89 = {};
const s90 = {}, s91 = {}, s92 = {}, s93 = {}, s94 = {}, s95 = {}, s96 = {}, s97 = {};
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
  name: "[19:0]u8",
  length: 19,
  byteSize: 20,
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
  name: "*const [19:0]u8",
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
  name: "*const *const [19:0]u8",
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
  type: 1,
  name: "[38:0]u8",
  length: 38,
  byteSize: 39,
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
  slot: 13,
});
Object.assign(s10, {
  ...s,
  type: 11,
  name: "*const [38:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s9,
      },
    ],
    methods: [],
    template: null
  },
  slot: 12,
});
Object.assign(s11, {
  ...s,
  type: 11,
  name: "*const *const [38:0]u8",
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
  slot: 11,
});
Object.assign(s12, {
  ...s,
  type: 13,
  name: "@Vector(2, i32)",
  length: 2,
  byteSize: 8,
  align: 3,
  instance: {
    members: [
      {
        ...m,
        type: 2,
        structure: s7,
      },
    ],
    methods: [],
    template: null
  },
  slot: 31,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 176, 30, 16, 0 ]);
const a2 = new Uint8Array([ 100, 0, 0, 0 ]);
const a3 = new Uint8Array([ 176, 30, 16, 0 ]);
Object.assign(s13, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_int = 100, comptime comptime_int = 100}",
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
        structure: s8,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s8,
      },
    ],
    methods: [],
    template: {
      memory: { array: a0 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a1 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a2 },
              address: 1056432,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a3 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a2 },
              address: 1056432,
            },
          },
        },
      },
    },
  },
  slot: 69,
});
Object.assign(s14, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_int = 100, comptime comptime_int = 100}",
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
  slot: 68,
});
const a4 = new Uint8Array([  ]);
const a5 = new Uint8Array([ 172, 30, 16, 0 ]);
const a6 = new Uint8Array([ 232, 3, 0, 0 ]);
const a7 = new Uint8Array([ 172, 30, 16, 0 ]);
Object.assign(s15, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_int = 1000, comptime comptime_int = 1000}",
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
        structure: s8,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s8,
      },
    ],
    methods: [],
    template: {
      memory: { array: a4 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a5 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a6 },
              address: 1056428,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a7 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a6 },
              address: 1056428,
            },
          },
        },
      },
    },
  },
  slot: 71,
});
Object.assign(s16, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_int = 1000, comptime comptime_int = 1000}",
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
  slot: 70,
});
const a8 = new Uint8Array([  ]);
const a9 = new Uint8Array([ 168, 30, 16, 0 ]);
const a10 = new Uint8Array([ 0, 2, 0, 0 ]);
const a11 = new Uint8Array([ 168, 30, 16, 0 ]);
Object.assign(s17, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_int = 512, comptime comptime_int = 512}",
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
        structure: s8,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s8,
      },
    ],
    methods: [],
    template: {
      memory: { array: a8 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a9 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a10 },
              address: 1056424,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a11 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a10 },
              address: 1056424,
            },
          },
        },
      },
    },
  },
  slot: 73,
});
Object.assign(s18, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_int = 512, comptime comptime_int = 512}",
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
  slot: 72,
});
Object.assign(s19, {
  ...s,
  type: 1,
  name: "[17:0]u8",
  length: 17,
  byteSize: 18,
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
  slot: 76,
});
Object.assign(s20, {
  ...s,
  type: 11,
  name: "*const [17:0]u8",
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
  slot: 75,
});
Object.assign(s21, {
  ...s,
  type: 11,
  name: "*const *const [17:0]u8",
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
  slot: 74,
});
const a12 = new Uint8Array([  ]);
const a13 = new Uint8Array([ 170, 170, 170, 170 ]);
const a14 = new Uint8Array([  ]);
const a15 = new Uint8Array([ 170, 170, 170, 170 ]);
const a16 = new Uint8Array([ 170, 170, 170, 170 ]);
const a17 = new Uint8Array([ 24, 31, 16, 0 ]);
const a18 = new Uint8Array([ 28, 31, 16, 0 ]);
const a19 = new Uint8Array([ 79, 117, 116, 112, 117, 116, 32, 105, 109, 97, 103, 101, 32, 115, 105, 122, 101, 0 ]);
Object.assign(s22, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 1000, comptime comptime_int = 1000} = .{1000, 1000}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}, comptime aeDisplayName: *const [17:0]u8 = \"Output image size\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s12,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s14,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s16,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s18,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "aeDisplayName",
        structure: s21,
      },
    ],
    methods: [],
    template: {
      memory: { array: a12 },
      slots: {
        0: {
          structure: s14,
          memory: { array: a13 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s16,
          memory: { array: a15 },
          slots: {
            0: {
              structure: s15,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s18,
          memory: { array: a16 },
          slots: {
            0: {
              structure: s17,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s21,
          memory: { array: a17 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a18 },
              address: 1056536,
              slots: {
                0: {
                  structure: s19,
                  memory: { array: a19 },
                  address: 1056540,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 40,
});
Object.assign(s23, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 1000, comptime comptime_int = 1000} = .{1000, 1000}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}, comptime aeDisplayName: *const [17:0]u8 = \"Output image size\"}",
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
  slot: 39,
});
Object.assign(s24, {
  ...s,
  name: "f32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 0,
        structure: s24,
      },
    ],
    methods: [],
    template: null
  },
  slot: 33,
});
Object.assign(s25, {
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
        structure: s24,
      },
    ],
    methods: [],
    template: null
  },
  slot: 32,
});
Object.assign(s26, {
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
        structure: s26,
      },
    ],
    methods: [],
    template: null
  },
  slot: 90,
});
Object.assign(s27, {
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
        structure: s26,
      },
    ],
    methods: [],
    template: null
  },
  slot: 89,
});
const a20 = new Uint8Array([  ]);
const a21 = new Uint8Array([ 160, 30, 16, 0 ]);
const a22 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 89, 192 ]);
const a23 = new Uint8Array([ 80, 30, 16, 0 ]);
const a24 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a25 = new Uint8Array([ 160, 30, 16, 0 ]);
Object.assign(s28, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -100, comptime comptime_float = 0, comptime comptime_float = -100}",
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
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s27,
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
      memory: { array: a20 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a21 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a22 },
              address: 1056416,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a23 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a24 },
              address: 1056336,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a25 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a22 },
              address: 1056416,
            },
          },
        },
      },
    },
  },
  slot: 78,
});
Object.assign(s29, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -100, comptime comptime_float = 0, comptime comptime_float = -100}",
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
  slot: 77,
});
const a26 = new Uint8Array([  ]);
const a27 = new Uint8Array([ 144, 30, 16, 0 ]);
const a28 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 89, 64 ]);
const a29 = new Uint8Array([ 152, 30, 16, 0 ]);
const a30 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 52, 64 ]);
const a31 = new Uint8Array([ 144, 30, 16, 0 ]);
Object.assign(s30, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 100, comptime comptime_float = 20, comptime comptime_float = 100}",
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
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s27,
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
      memory: { array: a26 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a27 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a28 },
              address: 1056400,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a29 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a30 },
              address: 1056408,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a31 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a28 },
              address: 1056400,
            },
          },
        },
      },
    },
  },
  slot: 80,
});
Object.assign(s31, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 100, comptime comptime_float = 20, comptime comptime_float = 100}",
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
  slot: 79,
});
const a32 = new Uint8Array([  ]);
const a33 = new Uint8Array([ 136, 30, 16, 0 ]);
const a34 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 24, 192 ]);
const a35 = new Uint8Array([ 128, 30, 16, 0 ]);
const a36 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 16, 64 ]);
const a37 = new Uint8Array([ 120, 30, 16, 0 ]);
const a38 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 24, 64 ]);
Object.assign(s32, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -6, comptime comptime_float = 4, comptime comptime_float = 6}",
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
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s27,
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
      memory: { array: a32 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a33 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a34 },
              address: 1056392,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a35 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a36 },
              address: 1056384,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a37 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a38 },
              address: 1056376,
            },
          },
        },
      },
    },
  },
  slot: 82,
});
Object.assign(s33, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -6, comptime comptime_float = 4, comptime comptime_float = 6}",
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
  slot: 81,
});
const a39 = new Uint8Array([  ]);
const a40 = new Uint8Array([ 170, 170, 170, 170 ]);
const a41 = new Uint8Array([ 170, 170, 170, 170 ]);
const a42 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s34, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -100, comptime comptime_float = 0, comptime comptime_float = -100} = .{-100, 0, -100}, comptime maxValue: struct{comptime comptime_float = 100, comptime comptime_float = 20, comptime comptime_float = 100} = .{100, 20, 100}, comptime defaultValue: struct{comptime comptime_float = -6, comptime comptime_float = 4, comptime comptime_float = 6} = .{-6, 4, 6}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s25,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s29,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s31,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s33,
      },
    ],
    methods: [],
    template: {
      memory: { array: a39 },
      slots: {
        0: {
          structure: s29,
          memory: { array: a40 },
          slots: {
            0: {
              structure: s28,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s31,
          memory: { array: a41 },
          slots: {
            0: {
              structure: s30,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s33,
          memory: { array: a42 },
          slots: {
            0: {
              structure: s32,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 42,
});
Object.assign(s35, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -100, comptime comptime_float = 0, comptime comptime_float = -100} = .{-100, 0, -100}, comptime maxValue: struct{comptime comptime_float = 100, comptime comptime_float = 20, comptime comptime_float = 100} = .{100, 20, 100}, comptime defaultValue: struct{comptime comptime_float = -6, comptime comptime_float = 4, comptime comptime_float = 6} = .{-6, 4, 6}}",
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
  slot: 41,
});
const a43 = new Uint8Array([  ]);
const a44 = new Uint8Array([ 104, 30, 16, 0 ]);
const a45 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 20, 192 ]);
const a46 = new Uint8Array([ 112, 30, 16, 0 ]);
const a47 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 191 ]);
const a48 = new Uint8Array([ 104, 30, 16, 0 ]);
Object.assign(s36, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -5, comptime comptime_float = -1, comptime comptime_float = -5}",
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
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s27,
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
      memory: { array: a43 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a44 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a45 },
              address: 1056360,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a46 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a47 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a48 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a45 },
              address: 1056360,
            },
          },
        },
      },
    },
  },
  slot: 84,
});
Object.assign(s37, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -5, comptime comptime_float = -1, comptime comptime_float = -5}",
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
  slot: 83,
});
const a49 = new Uint8Array([  ]);
const a50 = new Uint8Array([ 88, 30, 16, 0 ]);
const a51 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 20, 64 ]);
const a52 = new Uint8Array([ 96, 30, 16, 0 ]);
const a53 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a54 = new Uint8Array([ 88, 30, 16, 0 ]);
Object.assign(s38, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 5, comptime comptime_float = 1, comptime comptime_float = 5}",
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
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s27,
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
      memory: { array: a49 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a50 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a51 },
              address: 1056344,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a52 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a53 },
              address: 1056352,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a54 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a51 },
              address: 1056344,
            },
          },
        },
      },
    },
  },
  slot: 86,
});
Object.assign(s39, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 5, comptime comptime_float = 1, comptime comptime_float = 5}",
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
  slot: 85,
});
const a55 = new Uint8Array([  ]);
const a56 = new Uint8Array([ 80, 30, 16, 0 ]);
const a57 = new Uint8Array([ 80, 30, 16, 0 ]);
const a58 = new Uint8Array([ 80, 30, 16, 0 ]);
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
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s27,
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
      memory: { array: a55 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a56 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a24 },
              address: 1056336,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a57 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a24 },
              address: 1056336,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a58 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a24 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 88,
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
  slot: 87,
});
const a59 = new Uint8Array([  ]);
const a60 = new Uint8Array([ 170, 170, 170, 170 ]);
const a61 = new Uint8Array([ 170, 170, 170, 170 ]);
const a62 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s42, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -5, comptime comptime_float = -1, comptime comptime_float = -5} = .{-5, -1, -5}, comptime maxValue: struct{comptime comptime_float = 5, comptime comptime_float = 1, comptime comptime_float = 5} = .{5, 1, 5}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s25,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s37,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s39,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s41,
      },
    ],
    methods: [],
    template: {
      memory: { array: a59 },
      slots: {
        0: {
          structure: s37,
          memory: { array: a60 },
          slots: {
            0: {
              structure: s36,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s39,
          memory: { array: a61 },
          slots: {
            0: {
              structure: s38,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s41,
          memory: { array: a62 },
          slots: {
            0: {
              structure: s40,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 44,
});
Object.assign(s43, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -5, comptime comptime_float = -1, comptime comptime_float = -5} = .{-5, -1, -5}, comptime maxValue: struct{comptime comptime_float = 5, comptime comptime_float = 1, comptime comptime_float = 5} = .{5, 1, 5}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}}",
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
  slot: 43,
});
const a63 = new Uint8Array([  ]);
const a64 = new Uint8Array([ 16, 31, 16, 0 ]);
const a65 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 102, 192 ]);
const a66 = new Uint8Array([ 8, 31, 16, 0 ]);
const a67 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 102, 64 ]);
const a68 = new Uint8Array([ 80, 30, 16, 0 ]);
Object.assign(s44, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -180, comptime maxValue: comptime_float = 180, comptime defaultValue: comptime_float = 0}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s24,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s27,
      },
    ],
    methods: [],
    template: {
      memory: { array: a63 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a64 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a65 },
              address: 1056528,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a66 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a67 },
              address: 1056520,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a68 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a24 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 46,
});
Object.assign(s45, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -180, comptime maxValue: comptime_float = 180, comptime defaultValue: comptime_float = 0}",
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
  slot: 45,
});
const a69 = new Uint8Array([  ]);
const a70 = new Uint8Array([ 192, 30, 16, 0 ]);
const a71 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 36, 64 ]);
const a72 = new Uint8Array([ 144, 30, 16, 0 ]);
const a73 = new Uint8Array([ 0, 31, 16, 0 ]);
const a74 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 57, 64 ]);
Object.assign(s46, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 10, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 25}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s24,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s27,
      },
    ],
    methods: [],
    template: {
      memory: { array: a69 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a70 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a71 },
              address: 1056448,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a72 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a28 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a73 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a74 },
              address: 1056512,
            },
          },
        },
      },
    },
  },
  slot: 48,
});
Object.assign(s47, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 10, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 25}",
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
  slot: 47,
});
const a75 = new Uint8Array([  ]);
const a76 = new Uint8Array([ 96, 30, 16, 0 ]);
const a77 = new Uint8Array([ 192, 30, 16, 0 ]);
const a78 = new Uint8Array([ 248, 30, 16, 0 ]);
const a79 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 28, 64 ]);
Object.assign(s48, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 7}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s24,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s27,
      },
    ],
    methods: [],
    template: {
      memory: { array: a75 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a76 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a53 },
              address: 1056352,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a77 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a71 },
              address: 1056448,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a78 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a79 },
              address: 1056504,
            },
          },
        },
      },
    },
  },
  slot: 50,
});
Object.assign(s49, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 7}",
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
  slot: 49,
});
Object.assign(s50, {
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
        structure: s50,
      },
    ],
    methods: [],
    template: null
  },
  slot: 28,
});
Object.assign(s51, {
  ...s,
  type: 11,
  name: "*const bool",
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
  slot: 91,
});
const a80 = new Uint8Array([  ]);
const a81 = new Uint8Array([ 240, 30, 16, 0 ]);
const a82 = new Uint8Array([ 0 ]);
Object.assign(s52, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = false}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s50,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s51,
      },
    ],
    methods: [],
    template: {
      memory: { array: a80 },
      slots: {
        0: {
          structure: s51,
          memory: { array: a81 },
          slots: {
            0: {
              structure: s50,
              memory: { array: a82 },
              address: 1056496,
            },
          },
        },
      },
    },
  },
  slot: 52,
});
Object.assign(s53, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = false}",
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
  slot: 51,
});
const a83 = new Uint8Array([  ]);
const a84 = new Uint8Array([ 232, 30, 16, 0 ]);
const a85 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 185, 191 ]);
const a86 = new Uint8Array([ 96, 30, 16, 0 ]);
const a87 = new Uint8Array([ 224, 30, 16, 0 ]);
const a88 = new Uint8Array([ 195, 245, 40, 92, 143, 194, 213, 63 ]);
Object.assign(s54, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -0.1, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.34}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s24,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s27,
      },
    ],
    methods: [],
    template: {
      memory: { array: a83 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a84 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a85 },
              address: 1056488,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a86 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a53 },
              address: 1056352,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a87 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a88 },
              address: 1056480,
            },
          },
        },
      },
    },
  },
  slot: 54,
});
Object.assign(s55, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -0.1, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.34}",
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
  slot: 53,
});
const a89 = new Uint8Array([  ]);
const a90 = new Uint8Array([ 212, 30, 16, 0 ]);
const a91 = new Uint8Array([ 0, 0, 0, 0 ]);
const a92 = new Uint8Array([ 216, 30, 16, 0 ]);
const a93 = new Uint8Array([ 2, 0, 0, 0 ]);
const a94 = new Uint8Array([ 212, 30, 16, 0 ]);
Object.assign(s56, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 2, comptime defaultValue: comptime_int = 0}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s7,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s8,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s8,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s8,
      },
    ],
    methods: [],
    template: {
      memory: { array: a89 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a90 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a91 },
              address: 1056468,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a92 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a93 },
              address: 1056472,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a94 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a91 },
              address: 1056468,
            },
          },
        },
      },
    },
  },
  slot: 56,
});
Object.assign(s57, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 2, comptime defaultValue: comptime_int = 0}",
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
  slot: 55,
});
const a95 = new Uint8Array([  ]);
const a96 = new Uint8Array([ 208, 30, 16, 0 ]);
const a97 = new Uint8Array([ 1 ]);
Object.assign(s58, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = true}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s50,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s51,
      },
    ],
    methods: [],
    template: {
      memory: { array: a95 },
      slots: {
        0: {
          structure: s51,
          memory: { array: a96 },
          slots: {
            0: {
              structure: s50,
              memory: { array: a97 },
              address: 1056464,
            },
          },
        },
      },
    },
  },
  slot: 58,
});
Object.assign(s59, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = true}",
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
  slot: 57,
});
Object.assign(s60, {
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
        structure: s24,
      },
    ],
    methods: [],
    template: null
  },
  slot: 34,
});
const a98 = new Uint8Array([  ]);
const a99 = new Uint8Array([ 80, 30, 16, 0 ]);
const a100 = new Uint8Array([ 80, 30, 16, 0 ]);
Object.assign(s61, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0, comptime comptime_float = 0}",
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
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s27,
      },
    ],
    methods: [],
    template: {
      memory: { array: a98 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a99 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a24 },
              address: 1056336,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a100 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a24 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 93,
});
Object.assign(s62, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0, comptime comptime_float = 0}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s61,
      },
    ],
    methods: [],
    template: null
  },
  slot: 92,
});
const a101 = new Uint8Array([  ]);
const a102 = new Uint8Array([ 72, 30, 16, 0 ]);
const a103 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 86, 64 ]);
const a104 = new Uint8Array([ 64, 30, 16, 0 ]);
const a105 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 118, 64 ]);
Object.assign(s63, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 90, comptime comptime_float = 360}",
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
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s27,
      },
    ],
    methods: [],
    template: {
      memory: { array: a101 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a102 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a103 },
              address: 1056328,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a104 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a105 },
              address: 1056320,
            },
          },
        },
      },
    },
  },
  slot: 95,
});
Object.assign(s64, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 90, comptime comptime_float = 360}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s63,
      },
    ],
    methods: [],
    template: null
  },
  slot: 94,
});
const a106 = new Uint8Array([  ]);
const a107 = new Uint8Array([ 56, 30, 16, 0 ]);
const a108 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 44, 64 ]);
const a109 = new Uint8Array([ 48, 30, 16, 0 ]);
const a110 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 111, 64 ]);
Object.assign(s65, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 14, comptime comptime_float = 252}",
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
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s27,
      },
    ],
    methods: [],
    template: {
      memory: { array: a106 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a107 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a108 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a109 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a110 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 97,
});
Object.assign(s66, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 14, comptime comptime_float = 252}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s65,
      },
    ],
    methods: [],
    template: null
  },
  slot: 96,
});
const a111 = new Uint8Array([  ]);
const a112 = new Uint8Array([ 170, 170, 170, 170 ]);
const a113 = new Uint8Array([ 170, 170, 170, 170 ]);
const a114 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s67, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime maxValue: struct{comptime comptime_float = 90, comptime comptime_float = 360} = .{90, 360}, comptime defaultValue: struct{comptime comptime_float = 14, comptime comptime_float = 252} = .{14, 252}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s60,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s62,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s64,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s66,
      },
    ],
    methods: [],
    template: {
      memory: { array: a111 },
      slots: {
        0: {
          structure: s62,
          memory: { array: a112 },
          slots: {
            0: {
              structure: s61,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s64,
          memory: { array: a113 },
          slots: {
            0: {
              structure: s63,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s66,
          memory: { array: a114 },
          slots: {
            0: {
              structure: s65,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 60,
});
Object.assign(s68, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime maxValue: struct{comptime comptime_float = 90, comptime comptime_float = 360} = .{90, 360}, comptime defaultValue: struct{comptime comptime_float = 14, comptime comptime_float = 252} = .{14, 252}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s67,
      },
    ],
    methods: [],
    template: null
  },
  slot: 59,
});
const a115 = new Uint8Array([  ]);
const a116 = new Uint8Array([ 200, 30, 16, 0 ]);
const a117 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 224, 63 ]);
const a118 = new Uint8Array([ 192, 30, 16, 0 ]);
const a119 = new Uint8Array([ 184, 30, 16, 0 ]);
const a120 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 12, 64 ]);
Object.assign(s69, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0.5, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 3.5}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s24,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s27,
      },
    ],
    methods: [],
    template: {
      memory: { array: a115 },
      slots: {
        0: {
          structure: s27,
          memory: { array: a116 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a117 },
              address: 1056456,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a118 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a71 },
              address: 1056448,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a119 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a120 },
              address: 1056440,
            },
          },
        },
      },
    },
  },
  slot: 62,
});
Object.assign(s70, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0.5, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 3.5}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s69,
      },
    ],
    methods: [],
    template: null
  },
  slot: 61,
});
const a121 = new Uint8Array([  ]);
const a122 = new Uint8Array([ 170, 170, 170, 170 ]);
const a123 = new Uint8Array([ 170, 170, 170, 170 ]);
const a124 = new Uint8Array([ 170, 170, 170, 170 ]);
const a125 = new Uint8Array([ 170, 170, 170, 170 ]);
const a126 = new Uint8Array([ 170, 170, 170, 170 ]);
const a127 = new Uint8Array([ 170, 170, 170, 170 ]);
const a128 = new Uint8Array([ 170, 170, 170, 170 ]);
const a129 = new Uint8Array([ 170, 170, 170, 170 ]);
const a130 = new Uint8Array([ 170, 170, 170, 170 ]);
const a131 = new Uint8Array([ 170, 170, 170, 170 ]);
const a132 = new Uint8Array([ 170, 170, 170, 170 ]);
const a133 = new Uint8Array([ 170, 170, 170, 170 ]);
const a134 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s71, {
  ...s,
  type: 2,
  name: "struct{comptime size: struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 1000, comptime comptime_int = 1000} = .{1000, 1000}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}, comptime aeDisplayName: *const [17:0]u8 = \"Output image size\"} = .{.type = @Vector(2, i32), .minValue = .{100, 100}, .maxValue = .{1000, 1000}, .defaultValue = .{512, 512}, .aeDisplayName = \"Output image size\"}, comptime cameraPosition: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -100, comptime comptime_float = 0, comptime comptime_float = -100} = .{-100, 0, -100}, comptime maxValue: struct{comptime comptime_float = 100, comptime comptime_float = 20, comptime comptime_float = 100} = .{100, 20, 100}, comptime defaultValue: struct{comptime comptime_float = -6, comptime comptime_float = 4, comptime comptime_float = 6} = .{-6, 4, 6}} = .{.type = @Vector(3, f32), .minValue = .{-100, 0, -100}, .maxValue = .{100, 20, 100}, .defaultValue = .{-6, 4, 6}}, comptime cameraPositionFine: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -5, comptime comptime_float = -1, comptime comptime_float = -5} = .{-5, -1, -5}, comptime maxValue: struct{comptime comptime_float = 5, comptime comptime_float = 1, comptime comptime_float = 5} = .{5, 1, 5}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}} = .{.type = @Vector(3, f32), .minValue = .{-5, -1, -5}, .maxValue = .{5, 1, 5}, .defaultValue = .{0, 0, 0}}, comptime cameraRotation: struct{comptime type: type = f32, comptime minValue: comptime_float = -180, comptime maxValue: comptime_float = 180, comptime defaultValue: comptime_float = 0} = .{.type = f32, .minValue = -180, .maxValue = 180, .defaultValue = 0}, comptime terrainHorizon: struct{comptime type: type = f32, comptime minValue: comptime_float = 10, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 25} = .{.type = f32, .minValue = 10, .maxValue = 100, .defaultValue = 25}, comptime terrainDetail: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 7} = .{.type = f32, .minValue = 1, .maxValue = 10, .defaultValue = 7}, comptime buildings: struct{comptime type: type = bool, comptime defaultValue: bool = false} = .{.type = bool, .defaultValue = false}, comptime waterLevel: struct{comptime type: type = f32, comptime minValue: comptime_float = -0.1, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.34} = .{.type = f32, .minValue = -0.1, .maxValue = 1, .defaultValue = 0.34}, comptime sampling: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 2, comptime defaultValue: comptime_int = 0} = .{.type = i32, .minValue = 0, .maxValue = 2, .defaultValue = 0}, comptime shadows: struct{comptime type: type = bool, comptime defaultValue: bool = true} = .{.type = bool, .defaultValue = true}, comptime contours: struct{comptime type: type = bool, comptime defaultValue: bool = false} = .{.type = bool, .defaultValue = false}, comptime sun: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime maxValue: struct{comptime comptime_float = 90, comptime comptime_float = 360} = .{90, 360}, comptime defaultValue: struct{comptime comptime_float = 14, comptime comptime_float = 252} = .{14, 252}} = .{.type = @Vector(2, f32), .minValue = .{0, 0}, .maxValue = .{90, 360}, .defaultValue = .{14, 252}}, comptime terrainHeight: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.5, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 3.5} = .{.type = f32, .minValue = 0.5, .maxValue = 10, .defaultValue = 3.5}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "size",
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "cameraPosition",
        structure: s35,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "cameraPositionFine",
        structure: s43,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "cameraRotation",
        structure: s45,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "terrainHorizon",
        structure: s47,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "terrainDetail",
        structure: s49,
      },
      {
        ...m,
        type: 8,
        slot: 6,
        name: "buildings",
        structure: s53,
      },
      {
        ...m,
        type: 8,
        slot: 7,
        name: "waterLevel",
        structure: s55,
      },
      {
        ...m,
        type: 8,
        slot: 8,
        name: "sampling",
        structure: s57,
      },
      {
        ...m,
        type: 8,
        slot: 9,
        name: "shadows",
        structure: s59,
      },
      {
        ...m,
        type: 8,
        slot: 10,
        name: "contours",
        structure: s53,
      },
      {
        ...m,
        type: 8,
        slot: 11,
        name: "sun",
        structure: s68,
      },
      {
        ...m,
        type: 8,
        slot: 12,
        name: "terrainHeight",
        structure: s70,
      },
    ],
    methods: [],
    template: {
      memory: { array: a121 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a122 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s35,
          memory: { array: a123 },
          slots: {
            0: {
              structure: s34,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s43,
          memory: { array: a124 },
          slots: {
            0: {
              structure: s42,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s45,
          memory: { array: a125 },
          slots: {
            0: {
              structure: s44,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s47,
          memory: { array: a126 },
          slots: {
            0: {
              structure: s46,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s49,
          memory: { array: a127 },
          slots: {
            0: {
              structure: s48,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s53,
          memory: { array: a128 },
          slots: {
            0: {
              structure: s52,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        7: {
          structure: s55,
          memory: { array: a129 },
          slots: {
            0: {
              structure: s54,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        8: {
          structure: s57,
          memory: { array: a130 },
          slots: {
            0: {
              structure: s56,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        9: {
          structure: s59,
          memory: { array: a131 },
          slots: {
            0: {
              structure: s58,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        10: {
          structure: s53,
          memory: { array: a132 },
          slots: {
            0: {
              structure: s52,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        11: {
          structure: s68,
          memory: { array: a133 },
          slots: {
            0: {
              structure: s67,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        12: {
          structure: s70,
          memory: { array: a134 },
          slots: {
            0: {
              structure: s69,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 15,
});
Object.assign(s72, {
  ...s,
  type: 11,
  name: "*const struct{comptime size: struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 1000, comptime comptime_int = 1000} = .{1000, 1000}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}, comptime aeDisplayName: *const [17:0]u8 = \"Output image size\"} = .{.type = @Vector(2, i32), .minValue = .{100, 100}, .maxValue = .{1000, 1000}, .defaultValue = .{512, 512}, .aeDisplayName = \"Output image size\"}, comptime cameraPosition: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -100, comptime comptime_float = 0, comptime comptime_float = -100} = .{-100, 0, -100}, comptime maxValue: struct{comptime comptime_float = 100, comptime comptime_float = 20, comptime comptime_float = 100} = .{100, 20, 100}, comptime defaultValue: struct{comptime comptime_float = -6, comptime comptime_float = 4, comptime comptime_float = 6} = .{-6, 4, 6}} = .{.type = @Vector(3, f32), .minValue = .{-100, 0, -100}, .maxValue = .{100, 20, 100}, .defaultValue = .{-6, 4, 6}}, comptime cameraPositionFine: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -5, comptime comptime_float = -1, comptime comptime_float = -5} = .{-5, -1, -5}, comptime maxValue: struct{comptime comptime_float = 5, comptime comptime_float = 1, comptime comptime_float = 5} = .{5, 1, 5}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}} = .{.type = @Vector(3, f32), .minValue = .{-5, -1, -5}, .maxValue = .{5, 1, 5}, .defaultValue = .{0, 0, 0}}, comptime cameraRotation: struct{comptime type: type = f32, comptime minValue: comptime_float = -180, comptime maxValue: comptime_float = 180, comptime defaultValue: comptime_float = 0} = .{.type = f32, .minValue = -180, .maxValue = 180, .defaultValue = 0}, comptime terrainHorizon: struct{comptime type: type = f32, comptime minValue: comptime_float = 10, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 25} = .{.type = f32, .minValue = 10, .maxValue = 100, .defaultValue = 25}, comptime terrainDetail: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 7} = .{.type = f32, .minValue = 1, .maxValue = 10, .defaultValue = 7}, comptime buildings: struct{comptime type: type = bool, comptime defaultValue: bool = false} = .{.type = bool, .defaultValue = false}, comptime waterLevel: struct{comptime type: type = f32, comptime minValue: comptime_float = -0.1, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.34} = .{.type = f32, .minValue = -0.1, .maxValue = 1, .defaultValue = 0.34}, comptime sampling: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 2, comptime defaultValue: comptime_int = 0} = .{.type = i32, .minValue = 0, .maxValue = 2, .defaultValue = 0}, comptime shadows: struct{comptime type: type = bool, comptime defaultValue: bool = true} = .{.type = bool, .defaultValue = true}, comptime contours: struct{comptime type: type = bool, comptime defaultValue: bool = false} = .{.type = bool, .defaultValue = false}, comptime sun: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime maxValue: struct{comptime comptime_float = 90, comptime comptime_float = 360} = .{90, 360}, comptime defaultValue: struct{comptime comptime_float = 14, comptime comptime_float = 252} = .{14, 252}} = .{.type = @Vector(2, f32), .minValue = .{0, 0}, .maxValue = .{90, 360}, .defaultValue = .{14, 252}}, comptime terrainHeight: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.5, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 3.5} = .{.type = f32, .minValue = 0.5, .maxValue = 10, .defaultValue = 3.5}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s71,
      },
    ],
    methods: [],
    template: null
  },
  slot: 14,
});
const a135 = new Uint8Array([  ]);
Object.assign(s73, {
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
      memory: { array: a135 },
    },
  },
  slot: 17,
});
Object.assign(s74, {
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
        structure: s73,
      },
    ],
    methods: [],
    template: null
  },
  slot: 16,
});
const a136 = new Uint8Array([  ]);
const a137 = new Uint8Array([ 180, 30, 16, 0 ]);
const a138 = new Uint8Array([ 4, 0, 0, 0 ]);
Object.assign(s75, {
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
      memory: { array: a136 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a137 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a138 },
              address: 1056436,
            },
          },
        },
      },
    },
  },
  slot: 64,
});
Object.assign(s76, {
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
        structure: s75,
      },
    ],
    methods: [],
    template: null
  },
  slot: 63,
});
const a139 = new Uint8Array([  ]);
const a140 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s77, {
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
        structure: s76,
      },
    ],
    methods: [],
    template: {
      memory: { array: a139 },
      slots: {
        0: {
          structure: s76,
          memory: { array: a140 },
          slots: {
            0: {
              structure: s75,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 19,
});
Object.assign(s78, {
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
        structure: s77,
      },
    ],
    methods: [],
    template: null
  },
  slot: 18,
});
const a141 = new Uint8Array([  ]);
const a142 = new Uint8Array([  ]);
const a143 = new Uint8Array([ 48, 102, 16, 0 ]);
const a144 = new Uint8Array([ 238, 101, 16, 0 ]);
const a145 = new Uint8Array([ 99, 111, 109, 46, 115, 117, 98, 98, 108, 117, 101, 46, 102, 105, 108, 116, 101, 114, 115, 0 ]);
const a146 = new Uint8Array([ 44, 102, 16, 0 ]);
const a147 = new Uint8Array([ 216, 101, 16, 0 ]);
const a148 = new Uint8Array([ 84, 111, 109, 32, 66, 101, 100, 100, 97, 114, 100, 0 ]);
const a149 = new Uint8Array([ 40, 102, 16, 0 ]);
const a150 = new Uint8Array([ 1, 0, 0, 0 ]);
const a151 = new Uint8Array([ 36, 102, 16, 0 ]);
const a152 = new Uint8Array([ 162, 101, 16, 0 ]);
const a153 = new Uint8Array([ 76, 97, 110, 100, 115, 99, 97, 112, 101, 32, 114, 101, 110, 100, 101, 114, 105, 110, 103, 32, 117, 115, 105, 110, 103, 32, 114, 97, 121, 32, 109, 97, 114, 99, 104, 105, 110, 103, 0 ]);
const a154 = new Uint8Array([ 170, 170, 170, 170 ]);
const a155 = new Uint8Array([ 170, 170, 170, 170 ]);
const a156 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s79, {
  ...s,
  type: 2,
  name: "landscape.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a141 },
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
        structure: s11,
      },
      {
        ...m,
        type: 6,
        slot: 4,
        name: "parameters",
        structure: s72,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "inputImages",
        structure: s74,
      },
      {
        ...m,
        type: 6,
        slot: 6,
        name: "outputImages",
        structure: s78,
      },
    ],
    methods: [],
    template: {
      memory: { array: a142 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a143 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a144 },
              address: 1074736,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a145 },
                  address: 1074670,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a146 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a147 },
              address: 1074732,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a148 },
                  address: 1074648,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a149 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a150 },
              address: 1074728,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a151 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a152 },
              address: 1074724,
              slots: {
                0: {
                  structure: s9,
                  memory: { array: a153 },
                  address: 1074594,
                },
              },
            },
          },
        },
        4: {
          structure: s72,
          memory: { array: a154 },
          slots: {
            0: {
              structure: s71,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s74,
          memory: { array: a155 },
          slots: {
            0: {
              structure: s73,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s78,
          memory: { array: a156 },
          slots: {
            0: {
              structure: s77,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
const a157 = new Uint8Array([  ]);
Object.assign(s80, {
  ...s,
  type: 2,
  name: "landscape.KernelInput(u8,landscape.kernel)",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a157 },
    },
  },
  slot: 20,
});
Object.assign(s81, {
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
  slot: 25,
});
Object.assign(s82, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s81,
      },
    ],
    methods: [],
    template: null
  },
  slot: 24,
});
Object.assign(s83, {
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
        structure: s82,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s84, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s84,
      },
    ],
    methods: [],
    template: null
  },
  slot: 26,
});
const a158 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s85, {
  ...s,
  type: 9,
  name: "landscape.ColorSpace",
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
      memory: { array: a158 },
    },
  },
  slot: 27,
});
Object.assign(s86, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s86,
      },
    ],
    methods: [],
    template: null
  },
  slot: 29,
});
Object.assign(s87, {
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
        structure: s24,
      },
    ],
    methods: [],
    template: null
  },
  slot: 65,
});
const a159 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a160 = new Uint8Array([  ]);
const a161 = new Uint8Array([ 180, 30, 16, 0 ]);
Object.assign(s88, {
  ...s,
  type: 2,
  name: "landscape.Image(u8,4,true)",
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
        structure: s83,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s84,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s84,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s85,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s50,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s86,
      },
    ],
    methods: [],
    template: {
      memory: { array: a159 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s81,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s87,
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
      memory: { array: a160 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a161 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a138 },
              address: 1056436,
            },
          },
        },
      },
    },
  },
  slot: 22,
});
const a162 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a163 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a164 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a165 = new Uint8Array([  ]);
Object.assign(s89, {
  ...s,
  type: 2,
  name: "landscape.KernelOutput(u8,landscape.kernel)",
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
        structure: s88,
      },
    ],
    methods: [],
    template: {
      memory: { array: a162 },
      slots: {
        0: {
          structure: s88,
          memory: { array: a163 },
          slots: {
            0: {
              structure: s83,
              memory: { array: a164 },
              slots: {
                0: {
                  structure: s82,
                  memory: { array: a165 },
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 21,
});
const a166 = new Uint8Array([ 0, 0, 192, 192, 0, 0, 128, 64, 0, 0, 192, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 96, 65, 0, 0, 124, 67, 0, 0, 0, 0, 0, 0, 200, 65, 0, 0, 224, 64, 123, 20, 174, 62, 0, 0, 0, 0, 0, 0, 96, 64, 0, 1, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s90, {
  ...s,
  type: 2,
  name: "landscape.KernelParameters(landscape.kernel)",
  length: 1,
  byteSize: 80,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitOffset: 256,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        name: "size",
        structure: s12,
      },
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 96,
        byteSize: 16,
        slot: 1,
        name: "cameraPosition",
        structure: s25,
      },
      {
        ...m,
        type: 6,
        bitOffset: 128,
        bitSize: 96,
        byteSize: 16,
        slot: 2,
        name: "cameraPositionFine",
        structure: s25,
      },
      {
        ...m,
        type: 4,
        bitOffset: 384,
        slot: 3,
        name: "cameraRotation",
        structure: s24,
      },
      {
        ...m,
        type: 4,
        bitOffset: 416,
        slot: 4,
        name: "terrainHorizon",
        structure: s24,
      },
      {
        ...m,
        type: 4,
        bitOffset: 448,
        slot: 5,
        name: "terrainDetail",
        structure: s24,
      },
      {
        ...m,
        type: 1,
        bitOffset: 576,
        bitSize: 1,
        byteSize: 1,
        slot: 6,
        name: "buildings",
        structure: s50,
      },
      {
        ...m,
        type: 4,
        bitOffset: 480,
        slot: 7,
        name: "waterLevel",
        structure: s24,
      },
      {
        ...m,
        type: 2,
        bitOffset: 512,
        slot: 8,
        name: "sampling",
        structure: s7,
      },
      {
        ...m,
        type: 1,
        bitOffset: 584,
        bitSize: 1,
        byteSize: 1,
        slot: 9,
        name: "shadows",
        structure: s50,
      },
      {
        ...m,
        type: 1,
        bitOffset: 592,
        bitSize: 1,
        byteSize: 1,
        slot: 10,
        name: "contours",
        structure: s50,
      },
      {
        ...m,
        type: 6,
        bitOffset: 320,
        bitSize: 64,
        byteSize: 8,
        slot: 11,
        name: "sun",
        structure: s60,
      },
      {
        ...m,
        type: 4,
        bitOffset: 544,
        slot: 12,
        name: "terrainHeight",
        structure: s24,
      },
    ],
    methods: [],
    template: {
      memory: { array: a166 },
    },
  },
  slot: 30,
});
Object.assign(s91, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(landscape.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 66,
});
Object.assign(s92, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(landscape.createOutput)).Fn.return_type.?).ErrorUnion.error_set!landscape.KernelOutput(u8,landscape.kernel)",
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
        structure: s89,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s91,
      },
    ],
    methods: [],
    template: null
  },
  slot: 37,
});
Object.assign(s93, {
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
        structure: s84,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 672,
        slot: 1,
        name: "1",
        structure: s84,
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
        structure: s80,
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
        structure: s90,
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
        structure: s92,
      },
    ],
    methods: [],
    template: null
  },
  slot: 35,
});
Object.assign(s94, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(landscape.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 67,
});
Object.assign(s95, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(landscape.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!landscape.KernelOutput(u8,landscape.kernel)",
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
        structure: s89,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s94,
      },
    ],
    methods: [],
    template: null
  },
  slot: 38,
});
Object.assign(s96, {
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
        structure: s84,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 672,
        slot: 1,
        name: "1",
        structure: s84,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 704,
        slot: 2,
        name: "2",
        structure: s84,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 736,
        slot: 3,
        name: "3",
        structure: s84,
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
        structure: s80,
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
        structure: s90,
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
        structure: s95,
      },
    ],
    methods: [],
    template: null
  },
  slot: 36,
});
const f0 = {
  argStruct: s93,
  thunk: 7,
  name: "createOutput",
};
const f1 = {
  argStruct: s96,
  thunk: 2,
  name: "createPartialOutput",
};
Object.assign(s97, {
  ...s,
  type: 2,
  name: "landscape",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a165 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s79,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s80,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s89,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s90,
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
  s80, s81, s82, s83, s84, s85, s86, s87, s88, s89,
  s90, s91, s92, s93, s94, s95, s96, s97,
];
const linkage = finalizeStructures(structures);
const module = s97.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_e5231201;
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