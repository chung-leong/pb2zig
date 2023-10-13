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
  useBool,
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
useType();
useBool();
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
const s40 = {}, s41 = {}, s42 = {}, s43 = {}, s44 = {}, s45 = {}, s46 = {}, s47 = {}, s48 = {};
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
  slot: 4,
});
Object.assign(s2, {
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
  slot: 13,
});
Object.assign(s10, {
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
  slot: 47,
});
Object.assign(s13, {
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
        structure: s12,
      },
    ],
    methods: [],
    template: null
  },
  slot: 46,
});
Object.assign(s14, {
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
        structure: s13,
      },
    ],
    methods: [],
    template: null
  },
  slot: 45,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 64, 30, 16, 0 ]);
const a2 = new Uint8Array([ 1, 0, 0, 0 ]);
const a3 = new Uint8Array([ 60, 30, 16, 0 ]);
const a4 = new Uint8Array([ 10, 0, 0, 0 ]);
const a5 = new Uint8Array([ 56, 30, 16, 0 ]);
const a6 = new Uint8Array([ 5, 0, 0, 0 ]);
const a7 = new Uint8Array([ 52, 30, 16, 0 ]);
const a8 = new Uint8Array([ 68, 30, 16, 0 ]);
const a9 = new Uint8Array([ 115, 105, 122, 101, 32, 111, 102, 32, 116, 104, 101, 32, 115, 116, 105, 116, 99, 104, 105, 110, 103, 0 ]);
Object.assign(s15, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 10, comptime defaultValue: comptime_int = 5, comptime description: *const [21:0]u8 = \"size of the stitching\"}",
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
              address: 1056320,
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
              address: 1056316,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a5 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a6 },
              address: 1056312,
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
              address: 1056308,
              slots: {
                0: {
                  structure: s12,
                  memory: { array: a9 },
                  address: 1056324,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 38,
});
Object.assign(s16, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 10, comptime defaultValue: comptime_int = 5, comptime description: *const [21:0]u8 = \"size of the stitching\"}",
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
  slot: 37,
});
const a10 = new Uint8Array([  ]);
const a11 = new Uint8Array([ 170, 170, 170, 170 ]);
const a12 = new Uint8Array([  ]);
Object.assign(s17, {
  ...s,
  type: 2,
  name: "struct{comptime size: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 10, comptime defaultValue: comptime_int = 5, comptime description: *const [21:0]u8 = \"size of the stitching\"} = .{.type = i32, .minValue = 1, .maxValue = 10, .defaultValue = 5, .description = \"size of the stitching\"}}",
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
        structure: s16,
      },
    ],
    methods: [],
    template: {
      memory: { array: a10 },
      slots: {
        0: {
          structure: s16,
          memory: { array: a11 },
          slots: {
            0: {
              structure: s15,
              memory: { array: a12 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 15,
});
Object.assign(s18, {
  ...s,
  type: 11,
  name: "*const struct{comptime size: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 10, comptime defaultValue: comptime_int = 5, comptime description: *const [21:0]u8 = \"size of the stitching\"} = .{.type = i32, .minValue = 1, .maxValue = 10, .defaultValue = 5, .description = \"size of the stitching\"}}",
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
  slot: 14,
});
const a13 = new Uint8Array([  ]);
const a14 = new Uint8Array([ 48, 30, 16, 0 ]);
const a15 = new Uint8Array([ 4, 0, 0, 0 ]);
Object.assign(s19, {
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
      memory: { array: a13 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a14 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a15 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 40,
});
Object.assign(s20, {
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
        structure: s19,
      },
    ],
    methods: [],
    template: null
  },
  slot: 39,
});
const a16 = new Uint8Array([  ]);
const a17 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s21, {
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
        structure: s20,
      },
    ],
    methods: [],
    template: {
      memory: { array: a16 },
      slots: {
        0: {
          structure: s20,
          memory: { array: a17 },
          slots: {
            0: {
              structure: s19,
              memory: { array: a12 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 17,
});
Object.assign(s22, {
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
        structure: s21,
      },
    ],
    methods: [],
    template: null
  },
  slot: 16,
});
const a18 = new Uint8Array([  ]);
const a19 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s23, {
  ...s,
  type: 2,
  name: "struct{comptime outputPx: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "outputPx",
        structure: s20,
      },
    ],
    methods: [],
    template: {
      memory: { array: a18 },
      slots: {
        0: {
          structure: s20,
          memory: { array: a19 },
          slots: {
            0: {
              structure: s19,
              memory: { array: a12 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 19,
});
Object.assign(s24, {
  ...s,
  type: 11,
  name: "*const struct{comptime outputPx: struct{comptime channels: comptime_int = 4} = .{.channels = 4}}",
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
  slot: 18,
});
const a20 = new Uint8Array([  ]);
const a21 = new Uint8Array([  ]);
const a22 = new Uint8Array([ 184, 42, 16, 0 ]);
const a23 = new Uint8Array([ 107, 42, 16, 0 ]);
const a24 = new Uint8Array([ 110, 101, 116, 46, 103, 104, 111, 115, 116, 114, 97, 100, 105, 111, 46, 112, 98, 0 ]);
const a25 = new Uint8Array([ 180, 42, 16, 0 ]);
const a26 = new Uint8Array([ 82, 42, 16, 0 ]);
const a27 = new Uint8Array([ 103, 104, 111, 115, 116, 82, 97, 100, 105, 111, 46, 110, 101, 116, 0 ]);
const a28 = new Uint8Array([ 64, 30, 16, 0 ]);
const a29 = new Uint8Array([ 176, 42, 16, 0 ]);
const a30 = new Uint8Array([ 47, 42, 16, 0 ]);
const a31 = new Uint8Array([ 67, 114, 111, 115, 115, 45, 115, 116, 105, 116, 99, 104, 32, 101, 102, 102, 101, 99, 116, 0 ]);
const a32 = new Uint8Array([ 170, 170, 170, 170 ]);
const a33 = new Uint8Array([ 170, 170, 170, 170 ]);
const a34 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s25, {
  ...s,
  type: 2,
  name: "cross-stitch.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a20 },
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
        structure: s18,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "inputImages",
        structure: s22,
      },
      {
        ...m,
        type: 6,
        slot: 6,
        name: "outputImages",
        structure: s24,
      },
    ],
    methods: [],
    template: {
      memory: { array: a21 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a22 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a23 },
              address: 1059512,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a24 },
                  address: 1059435,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a25 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a26 },
              address: 1059508,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a27 },
                  address: 1059410,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a28 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a2 },
              address: 1056320,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a29 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a30 },
              address: 1059504,
              slots: {
                0: {
                  structure: s9,
                  memory: { array: a31 },
                  address: 1059375,
                },
              },
            },
          },
        },
        4: {
          structure: s18,
          memory: { array: a32 },
          slots: {
            0: {
              structure: s17,
              memory: { array: a12 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s22,
          memory: { array: a33 },
          slots: {
            0: {
              structure: s21,
              memory: { array: a12 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s24,
          memory: { array: a34 },
          slots: {
            0: {
              structure: s23,
              memory: { array: a12 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
Object.assign(s26, {
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
Object.assign(s27, {
  ...s,
  type: 12,
  name: "[_]const @Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s26,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s28, {
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
        structure: s27,
      },
    ],
    methods: [],
    template: null
  },
  slot: 22,
});
Object.assign(s29, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s29,
      },
    ],
    methods: [],
    template: null
  },
  slot: 25,
});
const a35 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s30, {
  ...s,
  type: 9,
  name: "cross-stitch.ColorSpace",
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
      memory: { array: a35 },
    },
  },
  slot: 26,
});
Object.assign(s31, {
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
        structure: s31,
      },
    ],
    methods: [],
    template: null
  },
  slot: 27,
});
Object.assign(s32, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s32,
      },
    ],
    methods: [],
    template: null
  },
  slot: 28,
});
Object.assign(s33, {
  ...s,
  name: "f32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 0,
        structure: s33,
      },
    ],
    methods: [],
    template: null
  },
  slot: 44,
});
Object.assign(s34, {
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
        structure: s33,
      },
    ],
    methods: [],
    template: null
  },
  slot: 41,
});
const a36 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a37 = new Uint8Array([  ]);
const a38 = new Uint8Array([ 48, 30, 16, 0 ]);
Object.assign(s35, {
  ...s,
  type: 2,
  name: "cross-stitch.Image(u8,4,false)",
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
        structure: s28,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s29,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s30,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s31,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s32,
      },
    ],
    methods: [],
    template: {
      memory: { array: a36 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s26,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s34,
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
      memory: { array: a37 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a38 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a15 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 21,
});
const a39 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a40 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a41 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a42 = new Uint8Array([  ]);
Object.assign(s36, {
  ...s,
  type: 2,
  name: "cross-stitch.KernelInput(u8,cross-stitch.kernel)",
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
        structure: s35,
      },
    ],
    methods: [],
    template: {
      memory: { array: a39 },
      slots: {
        0: {
          structure: s35,
          memory: { array: a40 },
          slots: {
            0: {
              structure: s28,
              memory: { array: a41 },
              slots: {
                0: {
                  structure: s27,
                  memory: { array: a42 },
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
Object.assign(s37, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s26,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s38, {
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
        structure: s37,
      },
    ],
    methods: [],
    template: null
  },
  slot: 31,
});
const a43 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a44 = new Uint8Array([  ]);
const a45 = new Uint8Array([ 48, 30, 16, 0 ]);
Object.assign(s39, {
  ...s,
  type: 2,
  name: "cross-stitch.Image(u8,4,true)",
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
        structure: s38,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s29,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s30,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s31,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s32,
      },
    ],
    methods: [],
    template: {
      memory: { array: a43 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s26,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s34,
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
      memory: { array: a44 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a45 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a15 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 30,
});
const a46 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a47 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a48 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s40, {
  ...s,
  type: 2,
  name: "cross-stitch.KernelOutput(u8,cross-stitch.kernel)",
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
        name: "outputPx",
        structure: s39,
      },
    ],
    methods: [],
    template: {
      memory: { array: a46 },
      slots: {
        0: {
          structure: s39,
          memory: { array: a47 },
          slots: {
            0: {
              structure: s38,
              memory: { array: a48 },
              slots: {
                0: {
                  structure: s37,
                  memory: { array: a42 },
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
const a49 = new Uint8Array([ 5, 0, 0, 0 ]);
Object.assign(s41, {
  ...s,
  type: 2,
  name: "cross-stitch.KernelParameters(cross-stitch.kernel)",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 2,
        bitOffset: 0,
        slot: 0,
        name: "size",
        structure: s7,
      },
    ],
    methods: [],
    template: {
      memory: { array: a49 },
    },
  },
  slot: 32,
});
Object.assign(s42, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(cross-stitch.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 42,
});
Object.assign(s43, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(cross-stitch.createOutput)).Fn.return_type.?).ErrorUnion.error_set!cross-stitch.KernelOutput(u8,cross-stitch.kernel)",
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
        structure: s40,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s42,
      },
    ],
    methods: [],
    template: null
  },
  slot: 35,
});
Object.assign(s44, {
  ...s,
  type: 3,
  name: "createOutput",
  length: 1,
  byteSize: 64,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 0,
        slot: 0,
        name: "0",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 32,
        slot: 1,
        name: "1",
        structure: s29,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 64,
        bitSize: 192,
        byteSize: 24,
        slot: 2,
        name: "2",
        structure: s36,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 256,
        slot: 3,
        name: "3",
        structure: s41,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 288,
        bitSize: 224,
        byteSize: 28,
        slot: 4,
        name: "retval",
        structure: s43,
      },
    ],
    methods: [],
    template: null
  },
  slot: 33,
});
Object.assign(s45, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(cross-stitch.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 43,
});
Object.assign(s46, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(cross-stitch.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!cross-stitch.KernelOutput(u8,cross-stitch.kernel)",
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
        structure: s40,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s45,
      },
    ],
    methods: [],
    template: null
  },
  slot: 36,
});
Object.assign(s47, {
  ...s,
  type: 3,
  name: "createPartialOutput",
  length: 1,
  byteSize: 72,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 0,
        slot: 0,
        name: "0",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 32,
        slot: 1,
        name: "1",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 2,
        name: "2",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 3,
        name: "3",
        structure: s29,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 128,
        bitSize: 192,
        byteSize: 24,
        slot: 4,
        name: "4",
        structure: s36,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 320,
        slot: 5,
        name: "5",
        structure: s41,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 352,
        bitSize: 224,
        byteSize: 28,
        slot: 6,
        name: "retval",
        structure: s46,
      },
    ],
    methods: [],
    template: null
  },
  slot: 34,
});
const f0 = {
  argStruct: s44,
  thunk: 7,
  name: "createOutput",
};
const f1 = {
  argStruct: s47,
  thunk: 2,
  name: "createPartialOutput",
};
Object.assign(s48, {
  ...s,
  type: 2,
  name: "cross-stitch",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a42 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s25,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s36,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s40,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s41,
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
  s40, s41, s42, s43, s44, s45, s46, s47, s48,
];
const linkage = finalizeStructures(structures);
const module = s48.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_2de41479;
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