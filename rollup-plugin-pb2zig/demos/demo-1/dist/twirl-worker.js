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
const s60 = {};
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
  name: "[20:0]u8",
  length: 20,
  byteSize: 21,
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
  name: "*const [20:0]u8",
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
  name: "*const *const [20:0]u8",
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
  slot: 8,
});
Object.assign(s5, {
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
  name: "[21:0]u8",
  length: 21,
  byteSize: 22,
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
  name: "*const [21:0]u8",
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
  name: "*const *const [21:0]u8",
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
  slot: 33,
});
Object.assign(s13, {
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
        structure: s13,
      },
    ],
    methods: [],
    template: null
  },
  slot: 53,
});
Object.assign(s14, {
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
        structure: s13,
      },
    ],
    methods: [],
    template: null
  },
  slot: 52,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 112, 30, 16, 0 ]);
const a2 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 185, 63 ]);
const a3 = new Uint8Array([ 56, 30, 16, 0 ]);
const a4 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 160, 64 ]);
const a5 = new Uint8Array([ 104, 30, 16, 0 ]);
const a6 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 36, 64 ]);
Object.assign(s15, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 2048, comptime defaultValue: comptime_float = 10}",
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
        structure: s14,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s14,
      },
    ],
    methods: [],
    template: {
      memory: { array: a0 },
      slots: {
        0: {
          structure: s14,
          memory: { array: a1 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a2 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s14,
          memory: { array: a3 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a4 },
              address: 1056312,
            },
          },
        },
        2: {
          structure: s14,
          memory: { array: a5 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a6 },
              address: 1056360,
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
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 2048, comptime defaultValue: comptime_float = 10}",
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
  slot: 34,
});
const a7 = new Uint8Array([  ]);
const a8 = new Uint8Array([ 64, 30, 16, 0 ]);
const a9 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a10 = new Uint8Array([ 64, 30, 16, 0 ]);
Object.assign(s18, {
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
        structure: s14,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s14,
      },
    ],
    methods: [],
    template: {
      memory: { array: a7 },
      slots: {
        0: {
          structure: s14,
          memory: { array: a8 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a9 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s14,
          memory: { array: a10 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a9 },
              address: 1056320,
            },
          },
        },
      },
    },
  },
  slot: 55,
});
Object.assign(s19, {
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
        structure: s18,
      },
    ],
    methods: [],
    template: null
  },
  slot: 54,
});
const a11 = new Uint8Array([  ]);
const a12 = new Uint8Array([ 56, 30, 16, 0 ]);
const a13 = new Uint8Array([ 56, 30, 16, 0 ]);
Object.assign(s20, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 2048, comptime comptime_float = 2048}",
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
        structure: s14,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s14,
      },
    ],
    methods: [],
    template: {
      memory: { array: a11 },
      slots: {
        0: {
          structure: s14,
          memory: { array: a12 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a4 },
              address: 1056312,
            },
          },
        },
        1: {
          structure: s14,
          memory: { array: a13 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a4 },
              address: 1056312,
            },
          },
        },
      },
    },
  },
  slot: 57,
});
Object.assign(s21, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 2048, comptime comptime_float = 2048}",
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
  slot: 56,
});
const a14 = new Uint8Array([  ]);
const a15 = new Uint8Array([ 48, 30, 16, 0 ]);
const a16 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 112, 64 ]);
const a17 = new Uint8Array([ 48, 30, 16, 0 ]);
Object.assign(s22, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 256, comptime comptime_float = 256}",
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
        structure: s14,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s14,
      },
    ],
    methods: [],
    template: {
      memory: { array: a14 },
      slots: {
        0: {
          structure: s14,
          memory: { array: a15 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a16 },
              address: 1056304,
            },
          },
        },
        1: {
          structure: s14,
          memory: { array: a17 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a16 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 59,
});
Object.assign(s23, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 256, comptime comptime_float = 256}",
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
  slot: 58,
});
const a18 = new Uint8Array([  ]);
const a19 = new Uint8Array([ 170, 170, 170, 170 ]);
const a20 = new Uint8Array([  ]);
const a21 = new Uint8Array([ 170, 170, 170, 170 ]);
const a22 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s24, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime maxValue: struct{comptime comptime_float = 2048, comptime comptime_float = 2048} = .{2048, 2048}, comptime defaultValue: struct{comptime comptime_float = 256, comptime comptime_float = 256} = .{256, 256}}",
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
        structure: s19,
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
        structure: s23,
      },
    ],
    methods: [],
    template: {
      memory: { array: a18 },
      slots: {
        0: {
          structure: s19,
          memory: { array: a19 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a20 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a21 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a20 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a22 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a20 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 42,
});
Object.assign(s25, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime maxValue: struct{comptime comptime_float = 2048, comptime comptime_float = 2048} = .{2048, 2048}, comptime defaultValue: struct{comptime comptime_float = 256, comptime comptime_float = 256} = .{256, 256}}",
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
  slot: 41,
});
const a23 = new Uint8Array([  ]);
const a24 = new Uint8Array([ 64, 30, 16, 0 ]);
const a25 = new Uint8Array([ 96, 30, 16, 0 ]);
const a26 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 118, 64 ]);
const a27 = new Uint8Array([ 88, 30, 16, 0 ]);
const a28 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 86, 64 ]);
Object.assign(s26, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 90}",
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
        structure: s14,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s14,
      },
    ],
    methods: [],
    template: {
      memory: { array: a23 },
      slots: {
        0: {
          structure: s14,
          memory: { array: a24 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a9 },
              address: 1056320,
            },
          },
        },
        1: {
          structure: s14,
          memory: { array: a25 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a26 },
              address: 1056352,
            },
          },
        },
        2: {
          structure: s14,
          memory: { array: a27 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a28 },
              address: 1056344,
            },
          },
        },
      },
    },
  },
  slot: 44,
});
Object.assign(s27, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 90}",
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
  slot: 43,
});
const a29 = new Uint8Array([  ]);
const a30 = new Uint8Array([ 76, 30, 16, 0 ]);
const a31 = new Uint8Array([ 0, 0, 0, 0 ]);
const a32 = new Uint8Array([ 80, 30, 16, 0 ]);
const a33 = new Uint8Array([ 1, 0, 0, 0 ]);
const a34 = new Uint8Array([ 76, 30, 16, 0 ]);
Object.assign(s28, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 1, comptime defaultValue: comptime_int = 0}",
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
      memory: { array: a29 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a30 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a31 },
              address: 1056332,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a32 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a33 },
              address: 1056336,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a34 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a31 },
              address: 1056332,
            },
          },
        },
      },
    },
  },
  slot: 46,
});
Object.assign(s29, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 1, comptime defaultValue: comptime_int = 0}",
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
  slot: 45,
});
const a35 = new Uint8Array([  ]);
const a36 = new Uint8Array([ 170, 170, 170, 170 ]);
const a37 = new Uint8Array([ 170, 170, 170, 170 ]);
const a38 = new Uint8Array([ 170, 170, 170, 170 ]);
const a39 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s30, {
  ...s,
  type: 2,
  name: "struct{comptime radius: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 2048, comptime defaultValue: comptime_float = 10} = .{.type = f32, .minValue = 0.1, .maxValue = 2048, .defaultValue = 10}, comptime center: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime maxValue: struct{comptime comptime_float = 2048, comptime comptime_float = 2048} = .{2048, 2048}, comptime defaultValue: struct{comptime comptime_float = 256, comptime comptime_float = 256} = .{256, 256}} = .{.type = @Vector(2, f32), .minValue = .{0, 0}, .maxValue = .{2048, 2048}, .defaultValue = .{256, 256}}, comptime twirlAngle: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 90} = .{.type = f32, .minValue = 0, .maxValue = 360, .defaultValue = 90}, comptime gaussOrSinc: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 1, comptime defaultValue: comptime_int = 0} = .{.type = i32, .minValue = 0, .maxValue = 1, .defaultValue = 0}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "radius",
        structure: s16,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "center",
        structure: s25,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "twirlAngle",
        structure: s27,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "gaussOrSinc",
        structure: s29,
      },
    ],
    methods: [],
    template: {
      memory: { array: a35 },
      slots: {
        0: {
          structure: s16,
          memory: { array: a36 },
          slots: {
            0: {
              structure: s15,
              memory: { array: a20 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s25,
          memory: { array: a37 },
          slots: {
            0: {
              structure: s24,
              memory: { array: a20 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s27,
          memory: { array: a38 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a20 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s29,
          memory: { array: a39 },
          slots: {
            0: {
              structure: s28,
              memory: { array: a20 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 15,
});
Object.assign(s31, {
  ...s,
  type: 11,
  name: "*const struct{comptime radius: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 2048, comptime defaultValue: comptime_float = 10} = .{.type = f32, .minValue = 0.1, .maxValue = 2048, .defaultValue = 10}, comptime center: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime maxValue: struct{comptime comptime_float = 2048, comptime comptime_float = 2048} = .{2048, 2048}, comptime defaultValue: struct{comptime comptime_float = 256, comptime comptime_float = 256} = .{256, 256}} = .{.type = @Vector(2, f32), .minValue = .{0, 0}, .maxValue = .{2048, 2048}, .defaultValue = .{256, 256}}, comptime twirlAngle: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 360, comptime defaultValue: comptime_float = 90} = .{.type = f32, .minValue = 0, .maxValue = 360, .defaultValue = 90}, comptime gaussOrSinc: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 1, comptime defaultValue: comptime_int = 0} = .{.type = i32, .minValue = 0, .maxValue = 1, .defaultValue = 0}}",
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
  slot: 14,
});
const a40 = new Uint8Array([  ]);
const a41 = new Uint8Array([ 72, 30, 16, 0 ]);
const a42 = new Uint8Array([ 4, 0, 0, 0 ]);
Object.assign(s32, {
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
      memory: { array: a40 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a41 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a42 },
              address: 1056328,
            },
          },
        },
      },
    },
  },
  slot: 48,
});
Object.assign(s33, {
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
        structure: s32,
      },
    ],
    methods: [],
    template: null
  },
  slot: 47,
});
const a43 = new Uint8Array([  ]);
const a44 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s34, {
  ...s,
  type: 2,
  name: "struct{comptime oImage: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "oImage",
        structure: s33,
      },
    ],
    methods: [],
    template: {
      memory: { array: a43 },
      slots: {
        0: {
          structure: s33,
          memory: { array: a44 },
          slots: {
            0: {
              structure: s32,
              memory: { array: a20 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 17,
});
Object.assign(s35, {
  ...s,
  type: 11,
  name: "*const struct{comptime oImage: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
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
  slot: 16,
});
const a45 = new Uint8Array([  ]);
const a46 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s36, {
  ...s,
  type: 2,
  name: "struct{comptime outputColor: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "outputColor",
        structure: s33,
      },
    ],
    methods: [],
    template: {
      memory: { array: a45 },
      slots: {
        0: {
          structure: s33,
          memory: { array: a46 },
          slots: {
            0: {
              structure: s32,
              memory: { array: a20 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 19,
});
Object.assign(s37, {
  ...s,
  type: 11,
  name: "*const struct{comptime outputColor: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
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
  slot: 18,
});
const a47 = new Uint8Array([  ]);
const a48 = new Uint8Array([  ]);
const a49 = new Uint8Array([ 24, 56, 16, 0 ]);
const a50 = new Uint8Array([ 201, 55, 16, 0 ]);
const a51 = new Uint8Array([ 80, 105, 120, 101, 108, 32, 66, 101, 110, 100, 101, 114, 32, 83, 97, 109, 112, 108, 101, 115, 0 ]);
const a52 = new Uint8Array([ 20, 56, 16, 0 ]);
const a53 = new Uint8Array([ 177, 55, 16, 0 ]);
const a54 = new Uint8Array([ 65, 100, 111, 98, 101, 32, 83, 121, 115, 116, 101, 109, 115, 0 ]);
const a55 = new Uint8Array([ 16, 56, 16, 0 ]);
const a56 = new Uint8Array([ 2, 0, 0, 0 ]);
const a57 = new Uint8Array([ 12, 56, 16, 0 ]);
const a58 = new Uint8Array([ 140, 55, 16, 0 ]);
const a59 = new Uint8Array([ 116, 119, 105, 115, 116, 32, 97, 110, 32, 105, 109, 97, 103, 101, 32, 97, 114, 111, 117, 110, 100, 0 ]);
const a60 = new Uint8Array([ 170, 170, 170, 170 ]);
const a61 = new Uint8Array([ 170, 170, 170, 170 ]);
const a62 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s38, {
  ...s,
  type: 2,
  name: "twirl.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a47 },
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
        structure: s31,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "inputImages",
        structure: s35,
      },
      {
        ...m,
        type: 6,
        slot: 6,
        name: "outputImages",
        structure: s37,
      },
    ],
    methods: [],
    template: {
      memory: { array: a48 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a49 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a50 },
              address: 1062936,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a51 },
                  address: 1062857,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a52 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a53 },
              address: 1062932,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a54 },
                  address: 1062833,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a55 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a56 },
              address: 1062928,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a57 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a58 },
              address: 1062924,
              slots: {
                0: {
                  structure: s9,
                  memory: { array: a59 },
                  address: 1062796,
                },
              },
            },
          },
        },
        4: {
          structure: s31,
          memory: { array: a60 },
          slots: {
            0: {
              structure: s30,
              memory: { array: a20 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s35,
          memory: { array: a61 },
          slots: {
            0: {
              structure: s34,
              memory: { array: a20 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s37,
          memory: { array: a62 },
          slots: {
            0: {
              structure: s36,
              memory: { array: a20 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
Object.assign(s39, {
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
Object.assign(s40, {
  ...s,
  type: 12,
  name: "[_]const @Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s39,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s41, {
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
        structure: s40,
      },
    ],
    methods: [],
    template: null
  },
  slot: 22,
});
Object.assign(s42, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s42,
      },
    ],
    methods: [],
    template: null
  },
  slot: 25,
});
const a63 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s43, {
  ...s,
  type: 9,
  name: "twirl.ColorSpace",
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
      memory: { array: a63 },
    },
  },
  slot: 26,
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
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s45,
      },
    ],
    methods: [],
    template: null
  },
  slot: 28,
});
Object.assign(s46, {
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
  slot: 49,
});
const a64 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a65 = new Uint8Array([  ]);
const a66 = new Uint8Array([ 72, 30, 16, 0 ]);
Object.assign(s47, {
  ...s,
  type: 2,
  name: "twirl.Image(u8,4,false)",
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
        structure: s41,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s42,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s42,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s43,
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
        structure: s45,
      },
    ],
    methods: [],
    template: {
      memory: { array: a64 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s39,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s46,
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
      memory: { array: a65 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a66 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a42 },
              address: 1056328,
            },
          },
        },
      },
    },
  },
  slot: 21,
});
const a67 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a68 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a69 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a70 = new Uint8Array([  ]);
Object.assign(s48, {
  ...s,
  type: 2,
  name: "twirl.KernelInput(u8,twirl.kernel)",
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
        name: "oImage",
        structure: s47,
      },
    ],
    methods: [],
    template: {
      memory: { array: a67 },
      slots: {
        0: {
          structure: s47,
          memory: { array: a68 },
          slots: {
            0: {
              structure: s41,
              memory: { array: a69 },
              slots: {
                0: {
                  structure: s40,
                  memory: { array: a70 },
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
Object.assign(s49, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s39,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s50, {
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
        structure: s49,
      },
    ],
    methods: [],
    template: null
  },
  slot: 31,
});
const a71 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a72 = new Uint8Array([  ]);
const a73 = new Uint8Array([ 72, 30, 16, 0 ]);
Object.assign(s51, {
  ...s,
  type: 2,
  name: "twirl.Image(u8,4,true)",
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
        structure: s50,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s42,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s42,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s43,
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
        structure: s45,
      },
    ],
    methods: [],
    template: {
      memory: { array: a71 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s39,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s46,
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
      memory: { array: a72 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a73 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a42 },
              address: 1056328,
            },
          },
        },
      },
    },
  },
  slot: 30,
});
const a74 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a75 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a76 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s52, {
  ...s,
  type: 2,
  name: "twirl.KernelOutput(u8,twirl.kernel)",
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
        name: "outputColor",
        structure: s51,
      },
    ],
    methods: [],
    template: {
      memory: { array: a74 },
      slots: {
        0: {
          structure: s51,
          memory: { array: a75 },
          slots: {
            0: {
              structure: s50,
              memory: { array: a76 },
              slots: {
                0: {
                  structure: s49,
                  memory: { array: a70 },
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
const a77 = new Uint8Array([ 0, 0, 128, 67, 0, 0, 128, 67, 0, 0, 32, 65, 0, 0, 180, 66, 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s53, {
  ...s,
  type: 2,
  name: "twirl.KernelParameters(twirl.kernel)",
  length: 1,
  byteSize: 24,
  align: 3,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 64,
        slot: 0,
        name: "radius",
        structure: s12,
      },
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 64,
        byteSize: 8,
        slot: 1,
        name: "center",
        structure: s17,
      },
      {
        ...m,
        type: 4,
        bitOffset: 96,
        slot: 2,
        name: "twirlAngle",
        structure: s12,
      },
      {
        ...m,
        type: 2,
        bitOffset: 128,
        slot: 3,
        name: "gaussOrSinc",
        structure: s7,
      },
    ],
    methods: [],
    template: {
      memory: { array: a77 },
    },
  },
  slot: 32,
});
Object.assign(s54, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(twirl.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
Object.assign(s55, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(twirl.createOutput)).Fn.return_type.?).ErrorUnion.error_set!twirl.KernelOutput(u8,twirl.kernel)",
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
        structure: s52,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s54,
      },
    ],
    methods: [],
    template: null
  },
  slot: 37,
});
Object.assign(s56, {
  ...s,
  type: 3,
  name: "createOutput",
  length: 1,
  byteSize: 88,
  align: 3,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 192,
        slot: 0,
        name: "0",
        structure: s42,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 224,
        slot: 1,
        name: "1",
        structure: s42,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 256,
        bitSize: 192,
        byteSize: 24,
        slot: 2,
        name: "2",
        structure: s48,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 192,
        byteSize: 24,
        slot: 3,
        name: "3",
        structure: s53,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 448,
        bitSize: 224,
        byteSize: 28,
        slot: 4,
        name: "retval",
        structure: s55,
      },
    ],
    methods: [],
    template: null
  },
  slot: 35,
});
Object.assign(s57, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(twirl.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
Object.assign(s58, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(twirl.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!twirl.KernelOutput(u8,twirl.kernel)",
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
        structure: s52,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s57,
      },
    ],
    methods: [],
    template: null
  },
  slot: 38,
});
Object.assign(s59, {
  ...s,
  type: 3,
  name: "createPartialOutput",
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
        bitOffset: 192,
        slot: 0,
        name: "0",
        structure: s42,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 224,
        slot: 1,
        name: "1",
        structure: s42,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 256,
        slot: 2,
        name: "2",
        structure: s42,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 288,
        slot: 3,
        name: "3",
        structure: s42,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 320,
        bitSize: 192,
        byteSize: 24,
        slot: 4,
        name: "4",
        structure: s48,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 192,
        byteSize: 24,
        slot: 5,
        name: "5",
        structure: s53,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 512,
        bitSize: 224,
        byteSize: 28,
        slot: 6,
        name: "retval",
        structure: s58,
      },
    ],
    methods: [],
    template: null
  },
  slot: 36,
});
const f0 = {
  argStruct: s56,
  thunk: 1,
  name: "createOutput",
};
const f1 = {
  argStruct: s59,
  thunk: 4,
  name: "createPartialOutput",
};
Object.assign(s60, {
  ...s,
  type: 2,
  name: "twirl",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a70 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s38,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s48,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s52,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s53,
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
  s60,
];
const linkage = finalizeStructures(structures);
const module = s60.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_75a24dc1;
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