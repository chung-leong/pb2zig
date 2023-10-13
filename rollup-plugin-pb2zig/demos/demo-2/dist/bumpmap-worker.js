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
  useType,
  useFloat,
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
const s90 = {}, s91 = {}, s92 = {}, s93 = {}, s94 = {}, s95 = {};
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
  type: 1,
  name: "[12:0]u8",
  length: 12,
  byteSize: 13,
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
  name: "*const [12:0]u8",
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
  name: "*const *const [12:0]u8",
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
  name: "[56:0]u8",
  length: 56,
  byteSize: 57,
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
  name: "*const [56:0]u8",
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
  name: "*const *const [56:0]u8",
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
  type: 1,
  name: "[65:0]u8",
  length: 65,
  byteSize: 66,
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
  slot: 62,
});
Object.assign(s13, {
  ...s,
  type: 11,
  name: "*const [65:0]u8",
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
  slot: 61,
});
Object.assign(s14, {
  ...s,
  type: 11,
  name: "*const *const [65:0]u8",
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
  slot: 60,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 168, 30, 16, 0 ]);
const a2 = new Uint8Array([ 0, 0, 0, 0 ]);
const a3 = new Uint8Array([ 164, 30, 16, 0 ]);
const a4 = new Uint8Array([ 1, 0, 0, 0 ]);
const a5 = new Uint8Array([ 164, 30, 16, 0 ]);
const a6 = new Uint8Array([ 208, 30, 16, 0 ]);
const a7 = new Uint8Array([ 112, 32, 16, 0 ]);
const a8 = new Uint8Array([ 79, 110, 108, 121, 32, 119, 104, 105, 108, 101, 32, 111, 110, 32, 105, 115, 32, 49, 44, 32, 116, 104, 101, 32, 115, 104, 97, 100, 101, 114, 32, 119, 105, 108, 108, 32, 98, 101, 32, 97, 112, 112, 108, 105, 101, 100, 32, 116, 111, 32, 116, 104, 101, 32, 105, 110, 112, 117, 116, 32, 105, 109, 97, 103, 101, 0 ]);
Object.assign(s15, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 1, comptime defaultValue: comptime_int = 1, comptime description: *const [65:0]u8 = \"Only while on is 1, the shader will be applied to the input image\"}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s14,
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
              address: 1056424,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a3 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a4 },
              address: 1056420,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a5 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a4 },
              address: 1056420,
            },
          },
        },
        3: {
          structure: s14,
          memory: { array: a6 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a7 },
              address: 1056464,
              slots: {
                0: {
                  structure: s12,
                  memory: { array: a8 },
                  address: 1056880,
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
Object.assign(s16, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 1, comptime defaultValue: comptime_int = 1, comptime description: *const [65:0]u8 = \"Only while on is 1, the shader will be applied to the input image\"}",
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
  slot: 39,
});
Object.assign(s17, {
  ...s,
  name: "f32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 0,
        structure: s17,
      },
    ],
    methods: [],
    template: null
  },
  slot: 34,
});
Object.assign(s18, {
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
        structure: s17,
      },
    ],
    methods: [],
    template: null
  },
  slot: 33,
});
Object.assign(s19, {
  ...s,
  type: 11,
  name: "*const @Vector(3, f32)",
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
  slot: 63,
});
Object.assign(s20, {
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
        structure: s20,
      },
    ],
    methods: [],
    template: null
  },
  slot: 79,
});
Object.assign(s21, {
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
        structure: s20,
      },
    ],
    methods: [],
    template: null
  },
  slot: 78,
});
const a9 = new Uint8Array([  ]);
const a10 = new Uint8Array([ 88, 30, 16, 0 ]);
const a11 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 164, 64 ]);
const a12 = new Uint8Array([ 88, 30, 16, 0 ]);
const a13 = new Uint8Array([ 80, 30, 16, 0 ]);
const a14 = new Uint8Array([ 0, 0, 0, 0, 0, 136, 195, 64 ]);
Object.assign(s22, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 2560, comptime comptime_float = 2560, comptime comptime_float = 10000}",
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
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s21,
      },
    ],
    methods: [],
    template: {
      memory: { array: a9 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a10 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a11 },
              address: 1056344,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a12 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a11 },
              address: 1056344,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a13 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a14 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 65,
});
Object.assign(s23, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 2560, comptime comptime_float = 2560, comptime comptime_float = 10000}",
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
  slot: 64,
});
const a15 = new Uint8Array([  ]);
const a16 = new Uint8Array([ 72, 30, 16, 0 ]);
const a17 = new Uint8Array([ 0, 0, 0, 0, 0, 64, 111, 64 ]);
const a18 = new Uint8Array([ 72, 30, 16, 0 ]);
const a19 = new Uint8Array([ 64, 30, 16, 0 ]);
const a20 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 137, 64 ]);
Object.assign(s24, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 250, comptime comptime_float = 250, comptime comptime_float = 800}",
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
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s21,
      },
    ],
    methods: [],
    template: {
      memory: { array: a15 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a16 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a17 },
              address: 1056328,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a18 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a17 },
              address: 1056328,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a19 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a20 },
              address: 1056320,
            },
          },
        },
      },
    },
  },
  slot: 67,
});
Object.assign(s25, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 250, comptime comptime_float = 250, comptime comptime_float = 800}",
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
  slot: 66,
});
Object.assign(s26, {
  ...s,
  type: 1,
  name: "[103:0]u8",
  length: 103,
  byteSize: 104,
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
  slot: 70,
});
Object.assign(s27, {
  ...s,
  type: 11,
  name: "*const [103:0]u8",
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
  slot: 69,
});
Object.assign(s28, {
  ...s,
  type: 11,
  name: "*const *const [103:0]u8",
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
  slot: 68,
});
const a21 = new Uint8Array([  ]);
const a22 = new Uint8Array([ 192, 30, 16, 0 ]);
const a23 = new Uint8Array([ 0, 0, 32, 197, 0, 0, 32, 197, 0, 64, 28, 198, 0, 0, 0, 0 ]);
const a24 = new Uint8Array([ 170, 170, 170, 170 ]);
const a25 = new Uint8Array([  ]);
const a26 = new Uint8Array([ 170, 170, 170, 170 ]);
const a27 = new Uint8Array([ 188, 30, 16, 0 ]);
const a28 = new Uint8Array([ 8, 32, 16, 0 ]);
const a29 = new Uint8Array([ 84, 104, 101, 32, 108, 105, 103, 104, 116, 32, 99, 111, 111, 114, 100, 105, 110, 97, 116, 101, 115, 32, 40, 120, 44, 121, 44, 122, 41, 46, 32, 84, 104, 101, 32, 122, 45, 99, 111, 111, 114, 100, 105, 110, 97, 116, 101, 32, 97, 108, 119, 97, 121, 115, 32, 110, 101, 101, 100, 115, 32, 116, 111, 32, 98, 101, 32, 112, 111, 115, 105, 116, 105, 118, 101, 32, 116, 111, 32, 98, 101, 32, 105, 110, 32, 102, 114, 111, 110, 116, 32, 111, 102, 32, 116, 104, 101, 32, 105, 109, 97, 103, 101, 0 ]);
Object.assign(s29, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: @Vector(3, f32) = .{ -2560, -2560, -10000 }, comptime maxValue: struct{comptime comptime_float = 2560, comptime comptime_float = 2560, comptime comptime_float = 10000} = .{2560, 2560, 10000}, comptime defaultValue: struct{comptime comptime_float = 250, comptime comptime_float = 250, comptime comptime_float = 800} = .{250, 250, 800}, comptime description: *const [103:0]u8 = \"The light coordinates (x,y,z). The z-coordinate always needs to be positive to be in front of the image\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s18,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s19,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s25,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s28,
      },
    ],
    methods: [],
    template: {
      memory: { array: a21 },
      slots: {
        0: {
          structure: s19,
          memory: { array: a22 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a23 },
              address: 1056448,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a24 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s25,
          memory: { array: a26 },
          slots: {
            0: {
              structure: s24,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s28,
          memory: { array: a27 },
          slots: {
            0: {
              structure: s27,
              memory: { array: a28 },
              address: 1056444,
              slots: {
                0: {
                  structure: s26,
                  memory: { array: a29 },
                  address: 1056776,
                },
              },
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
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: @Vector(3, f32) = .{ -2560, -2560, -10000 }, comptime maxValue: struct{comptime comptime_float = 2560, comptime comptime_float = 2560, comptime comptime_float = 10000} = .{2560, 2560, 10000}, comptime defaultValue: struct{comptime comptime_float = 250, comptime comptime_float = 250, comptime comptime_float = 800} = .{250, 250, 800}, comptime description: *const [103:0]u8 = \"The light coordinates (x,y,z). The z-coordinate always needs to be positive to be in front of the image\"}",
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
const a30 = new Uint8Array([  ]);
const a31 = new Uint8Array([ 56, 30, 16, 0 ]);
const a32 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a33 = new Uint8Array([ 56, 30, 16, 0 ]);
const a34 = new Uint8Array([ 56, 30, 16, 0 ]);
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
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s21,
      },
    ],
    methods: [],
    template: {
      memory: { array: a30 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a31 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a32 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a33 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a32 },
              address: 1056312,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a34 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a32 },
              address: 1056312,
            },
          },
        },
      },
    },
  },
  slot: 72,
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
  slot: 71,
});
const a35 = new Uint8Array([  ]);
const a36 = new Uint8Array([ 48, 30, 16, 0 ]);
const a37 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a38 = new Uint8Array([ 48, 30, 16, 0 ]);
const a39 = new Uint8Array([ 48, 30, 16, 0 ]);
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
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s21,
      },
    ],
    methods: [],
    template: {
      memory: { array: a35 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a36 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a37 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a38 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a37 },
              address: 1056304,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a39 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a37 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 74,
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
  slot: 73,
});
Object.assign(s35, {
  ...s,
  type: 1,
  name: "[33:0]u8",
  length: 33,
  byteSize: 34,
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
  slot: 77,
});
Object.assign(s36, {
  ...s,
  type: 11,
  name: "*const [33:0]u8",
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
  slot: 76,
});
Object.assign(s37, {
  ...s,
  type: 11,
  name: "*const *const [33:0]u8",
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
  slot: 75,
});
const a40 = new Uint8Array([  ]);
const a41 = new Uint8Array([ 170, 170, 170, 170 ]);
const a42 = new Uint8Array([ 170, 170, 170, 170 ]);
const a43 = new Uint8Array([ 170, 170, 170, 170 ]);
const a44 = new Uint8Array([ 184, 30, 16, 0 ]);
const a45 = new Uint8Array([ 230, 31, 16, 0 ]);
const a46 = new Uint8Array([ 67, 111, 108, 111, 114, 32, 111, 102, 32, 116, 104, 101, 32, 108, 105, 103, 104, 116, 32, 115, 111, 117, 114, 99, 101, 32, 91, 82, 44, 71, 44, 66, 93, 0 ]);
Object.assign(s38, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime description: *const [33:0]u8 = \"Color of the light source [R,G,B]\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s18,
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
        structure: s34,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s37,
      },
    ],
    methods: [],
    template: {
      memory: { array: a40 },
      slots: {
        0: {
          structure: s32,
          memory: { array: a41 },
          slots: {
            0: {
              structure: s31,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s34,
          memory: { array: a42 },
          slots: {
            0: {
              structure: s33,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s34,
          memory: { array: a43 },
          slots: {
            0: {
              structure: s33,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s37,
          memory: { array: a44 },
          slots: {
            0: {
              structure: s36,
              memory: { array: a45 },
              address: 1056440,
              slots: {
                0: {
                  structure: s35,
                  memory: { array: a46 },
                  address: 1056742,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 44,
});
Object.assign(s39, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime description: *const [33:0]u8 = \"Color of the light source [R,G,B]\"}",
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
  slot: 43,
});
Object.assign(s40, {
  ...s,
  type: 1,
  name: "[62:0]u8",
  length: 62,
  byteSize: 63,
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
  slot: 82,
});
Object.assign(s41, {
  ...s,
  type: 11,
  name: "*const [62:0]u8",
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
  slot: 81,
});
Object.assign(s42, {
  ...s,
  type: 11,
  name: "*const *const [62:0]u8",
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
  slot: 80,
});
const a47 = new Uint8Array([  ]);
const a48 = new Uint8Array([ 48, 30, 16, 0 ]);
const a49 = new Uint8Array([ 176, 30, 16, 0 ]);
const a50 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 36, 64 ]);
const a51 = new Uint8Array([ 48, 30, 16, 0 ]);
const a52 = new Uint8Array([ 172, 30, 16, 0 ]);
const a53 = new Uint8Array([ 167, 31, 16, 0 ]);
const a54 = new Uint8Array([ 65, 32, 102, 97, 99, 116, 111, 114, 32, 98, 121, 32, 119, 104, 105, 99, 104, 32, 116, 104, 101, 32, 104, 101, 105, 103, 104, 116, 109, 97, 112, 32, 100, 105, 102, 102, 101, 114, 101, 110, 99, 101, 115, 32, 119, 105, 108, 108, 32, 98, 101, 32, 109, 117, 108, 116, 105, 112, 108, 105, 101, 100, 0 ]);
Object.assign(s43, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime description: *const [62:0]u8 = \"A factor by which the heightmap differences will be multiplied\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s17,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s21,
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
        structure: s21,
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
      memory: { array: a47 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a48 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a37 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a49 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a50 },
              address: 1056432,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a51 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a37 },
              address: 1056304,
            },
          },
        },
        3: {
          structure: s42,
          memory: { array: a52 },
          slots: {
            0: {
              structure: s41,
              memory: { array: a53 },
              address: 1056428,
              slots: {
                0: {
                  structure: s40,
                  memory: { array: a54 },
                  address: 1056679,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 46,
});
Object.assign(s44, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime description: *const [62:0]u8 = \"A factor by which the heightmap differences will be multiplied\"}",
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
  slot: 45,
});
Object.assign(s45, {
  ...s,
  type: 1,
  name: "[16:0]u8",
  length: 16,
  byteSize: 17,
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
Object.assign(s46, {
  ...s,
  type: 11,
  name: "*const [16:0]u8",
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
  slot: 84,
});
Object.assign(s47, {
  ...s,
  type: 11,
  name: "*const *const [16:0]u8",
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
  slot: 83,
});
const a55 = new Uint8Array([  ]);
const a56 = new Uint8Array([ 168, 30, 16, 0 ]);
const a57 = new Uint8Array([ 164, 30, 16, 0 ]);
const a58 = new Uint8Array([ 164, 30, 16, 0 ]);
const a59 = new Uint8Array([ 160, 30, 16, 0 ]);
const a60 = new Uint8Array([ 150, 31, 16, 0 ]);
const a61 = new Uint8Array([ 73, 110, 118, 101, 114, 116, 32, 104, 101, 105, 103, 104, 116, 109, 97, 112, 0 ]);
Object.assign(s48, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 1, comptime defaultValue: comptime_int = 1, comptime description: *const [16:0]u8 = \"Invert heightmap\"}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s47,
      },
    ],
    methods: [],
    template: {
      memory: { array: a55 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a56 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a2 },
              address: 1056424,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a57 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a4 },
              address: 1056420,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a58 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a4 },
              address: 1056420,
            },
          },
        },
        3: {
          structure: s47,
          memory: { array: a59 },
          slots: {
            0: {
              structure: s46,
              memory: { array: a60 },
              address: 1056416,
              slots: {
                0: {
                  structure: s45,
                  memory: { array: a61 },
                  address: 1056662,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 48,
});
Object.assign(s49, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 1, comptime defaultValue: comptime_int = 1, comptime description: *const [16:0]u8 = \"Invert heightmap\"}",
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
  slot: 47,
});
Object.assign(s50, {
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
  slot: 88,
});
Object.assign(s51, {
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
        structure: s50,
      },
    ],
    methods: [],
    template: null
  },
  slot: 87,
});
Object.assign(s52, {
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
        structure: s51,
      },
    ],
    methods: [],
    template: null
  },
  slot: 86,
});
const a62 = new Uint8Array([  ]);
const a63 = new Uint8Array([ 56, 30, 16, 0 ]);
const a64 = new Uint8Array([ 80, 30, 16, 0 ]);
const a65 = new Uint8Array([ 152, 30, 16, 0 ]);
const a66 = new Uint8Array([ 0, 0, 0, 0, 0, 80, 148, 64 ]);
const a67 = new Uint8Array([ 144, 30, 16, 0 ]);
const a68 = new Uint8Array([ 110, 31, 16, 0 ]);
const a69 = new Uint8Array([ 84, 104, 101, 32, 109, 97, 120, 105, 109, 117, 109, 32, 114, 101, 97, 99, 104, 47, 108, 101, 110, 103, 116, 104, 32, 111, 102, 32, 97, 32, 108, 105, 103, 104, 116, 32, 114, 97, 121, 0 ]);
Object.assign(s53, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10000, comptime defaultValue: comptime_float = 1300, comptime description: *const [39:0]u8 = \"The maximum reach/length of a light ray\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s17,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s21,
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
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s52,
      },
    ],
    methods: [],
    template: {
      memory: { array: a62 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a63 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a32 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a64 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a14 },
              address: 1056336,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a65 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a66 },
              address: 1056408,
            },
          },
        },
        3: {
          structure: s52,
          memory: { array: a67 },
          slots: {
            0: {
              structure: s51,
              memory: { array: a68 },
              address: 1056400,
              slots: {
                0: {
                  structure: s50,
                  memory: { array: a69 },
                  address: 1056622,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 50,
});
Object.assign(s54, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10000, comptime defaultValue: comptime_float = 1300, comptime description: *const [39:0]u8 = \"The maximum reach/length of a light ray\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s53,
      },
    ],
    methods: [],
    template: null
  },
  slot: 49,
});
Object.assign(s55, {
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
  slot: 91,
});
Object.assign(s56, {
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
        structure: s55,
      },
    ],
    methods: [],
    template: null
  },
  slot: 90,
});
Object.assign(s57, {
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
        structure: s56,
      },
    ],
    methods: [],
    template: null
  },
  slot: 89,
});
const a70 = new Uint8Array([  ]);
const a71 = new Uint8Array([ 56, 30, 16, 0 ]);
const a72 = new Uint8Array([ 136, 30, 16, 0 ]);
const a73 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 64 ]);
const a74 = new Uint8Array([ 128, 30, 16, 0 ]);
const a75 = new Uint8Array([ 51, 51, 51, 51, 51, 51, 227, 63 ]);
const a76 = new Uint8Array([ 120, 30, 16, 0 ]);
const a77 = new Uint8Array([ 71, 31, 16, 0 ]);
const a78 = new Uint8Array([ 84, 104, 101, 32, 115, 116, 114, 101, 110, 103, 116, 104, 32, 111, 102, 32, 116, 104, 101, 32, 115, 117, 114, 102, 97, 99, 101, 32, 114, 101, 102, 108, 101, 99, 116, 105, 111, 110, 0 ]);
Object.assign(s58, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 2, comptime defaultValue: comptime_float = 0.6, comptime description: *const [38:0]u8 = \"The strength of the surface reflection\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s17,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s21,
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
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s57,
      },
    ],
    methods: [],
    template: {
      memory: { array: a70 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a71 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a32 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a72 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a73 },
              address: 1056392,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a74 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a75 },
              address: 1056384,
            },
          },
        },
        3: {
          structure: s57,
          memory: { array: a76 },
          slots: {
            0: {
              structure: s56,
              memory: { array: a77 },
              address: 1056376,
              slots: {
                0: {
                  structure: s55,
                  memory: { array: a78 },
                  address: 1056583,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 52,
});
Object.assign(s59, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 2, comptime defaultValue: comptime_float = 0.6, comptime description: *const [38:0]u8 = \"The strength of the surface reflection\"}",
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
  slot: 51,
});
Object.assign(s60, {
  ...s,
  type: 1,
  name: "[114:0]u8",
  length: 114,
  byteSize: 115,
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
Object.assign(s61, {
  ...s,
  type: 11,
  name: "*const [114:0]u8",
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
  slot: 93,
});
Object.assign(s62, {
  ...s,
  type: 11,
  name: "*const *const [114:0]u8",
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
const a79 = new Uint8Array([  ]);
const a80 = new Uint8Array([ 56, 30, 16, 0 ]);
const a81 = new Uint8Array([ 112, 30, 16, 0 ]);
const a82 = new Uint8Array([ 0, 0, 0, 0, 0, 64, 143, 64 ]);
const a83 = new Uint8Array([ 104, 30, 16, 0 ]);
const a84 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 34, 64 ]);
const a85 = new Uint8Array([ 100, 30, 16, 0 ]);
const a86 = new Uint8Array([ 212, 30, 16, 0 ]);
const a87 = new Uint8Array([ 84, 104, 101, 32, 108, 111, 119, 101, 114, 32, 116, 104, 101, 32, 118, 97, 108, 117, 101, 44, 32, 116, 104, 101, 32, 109, 111, 114, 101, 32, 101, 120, 97, 99, 116, 108, 121, 32, 116, 104, 101, 32, 114, 101, 102, 108, 101, 99, 116, 105, 111, 110, 32, 114, 97, 121, 32, 110, 101, 101, 100, 115, 32, 116, 111, 32, 114, 101, 102, 108, 101, 99, 116, 101, 100, 32, 115, 116, 114, 101, 105, 103, 104, 116, 32, 98, 97, 99, 107, 32, 116, 111, 119, 97, 114, 100, 115, 32, 116, 104, 101, 32, 108, 105, 103, 104, 116, 32, 115, 111, 117, 114, 99, 101, 0 ]);
Object.assign(s63, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 9, comptime description: *const [114:0]u8 = \"The lower the value, the more exactly the reflection ray needs to reflected streight back towards the light source\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s17,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s21,
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
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s62,
      },
    ],
    methods: [],
    template: {
      memory: { array: a79 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a80 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a32 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a81 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a82 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a83 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a84 },
              address: 1056360,
            },
          },
        },
        3: {
          structure: s62,
          memory: { array: a85 },
          slots: {
            0: {
              structure: s61,
              memory: { array: a86 },
              address: 1056356,
              slots: {
                0: {
                  structure: s60,
                  memory: { array: a87 },
                  address: 1056468,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 54,
});
Object.assign(s64, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 9, comptime description: *const [114:0]u8 = \"The lower the value, the more exactly the reflection ray needs to reflected streight back towards the light source\"}",
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
  slot: 53,
});
const a88 = new Uint8Array([  ]);
const a89 = new Uint8Array([ 170, 170, 170, 170 ]);
const a90 = new Uint8Array([ 170, 170, 170, 170 ]);
const a91 = new Uint8Array([ 170, 170, 170, 170 ]);
const a92 = new Uint8Array([ 170, 170, 170, 170 ]);
const a93 = new Uint8Array([ 170, 170, 170, 170 ]);
const a94 = new Uint8Array([ 170, 170, 170, 170 ]);
const a95 = new Uint8Array([ 170, 170, 170, 170 ]);
const a96 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s65, {
  ...s,
  type: 2,
  name: "struct{comptime on: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 1, comptime defaultValue: comptime_int = 1, comptime description: *const [65:0]u8 = \"Only while on is 1, the shader will be applied to the input image\"} = .{.type = i32, .minValue = 0, .maxValue = 1, .defaultValue = 1, .description = \"Only while on is 1, the shader will be applied to the input image\"}, comptime light: struct{comptime type: type = @Vector(3, f32), comptime minValue: @Vector(3, f32) = .{ -2560, -2560, -10000 }, comptime maxValue: struct{comptime comptime_float = 2560, comptime comptime_float = 2560, comptime comptime_float = 10000} = .{2560, 2560, 10000}, comptime defaultValue: struct{comptime comptime_float = 250, comptime comptime_float = 250, comptime comptime_float = 800} = .{250, 250, 800}, comptime description: *const [103:0]u8 = \"The light coordinates (x,y,z). The z-coordinate always needs to be positive to be in front of the image\"} = .{.type = @Vector(3, f32), .minValue = .{ -2560, -2560, -10000 }, .maxValue = .{2560, 2560, 10000}, .defaultValue = .{250, 250, 800}, .description = \"The light coordinates (x,y,z). The z-coordinate always needs to be positive to be in front of the image\"}, comptime lightcolor: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime description: *const [33:0]u8 = \"Color of the light source [R,G,B]\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{1, 1, 1}, .description = \"Color of the light source [R,G,B]\"}, comptime heightmap_multi: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime description: *const [62:0]u8 = \"A factor by which the heightmap differences will be multiplied\"} = .{.type = f32, .minValue = 1, .maxValue = 10, .defaultValue = 1, .description = \"A factor by which the heightmap differences will be multiplied\"}, comptime invert: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 1, comptime defaultValue: comptime_int = 1, comptime description: *const [16:0]u8 = \"Invert heightmap\"} = .{.type = i32, .minValue = 0, .maxValue = 1, .defaultValue = 1, .description = \"Invert heightmap\"}, comptime lightwidth: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10000, comptime defaultValue: comptime_float = 1300, comptime description: *const [39:0]u8 = \"The maximum reach/length of a light ray\"} = .{.type = f32, .minValue = 0, .maxValue = 10000, .defaultValue = 1300, .description = \"The maximum reach/length of a light ray\"}, comptime reflection: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 2, comptime defaultValue: comptime_float = 0.6, comptime description: *const [38:0]u8 = \"The strength of the surface reflection\"} = .{.type = f32, .minValue = 0, .maxValue = 2, .defaultValue = 0.6, .description = \"The strength of the surface reflection\"}, comptime refl_tolerance: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 9, comptime description: *const [114:0]u8 = \"The lower the value, the more exactly the reflection ray needs to reflected streight back towards the light source\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 9, .description = \"The lower the value, the more exactly the reflection ray needs to reflected streight back towards the light source\"}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "on",
        structure: s16,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "light",
        structure: s30,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "lightcolor",
        structure: s39,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "heightmap_multi",
        structure: s44,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "invert",
        structure: s49,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "lightwidth",
        structure: s54,
      },
      {
        ...m,
        type: 8,
        slot: 6,
        name: "reflection",
        structure: s59,
      },
      {
        ...m,
        type: 8,
        slot: 7,
        name: "refl_tolerance",
        structure: s64,
      },
    ],
    methods: [],
    template: {
      memory: { array: a88 },
      slots: {
        0: {
          structure: s16,
          memory: { array: a89 },
          slots: {
            0: {
              structure: s15,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s30,
          memory: { array: a90 },
          slots: {
            0: {
              structure: s29,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s39,
          memory: { array: a91 },
          slots: {
            0: {
              structure: s38,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s44,
          memory: { array: a92 },
          slots: {
            0: {
              structure: s43,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s49,
          memory: { array: a93 },
          slots: {
            0: {
              structure: s48,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s54,
          memory: { array: a94 },
          slots: {
            0: {
              structure: s53,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s59,
          memory: { array: a95 },
          slots: {
            0: {
              structure: s58,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        7: {
          structure: s64,
          memory: { array: a96 },
          slots: {
            0: {
              structure: s63,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 15,
});
Object.assign(s66, {
  ...s,
  type: 11,
  name: "*const struct{comptime on: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 1, comptime defaultValue: comptime_int = 1, comptime description: *const [65:0]u8 = \"Only while on is 1, the shader will be applied to the input image\"} = .{.type = i32, .minValue = 0, .maxValue = 1, .defaultValue = 1, .description = \"Only while on is 1, the shader will be applied to the input image\"}, comptime light: struct{comptime type: type = @Vector(3, f32), comptime minValue: @Vector(3, f32) = .{ -2560, -2560, -10000 }, comptime maxValue: struct{comptime comptime_float = 2560, comptime comptime_float = 2560, comptime comptime_float = 10000} = .{2560, 2560, 10000}, comptime defaultValue: struct{comptime comptime_float = 250, comptime comptime_float = 250, comptime comptime_float = 800} = .{250, 250, 800}, comptime description: *const [103:0]u8 = \"The light coordinates (x,y,z). The z-coordinate always needs to be positive to be in front of the image\"} = .{.type = @Vector(3, f32), .minValue = .{ -2560, -2560, -10000 }, .maxValue = .{2560, 2560, 10000}, .defaultValue = .{250, 250, 800}, .description = \"The light coordinates (x,y,z). The z-coordinate always needs to be positive to be in front of the image\"}, comptime lightcolor: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime description: *const [33:0]u8 = \"Color of the light source [R,G,B]\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{1, 1, 1}, .description = \"Color of the light source [R,G,B]\"}, comptime heightmap_multi: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime description: *const [62:0]u8 = \"A factor by which the heightmap differences will be multiplied\"} = .{.type = f32, .minValue = 1, .maxValue = 10, .defaultValue = 1, .description = \"A factor by which the heightmap differences will be multiplied\"}, comptime invert: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 1, comptime defaultValue: comptime_int = 1, comptime description: *const [16:0]u8 = \"Invert heightmap\"} = .{.type = i32, .minValue = 0, .maxValue = 1, .defaultValue = 1, .description = \"Invert heightmap\"}, comptime lightwidth: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10000, comptime defaultValue: comptime_float = 1300, comptime description: *const [39:0]u8 = \"The maximum reach/length of a light ray\"} = .{.type = f32, .minValue = 0, .maxValue = 10000, .defaultValue = 1300, .description = \"The maximum reach/length of a light ray\"}, comptime reflection: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 2, comptime defaultValue: comptime_float = 0.6, comptime description: *const [38:0]u8 = \"The strength of the surface reflection\"} = .{.type = f32, .minValue = 0, .maxValue = 2, .defaultValue = 0.6, .description = \"The strength of the surface reflection\"}, comptime refl_tolerance: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1000, comptime defaultValue: comptime_float = 9, comptime description: *const [114:0]u8 = \"The lower the value, the more exactly the reflection ray needs to reflected streight back towards the light source\"} = .{.type = f32, .minValue = 0, .maxValue = 1000, .defaultValue = 9, .description = \"The lower the value, the more exactly the reflection ray needs to reflected streight back towards the light source\"}}",
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
  slot: 14,
});
const a97 = new Uint8Array([  ]);
const a98 = new Uint8Array([ 96, 30, 16, 0 ]);
const a99 = new Uint8Array([ 4, 0, 0, 0 ]);
Object.assign(s67, {
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
      memory: { array: a97 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a98 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a99 },
              address: 1056352,
            },
          },
        },
      },
    },
  },
  slot: 56,
});
Object.assign(s68, {
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
        structure: s67,
      },
    ],
    methods: [],
    template: null
  },
  slot: 55,
});
const a100 = new Uint8Array([  ]);
const a101 = new Uint8Array([ 170, 170, 170, 170 ]);
const a102 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s69, {
  ...s,
  type: 2,
  name: "struct{comptime src: struct{comptime channels: comptime_int = 4} = .{.channels = 4}, comptime img: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
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
        structure: s68,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "img",
        structure: s68,
      },
    ],
    methods: [],
    template: {
      memory: { array: a100 },
      slots: {
        0: {
          structure: s68,
          memory: { array: a101 },
          slots: {
            0: {
              structure: s67,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s68,
          memory: { array: a102 },
          slots: {
            0: {
              structure: s67,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 17,
});
Object.assign(s70, {
  ...s,
  type: 11,
  name: "*const struct{comptime src: struct{comptime channels: comptime_int = 4} = .{.channels = 4}, comptime img: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
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
  slot: 16,
});
const a103 = new Uint8Array([  ]);
const a104 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s71, {
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
        structure: s68,
      },
    ],
    methods: [],
    template: {
      memory: { array: a103 },
      slots: {
        0: {
          structure: s68,
          memory: { array: a104 },
          slots: {
            0: {
              structure: s67,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 19,
});
Object.assign(s72, {
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
        structure: s71,
      },
    ],
    methods: [],
    template: null
  },
  slot: 18,
});
const a105 = new Uint8Array([  ]);
const a106 = new Uint8Array([  ]);
const a107 = new Uint8Array([ 204, 98, 16, 0 ]);
const a108 = new Uint8Array([ 139, 98, 16, 0 ]);
const a109 = new Uint8Array([ 99, 111, 109, 46, 115, 104, 97, 100, 101, 114, 0 ]);
const a110 = new Uint8Array([ 200, 98, 16, 0 ]);
const a111 = new Uint8Array([ 116, 98, 16, 0 ]);
const a112 = new Uint8Array([ 69, 108, 105, 97, 115, 32, 83, 116, 101, 104, 108, 101, 0 ]);
const a113 = new Uint8Array([ 164, 30, 16, 0 ]);
const a114 = new Uint8Array([ 196, 98, 16, 0 ]);
const a115 = new Uint8Array([ 44, 98, 16, 0 ]);
const a116 = new Uint8Array([ 66, 117, 109, 112, 109, 97, 112, 32, 83, 104, 97, 100, 101, 114, 32, 45, 32, 83, 116, 117, 110, 110, 105, 110, 103, 32, 101, 102, 102, 101, 99, 116, 115, 32, 111, 110, 32, 116, 101, 120, 116, 117, 114, 101, 45, 108, 105, 107, 101, 32, 105, 110, 112, 117, 116, 115, 0 ]);
const a117 = new Uint8Array([ 170, 170, 170, 170 ]);
const a118 = new Uint8Array([ 170, 170, 170, 170 ]);
const a119 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s73, {
  ...s,
  type: 2,
  name: "bumpmap.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a105 },
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
        structure: s66,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "inputImages",
        structure: s70,
      },
      {
        ...m,
        type: 6,
        slot: 6,
        name: "outputImages",
        structure: s72,
      },
    ],
    methods: [],
    template: {
      memory: { array: a106 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a107 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a108 },
              address: 1073868,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a109 },
                  address: 1073803,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a110 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a111 },
              address: 1073864,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a112 },
                  address: 1073780,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a113 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a4 },
              address: 1056420,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a114 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a115 },
              address: 1073860,
              slots: {
                0: {
                  structure: s9,
                  memory: { array: a116 },
                  address: 1073708,
                },
              },
            },
          },
        },
        4: {
          structure: s66,
          memory: { array: a117 },
          slots: {
            0: {
              structure: s65,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s70,
          memory: { array: a118 },
          slots: {
            0: {
              structure: s69,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s72,
          memory: { array: a119 },
          slots: {
            0: {
              structure: s71,
              memory: { array: a25 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
Object.assign(s74, {
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
Object.assign(s75, {
  ...s,
  type: 12,
  name: "[_]const @Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s74,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s76, {
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
        structure: s75,
      },
    ],
    methods: [],
    template: null
  },
  slot: 22,
});
Object.assign(s77, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s77,
      },
    ],
    methods: [],
    template: null
  },
  slot: 25,
});
const a120 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s78, {
  ...s,
  type: 9,
  name: "bumpmap.ColorSpace",
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
      memory: { array: a120 },
    },
  },
  slot: 26,
});
Object.assign(s79, {
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
        structure: s79,
      },
    ],
    methods: [],
    template: null
  },
  slot: 27,
});
Object.assign(s80, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s80,
      },
    ],
    methods: [],
    template: null
  },
  slot: 28,
});
Object.assign(s81, {
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
        structure: s17,
      },
    ],
    methods: [],
    template: null
  },
  slot: 57,
});
const a121 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a122 = new Uint8Array([  ]);
const a123 = new Uint8Array([ 96, 30, 16, 0 ]);
Object.assign(s82, {
  ...s,
  type: 2,
  name: "bumpmap.Image(u8,4,false)",
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
        structure: s76,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s77,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s77,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s78,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s79,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s80,
      },
    ],
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
        name: "Pixel",
        structure: s74,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s81,
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
      memory: { array: a122 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a123 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a99 },
              address: 1056352,
            },
          },
        },
      },
    },
  },
  slot: 21,
});
const a124 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a125 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a126 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a127 = new Uint8Array([  ]);
const a128 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a129 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s83, {
  ...s,
  type: 2,
  name: "bumpmap.KernelInput(u8,bumpmap.kernel)",
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
        name: "src",
        structure: s82,
      },
      {
        ...m,
        type: 6,
        bitOffset: 192,
        bitSize: 192,
        byteSize: 24,
        slot: 1,
        name: "img",
        structure: s82,
      },
    ],
    methods: [],
    template: {
      memory: { array: a124 },
      slots: {
        0: {
          structure: s82,
          memory: { array: a125 },
          slots: {
            0: {
              structure: s76,
              memory: { array: a126 },
              slots: {
                0: {
                  structure: s75,
                  memory: { array: a127 },
                },
              },
            },
          },
        },
        1: {
          structure: s82,
          memory: { array: a128 },
          slots: {
            0: {
              structure: s76,
              memory: { array: a129 },
              slots: {
                0: {
                  structure: s75,
                  memory: { array: a127 },
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
Object.assign(s84, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s74,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s85, {
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
        structure: s84,
      },
    ],
    methods: [],
    template: null
  },
  slot: 31,
});
const a130 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a131 = new Uint8Array([  ]);
const a132 = new Uint8Array([ 96, 30, 16, 0 ]);
Object.assign(s86, {
  ...s,
  type: 2,
  name: "bumpmap.Image(u8,4,true)",
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
        structure: s85,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s77,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s77,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s78,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s79,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s80,
      },
    ],
    methods: [],
    template: {
      memory: { array: a130 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s74,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s81,
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
      memory: { array: a131 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a132 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a99 },
              address: 1056352,
            },
          },
        },
      },
    },
  },
  slot: 30,
});
const a133 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a134 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a135 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s87, {
  ...s,
  type: 2,
  name: "bumpmap.KernelOutput(u8,bumpmap.kernel)",
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
        structure: s86,
      },
    ],
    methods: [],
    template: {
      memory: { array: a133 },
      slots: {
        0: {
          structure: s86,
          memory: { array: a134 },
          slots: {
            0: {
              structure: s85,
              memory: { array: a135 },
              slots: {
                0: {
                  structure: s84,
                  memory: { array: a127 },
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
const a136 = new Uint8Array([ 0, 0, 122, 67, 0, 0, 122, 67, 0, 0, 72, 68, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 128, 63, 1, 0, 0, 0, 0, 128, 162, 68, 154, 153, 25, 63, 0, 0, 16, 65, 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s88, {
  ...s,
  type: 2,
  name: "bumpmap.KernelParameters(bumpmap.kernel)",
  length: 1,
  byteSize: 64,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 2,
        bitOffset: 256,
        slot: 0,
        name: "on",
        structure: s7,
      },
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 96,
        byteSize: 16,
        slot: 1,
        name: "light",
        structure: s18,
      },
      {
        ...m,
        type: 6,
        bitOffset: 128,
        bitSize: 96,
        byteSize: 16,
        slot: 2,
        name: "lightcolor",
        structure: s18,
      },
      {
        ...m,
        type: 4,
        bitOffset: 288,
        slot: 3,
        name: "heightmap_multi",
        structure: s17,
      },
      {
        ...m,
        type: 2,
        bitOffset: 320,
        slot: 4,
        name: "invert",
        structure: s7,
      },
      {
        ...m,
        type: 4,
        bitOffset: 352,
        slot: 5,
        name: "lightwidth",
        structure: s17,
      },
      {
        ...m,
        type: 4,
        bitOffset: 384,
        slot: 6,
        name: "reflection",
        structure: s17,
      },
      {
        ...m,
        type: 4,
        bitOffset: 416,
        slot: 7,
        name: "refl_tolerance",
        structure: s17,
      },
    ],
    methods: [],
    template: {
      memory: { array: a136 },
    },
  },
  slot: 32,
});
Object.assign(s89, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(bumpmap.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
Object.assign(s90, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(bumpmap.createOutput)).Fn.return_type.?).ErrorUnion.error_set!bumpmap.KernelOutput(u8,bumpmap.kernel)",
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
        structure: s87,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s89,
      },
    ],
    methods: [],
    template: null
  },
  slot: 37,
});
Object.assign(s91, {
  ...s,
  type: 3,
  name: "createOutput",
  length: 1,
  byteSize: 160,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 512,
        slot: 0,
        name: "0",
        structure: s77,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 544,
        slot: 1,
        name: "1",
        structure: s77,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 576,
        bitSize: 384,
        byteSize: 48,
        slot: 2,
        name: "2",
        structure: s83,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 512,
        byteSize: 64,
        slot: 3,
        name: "3",
        structure: s88,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 960,
        bitSize: 224,
        byteSize: 28,
        slot: 4,
        name: "retval",
        structure: s90,
      },
    ],
    methods: [],
    template: null
  },
  slot: 35,
});
Object.assign(s92, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(bumpmap.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 59,
});
Object.assign(s93, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(bumpmap.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!bumpmap.KernelOutput(u8,bumpmap.kernel)",
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
        structure: s87,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s92,
      },
    ],
    methods: [],
    template: null
  },
  slot: 38,
});
Object.assign(s94, {
  ...s,
  type: 3,
  name: "createPartialOutput",
  length: 1,
  byteSize: 160,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 512,
        slot: 0,
        name: "0",
        structure: s77,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 544,
        slot: 1,
        name: "1",
        structure: s77,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 576,
        slot: 2,
        name: "2",
        structure: s77,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 608,
        slot: 3,
        name: "3",
        structure: s77,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 640,
        bitSize: 384,
        byteSize: 48,
        slot: 4,
        name: "4",
        structure: s83,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 512,
        byteSize: 64,
        slot: 5,
        name: "5",
        structure: s88,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1024,
        bitSize: 224,
        byteSize: 28,
        slot: 6,
        name: "retval",
        structure: s93,
      },
    ],
    methods: [],
    template: null
  },
  slot: 36,
});
const f0 = {
  argStruct: s91,
  thunk: 4,
  name: "createOutput",
};
const f1 = {
  argStruct: s94,
  thunk: 9,
  name: "createPartialOutput",
};
Object.assign(s95, {
  ...s,
  type: 2,
  name: "bumpmap",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a127 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s73,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s83,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s87,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s88,
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
  s90, s91, s92, s93, s94, s95,
];
const linkage = finalizeStructures(structures);
const module = s95.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_57fdf29a;
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