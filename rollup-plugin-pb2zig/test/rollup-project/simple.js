import { usePrimitive, useArray, usePointer, useVector, useStruct, useSlice, useEnumeration, useErrorSet, useErrorUnion, useArgStruct, useUint, useObject, useInt, useFloat, useType, useBool, useEnumerationItem, finalizeStructures, linkModule } from 'zigar-runtime';

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
const s40 = {}, s41 = {}, s42 = {}, s43 = {}, s44 = {};
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
  slot: 42,
});
Object.assign(s10, {
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
Object.assign(s11, {
  ...s,
  type: 1,
  name: "[3]@Vector(3, f32)",
  length: 3,
  byteSize: 48,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitSize: 96,
        byteSize: 16,
        structure: s10,
      },
    ],
    methods: [],
    template: null
  },
  slot: 30,
});
Object.assign(s12, {
  ...s,
  type: 11,
  name: "*const [3]@Vector(3, f32)",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s11,
      },
    ],
    methods: [],
    template: null
  },
  slot: 43,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 160, 30, 16, 0 ]);
const a2 = new Uint8Array([ 0, 0, 128, 191, 0, 0, 128, 191, 0, 0, 128, 191, 0, 0, 0, 0, 0, 0, 128, 191, 0, 0, 128, 191, 0, 0, 128, 191, 0, 0, 0, 0, 0, 0, 128, 191, 0, 0, 128, 191, 0, 0, 128, 191, 0, 0, 0, 0 ]);
const a3 = new Uint8Array([ 112, 30, 16, 0 ]);
const a4 = new Uint8Array([ 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 0, 0 ]);
const a5 = new Uint8Array([ 64, 30, 16, 0 ]);
const a6 = new Uint8Array([ 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 153, 153, 62, 0, 0, 128, 63, 51, 51, 51, 63, 0, 0, 0, 0, 205, 204, 204, 61, 154, 153, 153, 62, 205, 204, 76, 63, 0, 0, 0, 0 ]);
Object.assign(s13, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = [3]@Vector(3, f32), comptime minValue: [3]@Vector(3, f32) = .{ .{ -1, -1, -1 }, .{ -1, -1, -1 }, .{ -1, -1, -1 } }, comptime maxValue: [3]@Vector(3, f32) = .{ .{ 1, 1, 1 }, .{ 1, 1, 1 }, .{ 1, 1, 1 } }, comptime defaultValue: [3]@Vector(3, f32) = .{ .{ 0.5, 0, 0 }, .{ 0.30000001192092896, 1, 0.699999988079071 }, .{ 0.10000000149011612, 0.30000001192092896, 0.800000011920929 } }}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s11,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s12,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s12,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s12,
      },
    ],
    methods: [],
    template: {
      memory: { array: a0 },
      slots: {
        0: {
          structure: s12,
          memory: { array: a1 },
          slots: {
            0: {
              structure: s11,
              memory: { array: a2 },
              address: 1056416,
            },
          },
        },
        1: {
          structure: s12,
          memory: { array: a3 },
          slots: {
            0: {
              structure: s11,
              memory: { array: a4 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s12,
          memory: { array: a5 },
          slots: {
            0: {
              structure: s11,
              memory: { array: a6 },
              address: 1056320,
            },
          },
        },
      },
    },
  },
  slot: 37,
});
Object.assign(s14, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = [3]@Vector(3, f32), comptime minValue: [3]@Vector(3, f32) = .{ .{ -1, -1, -1 }, .{ -1, -1, -1 }, .{ -1, -1, -1 } }, comptime maxValue: [3]@Vector(3, f32) = .{ .{ 1, 1, 1 }, .{ 1, 1, 1 }, .{ 1, 1, 1 } }, comptime defaultValue: [3]@Vector(3, f32) = .{ .{ 0.5, 0, 0 }, .{ 0.30000001192092896, 1, 0.699999988079071 }, .{ 0.10000000149011612, 0.30000001192092896, 0.800000011920929 } }}",
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
  slot: 36,
});
const a7 = new Uint8Array([  ]);
const a8 = new Uint8Array([ 170, 170, 170, 170 ]);
const a9 = new Uint8Array([  ]);
Object.assign(s15, {
  ...s,
  type: 2,
  name: "struct{comptime transform: struct{comptime type: type = [3]@Vector(3, f32), comptime minValue: [3]@Vector(3, f32) = .{ .{ -1, -1, -1 }, .{ -1, -1, -1 }, .{ -1, -1, -1 } }, comptime maxValue: [3]@Vector(3, f32) = .{ .{ 1, 1, 1 }, .{ 1, 1, 1 }, .{ 1, 1, 1 } }, comptime defaultValue: [3]@Vector(3, f32) = .{ .{ 0.5, 0, 0 }, .{ 0.30000001192092896, 1, 0.699999988079071 }, .{ 0.10000000149011612, 0.30000001192092896, 0.800000011920929 } }} = .{.type = [3]@Vector(3, f32), .minValue = .{ .{ -1, -1, -1 }, .{ -1, -1, -1 }, .{ -1, -1, -1 } }, .maxValue = .{ .{ 1, 1, 1 }, .{ 1, 1, 1 }, .{ 1, 1, 1 } }, .defaultValue = .{ .{ 0.5, 0, 0 }, .{ 0.30000001192092896, 1, 0.699999988079071 }, .{ 0.10000000149011612, 0.30000001192092896, 0.800000011920929 } }}}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 8,
        slot: 0,
        name: "transform",
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
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 12,
});
Object.assign(s16, {
  ...s,
  type: 11,
  name: "*const struct{comptime transform: struct{comptime type: type = [3]@Vector(3, f32), comptime minValue: [3]@Vector(3, f32) = .{ .{ -1, -1, -1 }, .{ -1, -1, -1 }, .{ -1, -1, -1 } }, comptime maxValue: [3]@Vector(3, f32) = .{ .{ 1, 1, 1 }, .{ 1, 1, 1 }, .{ 1, 1, 1 } }, comptime defaultValue: [3]@Vector(3, f32) = .{ .{ 0.5, 0, 0 }, .{ 0.30000001192092896, 1, 0.699999988079071 }, .{ 0.10000000149011612, 0.30000001192092896, 0.800000011920929 } }} = .{.type = [3]@Vector(3, f32), .minValue = .{ .{ -1, -1, -1 }, .{ -1, -1, -1 }, .{ -1, -1, -1 } }, .maxValue = .{ .{ 1, 1, 1 }, .{ 1, 1, 1 }, .{ 1, 1, 1 } }, .defaultValue = .{ .{ 0.5, 0, 0 }, .{ 0.30000001192092896, 1, 0.699999988079071 }, .{ 0.10000000149011612, 0.30000001192092896, 0.800000011920929 } }}}",
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
  slot: 11,
});
const a10 = new Uint8Array([  ]);
const a11 = new Uint8Array([ 48, 30, 16, 0 ]);
const a12 = new Uint8Array([ 3, 0, 0, 0 ]);
Object.assign(s17, {
  ...s,
  type: 2,
  name: "struct{comptime channels: comptime_int = 3}",
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
      memory: { array: a10 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a11 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a12 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 39,
});
Object.assign(s18, {
  ...s,
  type: 11,
  name: "*const struct{comptime channels: comptime_int = 3}",
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
  slot: 38,
});
const a13 = new Uint8Array([  ]);
const a14 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s19, {
  ...s,
  type: 2,
  name: "struct{comptime src: struct{comptime channels: comptime_int = 3} = .{.channels = 3}}",
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
        structure: s18,
      },
    ],
    methods: [],
    template: {
      memory: { array: a13 },
      slots: {
        0: {
          structure: s18,
          memory: { array: a14 },
          slots: {
            0: {
              structure: s17,
              memory: { array: a9 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 14,
});
Object.assign(s20, {
  ...s,
  type: 11,
  name: "*const struct{comptime src: struct{comptime channels: comptime_int = 3} = .{.channels = 3}}",
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
  slot: 13,
});
const a15 = new Uint8Array([  ]);
const a16 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s21, {
  ...s,
  type: 2,
  name: "struct{comptime dst: struct{comptime channels: comptime_int = 3} = .{.channels = 3}}",
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
        structure: s18,
      },
    ],
    methods: [],
    template: {
      memory: { array: a15 },
      slots: {
        0: {
          structure: s18,
          memory: { array: a16 },
          slots: {
            0: {
              structure: s17,
              memory: { array: a9 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 16,
});
Object.assign(s22, {
  ...s,
  type: 11,
  name: "*const struct{comptime dst: struct{comptime channels: comptime_int = 3} = .{.channels = 3}}",
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
  slot: 15,
});
const a17 = new Uint8Array([  ]);
const a18 = new Uint8Array([  ]);
const a19 = new Uint8Array([ 0, 47, 16, 0 ]);
const a20 = new Uint8Array([ 186, 46, 16, 0 ]);
const a21 = new Uint8Array([ 89, 111, 117, 114, 32, 78, 97, 109, 101, 115, 112, 97, 99, 101, 0 ]);
const a22 = new Uint8Array([ 252, 46, 16, 0 ]);
const a23 = new Uint8Array([ 164, 46, 16, 0 ]);
const a24 = new Uint8Array([ 89, 111, 117, 114, 32, 86, 101, 110, 100, 111, 114, 0 ]);
const a25 = new Uint8Array([ 248, 46, 16, 0 ]);
const a26 = new Uint8Array([ 1, 0, 0, 0 ]);
const a27 = new Uint8Array([ 170, 170, 170, 170 ]);
const a28 = new Uint8Array([ 170, 170, 170, 170 ]);
const a29 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s23, {
  ...s,
  type: 2,
  name: "simple.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a17 },
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
        structure: s16,
      },
      {
        ...m,
        type: 6,
        slot: 4,
        name: "inputImages",
        structure: s20,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "outputImages",
        structure: s22,
      },
    ],
    methods: [],
    template: {
      memory: { array: a18 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a19 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a20 },
              address: 1060608,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a21 },
                  address: 1060538,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a22 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a23 },
              address: 1060604,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a24 },
                  address: 1060516,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a25 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a26 },
              address: 1060600,
            },
          },
        },
        3: {
          structure: s16,
          memory: { array: a27 },
          slots: {
            0: {
              structure: s15,
              memory: { array: a9 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s20,
          memory: { array: a28 },
          slots: {
            0: {
              structure: s19,
              memory: { array: a9 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s22,
          memory: { array: a29 },
          slots: {
            0: {
              structure: s21,
              memory: { array: a9 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
Object.assign(s24, {
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
Object.assign(s25, {
  ...s,
  type: 12,
  name: "[_]const @Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s24,
      },
    ],
    methods: [],
    template: null
  },
  slot: 20,
});
Object.assign(s26, {
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
        structure: s25,
      },
    ],
    methods: [],
    template: null
  },
  slot: 19,
});
Object.assign(s27, {
  ...s,
  name: "u32",
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
  slot: 22,
});
const a30 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s28, {
  ...s,
  type: 9,
  name: "simple.ColorSpace",
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
      memory: { array: a30 },
    },
  },
  slot: 23,
});
Object.assign(s29, {
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
        structure: s29,
      },
    ],
    methods: [],
    template: null
  },
  slot: 24,
});
Object.assign(s30, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s30,
      },
    ],
    methods: [],
    template: null
  },
  slot: 25,
});
const a31 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a32 = new Uint8Array([  ]);
const a33 = new Uint8Array([ 48, 30, 16, 0 ]);
Object.assign(s31, {
  ...s,
  type: 2,
  name: "simple.Image(u8,3,false)",
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
        structure: s26,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s27,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s27,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s28,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s30,
      },
    ],
    methods: [],
    template: {
      memory: { array: a31 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s24,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s10,
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
      memory: { array: a32 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a33 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a12 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 18,
});
const a34 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a35 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a36 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a37 = new Uint8Array([  ]);
Object.assign(s32, {
  ...s,
  type: 2,
  name: "simple.KernelInput(u8,simple.kernel)",
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
        structure: s31,
      },
    ],
    methods: [],
    template: {
      memory: { array: a34 },
      slots: {
        0: {
          structure: s31,
          memory: { array: a35 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a36 },
              slots: {
                0: {
                  structure: s25,
                  memory: { array: a37 },
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
Object.assign(s33, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s24,
      },
    ],
    methods: [],
    template: null
  },
  slot: 20,
});
Object.assign(s34, {
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
        structure: s33,
      },
    ],
    methods: [],
    template: null
  },
  slot: 28,
});
const a38 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a39 = new Uint8Array([  ]);
const a40 = new Uint8Array([ 48, 30, 16, 0 ]);
Object.assign(s35, {
  ...s,
  type: 2,
  name: "simple.Image(u8,3,true)",
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
        structure: s34,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s27,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s27,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s28,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s30,
      },
    ],
    methods: [],
    template: {
      memory: { array: a38 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s24,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s10,
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
      memory: { array: a39 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a40 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a12 },
              address: 1056304,
            },
          },
        },
      },
    },
  },
  slot: 27,
});
const a41 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a42 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a43 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s36, {
  ...s,
  type: 2,
  name: "simple.KernelOutput(u8,simple.kernel)",
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
        structure: s35,
      },
    ],
    methods: [],
    template: {
      memory: { array: a41 },
      slots: {
        0: {
          structure: s35,
          memory: { array: a42 },
          slots: {
            0: {
              structure: s34,
              memory: { array: a43 },
              slots: {
                0: {
                  structure: s33,
                  memory: { array: a37 },
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
const a44 = new Uint8Array([ 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 153, 153, 62, 0, 0, 128, 63, 51, 51, 51, 63, 0, 0, 0, 0, 205, 204, 204, 61, 154, 153, 153, 62, 205, 204, 76, 63, 0, 0, 0, 0 ]);
Object.assign(s37, {
  ...s,
  type: 2,
  name: "simple.KernelParameters(simple.kernel)",
  length: 1,
  byteSize: 48,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 352,
        byteSize: 48,
        slot: 0,
        name: "transform",
        structure: s11,
      },
    ],
    methods: [],
    template: {
      memory: { array: a44 },
    },
  },
  slot: 29,
});
Object.assign(s38, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(simple.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
Object.assign(s39, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(simple.createOutput)).Fn.return_type.?).ErrorUnion.error_set!simple.KernelOutput(u8,simple.kernel)",
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
        structure: s36,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s38,
      },
    ],
    methods: [],
    template: null
  },
  slot: 34,
});
Object.assign(s40, {
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
        structure: s27,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 416,
        slot: 1,
        name: "1",
        structure: s27,
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
        structure: s32,
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
        structure: s37,
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
        structure: s39,
      },
    ],
    methods: [],
    template: null
  },
  slot: 32,
});
Object.assign(s41, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(simple.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
Object.assign(s42, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(simple.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!simple.KernelOutput(u8,simple.kernel)",
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
        structure: s36,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s41,
      },
    ],
    methods: [],
    template: null
  },
  slot: 35,
});
Object.assign(s43, {
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
        structure: s27,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 416,
        slot: 1,
        name: "1",
        structure: s27,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 448,
        slot: 2,
        name: "2",
        structure: s27,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 480,
        slot: 3,
        name: "3",
        structure: s27,
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
        structure: s32,
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
        structure: s37,
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
        structure: s42,
      },
    ],
    methods: [],
    template: null
  },
  slot: 33,
});
const f0 = {
  argStruct: s40,
  thunk: 1,
  name: "createOutput",
};
const f1 = {
  argStruct: s43,
  thunk: 5,
  name: "createPartialOutput",
};
Object.assign(s44, {
  ...s,
  type: 2,
  name: "simple",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a37 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s23,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s32,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s36,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s37,
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
  s40, s41, s42, s43, s44,
];
const linkage = finalizeStructures(structures);
const module = s44.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = new URL('assets/simple-7d98870e.wasm', import.meta.url).href;
  if (typeof(process) === 'object' && process[Symbol.toStringTag] === 'process') {
    const { readFile } = await import('fs/promises');
    const { fileURLToPath } = await import('url');
    const path = fileURLToPath(url);
    return readFile(path);
  } else {
    return fetch(url);
  }
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
function createImageData(width, height, source = {}, params = {}) {
  return createPartialImageData(width, height, 0, height, source, params);
}

function createPartialImageData(width, height, start, count, source = {}, params = {}) {
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
        imageData = new ImageData(clampedArray, width, height, { colorSpace });
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

function getKernel() {
  return kernel;
}

export { __init, createImageData, createPartialImageData, getKernel };
