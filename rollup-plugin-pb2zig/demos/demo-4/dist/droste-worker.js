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
const s90 = {}, s91 = {}, s92 = {}, s93 = {}, s94 = {}, s95 = {}, s96 = {}, s97 = {}, s98 = {}, s99 = {};
const s100 = {}, s101 = {}, s102 = {}, s103 = {}, s104 = {}, s105 = {}, s106 = {}, s107 = {}, s108 = {}, s109 = {};
const s110 = {}, s111 = {}, s112 = {}, s113 = {}, s114 = {}, s115 = {}, s116 = {}, s117 = {}, s118 = {}, s119 = {};
const s120 = {}, s121 = {}, s122 = {}, s123 = {}, s124 = {}, s125 = {}, s126 = {}, s127 = {}, s128 = {}, s129 = {};
const s130 = {}, s131 = {}, s132 = {}, s133 = {}, s134 = {}, s135 = {}, s136 = {}, s137 = {}, s138 = {}, s139 = {};
const s140 = {}, s141 = {}, s142 = {}, s143 = {}, s144 = {}, s145 = {}, s146 = {}, s147 = {}, s148 = {}, s149 = {};
const s150 = {}, s151 = {}, s152 = {}, s153 = {}, s154 = {}, s155 = {}, s156 = {}, s157 = {}, s158 = {}, s159 = {};
const s160 = {}, s161 = {}, s162 = {}, s163 = {}, s164 = {};
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
  slot: 13,
});
Object.assign(s10, {
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
  slot: 33,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 120, 30, 16, 0 ]);
const a2 = new Uint8Array([ 100, 0, 0, 0 ]);
const a3 = new Uint8Array([ 120, 30, 16, 0 ]);
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
              address: 1056376,
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
              address: 1056376,
            },
          },
        },
      },
    },
  },
  slot: 90,
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
  slot: 89,
});
const a4 = new Uint8Array([  ]);
const a5 = new Uint8Array([ 116, 30, 16, 0 ]);
const a6 = new Uint8Array([ 160, 15, 0, 0 ]);
const a7 = new Uint8Array([ 116, 30, 16, 0 ]);
Object.assign(s15, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_int = 4000, comptime comptime_int = 4000}",
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
              address: 1056372,
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
              address: 1056372,
            },
          },
        },
      },
    },
  },
  slot: 92,
});
Object.assign(s16, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_int = 4000, comptime comptime_int = 4000}",
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
  slot: 91,
});
const a8 = new Uint8Array([  ]);
const a9 = new Uint8Array([ 112, 30, 16, 0 ]);
const a10 = new Uint8Array([ 168, 2, 0, 0 ]);
const a11 = new Uint8Array([ 112, 30, 16, 0 ]);
Object.assign(s17, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_int = 680, comptime comptime_int = 680}",
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
              address: 1056368,
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
              address: 1056368,
            },
          },
        },
      },
    },
  },
  slot: 94,
});
Object.assign(s18, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_int = 680, comptime comptime_int = 680}",
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
  slot: 93,
});
Object.assign(s19, {
  ...s,
  type: 1,
  name: "[26:0]u8",
  length: 26,
  byteSize: 27,
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
  slot: 97,
});
Object.assign(s20, {
  ...s,
  type: 11,
  name: "*const [26:0]u8",
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
  slot: 96,
});
Object.assign(s21, {
  ...s,
  type: 11,
  name: "*const *const [26:0]u8",
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
  slot: 95,
});
const a12 = new Uint8Array([  ]);
const a13 = new Uint8Array([ 170, 170, 170, 170 ]);
const a14 = new Uint8Array([  ]);
const a15 = new Uint8Array([ 170, 170, 170, 170 ]);
const a16 = new Uint8Array([ 170, 170, 170, 170 ]);
const a17 = new Uint8Array([ 72, 31, 16, 0 ]);
const a18 = new Uint8Array([ 205, 34, 16, 0 ]);
const a19 = new Uint8Array([ 79, 117, 116, 112, 117, 116, 32, 115, 105, 122, 101, 32, 111, 102, 32, 102, 105, 110, 97, 108, 32, 105, 109, 97, 103, 101, 0 ]);
Object.assign(s22, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 4000, comptime comptime_int = 4000} = .{4000, 4000}, comptime defaultValue: struct{comptime comptime_int = 680, comptime comptime_int = 680} = .{680, 680}, comptime description: *const [26:0]u8 = \"Output size of final image\"}",
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
        name: "description",
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
              address: 1056584,
              slots: {
                0: {
                  structure: s19,
                  memory: { array: a19 },
                  address: 1057485,
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
Object.assign(s23, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 4000, comptime comptime_int = 4000} = .{4000, 4000}, comptime defaultValue: struct{comptime comptime_int = 680, comptime comptime_int = 680} = .{680, 680}, comptime description: *const [26:0]u8 = \"Output size of final image\"}",
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
  slot: 34,
});
Object.assign(s25, {
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
        structure: s25,
      },
    ],
    methods: [],
    template: null
  },
  slot: 99,
});
Object.assign(s26, {
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
        structure: s25,
      },
    ],
    methods: [],
    template: null
  },
  slot: 98,
});
Object.assign(s27, {
  ...s,
  type: 1,
  name: "[41:0]u8",
  length: 41,
  byteSize: 42,
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
  slot: 102,
});
Object.assign(s28, {
  ...s,
  type: 11,
  name: "*const [41:0]u8",
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
  slot: 101,
});
Object.assign(s29, {
  ...s,
  type: 11,
  name: "*const *const [41:0]u8",
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
  slot: 100,
});
const a20 = new Uint8Array([  ]);
const a21 = new Uint8Array([ 64, 31, 16, 0 ]);
const a22 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 185, 63 ]);
const a23 = new Uint8Array([ 40, 31, 16, 0 ]);
const a24 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 89, 64 ]);
const a25 = new Uint8Array([ 56, 31, 16, 0 ]);
const a26 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 57, 64 ]);
const a27 = new Uint8Array([ 48, 31, 16, 0 ]);
const a28 = new Uint8Array([ 163, 34, 16, 0 ]);
const a29 = new Uint8Array([ 84, 104, 101, 32, 105, 110, 110, 101, 114, 32, 114, 97, 100, 105, 117, 115, 32, 111, 102, 32, 116, 104, 101, 32, 114, 101, 112, 101, 97, 116, 105, 110, 103, 32, 97, 110, 110, 117, 108, 97, 114, 0 ]);
Object.assign(s30, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 25, comptime description: *const [41:0]u8 = \"The inner radius of the repeating annular\"}",
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
        structure: s26,
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
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s29,
      },
    ],
    methods: [],
    template: {
      memory: { array: a20 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a21 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a22 },
              address: 1056576,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a23 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a24 },
              address: 1056552,
            },
          },
        },
        2: {
          structure: s26,
          memory: { array: a25 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a26 },
              address: 1056568,
            },
          },
        },
        3: {
          structure: s29,
          memory: { array: a27 },
          slots: {
            0: {
              structure: s28,
              memory: { array: a28 },
              address: 1056560,
              slots: {
                0: {
                  structure: s27,
                  memory: { array: a29 },
                  address: 1057443,
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
Object.assign(s31, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 25, comptime description: *const [41:0]u8 = \"The inner radius of the repeating annular\"}",
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
  slot: 43,
});
const a30 = new Uint8Array([  ]);
const a31 = new Uint8Array([ 80, 30, 16, 0 ]);
const a32 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a33 = new Uint8Array([ 40, 31, 16, 0 ]);
const a34 = new Uint8Array([ 40, 31, 16, 0 ]);
const a35 = new Uint8Array([ 32, 31, 16, 0 ]);
const a36 = new Uint8Array([ 121, 34, 16, 0 ]);
const a37 = new Uint8Array([ 84, 104, 101, 32, 111, 117, 116, 101, 114, 32, 114, 97, 100, 105, 117, 115, 32, 111, 102, 32, 116, 104, 101, 32, 114, 101, 112, 101, 97, 116, 105, 110, 103, 32, 97, 110, 110, 117, 108, 97, 114, 0 ]);
Object.assign(s32, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 100, comptime description: *const [41:0]u8 = \"The outer radius of the repeating annular\"}",
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
        structure: s26,
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
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s29,
      },
    ],
    methods: [],
    template: {
      memory: { array: a30 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a31 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a32 },
              address: 1056336,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a33 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a24 },
              address: 1056552,
            },
          },
        },
        2: {
          structure: s26,
          memory: { array: a34 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a24 },
              address: 1056552,
            },
          },
        },
        3: {
          structure: s29,
          memory: { array: a35 },
          slots: {
            0: {
              structure: s28,
              memory: { array: a36 },
              address: 1056544,
              slots: {
                0: {
                  structure: s27,
                  memory: { array: a37 },
                  address: 1057401,
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
Object.assign(s33, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 100, comptime description: *const [41:0]u8 = \"The outer radius of the repeating annular\"}",
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
  slot: 45,
});
Object.assign(s34, {
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
  slot: 105,
});
Object.assign(s35, {
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
        structure: s34,
      },
    ],
    methods: [],
    template: null
  },
  slot: 104,
});
Object.assign(s36, {
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
        structure: s35,
      },
    ],
    methods: [],
    template: null
  },
  slot: 103,
});
const a38 = new Uint8Array([  ]);
const a39 = new Uint8Array([ 24, 31, 16, 0 ]);
const a40 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 24, 192 ]);
const a41 = new Uint8Array([ 16, 31, 16, 0 ]);
const a42 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 24, 64 ]);
const a43 = new Uint8Array([ 80, 30, 16, 0 ]);
const a44 = new Uint8Array([ 8, 31, 16, 0 ]);
const a45 = new Uint8Array([ 65, 34, 16, 0 ]);
const a46 = new Uint8Array([ 84, 104, 101, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 105, 109, 97, 103, 101, 32, 116, 104, 101, 32, 105, 109, 97, 103, 101, 32, 105, 115, 32, 114, 101, 112, 101, 97, 116, 101, 100, 32, 111, 110, 32, 101, 97, 99, 104, 32, 108, 101, 118, 101, 108, 0 ]);
Object.assign(s37, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -6, comptime maxValue: comptime_float = 6, comptime defaultValue: comptime_float = 1, comptime description: *const [55:0]u8 = \"The number of image the image is repeated on each level\"}",
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
        structure: s26,
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
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a38 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a39 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a40 },
              address: 1056536,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a41 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a42 },
              address: 1056528,
            },
          },
        },
        2: {
          structure: s26,
          memory: { array: a43 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a32 },
              address: 1056336,
            },
          },
        },
        3: {
          structure: s36,
          memory: { array: a44 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a45 },
              address: 1056520,
              slots: {
                0: {
                  structure: s34,
                  memory: { array: a46 },
                  address: 1057345,
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
Object.assign(s38, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -6, comptime maxValue: comptime_float = 6, comptime defaultValue: comptime_float = 1, comptime description: *const [55:0]u8 = \"The number of image the image is repeated on each level\"}",
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
  slot: 47,
});
Object.assign(s39, {
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
  slot: 108,
});
Object.assign(s40, {
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
        structure: s39,
      },
    ],
    methods: [],
    template: null
  },
  slot: 107,
});
Object.assign(s41, {
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
        structure: s40,
      },
    ],
    methods: [],
    template: null
  },
  slot: 106,
});
const a47 = new Uint8Array([  ]);
const a48 = new Uint8Array([ 4, 31, 16, 0 ]);
const a49 = new Uint8Array([ 244, 255, 255, 255 ]);
const a50 = new Uint8Array([ 0, 31, 16, 0 ]);
const a51 = new Uint8Array([ 12, 0, 0, 0 ]);
const a52 = new Uint8Array([ 204, 30, 16, 0 ]);
const a53 = new Uint8Array([ 1, 0, 0, 0 ]);
const a54 = new Uint8Array([ 252, 30, 16, 0 ]);
const a55 = new Uint8Array([ 29, 34, 16, 0 ]);
const a56 = new Uint8Array([ 84, 104, 101, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 115, 116, 114, 97, 110, 100, 115, 32, 111, 102, 32, 116, 104, 101, 32, 115, 112, 105, 114, 97, 108, 0 ]);
Object.assign(s42, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = -12, comptime maxValue: comptime_int = 12, comptime defaultValue: comptime_int = 1, comptime description: *const [35:0]u8 = \"The number of strands of the spiral\"}",
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
        structure: s41,
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
              address: 1056516,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a50 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a51 },
              address: 1056512,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a52 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a53 },
              address: 1056460,
            },
          },
        },
        3: {
          structure: s41,
          memory: { array: a54 },
          slots: {
            0: {
              structure: s40,
              memory: { array: a55 },
              address: 1056508,
              slots: {
                0: {
                  structure: s39,
                  memory: { array: a56 },
                  address: 1057309,
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
Object.assign(s43, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = -12, comptime maxValue: comptime_int = 12, comptime defaultValue: comptime_int = 1, comptime description: *const [35:0]u8 = \"The number of strands of the spiral\"}",
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
  slot: 49,
});
Object.assign(s44, {
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
        structure: s44,
      },
    ],
    methods: [],
    template: null
  },
  slot: 27,
});
Object.assign(s45, {
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
        structure: s44,
      },
    ],
    methods: [],
    template: null
  },
  slot: 109,
});
Object.assign(s46, {
  ...s,
  type: 1,
  name: "[50:0]u8",
  length: 50,
  byteSize: 51,
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
Object.assign(s47, {
  ...s,
  type: 11,
  name: "*const [50:0]u8",
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
  slot: 111,
});
Object.assign(s48, {
  ...s,
  type: 11,
  name: "*const *const [50:0]u8",
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
  slot: 110,
});
const a57 = new Uint8Array([  ]);
const a58 = new Uint8Array([ 180, 30, 16, 0 ]);
const a59 = new Uint8Array([ 1 ]);
const a60 = new Uint8Array([ 248, 30, 16, 0 ]);
const a61 = new Uint8Array([ 234, 33, 16, 0 ]);
const a62 = new Uint8Array([ 83, 109, 111, 111, 116, 104, 101, 114, 32, 114, 101, 112, 101, 97, 116, 105, 110, 103, 32, 119, 104, 101, 110, 32, 117, 115, 105, 110, 103, 32, 109, 111, 114, 101, 32, 116, 104, 97, 110, 32, 111, 110, 101, 32, 115, 116, 114, 97, 110, 100, 0 ]);
Object.assign(s49, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [50:0]u8 = \"Smoother repeating when using more than one strand\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s44,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s45,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s48,
      },
    ],
    methods: [],
    template: {
      memory: { array: a57 },
      slots: {
        0: {
          structure: s45,
          memory: { array: a58 },
          slots: {
            0: {
              structure: s44,
              memory: { array: a59 },
              address: 1056436,
            },
          },
        },
        1: {
          structure: s48,
          memory: { array: a60 },
          slots: {
            0: {
              structure: s47,
              memory: { array: a61 },
              address: 1056504,
              slots: {
                0: {
                  structure: s46,
                  memory: { array: a62 },
                  address: 1057258,
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
Object.assign(s50, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [50:0]u8 = \"Smoother repeating when using more than one strand\"}",
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
  slot: 51,
});
Object.assign(s51, {
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
  slot: 115,
});
Object.assign(s52, {
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
        structure: s51,
      },
    ],
    methods: [],
    template: null
  },
  slot: 114,
});
Object.assign(s53, {
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
        structure: s52,
      },
    ],
    methods: [],
    template: null
  },
  slot: 113,
});
const a63 = new Uint8Array([  ]);
const a64 = new Uint8Array([ 88, 30, 16, 0 ]);
const a65 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a66 = new Uint8Array([ 240, 30, 16, 0 ]);
const a67 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 62, 64 ]);
const a68 = new Uint8Array([ 88, 30, 16, 0 ]);
const a69 = new Uint8Array([ 236, 30, 16, 0 ]);
const a70 = new Uint8Array([ 206, 33, 16, 0 ]);
const a71 = new Uint8Array([ 79, 118, 101, 114, 97, 108, 108, 32, 105, 109, 97, 103, 101, 32, 109, 97, 103, 110, 105, 102, 105, 99, 97, 116, 105, 111, 110, 0 ]);
Object.assign(s54, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 30, comptime defaultValue: comptime_float = 0, comptime description: *const [27:0]u8 = \"Overall image magnification\"}",
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
        structure: s26,
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
        structure: s26,
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
      memory: { array: a63 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a64 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a66 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a67 },
              address: 1056496,
            },
          },
        },
        2: {
          structure: s26,
          memory: { array: a68 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
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
              address: 1056492,
              slots: {
                0: {
                  structure: s51,
                  memory: { array: a71 },
                  address: 1057230,
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
Object.assign(s55, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 30, comptime defaultValue: comptime_float = 0, comptime description: *const [27:0]u8 = \"Overall image magnification\"}",
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
Object.assign(s56, {
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
  slot: 118,
});
Object.assign(s57, {
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
        structure: s56,
      },
    ],
    methods: [],
    template: null
  },
  slot: 117,
});
Object.assign(s58, {
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
        structure: s57,
      },
    ],
    methods: [],
    template: null
  },
  slot: 116,
});
const a72 = new Uint8Array([  ]);
const a73 = new Uint8Array([ 160, 30, 16, 0 ]);
const a74 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 118, 192 ]);
const a75 = new Uint8Array([ 152, 30, 16, 0 ]);
const a76 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 118, 64 ]);
const a77 = new Uint8Array([ 88, 30, 16, 0 ]);
const a78 = new Uint8Array([ 232, 30, 16, 0 ]);
const a79 = new Uint8Array([ 183, 33, 16, 0 ]);
const a80 = new Uint8Array([ 79, 118, 101, 114, 97, 108, 108, 32, 105, 109, 97, 103, 101, 32, 114, 111, 116, 97, 116, 105, 111, 110, 0 ]);
Object.assign(s59, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -360, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 0, comptime description: *const [22:0]u8 = \"Overall image rotation\"}",
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
        structure: s26,
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
        structure: s26,
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
          structure: s26,
          memory: { array: a73 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a74 },
              address: 1056416,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a75 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a76 },
              address: 1056408,
            },
          },
        },
        2: {
          structure: s26,
          memory: { array: a77 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
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
              address: 1056488,
              slots: {
                0: {
                  structure: s56,
                  memory: { array: a80 },
                  address: 1057207,
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
Object.assign(s60, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -360, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 0, comptime description: *const [22:0]u8 = \"Overall image rotation\"}",
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
  slot: 55,
});
Object.assign(s61, {
  ...s,
  type: 1,
  name: "[60:0]u8",
  length: 60,
  byteSize: 61,
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
  slot: 121,
});
Object.assign(s62, {
  ...s,
  type: 11,
  name: "*const [60:0]u8",
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
  slot: 120,
});
Object.assign(s63, {
  ...s,
  type: 11,
  name: "*const *const [60:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s62,
      },
    ],
    methods: [],
    template: null
  },
  slot: 119,
});
const a81 = new Uint8Array([  ]);
const a82 = new Uint8Array([ 204, 30, 16, 0 ]);
const a83 = new Uint8Array([ 196, 30, 16, 0 ]);
const a84 = new Uint8Array([ 3, 0, 0, 0 ]);
const a85 = new Uint8Array([ 204, 30, 16, 0 ]);
const a86 = new Uint8Array([ 228, 30, 16, 0 ]);
const a87 = new Uint8Array([ 122, 33, 16, 0 ]);
const a88 = new Uint8Array([ 83, 117, 112, 101, 114, 32, 115, 97, 109, 112, 108, 105, 110, 103, 32, 113, 117, 97, 108, 105, 116, 121, 46, 32, 78, 117, 109, 98, 101, 114, 32, 111, 102, 32, 115, 97, 109, 112, 108, 101, 115, 32, 115, 113, 117, 97, 114, 101, 100, 32, 112, 101, 114, 32, 112, 105, 120, 101, 108, 46, 0 ]);
Object.assign(s64, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 3, comptime defaultValue: comptime_int = 1, comptime description: *const [60:0]u8 = \"Super sampling quality. Number of samples squared per pixel.\"}",
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
        structure: s63,
      },
    ],
    methods: [],
    template: {
      memory: { array: a81 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a82 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a53 },
              address: 1056460,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a83 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a84 },
              address: 1056452,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a85 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a53 },
              address: 1056460,
            },
          },
        },
        3: {
          structure: s63,
          memory: { array: a86 },
          slots: {
            0: {
              structure: s62,
              memory: { array: a87 },
              address: 1056484,
              slots: {
                0: {
                  structure: s61,
                  memory: { array: a88 },
                  address: 1057146,
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
Object.assign(s65, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 3, comptime defaultValue: comptime_int = 1, comptime description: *const [60:0]u8 = \"Super sampling quality. Number of samples squared per pixel.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s64,
      },
    ],
    methods: [],
    template: null
  },
  slot: 57,
});
Object.assign(s66, {
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
  slot: 35,
});
const a89 = new Uint8Array([  ]);
const a90 = new Uint8Array([ 104, 30, 16, 0 ]);
const a91 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 105, 192 ]);
const a92 = new Uint8Array([ 104, 30, 16, 0 ]);
Object.assign(s67, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -200, comptime comptime_float = -200}",
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
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s26,
      },
    ],
    methods: [],
    template: {
      memory: { array: a89 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a90 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a91 },
              address: 1056360,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a92 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a91 },
              address: 1056360,
            },
          },
        },
      },
    },
  },
  slot: 123,
});
Object.assign(s68, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -200, comptime comptime_float = -200}",
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
  slot: 122,
});
const a93 = new Uint8Array([  ]);
const a94 = new Uint8Array([ 96, 30, 16, 0 ]);
const a95 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 105, 64 ]);
const a96 = new Uint8Array([ 96, 30, 16, 0 ]);
Object.assign(s69, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 200, comptime comptime_float = 200}",
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
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s26,
      },
    ],
    methods: [],
    template: {
      memory: { array: a93 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a94 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a95 },
              address: 1056352,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a96 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a95 },
              address: 1056352,
            },
          },
        },
      },
    },
  },
  slot: 125,
});
Object.assign(s70, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 200, comptime comptime_float = 200}",
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
  slot: 124,
});
const a97 = new Uint8Array([  ]);
const a98 = new Uint8Array([ 88, 30, 16, 0 ]);
const a99 = new Uint8Array([ 88, 30, 16, 0 ]);
Object.assign(s71, {
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
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s26,
      },
    ],
    methods: [],
    template: {
      memory: { array: a97 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a98 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a99 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
            },
          },
        },
      },
    },
  },
  slot: 127,
});
Object.assign(s72, {
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
        structure: s71,
      },
    ],
    methods: [],
    template: null
  },
  slot: 126,
});
Object.assign(s73, {
  ...s,
  type: 1,
  name: "[40:0]u8",
  length: 40,
  byteSize: 41,
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
  slot: 130,
});
Object.assign(s74, {
  ...s,
  type: 11,
  name: "*const [40:0]u8",
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
  slot: 129,
});
Object.assign(s75, {
  ...s,
  type: 11,
  name: "*const *const [40:0]u8",
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
  slot: 128,
});
const a100 = new Uint8Array([  ]);
const a101 = new Uint8Array([ 170, 170, 170, 170 ]);
const a102 = new Uint8Array([ 170, 170, 170, 170 ]);
const a103 = new Uint8Array([ 170, 170, 170, 170 ]);
const a104 = new Uint8Array([ 224, 30, 16, 0 ]);
const a105 = new Uint8Array([ 81, 33, 16, 0 ]);
const a106 = new Uint8Array([ 80, 97, 110, 110, 105, 110, 103, 32, 111, 102, 32, 116, 104, 101, 32, 105, 109, 97, 103, 101, 32, 105, 110, 32, 116, 104, 101, 32, 111, 117, 116, 112, 117, 116, 32, 102, 114, 97, 109, 101, 0 ]);
Object.assign(s76, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -200, comptime comptime_float = -200} = .{-200, -200}, comptime maxValue: struct{comptime comptime_float = 200, comptime comptime_float = 200} = .{200, 200}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [40:0]u8 = \"Panning of the image in the output frame\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s66,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s68,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s70,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s72,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s75,
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
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s70,
          memory: { array: a102 },
          slots: {
            0: {
              structure: s69,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s72,
          memory: { array: a103 },
          slots: {
            0: {
              structure: s71,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s75,
          memory: { array: a104 },
          slots: {
            0: {
              structure: s74,
              memory: { array: a105 },
              address: 1056480,
              slots: {
                0: {
                  structure: s73,
                  memory: { array: a106 },
                  address: 1057105,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 60,
});
Object.assign(s77, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -200, comptime comptime_float = -200} = .{-200, -200}, comptime maxValue: struct{comptime comptime_float = 200, comptime comptime_float = 200} = .{200, 200}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [40:0]u8 = \"Panning of the image in the output frame\"}",
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
  slot: 59,
});
Object.assign(s78, {
  ...s,
  type: 1,
  name: "[30:0]u8",
  length: 30,
  byteSize: 31,
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
  slot: 133,
});
Object.assign(s79, {
  ...s,
  type: 11,
  name: "*const [30:0]u8",
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
  slot: 132,
});
Object.assign(s80, {
  ...s,
  type: 11,
  name: "*const *const [30:0]u8",
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
  slot: 131,
});
const a107 = new Uint8Array([  ]);
const a108 = new Uint8Array([ 170, 170, 170, 170 ]);
const a109 = new Uint8Array([ 170, 170, 170, 170 ]);
const a110 = new Uint8Array([ 170, 170, 170, 170 ]);
const a111 = new Uint8Array([ 220, 30, 16, 0 ]);
const a112 = new Uint8Array([ 50, 33, 16, 0 ]);
const a113 = new Uint8Array([ 83, 104, 105, 102, 116, 32, 116, 104, 101, 32, 99, 101, 110, 116, 114, 101, 32, 111, 102, 32, 116, 104, 101, 32, 115, 112, 105, 114, 97, 108, 0 ]);
Object.assign(s81, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -200, comptime comptime_float = -200} = .{-200, -200}, comptime maxValue: struct{comptime comptime_float = 200, comptime comptime_float = 200} = .{200, 200}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [30:0]u8 = \"Shift the centre of the spiral\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s66,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s68,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s70,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s72,
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
      memory: { array: a107 },
      slots: {
        0: {
          structure: s68,
          memory: { array: a108 },
          slots: {
            0: {
              structure: s67,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s70,
          memory: { array: a109 },
          slots: {
            0: {
              structure: s69,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s72,
          memory: { array: a110 },
          slots: {
            0: {
              structure: s71,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s80,
          memory: { array: a111 },
          slots: {
            0: {
              structure: s79,
              memory: { array: a112 },
              address: 1056476,
              slots: {
                0: {
                  structure: s78,
                  memory: { array: a113 },
                  address: 1057074,
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
Object.assign(s82, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -200, comptime comptime_float = -200} = .{-200, -200}, comptime maxValue: struct{comptime comptime_float = 200, comptime comptime_float = 200} = .{200, 200}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [30:0]u8 = \"Shift the centre of the spiral\"}",
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
  slot: 61,
});
Object.assign(s83, {
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
  slot: 36,
});
const a114 = new Uint8Array([  ]);
const a115 = new Uint8Array([ 88, 30, 16, 0 ]);
const a116 = new Uint8Array([ 88, 30, 16, 0 ]);
const a117 = new Uint8Array([ 88, 30, 16, 0 ]);
const a118 = new Uint8Array([ 88, 30, 16, 0 ]);
Object.assign(s84, {
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
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "3",
        structure: s26,
      },
    ],
    methods: [],
    template: {
      memory: { array: a114 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a115 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a116 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
            },
          },
        },
        2: {
          structure: s26,
          memory: { array: a117 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
            },
          },
        },
        3: {
          structure: s26,
          memory: { array: a118 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
            },
          },
        },
      },
    },
  },
  slot: 135,
});
Object.assign(s85, {
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
        structure: s84,
      },
    ],
    methods: [],
    template: null
  },
  slot: 134,
});
const a119 = new Uint8Array([  ]);
const a120 = new Uint8Array([ 80, 30, 16, 0 ]);
const a121 = new Uint8Array([ 80, 30, 16, 0 ]);
const a122 = new Uint8Array([ 80, 30, 16, 0 ]);
const a123 = new Uint8Array([ 80, 30, 16, 0 ]);
Object.assign(s86, {
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
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "3",
        structure: s26,
      },
    ],
    methods: [],
    template: {
      memory: { array: a119 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a120 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a32 },
              address: 1056336,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a121 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a32 },
              address: 1056336,
            },
          },
        },
        2: {
          structure: s26,
          memory: { array: a122 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a32 },
              address: 1056336,
            },
          },
        },
        3: {
          structure: s26,
          memory: { array: a123 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a32 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 137,
});
Object.assign(s87, {
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
        structure: s86,
      },
    ],
    methods: [],
    template: null
  },
  slot: 136,
});
const a124 = new Uint8Array([  ]);
const a125 = new Uint8Array([ 88, 30, 16, 0 ]);
const a126 = new Uint8Array([ 88, 30, 16, 0 ]);
const a127 = new Uint8Array([ 88, 30, 16, 0 ]);
const a128 = new Uint8Array([ 80, 30, 16, 0 ]);
Object.assign(s88, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 1}",
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
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "3",
        structure: s26,
      },
    ],
    methods: [],
    template: {
      memory: { array: a124 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a125 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a126 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
            },
          },
        },
        2: {
          structure: s26,
          memory: { array: a127 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
            },
          },
        },
        3: {
          structure: s26,
          memory: { array: a128 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a32 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 139,
});
Object.assign(s89, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 1}",
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
  slot: 138,
});
const a129 = new Uint8Array([  ]);
const a130 = new Uint8Array([ 170, 170, 170, 170 ]);
const a131 = new Uint8Array([ 170, 170, 170, 170 ]);
const a132 = new Uint8Array([ 170, 170, 170, 170 ]);
const a133 = new Uint8Array([ 216, 30, 16, 0 ]);
const a134 = new Uint8Array([ 19, 33, 16, 0 ]);
const a135 = new Uint8Array([ 83, 101, 116, 32, 116, 104, 101, 32, 82, 71, 66, 65, 32, 98, 97, 99, 107, 103, 114, 111, 117, 110, 100, 32, 99, 111, 108, 111, 117, 114, 0 ]);
Object.assign(s90, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 1} = .{0, 0, 0, 1}, comptime description: *const [30:0]u8 = \"Set the RGBA background colour\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s83,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s85,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s87,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s89,
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
      memory: { array: a129 },
      slots: {
        0: {
          structure: s85,
          memory: { array: a130 },
          slots: {
            0: {
              structure: s84,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s87,
          memory: { array: a131 },
          slots: {
            0: {
              structure: s86,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s89,
          memory: { array: a132 },
          slots: {
            0: {
              structure: s88,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s80,
          memory: { array: a133 },
          slots: {
            0: {
              structure: s79,
              memory: { array: a134 },
              address: 1056472,
              slots: {
                0: {
                  structure: s78,
                  memory: { array: a135 },
                  address: 1057043,
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
Object.assign(s91, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 1} = .{0, 0, 0, 1}, comptime description: *const [30:0]u8 = \"Set the RGBA background colour\"}",
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
  slot: 63,
});
Object.assign(s92, {
  ...s,
  type: 1,
  name: "[44:0]u8",
  length: 44,
  byteSize: 45,
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
  slot: 142,
});
Object.assign(s93, {
  ...s,
  type: 11,
  name: "*const [44:0]u8",
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
  slot: 141,
});
Object.assign(s94, {
  ...s,
  type: 11,
  name: "*const *const [44:0]u8",
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
  slot: 140,
});
const a136 = new Uint8Array([  ]);
const a137 = new Uint8Array([ 204, 30, 16, 0 ]);
const a138 = new Uint8Array([ 200, 30, 16, 0 ]);
const a139 = new Uint8Array([ 20, 0, 0, 0 ]);
const a140 = new Uint8Array([ 212, 30, 16, 0 ]);
const a141 = new Uint8Array([ 9, 0, 0, 0 ]);
const a142 = new Uint8Array([ 208, 30, 16, 0 ]);
const a143 = new Uint8Array([ 230, 32, 16, 0 ]);
const a144 = new Uint8Array([ 84, 104, 101, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 114, 101, 112, 101, 97, 116, 105, 110, 103, 32, 108, 101, 118, 101, 108, 115, 32, 111, 102, 32, 116, 104, 101, 32, 115, 112, 105, 114, 97, 108, 0 ]);
Object.assign(s95, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 20, comptime defaultValue: comptime_int = 9, comptime description: *const [44:0]u8 = \"The number of repeating levels of the spiral\"}",
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
        structure: s94,
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
              memory: { array: a53 },
              address: 1056460,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a138 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a139 },
              address: 1056456,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a140 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a141 },
              address: 1056468,
            },
          },
        },
        3: {
          structure: s94,
          memory: { array: a142 },
          slots: {
            0: {
              structure: s93,
              memory: { array: a143 },
              address: 1056464,
              slots: {
                0: {
                  structure: s92,
                  memory: { array: a144 },
                  address: 1056998,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 66,
});
Object.assign(s96, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 20, comptime defaultValue: comptime_int = 9, comptime description: *const [44:0]u8 = \"The number of repeating levels of the spiral\"}",
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
  slot: 65,
});
Object.assign(s97, {
  ...s,
  type: 1,
  name: "[25:0]u8",
  length: 25,
  byteSize: 26,
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
  slot: 145,
});
Object.assign(s98, {
  ...s,
  type: 11,
  name: "*const [25:0]u8",
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
  slot: 144,
});
Object.assign(s99, {
  ...s,
  type: 11,
  name: "*const *const [25:0]u8",
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
  slot: 143,
});
const a145 = new Uint8Array([  ]);
const a146 = new Uint8Array([ 204, 30, 16, 0 ]);
const a147 = new Uint8Array([ 200, 30, 16, 0 ]);
const a148 = new Uint8Array([ 196, 30, 16, 0 ]);
const a149 = new Uint8Array([ 192, 30, 16, 0 ]);
const a150 = new Uint8Array([ 204, 32, 16, 0 ]);
const a151 = new Uint8Array([ 84, 104, 101, 32, 115, 116, 97, 114, 116, 105, 110, 103, 32, 115, 112, 105, 114, 97, 108, 32, 108, 101, 118, 101, 108, 0 ]);
Object.assign(s100, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 20, comptime defaultValue: comptime_int = 3, comptime description: *const [25:0]u8 = \"The starting spiral level\"}",
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
        structure: s99,
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
              memory: { array: a53 },
              address: 1056460,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a147 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a139 },
              address: 1056456,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a148 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a84 },
              address: 1056452,
            },
          },
        },
        3: {
          structure: s99,
          memory: { array: a149 },
          slots: {
            0: {
              structure: s98,
              memory: { array: a150 },
              address: 1056448,
              slots: {
                0: {
                  structure: s97,
                  memory: { array: a151 },
                  address: 1056972,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 68,
});
Object.assign(s101, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 20, comptime defaultValue: comptime_int = 3, comptime description: *const [25:0]u8 = \"The starting spiral level\"}",
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
  slot: 67,
});
Object.assign(s102, {
  ...s,
  type: 1,
  name: "[74:0]u8",
  length: 74,
  byteSize: 75,
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
  slot: 148,
});
Object.assign(s103, {
  ...s,
  type: 11,
  name: "*const [74:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s102,
      },
    ],
    methods: [],
    template: null
  },
  slot: 147,
});
Object.assign(s104, {
  ...s,
  type: 11,
  name: "*const *const [74:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s103,
      },
    ],
    methods: [],
    template: null
  },
  slot: 146,
});
const a152 = new Uint8Array([  ]);
const a153 = new Uint8Array([ 180, 30, 16, 0 ]);
const a154 = new Uint8Array([ 188, 30, 16, 0 ]);
const a155 = new Uint8Array([ 129, 32, 16, 0 ]);
const a156 = new Uint8Array([ 69, 110, 97, 98, 108, 101, 32, 102, 111, 114, 32, 105, 109, 97, 103, 101, 115, 32, 119, 105, 116, 104, 32, 116, 114, 97, 110, 115, 112, 97, 114, 101, 110, 116, 32, 109, 105, 100, 100, 108, 101, 32, 97, 114, 101, 97, 115, 32, 40, 115, 117, 99, 104, 32, 97, 115, 32, 97, 32, 112, 105, 99, 116, 117, 114, 101, 32, 102, 114, 97, 109, 101, 41, 46, 0 ]);
Object.assign(s105, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [74:0]u8 = \"Enable for images with transparent middle areas (such as a picture frame).\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s44,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s45,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s104,
      },
    ],
    methods: [],
    template: {
      memory: { array: a152 },
      slots: {
        0: {
          structure: s45,
          memory: { array: a153 },
          slots: {
            0: {
              structure: s44,
              memory: { array: a59 },
              address: 1056436,
            },
          },
        },
        1: {
          structure: s104,
          memory: { array: a154 },
          slots: {
            0: {
              structure: s103,
              memory: { array: a155 },
              address: 1056444,
              slots: {
                0: {
                  structure: s102,
                  memory: { array: a156 },
                  address: 1056897,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 70,
});
Object.assign(s106, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [74:0]u8 = \"Enable for images with transparent middle areas (such as a picture frame).\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s105,
      },
    ],
    methods: [],
    template: null
  },
  slot: 69,
});
const a157 = new Uint8Array([  ]);
const a158 = new Uint8Array([ 180, 30, 16, 0 ]);
const a159 = new Uint8Array([ 184, 30, 16, 0 ]);
const a160 = new Uint8Array([ 68, 32, 16, 0 ]);
const a161 = new Uint8Array([ 69, 110, 97, 98, 108, 101, 32, 102, 111, 114, 32, 105, 109, 97, 103, 101, 115, 32, 119, 105, 116, 104, 32, 116, 114, 97, 110, 115, 112, 97, 114, 101, 110, 116, 32, 97, 114, 101, 97, 115, 32, 97, 114, 111, 117, 110, 100, 32, 116, 104, 101, 32, 111, 117, 116, 115, 105, 100, 101, 46, 0 ]);
Object.assign(s107, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [60:0]u8 = \"Enable for images with transparent areas around the outside.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s44,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s45,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s63,
      },
    ],
    methods: [],
    template: {
      memory: { array: a157 },
      slots: {
        0: {
          structure: s45,
          memory: { array: a158 },
          slots: {
            0: {
              structure: s44,
              memory: { array: a59 },
              address: 1056436,
            },
          },
        },
        1: {
          structure: s63,
          memory: { array: a159 },
          slots: {
            0: {
              structure: s62,
              memory: { array: a160 },
              address: 1056440,
              slots: {
                0: {
                  structure: s61,
                  memory: { array: a161 },
                  address: 1056836,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 72,
});
Object.assign(s108, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [60:0]u8 = \"Enable for images with transparent areas around the outside.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s107,
      },
    ],
    methods: [],
    template: null
  },
  slot: 71,
});
Object.assign(s109, {
  ...s,
  type: 1,
  name: "[52:0]u8",
  length: 52,
  byteSize: 53,
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
  slot: 151,
});
Object.assign(s110, {
  ...s,
  type: 11,
  name: "*const [52:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s109,
      },
    ],
    methods: [],
    template: null
  },
  slot: 150,
});
Object.assign(s111, {
  ...s,
  type: 11,
  name: "*const *const [52:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s110,
      },
    ],
    methods: [],
    template: null
  },
  slot: 149,
});
const a162 = new Uint8Array([  ]);
const a163 = new Uint8Array([ 180, 30, 16, 0 ]);
const a164 = new Uint8Array([ 176, 30, 16, 0 ]);
const a165 = new Uint8Array([ 15, 32, 16, 0 ]);
const a166 = new Uint8Array([ 85, 110, 99, 104, 101, 99, 107, 32, 116, 111, 32, 117, 110, 114, 111, 108, 108, 32, 116, 104, 101, 32, 99, 105, 114, 99, 117, 108, 97, 114, 32, 97, 110, 110, 117, 108, 97, 114, 32, 111, 102, 32, 116, 104, 101, 32, 105, 109, 97, 103, 101, 46, 0 ]);
Object.assign(s112, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [52:0]u8 = \"Uncheck to unroll the circular annular of the image.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s44,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s45,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s111,
      },
    ],
    methods: [],
    template: {
      memory: { array: a162 },
      slots: {
        0: {
          structure: s45,
          memory: { array: a163 },
          slots: {
            0: {
              structure: s44,
              memory: { array: a59 },
              address: 1056436,
            },
          },
        },
        1: {
          structure: s111,
          memory: { array: a164 },
          slots: {
            0: {
              structure: s110,
              memory: { array: a165 },
              address: 1056432,
              slots: {
                0: {
                  structure: s109,
                  memory: { array: a166 },
                  address: 1056783,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 74,
});
Object.assign(s113, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [52:0]u8 = \"Uncheck to unroll the circular annular of the image.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s112,
      },
    ],
    methods: [],
    template: null
  },
  slot: 73,
});
Object.assign(s114, {
  ...s,
  type: 1,
  name: "[72:0]u8",
  length: 72,
  byteSize: 73,
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
  slot: 154,
});
Object.assign(s115, {
  ...s,
  type: 11,
  name: "*const [72:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s114,
      },
    ],
    methods: [],
    template: null
  },
  slot: 153,
});
Object.assign(s116, {
  ...s,
  type: 11,
  name: "*const *const [72:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s115,
      },
    ],
    methods: [],
    template: null
  },
  slot: 152,
});
const a167 = new Uint8Array([  ]);
const a168 = new Uint8Array([ 144, 30, 16, 0 ]);
const a169 = new Uint8Array([ 0 ]);
const a170 = new Uint8Array([ 172, 30, 16, 0 ]);
const a171 = new Uint8Array([ 198, 31, 16, 0 ]);
const a172 = new Uint8Array([ 65, 117, 116, 111, 109, 97, 116, 105, 99, 97, 108, 108, 121, 32, 115, 101, 116, 32, 116, 104, 101, 32, 105, 100, 101, 97, 108, 32, 112, 101, 114, 105, 111, 100, 105, 99, 105, 116, 121, 32, 102, 111, 114, 32, 116, 104, 101, 32, 99, 117, 114, 114, 101, 110, 116, 32, 114, 97, 100, 105, 117, 115, 32, 115, 101, 116, 116, 105, 110, 103, 115, 46, 0 ]);
Object.assign(s117, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [72:0]u8 = \"Automatically set the ideal periodicity for the current radius settings.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s44,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s45,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s116,
      },
    ],
    methods: [],
    template: {
      memory: { array: a167 },
      slots: {
        0: {
          structure: s45,
          memory: { array: a168 },
          slots: {
            0: {
              structure: s44,
              memory: { array: a169 },
              address: 1056400,
            },
          },
        },
        1: {
          structure: s116,
          memory: { array: a170 },
          slots: {
            0: {
              structure: s115,
              memory: { array: a171 },
              address: 1056428,
              slots: {
                0: {
                  structure: s114,
                  memory: { array: a172 },
                  address: 1056710,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 76,
});
Object.assign(s118, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [72:0]u8 = \"Automatically set the ideal periodicity for the current radius settings.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s117,
      },
    ],
    methods: [],
    template: null
  },
  slot: 75,
});
Object.assign(s119, {
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
  slot: 157,
});
Object.assign(s120, {
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
        structure: s119,
      },
    ],
    methods: [],
    template: null
  },
  slot: 156,
});
Object.assign(s121, {
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
        structure: s120,
      },
    ],
    methods: [],
    template: null
  },
  slot: 155,
});
const a173 = new Uint8Array([  ]);
const a174 = new Uint8Array([ 160, 30, 16, 0 ]);
const a175 = new Uint8Array([ 152, 30, 16, 0 ]);
const a176 = new Uint8Array([ 88, 30, 16, 0 ]);
const a177 = new Uint8Array([ 168, 30, 16, 0 ]);
const a178 = new Uint8Array([ 183, 31, 16, 0 ]);
const a179 = new Uint8Array([ 80, 111, 108, 97, 114, 32, 114, 111, 116, 97, 116, 105, 111, 110, 0 ]);
Object.assign(s122, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -360, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 0, comptime description: *const [14:0]u8 = \"Polar rotation\"}",
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
        structure: s26,
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
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s121,
      },
    ],
    methods: [],
    template: {
      memory: { array: a173 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a174 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a74 },
              address: 1056416,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a175 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a76 },
              address: 1056408,
            },
          },
        },
        2: {
          structure: s26,
          memory: { array: a176 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
            },
          },
        },
        3: {
          structure: s121,
          memory: { array: a177 },
          slots: {
            0: {
              structure: s120,
              memory: { array: a178 },
              address: 1056424,
              slots: {
                0: {
                  structure: s119,
                  memory: { array: a179 },
                  address: 1056695,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 78,
});
Object.assign(s123, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -360, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 0, comptime description: *const [14:0]u8 = \"Polar rotation\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s122,
      },
    ],
    methods: [],
    template: null
  },
  slot: 77,
});
Object.assign(s124, {
  ...s,
  type: 1,
  name: "[49:0]u8",
  length: 49,
  byteSize: 50,
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
  slot: 160,
});
Object.assign(s125, {
  ...s,
  type: 11,
  name: "*const [49:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s124,
      },
    ],
    methods: [],
    template: null
  },
  slot: 159,
});
Object.assign(s126, {
  ...s,
  type: 11,
  name: "*const *const [49:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s125,
      },
    ],
    methods: [],
    template: null
  },
  slot: 158,
});
const a180 = new Uint8Array([  ]);
const a181 = new Uint8Array([ 160, 30, 16, 0 ]);
const a182 = new Uint8Array([ 152, 30, 16, 0 ]);
const a183 = new Uint8Array([ 88, 30, 16, 0 ]);
const a184 = new Uint8Array([ 148, 30, 16, 0 ]);
const a185 = new Uint8Array([ 133, 31, 16, 0 ]);
const a186 = new Uint8Array([ 83, 112, 105, 110, 32, 109, 97, 112, 112, 101, 100, 32, 105, 109, 97, 103, 101, 46, 32, 66, 101, 115, 116, 32, 117, 115, 101, 100, 32, 119, 105, 116, 104, 32, 112, 111, 108, 97, 114, 32, 114, 111, 116, 97, 116, 105, 111, 110, 46, 0 ]);
Object.assign(s127, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -360, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 0, comptime description: *const [49:0]u8 = \"Spin mapped image. Best used with polar rotation.\"}",
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
        structure: s26,
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
        structure: s26,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s126,
      },
    ],
    methods: [],
    template: {
      memory: { array: a180 },
      slots: {
        0: {
          structure: s26,
          memory: { array: a181 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a74 },
              address: 1056416,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a182 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a76 },
              address: 1056408,
            },
          },
        },
        2: {
          structure: s26,
          memory: { array: a183 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a65 },
              address: 1056344,
            },
          },
        },
        3: {
          structure: s126,
          memory: { array: a184 },
          slots: {
            0: {
              structure: s125,
              memory: { array: a185 },
              address: 1056404,
              slots: {
                0: {
                  structure: s124,
                  memory: { array: a186 },
                  address: 1056645,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 80,
});
Object.assign(s128, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -360, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 0, comptime description: *const [49:0]u8 = \"Spin mapped image. Best used with polar rotation.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s127,
      },
    ],
    methods: [],
    template: null
  },
  slot: 79,
});
const a187 = new Uint8Array([  ]);
const a188 = new Uint8Array([ 144, 30, 16, 0 ]);
const a189 = new Uint8Array([ 140, 30, 16, 0 ]);
const a190 = new Uint8Array([ 105, 31, 16, 0 ]);
const a191 = new Uint8Array([ 69, 110, 97, 98, 108, 101, 32, 104, 121, 112, 101, 114, 32, 100, 114, 111, 115, 116, 101, 32, 101, 102, 102, 101, 99, 116, 46, 0 ]);
Object.assign(s129, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [27:0]u8 = \"Enable hyper droste effect.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s44,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s45,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s53,
      },
    ],
    methods: [],
    template: {
      memory: { array: a187 },
      slots: {
        0: {
          structure: s45,
          memory: { array: a188 },
          slots: {
            0: {
              structure: s44,
              memory: { array: a169 },
              address: 1056400,
            },
          },
        },
        1: {
          structure: s53,
          memory: { array: a189 },
          slots: {
            0: {
              structure: s52,
              memory: { array: a190 },
              address: 1056396,
              slots: {
                0: {
                  structure: s51,
                  memory: { array: a191 },
                  address: 1056617,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 82,
});
Object.assign(s130, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [27:0]u8 = \"Enable hyper droste effect.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s129,
      },
    ],
    methods: [],
    template: null
  },
  slot: 81,
});
Object.assign(s131, {
  ...s,
  type: 1,
  name: "[28:0]u8",
  length: 28,
  byteSize: 29,
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
  slot: 163,
});
Object.assign(s132, {
  ...s,
  type: 11,
  name: "*const [28:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s131,
      },
    ],
    methods: [],
    template: null
  },
  slot: 162,
});
Object.assign(s133, {
  ...s,
  type: 11,
  name: "*const *const [28:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s132,
      },
    ],
    methods: [],
    template: null
  },
  slot: 161,
});
const a192 = new Uint8Array([  ]);
const a193 = new Uint8Array([ 132, 30, 16, 0 ]);
const a194 = new Uint8Array([ 0, 0, 0, 0 ]);
const a195 = new Uint8Array([ 136, 30, 16, 0 ]);
const a196 = new Uint8Array([ 10, 0, 0, 0 ]);
const a197 = new Uint8Array([ 132, 30, 16, 0 ]);
const a198 = new Uint8Array([ 128, 30, 16, 0 ]);
const a199 = new Uint8Array([ 76, 31, 16, 0 ]);
const a200 = new Uint8Array([ 85, 115, 101, 100, 32, 98, 121, 32, 104, 121, 112, 101, 114, 32, 100, 114, 111, 115, 116, 101, 32, 111, 112, 116, 105, 111, 110, 46, 0 ]);
Object.assign(s134, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 10, comptime defaultValue: comptime_int = 0, comptime description: *const [28:0]u8 = \"Used by hyper droste option.\"}",
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
        structure: s133,
      },
    ],
    methods: [],
    template: {
      memory: { array: a192 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a193 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a194 },
              address: 1056388,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a195 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a196 },
              address: 1056392,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a197 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a194 },
              address: 1056388,
            },
          },
        },
        3: {
          structure: s133,
          memory: { array: a198 },
          slots: {
            0: {
              structure: s132,
              memory: { array: a199 },
              address: 1056384,
              slots: {
                0: {
                  structure: s131,
                  memory: { array: a200 },
                  address: 1056588,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 84,
});
Object.assign(s135, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 10, comptime defaultValue: comptime_int = 0, comptime description: *const [28:0]u8 = \"Used by hyper droste option.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s134,
      },
    ],
    methods: [],
    template: null
  },
  slot: 83,
});
const a201 = new Uint8Array([  ]);
const a202 = new Uint8Array([ 170, 170, 170, 170 ]);
const a203 = new Uint8Array([ 170, 170, 170, 170 ]);
const a204 = new Uint8Array([ 170, 170, 170, 170 ]);
const a205 = new Uint8Array([ 170, 170, 170, 170 ]);
const a206 = new Uint8Array([ 170, 170, 170, 170 ]);
const a207 = new Uint8Array([ 170, 170, 170, 170 ]);
const a208 = new Uint8Array([ 170, 170, 170, 170 ]);
const a209 = new Uint8Array([ 170, 170, 170, 170 ]);
const a210 = new Uint8Array([ 170, 170, 170, 170 ]);
const a211 = new Uint8Array([ 170, 170, 170, 170 ]);
const a212 = new Uint8Array([ 170, 170, 170, 170 ]);
const a213 = new Uint8Array([ 170, 170, 170, 170 ]);
const a214 = new Uint8Array([ 170, 170, 170, 170 ]);
const a215 = new Uint8Array([ 170, 170, 170, 170 ]);
const a216 = new Uint8Array([ 170, 170, 170, 170 ]);
const a217 = new Uint8Array([ 170, 170, 170, 170 ]);
const a218 = new Uint8Array([ 170, 170, 170, 170 ]);
const a219 = new Uint8Array([ 170, 170, 170, 170 ]);
const a220 = new Uint8Array([ 170, 170, 170, 170 ]);
const a221 = new Uint8Array([ 170, 170, 170, 170 ]);
const a222 = new Uint8Array([ 170, 170, 170, 170 ]);
const a223 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s136, {
  ...s,
  type: 2,
  name: "struct{comptime size: struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 4000, comptime comptime_int = 4000} = .{4000, 4000}, comptime defaultValue: struct{comptime comptime_int = 680, comptime comptime_int = 680} = .{680, 680}, comptime description: *const [26:0]u8 = \"Output size of final image\"} = .{.type = @Vector(2, i32), .minValue = .{100, 100}, .maxValue = .{4000, 4000}, .defaultValue = .{680, 680}, .description = \"Output size of final image\"}, comptime radiusInside: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 25, comptime description: *const [41:0]u8 = \"The inner radius of the repeating annular\"} = .{.type = f32, .minValue = 0.1, .maxValue = 100, .defaultValue = 25, .description = \"The inner radius of the repeating annular\"}, comptime radiusOutside: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 100, comptime description: *const [41:0]u8 = \"The outer radius of the repeating annular\"} = .{.type = f32, .minValue = 1, .maxValue = 100, .defaultValue = 100, .description = \"The outer radius of the repeating annular\"}, comptime periodicity: struct{comptime type: type = f32, comptime minValue: comptime_float = -6, comptime maxValue: comptime_float = 6, comptime defaultValue: comptime_float = 1, comptime description: *const [55:0]u8 = \"The number of image the image is repeated on each level\"} = .{.type = f32, .minValue = -6, .maxValue = 6, .defaultValue = 1, .description = \"The number of image the image is repeated on each level\"}, comptime strands: struct{comptime type: type = i32, comptime minValue: comptime_int = -12, comptime maxValue: comptime_int = 12, comptime defaultValue: comptime_int = 1, comptime description: *const [35:0]u8 = \"The number of strands of the spiral\"} = .{.type = i32, .minValue = -12, .maxValue = 12, .defaultValue = 1, .description = \"The number of strands of the spiral\"}, comptime strandMirror: struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [50:0]u8 = \"Smoother repeating when using more than one strand\"} = .{.type = bool, .defaultValue = true, .description = \"Smoother repeating when using more than one strand\"}, comptime zoom: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 30, comptime defaultValue: comptime_float = 0, comptime description: *const [27:0]u8 = \"Overall image magnification\"} = .{.type = f32, .minValue = 0, .maxValue = 30, .defaultValue = 0, .description = \"Overall image magnification\"}, comptime rotate: struct{comptime type: type = f32, comptime minValue: comptime_float = -360, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 0, comptime description: *const [22:0]u8 = \"Overall image rotation\"} = .{.type = f32, .minValue = -360, .maxValue = 360, .defaultValue = 0, .description = \"Overall image rotation\"}, comptime antialiasing: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 3, comptime defaultValue: comptime_int = 1, comptime description: *const [60:0]u8 = \"Super sampling quality. Number of samples squared per pixel.\"} = .{.type = i32, .minValue = 1, .maxValue = 3, .defaultValue = 1, .description = \"Super sampling quality. Number of samples squared per pixel.\"}, comptime center: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -200, comptime comptime_float = -200} = .{-200, -200}, comptime maxValue: struct{comptime comptime_float = 200, comptime comptime_float = 200} = .{200, 200}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [40:0]u8 = \"Panning of the image in the output frame\"} = .{.type = @Vector(2, f32), .minValue = .{-200, -200}, .maxValue = .{200, 200}, .defaultValue = .{0, 0}, .description = \"Panning of the image in the output frame\"}, comptime centerShift: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -200, comptime comptime_float = -200} = .{-200, -200}, comptime maxValue: struct{comptime comptime_float = 200, comptime comptime_float = 200} = .{200, 200}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [30:0]u8 = \"Shift the centre of the spiral\"} = .{.type = @Vector(2, f32), .minValue = .{-200, -200}, .maxValue = .{200, 200}, .defaultValue = .{0, 0}, .description = \"Shift the centre of the spiral\"}, comptime backgroundRGBA: struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 1} = .{0, 0, 0, 1}, comptime description: *const [30:0]u8 = \"Set the RGBA background colour\"} = .{.type = @Vector(4, f32), .minValue = .{0, 0, 0, 0}, .maxValue = .{1, 1, 1, 1}, .defaultValue = .{0, 0, 0, 1}, .description = \"Set the RGBA background colour\"}, comptime levels: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 20, comptime defaultValue: comptime_int = 9, comptime description: *const [44:0]u8 = \"The number of repeating levels of the spiral\"} = .{.type = i32, .minValue = 1, .maxValue = 20, .defaultValue = 9, .description = \"The number of repeating levels of the spiral\"}, comptime levelStart: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 20, comptime defaultValue: comptime_int = 3, comptime description: *const [25:0]u8 = \"The starting spiral level\"} = .{.type = i32, .minValue = 1, .maxValue = 20, .defaultValue = 3, .description = \"The starting spiral level\"}, comptime transparentInside: struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [74:0]u8 = \"Enable for images with transparent middle areas (such as a picture frame).\"} = .{.type = bool, .defaultValue = true, .description = \"Enable for images with transparent middle areas (such as a picture frame).\"}, comptime transparentOutside: struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [60:0]u8 = \"Enable for images with transparent areas around the outside.\"} = .{.type = bool, .defaultValue = true, .description = \"Enable for images with transparent areas around the outside.\"}, comptime twist: struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [52:0]u8 = \"Uncheck to unroll the circular annular of the image.\"} = .{.type = bool, .defaultValue = true, .description = \"Uncheck to unroll the circular annular of the image.\"}, comptime periodicityAuto: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [72:0]u8 = \"Automatically set the ideal periodicity for the current radius settings.\"} = .{.type = bool, .defaultValue = false, .description = \"Automatically set the ideal periodicity for the current radius settings.\"}, comptime rotatePolar: struct{comptime type: type = f32, comptime minValue: comptime_float = -360, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 0, comptime description: *const [14:0]u8 = \"Polar rotation\"} = .{.type = f32, .minValue = -360, .maxValue = 360, .defaultValue = 0, .description = \"Polar rotation\"}, comptime rotateSpin: struct{comptime type: type = f32, comptime minValue: comptime_float = -360, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 0, comptime description: *const [49:0]u8 = \"Spin mapped image. Best used with polar rotation.\"} = .{.type = f32, .minValue = -360, .maxValue = 360, .defaultValue = 0, .description = \"Spin mapped image. Best used with polar rotation.\"}, comptime hyperDroste: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [27:0]u8 = \"Enable hyper droste effect.\"} = .{.type = bool, .defaultValue = false, .description = \"Enable hyper droste effect.\"}, comptime fractalPoints: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 10, comptime defaultValue: comptime_int = 0, comptime description: *const [28:0]u8 = \"Used by hyper droste option.\"} = .{.type = i32, .minValue = 0, .maxValue = 10, .defaultValue = 0, .description = \"Used by hyper droste option.\"}}",
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
        name: "radiusInside",
        structure: s31,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "radiusOutside",
        structure: s33,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "periodicity",
        structure: s38,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "strands",
        structure: s43,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "strandMirror",
        structure: s50,
      },
      {
        ...m,
        type: 8,
        slot: 6,
        name: "zoom",
        structure: s55,
      },
      {
        ...m,
        type: 8,
        slot: 7,
        name: "rotate",
        structure: s60,
      },
      {
        ...m,
        type: 8,
        slot: 8,
        name: "antialiasing",
        structure: s65,
      },
      {
        ...m,
        type: 8,
        slot: 9,
        name: "center",
        structure: s77,
      },
      {
        ...m,
        type: 8,
        slot: 10,
        name: "centerShift",
        structure: s82,
      },
      {
        ...m,
        type: 8,
        slot: 11,
        name: "backgroundRGBA",
        structure: s91,
      },
      {
        ...m,
        type: 8,
        slot: 12,
        name: "levels",
        structure: s96,
      },
      {
        ...m,
        type: 8,
        slot: 13,
        name: "levelStart",
        structure: s101,
      },
      {
        ...m,
        type: 8,
        slot: 14,
        name: "transparentInside",
        structure: s106,
      },
      {
        ...m,
        type: 8,
        slot: 15,
        name: "transparentOutside",
        structure: s108,
      },
      {
        ...m,
        type: 8,
        slot: 16,
        name: "twist",
        structure: s113,
      },
      {
        ...m,
        type: 8,
        slot: 17,
        name: "periodicityAuto",
        structure: s118,
      },
      {
        ...m,
        type: 8,
        slot: 18,
        name: "rotatePolar",
        structure: s123,
      },
      {
        ...m,
        type: 8,
        slot: 19,
        name: "rotateSpin",
        structure: s128,
      },
      {
        ...m,
        type: 8,
        slot: 20,
        name: "hyperDroste",
        structure: s130,
      },
      {
        ...m,
        type: 8,
        slot: 21,
        name: "fractalPoints",
        structure: s135,
      },
    ],
    methods: [],
    template: {
      memory: { array: a201 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a202 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s31,
          memory: { array: a203 },
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
          memory: { array: a204 },
          slots: {
            0: {
              structure: s32,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s38,
          memory: { array: a205 },
          slots: {
            0: {
              structure: s37,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s43,
          memory: { array: a206 },
          slots: {
            0: {
              structure: s42,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s50,
          memory: { array: a207 },
          slots: {
            0: {
              structure: s49,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s55,
          memory: { array: a208 },
          slots: {
            0: {
              structure: s54,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        7: {
          structure: s60,
          memory: { array: a209 },
          slots: {
            0: {
              structure: s59,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        8: {
          structure: s65,
          memory: { array: a210 },
          slots: {
            0: {
              structure: s64,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        9: {
          structure: s77,
          memory: { array: a211 },
          slots: {
            0: {
              structure: s76,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        10: {
          structure: s82,
          memory: { array: a212 },
          slots: {
            0: {
              structure: s81,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        11: {
          structure: s91,
          memory: { array: a213 },
          slots: {
            0: {
              structure: s90,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        12: {
          structure: s96,
          memory: { array: a214 },
          slots: {
            0: {
              structure: s95,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        13: {
          structure: s101,
          memory: { array: a215 },
          slots: {
            0: {
              structure: s100,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        14: {
          structure: s106,
          memory: { array: a216 },
          slots: {
            0: {
              structure: s105,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        15: {
          structure: s108,
          memory: { array: a217 },
          slots: {
            0: {
              structure: s107,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        16: {
          structure: s113,
          memory: { array: a218 },
          slots: {
            0: {
              structure: s112,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        17: {
          structure: s118,
          memory: { array: a219 },
          slots: {
            0: {
              structure: s117,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        18: {
          structure: s123,
          memory: { array: a220 },
          slots: {
            0: {
              structure: s122,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        19: {
          structure: s128,
          memory: { array: a221 },
          slots: {
            0: {
              structure: s127,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        20: {
          structure: s130,
          memory: { array: a222 },
          slots: {
            0: {
              structure: s129,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        21: {
          structure: s135,
          memory: { array: a223 },
          slots: {
            0: {
              structure: s134,
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
Object.assign(s137, {
  ...s,
  type: 11,
  name: "*const struct{comptime size: struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 4000, comptime comptime_int = 4000} = .{4000, 4000}, comptime defaultValue: struct{comptime comptime_int = 680, comptime comptime_int = 680} = .{680, 680}, comptime description: *const [26:0]u8 = \"Output size of final image\"} = .{.type = @Vector(2, i32), .minValue = .{100, 100}, .maxValue = .{4000, 4000}, .defaultValue = .{680, 680}, .description = \"Output size of final image\"}, comptime radiusInside: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 25, comptime description: *const [41:0]u8 = \"The inner radius of the repeating annular\"} = .{.type = f32, .minValue = 0.1, .maxValue = 100, .defaultValue = 25, .description = \"The inner radius of the repeating annular\"}, comptime radiusOutside: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 100, comptime defaultValue: comptime_float = 100, comptime description: *const [41:0]u8 = \"The outer radius of the repeating annular\"} = .{.type = f32, .minValue = 1, .maxValue = 100, .defaultValue = 100, .description = \"The outer radius of the repeating annular\"}, comptime periodicity: struct{comptime type: type = f32, comptime minValue: comptime_float = -6, comptime maxValue: comptime_float = 6, comptime defaultValue: comptime_float = 1, comptime description: *const [55:0]u8 = \"The number of image the image is repeated on each level\"} = .{.type = f32, .minValue = -6, .maxValue = 6, .defaultValue = 1, .description = \"The number of image the image is repeated on each level\"}, comptime strands: struct{comptime type: type = i32, comptime minValue: comptime_int = -12, comptime maxValue: comptime_int = 12, comptime defaultValue: comptime_int = 1, comptime description: *const [35:0]u8 = \"The number of strands of the spiral\"} = .{.type = i32, .minValue = -12, .maxValue = 12, .defaultValue = 1, .description = \"The number of strands of the spiral\"}, comptime strandMirror: struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [50:0]u8 = \"Smoother repeating when using more than one strand\"} = .{.type = bool, .defaultValue = true, .description = \"Smoother repeating when using more than one strand\"}, comptime zoom: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 30, comptime defaultValue: comptime_float = 0, comptime description: *const [27:0]u8 = \"Overall image magnification\"} = .{.type = f32, .minValue = 0, .maxValue = 30, .defaultValue = 0, .description = \"Overall image magnification\"}, comptime rotate: struct{comptime type: type = f32, comptime minValue: comptime_float = -360, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 0, comptime description: *const [22:0]u8 = \"Overall image rotation\"} = .{.type = f32, .minValue = -360, .maxValue = 360, .defaultValue = 0, .description = \"Overall image rotation\"}, comptime antialiasing: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 3, comptime defaultValue: comptime_int = 1, comptime description: *const [60:0]u8 = \"Super sampling quality. Number of samples squared per pixel.\"} = .{.type = i32, .minValue = 1, .maxValue = 3, .defaultValue = 1, .description = \"Super sampling quality. Number of samples squared per pixel.\"}, comptime center: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -200, comptime comptime_float = -200} = .{-200, -200}, comptime maxValue: struct{comptime comptime_float = 200, comptime comptime_float = 200} = .{200, 200}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [40:0]u8 = \"Panning of the image in the output frame\"} = .{.type = @Vector(2, f32), .minValue = .{-200, -200}, .maxValue = .{200, 200}, .defaultValue = .{0, 0}, .description = \"Panning of the image in the output frame\"}, comptime centerShift: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -200, comptime comptime_float = -200} = .{-200, -200}, comptime maxValue: struct{comptime comptime_float = 200, comptime comptime_float = 200} = .{200, 200}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [30:0]u8 = \"Shift the centre of the spiral\"} = .{.type = @Vector(2, f32), .minValue = .{-200, -200}, .maxValue = .{200, 200}, .defaultValue = .{0, 0}, .description = \"Shift the centre of the spiral\"}, comptime backgroundRGBA: struct{comptime type: type = @Vector(4, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 1} = .{0, 0, 0, 1}, comptime description: *const [30:0]u8 = \"Set the RGBA background colour\"} = .{.type = @Vector(4, f32), .minValue = .{0, 0, 0, 0}, .maxValue = .{1, 1, 1, 1}, .defaultValue = .{0, 0, 0, 1}, .description = \"Set the RGBA background colour\"}, comptime levels: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 20, comptime defaultValue: comptime_int = 9, comptime description: *const [44:0]u8 = \"The number of repeating levels of the spiral\"} = .{.type = i32, .minValue = 1, .maxValue = 20, .defaultValue = 9, .description = \"The number of repeating levels of the spiral\"}, comptime levelStart: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 20, comptime defaultValue: comptime_int = 3, comptime description: *const [25:0]u8 = \"The starting spiral level\"} = .{.type = i32, .minValue = 1, .maxValue = 20, .defaultValue = 3, .description = \"The starting spiral level\"}, comptime transparentInside: struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [74:0]u8 = \"Enable for images with transparent middle areas (such as a picture frame).\"} = .{.type = bool, .defaultValue = true, .description = \"Enable for images with transparent middle areas (such as a picture frame).\"}, comptime transparentOutside: struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [60:0]u8 = \"Enable for images with transparent areas around the outside.\"} = .{.type = bool, .defaultValue = true, .description = \"Enable for images with transparent areas around the outside.\"}, comptime twist: struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [52:0]u8 = \"Uncheck to unroll the circular annular of the image.\"} = .{.type = bool, .defaultValue = true, .description = \"Uncheck to unroll the circular annular of the image.\"}, comptime periodicityAuto: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [72:0]u8 = \"Automatically set the ideal periodicity for the current radius settings.\"} = .{.type = bool, .defaultValue = false, .description = \"Automatically set the ideal periodicity for the current radius settings.\"}, comptime rotatePolar: struct{comptime type: type = f32, comptime minValue: comptime_float = -360, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 0, comptime description: *const [14:0]u8 = \"Polar rotation\"} = .{.type = f32, .minValue = -360, .maxValue = 360, .defaultValue = 0, .description = \"Polar rotation\"}, comptime rotateSpin: struct{comptime type: type = f32, comptime minValue: comptime_float = -360, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 0, comptime description: *const [49:0]u8 = \"Spin mapped image. Best used with polar rotation.\"} = .{.type = f32, .minValue = -360, .maxValue = 360, .defaultValue = 0, .description = \"Spin mapped image. Best used with polar rotation.\"}, comptime hyperDroste: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [27:0]u8 = \"Enable hyper droste effect.\"} = .{.type = bool, .defaultValue = false, .description = \"Enable hyper droste effect.\"}, comptime fractalPoints: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 10, comptime defaultValue: comptime_int = 0, comptime description: *const [28:0]u8 = \"Used by hyper droste option.\"} = .{.type = i32, .minValue = 0, .maxValue = 10, .defaultValue = 0, .description = \"Used by hyper droste option.\"}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s136,
      },
    ],
    methods: [],
    template: null
  },
  slot: 14,
});
const a224 = new Uint8Array([  ]);
const a225 = new Uint8Array([ 124, 30, 16, 0 ]);
const a226 = new Uint8Array([ 4, 0, 0, 0 ]);
Object.assign(s138, {
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
      memory: { array: a224 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a225 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a226 },
              address: 1056380,
            },
          },
        },
      },
    },
  },
  slot: 86,
});
Object.assign(s139, {
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
        structure: s138,
      },
    ],
    methods: [],
    template: null
  },
  slot: 85,
});
const a227 = new Uint8Array([  ]);
const a228 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s140, {
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
        structure: s139,
      },
    ],
    methods: [],
    template: {
      memory: { array: a227 },
      slots: {
        0: {
          structure: s139,
          memory: { array: a228 },
          slots: {
            0: {
              structure: s138,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 17,
});
Object.assign(s141, {
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
        structure: s140,
      },
    ],
    methods: [],
    template: null
  },
  slot: 16,
});
const a229 = new Uint8Array([  ]);
const a230 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s142, {
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
        structure: s139,
      },
    ],
    methods: [],
    template: {
      memory: { array: a229 },
      slots: {
        0: {
          structure: s139,
          memory: { array: a230 },
          slots: {
            0: {
              structure: s138,
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
Object.assign(s143, {
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
        structure: s142,
      },
    ],
    methods: [],
    template: null
  },
  slot: 18,
});
const a231 = new Uint8Array([  ]);
const a232 = new Uint8Array([  ]);
const a233 = new Uint8Array([ 132, 171, 16, 0 ]);
const a234 = new Uint8Array([ 59, 171, 16, 0 ]);
const a235 = new Uint8Array([ 99, 111, 109, 46, 115, 117, 98, 98, 108, 117, 101, 46, 102, 105, 108, 116, 101, 114, 115, 0 ]);
const a236 = new Uint8Array([ 128, 171, 16, 0 ]);
const a237 = new Uint8Array([ 37, 171, 16, 0 ]);
const a238 = new Uint8Array([ 84, 111, 109, 32, 66, 101, 100, 100, 97, 114, 100, 0 ]);
const a239 = new Uint8Array([ 204, 30, 16, 0 ]);
const a240 = new Uint8Array([ 124, 171, 16, 0 ]);
const a241 = new Uint8Array([ 3, 171, 16, 0 ]);
const a242 = new Uint8Array([ 84, 104, 101, 32, 68, 114, 111, 115, 116, 101, 32, 101, 102, 102, 101, 99, 116, 46, 0 ]);
const a243 = new Uint8Array([ 170, 170, 170, 170 ]);
const a244 = new Uint8Array([ 170, 170, 170, 170 ]);
const a245 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s144, {
  ...s,
  type: 2,
  name: "droste.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a231 },
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
        structure: s137,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "inputImages",
        structure: s141,
      },
      {
        ...m,
        type: 6,
        slot: 6,
        name: "outputImages",
        structure: s143,
      },
    ],
    methods: [],
    template: {
      memory: { array: a232 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a233 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a234 },
              address: 1092484,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a235 },
                  address: 1092411,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a236 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a237 },
              address: 1092480,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a238 },
                  address: 1092389,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a239 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a53 },
              address: 1056460,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a240 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a241 },
              address: 1092476,
              slots: {
                0: {
                  structure: s9,
                  memory: { array: a242 },
                  address: 1092355,
                },
              },
            },
          },
        },
        4: {
          structure: s137,
          memory: { array: a243 },
          slots: {
            0: {
              structure: s136,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s141,
          memory: { array: a244 },
          slots: {
            0: {
              structure: s140,
              memory: { array: a14 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s143,
          memory: { array: a245 },
          slots: {
            0: {
              structure: s142,
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
Object.assign(s145, {
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
Object.assign(s146, {
  ...s,
  type: 12,
  name: "[_]const @Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s145,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s147, {
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
        structure: s146,
      },
    ],
    methods: [],
    template: null
  },
  slot: 22,
});
Object.assign(s148, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s148,
      },
    ],
    methods: [],
    template: null
  },
  slot: 25,
});
const a246 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s149, {
  ...s,
  type: 9,
  name: "droste.ColorSpace",
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
      memory: { array: a246 },
    },
  },
  slot: 26,
});
Object.assign(s150, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s150,
      },
    ],
    methods: [],
    template: null
  },
  slot: 28,
});
const a247 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a248 = new Uint8Array([  ]);
const a249 = new Uint8Array([ 124, 30, 16, 0 ]);
Object.assign(s151, {
  ...s,
  type: 2,
  name: "droste.Image(u8,4,false)",
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
        structure: s147,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s148,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s148,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s149,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s44,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s150,
      },
    ],
    methods: [],
    template: {
      memory: { array: a247 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s145,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s83,
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
      memory: { array: a248 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a249 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a226 },
              address: 1056380,
            },
          },
        },
      },
    },
  },
  slot: 21,
});
const a250 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a251 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a252 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a253 = new Uint8Array([  ]);
Object.assign(s152, {
  ...s,
  type: 2,
  name: "droste.KernelInput(u8,droste.kernel)",
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
        structure: s151,
      },
    ],
    methods: [],
    template: {
      memory: { array: a250 },
      slots: {
        0: {
          structure: s151,
          memory: { array: a251 },
          slots: {
            0: {
              structure: s147,
              memory: { array: a252 },
              slots: {
                0: {
                  structure: s146,
                  memory: { array: a253 },
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
Object.assign(s153, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s145,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s154, {
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
        structure: s153,
      },
    ],
    methods: [],
    template: null
  },
  slot: 31,
});
const a254 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a255 = new Uint8Array([  ]);
const a256 = new Uint8Array([ 124, 30, 16, 0 ]);
Object.assign(s155, {
  ...s,
  type: 2,
  name: "droste.Image(u8,4,true)",
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
        structure: s154,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s148,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s148,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s149,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s44,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s150,
      },
    ],
    methods: [],
    template: {
      memory: { array: a254 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s145,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s83,
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
      memory: { array: a255 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a256 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a226 },
              address: 1056380,
            },
          },
        },
      },
    },
  },
  slot: 30,
});
const a257 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a258 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a259 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s156, {
  ...s,
  type: 2,
  name: "droste.KernelOutput(u8,droste.kernel)",
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
        structure: s155,
      },
    ],
    methods: [],
    template: {
      memory: { array: a257 },
      slots: {
        0: {
          structure: s155,
          memory: { array: a258 },
          slots: {
            0: {
              structure: s154,
              memory: { array: a259 },
              slots: {
                0: {
                  structure: s153,
                  memory: { array: a253 },
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
const a260 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 168, 2, 0, 0, 168, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 65, 0, 0, 200, 66, 0, 0, 128, 63, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 9, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0 ]);
Object.assign(s157, {
  ...s,
  type: 2,
  name: "droste.KernelParameters(droste.kernel)",
  length: 1,
  byteSize: 96,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitOffset: 128,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        name: "size",
        structure: s12,
      },
      {
        ...m,
        type: 4,
        bitOffset: 320,
        slot: 1,
        name: "radiusInside",
        structure: s24,
      },
      {
        ...m,
        type: 4,
        bitOffset: 352,
        slot: 2,
        name: "radiusOutside",
        structure: s24,
      },
      {
        ...m,
        type: 4,
        bitOffset: 384,
        slot: 3,
        name: "periodicity",
        structure: s24,
      },
      {
        ...m,
        type: 2,
        bitOffset: 416,
        slot: 4,
        name: "strands",
        structure: s7,
      },
      {
        ...m,
        type: 1,
        bitOffset: 704,
        bitSize: 1,
        byteSize: 1,
        slot: 5,
        name: "strandMirror",
        structure: s44,
      },
      {
        ...m,
        type: 4,
        bitOffset: 448,
        slot: 6,
        name: "zoom",
        structure: s24,
      },
      {
        ...m,
        type: 4,
        bitOffset: 480,
        slot: 7,
        name: "rotate",
        structure: s24,
      },
      {
        ...m,
        type: 2,
        bitOffset: 512,
        slot: 8,
        name: "antialiasing",
        structure: s7,
      },
      {
        ...m,
        type: 6,
        bitOffset: 192,
        bitSize: 64,
        byteSize: 8,
        slot: 9,
        name: "center",
        structure: s66,
      },
      {
        ...m,
        type: 6,
        bitOffset: 256,
        bitSize: 64,
        byteSize: 8,
        slot: 10,
        name: "centerShift",
        structure: s66,
      },
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 128,
        byteSize: 16,
        slot: 11,
        name: "backgroundRGBA",
        structure: s83,
      },
      {
        ...m,
        type: 2,
        bitOffset: 544,
        slot: 12,
        name: "levels",
        structure: s7,
      },
      {
        ...m,
        type: 2,
        bitOffset: 576,
        slot: 13,
        name: "levelStart",
        structure: s7,
      },
      {
        ...m,
        type: 1,
        bitOffset: 712,
        bitSize: 1,
        byteSize: 1,
        slot: 14,
        name: "transparentInside",
        structure: s44,
      },
      {
        ...m,
        type: 1,
        bitOffset: 720,
        bitSize: 1,
        byteSize: 1,
        slot: 15,
        name: "transparentOutside",
        structure: s44,
      },
      {
        ...m,
        type: 1,
        bitOffset: 728,
        bitSize: 1,
        byteSize: 1,
        slot: 16,
        name: "twist",
        structure: s44,
      },
      {
        ...m,
        type: 1,
        bitOffset: 736,
        bitSize: 1,
        byteSize: 1,
        slot: 17,
        name: "periodicityAuto",
        structure: s44,
      },
      {
        ...m,
        type: 4,
        bitOffset: 608,
        slot: 18,
        name: "rotatePolar",
        structure: s24,
      },
      {
        ...m,
        type: 4,
        bitOffset: 640,
        slot: 19,
        name: "rotateSpin",
        structure: s24,
      },
      {
        ...m,
        type: 1,
        bitOffset: 744,
        bitSize: 1,
        byteSize: 1,
        slot: 20,
        name: "hyperDroste",
        structure: s44,
      },
      {
        ...m,
        type: 2,
        bitOffset: 672,
        slot: 21,
        name: "fractalPoints",
        structure: s7,
      },
    ],
    methods: [],
    template: {
      memory: { array: a260 },
    },
  },
  slot: 32,
});
Object.assign(s158, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(droste.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 87,
});
Object.assign(s159, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(droste.createOutput)).Fn.return_type.?).ErrorUnion.error_set!droste.KernelOutput(u8,droste.kernel)",
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
        structure: s156,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s158,
      },
    ],
    methods: [],
    template: null
  },
  slot: 39,
});
Object.assign(s160, {
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
        bitOffset: 768,
        slot: 0,
        name: "0",
        structure: s148,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 800,
        slot: 1,
        name: "1",
        structure: s148,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 832,
        bitSize: 192,
        byteSize: 24,
        slot: 2,
        name: "2",
        structure: s152,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 768,
        byteSize: 96,
        slot: 3,
        name: "3",
        structure: s157,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1024,
        bitSize: 224,
        byteSize: 28,
        slot: 4,
        name: "retval",
        structure: s159,
      },
    ],
    methods: [],
    template: null
  },
  slot: 37,
});
Object.assign(s161, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(droste.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 88,
});
Object.assign(s162, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(droste.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!droste.KernelOutput(u8,droste.kernel)",
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
        structure: s156,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s161,
      },
    ],
    methods: [],
    template: null
  },
  slot: 40,
});
Object.assign(s163, {
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
        bitOffset: 768,
        slot: 0,
        name: "0",
        structure: s148,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 800,
        slot: 1,
        name: "1",
        structure: s148,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 832,
        slot: 2,
        name: "2",
        structure: s148,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 864,
        slot: 3,
        name: "3",
        structure: s148,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 896,
        bitSize: 192,
        byteSize: 24,
        slot: 4,
        name: "4",
        structure: s152,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 768,
        byteSize: 96,
        slot: 5,
        name: "5",
        structure: s157,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1088,
        bitSize: 224,
        byteSize: 28,
        slot: 6,
        name: "retval",
        structure: s162,
      },
    ],
    methods: [],
    template: null
  },
  slot: 38,
});
const f0 = {
  argStruct: s160,
  thunk: 1,
  name: "createOutput",
};
const f1 = {
  argStruct: s163,
  thunk: 4,
  name: "createPartialOutput",
};
Object.assign(s164, {
  ...s,
  type: 2,
  name: "droste",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a253 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s144,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s152,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s156,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s157,
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
  s120, s121, s122, s123, s124, s125, s126, s127, s128, s129,
  s130, s131, s132, s133, s134, s135, s136, s137, s138, s139,
  s140, s141, s142, s143, s144, s145, s146, s147, s148, s149,
  s150, s151, s152, s153, s154, s155, s156, s157, s158, s159,
  s160, s161, s162, s163, s164,
];
const linkage = finalizeStructures(structures);
const module = s164.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_df9df22c;
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