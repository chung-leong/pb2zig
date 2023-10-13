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
  useFloat,
  useEnumerationItem,
  useType,
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
useFloat();
useEnumerationItem();
useType();

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
const s40 = {}, s41 = {}, s42 = {}, s43 = {};
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
  name: "[3:0]u8",
  length: 3,
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
  name: "*const [3:0]u8",
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
  name: "*const *const [3:0]u8",
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
  slot: 8,
});
Object.assign(s5, {
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
  name: "[51:0]u8",
  length: 51,
  byteSize: 52,
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
  name: "*const [51:0]u8",
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
  name: "*const *const [51:0]u8",
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
const a0 = new Uint8Array([  ]);
Object.assign(s12, {
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
      memory: { array: a0 },
    },
  },
  slot: 15,
});
Object.assign(s13, {
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
        structure: s12,
      },
    ],
    methods: [],
    template: null
  },
  slot: 14,
});
const a1 = new Uint8Array([  ]);
const a2 = new Uint8Array([ 128, 2, 16, 0 ]);
const a3 = new Uint8Array([ 4, 0, 0, 0 ]);
Object.assign(s14, {
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
      memory: { array: a1 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a2 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a3 },
              address: 1049216,
            },
          },
        },
      },
    },
  },
  slot: 38,
});
Object.assign(s15, {
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
        structure: s14,
      },
    ],
    methods: [],
    template: null
  },
  slot: 37,
});
const a4 = new Uint8Array([  ]);
const a5 = new Uint8Array([ 170, 170, 170, 170 ]);
const a6 = new Uint8Array([  ]);
Object.assign(s16, {
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
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 17,
});
Object.assign(s17, {
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
        structure: s16,
      },
    ],
    methods: [],
    template: null
  },
  slot: 16,
});
const a7 = new Uint8Array([  ]);
const a8 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s18, {
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
        structure: s15,
      },
    ],
    methods: [],
    template: {
      memory: { array: a7 },
      slots: {
        0: {
          structure: s15,
          memory: { array: a8 },
          slots: {
            0: {
              structure: s14,
              memory: { array: a6 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 19,
});
Object.assign(s19, {
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
        structure: s18,
      },
    ],
    methods: [],
    template: null
  },
  slot: 18,
});
const a9 = new Uint8Array([  ]);
const a10 = new Uint8Array([  ]);
const a11 = new Uint8Array([ 240, 9, 16, 0 ]);
const a12 = new Uint8Array([ 174, 9, 16, 0 ]);
const a13 = new Uint8Array([ 65, 73, 70, 0 ]);
const a14 = new Uint8Array([ 236, 9, 16, 0 ]);
const a15 = new Uint8Array([ 144, 9, 16, 0 ]);
const a16 = new Uint8Array([ 65, 100, 111, 98, 101, 32, 83, 121, 115, 116, 101, 109, 115, 44, 32, 73, 110, 99, 46, 0 ]);
const a17 = new Uint8Array([ 232, 9, 16, 0 ]);
const a18 = new Uint8Array([ 2, 0, 0, 0 ]);
const a19 = new Uint8Array([ 228, 9, 16, 0 ]);
const a20 = new Uint8Array([ 77, 9, 16, 0 ]);
const a21 = new Uint8Array([ 73, 110, 118, 101, 114, 116, 32, 116, 104, 101, 32, 82, 101, 100, 44, 32, 71, 114, 101, 101, 110, 32, 97, 110, 100, 32, 66, 108, 117, 101, 32, 99, 104, 97, 110, 110, 101, 108, 115, 32, 111, 102, 32, 97, 110, 32, 105, 109, 97, 103, 101, 0 ]);
const a22 = new Uint8Array([ 170, 170, 170, 170 ]);
const a23 = new Uint8Array([ 170, 170, 170, 170 ]);
const a24 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s20, {
  ...s,
  type: 2,
  name: "invert-rgb.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a9 },
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
        structure: s13,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "inputImages",
        structure: s17,
      },
      {
        ...m,
        type: 6,
        slot: 6,
        name: "outputImages",
        structure: s19,
      },
    ],
    methods: [],
    template: {
      memory: { array: a10 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a11 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a12 },
              address: 1051120,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a13 },
                  address: 1051054,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a14 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a15 },
              address: 1051116,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a16 },
                  address: 1051024,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a17 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a18 },
              address: 1051112,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a19 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a20 },
              address: 1051108,
              slots: {
                0: {
                  structure: s9,
                  memory: { array: a21 },
                  address: 1050957,
                },
              },
            },
          },
        },
        4: {
          structure: s13,
          memory: { array: a22 },
          slots: {
            0: {
              structure: s12,
              memory: { array: a6 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s17,
          memory: { array: a23 },
          slots: {
            0: {
              structure: s16,
              memory: { array: a6 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s19,
          memory: { array: a24 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a6 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
Object.assign(s21, {
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
Object.assign(s22, {
  ...s,
  type: 12,
  name: "[_]const @Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s21,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s23, {
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
        structure: s22,
      },
    ],
    methods: [],
    template: null
  },
  slot: 22,
});
Object.assign(s24, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s24,
      },
    ],
    methods: [],
    template: null
  },
  slot: 25,
});
const a25 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s25, {
  ...s,
  type: 9,
  name: "invert-rgb.ColorSpace",
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
      memory: { array: a25 },
    },
  },
  slot: 26,
});
Object.assign(s26, {
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
        structure: s26,
      },
    ],
    methods: [],
    template: null
  },
  slot: 27,
});
Object.assign(s27, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s27,
      },
    ],
    methods: [],
    template: null
  },
  slot: 28,
});
Object.assign(s28, {
  ...s,
  name: "f32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 0,
        structure: s28,
      },
    ],
    methods: [],
    template: null
  },
  slot: 42,
});
Object.assign(s29, {
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
        structure: s28,
      },
    ],
    methods: [],
    template: null
  },
  slot: 39,
});
const a26 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a27 = new Uint8Array([  ]);
const a28 = new Uint8Array([ 128, 2, 16, 0 ]);
Object.assign(s30, {
  ...s,
  type: 2,
  name: "invert-rgb.Image(u8,4,false)",
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
        structure: s23,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s24,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s24,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s25,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s26,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s27,
      },
    ],
    methods: [],
    template: {
      memory: { array: a26 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s21,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s29,
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
      memory: { array: a27 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a28 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a3 },
              address: 1049216,
            },
          },
        },
      },
    },
  },
  slot: 21,
});
const a29 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a30 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a31 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a32 = new Uint8Array([  ]);
Object.assign(s31, {
  ...s,
  type: 2,
  name: "invert-rgb.KernelInput(u8,invert-rgb.kernel)",
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
        structure: s30,
      },
    ],
    methods: [],
    template: {
      memory: { array: a29 },
      slots: {
        0: {
          structure: s30,
          memory: { array: a30 },
          slots: {
            0: {
              structure: s23,
              memory: { array: a31 },
              slots: {
                0: {
                  structure: s22,
                  memory: { array: a32 },
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
Object.assign(s32, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s21,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s33, {
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
        structure: s32,
      },
    ],
    methods: [],
    template: null
  },
  slot: 31,
});
const a33 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a34 = new Uint8Array([  ]);
const a35 = new Uint8Array([ 128, 2, 16, 0 ]);
Object.assign(s34, {
  ...s,
  type: 2,
  name: "invert-rgb.Image(u8,4,true)",
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
        structure: s33,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s24,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s24,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s25,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s26,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s27,
      },
    ],
    methods: [],
    template: {
      memory: { array: a33 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s21,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s29,
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
      memory: { array: a34 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a35 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a3 },
              address: 1049216,
            },
          },
        },
      },
    },
  },
  slot: 30,
});
const a36 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a37 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a38 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s35, {
  ...s,
  type: 2,
  name: "invert-rgb.KernelOutput(u8,invert-rgb.kernel)",
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
        structure: s34,
      },
    ],
    methods: [],
    template: {
      memory: { array: a36 },
      slots: {
        0: {
          structure: s34,
          memory: { array: a37 },
          slots: {
            0: {
              structure: s33,
              memory: { array: a38 },
              slots: {
                0: {
                  structure: s32,
                  memory: { array: a32 },
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
const a39 = new Uint8Array([  ]);
Object.assign(s36, {
  ...s,
  type: 2,
  name: "invert-rgb.KernelParameters(invert-rgb.kernel)",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a39 },
    },
  },
  slot: 32,
});
Object.assign(s37, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(invert-rgb.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 40,
});
Object.assign(s38, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(invert-rgb.createOutput)).Fn.return_type.?).ErrorUnion.error_set!invert-rgb.KernelOutput(u8,invert-rgb.kernel)",
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
        structure: s35,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s37,
      },
    ],
    methods: [],
    template: null
  },
  slot: 35,
});
Object.assign(s39, {
  ...s,
  type: 3,
  name: "createOutput",
  length: 1,
  byteSize: 60,
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
        structure: s24,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 32,
        slot: 1,
        name: "1",
        structure: s24,
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
        structure: s31,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 480,
        bitSize: 0,
        byteSize: 0,
        slot: 3,
        name: "3",
        structure: s36,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 256,
        bitSize: 224,
        byteSize: 28,
        slot: 4,
        name: "retval",
        structure: s38,
      },
    ],
    methods: [],
    template: null
  },
  slot: 33,
});
Object.assign(s40, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(invert-rgb.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 41,
});
Object.assign(s41, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(invert-rgb.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!invert-rgb.KernelOutput(u8,invert-rgb.kernel)",
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
        structure: s35,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s40,
      },
    ],
    methods: [],
    template: null
  },
  slot: 36,
});
Object.assign(s42, {
  ...s,
  type: 3,
  name: "createPartialOutput",
  length: 1,
  byteSize: 68,
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
        structure: s24,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 32,
        slot: 1,
        name: "1",
        structure: s24,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 2,
        name: "2",
        structure: s24,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 3,
        name: "3",
        structure: s24,
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
        structure: s31,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 544,
        bitSize: 0,
        byteSize: 0,
        slot: 5,
        name: "5",
        structure: s36,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 320,
        bitSize: 224,
        byteSize: 28,
        slot: 6,
        name: "retval",
        structure: s41,
      },
    ],
    methods: [],
    template: null
  },
  slot: 34,
});
const f0 = {
  argStruct: s39,
  thunk: 1,
  name: "createOutput",
};
const f1 = {
  argStruct: s42,
  thunk: 5,
  name: "createPartialOutput",
};
Object.assign(s43, {
  ...s,
  type: 2,
  name: "invert-rgb",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a32 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s20,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s31,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s35,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s36,
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
  s40, s41, s42, s43,
];
const linkage = finalizeStructures(structures);
const module = s43.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_67e2ef79;
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