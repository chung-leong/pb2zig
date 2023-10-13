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
  useBool,
  useType,
  useFloat,
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
useBool();
useType();
useFloat();
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
  name: "[27:0]u8",
  length: 27,
  byteSize: 28,
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
  name: "*const [27:0]u8",
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
  name: "*const *const [27:0]u8",
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
        structure: s12,
      },
    ],
    methods: [],
    template: null
  },
  slot: 28,
});
Object.assign(s13, {
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
        structure: s12,
      },
    ],
    methods: [],
    template: null
  },
  slot: 73,
});
Object.assign(s14, {
  ...s,
  type: 1,
  name: "[32:0]u8",
  length: 32,
  byteSize: 33,
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
Object.assign(s15, {
  ...s,
  type: 11,
  name: "*const [32:0]u8",
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
  slot: 75,
});
Object.assign(s16, {
  ...s,
  type: 11,
  name: "*const *const [32:0]u8",
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
  slot: 74,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 92, 31, 16, 0 ]);
const a2 = new Uint8Array([ 0 ]);
const a3 = new Uint8Array([ 88, 31, 16, 0 ]);
const a4 = new Uint8Array([ 148, 31, 16, 0 ]);
const a5 = new Uint8Array([ 65, 118, 101, 114, 97, 103, 101, 32, 52, 32, 115, 97, 109, 112, 108, 101, 32, 114, 97, 121, 115, 32, 112, 101, 114, 32, 112, 105, 120, 101, 108, 46, 0 ]);
Object.assign(s17, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [32:0]u8 = \"Average 4 sample rays per pixel.\"}",
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
        name: "defaultValue",
        structure: s13,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s16,
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
              address: 1056604,
            },
          },
        },
        1: {
          structure: s16,
          memory: { array: a3 },
          slots: {
            0: {
              structure: s15,
              memory: { array: a4 },
              address: 1056600,
              slots: {
                0: {
                  structure: s14,
                  memory: { array: a5 },
                  address: 1056660,
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
Object.assign(s18, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [32:0]u8 = \"Average 4 sample rays per pixel.\"}",
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
  slot: 39,
});
Object.assign(s19, {
  ...s,
  name: "f32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 0,
        structure: s19,
      },
    ],
    methods: [],
    template: null
  },
  slot: 31,
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
  slot: 78,
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
  slot: 77,
});
const a6 = new Uint8Array([  ]);
const a7 = new Uint8Array([ 64, 30, 16, 0 ]);
const a8 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a9 = new Uint8Array([ 112, 30, 16, 0 ]);
const a10 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a11 = new Uint8Array([ 80, 31, 16, 0 ]);
const a12 = new Uint8Array([ 123, 20, 174, 71, 225, 122, 228, 63 ]);
Object.assign(s22, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.64}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s19,
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
    ],
    methods: [],
    template: {
      memory: { array: a6 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a7 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a9 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a10 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a11 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a12 },
              address: 1056592,
            },
          },
        },
      },
    },
  },
  slot: 42,
});
Object.assign(s23, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.64}",
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
  slot: 41,
});
const a13 = new Uint8Array([  ]);
const a14 = new Uint8Array([ 64, 30, 16, 0 ]);
const a15 = new Uint8Array([ 144, 30, 16, 0 ]);
const a16 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 8, 64 ]);
const a17 = new Uint8Array([ 72, 31, 16, 0 ]);
const a18 = new Uint8Array([ 205, 204, 204, 204, 204, 204, 244, 63 ]);
Object.assign(s24, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 3, comptime defaultValue: comptime_float = 1.3}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s19,
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
    ],
    methods: [],
    template: {
      memory: { array: a13 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a14 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a15 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a16 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a17 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a18 },
              address: 1056584,
            },
          },
        },
      },
    },
  },
  slot: 44,
});
Object.assign(s25, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 3, comptime defaultValue: comptime_float = 1.3}",
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
  slot: 43,
});
const a19 = new Uint8Array([  ]);
const a20 = new Uint8Array([ 64, 30, 16, 0 ]);
const a21 = new Uint8Array([ 112, 30, 16, 0 ]);
const a22 = new Uint8Array([ 64, 30, 16, 0 ]);
Object.assign(s26, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s19,
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
    ],
    methods: [],
    template: {
      memory: { array: a19 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a20 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a21 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a10 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a22 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
      },
    },
  },
  slot: 46,
});
Object.assign(s27, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0}",
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
  slot: 45,
});
Object.assign(s28, {
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
        structure: s19,
      },
    ],
    methods: [],
    template: null
  },
  slot: 32,
});
const a23 = new Uint8Array([  ]);
const a24 = new Uint8Array([ 240, 30, 16, 0 ]);
const a25 = new Uint8Array([ 205, 204, 204, 204, 204, 204, 0, 192 ]);
const a26 = new Uint8Array([ 232, 30, 16, 0 ]);
const a27 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 8, 192 ]);
const a28 = new Uint8Array([ 232, 30, 16, 0 ]);
const a29 = new Uint8Array([ 224, 30, 16, 0 ]);
const a30 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 248, 191 ]);
Object.assign(s29, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -2.1, comptime comptime_float = -3, comptime comptime_float = -3, comptime comptime_float = -1.5}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "3",
        structure: s21,
      },
    ],
    methods: [],
    template: {
      memory: { array: a23 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a24 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a25 },
              address: 1056496,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a26 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a27 },
              address: 1056488,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a28 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a27 },
              address: 1056488,
            },
          },
        },
        3: {
          structure: s21,
          memory: { array: a29 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a30 },
              address: 1056480,
            },
          },
        },
      },
    },
  },
  slot: 80,
});
Object.assign(s30, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -2.1, comptime comptime_float = -3, comptime comptime_float = -3, comptime comptime_float = -1.5}",
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
  slot: 79,
});
const a31 = new Uint8Array([  ]);
const a32 = new Uint8Array([ 216, 30, 16, 0 ]);
const a33 = new Uint8Array([ 205, 204, 204, 204, 204, 204, 0, 64 ]);
const a34 = new Uint8Array([ 144, 30, 16, 0 ]);
const a35 = new Uint8Array([ 144, 30, 16, 0 ]);
const a36 = new Uint8Array([ 208, 30, 16, 0 ]);
const a37 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 248, 63 ]);
Object.assign(s31, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 2.1, comptime comptime_float = 3, comptime comptime_float = 3, comptime comptime_float = 1.5}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "3",
        structure: s21,
      },
    ],
    methods: [],
    template: {
      memory: { array: a31 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a32 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a33 },
              address: 1056472,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a34 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a16 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a35 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a16 },
              address: 1056400,
            },
          },
        },
        3: {
          structure: s21,
          memory: { array: a36 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a37 },
              address: 1056464,
            },
          },
        },
      },
    },
  },
  slot: 82,
});
Object.assign(s32, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 2.1, comptime comptime_float = 3, comptime comptime_float = 3, comptime comptime_float = 1.5}",
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
  slot: 81,
});
const a38 = new Uint8Array([  ]);
const a39 = new Uint8Array([ 200, 30, 16, 0 ]);
const a40 = new Uint8Array([ 123, 20, 174, 71, 225, 122, 164, 191 ]);
const a41 = new Uint8Array([ 64, 30, 16, 0 ]);
const a42 = new Uint8Array([ 192, 30, 16, 0 ]);
const a43 = new Uint8Array([ 10, 215, 163, 112, 61, 10, 231, 63 ]);
const a44 = new Uint8Array([ 64, 30, 16, 0 ]);
Object.assign(s33, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -0.04, comptime comptime_float = 0, comptime comptime_float = 0.72, comptime comptime_float = 0}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "3",
        structure: s21,
      },
    ],
    methods: [],
    template: {
      memory: { array: a38 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a39 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a40 },
              address: 1056456,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a41 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a42 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a43 },
              address: 1056448,
            },
          },
        },
        3: {
          structure: s21,
          memory: { array: a44 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
      },
    },
  },
  slot: 84,
});
Object.assign(s34, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -0.04, comptime comptime_float = 0, comptime comptime_float = 0.72, comptime comptime_float = 0}",
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
  slot: 83,
});
const a45 = new Uint8Array([  ]);
const a46 = new Uint8Array([ 170, 170, 170, 170 ]);
const a47 = new Uint8Array([  ]);
const a48 = new Uint8Array([ 170, 170, 170, 170 ]);
const a49 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s35, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = -2.1, comptime comptime_float = -3, comptime comptime_float = -3, comptime comptime_float = -1.5} = .{-2.1, -3, -3, -1.5}, comptime maxValue: struct{comptime comptime_float = 2.1, comptime comptime_float = 3, comptime comptime_float = 3, comptime comptime_float = 1.5} = .{2.1, 3, 3, 1.5}, comptime defaultValue: struct{comptime comptime_float = -0.04, comptime comptime_float = 0, comptime comptime_float = 0.72, comptime comptime_float = 0} = .{-0.04, 0, 0.72, 0}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s28,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s30,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s32,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s34,
      },
    ],
    methods: [],
    template: {
      memory: { array: a45 },
      slots: {
        0: {
          structure: s30,
          memory: { array: a46 },
          slots: {
            0: {
              structure: s29,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s32,
          memory: { array: a48 },
          slots: {
            0: {
              structure: s31,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s34,
          memory: { array: a49 },
          slots: {
            0: {
              structure: s33,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 48,
});
Object.assign(s36, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = -2.1, comptime comptime_float = -3, comptime comptime_float = -3, comptime comptime_float = -1.5} = .{-2.1, -3, -3, -1.5}, comptime maxValue: struct{comptime comptime_float = 2.1, comptime comptime_float = 3, comptime comptime_float = 3, comptime comptime_float = 1.5} = .{2.1, 3, 3, 1.5}, comptime defaultValue: struct{comptime comptime_float = -0.04, comptime comptime_float = 0, comptime comptime_float = 0.72, comptime comptime_float = 0} = .{-0.04, 0, 0.72, 0}}",
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
  slot: 47,
});
const a50 = new Uint8Array([  ]);
const a51 = new Uint8Array([ 184, 30, 16, 0 ]);
const a52 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 102, 192 ]);
const a53 = new Uint8Array([ 184, 30, 16, 0 ]);
const a54 = new Uint8Array([ 184, 30, 16, 0 ]);
const a55 = new Uint8Array([ 64, 30, 16, 0 ]);
Object.assign(s37, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = 0}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "3",
        structure: s21,
      },
    ],
    methods: [],
    template: {
      memory: { array: a50 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a51 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a52 },
              address: 1056440,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a53 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a52 },
              address: 1056440,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a54 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a52 },
              address: 1056440,
            },
          },
        },
        3: {
          structure: s21,
          memory: { array: a55 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
      },
    },
  },
  slot: 86,
});
Object.assign(s38, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = 0}",
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
  slot: 85,
});
const a56 = new Uint8Array([  ]);
const a57 = new Uint8Array([ 176, 30, 16, 0 ]);
const a58 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 102, 64 ]);
const a59 = new Uint8Array([ 176, 30, 16, 0 ]);
const a60 = new Uint8Array([ 176, 30, 16, 0 ]);
const a61 = new Uint8Array([ 168, 30, 16, 0 ]);
const a62 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 52, 64 ]);
Object.assign(s39, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 20}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "3",
        structure: s21,
      },
    ],
    methods: [],
    template: {
      memory: { array: a56 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a57 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a58 },
              address: 1056432,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a59 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a58 },
              address: 1056432,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a60 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a58 },
              address: 1056432,
            },
          },
        },
        3: {
          structure: s21,
          memory: { array: a61 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a62 },
              address: 1056424,
            },
          },
        },
      },
    },
  },
  slot: 88,
});
Object.assign(s40, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 20}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s39,
      },
    ],
    methods: [],
    template: null
  },
  slot: 87,
});
const a63 = new Uint8Array([  ]);
const a64 = new Uint8Array([ 160, 30, 16, 0 ]);
const a65 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 62, 192 ]);
const a66 = new Uint8Array([ 64, 30, 16, 0 ]);
const a67 = new Uint8Array([ 152, 30, 16, 0 ]);
const a68 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 52, 192 ]);
const a69 = new Uint8Array([ 144, 30, 16, 0 ]);
Object.assign(s41, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -30, comptime comptime_float = 0, comptime comptime_float = -20, comptime comptime_float = 3}",
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
      {
        ...m,
        type: 8,
        slot: 3,
        name: "3",
        structure: s21,
      },
    ],
    methods: [],
    template: {
      memory: { array: a63 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a64 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a65 },
              address: 1056416,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a66 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a67 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a68 },
              address: 1056408,
            },
          },
        },
        3: {
          structure: s21,
          memory: { array: a69 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a16 },
              address: 1056400,
            },
          },
        },
      },
    },
  },
  slot: 90,
});
Object.assign(s42, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -30, comptime comptime_float = 0, comptime comptime_float = -20, comptime comptime_float = 3}",
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
  slot: 89,
});
const a70 = new Uint8Array([  ]);
const a71 = new Uint8Array([ 170, 170, 170, 170 ]);
const a72 = new Uint8Array([ 170, 170, 170, 170 ]);
const a73 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s43, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = 0} = .{-180, -180, -180, 0}, comptime maxValue: struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 20} = .{180, 180, 180, 20}, comptime defaultValue: struct{comptime comptime_float = -30, comptime comptime_float = 0, comptime comptime_float = -20, comptime comptime_float = 3} = .{-30, 0, -20, 3}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s28,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s38,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s40,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s42,
      },
    ],
    methods: [],
    template: {
      memory: { array: a70 },
      slots: {
        0: {
          structure: s38,
          memory: { array: a71 },
          slots: {
            0: {
              structure: s37,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s40,
          memory: { array: a72 },
          slots: {
            0: {
              structure: s39,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s42,
          memory: { array: a73 },
          slots: {
            0: {
              structure: s41,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 50,
});
Object.assign(s44, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = 0} = .{-180, -180, -180, 0}, comptime maxValue: struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 20} = .{180, 180, 180, 20}, comptime defaultValue: struct{comptime comptime_float = -30, comptime comptime_float = 0, comptime comptime_float = -20, comptime comptime_float = 3} = .{-30, 0, -20, 3}}",
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
  slot: 49,
});
Object.assign(s45, {
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
        structure: s19,
      },
    ],
    methods: [],
    template: null
  },
  slot: 33,
});
const a74 = new Uint8Array([  ]);
const a75 = new Uint8Array([ 136, 30, 16, 0 ]);
const a76 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 36, 192 ]);
const a77 = new Uint8Array([ 136, 30, 16, 0 ]);
const a78 = new Uint8Array([ 136, 30, 16, 0 ]);
Object.assign(s46, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -10, comptime comptime_float = -10, comptime comptime_float = -10}",
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
      memory: { array: a74 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a75 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a76 },
              address: 1056392,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a77 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a76 },
              address: 1056392,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a78 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a76 },
              address: 1056392,
            },
          },
        },
      },
    },
  },
  slot: 92,
});
Object.assign(s47, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -10, comptime comptime_float = -10, comptime comptime_float = -10}",
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
  slot: 91,
});
const a79 = new Uint8Array([  ]);
const a80 = new Uint8Array([ 128, 30, 16, 0 ]);
const a81 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 36, 64 ]);
const a82 = new Uint8Array([ 128, 30, 16, 0 ]);
const a83 = new Uint8Array([ 128, 30, 16, 0 ]);
Object.assign(s48, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 10, comptime comptime_float = 10, comptime comptime_float = 10}",
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
      memory: { array: a79 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a80 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a81 },
              address: 1056384,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a82 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a81 },
              address: 1056384,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a83 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a81 },
              address: 1056384,
            },
          },
        },
      },
    },
  },
  slot: 94,
});
Object.assign(s49, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 10, comptime comptime_float = 10, comptime comptime_float = 10}",
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
  slot: 93,
});
const a84 = new Uint8Array([  ]);
const a85 = new Uint8Array([ 120, 30, 16, 0 ]);
const a86 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 64 ]);
const a87 = new Uint8Array([ 120, 30, 16, 0 ]);
const a88 = new Uint8Array([ 120, 30, 16, 0 ]);
Object.assign(s50, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 2, comptime comptime_float = 2, comptime comptime_float = 2}",
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
      memory: { array: a84 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a85 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a86 },
              address: 1056376,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a87 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a86 },
              address: 1056376,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a88 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a86 },
              address: 1056376,
            },
          },
        },
      },
    },
  },
  slot: 96,
});
Object.assign(s51, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 2, comptime comptime_float = 2, comptime comptime_float = 2}",
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
  slot: 95,
});
const a89 = new Uint8Array([  ]);
const a90 = new Uint8Array([ 170, 170, 170, 170 ]);
const a91 = new Uint8Array([ 170, 170, 170, 170 ]);
const a92 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s52, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -10, comptime comptime_float = -10, comptime comptime_float = -10} = .{-10, -10, -10}, comptime maxValue: struct{comptime comptime_float = 10, comptime comptime_float = 10, comptime comptime_float = 10} = .{10, 10, 10}, comptime defaultValue: struct{comptime comptime_float = 2, comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2, 2}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s45,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s47,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s49,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s51,
      },
    ],
    methods: [],
    template: {
      memory: { array: a89 },
      slots: {
        0: {
          structure: s47,
          memory: { array: a90 },
          slots: {
            0: {
              structure: s46,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s49,
          memory: { array: a91 },
          slots: {
            0: {
              structure: s48,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s51,
          memory: { array: a92 },
          slots: {
            0: {
              structure: s50,
              memory: { array: a47 },
              address: -1431655766,
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
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -10, comptime comptime_float = -10, comptime comptime_float = -10} = .{-10, -10, -10}, comptime maxValue: struct{comptime comptime_float = 10, comptime comptime_float = 10, comptime comptime_float = 10} = .{10, 10, 10}, comptime defaultValue: struct{comptime comptime_float = 2, comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2, 2}}",
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
const a93 = new Uint8Array([  ]);
const a94 = new Uint8Array([ 64, 30, 16, 0 ]);
const a95 = new Uint8Array([ 64, 30, 16, 0 ]);
const a96 = new Uint8Array([ 64, 30, 16, 0 ]);
Object.assign(s54, {
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
      memory: { array: a93 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a94 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a95 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a96 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
      },
    },
  },
  slot: 98,
});
Object.assign(s55, {
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
        structure: s54,
      },
    ],
    methods: [],
    template: null
  },
  slot: 97,
});
const a97 = new Uint8Array([  ]);
const a98 = new Uint8Array([ 112, 30, 16, 0 ]);
const a99 = new Uint8Array([ 112, 30, 16, 0 ]);
const a100 = new Uint8Array([ 112, 30, 16, 0 ]);
Object.assign(s56, {
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
      memory: { array: a97 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a98 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a10 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a99 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a10 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a100 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a10 },
              address: 1056368,
            },
          },
        },
      },
    },
  },
  slot: 100,
});
Object.assign(s57, {
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
        structure: s56,
      },
    ],
    methods: [],
    template: null
  },
  slot: 99,
});
const a101 = new Uint8Array([  ]);
const a102 = new Uint8Array([ 104, 30, 16, 0 ]);
const a103 = new Uint8Array([ 51, 51, 51, 51, 51, 51, 211, 63 ]);
const a104 = new Uint8Array([ 96, 30, 16, 0 ]);
const a105 = new Uint8Array([ 31, 133, 235, 81, 184, 30, 213, 63 ]);
const a106 = new Uint8Array([ 88, 30, 16, 0 ]);
const a107 = new Uint8Array([ 102, 102, 102, 102, 102, 102, 214, 63 ]);
Object.assign(s58, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.3, comptime comptime_float = 0.33, comptime comptime_float = 0.35}",
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
      memory: { array: a101 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a102 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a103 },
              address: 1056360,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a104 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a105 },
              address: 1056352,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a106 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a107 },
              address: 1056344,
            },
          },
        },
      },
    },
  },
  slot: 102,
});
Object.assign(s59, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.3, comptime comptime_float = 0.33, comptime comptime_float = 0.35}",
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
  slot: 101,
});
Object.assign(s60, {
  ...s,
  type: 1,
  name: "[7:0]u8",
  length: 7,
  byteSize: 8,
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
  slot: 105,
});
Object.assign(s61, {
  ...s,
  type: 11,
  name: "*const [7:0]u8",
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
  slot: 104,
});
Object.assign(s62, {
  ...s,
  type: 11,
  name: "*const *const [7:0]u8",
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
  slot: 103,
});
const a108 = new Uint8Array([  ]);
const a109 = new Uint8Array([ 170, 170, 170, 170 ]);
const a110 = new Uint8Array([ 170, 170, 170, 170 ]);
const a111 = new Uint8Array([ 170, 170, 170, 170 ]);
const a112 = new Uint8Array([ 64, 31, 16, 0 ]);
const a113 = new Uint8Array([ 140, 31, 16, 0 ]);
const a114 = new Uint8Array([ 97, 101, 67, 111, 108, 111, 114, 0 ]);
Object.assign(s63, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.3, comptime comptime_float = 0.33, comptime comptime_float = 0.35} = .{0.3, 0.33, 0.35}, comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s45,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s55,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s57,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s59,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "aeUIControl",
        structure: s62,
      },
    ],
    methods: [],
    template: {
      memory: { array: a108 },
      slots: {
        0: {
          structure: s55,
          memory: { array: a109 },
          slots: {
            0: {
              structure: s54,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s57,
          memory: { array: a110 },
          slots: {
            0: {
              structure: s56,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s59,
          memory: { array: a111 },
          slots: {
            0: {
              structure: s58,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s62,
          memory: { array: a112 },
          slots: {
            0: {
              structure: s61,
              memory: { array: a113 },
              address: 1056576,
              slots: {
                0: {
                  structure: s60,
                  memory: { array: a114 },
                  address: 1056652,
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
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.3, comptime comptime_float = 0.33, comptime comptime_float = 0.35} = .{0.3, 0.33, 0.35}, comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
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
Object.assign(s65, {
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
  slot: 108,
});
Object.assign(s66, {
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
        structure: s65,
      },
    ],
    methods: [],
    template: null
  },
  slot: 107,
});
Object.assign(s67, {
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
        structure: s66,
      },
    ],
    methods: [],
    template: null
  },
  slot: 106,
});
const a115 = new Uint8Array([  ]);
const a116 = new Uint8Array([ 64, 30, 16, 0 ]);
const a117 = new Uint8Array([ 112, 30, 16, 0 ]);
const a118 = new Uint8Array([ 112, 30, 16, 0 ]);
const a119 = new Uint8Array([ 68, 31, 16, 0 ]);
const a120 = new Uint8Array([ 115, 31, 16, 0 ]);
const a121 = new Uint8Array([ 66, 97, 99, 107, 103, 114, 111, 117, 110, 100, 32, 116, 114, 97, 110, 115, 112, 97, 114, 101, 110, 99, 121, 46, 0 ]);
Object.assign(s68, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [24:0]u8 = \"Background transparency.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s19,
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
        structure: s67,
      },
    ],
    methods: [],
    template: {
      memory: { array: a115 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a116 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a117 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a10 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a118 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a10 },
              address: 1056368,
            },
          },
        },
        3: {
          structure: s67,
          memory: { array: a119 },
          slots: {
            0: {
              structure: s66,
              memory: { array: a120 },
              address: 1056580,
              slots: {
                0: {
                  structure: s65,
                  memory: { array: a121 },
                  address: 1056627,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 56,
});
Object.assign(s69, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [24:0]u8 = \"Background transparency.\"}",
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
  slot: 55,
});
const a122 = new Uint8Array([  ]);
const a123 = new Uint8Array([ 80, 30, 16, 0 ]);
const a124 = new Uint8Array([ 41, 92, 143, 194, 245, 40, 228, 63 ]);
const a125 = new Uint8Array([ 72, 30, 16, 0 ]);
const a126 = new Uint8Array([ 123, 20, 174, 71, 225, 122, 180, 63 ]);
const a127 = new Uint8Array([ 64, 30, 16, 0 ]);
Object.assign(s70, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.63, comptime comptime_float = 0.08, comptime comptime_float = 0}",
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
      memory: { array: a122 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a123 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a124 },
              address: 1056336,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a125 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a126 },
              address: 1056328,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a127 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
      },
    },
  },
  slot: 110,
});
Object.assign(s71, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.63, comptime comptime_float = 0.08, comptime comptime_float = 0}",
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
  slot: 109,
});
const a128 = new Uint8Array([  ]);
const a129 = new Uint8Array([ 170, 170, 170, 170 ]);
const a130 = new Uint8Array([ 170, 170, 170, 170 ]);
const a131 = new Uint8Array([ 170, 170, 170, 170 ]);
const a132 = new Uint8Array([ 64, 31, 16, 0 ]);
Object.assign(s72, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.63, comptime comptime_float = 0.08, comptime comptime_float = 0} = .{0.63, 0.08, 0}, comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s45,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s55,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s57,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s71,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "aeUIControl",
        structure: s62,
      },
    ],
    methods: [],
    template: {
      memory: { array: a128 },
      slots: {
        0: {
          structure: s55,
          memory: { array: a129 },
          slots: {
            0: {
              structure: s54,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s57,
          memory: { array: a130 },
          slots: {
            0: {
              structure: s56,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s71,
          memory: { array: a131 },
          slots: {
            0: {
              structure: s70,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s62,
          memory: { array: a132 },
          slots: {
            0: {
              structure: s61,
              memory: { array: a113 },
              address: 1056576,
              slots: {
                0: {
                  structure: s60,
                  memory: { array: a114 },
                  address: 1056652,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 58,
});
Object.assign(s73, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.63, comptime comptime_float = 0.08, comptime comptime_float = 0} = .{0.63, 0.08, 0}, comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s72,
      },
    ],
    methods: [],
    template: null
  },
  slot: 57,
});
const a133 = new Uint8Array([  ]);
const a134 = new Uint8Array([ 64, 30, 16, 0 ]);
const a135 = new Uint8Array([ 112, 30, 16, 0 ]);
const a136 = new Uint8Array([ 56, 31, 16, 0 ]);
const a137 = new Uint8Array([ 164, 112, 61, 10, 215, 163, 192, 63 ]);
Object.assign(s74, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.13}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s19,
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
    ],
    methods: [],
    template: {
      memory: { array: a133 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a134 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a135 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a10 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a136 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a137 },
              address: 1056568,
            },
          },
        },
      },
    },
  },
  slot: 60,
});
Object.assign(s75, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.13}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s74,
      },
    ],
    methods: [],
    template: null
  },
  slot: 59,
});
const a138 = new Uint8Array([  ]);
const a139 = new Uint8Array([ 64, 30, 16, 0 ]);
const a140 = new Uint8Array([ 112, 30, 16, 0 ]);
const a141 = new Uint8Array([ 48, 31, 16, 0 ]);
const a142 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 224, 63 ]);
const a143 = new Uint8Array([ 40, 31, 16, 0 ]);
const a144 = new Uint8Array([ 103, 31, 16, 0 ]);
const a145 = new Uint8Array([ 115, 112, 101, 99, 117, 108, 97, 114, 105, 116, 121, 0 ]);
Object.assign(s76, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.5, comptime description: *const [11:0]u8 = \"specularity\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s19,
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
        structure: s6,
      },
    ],
    methods: [],
    template: {
      memory: { array: a138 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a139 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a8 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a140 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a10 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a141 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a142 },
              address: 1056560,
            },
          },
        },
        3: {
          structure: s6,
          memory: { array: a143 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a144 },
              address: 1056552,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a145 },
                  address: 1056615,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 62,
});
Object.assign(s77, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.5, comptime description: *const [11:0]u8 = \"specularity\"}",
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
  slot: 61,
});
Object.assign(s78, {
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
  slot: 113,
});
Object.assign(s79, {
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
        structure: s78,
      },
    ],
    methods: [],
    template: null
  },
  slot: 112,
});
Object.assign(s80, {
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
        structure: s79,
      },
    ],
    methods: [],
    template: null
  },
  slot: 111,
});
const a146 = new Uint8Array([  ]);
const a147 = new Uint8Array([ 32, 31, 16, 0 ]);
const a148 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 185, 63 ]);
const a149 = new Uint8Array([ 24, 31, 16, 0 ]);
const a150 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 73, 64 ]);
const a151 = new Uint8Array([ 16, 31, 16, 0 ]);
const a152 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 28, 64 ]);
const a153 = new Uint8Array([ 8, 31, 16, 0 ]);
const a154 = new Uint8Array([ 93, 31, 16, 0 ]);
const a155 = new Uint8Array([ 115, 104, 105, 110, 105, 110, 101, 115, 115, 0 ]);
Object.assign(s81, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 50, comptime defaultValue: comptime_float = 7, comptime description: *const [9:0]u8 = \"shininess\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s19,
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
        structure: s80,
      },
    ],
    methods: [],
    template: {
      memory: { array: a146 },
      slots: {
        0: {
          structure: s21,
          memory: { array: a147 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a148 },
              address: 1056544,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a149 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a150 },
              address: 1056536,
            },
          },
        },
        2: {
          structure: s21,
          memory: { array: a151 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a152 },
              address: 1056528,
            },
          },
        },
        3: {
          structure: s80,
          memory: { array: a153 },
          slots: {
            0: {
              structure: s79,
              memory: { array: a154 },
              address: 1056520,
              slots: {
                0: {
                  structure: s78,
                  memory: { array: a155 },
                  address: 1056605,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 64,
});
Object.assign(s82, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 50, comptime defaultValue: comptime_float = 7, comptime description: *const [9:0]u8 = \"shininess\"}",
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
  slot: 63,
});
const a156 = new Uint8Array([  ]);
const a157 = new Uint8Array([ 4, 31, 16, 0 ]);
const a158 = new Uint8Array([ 2, 0, 0, 0 ]);
const a159 = new Uint8Array([ 0, 31, 16, 0 ]);
const a160 = new Uint8Array([ 14, 0, 0, 0 ]);
const a161 = new Uint8Array([ 252, 30, 16, 0 ]);
const a162 = new Uint8Array([ 8, 0, 0, 0 ]);
Object.assign(s83, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 2, comptime maxValue: comptime_int = 14, comptime defaultValue: comptime_int = 8}",
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
      memory: { array: a156 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a157 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a158 },
              address: 1056516,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a159 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a160 },
              address: 1056512,
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
              address: 1056508,
            },
          },
        },
      },
    },
  },
  slot: 66,
});
Object.assign(s84, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 2, comptime maxValue: comptime_int = 14, comptime defaultValue: comptime_int = 8}",
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
  slot: 65,
});
Object.assign(s85, {
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
  slot: 34,
});
const a163 = new Uint8Array([  ]);
const a164 = new Uint8Array([ 56, 30, 16, 0 ]);
const a165 = new Uint8Array([ 100, 0, 0, 0 ]);
const a166 = new Uint8Array([ 56, 30, 16, 0 ]);
Object.assign(s86, {
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
      memory: { array: a163 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a164 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a165 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a166 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a165 },
              address: 1056312,
            },
          },
        },
      },
    },
  },
  slot: 115,
});
Object.assign(s87, {
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
        structure: s86,
      },
    ],
    methods: [],
    template: null
  },
  slot: 114,
});
const a167 = new Uint8Array([  ]);
const a168 = new Uint8Array([ 52, 30, 16, 0 ]);
const a169 = new Uint8Array([ 0, 8, 0, 0 ]);
const a170 = new Uint8Array([ 52, 30, 16, 0 ]);
Object.assign(s88, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_int = 2048, comptime comptime_int = 2048}",
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
      memory: { array: a167 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a168 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a169 },
              address: 1056308,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a170 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a169 },
              address: 1056308,
            },
          },
        },
      },
    },
  },
  slot: 117,
});
Object.assign(s89, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_int = 2048, comptime comptime_int = 2048}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s88,
      },
    ],
    methods: [],
    template: null
  },
  slot: 116,
});
const a171 = new Uint8Array([  ]);
const a172 = new Uint8Array([ 48, 30, 16, 0 ]);
const a173 = new Uint8Array([ 0, 2, 0, 0 ]);
const a174 = new Uint8Array([ 48, 30, 16, 0 ]);
Object.assign(s90, {
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
      memory: { array: a171 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a172 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a173 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a174 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a173 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 119,
});
Object.assign(s91, {
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
        structure: s90,
      },
    ],
    methods: [],
    template: null
  },
  slot: 118,
});
const a175 = new Uint8Array([  ]);
const a176 = new Uint8Array([ 170, 170, 170, 170 ]);
const a177 = new Uint8Array([ 170, 170, 170, 170 ]);
const a178 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s92, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 2048, comptime comptime_int = 2048} = .{2048, 2048}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s85,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s87,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s89,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s91,
      },
    ],
    methods: [],
    template: {
      memory: { array: a175 },
      slots: {
        0: {
          structure: s87,
          memory: { array: a176 },
          slots: {
            0: {
              structure: s86,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s89,
          memory: { array: a177 },
          slots: {
            0: {
              structure: s88,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s91,
          memory: { array: a178 },
          slots: {
            0: {
              structure: s90,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 68,
});
Object.assign(s93, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 2048, comptime comptime_int = 2048} = .{2048, 2048}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s92,
      },
    ],
    methods: [],
    template: null
  },
  slot: 67,
});
const a179 = new Uint8Array([  ]);
const a180 = new Uint8Array([ 170, 170, 170, 170 ]);
const a181 = new Uint8Array([ 170, 170, 170, 170 ]);
const a182 = new Uint8Array([ 170, 170, 170, 170 ]);
const a183 = new Uint8Array([ 170, 170, 170, 170 ]);
const a184 = new Uint8Array([ 170, 170, 170, 170 ]);
const a185 = new Uint8Array([ 170, 170, 170, 170 ]);
const a186 = new Uint8Array([ 170, 170, 170, 170 ]);
const a187 = new Uint8Array([ 170, 170, 170, 170 ]);
const a188 = new Uint8Array([ 170, 170, 170, 170 ]);
const a189 = new Uint8Array([ 170, 170, 170, 170 ]);
const a190 = new Uint8Array([ 170, 170, 170, 170 ]);
const a191 = new Uint8Array([ 170, 170, 170, 170 ]);
const a192 = new Uint8Array([ 170, 170, 170, 170 ]);
const a193 = new Uint8Array([ 170, 170, 170, 170 ]);
const a194 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s94, {
  ...s,
  type: 2,
  name: "struct{comptime antialiasing: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [32:0]u8 = \"Average 4 sample rays per pixel.\"} = .{.type = bool, .defaultValue = false, .description = \"Average 4 sample rays per pixel.\"}, comptime ambientLight: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.64} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.64}, comptime ambientOcclusion: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 3, comptime defaultValue: comptime_float = 1.3} = .{.type = f32, .minValue = 0, .maxValue = 3, .defaultValue = 1.3}, comptime shadows: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0}, comptime mu: struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = -2.1, comptime comptime_float = -3, comptime comptime_float = -3, comptime comptime_float = -1.5} = .{-2.1, -3, -3, -1.5}, comptime maxValue: struct{comptime comptime_float = 2.1, comptime comptime_float = 3, comptime comptime_float = 3, comptime comptime_float = 1.5} = .{2.1, 3, 3, 1.5}, comptime defaultValue: struct{comptime comptime_float = -0.04, comptime comptime_float = 0, comptime comptime_float = 0.72, comptime comptime_float = 0} = .{-0.04, 0, 0.72, 0}} = .{.type = @Vector(4, f32), .minValue = .{-2.1, -3, -3, -1.5}, .maxValue = .{2.1, 3, 3, 1.5}, .defaultValue = .{-0.04, 0, 0.72, 0}}, comptime camera: struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = 0} = .{-180, -180, -180, 0}, comptime maxValue: struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 20} = .{180, 180, 180, 20}, comptime defaultValue: struct{comptime comptime_float = -30, comptime comptime_float = 0, comptime comptime_float = -20, comptime comptime_float = 3} = .{-30, 0, -20, 3}} = .{.type = @Vector(4, f32), .minValue = .{-180, -180, -180, 0}, .maxValue = .{180, 180, 180, 20}, .defaultValue = .{-30, 0, -20, 3}}, comptime light: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -10, comptime comptime_float = -10, comptime comptime_float = -10} = .{-10, -10, -10}, comptime maxValue: struct{comptime comptime_float = 10, comptime comptime_float = 10, comptime comptime_float = 10} = .{10, 10, 10}, comptime defaultValue: struct{comptime comptime_float = 2, comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2, 2}} = .{.type = @Vector(3, f32), .minValue = .{-10, -10, -10}, .maxValue = .{10, 10, 10}, .defaultValue = .{2, 2, 2}}, comptime background: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.3, comptime comptime_float = 0.33, comptime comptime_float = 0.35} = .{0.3, 0.33, 0.35}, comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0.3, 0.33, 0.35}, .aeUIControl = \"aeColor\"}, comptime backgroundTransparency: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [24:0]u8 = \"Background transparency.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 1, .description = \"Background transparency.\"}, comptime color: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.63, comptime comptime_float = 0.08, comptime comptime_float = 0} = .{0.63, 0.08, 0}, comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0.63, 0.08, 0}, .aeUIControl = \"aeColor\"}, comptime colorSpread: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.13} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.13}, comptime specularity: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.5, comptime description: *const [11:0]u8 = \"specularity\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.5, .description = \"specularity\"}, comptime specularExponent: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 50, comptime defaultValue: comptime_float = 7, comptime description: *const [9:0]u8 = \"shininess\"} = .{.type = f32, .minValue = 0.1, .maxValue = 50, .defaultValue = 7, .description = \"shininess\"}, comptime maxIterations: struct{comptime type: type = i32, comptime minValue: comptime_int = 2, comptime maxValue: comptime_int = 14, comptime defaultValue: comptime_int = 8} = .{.type = i32, .minValue = 2, .maxValue = 14, .defaultValue = 8}, comptime size: struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 2048, comptime comptime_int = 2048} = .{2048, 2048}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}} = .{.type = @Vector(2, i32), .minValue = .{100, 100}, .maxValue = .{2048, 2048}, .defaultValue = .{512, 512}}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "antialiasing",
        structure: s18,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "ambientLight",
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "ambientOcclusion",
        structure: s25,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "shadows",
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "mu",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "camera",
        structure: s44,
      },
      {
        ...m,
        type: 8,
        slot: 6,
        name: "light",
        structure: s53,
      },
      {
        ...m,
        type: 8,
        slot: 7,
        name: "background",
        structure: s64,
      },
      {
        ...m,
        type: 8,
        slot: 8,
        name: "backgroundTransparency",
        structure: s69,
      },
      {
        ...m,
        type: 8,
        slot: 9,
        name: "color",
        structure: s73,
      },
      {
        ...m,
        type: 8,
        slot: 10,
        name: "colorSpread",
        structure: s75,
      },
      {
        ...m,
        type: 8,
        slot: 11,
        name: "specularity",
        structure: s77,
      },
      {
        ...m,
        type: 8,
        slot: 12,
        name: "specularExponent",
        structure: s82,
      },
      {
        ...m,
        type: 8,
        slot: 13,
        name: "maxIterations",
        structure: s84,
      },
      {
        ...m,
        type: 8,
        slot: 14,
        name: "size",
        structure: s93,
      },
    ],
    methods: [],
    template: {
      memory: { array: a179 },
      slots: {
        0: {
          structure: s18,
          memory: { array: a180 },
          slots: {
            0: {
              structure: s17,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a181 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s25,
          memory: { array: a182 },
          slots: {
            0: {
              structure: s24,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s27,
          memory: { array: a183 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s36,
          memory: { array: a184 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s44,
          memory: { array: a185 },
          slots: {
            0: {
              structure: s43,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s53,
          memory: { array: a186 },
          slots: {
            0: {
              structure: s52,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        7: {
          structure: s64,
          memory: { array: a187 },
          slots: {
            0: {
              structure: s63,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        8: {
          structure: s69,
          memory: { array: a188 },
          slots: {
            0: {
              structure: s68,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        9: {
          structure: s73,
          memory: { array: a189 },
          slots: {
            0: {
              structure: s72,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        10: {
          structure: s75,
          memory: { array: a190 },
          slots: {
            0: {
              structure: s74,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        11: {
          structure: s77,
          memory: { array: a191 },
          slots: {
            0: {
              structure: s76,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        12: {
          structure: s82,
          memory: { array: a192 },
          slots: {
            0: {
              structure: s81,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        13: {
          structure: s84,
          memory: { array: a193 },
          slots: {
            0: {
              structure: s83,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        14: {
          structure: s93,
          memory: { array: a194 },
          slots: {
            0: {
              structure: s92,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 15,
});
Object.assign(s95, {
  ...s,
  type: 11,
  name: "*const struct{comptime antialiasing: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [32:0]u8 = \"Average 4 sample rays per pixel.\"} = .{.type = bool, .defaultValue = false, .description = \"Average 4 sample rays per pixel.\"}, comptime ambientLight: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.64} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.64}, comptime ambientOcclusion: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 3, comptime defaultValue: comptime_float = 1.3} = .{.type = f32, .minValue = 0, .maxValue = 3, .defaultValue = 1.3}, comptime shadows: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0}, comptime mu: struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = -2.1, comptime comptime_float = -3, comptime comptime_float = -3, comptime comptime_float = -1.5} = .{-2.1, -3, -3, -1.5}, comptime maxValue: struct{comptime comptime_float = 2.1, comptime comptime_float = 3, comptime comptime_float = 3, comptime comptime_float = 1.5} = .{2.1, 3, 3, 1.5}, comptime defaultValue: struct{comptime comptime_float = -0.04, comptime comptime_float = 0, comptime comptime_float = 0.72, comptime comptime_float = 0} = .{-0.04, 0, 0.72, 0}} = .{.type = @Vector(4, f32), .minValue = .{-2.1, -3, -3, -1.5}, .maxValue = .{2.1, 3, 3, 1.5}, .defaultValue = .{-0.04, 0, 0.72, 0}}, comptime camera: struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = 0} = .{-180, -180, -180, 0}, comptime maxValue: struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 20} = .{180, 180, 180, 20}, comptime defaultValue: struct{comptime comptime_float = -30, comptime comptime_float = 0, comptime comptime_float = -20, comptime comptime_float = 3} = .{-30, 0, -20, 3}} = .{.type = @Vector(4, f32), .minValue = .{-180, -180, -180, 0}, .maxValue = .{180, 180, 180, 20}, .defaultValue = .{-30, 0, -20, 3}}, comptime light: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -10, comptime comptime_float = -10, comptime comptime_float = -10} = .{-10, -10, -10}, comptime maxValue: struct{comptime comptime_float = 10, comptime comptime_float = 10, comptime comptime_float = 10} = .{10, 10, 10}, comptime defaultValue: struct{comptime comptime_float = 2, comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2, 2}} = .{.type = @Vector(3, f32), .minValue = .{-10, -10, -10}, .maxValue = .{10, 10, 10}, .defaultValue = .{2, 2, 2}}, comptime background: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.3, comptime comptime_float = 0.33, comptime comptime_float = 0.35} = .{0.3, 0.33, 0.35}, comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0.3, 0.33, 0.35}, .aeUIControl = \"aeColor\"}, comptime backgroundTransparency: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [24:0]u8 = \"Background transparency.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 1, .description = \"Background transparency.\"}, comptime color: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.63, comptime comptime_float = 0.08, comptime comptime_float = 0} = .{0.63, 0.08, 0}, comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0.63, 0.08, 0}, .aeUIControl = \"aeColor\"}, comptime colorSpread: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.13} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.13}, comptime specularity: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.5, comptime description: *const [11:0]u8 = \"specularity\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.5, .description = \"specularity\"}, comptime specularExponent: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 50, comptime defaultValue: comptime_float = 7, comptime description: *const [9:0]u8 = \"shininess\"} = .{.type = f32, .minValue = 0.1, .maxValue = 50, .defaultValue = 7, .description = \"shininess\"}, comptime maxIterations: struct{comptime type: type = i32, comptime minValue: comptime_int = 2, comptime maxValue: comptime_int = 14, comptime defaultValue: comptime_int = 8} = .{.type = i32, .minValue = 2, .maxValue = 14, .defaultValue = 8}, comptime size: struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 2048, comptime comptime_int = 2048} = .{2048, 2048}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}} = .{.type = @Vector(2, i32), .minValue = .{100, 100}, .maxValue = .{2048, 2048}, .defaultValue = .{512, 512}}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s94,
      },
    ],
    methods: [],
    template: null
  },
  slot: 14,
});
const a195 = new Uint8Array([  ]);
Object.assign(s96, {
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
      memory: { array: a195 },
    },
  },
  slot: 17,
});
Object.assign(s97, {
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
        structure: s96,
      },
    ],
    methods: [],
    template: null
  },
  slot: 16,
});
const a196 = new Uint8Array([  ]);
const a197 = new Uint8Array([ 248, 30, 16, 0 ]);
const a198 = new Uint8Array([ 4, 0, 0, 0 ]);
Object.assign(s98, {
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
      memory: { array: a196 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a197 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a198 },
              address: 1056504,
            },
          },
        },
      },
    },
  },
  slot: 70,
});
Object.assign(s99, {
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
        structure: s98,
      },
    ],
    methods: [],
    template: null
  },
  slot: 69,
});
const a199 = new Uint8Array([  ]);
const a200 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s100, {
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
        structure: s99,
      },
    ],
    methods: [],
    template: {
      memory: { array: a199 },
      slots: {
        0: {
          structure: s99,
          memory: { array: a200 },
          slots: {
            0: {
              structure: s98,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 19,
});
Object.assign(s101, {
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
        structure: s100,
      },
    ],
    methods: [],
    template: null
  },
  slot: 18,
});
const a201 = new Uint8Array([  ]);
const a202 = new Uint8Array([  ]);
const a203 = new Uint8Array([ 148, 140, 16, 0 ]);
const a204 = new Uint8Array([ 74, 140, 16, 0 ]);
const a205 = new Uint8Array([ 99, 111, 109, 46, 115, 117, 98, 98, 108, 117, 101, 46, 102, 105, 108, 116, 101, 114, 115, 0 ]);
const a206 = new Uint8Array([ 144, 140, 16, 0 ]);
const a207 = new Uint8Array([ 52, 140, 16, 0 ]);
const a208 = new Uint8Array([ 84, 111, 109, 32, 66, 101, 100, 100, 97, 114, 100, 0 ]);
const a209 = new Uint8Array([ 140, 140, 16, 0 ]);
const a210 = new Uint8Array([ 1, 0, 0, 0 ]);
const a211 = new Uint8Array([ 136, 140, 16, 0 ]);
const a212 = new Uint8Array([ 9, 140, 16, 0 ]);
const a213 = new Uint8Array([ 81, 117, 97, 116, 101, 114, 110, 105, 111, 110, 32, 74, 117, 108, 105, 97, 32, 82, 97, 121, 32, 84, 114, 97, 99, 101, 114, 0 ]);
const a214 = new Uint8Array([ 170, 170, 170, 170 ]);
const a215 = new Uint8Array([ 170, 170, 170, 170 ]);
const a216 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s102, {
  ...s,
  type: 2,
  name: "quaternion-julia.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a201 },
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
        structure: s95,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "inputImages",
        structure: s97,
      },
      {
        ...m,
        type: 6,
        slot: 6,
        name: "outputImages",
        structure: s101,
      },
    ],
    methods: [],
    template: {
      memory: { array: a202 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a203 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a204 },
              address: 1084564,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a205 },
                  address: 1084490,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a206 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a207 },
              address: 1084560,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a208 },
                  address: 1084468,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a209 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a210 },
              address: 1084556,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a211 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a212 },
              address: 1084552,
              slots: {
                0: {
                  structure: s9,
                  memory: { array: a213 },
                  address: 1084425,
                },
              },
            },
          },
        },
        4: {
          structure: s95,
          memory: { array: a214 },
          slots: {
            0: {
              structure: s94,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s97,
          memory: { array: a215 },
          slots: {
            0: {
              structure: s96,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s101,
          memory: { array: a216 },
          slots: {
            0: {
              structure: s100,
              memory: { array: a47 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
const a217 = new Uint8Array([  ]);
Object.assign(s103, {
  ...s,
  type: 2,
  name: "quaternion-julia.KernelInput(u8,quaternion-julia.kernel)",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a217 },
    },
  },
  slot: 20,
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
  slot: 25,
});
Object.assign(s105, {
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
  slot: 24,
});
Object.assign(s106, {
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
        structure: s105,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
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
  slot: 26,
});
const a218 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s108, {
  ...s,
  type: 9,
  name: "quaternion-julia.ColorSpace",
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
      memory: { array: a218 },
    },
  },
  slot: 27,
});
Object.assign(s109, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s109,
      },
    ],
    methods: [],
    template: null
  },
  slot: 29,
});
const a219 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a220 = new Uint8Array([  ]);
const a221 = new Uint8Array([ 248, 30, 16, 0 ]);
Object.assign(s110, {
  ...s,
  type: 2,
  name: "quaternion-julia.Image(u8,4,true)",
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
        structure: s12,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s109,
      },
    ],
    methods: [],
    template: {
      memory: { array: a219 },
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
        structure: s28,
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
      memory: { array: a220 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a221 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a198 },
              address: 1056504,
            },
          },
        },
      },
    },
  },
  slot: 22,
});
const a222 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a223 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a224 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a225 = new Uint8Array([  ]);
Object.assign(s111, {
  ...s,
  type: 2,
  name: "quaternion-julia.KernelOutput(u8,quaternion-julia.kernel)",
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
        structure: s110,
      },
    ],
    methods: [],
    template: {
      memory: { array: a222 },
      slots: {
        0: {
          structure: s110,
          memory: { array: a223 },
          slots: {
            0: {
              structure: s106,
              memory: { array: a224 },
              slots: {
                0: {
                  structure: s105,
                  memory: { array: a225 },
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
const a226 = new Uint8Array([ 10, 215, 35, 189, 0, 0, 0, 0, 236, 81, 56, 63, 0, 0, 0, 0, 0, 0, 240, 193, 0, 0, 0, 0, 0, 0, 160, 193, 0, 0, 64, 64, 0, 0, 0, 64, 0, 0, 0, 64, 0, 0, 0, 64, 0, 0, 0, 0, 154, 153, 153, 62, 195, 245, 168, 62, 51, 51, 179, 62, 0, 0, 0, 0, 174, 71, 33, 63, 10, 215, 163, 61, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 10, 215, 35, 63, 102, 102, 166, 63, 0, 0, 0, 0, 0, 0, 128, 63, 184, 30, 5, 62, 0, 0, 0, 63, 0, 0, 224, 64, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s112, {
  ...s,
  type: 2,
  name: "quaternion-julia.KernelParameters(quaternion-julia.kernel)",
  length: 1,
  byteSize: 128,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 1,
        bitOffset: 960,
        bitSize: 1,
        byteSize: 1,
        slot: 0,
        name: "antialiasing",
        structure: s12,
      },
      {
        ...m,
        type: 4,
        bitOffset: 704,
        slot: 1,
        name: "ambientLight",
        structure: s19,
      },
      {
        ...m,
        type: 4,
        bitOffset: 736,
        slot: 2,
        name: "ambientOcclusion",
        structure: s19,
      },
      {
        ...m,
        type: 4,
        bitOffset: 768,
        slot: 3,
        name: "shadows",
        structure: s19,
      },
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 128,
        byteSize: 16,
        slot: 4,
        name: "mu",
        structure: s28,
      },
      {
        ...m,
        type: 6,
        bitOffset: 128,
        bitSize: 128,
        byteSize: 16,
        slot: 5,
        name: "camera",
        structure: s28,
      },
      {
        ...m,
        type: 6,
        bitOffset: 256,
        bitSize: 96,
        byteSize: 16,
        slot: 6,
        name: "light",
        structure: s45,
      },
      {
        ...m,
        type: 6,
        bitOffset: 384,
        bitSize: 96,
        byteSize: 16,
        slot: 7,
        name: "background",
        structure: s45,
      },
      {
        ...m,
        type: 4,
        bitOffset: 800,
        slot: 8,
        name: "backgroundTransparency",
        structure: s19,
      },
      {
        ...m,
        type: 6,
        bitOffset: 512,
        bitSize: 96,
        byteSize: 16,
        slot: 9,
        name: "color",
        structure: s45,
      },
      {
        ...m,
        type: 4,
        bitOffset: 832,
        slot: 10,
        name: "colorSpread",
        structure: s19,
      },
      {
        ...m,
        type: 4,
        bitOffset: 864,
        slot: 11,
        name: "specularity",
        structure: s19,
      },
      {
        ...m,
        type: 4,
        bitOffset: 896,
        slot: 12,
        name: "specularExponent",
        structure: s19,
      },
      {
        ...m,
        type: 2,
        bitOffset: 928,
        slot: 13,
        name: "maxIterations",
        structure: s7,
      },
      {
        ...m,
        type: 6,
        bitOffset: 640,
        bitSize: 64,
        byteSize: 8,
        slot: 14,
        name: "size",
        structure: s85,
      },
    ],
    methods: [],
    template: {
      memory: { array: a226 },
    },
  },
  slot: 30,
});
Object.assign(s113, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(quaternion-julia.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 71,
});
Object.assign(s114, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(quaternion-julia.createOutput)).Fn.return_type.?).ErrorUnion.error_set!quaternion-julia.KernelOutput(u8,quaternion-julia.kernel)",
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
        structure: s111,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s113,
      },
    ],
    methods: [],
    template: null
  },
  slot: 37,
});
Object.assign(s115, {
  ...s,
  type: 3,
  name: "createOutput",
  length: 1,
  byteSize: 176,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 1024,
        slot: 0,
        name: "0",
        structure: s107,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 1056,
        slot: 1,
        name: "1",
        structure: s107,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1408,
        bitSize: 0,
        byteSize: 0,
        slot: 2,
        name: "2",
        structure: s103,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 1024,
        byteSize: 128,
        slot: 3,
        name: "3",
        structure: s112,
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
        structure: s114,
      },
    ],
    methods: [],
    template: null
  },
  slot: 35,
});
Object.assign(s116, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(quaternion-julia.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 72,
});
Object.assign(s117, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(quaternion-julia.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!quaternion-julia.KernelOutput(u8,quaternion-julia.kernel)",
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
        structure: s111,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s116,
      },
    ],
    methods: [],
    template: null
  },
  slot: 38,
});
Object.assign(s118, {
  ...s,
  type: 3,
  name: "createPartialOutput",
  length: 1,
  byteSize: 176,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 1024,
        slot: 0,
        name: "0",
        structure: s107,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 1056,
        slot: 1,
        name: "1",
        structure: s107,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 1088,
        slot: 2,
        name: "2",
        structure: s107,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 1120,
        slot: 3,
        name: "3",
        structure: s107,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1408,
        bitSize: 0,
        byteSize: 0,
        slot: 4,
        name: "4",
        structure: s103,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 1024,
        byteSize: 128,
        slot: 5,
        name: "5",
        structure: s112,
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
        structure: s117,
      },
    ],
    methods: [],
    template: null
  },
  slot: 36,
});
const f0 = {
  argStruct: s115,
  thunk: 1,
  name: "createOutput",
};
const f1 = {
  argStruct: s118,
  thunk: 2,
  name: "createPartialOutput",
};
Object.assign(s119, {
  ...s,
  type: 2,
  name: "quaternion-julia",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a225 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s102,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s103,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s111,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s112,
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
];
const linkage = finalizeStructures(structures);
const module = s119.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_04ba168f;
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