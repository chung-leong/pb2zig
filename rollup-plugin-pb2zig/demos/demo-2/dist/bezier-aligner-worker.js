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
const s60 = {}, s61 = {}, s62 = {}, s63 = {}, s64 = {}, s65 = {}, s66 = {}, s67 = {}, s68 = {}, s69 = {};
const s70 = {}, s71 = {}, s72 = {}, s73 = {}, s74 = {}, s75 = {}, s76 = {}, s77 = {}, s78 = {}, s79 = {};
const s80 = {}, s81 = {}, s82 = {}, s83 = {}, s84 = {}, s85 = {}, s86 = {}, s87 = {}, s88 = {}, s89 = {};
const s90 = {}, s91 = {}, s92 = {}, s93 = {}, s94 = {}, s95 = {}, s96 = {}, s97 = {}, s98 = {}, s99 = {};
const s100 = {}, s101 = {}, s102 = {}, s103 = {}, s104 = {}, s105 = {}, s106 = {}, s107 = {}, s108 = {}, s109 = {};
const s110 = {}, s111 = {}, s112 = {}, s113 = {}, s114 = {}, s115 = {}, s116 = {}, s117 = {}, s118 = {}, s119 = {};
const s120 = {}, s121 = {}, s122 = {}, s123 = {}, s124 = {}, s125 = {};
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
  slot: 4,
});
Object.assign(s2, {
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
  slot: 8,
});
Object.assign(s5, {
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
  name: "[35:0]u8",
  length: 35,
  byteSize: 36,
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
  name: "*const [35:0]u8",
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
  name: "*const *const [35:0]u8",
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
  name: "f32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 0,
        structure: s12,
      },
    ],
    methods: [],
    template: null
  },
  slot: 34,
});
Object.assign(s13, {
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
        structure: s12,
      },
    ],
    methods: [],
    template: null
  },
  slot: 33,
});
Object.assign(s14, {
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
        structure: s14,
      },
    ],
    methods: [],
    template: null
  },
  slot: 96,
});
Object.assign(s15, {
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
        structure: s14,
      },
    ],
    methods: [],
    template: null
  },
  slot: 95,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 144, 30, 16, 0 ]);
const a2 = new Uint8Array([ 0, 0, 0, 0, 0, 192, 114, 192 ]);
const a3 = new Uint8Array([ 144, 30, 16, 0 ]);
Object.assign(s16, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -300, comptime comptime_float = -300}",
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
    ],
    methods: [],
    template: {
      memory: { array: a0 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a1 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a2 },
              address: 1056400,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a3 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a2 },
              address: 1056400,
            },
          },
        },
      },
    },
  },
  slot: 66,
});
Object.assign(s17, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -300, comptime comptime_float = -300}",
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
  slot: 65,
});
const a4 = new Uint8Array([  ]);
const a5 = new Uint8Array([ 136, 30, 16, 0 ]);
const a6 = new Uint8Array([ 0, 0, 0, 0, 0, 32, 140, 64 ]);
const a7 = new Uint8Array([ 136, 30, 16, 0 ]);
Object.assign(s18, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 900, comptime comptime_float = 900}",
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
    ],
    methods: [],
    template: {
      memory: { array: a4 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a5 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a6 },
              address: 1056392,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a7 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a6 },
              address: 1056392,
            },
          },
        },
      },
    },
  },
  slot: 68,
});
Object.assign(s19, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 900, comptime comptime_float = 900}",
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
  slot: 67,
});
const a8 = new Uint8Array([  ]);
const a9 = new Uint8Array([ 128, 30, 16, 0 ]);
const a10 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 73, 64 ]);
const a11 = new Uint8Array([ 96, 30, 16, 0 ]);
const a12 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 105, 64 ]);
Object.assign(s20, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 50, comptime comptime_float = 200}",
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
    ],
    methods: [],
    template: {
      memory: { array: a8 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a9 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a10 },
              address: 1056384,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a11 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a12 },
              address: 1056352,
            },
          },
        },
      },
    },
  },
  slot: 70,
});
Object.assign(s21, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 50, comptime comptime_float = 200}",
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
  slot: 69,
});
Object.assign(s22, {
  ...s,
  type: 1,
  name: "[31:0]u8",
  length: 31,
  byteSize: 32,
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
  slot: 73,
});
Object.assign(s23, {
  ...s,
  type: 11,
  name: "*const [31:0]u8",
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
  slot: 72,
});
Object.assign(s24, {
  ...s,
  type: 11,
  name: "*const *const [31:0]u8",
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
  slot: 71,
});
const a13 = new Uint8Array([  ]);
const a14 = new Uint8Array([ 170, 170, 170, 170 ]);
const a15 = new Uint8Array([  ]);
const a16 = new Uint8Array([ 170, 170, 170, 170 ]);
const a17 = new Uint8Array([ 170, 170, 170, 170 ]);
const a18 = new Uint8Array([ 196, 30, 16, 0 ]);
const a19 = new Uint8Array([ 57, 32, 16, 0 ]);
const a20 = new Uint8Array([ 115, 116, 97, 114, 116, 32, 112, 111, 105, 110, 116, 32, 102, 111, 114, 32, 98, 101, 122, 105, 101, 114, 32, 115, 101, 113, 117, 101, 110, 99, 101, 0 ]);
Object.assign(s25, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 50, comptime comptime_float = 200} = .{50, 200}, comptime description: *const [31:0]u8 = \"start point for bezier sequence\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s13,
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
        structure: s19,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s24,
      },
    ],
    methods: [],
    template: {
      memory: { array: a13 },
      slots: {
        0: {
          structure: s17,
          memory: { array: a14 },
          slots: {
            0: {
              structure: s16,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s19,
          memory: { array: a16 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a17 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s24,
          memory: { array: a18 },
          slots: {
            0: {
              structure: s23,
              memory: { array: a19 },
              address: 1056452,
              slots: {
                0: {
                  structure: s22,
                  memory: { array: a20 },
                  address: 1056825,
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
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 50, comptime comptime_float = 200} = .{50, 200}, comptime description: *const [31:0]u8 = \"start point for bezier sequence\"}",
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
const a21 = new Uint8Array([  ]);
const a22 = new Uint8Array([ 96, 30, 16, 0 ]);
const a23 = new Uint8Array([ 120, 30, 16, 0 ]);
const a24 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 89, 64 ]);
Object.assign(s27, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 200, comptime comptime_float = 100}",
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
    ],
    methods: [],
    template: {
      memory: { array: a21 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a22 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a12 },
              address: 1056352,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a23 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a24 },
              address: 1056376,
            },
          },
        },
      },
    },
  },
  slot: 75,
});
Object.assign(s28, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 200, comptime comptime_float = 100}",
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
  slot: 74,
});
Object.assign(s29, {
  ...s,
  type: 1,
  name: "[39:0]u8",
  length: 39,
  byteSize: 40,
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
  slot: 78,
});
Object.assign(s30, {
  ...s,
  type: 11,
  name: "*const [39:0]u8",
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
  slot: 77,
});
Object.assign(s31, {
  ...s,
  type: 11,
  name: "*const *const [39:0]u8",
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
  slot: 76,
});
const a25 = new Uint8Array([  ]);
const a26 = new Uint8Array([ 170, 170, 170, 170 ]);
const a27 = new Uint8Array([ 170, 170, 170, 170 ]);
const a28 = new Uint8Array([ 170, 170, 170, 170 ]);
const a29 = new Uint8Array([ 192, 30, 16, 0 ]);
const a30 = new Uint8Array([ 17, 32, 16, 0 ]);
const a31 = new Uint8Array([ 102, 105, 114, 115, 116, 32, 99, 111, 110, 116, 114, 111, 108, 32, 112, 111, 105, 110, 116, 32, 102, 111, 114, 32, 98, 101, 122, 105, 101, 114, 32, 115, 101, 113, 117, 101, 110, 99, 101, 0 ]);
Object.assign(s32, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 200, comptime comptime_float = 100} = .{200, 100}, comptime description: *const [39:0]u8 = \"first control point for bezier sequence\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s13,
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
        structure: s19,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s28,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s31,
      },
    ],
    methods: [],
    template: {
      memory: { array: a25 },
      slots: {
        0: {
          structure: s17,
          memory: { array: a26 },
          slots: {
            0: {
              structure: s16,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s19,
          memory: { array: a27 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s28,
          memory: { array: a28 },
          slots: {
            0: {
              structure: s27,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s31,
          memory: { array: a29 },
          slots: {
            0: {
              structure: s30,
              memory: { array: a30 },
              address: 1056448,
              slots: {
                0: {
                  structure: s29,
                  memory: { array: a31 },
                  address: 1056785,
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
Object.assign(s33, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 200, comptime comptime_float = 100} = .{200, 100}, comptime description: *const [39:0]u8 = \"first control point for bezier sequence\"}",
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
  slot: 42,
});
const a32 = new Uint8Array([  ]);
const a33 = new Uint8Array([ 112, 30, 16, 0 ]);
const a34 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 121, 64 ]);
const a35 = new Uint8Array([ 72, 30, 16, 0 ]);
const a36 = new Uint8Array([ 0, 0, 0, 0, 0, 192, 114, 64 ]);
Object.assign(s34, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 400, comptime comptime_float = 300}",
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
    ],
    methods: [],
    template: {
      memory: { array: a32 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a33 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a34 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a35 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a36 },
              address: 1056328,
            },
          },
        },
      },
    },
  },
  slot: 80,
});
Object.assign(s35, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 400, comptime comptime_float = 300}",
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
  slot: 79,
});
const a37 = new Uint8Array([  ]);
const a38 = new Uint8Array([ 170, 170, 170, 170 ]);
const a39 = new Uint8Array([ 170, 170, 170, 170 ]);
const a40 = new Uint8Array([ 170, 170, 170, 170 ]);
const a41 = new Uint8Array([ 192, 30, 16, 0 ]);
Object.assign(s36, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 400, comptime comptime_float = 300} = .{400, 300}, comptime description: *const [39:0]u8 = \"first control point for bezier sequence\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s13,
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
        structure: s19,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s35,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s31,
      },
    ],
    methods: [],
    template: {
      memory: { array: a37 },
      slots: {
        0: {
          structure: s17,
          memory: { array: a38 },
          slots: {
            0: {
              structure: s16,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s19,
          memory: { array: a39 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s35,
          memory: { array: a40 },
          slots: {
            0: {
              structure: s34,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s31,
          memory: { array: a41 },
          slots: {
            0: {
              structure: s30,
              memory: { array: a30 },
              address: 1056448,
              slots: {
                0: {
                  structure: s29,
                  memory: { array: a31 },
                  address: 1056785,
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
Object.assign(s37, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 400, comptime comptime_float = 300} = .{400, 300}, comptime description: *const [39:0]u8 = \"first control point for bezier sequence\"}",
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
  slot: 44,
});
const a42 = new Uint8Array([  ]);
const a43 = new Uint8Array([ 104, 30, 16, 0 ]);
const a44 = new Uint8Array([ 0, 0, 0, 0, 0, 48, 129, 64 ]);
const a45 = new Uint8Array([ 96, 30, 16, 0 ]);
Object.assign(s38, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 550, comptime comptime_float = 200}",
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
    ],
    methods: [],
    template: {
      memory: { array: a42 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a43 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a44 },
              address: 1056360,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a45 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a12 },
              address: 1056352,
            },
          },
        },
      },
    },
  },
  slot: 82,
});
Object.assign(s39, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 550, comptime comptime_float = 200}",
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
  slot: 81,
});
Object.assign(s40, {
  ...s,
  type: 1,
  name: "[29:0]u8",
  length: 29,
  byteSize: 30,
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
  slot: 85,
});
Object.assign(s41, {
  ...s,
  type: 11,
  name: "*const [29:0]u8",
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
  slot: 84,
});
Object.assign(s42, {
  ...s,
  type: 11,
  name: "*const *const [29:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s41,
      },
    ],
    methods: [],
    template: null
  },
  slot: 83,
});
const a46 = new Uint8Array([  ]);
const a47 = new Uint8Array([ 170, 170, 170, 170 ]);
const a48 = new Uint8Array([ 170, 170, 170, 170 ]);
const a49 = new Uint8Array([ 170, 170, 170, 170 ]);
const a50 = new Uint8Array([ 188, 30, 16, 0 ]);
const a51 = new Uint8Array([ 243, 31, 16, 0 ]);
const a52 = new Uint8Array([ 101, 110, 100, 32, 112, 111, 105, 110, 116, 32, 102, 111, 114, 32, 98, 101, 122, 105, 101, 114, 32, 115, 101, 113, 117, 101, 110, 99, 101, 0 ]);
Object.assign(s43, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 550, comptime comptime_float = 200} = .{550, 200}, comptime description: *const [29:0]u8 = \"end point for bezier sequence\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s13,
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
        structure: s19,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s39,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s42,
      },
    ],
    methods: [],
    template: {
      memory: { array: a46 },
      slots: {
        0: {
          structure: s17,
          memory: { array: a47 },
          slots: {
            0: {
              structure: s16,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s19,
          memory: { array: a48 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s39,
          memory: { array: a49 },
          slots: {
            0: {
              structure: s38,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s42,
          memory: { array: a50 },
          slots: {
            0: {
              structure: s41,
              memory: { array: a51 },
              address: 1056444,
              slots: {
                0: {
                  structure: s40,
                  memory: { array: a52 },
                  address: 1056755,
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
Object.assign(s44, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 550, comptime comptime_float = 200} = .{550, 200}, comptime description: *const [29:0]u8 = \"end point for bezier sequence\"}",
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
  slot: 46,
});
const a53 = new Uint8Array([  ]);
const a54 = new Uint8Array([ 88, 30, 16, 0 ]);
const a55 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 224, 63 ]);
const a56 = new Uint8Array([ 88, 30, 16, 0 ]);
Object.assign(s45, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.5, comptime comptime_float = 0.5}",
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
    ],
    methods: [],
    template: {
      memory: { array: a53 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a54 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a55 },
              address: 1056344,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a56 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a55 },
              address: 1056344,
            },
          },
        },
      },
    },
  },
  slot: 87,
});
Object.assign(s46, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.5, comptime comptime_float = 0.5}",
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
  slot: 86,
});
const a57 = new Uint8Array([  ]);
const a58 = new Uint8Array([ 80, 30, 16, 0 ]);
const a59 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 4, 64 ]);
const a60 = new Uint8Array([ 80, 30, 16, 0 ]);
Object.assign(s47, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 2.5, comptime comptime_float = 2.5}",
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
    ],
    methods: [],
    template: {
      memory: { array: a57 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a58 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a59 },
              address: 1056336,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a60 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a59 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 89,
});
Object.assign(s48, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 2.5, comptime comptime_float = 2.5}",
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
  slot: 88,
});
const a61 = new Uint8Array([  ]);
const a62 = new Uint8Array([ 48, 30, 16, 0 ]);
const a63 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a64 = new Uint8Array([ 48, 30, 16, 0 ]);
Object.assign(s49, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 1, comptime comptime_float = 1}",
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
    ],
    methods: [],
    template: {
      memory: { array: a61 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a62 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a63 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a64 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a63 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 91,
});
Object.assign(s50, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 1, comptime comptime_float = 1}",
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
  slot: 90,
});
Object.assign(s51, {
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
  slot: 94,
});
Object.assign(s52, {
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
        structure: s51,
      },
    ],
    methods: [],
    template: null
  },
  slot: 93,
});
Object.assign(s53, {
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
        structure: s52,
      },
    ],
    methods: [],
    template: null
  },
  slot: 92,
});
const a65 = new Uint8Array([  ]);
const a66 = new Uint8Array([ 170, 170, 170, 170 ]);
const a67 = new Uint8Array([ 170, 170, 170, 170 ]);
const a68 = new Uint8Array([ 170, 170, 170, 170 ]);
const a69 = new Uint8Array([ 184, 30, 16, 0 ]);
const a70 = new Uint8Array([ 218, 31, 16, 0 ]);
const a71 = new Uint8Array([ 83, 99, 97, 108, 101, 115, 32, 116, 104, 101, 32, 116, 101, 120, 116, 117, 114, 101, 32, 105, 109, 97, 103, 101, 0 ]);
Object.assign(s54, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = 0.5, comptime comptime_float = 0.5} = .{0.5, 0.5}, comptime maxValue: struct{comptime comptime_float = 2.5, comptime comptime_float = 2.5} = .{2.5, 2.5}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime description: *const [24:0]u8 = \"Scales the texture image\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s46,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s48,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s50,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s53,
      },
    ],
    methods: [],
    template: {
      memory: { array: a65 },
      slots: {
        0: {
          structure: s46,
          memory: { array: a66 },
          slots: {
            0: {
              structure: s45,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s48,
          memory: { array: a67 },
          slots: {
            0: {
              structure: s47,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s50,
          memory: { array: a68 },
          slots: {
            0: {
              structure: s49,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s53,
          memory: { array: a69 },
          slots: {
            0: {
              structure: s52,
              memory: { array: a70 },
              address: 1056440,
              slots: {
                0: {
                  structure: s51,
                  memory: { array: a71 },
                  address: 1056730,
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
Object.assign(s55, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = 0.5, comptime comptime_float = 0.5} = .{0.5, 0.5}, comptime maxValue: struct{comptime comptime_float = 2.5, comptime comptime_float = 2.5} = .{2.5, 2.5}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime description: *const [24:0]u8 = \"Scales the texture image\"}",
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
  slot: 48,
});
Object.assign(s56, {
  ...s,
  type: 1,
  name: "[42:0]u8",
  length: 42,
  byteSize: 43,
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
  slot: 99,
});
Object.assign(s57, {
  ...s,
  type: 11,
  name: "*const [42:0]u8",
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
  slot: 98,
});
Object.assign(s58, {
  ...s,
  type: 11,
  name: "*const *const [42:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s57,
      },
    ],
    methods: [],
    template: null
  },
  slot: 97,
});
const a72 = new Uint8Array([  ]);
const a73 = new Uint8Array([ 56, 30, 16, 0 ]);
const a74 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a75 = new Uint8Array([ 176, 30, 16, 0 ]);
const a76 = new Uint8Array([ 0, 0, 0, 0, 0, 64, 127, 64 ]);
const a77 = new Uint8Array([ 96, 30, 16, 0 ]);
const a78 = new Uint8Array([ 172, 30, 16, 0 ]);
const a79 = new Uint8Array([ 175, 31, 16, 0 ]);
const a80 = new Uint8Array([ 105, 109, 97, 103, 101, 119, 105, 100, 116, 104, 58, 32, 104, 111, 119, 32, 119, 105, 100, 101, 32, 116, 104, 101, 32, 114, 101, 112, 101, 97, 116, 105, 110, 103, 32, 112, 97, 114, 116, 32, 105, 115, 0 ]);
Object.assign(s59, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 500, comptime defaultValue: comptime_float = 200, comptime description: *const [42:0]u8 = \"imagewidth: how wide the repeating part is\"}",
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
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s58,
      },
    ],
    methods: [],
    template: {
      memory: { array: a72 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a73 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a74 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a75 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a76 },
              address: 1056432,
            },
          },
        },
        2: {
          structure: s15,
          memory: { array: a77 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a12 },
              address: 1056352,
            },
          },
        },
        3: {
          structure: s58,
          memory: { array: a78 },
          slots: {
            0: {
              structure: s57,
              memory: { array: a79 },
              address: 1056428,
              slots: {
                0: {
                  structure: s56,
                  memory: { array: a80 },
                  address: 1056687,
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
Object.assign(s60, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 500, comptime defaultValue: comptime_float = 200, comptime description: *const [42:0]u8 = \"imagewidth: how wide the repeating part is\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s59,
      },
    ],
    methods: [],
    template: null
  },
  slot: 50,
});
const a81 = new Uint8Array([  ]);
const a82 = new Uint8Array([ 72, 30, 16, 0 ]);
const a83 = new Uint8Array([ 72, 30, 16, 0 ]);
Object.assign(s61, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 300, comptime comptime_float = 300}",
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
    ],
    methods: [],
    template: {
      memory: { array: a81 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a82 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a36 },
              address: 1056328,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a83 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a36 },
              address: 1056328,
            },
          },
        },
      },
    },
  },
  slot: 101,
});
Object.assign(s62, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 300, comptime comptime_float = 300}",
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
  slot: 100,
});
const a84 = new Uint8Array([  ]);
const a85 = new Uint8Array([ 56, 30, 16, 0 ]);
const a86 = new Uint8Array([ 56, 30, 16, 0 ]);
Object.assign(s63, {
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
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s15,
      },
    ],
    methods: [],
    template: {
      memory: { array: a84 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a85 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a74 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a86 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a74 },
              address: 1056312,
            },
          },
        },
      },
    },
  },
  slot: 103,
});
Object.assign(s64, {
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
        structure: s63,
      },
    ],
    methods: [],
    template: null
  },
  slot: 102,
});
Object.assign(s65, {
  ...s,
  type: 1,
  name: "[87:0]u8",
  length: 87,
  byteSize: 88,
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
  slot: 106,
});
Object.assign(s66, {
  ...s,
  type: 11,
  name: "*const [87:0]u8",
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
  slot: 105,
});
Object.assign(s67, {
  ...s,
  type: 11,
  name: "*const *const [87:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s66,
      },
    ],
    methods: [],
    template: null
  },
  slot: 104,
});
const a87 = new Uint8Array([  ]);
const a88 = new Uint8Array([ 170, 170, 170, 170 ]);
const a89 = new Uint8Array([ 170, 170, 170, 170 ]);
const a90 = new Uint8Array([ 170, 170, 170, 170 ]);
const a91 = new Uint8Array([ 168, 30, 16, 0 ]);
const a92 = new Uint8Array([ 87, 31, 16, 0 ]);
const a93 = new Uint8Array([ 111, 102, 102, 115, 101, 116, 46, 120, 61, 68, 105, 115, 112, 108, 97, 99, 101, 109, 101, 110, 116, 32, 97, 108, 111, 110, 103, 32, 116, 104, 101, 32, 99, 117, 114, 118, 101, 44, 32, 111, 102, 102, 115, 101, 116, 46, 121, 61, 68, 105, 115, 112, 108, 97, 99, 101, 109, 101, 110, 116, 32, 112, 101, 114, 112, 101, 110, 100, 105, 99, 117, 108, 97, 114, 32, 116, 111, 32, 116, 104, 101, 32, 99, 117, 114, 118, 101, 0 ]);
Object.assign(s68, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 300, comptime comptime_float = 300} = .{300, 300}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [87:0]u8 = \"offset.x=Displacement along the curve, offset.y=Displacement perpendicular to the curve\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s13,
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
        structure: s62,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s64,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s67,
      },
    ],
    methods: [],
    template: {
      memory: { array: a87 },
      slots: {
        0: {
          structure: s17,
          memory: { array: a88 },
          slots: {
            0: {
              structure: s16,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s62,
          memory: { array: a89 },
          slots: {
            0: {
              structure: s61,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s64,
          memory: { array: a90 },
          slots: {
            0: {
              structure: s63,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s67,
          memory: { array: a91 },
          slots: {
            0: {
              structure: s66,
              memory: { array: a92 },
              address: 1056424,
              slots: {
                0: {
                  structure: s65,
                  memory: { array: a93 },
                  address: 1056599,
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
Object.assign(s69, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 300, comptime comptime_float = 300} = .{300, 300}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [87:0]u8 = \"offset.x=Displacement along the curve, offset.y=Displacement perpendicular to the curve\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s68,
      },
    ],
    methods: [],
    template: null
  },
  slot: 52,
});
Object.assign(s70, {
  ...s,
  type: 1,
  name: "[61:0]u8",
  length: 61,
  byteSize: 62,
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
  slot: 109,
});
Object.assign(s71, {
  ...s,
  type: 11,
  name: "*const [61:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s70,
      },
    ],
    methods: [],
    template: null
  },
  slot: 108,
});
Object.assign(s72, {
  ...s,
  type: 11,
  name: "*const *const [61:0]u8",
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
  slot: 107,
});
const a94 = new Uint8Array([  ]);
const a95 = new Uint8Array([ 56, 30, 16, 0 ]);
const a96 = new Uint8Array([ 48, 30, 16, 0 ]);
const a97 = new Uint8Array([ 56, 30, 16, 0 ]);
const a98 = new Uint8Array([ 164, 30, 16, 0 ]);
const a99 = new Uint8Array([ 25, 31, 16, 0 ]);
const a100 = new Uint8Array([ 116, 104, 101, 32, 100, 101, 102, 97, 117, 108, 116, 32, 48, 32, 109, 101, 97, 110, 115, 32, 116, 104, 97, 116, 32, 116, 104, 101, 32, 99, 117, 114, 118, 101, 32, 115, 116, 97, 114, 116, 115, 32, 102, 114, 111, 109, 32, 116, 104, 101, 32, 115, 116, 97, 114, 116, 112, 111, 105, 110, 116, 0 ]);
Object.assign(s73, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [61:0]u8 = \"the default 0 means that the curve starts from the startpoint\"}",
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
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s72,
      },
    ],
    methods: [],
    template: {
      memory: { array: a94 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a95 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a74 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a96 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a63 },
              address: 1056304,
            },
          },
        },
        2: {
          structure: s15,
          memory: { array: a97 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a74 },
              address: 1056312,
            },
          },
        },
        3: {
          structure: s72,
          memory: { array: a98 },
          slots: {
            0: {
              structure: s71,
              memory: { array: a99 },
              address: 1056420,
              slots: {
                0: {
                  structure: s70,
                  memory: { array: a100 },
                  address: 1056537,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 55,
});
Object.assign(s74, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [61:0]u8 = \"the default 0 means that the curve starts from the startpoint\"}",
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
  slot: 54,
});
Object.assign(s75, {
  ...s,
  type: 1,
  name: "[55:0]u8",
  length: 55,
  byteSize: 56,
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
  slot: 112,
});
Object.assign(s76, {
  ...s,
  type: 11,
  name: "*const [55:0]u8",
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
  slot: 111,
});
Object.assign(s77, {
  ...s,
  type: 11,
  name: "*const *const [55:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s76,
      },
    ],
    methods: [],
    template: null
  },
  slot: 110,
});
const a101 = new Uint8Array([  ]);
const a102 = new Uint8Array([ 56, 30, 16, 0 ]);
const a103 = new Uint8Array([ 48, 30, 16, 0 ]);
const a104 = new Uint8Array([ 48, 30, 16, 0 ]);
const a105 = new Uint8Array([ 160, 30, 16, 0 ]);
const a106 = new Uint8Array([ 225, 30, 16, 0 ]);
const a107 = new Uint8Array([ 116, 104, 101, 32, 100, 101, 102, 97, 117, 108, 116, 32, 49, 32, 109, 101, 97, 110, 115, 32, 116, 104, 97, 116, 32, 116, 104, 101, 32, 99, 117, 114, 118, 101, 32, 101, 110, 100, 115, 32, 97, 116, 32, 116, 104, 101, 32, 101, 110, 100, 112, 111, 105, 110, 116, 0 ]);
Object.assign(s78, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [55:0]u8 = \"the default 1 means that the curve ends at the endpoint\"}",
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
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s15,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s77,
      },
    ],
    methods: [],
    template: {
      memory: { array: a101 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a102 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a74 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a103 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a63 },
              address: 1056304,
            },
          },
        },
        2: {
          structure: s15,
          memory: { array: a104 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a63 },
              address: 1056304,
            },
          },
        },
        3: {
          structure: s77,
          memory: { array: a105 },
          slots: {
            0: {
              structure: s76,
              memory: { array: a106 },
              address: 1056416,
              slots: {
                0: {
                  structure: s75,
                  memory: { array: a107 },
                  address: 1056481,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 57,
});
Object.assign(s79, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [55:0]u8 = \"the default 1 means that the curve ends at the endpoint\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s78,
      },
    ],
    methods: [],
    template: null
  },
  slot: 56,
});
Object.assign(s80, {
  ...s,
  type: 1,
  name: "[2]@Vector(2, f32)",
  length: 2,
  byteSize: 16,
  align: 3,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitSize: 64,
        byteSize: 8,
        structure: s13,
      },
    ],
    methods: [],
    template: null
  },
  slot: 35,
});
const a108 = new Uint8Array([  ]);
const a109 = new Uint8Array([ 64, 30, 16, 0 ]);
const a110 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 191 ]);
const a111 = new Uint8Array([ 64, 30, 16, 0 ]);
Object.assign(s81, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -1, comptime comptime_float = -1}",
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
    ],
    methods: [],
    template: {
      memory: { array: a108 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a109 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a110 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a111 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a110 },
              address: 1056320,
            },
          },
        },
      },
    },
  },
  slot: 120,
});
Object.assign(s82, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -1, comptime comptime_float = -1}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s81,
      },
    ],
    methods: [],
    template: null
  },
  slot: 119,
});
const a112 = new Uint8Array([  ]);
const a113 = new Uint8Array([ 170, 170, 170, 170 ]);
const a114 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s83, {
  ...s,
  type: 2,
  name: "struct{comptime struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}}",
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
        structure: s82,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s82,
      },
    ],
    methods: [],
    template: {
      memory: { array: a112 },
      slots: {
        0: {
          structure: s82,
          memory: { array: a113 },
          slots: {
            0: {
              structure: s81,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s82,
          memory: { array: a114 },
          slots: {
            0: {
              structure: s81,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 114,
});
Object.assign(s84, {
  ...s,
  type: 11,
  name: "*const struct{comptime struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s83,
      },
    ],
    methods: [],
    template: null
  },
  slot: 113,
});
const a115 = new Uint8Array([  ]);
const a116 = new Uint8Array([ 170, 170, 170, 170 ]);
const a117 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s85, {
  ...s,
  type: 2,
  name: "struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}}",
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
        structure: s50,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s50,
      },
    ],
    methods: [],
    template: {
      memory: { array: a115 },
      slots: {
        0: {
          structure: s50,
          memory: { array: a116 },
          slots: {
            0: {
              structure: s49,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s50,
          memory: { array: a117 },
          slots: {
            0: {
              structure: s49,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 116,
});
Object.assign(s86, {
  ...s,
  type: 11,
  name: "*const struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s85,
      },
    ],
    methods: [],
    template: null
  },
  slot: 115,
});
const a118 = new Uint8Array([  ]);
const a119 = new Uint8Array([ 48, 30, 16, 0 ]);
const a120 = new Uint8Array([ 56, 30, 16, 0 ]);
Object.assign(s87, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 1, comptime comptime_float = 0}",
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
    ],
    methods: [],
    template: {
      memory: { array: a118 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a119 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a63 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a120 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a74 },
              address: 1056312,
            },
          },
        },
      },
    },
  },
  slot: 122,
});
Object.assign(s88, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 1, comptime comptime_float = 0}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s87,
      },
    ],
    methods: [],
    template: null
  },
  slot: 121,
});
const a121 = new Uint8Array([  ]);
const a122 = new Uint8Array([ 56, 30, 16, 0 ]);
const a123 = new Uint8Array([ 48, 30, 16, 0 ]);
Object.assign(s89, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0, comptime comptime_float = 1}",
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
    ],
    methods: [],
    template: {
      memory: { array: a121 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a122 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a74 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s15,
          memory: { array: a123 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a63 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 124,
});
Object.assign(s90, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0, comptime comptime_float = 1}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s89,
      },
    ],
    methods: [],
    template: null
  },
  slot: 123,
});
const a124 = new Uint8Array([  ]);
const a125 = new Uint8Array([ 170, 170, 170, 170 ]);
const a126 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s91, {
  ...s,
  type: 2,
  name: "struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 0} = .{1, 0}, comptime struct{comptime comptime_float = 0, comptime comptime_float = 1} = .{0, 1}}",
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
        structure: s88,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s90,
      },
    ],
    methods: [],
    template: {
      memory: { array: a124 },
      slots: {
        0: {
          structure: s88,
          memory: { array: a125 },
          slots: {
            0: {
              structure: s87,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s90,
          memory: { array: a126 },
          slots: {
            0: {
              structure: s89,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 118,
});
Object.assign(s92, {
  ...s,
  type: 11,
  name: "*const struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 0} = .{1, 0}, comptime struct{comptime comptime_float = 0, comptime comptime_float = 1} = .{0, 1}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s91,
      },
    ],
    methods: [],
    template: null
  },
  slot: 117,
});
const a127 = new Uint8Array([  ]);
const a128 = new Uint8Array([ 170, 170, 170, 170 ]);
const a129 = new Uint8Array([ 170, 170, 170, 170 ]);
const a130 = new Uint8Array([ 170, 170, 170, 170 ]);
const a131 = new Uint8Array([ 156, 30, 16, 0 ]);
const a132 = new Uint8Array([ 200, 30, 16, 0 ]);
const a133 = new Uint8Array([ 82, 111, 116, 97, 116, 105, 111, 110, 32, 97, 114, 111, 117, 110, 100, 32, 116, 104, 101, 32, 97, 120, 105, 115, 0 ]);
Object.assign(s93, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = [2]@Vector(2, f32), comptime minValue: struct{comptime struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}} = .{.{-1, -1}, .{-1, -1}}, comptime maxValue: struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}} = .{.{1, 1}, .{1, 1}}, comptime defaultValue: struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 0} = .{1, 0}, comptime struct{comptime comptime_float = 0, comptime comptime_float = 1} = .{0, 1}} = .{.{1, 0}, .{0, 1}}, comptime description: *const [24:0]u8 = \"Rotation around the axis\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s80,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s84,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s86,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s92,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s53,
      },
    ],
    methods: [],
    template: {
      memory: { array: a127 },
      slots: {
        0: {
          structure: s84,
          memory: { array: a128 },
          slots: {
            0: {
              structure: s83,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s86,
          memory: { array: a129 },
          slots: {
            0: {
              structure: s85,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s92,
          memory: { array: a130 },
          slots: {
            0: {
              structure: s91,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s53,
          memory: { array: a131 },
          slots: {
            0: {
              structure: s52,
              memory: { array: a132 },
              address: 1056412,
              slots: {
                0: {
                  structure: s51,
                  memory: { array: a133 },
                  address: 1056456,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 59,
});
Object.assign(s94, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = [2]@Vector(2, f32), comptime minValue: struct{comptime struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}} = .{.{-1, -1}, .{-1, -1}}, comptime maxValue: struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}} = .{.{1, 1}, .{1, 1}}, comptime defaultValue: struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 0} = .{1, 0}, comptime struct{comptime comptime_float = 0, comptime comptime_float = 1} = .{0, 1}} = .{.{1, 0}, .{0, 1}}, comptime description: *const [24:0]u8 = \"Rotation around the axis\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s93,
      },
    ],
    methods: [],
    template: null
  },
  slot: 58,
});
const a134 = new Uint8Array([  ]);
const a135 = new Uint8Array([ 170, 170, 170, 170 ]);
const a136 = new Uint8Array([ 170, 170, 170, 170 ]);
const a137 = new Uint8Array([ 170, 170, 170, 170 ]);
const a138 = new Uint8Array([ 170, 170, 170, 170 ]);
const a139 = new Uint8Array([ 170, 170, 170, 170 ]);
const a140 = new Uint8Array([ 170, 170, 170, 170 ]);
const a141 = new Uint8Array([ 170, 170, 170, 170 ]);
const a142 = new Uint8Array([ 170, 170, 170, 170 ]);
const a143 = new Uint8Array([ 170, 170, 170, 170 ]);
const a144 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s95, {
  ...s,
  type: 2,
  name: "struct{comptime startpoint: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 50, comptime comptime_float = 200} = .{50, 200}, comptime description: *const [31:0]u8 = \"start point for bezier sequence\"} = .{.type = @Vector(2, f32), .minValue = .{-300, -300}, .maxValue = .{900, 900}, .defaultValue = .{50, 200}, .description = \"start point for bezier sequence\"}, comptime control1: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 200, comptime comptime_float = 100} = .{200, 100}, comptime description: *const [39:0]u8 = \"first control point for bezier sequence\"} = .{.type = @Vector(2, f32), .minValue = .{-300, -300}, .maxValue = .{900, 900}, .defaultValue = .{200, 100}, .description = \"first control point for bezier sequence\"}, comptime control2: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 400, comptime comptime_float = 300} = .{400, 300}, comptime description: *const [39:0]u8 = \"first control point for bezier sequence\"} = .{.type = @Vector(2, f32), .minValue = .{-300, -300}, .maxValue = .{900, 900}, .defaultValue = .{400, 300}, .description = \"first control point for bezier sequence\"}, comptime endpoint: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 550, comptime comptime_float = 200} = .{550, 200}, comptime description: *const [29:0]u8 = \"end point for bezier sequence\"} = .{.type = @Vector(2, f32), .minValue = .{-300, -300}, .maxValue = .{900, 900}, .defaultValue = .{550, 200}, .description = \"end point for bezier sequence\"}, comptime scale: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = 0.5, comptime comptime_float = 0.5} = .{0.5, 0.5}, comptime maxValue: struct{comptime comptime_float = 2.5, comptime comptime_float = 2.5} = .{2.5, 2.5}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime description: *const [24:0]u8 = \"Scales the texture image\"} = .{.type = @Vector(2, f32), .minValue = .{0.5, 0.5}, .maxValue = .{2.5, 2.5}, .defaultValue = .{1, 1}, .description = \"Scales the texture image\"}, comptime imagewidth: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 500, comptime defaultValue: comptime_float = 200, comptime description: *const [42:0]u8 = \"imagewidth: how wide the repeating part is\"} = .{.type = f32, .minValue = 0, .maxValue = 500, .defaultValue = 200, .description = \"imagewidth: how wide the repeating part is\"}, comptime offset: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 300, comptime comptime_float = 300} = .{300, 300}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [87:0]u8 = \"offset.x=Displacement along the curve, offset.y=Displacement perpendicular to the curve\"} = .{.type = @Vector(2, f32), .minValue = .{-300, -300}, .maxValue = .{300, 300}, .defaultValue = .{0, 0}, .description = \"offset.x=Displacement along the curve, offset.y=Displacement perpendicular to the curve\"}, comptime tstart: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [61:0]u8 = \"the default 0 means that the curve starts from the startpoint\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0, .description = \"the default 0 means that the curve starts from the startpoint\"}, comptime tend: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [55:0]u8 = \"the default 1 means that the curve ends at the endpoint\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 1, .description = \"the default 1 means that the curve ends at the endpoint\"}, comptime rotation: struct{comptime type: type = [2]@Vector(2, f32), comptime minValue: struct{comptime struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}} = .{.{-1, -1}, .{-1, -1}}, comptime maxValue: struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}} = .{.{1, 1}, .{1, 1}}, comptime defaultValue: struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 0} = .{1, 0}, comptime struct{comptime comptime_float = 0, comptime comptime_float = 1} = .{0, 1}} = .{.{1, 0}, .{0, 1}}, comptime description: *const [24:0]u8 = \"Rotation around the axis\"} = .{.type = [2]@Vector(2, f32), .minValue = .{.{-1, -1}, .{-1, -1}}, .maxValue = .{.{1, 1}, .{1, 1}}, .defaultValue = .{.{1, 0}, .{0, 1}}, .description = \"Rotation around the axis\"}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "startpoint",
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "control1",
        structure: s33,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "control2",
        structure: s37,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "endpoint",
        structure: s44,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "scale",
        structure: s55,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "imagewidth",
        structure: s60,
      },
      {
        ...m,
        type: 8,
        slot: 6,
        name: "offset",
        structure: s69,
      },
      {
        ...m,
        type: 8,
        slot: 7,
        name: "tstart",
        structure: s74,
      },
      {
        ...m,
        type: 8,
        slot: 8,
        name: "tend",
        structure: s79,
      },
      {
        ...m,
        type: 8,
        slot: 9,
        name: "rotation",
        structure: s94,
      },
    ],
    methods: [],
    template: {
      memory: { array: a134 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a135 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s33,
          memory: { array: a136 },
          slots: {
            0: {
              structure: s32,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s37,
          memory: { array: a137 },
          slots: {
            0: {
              structure: s36,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s44,
          memory: { array: a138 },
          slots: {
            0: {
              structure: s43,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s55,
          memory: { array: a139 },
          slots: {
            0: {
              structure: s54,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s60,
          memory: { array: a140 },
          slots: {
            0: {
              structure: s59,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s69,
          memory: { array: a141 },
          slots: {
            0: {
              structure: s68,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        7: {
          structure: s74,
          memory: { array: a142 },
          slots: {
            0: {
              structure: s73,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        8: {
          structure: s79,
          memory: { array: a143 },
          slots: {
            0: {
              structure: s78,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        9: {
          structure: s94,
          memory: { array: a144 },
          slots: {
            0: {
              structure: s93,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 15,
});
Object.assign(s96, {
  ...s,
  type: 11,
  name: "*const struct{comptime startpoint: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 50, comptime comptime_float = 200} = .{50, 200}, comptime description: *const [31:0]u8 = \"start point for bezier sequence\"} = .{.type = @Vector(2, f32), .minValue = .{-300, -300}, .maxValue = .{900, 900}, .defaultValue = .{50, 200}, .description = \"start point for bezier sequence\"}, comptime control1: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 200, comptime comptime_float = 100} = .{200, 100}, comptime description: *const [39:0]u8 = \"first control point for bezier sequence\"} = .{.type = @Vector(2, f32), .minValue = .{-300, -300}, .maxValue = .{900, 900}, .defaultValue = .{200, 100}, .description = \"first control point for bezier sequence\"}, comptime control2: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 400, comptime comptime_float = 300} = .{400, 300}, comptime description: *const [39:0]u8 = \"first control point for bezier sequence\"} = .{.type = @Vector(2, f32), .minValue = .{-300, -300}, .maxValue = .{900, 900}, .defaultValue = .{400, 300}, .description = \"first control point for bezier sequence\"}, comptime endpoint: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 900, comptime comptime_float = 900} = .{900, 900}, comptime defaultValue: struct{comptime comptime_float = 550, comptime comptime_float = 200} = .{550, 200}, comptime description: *const [29:0]u8 = \"end point for bezier sequence\"} = .{.type = @Vector(2, f32), .minValue = .{-300, -300}, .maxValue = .{900, 900}, .defaultValue = .{550, 200}, .description = \"end point for bezier sequence\"}, comptime scale: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = 0.5, comptime comptime_float = 0.5} = .{0.5, 0.5}, comptime maxValue: struct{comptime comptime_float = 2.5, comptime comptime_float = 2.5} = .{2.5, 2.5}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime description: *const [24:0]u8 = \"Scales the texture image\"} = .{.type = @Vector(2, f32), .minValue = .{0.5, 0.5}, .maxValue = .{2.5, 2.5}, .defaultValue = .{1, 1}, .description = \"Scales the texture image\"}, comptime imagewidth: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 500, comptime defaultValue: comptime_float = 200, comptime description: *const [42:0]u8 = \"imagewidth: how wide the repeating part is\"} = .{.type = f32, .minValue = 0, .maxValue = 500, .defaultValue = 200, .description = \"imagewidth: how wide the repeating part is\"}, comptime offset: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -300, comptime comptime_float = -300} = .{-300, -300}, comptime maxValue: struct{comptime comptime_float = 300, comptime comptime_float = 300} = .{300, 300}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [87:0]u8 = \"offset.x=Displacement along the curve, offset.y=Displacement perpendicular to the curve\"} = .{.type = @Vector(2, f32), .minValue = .{-300, -300}, .maxValue = .{300, 300}, .defaultValue = .{0, 0}, .description = \"offset.x=Displacement along the curve, offset.y=Displacement perpendicular to the curve\"}, comptime tstart: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [61:0]u8 = \"the default 0 means that the curve starts from the startpoint\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0, .description = \"the default 0 means that the curve starts from the startpoint\"}, comptime tend: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [55:0]u8 = \"the default 1 means that the curve ends at the endpoint\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 1, .description = \"the default 1 means that the curve ends at the endpoint\"}, comptime rotation: struct{comptime type: type = [2]@Vector(2, f32), comptime minValue: struct{comptime struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}} = .{.{-1, -1}, .{-1, -1}}, comptime maxValue: struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}} = .{.{1, 1}, .{1, 1}}, comptime defaultValue: struct{comptime struct{comptime comptime_float = 1, comptime comptime_float = 0} = .{1, 0}, comptime struct{comptime comptime_float = 0, comptime comptime_float = 1} = .{0, 1}} = .{.{1, 0}, .{0, 1}}, comptime description: *const [24:0]u8 = \"Rotation around the axis\"} = .{.type = [2]@Vector(2, f32), .minValue = .{.{-1, -1}, .{-1, -1}}, .maxValue = .{.{1, 1}, .{1, 1}}, .defaultValue = .{.{1, 0}, .{0, 1}}, .description = \"Rotation around the axis\"}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s95,
      },
    ],
    methods: [],
    template: null
  },
  slot: 14,
});
const a145 = new Uint8Array([  ]);
const a146 = new Uint8Array([ 152, 30, 16, 0 ]);
const a147 = new Uint8Array([ 4, 0, 0, 0 ]);
Object.assign(s97, {
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
      memory: { array: a145 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a146 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a147 },
              address: 1056408,
            },
          },
        },
      },
    },
  },
  slot: 61,
});
Object.assign(s98, {
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
        structure: s97,
      },
    ],
    methods: [],
    template: null
  },
  slot: 60,
});
const a148 = new Uint8Array([  ]);
const a149 = new Uint8Array([ 170, 170, 170, 170 ]);
const a150 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s99, {
  ...s,
  type: 2,
  name: "struct{comptime background: struct{comptime channels: comptime_int = 4} = .{.channels = 4}, comptime texture: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "background",
        structure: s98,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "texture",
        structure: s98,
      },
    ],
    methods: [],
    template: {
      memory: { array: a148 },
      slots: {
        0: {
          structure: s98,
          memory: { array: a149 },
          slots: {
            0: {
              structure: s97,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s98,
          memory: { array: a150 },
          slots: {
            0: {
              structure: s97,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 17,
});
Object.assign(s100, {
  ...s,
  type: 11,
  name: "*const struct{comptime background: struct{comptime channels: comptime_int = 4} = .{.channels = 4}, comptime texture: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s99,
      },
    ],
    methods: [],
    template: null
  },
  slot: 16,
});
const a151 = new Uint8Array([  ]);
const a152 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s101, {
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
        structure: s98,
      },
    ],
    methods: [],
    template: {
      memory: { array: a151 },
      slots: {
        0: {
          structure: s98,
          memory: { array: a152 },
          slots: {
            0: {
              structure: s97,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 19,
});
Object.assign(s102, {
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
        structure: s101,
      },
    ],
    methods: [],
    template: null
  },
  slot: 18,
});
const a153 = new Uint8Array([  ]);
const a154 = new Uint8Array([  ]);
const a155 = new Uint8Array([ 116, 136, 16, 0 ]);
const a156 = new Uint8Array([ 12, 136, 16, 0 ]);
const a157 = new Uint8Array([ 66, 101, 122, 105, 101, 114, 65, 108, 105, 103, 110, 101, 114, 0 ]);
const a158 = new Uint8Array([ 112, 136, 16, 0 ]);
const a159 = new Uint8Array([ 243, 135, 16, 0 ]);
const a160 = new Uint8Array([ 80, 101, 116, 114, 105, 32, 76, 101, 115, 107, 105, 110, 101, 110, 0 ]);
const a161 = new Uint8Array([ 108, 136, 16, 0 ]);
const a162 = new Uint8Array([ 1, 0, 0, 0 ]);
const a163 = new Uint8Array([ 104, 136, 16, 0 ]);
const a164 = new Uint8Array([ 192, 135, 16, 0 ]);
const a165 = new Uint8Array([ 68, 114, 97, 119, 115, 32, 97, 110, 32, 73, 109, 97, 103, 101, 32, 97, 108, 111, 110, 103, 32, 97, 32, 66, 101, 122, 105, 101, 114, 32, 67, 117, 114, 118, 101, 0 ]);
const a166 = new Uint8Array([ 170, 170, 170, 170 ]);
const a167 = new Uint8Array([ 170, 170, 170, 170 ]);
const a168 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s103, {
  ...s,
  type: 2,
  name: "bezier-aligner.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a153 },
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
        structure: s96,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "inputImages",
        structure: s100,
      },
      {
        ...m,
        type: 6,
        slot: 6,
        name: "outputImages",
        structure: s102,
      },
    ],
    methods: [],
    template: {
      memory: { array: a154 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a155 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a156 },
              address: 1083508,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a157 },
                  address: 1083404,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a158 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a159 },
              address: 1083504,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a160 },
                  address: 1083379,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a161 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a162 },
              address: 1083500,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a163 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a164 },
              address: 1083496,
              slots: {
                0: {
                  structure: s9,
                  memory: { array: a165 },
                  address: 1083328,
                },
              },
            },
          },
        },
        4: {
          structure: s96,
          memory: { array: a166 },
          slots: {
            0: {
              structure: s95,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s100,
          memory: { array: a167 },
          slots: {
            0: {
              structure: s99,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s102,
          memory: { array: a168 },
          slots: {
            0: {
              structure: s101,
              memory: { array: a15 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
Object.assign(s104, {
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
  slot: 24,
});
Object.assign(s105, {
  ...s,
  type: 12,
  name: "[_]const @Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s104,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s106, {
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
        structure: s105,
      },
    ],
    methods: [],
    template: null
  },
  slot: 22,
});
Object.assign(s107, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s107,
      },
    ],
    methods: [],
    template: null
  },
  slot: 25,
});
const a169 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s108, {
  ...s,
  type: 9,
  name: "bezier-aligner.ColorSpace",
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
      memory: { array: a169 },
    },
  },
  slot: 26,
});
Object.assign(s109, {
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
        structure: s109,
      },
    ],
    methods: [],
    template: null
  },
  slot: 27,
});
Object.assign(s110, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s110,
      },
    ],
    methods: [],
    template: null
  },
  slot: 28,
});
Object.assign(s111, {
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
        structure: s12,
      },
    ],
    methods: [],
    template: null
  },
  slot: 62,
});
const a170 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a171 = new Uint8Array([  ]);
const a172 = new Uint8Array([ 152, 30, 16, 0 ]);
Object.assign(s112, {
  ...s,
  type: 2,
  name: "bezier-aligner.Image(u8,4,false)",
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
        structure: s106,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s107,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s107,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s108,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s109,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s110,
      },
    ],
    methods: [],
    template: {
      memory: { array: a170 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s104,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s111,
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
      memory: { array: a171 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a172 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a147 },
              address: 1056408,
            },
          },
        },
      },
    },
  },
  slot: 21,
});
const a173 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a174 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a175 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a176 = new Uint8Array([  ]);
const a177 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a178 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s113, {
  ...s,
  type: 2,
  name: "bezier-aligner.KernelInput(u8,bezier-aligner.kernel)",
  length: 1,
  byteSize: 48,
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
        name: "background",
        structure: s112,
      },
      {
        ...m,
        type: 6,
        bitOffset: 192,
        bitSize: 192,
        byteSize: 24,
        slot: 1,
        name: "texture",
        structure: s112,
      },
    ],
    methods: [],
    template: {
      memory: { array: a173 },
      slots: {
        0: {
          structure: s112,
          memory: { array: a174 },
          slots: {
            0: {
              structure: s106,
              memory: { array: a175 },
              slots: {
                0: {
                  structure: s105,
                  memory: { array: a176 },
                },
              },
            },
          },
        },
        1: {
          structure: s112,
          memory: { array: a177 },
          slots: {
            0: {
              structure: s106,
              memory: { array: a178 },
              slots: {
                0: {
                  structure: s105,
                  memory: { array: a176 },
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 20,
});
Object.assign(s114, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s104,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s115, {
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
        structure: s114,
      },
    ],
    methods: [],
    template: null
  },
  slot: 31,
});
const a179 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a180 = new Uint8Array([  ]);
const a181 = new Uint8Array([ 152, 30, 16, 0 ]);
Object.assign(s116, {
  ...s,
  type: 2,
  name: "bezier-aligner.Image(u8,4,true)",
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
        structure: s115,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s107,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s107,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s108,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s109,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s110,
      },
    ],
    methods: [],
    template: {
      memory: { array: a179 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s104,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s111,
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
      memory: { array: a180 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a181 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a147 },
              address: 1056408,
            },
          },
        },
      },
    },
  },
  slot: 30,
});
const a182 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a183 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a184 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s117, {
  ...s,
  type: 2,
  name: "bezier-aligner.KernelOutput(u8,bezier-aligner.kernel)",
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
        structure: s116,
      },
    ],
    methods: [],
    template: {
      memory: { array: a182 },
      slots: {
        0: {
          structure: s116,
          memory: { array: a183 },
          slots: {
            0: {
              structure: s115,
              memory: { array: a184 },
              slots: {
                0: {
                  structure: s114,
                  memory: { array: a176 },
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 29,
});
const a185 = new Uint8Array([ 0, 0, 72, 66, 0, 0, 72, 67, 0, 0, 72, 67, 0, 0, 200, 66, 0, 0, 200, 67, 0, 0, 150, 67, 0, 128, 9, 68, 0, 0, 72, 67, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 72, 67, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 0, 0 ]);
Object.assign(s118, {
  ...s,
  type: 2,
  name: "bezier-aligner.KernelParameters(bezier-aligner.kernel)",
  length: 1,
  byteSize: 80,
  align: 3,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        name: "startpoint",
        structure: s13,
      },
      {
        ...m,
        type: 6,
        bitOffset: 64,
        bitSize: 64,
        byteSize: 8,
        slot: 1,
        name: "control1",
        structure: s13,
      },
      {
        ...m,
        type: 6,
        bitOffset: 128,
        bitSize: 64,
        byteSize: 8,
        slot: 2,
        name: "control2",
        structure: s13,
      },
      {
        ...m,
        type: 6,
        bitOffset: 192,
        bitSize: 64,
        byteSize: 8,
        slot: 3,
        name: "endpoint",
        structure: s13,
      },
      {
        ...m,
        type: 6,
        bitOffset: 256,
        bitSize: 64,
        byteSize: 8,
        slot: 4,
        name: "scale",
        structure: s13,
      },
      {
        ...m,
        type: 4,
        bitOffset: 512,
        slot: 5,
        name: "imagewidth",
        structure: s12,
      },
      {
        ...m,
        type: 6,
        bitOffset: 320,
        bitSize: 64,
        byteSize: 8,
        slot: 6,
        name: "offset",
        structure: s13,
      },
      {
        ...m,
        type: 4,
        bitOffset: 544,
        slot: 7,
        name: "tstart",
        structure: s12,
      },
      {
        ...m,
        type: 4,
        bitOffset: 576,
        slot: 8,
        name: "tend",
        structure: s12,
      },
      {
        ...m,
        type: 6,
        bitOffset: 384,
        bitSize: 128,
        byteSize: 16,
        slot: 9,
        name: "rotation",
        structure: s80,
      },
    ],
    methods: [],
    template: {
      memory: { array: a185 },
    },
  },
  slot: 32,
});
Object.assign(s119, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(bezier-aligner.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 63,
});
Object.assign(s120, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(bezier-aligner.createOutput)).Fn.return_type.?).ErrorUnion.error_set!bezier-aligner.KernelOutput(u8,bezier-aligner.kernel)",
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
        structure: s117,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s119,
      },
    ],
    methods: [],
    template: null
  },
  slot: 38,
});
Object.assign(s121, {
  ...s,
  type: 3,
  name: "createOutput",
  length: 1,
  byteSize: 168,
  align: 3,
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
        structure: s107,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 672,
        slot: 1,
        name: "1",
        structure: s107,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 704,
        bitSize: 384,
        byteSize: 48,
        slot: 2,
        name: "2",
        structure: s113,
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
        structure: s118,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1088,
        bitSize: 224,
        byteSize: 28,
        slot: 4,
        name: "retval",
        structure: s120,
      },
    ],
    methods: [],
    template: null
  },
  slot: 36,
});
Object.assign(s122, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(bezier-aligner.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 64,
});
Object.assign(s123, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(bezier-aligner.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!bezier-aligner.KernelOutput(u8,bezier-aligner.kernel)",
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
        structure: s117,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s122,
      },
    ],
    methods: [],
    template: null
  },
  slot: 39,
});
Object.assign(s124, {
  ...s,
  type: 3,
  name: "createPartialOutput",
  length: 1,
  byteSize: 176,
  align: 3,
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
        structure: s107,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 672,
        slot: 1,
        name: "1",
        structure: s107,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 704,
        slot: 2,
        name: "2",
        structure: s107,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 736,
        slot: 3,
        name: "3",
        structure: s107,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 768,
        bitSize: 384,
        byteSize: 48,
        slot: 4,
        name: "4",
        structure: s113,
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
        structure: s118,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1152,
        bitSize: 224,
        byteSize: 28,
        slot: 6,
        name: "retval",
        structure: s123,
      },
    ],
    methods: [],
    template: null
  },
  slot: 37,
});
const f0 = {
  argStruct: s121,
  thunk: 4,
  name: "createOutput",
};
const f1 = {
  argStruct: s124,
  thunk: 9,
  name: "createPartialOutput",
};
Object.assign(s125, {
  ...s,
  type: 2,
  name: "bezier-aligner",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a176 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s103,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s113,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s117,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s118,
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
  s90, s91, s92, s93, s94, s95, s96, s97, s98, s99,
  s100, s101, s102, s103, s104, s105, s106, s107, s108, s109,
  s110, s111, s112, s113, s114, s115, s116, s117, s118, s119,
  s120, s121, s122, s123, s124, s125,
];
const linkage = finalizeStructures(structures);
const module = s125.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_85405def;
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