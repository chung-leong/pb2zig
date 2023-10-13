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
const s90 = {}, s91 = {}, s92 = {}, s93 = {}, s94 = {}, s95 = {}, s96 = {}, s97 = {}, s98 = {}, s99 = {};
const s100 = {}, s101 = {}, s102 = {}, s103 = {}, s104 = {}, s105 = {}, s106 = {}, s107 = {}, s108 = {}, s109 = {};
const s110 = {}, s111 = {}, s112 = {}, s113 = {}, s114 = {}, s115 = {}, s116 = {}, s117 = {}, s118 = {}, s119 = {};
const s120 = {}, s121 = {}, s122 = {}, s123 = {}, s124 = {}, s125 = {}, s126 = {}, s127 = {}, s128 = {}, s129 = {};
const s130 = {}, s131 = {}, s132 = {}, s133 = {}, s134 = {}, s135 = {}, s136 = {}, s137 = {}, s138 = {}, s139 = {};
const s140 = {}, s141 = {}, s142 = {}, s143 = {}, s144 = {}, s145 = {}, s146 = {}, s147 = {}, s148 = {}, s149 = {};
const s150 = {}, s151 = {}, s152 = {}, s153 = {}, s154 = {}, s155 = {}, s156 = {}, s157 = {}, s158 = {}, s159 = {};
const s160 = {}, s161 = {}, s162 = {}, s163 = {}, s164 = {}, s165 = {}, s166 = {}, s167 = {}, s168 = {}, s169 = {};
const s170 = {}, s171 = {}, s172 = {}, s173 = {}, s174 = {}, s175 = {}, s176 = {}, s177 = {}, s178 = {}, s179 = {};
const s180 = {}, s181 = {}, s182 = {}, s183 = {}, s184 = {}, s185 = {}, s186 = {}, s187 = {}, s188 = {}, s189 = {};
const s190 = {}, s191 = {}, s192 = {}, s193 = {}, s194 = {}, s195 = {}, s196 = {}, s197 = {}, s198 = {}, s199 = {};
const s200 = {}, s201 = {}, s202 = {}, s203 = {}, s204 = {}, s205 = {}, s206 = {}, s207 = {}, s208 = {}, s209 = {};
const s210 = {}, s211 = {}, s212 = {}, s213 = {}, s214 = {}, s215 = {}, s216 = {}, s217 = {}, s218 = {}, s219 = {};
const s220 = {}, s221 = {}, s222 = {}, s223 = {};
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
  slot: 13,
});
Object.assign(s10, {
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
  slot: 16,
});
Object.assign(s13, {
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
        structure: s12,
      },
    ],
    methods: [],
    template: null
  },
  slot: 15,
});
Object.assign(s14, {
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
        structure: s13,
      },
    ],
    methods: [],
    template: null
  },
  slot: 14,
});
Object.assign(s15, {
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
  slot: 111,
});
Object.assign(s16, {
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
        structure: s15,
      },
    ],
    methods: [],
    template: null
  },
  slot: 110,
});
Object.assign(s17, {
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
        structure: s16,
      },
    ],
    methods: [],
    template: null
  },
  slot: 109,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 132, 31, 16, 0 ]);
const a2 = new Uint8Array([ 1, 0, 0, 0 ]);
const a3 = new Uint8Array([ 172, 31, 16, 0 ]);
const a4 = new Uint8Array([ 3, 0, 0, 0 ]);
const a5 = new Uint8Array([ 132, 31, 16, 0 ]);
const a6 = new Uint8Array([ 4, 32, 16, 0 ]);
const a7 = new Uint8Array([ 142, 37, 16, 0 ]);
const a8 = new Uint8Array([ 83, 117, 112, 101, 114, 32, 115, 97, 109, 112, 108, 105, 110, 103, 32, 113, 117, 97, 108, 105, 116, 121, 46, 32, 78, 117, 109, 98, 101, 114, 32, 111, 102, 32, 115, 97, 109, 112, 108, 101, 115, 32, 115, 113, 117, 97, 114, 101, 100, 32, 112, 101, 114, 32, 112, 105, 120, 101, 108, 46, 0 ]);
Object.assign(s18, {
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
        structure: s17,
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
              address: 1056644,
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
              address: 1056684,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a5 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a2 },
              address: 1056644,
            },
          },
        },
        3: {
          structure: s17,
          memory: { array: a6 },
          slots: {
            0: {
              structure: s16,
              memory: { array: a7 },
              address: 1056772,
              slots: {
                0: {
                  structure: s15,
                  memory: { array: a8 },
                  address: 1058190,
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
Object.assign(s19, {
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
        structure: s18,
      },
    ],
    methods: [],
    template: null
  },
  slot: 42,
});
Object.assign(s20, {
  ...s,
  name: "f32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 0,
        structure: s20,
      },
    ],
    methods: [],
    template: null
  },
  slot: 35,
});
Object.assign(s21, {
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
        structure: s20,
      },
    ],
    methods: [],
    template: null
  },
  slot: 34,
});
Object.assign(s22, {
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
        structure: s22,
      },
    ],
    methods: [],
    template: null
  },
  slot: 154,
});
Object.assign(s23, {
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
        structure: s22,
      },
    ],
    methods: [],
    template: null
  },
  slot: 153,
});
const a9 = new Uint8Array([  ]);
const a10 = new Uint8Array([ 200, 30, 16, 0 ]);
const a11 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 192 ]);
const a12 = new Uint8Array([ 200, 30, 16, 0 ]);
Object.assign(s24, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -2, comptime comptime_float = -2}",
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s23,
      },
    ],
    methods: [],
    template: {
      memory: { array: a9 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a10 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a11 },
              address: 1056456,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a12 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a11 },
              address: 1056456,
            },
          },
        },
      },
    },
  },
  slot: 113,
});
Object.assign(s25, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -2, comptime comptime_float = -2}",
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
  slot: 112,
});
const a13 = new Uint8Array([  ]);
const a14 = new Uint8Array([ 192, 30, 16, 0 ]);
const a15 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 64 ]);
const a16 = new Uint8Array([ 192, 30, 16, 0 ]);
Object.assign(s26, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 2, comptime comptime_float = 2}",
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s23,
      },
    ],
    methods: [],
    template: {
      memory: { array: a13 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a14 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a15 },
              address: 1056448,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a16 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a15 },
              address: 1056448,
            },
          },
        },
      },
    },
  },
  slot: 115,
});
Object.assign(s27, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 2, comptime comptime_float = 2}",
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
  slot: 114,
});
const a17 = new Uint8Array([  ]);
const a18 = new Uint8Array([ 144, 30, 16, 0 ]);
const a19 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a20 = new Uint8Array([ 144, 30, 16, 0 ]);
Object.assign(s28, {
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s23,
      },
    ],
    methods: [],
    template: {
      memory: { array: a17 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a18 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a20 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
      },
    },
  },
  slot: 117,
});
Object.assign(s29, {
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
        structure: s28,
      },
    ],
    methods: [],
    template: null
  },
  slot: 116,
});
Object.assign(s30, {
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
  slot: 120,
});
Object.assign(s31, {
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
        structure: s30,
      },
    ],
    methods: [],
    template: null
  },
  slot: 119,
});
Object.assign(s32, {
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
        structure: s31,
      },
    ],
    methods: [],
    template: null
  },
  slot: 118,
});
const a21 = new Uint8Array([  ]);
const a22 = new Uint8Array([ 170, 170, 170, 170 ]);
const a23 = new Uint8Array([  ]);
const a24 = new Uint8Array([ 170, 170, 170, 170 ]);
const a25 = new Uint8Array([ 170, 170, 170, 170 ]);
const a26 = new Uint8Array([ 0, 32, 16, 0 ]);
const a27 = new Uint8Array([ 115, 37, 16, 0 ]);
const a28 = new Uint8Array([ 84, 104, 101, 32, 99, 101, 110, 116, 101, 114, 32, 111, 102, 32, 116, 104, 101, 32, 102, 114, 97, 99, 116, 97, 108, 46, 0 ]);
Object.assign(s33, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -2, comptime comptime_float = -2} = .{-2, -2}, comptime maxValue: struct{comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [26:0]u8 = \"The center of the fractal.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s25,
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
        structure: s29,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s32,
      },
    ],
    methods: [],
    template: {
      memory: { array: a21 },
      slots: {
        0: {
          structure: s25,
          memory: { array: a22 },
          slots: {
            0: {
              structure: s24,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s27,
          memory: { array: a24 },
          slots: {
            0: {
              structure: s26,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s29,
          memory: { array: a25 },
          slots: {
            0: {
              structure: s28,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s32,
          memory: { array: a26 },
          slots: {
            0: {
              structure: s31,
              memory: { array: a27 },
              address: 1056768,
              slots: {
                0: {
                  structure: s30,
                  memory: { array: a28 },
                  address: 1058163,
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
Object.assign(s34, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -2, comptime comptime_float = -2} = .{-2, -2}, comptime maxValue: struct{comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [26:0]u8 = \"The center of the fractal.\"}",
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
  slot: 44,
});
const a29 = new Uint8Array([  ]);
const a30 = new Uint8Array([ 184, 30, 16, 0 ]);
const a31 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 191 ]);
const a32 = new Uint8Array([ 184, 30, 16, 0 ]);
Object.assign(s35, {
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s23,
      },
    ],
    methods: [],
    template: {
      memory: { array: a29 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a30 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a31 },
              address: 1056440,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a32 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a31 },
              address: 1056440,
            },
          },
        },
      },
    },
  },
  slot: 122,
});
Object.assign(s36, {
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
        structure: s35,
      },
    ],
    methods: [],
    template: null
  },
  slot: 121,
});
const a33 = new Uint8Array([  ]);
const a34 = new Uint8Array([ 152, 30, 16, 0 ]);
const a35 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a36 = new Uint8Array([ 152, 30, 16, 0 ]);
Object.assign(s37, {
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s23,
      },
    ],
    methods: [],
    template: {
      memory: { array: a33 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a34 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a35 },
              address: 1056408,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a36 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a35 },
              address: 1056408,
            },
          },
        },
      },
    },
  },
  slot: 124,
});
Object.assign(s38, {
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
        structure: s37,
      },
    ],
    methods: [],
    template: null
  },
  slot: 123,
});
Object.assign(s39, {
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
  slot: 127,
});
Object.assign(s40, {
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
        structure: s39,
      },
    ],
    methods: [],
    template: null
  },
  slot: 126,
});
Object.assign(s41, {
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
        structure: s40,
      },
    ],
    methods: [],
    template: null
  },
  slot: 125,
});
const a37 = new Uint8Array([  ]);
const a38 = new Uint8Array([ 170, 170, 170, 170 ]);
const a39 = new Uint8Array([ 170, 170, 170, 170 ]);
const a40 = new Uint8Array([ 170, 170, 170, 170 ]);
const a41 = new Uint8Array([ 252, 31, 16, 0 ]);
const a42 = new Uint8Array([ 84, 37, 16, 0 ]);
const a43 = new Uint8Array([ 70, 105, 110, 101, 32, 116, 117, 110, 101, 32, 116, 104, 101, 32, 99, 101, 110, 116, 101, 114, 32, 112, 111, 115, 105, 116, 105, 111, 110, 46, 0 ]);
Object.assign(s42, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [30:0]u8 = \"Fine tune the center position.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s38,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s29,
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
      memory: { array: a37 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a38 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s38,
          memory: { array: a39 },
          slots: {
            0: {
              structure: s37,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s29,
          memory: { array: a40 },
          slots: {
            0: {
              structure: s28,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s41,
          memory: { array: a41 },
          slots: {
            0: {
              structure: s40,
              memory: { array: a42 },
              address: 1056764,
              slots: {
                0: {
                  structure: s39,
                  memory: { array: a43 },
                  address: 1058132,
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
Object.assign(s43, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [30:0]u8 = \"Fine tune the center position.\"}",
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
  slot: 46,
});
Object.assign(s44, {
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
  slot: 130,
});
Object.assign(s45, {
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
        structure: s44,
      },
    ],
    methods: [],
    template: null
  },
  slot: 129,
});
Object.assign(s46, {
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
        structure: s45,
      },
    ],
    methods: [],
    template: null
  },
  slot: 128,
});
Object.assign(s47, {
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
  slot: 133,
});
Object.assign(s48, {
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
        structure: s47,
      },
    ],
    methods: [],
    template: null
  },
  slot: 132,
});
Object.assign(s49, {
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
        structure: s48,
      },
    ],
    methods: [],
    template: null
  },
  slot: 131,
});
Object.assign(s50, {
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
  slot: 136,
});
Object.assign(s51, {
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
        structure: s50,
      },
    ],
    methods: [],
    template: null
  },
  slot: 135,
});
Object.assign(s52, {
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
        structure: s51,
      },
    ],
    methods: [],
    template: null
  },
  slot: 134,
});
Object.assign(s53, {
  ...s,
  type: 1,
  name: "[59:0]u8",
  length: 59,
  byteSize: 60,
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
  slot: 139,
});
Object.assign(s54, {
  ...s,
  type: 11,
  name: "*const [59:0]u8",
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
  slot: 138,
});
Object.assign(s55, {
  ...s,
  type: 11,
  name: "*const *const [59:0]u8",
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
  slot: 137,
});
const a44 = new Uint8Array([  ]);
const a45 = new Uint8Array([ 104, 31, 16, 0 ]);
const a46 = new Uint8Array([ 0, 0, 0, 0 ]);
const a47 = new Uint8Array([ 208, 30, 16, 0 ]);
const a48 = new Uint8Array([ 4, 0, 0, 0 ]);
const a49 = new Uint8Array([ 104, 31, 16, 0 ]);
const a50 = new Uint8Array([ 248, 31, 16, 0 ]);
const a51 = new Uint8Array([ 34, 37, 16, 0 ]);
const a52 = new Uint8Array([ 83, 111, 109, 101, 32, 110, 105, 99, 101, 32, 97, 114, 101, 97, 115, 32, 116, 111, 32, 101, 120, 112, 108, 111, 114, 101, 32, 105, 110, 32, 116, 104, 101, 32, 77, 97, 110, 100, 101, 108, 98, 114, 111, 116, 32, 115, 101, 116, 46, 0 ]);
const a53 = new Uint8Array([ 244, 31, 16, 0 ]);
const a54 = new Uint8Array([ 9, 37, 16, 0 ]);
const a55 = new Uint8Array([ 77, 97, 110, 100, 101, 108, 98, 114, 111, 116, 32, 99, 101, 110, 116, 101, 114, 32, 112, 114, 101, 115, 101, 116, 0 ]);
const a56 = new Uint8Array([ 92, 31, 16, 0 ]);
const a57 = new Uint8Array([ 1, 37, 16, 0 ]);
const a58 = new Uint8Array([ 97, 101, 80, 111, 112, 117, 112, 0 ]);
const a59 = new Uint8Array([ 240, 31, 16, 0 ]);
const a60 = new Uint8Array([ 197, 36, 16, 0 ]);
const a61 = new Uint8Array([ 70, 114, 101, 101, 32, 99, 111, 110, 116, 114, 111, 108, 124, 83, 101, 97, 104, 111, 114, 115, 101, 32, 116, 97, 105, 108, 124, 76, 105, 103, 104, 116, 110, 105, 110, 103, 124, 83, 112, 105, 114, 97, 108, 124, 77, 105, 110, 105, 32, 77, 97, 110, 100, 101, 108, 98, 114, 111, 116, 0 ]);
Object.assign(s56, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 4, comptime defaultValue: comptime_int = 0, comptime description: *const [49:0]u8 = \"Some nice areas to explore in the Mandelbrot set.\", comptime aeDisplayName: *const [24:0]u8 = \"Mandelbrot center preset\", comptime aeUIControl: *const [7:0]u8 = \"aePopup\", comptime aePopupString: *const [59:0]u8 = \"Free control|Seahorse tail|Lightning|Spiral|Mini Mandelbrot\"}",
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
        structure: s46,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "aeDisplayName",
        structure: s49,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "aeUIControl",
        structure: s52,
      },
      {
        ...m,
        type: 8,
        slot: 6,
        name: "aePopupString",
        structure: s55,
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
              memory: { array: a46 },
              address: 1056616,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a47 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a48 },
              address: 1056464,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a49 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a46 },
              address: 1056616,
            },
          },
        },
        3: {
          structure: s46,
          memory: { array: a50 },
          slots: {
            0: {
              structure: s45,
              memory: { array: a51 },
              address: 1056760,
              slots: {
                0: {
                  structure: s44,
                  memory: { array: a52 },
                  address: 1058082,
                },
              },
            },
          },
        },
        4: {
          structure: s49,
          memory: { array: a53 },
          slots: {
            0: {
              structure: s48,
              memory: { array: a54 },
              address: 1056756,
              slots: {
                0: {
                  structure: s47,
                  memory: { array: a55 },
                  address: 1058057,
                },
              },
            },
          },
        },
        5: {
          structure: s52,
          memory: { array: a56 },
          slots: {
            0: {
              structure: s51,
              memory: { array: a57 },
              address: 1056604,
              slots: {
                0: {
                  structure: s50,
                  memory: { array: a58 },
                  address: 1058049,
                },
              },
            },
          },
        },
        6: {
          structure: s55,
          memory: { array: a59 },
          slots: {
            0: {
              structure: s54,
              memory: { array: a60 },
              address: 1056752,
              slots: {
                0: {
                  structure: s53,
                  memory: { array: a61 },
                  address: 1057989,
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
Object.assign(s57, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 4, comptime defaultValue: comptime_int = 0, comptime description: *const [49:0]u8 = \"Some nice areas to explore in the Mandelbrot set.\", comptime aeDisplayName: *const [24:0]u8 = \"Mandelbrot center preset\", comptime aeUIControl: *const [7:0]u8 = \"aePopup\", comptime aePopupString: *const [59:0]u8 = \"Free control|Seahorse tail|Lightning|Spiral|Mini Mandelbrot\"}",
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
  slot: 48,
});
Object.assign(s58, {
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
        structure: s58,
      },
    ],
    methods: [],
    template: null
  },
  slot: 31,
});
Object.assign(s59, {
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
        structure: s58,
      },
    ],
    methods: [],
    template: null
  },
  slot: 140,
});
Object.assign(s60, {
  ...s,
  type: 1,
  name: "[37:0]u8",
  length: 37,
  byteSize: 38,
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
  slot: 143,
});
Object.assign(s61, {
  ...s,
  type: 11,
  name: "*const [37:0]u8",
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
  slot: 142,
});
Object.assign(s62, {
  ...s,
  type: 11,
  name: "*const *const [37:0]u8",
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
  slot: 141,
});
const a62 = new Uint8Array([  ]);
const a63 = new Uint8Array([ 84, 31, 16, 0 ]);
const a64 = new Uint8Array([ 0 ]);
const a65 = new Uint8Array([ 236, 31, 16, 0 ]);
const a66 = new Uint8Array([ 159, 36, 16, 0 ]);
const a67 = new Uint8Array([ 85, 115, 101, 32, 116, 104, 101, 32, 115, 116, 97, 110, 100, 97, 114, 100, 32, 77, 97, 110, 100, 101, 108, 98, 114, 111, 116, 32, 101, 113, 117, 97, 116, 105, 111, 110, 46, 0 ]);
Object.assign(s63, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [37:0]u8 = \"Use the standard Mandelbrot equation.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s58,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s59,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s62,
      },
    ],
    methods: [],
    template: {
      memory: { array: a62 },
      slots: {
        0: {
          structure: s59,
          memory: { array: a63 },
          slots: {
            0: {
              structure: s58,
              memory: { array: a64 },
              address: 1056596,
            },
          },
        },
        1: {
          structure: s62,
          memory: { array: a65 },
          slots: {
            0: {
              structure: s61,
              memory: { array: a66 },
              address: 1056748,
              slots: {
                0: {
                  structure: s60,
                  memory: { array: a67 },
                  address: 1057951,
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
Object.assign(s64, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [37:0]u8 = \"Use the standard Mandelbrot equation.\"}",
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
  slot: 50,
});
Object.assign(s65, {
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
  slot: 146,
});
Object.assign(s66, {
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
        structure: s65,
      },
    ],
    methods: [],
    template: null
  },
  slot: 145,
});
Object.assign(s67, {
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
        structure: s66,
      },
    ],
    methods: [],
    template: null
  },
  slot: 144,
});
const a68 = new Uint8Array([  ]);
const a69 = new Uint8Array([ 84, 31, 16, 0 ]);
const a70 = new Uint8Array([ 232, 31, 16, 0 ]);
const a71 = new Uint8Array([ 123, 36, 16, 0 ]);
const a72 = new Uint8Array([ 73, 110, 99, 108, 117, 100, 101, 32, 122, 94, 122, 32, 105, 110, 32, 116, 104, 101, 32, 102, 114, 97, 99, 116, 97, 108, 32, 101, 113, 117, 97, 116, 105, 111, 110, 0 ]);
Object.assign(s68, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [35:0]u8 = \"Include z^z in the fractal equation\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s58,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s59,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s67,
      },
    ],
    methods: [],
    template: {
      memory: { array: a68 },
      slots: {
        0: {
          structure: s59,
          memory: { array: a69 },
          slots: {
            0: {
              structure: s58,
              memory: { array: a64 },
              address: 1056596,
            },
          },
        },
        1: {
          structure: s67,
          memory: { array: a70 },
          slots: {
            0: {
              structure: s66,
              memory: { array: a71 },
              address: 1056744,
              slots: {
                0: {
                  structure: s65,
                  memory: { array: a72 },
                  address: 1057915,
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
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [35:0]u8 = \"Include z^z in the fractal equation\"}",
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
  slot: 149,
});
Object.assign(s71, {
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
        structure: s70,
      },
    ],
    methods: [],
    template: null
  },
  slot: 148,
});
Object.assign(s72, {
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
        structure: s71,
      },
    ],
    methods: [],
    template: null
  },
  slot: 147,
});
const a73 = new Uint8Array([  ]);
const a74 = new Uint8Array([ 84, 31, 16, 0 ]);
const a75 = new Uint8Array([ 228, 31, 16, 0 ]);
const a76 = new Uint8Array([ 84, 36, 16, 0 ]);
const a77 = new Uint8Array([ 73, 110, 99, 108, 117, 100, 101, 32, 115, 105, 110, 40, 122, 41, 32, 105, 110, 32, 116, 104, 101, 32, 102, 114, 97, 99, 116, 97, 108, 32, 101, 113, 117, 97, 116, 105, 111, 110, 0 ]);
Object.assign(s73, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [38:0]u8 = \"Include sin(z) in the fractal equation\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s58,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s59,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s72,
      },
    ],
    methods: [],
    template: {
      memory: { array: a73 },
      slots: {
        0: {
          structure: s59,
          memory: { array: a74 },
          slots: {
            0: {
              structure: s58,
              memory: { array: a64 },
              address: 1056596,
            },
          },
        },
        1: {
          structure: s72,
          memory: { array: a75 },
          slots: {
            0: {
              structure: s71,
              memory: { array: a76 },
              address: 1056740,
              slots: {
                0: {
                  structure: s70,
                  memory: { array: a77 },
                  address: 1057876,
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
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [38:0]u8 = \"Include sin(z) in the fractal equation\"}",
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
  name: "[36:0]u8",
  length: 36,
  byteSize: 37,
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
  slot: 152,
});
Object.assign(s76, {
  ...s,
  type: 11,
  name: "*const [36:0]u8",
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
  slot: 151,
});
Object.assign(s77, {
  ...s,
  type: 11,
  name: "*const *const [36:0]u8",
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
  slot: 150,
});
const a78 = new Uint8Array([  ]);
const a79 = new Uint8Array([ 84, 31, 16, 0 ]);
const a80 = new Uint8Array([ 224, 31, 16, 0 ]);
const a81 = new Uint8Array([ 47, 36, 16, 0 ]);
const a82 = new Uint8Array([ 73, 110, 99, 108, 117, 100, 101, 32, 101, 40, 122, 41, 32, 105, 110, 32, 116, 104, 101, 32, 102, 114, 97, 99, 116, 97, 108, 32, 101, 113, 117, 97, 116, 105, 111, 110, 0 ]);
Object.assign(s78, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [36:0]u8 = \"Include e(z) in the fractal equation\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s58,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s59,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s77,
      },
    ],
    methods: [],
    template: {
      memory: { array: a78 },
      slots: {
        0: {
          structure: s59,
          memory: { array: a79 },
          slots: {
            0: {
              structure: s58,
              memory: { array: a64 },
              address: 1056596,
            },
          },
        },
        1: {
          structure: s77,
          memory: { array: a80 },
          slots: {
            0: {
              structure: s76,
              memory: { array: a81 },
              address: 1056736,
              slots: {
                0: {
                  structure: s75,
                  memory: { array: a82 },
                  address: 1057839,
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
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [36:0]u8 = \"Include e(z) in the fractal equation\"}",
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
const a83 = new Uint8Array([  ]);
const a84 = new Uint8Array([ 216, 31, 16, 0 ]);
const a85 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 40, 192 ]);
const a86 = new Uint8Array([ 208, 31, 16, 0 ]);
const a87 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 40, 64 ]);
const a88 = new Uint8Array([ 24, 31, 16, 0 ]);
const a89 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 8, 64 ]);
const a90 = new Uint8Array([ 200, 31, 16, 0 ]);
const a91 = new Uint8Array([ 242, 35, 16, 0 ]);
const a92 = new Uint8Array([ 82, 97, 105, 115, 101, 32, 122, 32, 116, 111, 32, 116, 104, 101, 32, 112, 111, 119, 101, 114, 32, 101, 32, 105, 110, 32, 116, 104, 101, 32, 102, 114, 97, 99, 116, 97, 108, 32, 102, 111, 114, 109, 117, 108, 97, 58, 32, 122, 39, 32, 61, 32, 122, 94, 101, 32, 43, 32, 109, 117, 0 ]);
Object.assign(s80, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -12, comptime maxValue: comptime_float = 12, comptime defaultValue: comptime_float = 3, comptime description: *const [60:0]u8 = \"Raise z to the power e in the fractal formula: z' = z^e + mu\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s20,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s23,
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s17,
      },
    ],
    methods: [],
    template: {
      memory: { array: a83 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a84 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a85 },
              address: 1056728,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a86 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a87 },
              address: 1056720,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a88 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a89 },
              address: 1056536,
            },
          },
        },
        3: {
          structure: s17,
          memory: { array: a90 },
          slots: {
            0: {
              structure: s16,
              memory: { array: a91 },
              address: 1056712,
              slots: {
                0: {
                  structure: s15,
                  memory: { array: a92 },
                  address: 1057778,
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
Object.assign(s81, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -12, comptime maxValue: comptime_float = 12, comptime defaultValue: comptime_float = 3, comptime description: *const [60:0]u8 = \"Raise z to the power e in the fractal formula: z' = z^e + mu\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s80,
      },
    ],
    methods: [],
    template: null
  },
  slot: 58,
});
Object.assign(s82, {
  ...s,
  type: 1,
  name: "[23:0]u8",
  length: 23,
  byteSize: 24,
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
Object.assign(s83, {
  ...s,
  type: 11,
  name: "*const [23:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s82,
      },
    ],
    methods: [],
    template: null
  },
  slot: 156,
});
Object.assign(s84, {
  ...s,
  type: 11,
  name: "*const *const [23:0]u8",
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
  slot: 155,
});
const a93 = new Uint8Array([  ]);
const a94 = new Uint8Array([ 192, 31, 16, 0 ]);
const a95 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 185, 191 ]);
const a96 = new Uint8Array([ 224, 30, 16, 0 ]);
const a97 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 185, 63 ]);
const a98 = new Uint8Array([ 144, 30, 16, 0 ]);
const a99 = new Uint8Array([ 184, 31, 16, 0 ]);
const a100 = new Uint8Array([ 218, 35, 16, 0 ]);
const a101 = new Uint8Array([ 70, 105, 110, 101, 32, 116, 117, 110, 101, 32, 116, 104, 101, 32, 101, 120, 112, 111, 110, 101, 110, 116, 46, 0 ]);
Object.assign(s85, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -0.1, comptime maxValue: comptime_float = 0.1, comptime defaultValue: comptime_float = 0, comptime description: *const [23:0]u8 = \"Fine tune the exponent.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s20,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s23,
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s84,
      },
    ],
    methods: [],
    template: {
      memory: { array: a93 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a94 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a95 },
              address: 1056704,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a96 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a97 },
              address: 1056480,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a98 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
        3: {
          structure: s84,
          memory: { array: a99 },
          slots: {
            0: {
              structure: s83,
              memory: { array: a100 },
              address: 1056696,
              slots: {
                0: {
                  structure: s82,
                  memory: { array: a101 },
                  address: 1057754,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 61,
});
Object.assign(s86, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -0.1, comptime maxValue: comptime_float = 0.1, comptime defaultValue: comptime_float = 0, comptime description: *const [23:0]u8 = \"Fine tune the exponent.\"}",
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
  slot: 60,
});
const a102 = new Uint8Array([  ]);
const a103 = new Uint8Array([ 176, 30, 16, 0 ]);
const a104 = new Uint8Array([ 225, 122, 20, 174, 71, 225, 218, 63 ]);
const a105 = new Uint8Array([ 144, 30, 16, 0 ]);
Object.assign(s87, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.42, comptime comptime_float = 0}",
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s23,
      },
    ],
    methods: [],
    template: {
      memory: { array: a102 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a103 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a104 },
              address: 1056432,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a105 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
      },
    },
  },
  slot: 159,
});
Object.assign(s88, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.42, comptime comptime_float = 0}",
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
  slot: 158,
});
const a106 = new Uint8Array([  ]);
const a107 = new Uint8Array([ 170, 170, 170, 170 ]);
const a108 = new Uint8Array([ 170, 170, 170, 170 ]);
const a109 = new Uint8Array([ 170, 170, 170, 170 ]);
const a110 = new Uint8Array([ 180, 31, 16, 0 ]);
const a111 = new Uint8Array([ 158, 35, 16, 0 ]);
const a112 = new Uint8Array([ 84, 104, 101, 32, 99, 111, 109, 112, 108, 101, 120, 32, 112, 97, 114, 97, 109, 101, 116, 101, 114, 32, 111, 102, 32, 116, 104, 101, 32, 102, 114, 97, 99, 116, 97, 108, 32, 102, 111, 114, 109, 117, 108, 97, 58, 32, 122, 39, 32, 61, 32, 122, 94, 101, 32, 43, 32, 109, 117, 0 ]);
Object.assign(s89, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.42, comptime comptime_float = 0} = .{0.42, 0}, comptime description: *const [59:0]u8 = \"The complex parameter of the fractal formula: z' = z^e + mu\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s38,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s88,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s55,
      },
    ],
    methods: [],
    template: {
      memory: { array: a106 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a107 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s38,
          memory: { array: a108 },
          slots: {
            0: {
              structure: s37,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s88,
          memory: { array: a109 },
          slots: {
            0: {
              structure: s87,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s55,
          memory: { array: a110 },
          slots: {
            0: {
              structure: s54,
              memory: { array: a111 },
              address: 1056692,
              slots: {
                0: {
                  structure: s53,
                  memory: { array: a112 },
                  address: 1057694,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 63,
});
Object.assign(s90, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.42, comptime comptime_float = 0} = .{0.42, 0}, comptime description: *const [59:0]u8 = \"The complex parameter of the fractal formula: z' = z^e + mu\"}",
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
  slot: 62,
});
const a113 = new Uint8Array([  ]);
const a114 = new Uint8Array([ 168, 30, 16, 0 ]);
const a115 = new Uint8Array([ 123, 20, 174, 71, 225, 122, 132, 191 ]);
const a116 = new Uint8Array([ 168, 30, 16, 0 ]);
Object.assign(s91, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -0.01, comptime comptime_float = -0.01}",
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s23,
      },
    ],
    methods: [],
    template: {
      memory: { array: a113 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a114 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a115 },
              address: 1056424,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a116 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a115 },
              address: 1056424,
            },
          },
        },
      },
    },
  },
  slot: 161,
});
Object.assign(s92, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -0.01, comptime comptime_float = -0.01}",
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
  slot: 160,
});
const a117 = new Uint8Array([  ]);
const a118 = new Uint8Array([ 160, 30, 16, 0 ]);
const a119 = new Uint8Array([ 123, 20, 174, 71, 225, 122, 132, 63 ]);
const a120 = new Uint8Array([ 160, 30, 16, 0 ]);
Object.assign(s93, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.01, comptime comptime_float = 0.01}",
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s23,
      },
    ],
    methods: [],
    template: {
      memory: { array: a117 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a118 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a119 },
              address: 1056416,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a120 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a119 },
              address: 1056416,
            },
          },
        },
      },
    },
  },
  slot: 163,
});
Object.assign(s94, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.01, comptime comptime_float = 0.01}",
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
  slot: 162,
});
Object.assign(s95, {
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
  slot: 166,
});
Object.assign(s96, {
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
        structure: s95,
      },
    ],
    methods: [],
    template: null
  },
  slot: 165,
});
Object.assign(s97, {
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
        structure: s96,
      },
    ],
    methods: [],
    template: null
  },
  slot: 164,
});
const a121 = new Uint8Array([  ]);
const a122 = new Uint8Array([ 170, 170, 170, 170 ]);
const a123 = new Uint8Array([ 170, 170, 170, 170 ]);
const a124 = new Uint8Array([ 170, 170, 170, 170 ]);
const a125 = new Uint8Array([ 176, 31, 16, 0 ]);
const a126 = new Uint8Array([ 144, 35, 16, 0 ]);
const a127 = new Uint8Array([ 70, 105, 110, 101, 32, 116, 117, 110, 101, 32, 109, 117, 46, 0 ]);
Object.assign(s98, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -0.01, comptime comptime_float = -0.01} = .{-0.01, -0.01}, comptime maxValue: struct{comptime comptime_float = 0.01, comptime comptime_float = 0.01} = .{0.01, 0.01}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [13:0]u8 = \"Fine tune mu.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s92,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s94,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s29,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s97,
      },
    ],
    methods: [],
    template: {
      memory: { array: a121 },
      slots: {
        0: {
          structure: s92,
          memory: { array: a122 },
          slots: {
            0: {
              structure: s91,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s94,
          memory: { array: a123 },
          slots: {
            0: {
              structure: s93,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s29,
          memory: { array: a124 },
          slots: {
            0: {
              structure: s28,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s97,
          memory: { array: a125 },
          slots: {
            0: {
              structure: s96,
              memory: { array: a126 },
              address: 1056688,
              slots: {
                0: {
                  structure: s95,
                  memory: { array: a127 },
                  address: 1057680,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 65,
});
Object.assign(s99, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -0.01, comptime comptime_float = -0.01} = .{-0.01, -0.01}, comptime maxValue: struct{comptime comptime_float = 0.01, comptime comptime_float = 0.01} = .{0.01, 0.01}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [13:0]u8 = \"Fine tune mu.\"}",
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
  slot: 64,
});
Object.assign(s100, {
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
  slot: 169,
});
Object.assign(s101, {
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
        structure: s100,
      },
    ],
    methods: [],
    template: null
  },
  slot: 168,
});
Object.assign(s102, {
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
        structure: s101,
      },
    ],
    methods: [],
    template: null
  },
  slot: 167,
});
const a128 = new Uint8Array([  ]);
const a129 = new Uint8Array([ 104, 31, 16, 0 ]);
const a130 = new Uint8Array([ 172, 31, 16, 0 ]);
const a131 = new Uint8Array([ 104, 31, 16, 0 ]);
const a132 = new Uint8Array([ 168, 31, 16, 0 ]);
const a133 = new Uint8Array([ 103, 35, 16, 0 ]);
const a134 = new Uint8Array([ 67, 104, 97, 110, 103, 101, 115, 32, 116, 104, 101, 32, 115, 116, 121, 108, 101, 32, 111, 102, 32, 116, 104, 101, 32, 98, 97, 105, 108, 111, 117, 116, 32, 101, 102, 102, 101, 99, 116, 46, 0 ]);
const a135 = new Uint8Array([ 164, 31, 16, 0 ]);
const a136 = new Uint8Array([ 89, 35, 16, 0 ]);
const a137 = new Uint8Array([ 66, 97, 105, 108, 111, 117, 116, 32, 115, 116, 121, 108, 101, 0 ]);
const a138 = new Uint8Array([ 92, 31, 16, 0 ]);
const a139 = new Uint8Array([ 160, 31, 16, 0 ]);
const a140 = new Uint8Array([ 62, 35, 16, 0 ]);
const a141 = new Uint8Array([ 83, 109, 111, 111, 116, 104, 124, 83, 112, 105, 107, 121, 124, 83, 116, 97, 108, 107, 115, 124, 83, 119, 105, 114, 108, 115, 0 ]);
Object.assign(s103, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 3, comptime defaultValue: comptime_int = 0, comptime description: *const [40:0]u8 = \"Changes the style of the bailout effect.\", comptime aeDisplayName: *const [13:0]u8 = \"Bailout style\", comptime aeUIControl: *const [7:0]u8 = \"aePopup\", comptime aePopupString: *const [26:0]u8 = \"Smooth|Spiky|Stalks|Swirls\"}",
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
        structure: s102,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "aeDisplayName",
        structure: s97,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "aeUIControl",
        structure: s52,
      },
      {
        ...m,
        type: 8,
        slot: 6,
        name: "aePopupString",
        structure: s32,
      },
    ],
    methods: [],
    template: {
      memory: { array: a128 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a129 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a46 },
              address: 1056616,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a130 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a4 },
              address: 1056684,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a131 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a46 },
              address: 1056616,
            },
          },
        },
        3: {
          structure: s102,
          memory: { array: a132 },
          slots: {
            0: {
              structure: s101,
              memory: { array: a133 },
              address: 1056680,
              slots: {
                0: {
                  structure: s100,
                  memory: { array: a134 },
                  address: 1057639,
                },
              },
            },
          },
        },
        4: {
          structure: s97,
          memory: { array: a135 },
          slots: {
            0: {
              structure: s96,
              memory: { array: a136 },
              address: 1056676,
              slots: {
                0: {
                  structure: s95,
                  memory: { array: a137 },
                  address: 1057625,
                },
              },
            },
          },
        },
        5: {
          structure: s52,
          memory: { array: a138 },
          slots: {
            0: {
              structure: s51,
              memory: { array: a57 },
              address: 1056604,
              slots: {
                0: {
                  structure: s50,
                  memory: { array: a58 },
                  address: 1058049,
                },
              },
            },
          },
        },
        6: {
          structure: s32,
          memory: { array: a139 },
          slots: {
            0: {
              structure: s31,
              memory: { array: a140 },
              address: 1056672,
              slots: {
                0: {
                  structure: s30,
                  memory: { array: a141 },
                  address: 1057598,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 67,
});
Object.assign(s104, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 3, comptime defaultValue: comptime_int = 0, comptime description: *const [40:0]u8 = \"Changes the style of the bailout effect.\", comptime aeDisplayName: *const [13:0]u8 = \"Bailout style\", comptime aeUIControl: *const [7:0]u8 = \"aePopup\", comptime aePopupString: *const [26:0]u8 = \"Smooth|Spiky|Stalks|Swirls\"}",
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
  slot: 66,
});
Object.assign(s105, {
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
  slot: 172,
});
Object.assign(s106, {
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
        structure: s105,
      },
    ],
    methods: [],
    template: null
  },
  slot: 171,
});
Object.assign(s107, {
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
        structure: s106,
      },
    ],
    methods: [],
    template: null
  },
  slot: 170,
});
const a142 = new Uint8Array([  ]);
const a143 = new Uint8Array([ 192, 30, 16, 0 ]);
const a144 = new Uint8Array([ 152, 31, 16, 0 ]);
const a145 = new Uint8Array([ 0, 0, 0, 0, 0, 192, 98, 64 ]);
const a146 = new Uint8Array([ 144, 31, 16, 0 ]);
const a147 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 16, 64 ]);
const a148 = new Uint8Array([ 136, 31, 16, 0 ]);
const a149 = new Uint8Array([ 43, 35, 16, 0 ]);
const a150 = new Uint8Array([ 66, 97, 105, 108, 111, 117, 116, 32, 116, 104, 114, 101, 115, 104, 111, 108, 100, 46, 0 ]);
Object.assign(s108, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 2, comptime maxValue: comptime_float = 150, comptime defaultValue: comptime_float = 4, comptime description: *const [18:0]u8 = \"Bailout threshold.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s20,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s23,
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s107,
      },
    ],
    methods: [],
    template: {
      memory: { array: a142 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a143 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a15 },
              address: 1056448,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a144 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a145 },
              address: 1056664,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a146 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a147 },
              address: 1056656,
            },
          },
        },
        3: {
          structure: s107,
          memory: { array: a148 },
          slots: {
            0: {
              structure: s106,
              memory: { array: a149 },
              address: 1056648,
              slots: {
                0: {
                  structure: s105,
                  memory: { array: a150 },
                  address: 1057579,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 69,
});
Object.assign(s109, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 2, comptime maxValue: comptime_float = 150, comptime defaultValue: comptime_float = 4, comptime description: *const [18:0]u8 = \"Bailout threshold.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s108,
      },
    ],
    methods: [],
    template: null
  },
  slot: 68,
});
Object.assign(s110, {
  ...s,
  type: 1,
  name: "[108:0]u8",
  length: 108,
  byteSize: 109,
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
  slot: 175,
});
Object.assign(s111, {
  ...s,
  type: 11,
  name: "*const [108:0]u8",
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
  slot: 174,
});
Object.assign(s112, {
  ...s,
  type: 11,
  name: "*const *const [108:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s111,
      },
    ],
    methods: [],
    template: null
  },
  slot: 173,
});
const a151 = new Uint8Array([  ]);
const a152 = new Uint8Array([ 132, 31, 16, 0 ]);
const a153 = new Uint8Array([ 128, 31, 16, 0 ]);
const a154 = new Uint8Array([ 44, 1, 0, 0 ]);
const a155 = new Uint8Array([ 124, 31, 16, 0 ]);
const a156 = new Uint8Array([ 70, 0, 0, 0 ]);
const a157 = new Uint8Array([ 120, 31, 16, 0 ]);
const a158 = new Uint8Array([ 190, 34, 16, 0 ]);
const a159 = new Uint8Array([ 84, 104, 101, 32, 109, 97, 120, 105, 109, 117, 109, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 105, 116, 101, 114, 97, 116, 105, 111, 110, 115, 32, 102, 111, 114, 32, 101, 97, 99, 104, 32, 112, 105, 120, 101, 108, 32, 98, 101, 102, 111, 114, 101, 32, 98, 97, 105, 108, 111, 117, 116, 46, 32, 85, 115, 101, 32, 116, 111, 32, 105, 110, 99, 114, 101, 97, 115, 101, 32, 100, 101, 116, 97, 105, 108, 32, 97, 116, 32, 116, 104, 101, 32, 102, 114, 97, 99, 116, 97, 108, 32, 101, 100, 103, 101, 115, 46, 0 ]);
Object.assign(s113, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 300, comptime defaultValue: comptime_int = 70, comptime description: *const [108:0]u8 = \"The maximum number of iterations for each pixel before bailout. Use to increase detail at the fractal edges.\"}",
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
        structure: s112,
      },
    ],
    methods: [],
    template: {
      memory: { array: a151 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a152 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a2 },
              address: 1056644,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a153 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a154 },
              address: 1056640,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a155 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a156 },
              address: 1056636,
            },
          },
        },
        3: {
          structure: s112,
          memory: { array: a157 },
          slots: {
            0: {
              structure: s111,
              memory: { array: a158 },
              address: 1056632,
              slots: {
                0: {
                  structure: s110,
                  memory: { array: a159 },
                  address: 1057470,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 71,
});
Object.assign(s114, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 300, comptime defaultValue: comptime_int = 70, comptime description: *const [108:0]u8 = \"The maximum number of iterations for each pixel before bailout. Use to increase detail at the fractal edges.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s113,
      },
    ],
    methods: [],
    template: null
  },
  slot: 70,
});
Object.assign(s115, {
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
  slot: 178,
});
Object.assign(s116, {
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
        structure: s115,
      },
    ],
    methods: [],
    template: null
  },
  slot: 177,
});
Object.assign(s117, {
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
        structure: s116,
      },
    ],
    methods: [],
    template: null
  },
  slot: 176,
});
const a160 = new Uint8Array([  ]);
const a161 = new Uint8Array([ 104, 31, 16, 0 ]);
const a162 = new Uint8Array([ 116, 31, 16, 0 ]);
const a163 = new Uint8Array([ 150, 0, 0, 0 ]);
const a164 = new Uint8Array([ 104, 31, 16, 0 ]);
const a165 = new Uint8Array([ 112, 31, 16, 0 ]);
const a166 = new Uint8Array([ 150, 34, 16, 0 ]);
const a167 = new Uint8Array([ 79, 102, 102, 115, 101, 116, 32, 116, 104, 101, 32, 115, 116, 97, 114, 116, 32, 111, 102, 32, 116, 104, 101, 32, 105, 116, 101, 114, 97, 116, 105, 111, 110, 32, 99, 111, 117, 110, 116, 0 ]);
Object.assign(s118, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 150, comptime defaultValue: comptime_int = 0, comptime description: *const [39:0]u8 = \"Offset the start of the iteration count\"}",
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
        structure: s117,
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
              memory: { array: a46 },
              address: 1056616,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a162 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a163 },
              address: 1056628,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a164 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a46 },
              address: 1056616,
            },
          },
        },
        3: {
          structure: s117,
          memory: { array: a165 },
          slots: {
            0: {
              structure: s116,
              memory: { array: a166 },
              address: 1056624,
              slots: {
                0: {
                  structure: s115,
                  memory: { array: a167 },
                  address: 1057430,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 73,
});
Object.assign(s119, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 150, comptime defaultValue: comptime_int = 0, comptime description: *const [39:0]u8 = \"Offset the start of the iteration count\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s118,
      },
    ],
    methods: [],
    template: null
  },
  slot: 72,
});
Object.assign(s120, {
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
  slot: 181,
});
Object.assign(s121, {
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
        structure: s120,
      },
    ],
    methods: [],
    template: null
  },
  slot: 180,
});
Object.assign(s122, {
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
        structure: s121,
      },
    ],
    methods: [],
    template: null
  },
  slot: 179,
});
Object.assign(s123, {
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
  slot: 184,
});
Object.assign(s124, {
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
        structure: s123,
      },
    ],
    methods: [],
    template: null
  },
  slot: 183,
});
Object.assign(s125, {
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
        structure: s124,
      },
    ],
    methods: [],
    template: null
  },
  slot: 182,
});
Object.assign(s126, {
  ...s,
  type: 1,
  name: "[76:0]u8",
  length: 76,
  byteSize: 77,
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
  slot: 187,
});
Object.assign(s127, {
  ...s,
  type: 11,
  name: "*const [76:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s126,
      },
    ],
    methods: [],
    template: null
  },
  slot: 186,
});
Object.assign(s128, {
  ...s,
  type: 11,
  name: "*const *const [76:0]u8",
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
  slot: 185,
});
const a168 = new Uint8Array([  ]);
const a169 = new Uint8Array([ 104, 31, 16, 0 ]);
const a170 = new Uint8Array([ 108, 31, 16, 0 ]);
const a171 = new Uint8Array([ 5, 0, 0, 0 ]);
const a172 = new Uint8Array([ 104, 31, 16, 0 ]);
const a173 = new Uint8Array([ 100, 31, 16, 0 ]);
const a174 = new Uint8Array([ 124, 34, 16, 0 ]);
const a175 = new Uint8Array([ 68, 105, 102, 102, 101, 114, 101, 110, 116, 32, 99, 111, 108, 111, 117, 114, 105, 110, 103, 32, 109, 111, 100, 101, 115, 0 ]);
const a176 = new Uint8Array([ 96, 31, 16, 0 ]);
const a177 = new Uint8Array([ 109, 34, 16, 0 ]);
const a178 = new Uint8Array([ 67, 111, 108, 111, 117, 114, 105, 110, 103, 32, 109, 111, 100, 101, 0 ]);
const a179 = new Uint8Array([ 92, 31, 16, 0 ]);
const a180 = new Uint8Array([ 88, 31, 16, 0 ]);
const a181 = new Uint8Array([ 32, 34, 16, 0 ]);
const a182 = new Uint8Array([ 83, 109, 111, 111, 116, 104, 124, 83, 104, 101, 108, 102, 32, 98, 97, 110, 100, 105, 110, 103, 124, 83, 111, 108, 105, 100, 32, 98, 97, 110, 100, 105, 110, 103, 124, 66, 105, 110, 97, 114, 121, 32, 100, 101, 99, 111, 110, 118, 111, 108, 117, 116, 105, 111, 110, 124, 67, 111, 110, 116, 111, 117, 114, 32, 98, 97, 110, 100, 115, 124, 83, 112, 105, 107, 101, 115, 0 ]);
Object.assign(s129, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 5, comptime defaultValue: comptime_int = 0, comptime description: *const [25:0]u8 = \"Different colouring modes\", comptime aeDisplayName: *const [14:0]u8 = \"Colouring mode\", comptime aeUIControl: *const [7:0]u8 = \"aePopup\", comptime aePopupString: *const [76:0]u8 = \"Smooth|Shelf banding|Solid banding|Binary deconvolution|Contour bands|Spikes\"}",
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
        structure: s122,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "aeDisplayName",
        structure: s125,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "aeUIControl",
        structure: s52,
      },
      {
        ...m,
        type: 8,
        slot: 6,
        name: "aePopupString",
        structure: s128,
      },
    ],
    methods: [],
    template: {
      memory: { array: a168 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a169 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a46 },
              address: 1056616,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a170 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a171 },
              address: 1056620,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a172 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a46 },
              address: 1056616,
            },
          },
        },
        3: {
          structure: s122,
          memory: { array: a173 },
          slots: {
            0: {
              structure: s121,
              memory: { array: a174 },
              address: 1056612,
              slots: {
                0: {
                  structure: s120,
                  memory: { array: a175 },
                  address: 1057404,
                },
              },
            },
          },
        },
        4: {
          structure: s125,
          memory: { array: a176 },
          slots: {
            0: {
              structure: s124,
              memory: { array: a177 },
              address: 1056608,
              slots: {
                0: {
                  structure: s123,
                  memory: { array: a178 },
                  address: 1057389,
                },
              },
            },
          },
        },
        5: {
          structure: s52,
          memory: { array: a179 },
          slots: {
            0: {
              structure: s51,
              memory: { array: a57 },
              address: 1056604,
              slots: {
                0: {
                  structure: s50,
                  memory: { array: a58 },
                  address: 1058049,
                },
              },
            },
          },
        },
        6: {
          structure: s128,
          memory: { array: a180 },
          slots: {
            0: {
              structure: s127,
              memory: { array: a181 },
              address: 1056600,
              slots: {
                0: {
                  structure: s126,
                  memory: { array: a182 },
                  address: 1057312,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 75,
});
Object.assign(s130, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 5, comptime defaultValue: comptime_int = 0, comptime description: *const [25:0]u8 = \"Different colouring modes\", comptime aeDisplayName: *const [14:0]u8 = \"Colouring mode\", comptime aeUIControl: *const [7:0]u8 = \"aePopup\", comptime aePopupString: *const [76:0]u8 = \"Smooth|Shelf banding|Solid banding|Binary deconvolution|Contour bands|Spikes\"}",
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
  slot: 74,
});
Object.assign(s131, {
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
  slot: 190,
});
Object.assign(s132, {
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
        structure: s131,
      },
    ],
    methods: [],
    template: null
  },
  slot: 189,
});
Object.assign(s133, {
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
        structure: s132,
      },
    ],
    methods: [],
    template: null
  },
  slot: 188,
});
const a183 = new Uint8Array([  ]);
const a184 = new Uint8Array([ 84, 31, 16, 0 ]);
const a185 = new Uint8Array([ 80, 31, 16, 0 ]);
const a186 = new Uint8Array([ 245, 33, 16, 0 ]);
const a187 = new Uint8Array([ 85, 115, 101, 32, 104, 117, 101, 44, 32, 115, 97, 116, 117, 114, 97, 116, 105, 111, 110, 44, 32, 98, 114, 105, 103, 104, 116, 110, 101, 115, 115, 32, 99, 111, 108, 111, 117, 114, 105, 110, 103, 46, 0 ]);
Object.assign(s134, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [42:0]u8 = \"Use hue, saturation, brightness colouring.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s58,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s59,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s133,
      },
    ],
    methods: [],
    template: {
      memory: { array: a183 },
      slots: {
        0: {
          structure: s59,
          memory: { array: a184 },
          slots: {
            0: {
              structure: s58,
              memory: { array: a64 },
              address: 1056596,
            },
          },
        },
        1: {
          structure: s133,
          memory: { array: a185 },
          slots: {
            0: {
              structure: s132,
              memory: { array: a186 },
              address: 1056592,
              slots: {
                0: {
                  structure: s131,
                  memory: { array: a187 },
                  address: 1057269,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 77,
});
Object.assign(s135, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [42:0]u8 = \"Use hue, saturation, brightness colouring.\"}",
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
  slot: 76,
});
Object.assign(s136, {
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
        structure: s20,
      },
    ],
    methods: [],
    template: null
  },
  slot: 36,
});
const a188 = new Uint8Array([  ]);
const a189 = new Uint8Array([ 144, 30, 16, 0 ]);
const a190 = new Uint8Array([ 144, 30, 16, 0 ]);
const a191 = new Uint8Array([ 144, 30, 16, 0 ]);
Object.assign(s137, {
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s23,
      },
    ],
    methods: [],
    template: {
      memory: { array: a188 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a189 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a190 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a191 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
      },
    },
  },
  slot: 192,
});
Object.assign(s138, {
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
        structure: s137,
      },
    ],
    methods: [],
    template: null
  },
  slot: 191,
});
const a192 = new Uint8Array([  ]);
const a193 = new Uint8Array([ 152, 30, 16, 0 ]);
const a194 = new Uint8Array([ 152, 30, 16, 0 ]);
const a195 = new Uint8Array([ 152, 30, 16, 0 ]);
Object.assign(s139, {
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s23,
      },
    ],
    methods: [],
    template: {
      memory: { array: a192 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a193 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a35 },
              address: 1056408,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a194 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a35 },
              address: 1056408,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a195 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a35 },
              address: 1056408,
            },
          },
        },
      },
    },
  },
  slot: 194,
});
Object.assign(s140, {
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
        structure: s139,
      },
    ],
    methods: [],
    template: null
  },
  slot: 193,
});
Object.assign(s141, {
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
  slot: 197,
});
Object.assign(s142, {
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
        structure: s141,
      },
    ],
    methods: [],
    template: null
  },
  slot: 196,
});
Object.assign(s143, {
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
        structure: s142,
      },
    ],
    methods: [],
    template: null
  },
  slot: 195,
});
const a196 = new Uint8Array([  ]);
const a197 = new Uint8Array([ 170, 170, 170, 170 ]);
const a198 = new Uint8Array([ 170, 170, 170, 170 ]);
const a199 = new Uint8Array([ 170, 170, 170, 170 ]);
const a200 = new Uint8Array([ 76, 31, 16, 0 ]);
const a201 = new Uint8Array([ 227, 33, 16, 0 ]);
const a202 = new Uint8Array([ 84, 104, 101, 32, 111, 117, 116, 101, 114, 32, 99, 111, 108, 111, 117, 114, 46, 0 ]);
const a203 = new Uint8Array([ 64, 31, 16, 0 ]);
const a204 = new Uint8Array([ 219, 33, 16, 0 ]);
const a205 = new Uint8Array([ 97, 101, 67, 111, 108, 111, 114, 0 ]);
Object.assign(s144, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime description: *const [17:0]u8 = \"The outer colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s136,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s138,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s140,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s140,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s143,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "aeUIControl",
        structure: s52,
      },
    ],
    methods: [],
    template: {
      memory: { array: a196 },
      slots: {
        0: {
          structure: s138,
          memory: { array: a197 },
          slots: {
            0: {
              structure: s137,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s140,
          memory: { array: a198 },
          slots: {
            0: {
              structure: s139,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s140,
          memory: { array: a199 },
          slots: {
            0: {
              structure: s139,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s143,
          memory: { array: a200 },
          slots: {
            0: {
              structure: s142,
              memory: { array: a201 },
              address: 1056588,
              slots: {
                0: {
                  structure: s141,
                  memory: { array: a202 },
                  address: 1057251,
                },
              },
            },
          },
        },
        4: {
          structure: s52,
          memory: { array: a203 },
          slots: {
            0: {
              structure: s51,
              memory: { array: a204 },
              address: 1056576,
              slots: {
                0: {
                  structure: s50,
                  memory: { array: a205 },
                  address: 1057243,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 79,
});
Object.assign(s145, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime description: *const [17:0]u8 = \"The outer colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s144,
      },
    ],
    methods: [],
    template: null
  },
  slot: 78,
});
const a206 = new Uint8Array([  ]);
const a207 = new Uint8Array([ 144, 30, 16, 0 ]);
const a208 = new Uint8Array([ 136, 30, 16, 0 ]);
const a209 = new Uint8Array([ 236, 81, 184, 30, 133, 235, 209, 63 ]);
const a210 = new Uint8Array([ 128, 30, 16, 0 ]);
const a211 = new Uint8Array([ 113, 61, 10, 215, 163, 112, 221, 63 ]);
Object.assign(s146, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0, comptime comptime_float = 0.28, comptime comptime_float = 0.46}",
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s23,
      },
    ],
    methods: [],
    template: {
      memory: { array: a206 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a207 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a208 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a209 },
              address: 1056392,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a210 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a211 },
              address: 1056384,
            },
          },
        },
      },
    },
  },
  slot: 199,
});
Object.assign(s147, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0, comptime comptime_float = 0.28, comptime comptime_float = 0.46}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s146,
      },
    ],
    methods: [],
    template: null
  },
  slot: 198,
});
const a212 = new Uint8Array([  ]);
const a213 = new Uint8Array([ 170, 170, 170, 170 ]);
const a214 = new Uint8Array([ 170, 170, 170, 170 ]);
const a215 = new Uint8Array([ 170, 170, 170, 170 ]);
const a216 = new Uint8Array([ 72, 31, 16, 0 ]);
const a217 = new Uint8Array([ 201, 33, 16, 0 ]);
const a218 = new Uint8Array([ 84, 104, 101, 32, 105, 110, 110, 101, 114, 32, 99, 111, 108, 111, 117, 114, 46, 0 ]);
const a219 = new Uint8Array([ 64, 31, 16, 0 ]);
Object.assign(s148, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0.28, comptime comptime_float = 0.46} = .{0, 0.28, 0.46}, comptime description: *const [17:0]u8 = \"The inner colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s136,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s138,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s140,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s147,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s143,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "aeUIControl",
        structure: s52,
      },
    ],
    methods: [],
    template: {
      memory: { array: a212 },
      slots: {
        0: {
          structure: s138,
          memory: { array: a213 },
          slots: {
            0: {
              structure: s137,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s140,
          memory: { array: a214 },
          slots: {
            0: {
              structure: s139,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s147,
          memory: { array: a215 },
          slots: {
            0: {
              structure: s146,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s143,
          memory: { array: a216 },
          slots: {
            0: {
              structure: s142,
              memory: { array: a217 },
              address: 1056584,
              slots: {
                0: {
                  structure: s141,
                  memory: { array: a218 },
                  address: 1057225,
                },
              },
            },
          },
        },
        4: {
          structure: s52,
          memory: { array: a219 },
          slots: {
            0: {
              structure: s51,
              memory: { array: a204 },
              address: 1056576,
              slots: {
                0: {
                  structure: s50,
                  memory: { array: a205 },
                  address: 1057243,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 81,
});
Object.assign(s149, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0.28, comptime comptime_float = 0.46} = .{0, 0.28, 0.46}, comptime description: *const [17:0]u8 = \"The inner colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s148,
      },
    ],
    methods: [],
    template: null
  },
  slot: 80,
});
Object.assign(s150, {
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
  slot: 202,
});
Object.assign(s151, {
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
        structure: s150,
      },
    ],
    methods: [],
    template: null
  },
  slot: 201,
});
Object.assign(s152, {
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
        structure: s151,
      },
    ],
    methods: [],
    template: null
  },
  slot: 200,
});
const a220 = new Uint8Array([  ]);
const a221 = new Uint8Array([ 170, 170, 170, 170 ]);
const a222 = new Uint8Array([ 170, 170, 170, 170 ]);
const a223 = new Uint8Array([ 170, 170, 170, 170 ]);
const a224 = new Uint8Array([ 68, 31, 16, 0 ]);
const a225 = new Uint8Array([ 178, 33, 16, 0 ]);
const a226 = new Uint8Array([ 84, 104, 101, 32, 98, 97, 99, 107, 103, 114, 111, 117, 110, 100, 32, 99, 111, 108, 111, 117, 114, 46, 0 ]);
const a227 = new Uint8Array([ 64, 31, 16, 0 ]);
Object.assign(s153, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime description: *const [22:0]u8 = \"The background colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s136,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s138,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s140,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s138,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s152,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "aeUIControl",
        structure: s52,
      },
    ],
    methods: [],
    template: {
      memory: { array: a220 },
      slots: {
        0: {
          structure: s138,
          memory: { array: a221 },
          slots: {
            0: {
              structure: s137,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s140,
          memory: { array: a222 },
          slots: {
            0: {
              structure: s139,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s138,
          memory: { array: a223 },
          slots: {
            0: {
              structure: s137,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s152,
          memory: { array: a224 },
          slots: {
            0: {
              structure: s151,
              memory: { array: a225 },
              address: 1056580,
              slots: {
                0: {
                  structure: s150,
                  memory: { array: a226 },
                  address: 1057202,
                },
              },
            },
          },
        },
        4: {
          structure: s52,
          memory: { array: a227 },
          slots: {
            0: {
              structure: s51,
              memory: { array: a204 },
              address: 1056576,
              slots: {
                0: {
                  structure: s50,
                  memory: { array: a205 },
                  address: 1057243,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 83,
});
Object.assign(s154, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime description: *const [22:0]u8 = \"The background colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s153,
      },
    ],
    methods: [],
    template: null
  },
  slot: 82,
});
Object.assign(s155, {
  ...s,
  type: 1,
  name: "[48:0]u8",
  length: 48,
  byteSize: 49,
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
  slot: 205,
});
Object.assign(s156, {
  ...s,
  type: 11,
  name: "*const [48:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s155,
      },
    ],
    methods: [],
    template: null
  },
  slot: 204,
});
Object.assign(s157, {
  ...s,
  type: 11,
  name: "*const *const [48:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s156,
      },
    ],
    methods: [],
    template: null
  },
  slot: 203,
});
const a228 = new Uint8Array([  ]);
const a229 = new Uint8Array([ 152, 30, 16, 0 ]);
const a230 = new Uint8Array([ 56, 31, 16, 0 ]);
const a231 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 36, 64 ]);
const a232 = new Uint8Array([ 152, 30, 16, 0 ]);
const a233 = new Uint8Array([ 52, 31, 16, 0 ]);
const a234 = new Uint8Array([ 129, 33, 16, 0 ]);
const a235 = new Uint8Array([ 84, 104, 101, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 116, 105, 109, 101, 115, 32, 116, 104, 101, 32, 99, 111, 108, 111, 117, 114, 32, 103, 114, 97, 100, 105, 101, 110, 116, 32, 114, 101, 112, 101, 97, 116, 115, 46, 0 ]);
Object.assign(s158, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime description: *const [48:0]u8 = \"The number of times the colour gradient repeats.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s20,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s23,
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s157,
      },
    ],
    methods: [],
    template: {
      memory: { array: a228 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a229 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a35 },
              address: 1056408,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a230 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a231 },
              address: 1056568,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a232 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a35 },
              address: 1056408,
            },
          },
        },
        3: {
          structure: s157,
          memory: { array: a233 },
          slots: {
            0: {
              structure: s156,
              memory: { array: a234 },
              address: 1056564,
              slots: {
                0: {
                  structure: s155,
                  memory: { array: a235 },
                  address: 1057153,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 85,
});
Object.assign(s159, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime description: *const [48:0]u8 = \"The number of times the colour gradient repeats.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s158,
      },
    ],
    methods: [],
    template: null
  },
  slot: 84,
});
const a236 = new Uint8Array([  ]);
const a237 = new Uint8Array([ 144, 30, 16, 0 ]);
const a238 = new Uint8Array([ 152, 30, 16, 0 ]);
const a239 = new Uint8Array([ 144, 30, 16, 0 ]);
const a240 = new Uint8Array([ 48, 31, 16, 0 ]);
const a241 = new Uint8Array([ 103, 33, 16, 0 ]);
const a242 = new Uint8Array([ 83, 104, 105, 102, 116, 32, 116, 104, 101, 32, 99, 111, 108, 111, 117, 114, 32, 109, 97, 112, 112, 105, 110, 103, 46, 0 ]);
Object.assign(s160, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [25:0]u8 = \"Shift the colour mapping.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s20,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s23,
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s122,
      },
    ],
    methods: [],
    template: {
      memory: { array: a236 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a237 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a238 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a35 },
              address: 1056408,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a239 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
        3: {
          structure: s122,
          memory: { array: a240 },
          slots: {
            0: {
              structure: s121,
              memory: { array: a241 },
              address: 1056560,
              slots: {
                0: {
                  structure: s120,
                  memory: { array: a242 },
                  address: 1057127,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 87,
});
Object.assign(s161, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [25:0]u8 = \"Shift the colour mapping.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s160,
      },
    ],
    methods: [],
    template: null
  },
  slot: 86,
});
const a243 = new Uint8Array([  ]);
const a244 = new Uint8Array([ 44, 31, 16, 0 ]);
const a245 = new Uint8Array([ 1 ]);
const a246 = new Uint8Array([ 40, 31, 16, 0 ]);
const a247 = new Uint8Array([ 54, 33, 16, 0 ]);
const a248 = new Uint8Array([ 82, 101, 102, 108, 101, 99, 116, 32, 116, 104, 101, 32, 99, 111, 108, 111, 117, 114, 32, 103, 114, 97, 100, 105, 101, 110, 116, 32, 111, 114, 32, 117, 115, 101, 32, 97, 98, 114, 117, 112, 116, 32, 115, 116, 101, 112, 115, 46, 0 ]);
Object.assign(s162, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [48:0]u8 = \"Reflect the colour gradient or use abrupt steps.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s58,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "defaultValue",
        structure: s59,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s157,
      },
    ],
    methods: [],
    template: {
      memory: { array: a243 },
      slots: {
        0: {
          structure: s59,
          memory: { array: a244 },
          slots: {
            0: {
              structure: s58,
              memory: { array: a245 },
              address: 1056556,
            },
          },
        },
        1: {
          structure: s157,
          memory: { array: a246 },
          slots: {
            0: {
              structure: s156,
              memory: { array: a247 },
              address: 1056552,
              slots: {
                0: {
                  structure: s155,
                  memory: { array: a248 },
                  address: 1057078,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 89,
});
Object.assign(s163, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [48:0]u8 = \"Reflect the colour gradient or use abrupt steps.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s162,
      },
    ],
    methods: [],
    template: null
  },
  slot: 88,
});
Object.assign(s164, {
  ...s,
  type: 1,
  name: "[43:0]u8",
  length: 43,
  byteSize: 44,
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
  slot: 208,
});
Object.assign(s165, {
  ...s,
  type: 11,
  name: "*const [43:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s164,
      },
    ],
    methods: [],
    template: null
  },
  slot: 207,
});
Object.assign(s166, {
  ...s,
  type: 11,
  name: "*const *const [43:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s165,
      },
    ],
    methods: [],
    template: null
  },
  slot: 206,
});
const a249 = new Uint8Array([  ]);
const a250 = new Uint8Array([ 152, 30, 16, 0 ]);
const a251 = new Uint8Array([ 32, 31, 16, 0 ]);
const a252 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 52, 64 ]);
const a253 = new Uint8Array([ 24, 31, 16, 0 ]);
const a254 = new Uint8Array([ 16, 31, 16, 0 ]);
const a255 = new Uint8Array([ 10, 33, 16, 0 ]);
const a256 = new Uint8Array([ 68, 101, 116, 101, 114, 109, 105, 110, 101, 115, 32, 116, 104, 101, 32, 109, 97, 112, 112, 105, 110, 103, 32, 115, 99, 97, 108, 101, 32, 111, 102, 32, 116, 104, 101, 32, 99, 111, 108, 111, 117, 114, 46, 0 ]);
Object.assign(s167, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 20, comptime defaultValue: comptime_float = 3, comptime description: *const [43:0]u8 = \"Determines the mapping scale of the colour.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s20,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s23,
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s166,
      },
    ],
    methods: [],
    template: {
      memory: { array: a249 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a250 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a35 },
              address: 1056408,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a251 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a252 },
              address: 1056544,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a253 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a89 },
              address: 1056536,
            },
          },
        },
        3: {
          structure: s166,
          memory: { array: a254 },
          slots: {
            0: {
              structure: s165,
              memory: { array: a255 },
              address: 1056528,
              slots: {
                0: {
                  structure: s164,
                  memory: { array: a256 },
                  address: 1057034,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 91,
});
Object.assign(s168, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 20, comptime defaultValue: comptime_float = 3, comptime description: *const [43:0]u8 = \"Determines the mapping scale of the colour.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s167,
      },
    ],
    methods: [],
    template: null
  },
  slot: 90,
});
Object.assign(s169, {
  ...s,
  type: 1,
  name: "[88:0]u8",
  length: 88,
  byteSize: 89,
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
  slot: 211,
});
Object.assign(s170, {
  ...s,
  type: 11,
  name: "*const [88:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s169,
      },
    ],
    methods: [],
    template: null
  },
  slot: 210,
});
Object.assign(s171, {
  ...s,
  type: 11,
  name: "*const *const [88:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s170,
      },
    ],
    methods: [],
    template: null
  },
  slot: 209,
});
const a257 = new Uint8Array([  ]);
const a258 = new Uint8Array([ 170, 170, 170, 170 ]);
const a259 = new Uint8Array([ 170, 170, 170, 170 ]);
const a260 = new Uint8Array([ 170, 170, 170, 170 ]);
const a261 = new Uint8Array([ 12, 31, 16, 0 ]);
const a262 = new Uint8Array([ 177, 32, 16, 0 ]);
const a263 = new Uint8Array([ 83, 101, 112, 97, 114, 97, 116, 101, 32, 97, 108, 112, 104, 97, 32, 99, 111, 110, 116, 114, 111, 108, 115, 32, 102, 111, 114, 32, 99, 111, 108, 111, 114, 49, 44, 32, 99, 111, 108, 111, 114, 50, 32, 97, 110, 100, 32, 99, 111, 108, 111, 114, 66, 97, 99, 107, 103, 114, 111, 117, 110, 100, 32, 102, 111, 114, 32, 65, 102, 116, 101, 114, 69, 102, 102, 101, 99, 116, 115, 32, 115, 117, 112, 112, 111, 114, 116, 46, 0 ]);
Object.assign(s172, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime description: *const [88:0]u8 = \"Separate alpha controls for color1, color2 and colorBackground for AfterEffects support.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s136,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s138,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s140,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s140,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s171,
      },
    ],
    methods: [],
    template: {
      memory: { array: a257 },
      slots: {
        0: {
          structure: s138,
          memory: { array: a258 },
          slots: {
            0: {
              structure: s137,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s140,
          memory: { array: a259 },
          slots: {
            0: {
              structure: s139,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s140,
          memory: { array: a260 },
          slots: {
            0: {
              structure: s139,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s171,
          memory: { array: a261 },
          slots: {
            0: {
              structure: s170,
              memory: { array: a262 },
              address: 1056524,
              slots: {
                0: {
                  structure: s169,
                  memory: { array: a263 },
                  address: 1056945,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 93,
});
Object.assign(s173, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime description: *const [88:0]u8 = \"Separate alpha controls for color1, color2 and colorBackground for AfterEffects support.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s172,
      },
    ],
    methods: [],
    template: null
  },
  slot: 92,
});
Object.assign(s174, {
  ...s,
  type: 1,
  name: "[80:0]u8",
  length: 80,
  byteSize: 81,
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
  slot: 214,
});
Object.assign(s175, {
  ...s,
  type: 11,
  name: "*const [80:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s174,
      },
    ],
    methods: [],
    template: null
  },
  slot: 213,
});
Object.assign(s176, {
  ...s,
  type: 11,
  name: "*const *const [80:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s175,
      },
    ],
    methods: [],
    template: null
  },
  slot: 212,
});
const a264 = new Uint8Array([  ]);
const a265 = new Uint8Array([ 144, 30, 16, 0 ]);
const a266 = new Uint8Array([ 152, 30, 16, 0 ]);
const a267 = new Uint8Array([ 144, 30, 16, 0 ]);
const a268 = new Uint8Array([ 8, 31, 16, 0 ]);
const a269 = new Uint8Array([ 96, 32, 16, 0 ]);
const a270 = new Uint8Array([ 65, 100, 100, 32, 116, 104, 101, 32, 105, 108, 108, 117, 115, 105, 111, 110, 32, 111, 102, 32, 100, 101, 112, 116, 104, 32, 98, 121, 32, 98, 108, 101, 110, 100, 105, 110, 103, 32, 115, 117, 98, 115, 101, 113, 117, 101, 110, 116, 32, 105, 116, 101, 114, 97, 116, 105, 111, 110, 115, 32, 105, 110, 116, 111, 32, 116, 104, 101, 32, 98, 97, 99, 107, 103, 114, 111, 117, 110, 100, 46, 0 ]);
Object.assign(s177, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [80:0]u8 = \"Add the illusion of depth by blending subsequent iterations into the background.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s20,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s23,
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s176,
      },
    ],
    methods: [],
    template: {
      memory: { array: a264 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a265 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a266 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a35 },
              address: 1056408,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a267 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
        3: {
          structure: s176,
          memory: { array: a268 },
          slots: {
            0: {
              structure: s175,
              memory: { array: a269 },
              address: 1056520,
              slots: {
                0: {
                  structure: s174,
                  memory: { array: a270 },
                  address: 1056864,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 95,
});
Object.assign(s178, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [80:0]u8 = \"Add the illusion of depth by blending subsequent iterations into the background.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s177,
      },
    ],
    methods: [],
    template: null
  },
  slot: 94,
});
const a271 = new Uint8Array([  ]);
const a272 = new Uint8Array([ 0, 31, 16, 0 ]);
const a273 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 102, 192 ]);
const a274 = new Uint8Array([ 248, 30, 16, 0 ]);
const a275 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 102, 64 ]);
const a276 = new Uint8Array([ 144, 30, 16, 0 ]);
const a277 = new Uint8Array([ 244, 30, 16, 0 ]);
const a278 = new Uint8Array([ 76, 32, 16, 0 ]);
const a279 = new Uint8Array([ 82, 111, 116, 97, 116, 101, 32, 116, 104, 101, 32, 102, 114, 97, 99, 116, 97, 108, 46, 0 ]);
Object.assign(s179, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -180, comptime maxValue: comptime_float = 180, comptime defaultValue: comptime_float = 0, comptime description: *const [19:0]u8 = \"Rotate the fractal.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s20,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s23,
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s3,
      },
    ],
    methods: [],
    template: {
      memory: { array: a271 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a272 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a273 },
              address: 1056512,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a274 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a275 },
              address: 1056504,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a276 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
        3: {
          structure: s3,
          memory: { array: a277 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a278 },
              address: 1056500,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a279 },
                  address: 1056844,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 97,
});
Object.assign(s180, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -180, comptime maxValue: comptime_float = 180, comptime defaultValue: comptime_float = 0, comptime description: *const [19:0]u8 = \"Rotate the fractal.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s179,
      },
    ],
    methods: [],
    template: null
  },
  slot: 96,
});
Object.assign(s181, {
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
  slot: 37,
});
const a280 = new Uint8Array([  ]);
const a281 = new Uint8Array([ 120, 30, 16, 0 ]);
const a282 = new Uint8Array([ 100, 0, 0, 0 ]);
const a283 = new Uint8Array([ 120, 30, 16, 0 ]);
Object.assign(s182, {
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
      memory: { array: a280 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a281 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a282 },
              address: 1056376,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a283 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a282 },
              address: 1056376,
            },
          },
        },
      },
    },
  },
  slot: 216,
});
Object.assign(s183, {
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
        structure: s182,
      },
    ],
    methods: [],
    template: null
  },
  slot: 215,
});
const a284 = new Uint8Array([  ]);
const a285 = new Uint8Array([ 116, 30, 16, 0 ]);
const a286 = new Uint8Array([ 0, 16, 0, 0 ]);
const a287 = new Uint8Array([ 116, 30, 16, 0 ]);
Object.assign(s184, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_int = 4096, comptime comptime_int = 4096}",
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
      memory: { array: a284 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a285 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a286 },
              address: 1056372,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a287 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a286 },
              address: 1056372,
            },
          },
        },
      },
    },
  },
  slot: 218,
});
Object.assign(s185, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_int = 4096, comptime comptime_int = 4096}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s184,
      },
    ],
    methods: [],
    template: null
  },
  slot: 217,
});
const a288 = new Uint8Array([  ]);
const a289 = new Uint8Array([ 112, 30, 16, 0 ]);
const a290 = new Uint8Array([ 0, 2, 0, 0 ]);
const a291 = new Uint8Array([ 112, 30, 16, 0 ]);
Object.assign(s186, {
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
      memory: { array: a288 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a289 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a290 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a291 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a290 },
              address: 1056368,
            },
          },
        },
      },
    },
  },
  slot: 220,
});
Object.assign(s187, {
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
        structure: s186,
      },
    ],
    methods: [],
    template: null
  },
  slot: 219,
});
Object.assign(s188, {
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
  slot: 223,
});
Object.assign(s189, {
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
        structure: s188,
      },
    ],
    methods: [],
    template: null
  },
  slot: 222,
});
Object.assign(s190, {
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
        structure: s189,
      },
    ],
    methods: [],
    template: null
  },
  slot: 221,
});
const a292 = new Uint8Array([  ]);
const a293 = new Uint8Array([ 170, 170, 170, 170 ]);
const a294 = new Uint8Array([ 170, 170, 170, 170 ]);
const a295 = new Uint8Array([ 170, 170, 170, 170 ]);
const a296 = new Uint8Array([ 240, 30, 16, 0 ]);
const a297 = new Uint8Array([ 42, 32, 16, 0 ]);
const a298 = new Uint8Array([ 84, 104, 101, 32, 115, 105, 122, 101, 32, 111, 102, 32, 116, 104, 101, 32, 114, 101, 110, 100, 101, 114, 101, 100, 32, 102, 114, 97, 99, 116, 97, 108, 46, 0 ]);
Object.assign(s191, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 4096, comptime comptime_int = 4096} = .{4096, 4096}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}, comptime description: *const [33:0]u8 = \"The size of the rendered fractal.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s181,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s183,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s185,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s187,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s190,
      },
    ],
    methods: [],
    template: {
      memory: { array: a292 },
      slots: {
        0: {
          structure: s183,
          memory: { array: a293 },
          slots: {
            0: {
              structure: s182,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s185,
          memory: { array: a294 },
          slots: {
            0: {
              structure: s184,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s187,
          memory: { array: a295 },
          slots: {
            0: {
              structure: s186,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s190,
          memory: { array: a296 },
          slots: {
            0: {
              structure: s189,
              memory: { array: a297 },
              address: 1056496,
              slots: {
                0: {
                  structure: s188,
                  memory: { array: a298 },
                  address: 1056810,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 99,
});
Object.assign(s192, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 4096, comptime comptime_int = 4096} = .{4096, 4096}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}, comptime description: *const [33:0]u8 = \"The size of the rendered fractal.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s191,
      },
    ],
    methods: [],
    template: null
  },
  slot: 98,
});
const a299 = new Uint8Array([  ]);
const a300 = new Uint8Array([ 200, 30, 16, 0 ]);
const a301 = new Uint8Array([ 232, 30, 16, 0 ]);
const a302 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 42, 64 ]);
const a303 = new Uint8Array([ 224, 30, 16, 0 ]);
const a304 = new Uint8Array([ 216, 30, 16, 0 ]);
const a305 = new Uint8Array([ 28, 32, 16, 0 ]);
const a306 = new Uint8Array([ 80, 114, 105, 109, 97, 114, 121, 32, 122, 111, 111, 109, 46, 0 ]);
Object.assign(s193, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -2, comptime maxValue: comptime_float = 13, comptime defaultValue: comptime_float = 0.1, comptime description: *const [13:0]u8 = \"Primary zoom.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s20,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s23,
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s97,
      },
    ],
    methods: [],
    template: {
      memory: { array: a299 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a300 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a11 },
              address: 1056456,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a301 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a302 },
              address: 1056488,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a303 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a97 },
              address: 1056480,
            },
          },
        },
        3: {
          structure: s97,
          memory: { array: a304 },
          slots: {
            0: {
              structure: s96,
              memory: { array: a305 },
              address: 1056472,
              slots: {
                0: {
                  structure: s95,
                  memory: { array: a306 },
                  address: 1056796,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 101,
});
Object.assign(s194, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -2, comptime maxValue: comptime_float = 13, comptime defaultValue: comptime_float = 0.1, comptime description: *const [13:0]u8 = \"Primary zoom.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s193,
      },
    ],
    methods: [],
    template: null
  },
  slot: 100,
});
const a307 = new Uint8Array([  ]);
const a308 = new Uint8Array([ 184, 30, 16, 0 ]);
const a309 = new Uint8Array([ 152, 30, 16, 0 ]);
const a310 = new Uint8Array([ 144, 30, 16, 0 ]);
const a311 = new Uint8Array([ 212, 30, 16, 0 ]);
const a312 = new Uint8Array([ 8, 32, 16, 0 ]);
const a313 = new Uint8Array([ 70, 105, 110, 101, 32, 116, 117, 110, 101, 32, 116, 104, 101, 32, 122, 111, 111, 109, 46, 0 ]);
Object.assign(s195, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -1, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [19:0]u8 = \"Fine tune the zoom.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s20,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s23,
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
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s3,
      },
    ],
    methods: [],
    template: {
      memory: { array: a307 },
      slots: {
        0: {
          structure: s23,
          memory: { array: a308 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a31 },
              address: 1056440,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a309 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a35 },
              address: 1056408,
            },
          },
        },
        2: {
          structure: s23,
          memory: { array: a310 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a19 },
              address: 1056400,
            },
          },
        },
        3: {
          structure: s3,
          memory: { array: a311 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a312 },
              address: 1056468,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a313 },
                  address: 1056776,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 103,
});
Object.assign(s196, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -1, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [19:0]u8 = \"Fine tune the zoom.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s195,
      },
    ],
    methods: [],
    template: null
  },
  slot: 102,
});
const a314 = new Uint8Array([  ]);
const a315 = new Uint8Array([ 170, 170, 170, 170 ]);
const a316 = new Uint8Array([ 170, 170, 170, 170 ]);
const a317 = new Uint8Array([ 170, 170, 170, 170 ]);
const a318 = new Uint8Array([ 170, 170, 170, 170 ]);
const a319 = new Uint8Array([ 170, 170, 170, 170 ]);
const a320 = new Uint8Array([ 170, 170, 170, 170 ]);
const a321 = new Uint8Array([ 170, 170, 170, 170 ]);
const a322 = new Uint8Array([ 170, 170, 170, 170 ]);
const a323 = new Uint8Array([ 170, 170, 170, 170 ]);
const a324 = new Uint8Array([ 170, 170, 170, 170 ]);
const a325 = new Uint8Array([ 170, 170, 170, 170 ]);
const a326 = new Uint8Array([ 170, 170, 170, 170 ]);
const a327 = new Uint8Array([ 170, 170, 170, 170 ]);
const a328 = new Uint8Array([ 170, 170, 170, 170 ]);
const a329 = new Uint8Array([ 170, 170, 170, 170 ]);
const a330 = new Uint8Array([ 170, 170, 170, 170 ]);
const a331 = new Uint8Array([ 170, 170, 170, 170 ]);
const a332 = new Uint8Array([ 170, 170, 170, 170 ]);
const a333 = new Uint8Array([ 170, 170, 170, 170 ]);
const a334 = new Uint8Array([ 170, 170, 170, 170 ]);
const a335 = new Uint8Array([ 170, 170, 170, 170 ]);
const a336 = new Uint8Array([ 170, 170, 170, 170 ]);
const a337 = new Uint8Array([ 170, 170, 170, 170 ]);
const a338 = new Uint8Array([ 170, 170, 170, 170 ]);
const a339 = new Uint8Array([ 170, 170, 170, 170 ]);
const a340 = new Uint8Array([ 170, 170, 170, 170 ]);
const a341 = new Uint8Array([ 170, 170, 170, 170 ]);
const a342 = new Uint8Array([ 170, 170, 170, 170 ]);
const a343 = new Uint8Array([ 170, 170, 170, 170 ]);
const a344 = new Uint8Array([ 170, 170, 170, 170 ]);
const a345 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s197, {
  ...s,
  type: 2,
  name: "struct{comptime antialiasing: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 3, comptime defaultValue: comptime_int = 1, comptime description: *const [60:0]u8 = \"Super sampling quality. Number of samples squared per pixel.\"} = .{.type = i32, .minValue = 1, .maxValue = 3, .defaultValue = 1, .description = \"Super sampling quality. Number of samples squared per pixel.\"}, comptime center: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -2, comptime comptime_float = -2} = .{-2, -2}, comptime maxValue: struct{comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [26:0]u8 = \"The center of the fractal.\"} = .{.type = @Vector(2, f32), .minValue = .{-2, -2}, .maxValue = .{2, 2}, .defaultValue = .{0, 0}, .description = \"The center of the fractal.\"}, comptime centerFineTune: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [30:0]u8 = \"Fine tune the center position.\"} = .{.type = @Vector(2, f32), .minValue = .{-1, -1}, .maxValue = .{1, 1}, .defaultValue = .{0, 0}, .description = \"Fine tune the center position.\"}, comptime centerPreset: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 4, comptime defaultValue: comptime_int = 0, comptime description: *const [49:0]u8 = \"Some nice areas to explore in the Mandelbrot set.\", comptime aeDisplayName: *const [24:0]u8 = \"Mandelbrot center preset\", comptime aeUIControl: *const [7:0]u8 = \"aePopup\", comptime aePopupString: *const [59:0]u8 = \"Free control|Seahorse tail|Lightning|Spiral|Mini Mandelbrot\"} = .{.type = i32, .minValue = 0, .maxValue = 4, .defaultValue = 0, .description = \"Some nice areas to explore in the Mandelbrot set.\", .aeDisplayName = \"Mandelbrot center preset\", .aeUIControl = \"aePopup\", .aePopupString = \"Free control|Seahorse tail|Lightning|Spiral|Mini Mandelbrot\"}, comptime mandelbrot: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [37:0]u8 = \"Use the standard Mandelbrot equation.\"} = .{.type = bool, .defaultValue = false, .description = \"Use the standard Mandelbrot equation.\"}, comptime withPowerZ: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [35:0]u8 = \"Include z^z in the fractal equation\"} = .{.type = bool, .defaultValue = false, .description = \"Include z^z in the fractal equation\"}, comptime withSine: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [38:0]u8 = \"Include sin(z) in the fractal equation\"} = .{.type = bool, .defaultValue = false, .description = \"Include sin(z) in the fractal equation\"}, comptime withE: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [36:0]u8 = \"Include e(z) in the fractal equation\"} = .{.type = bool, .defaultValue = false, .description = \"Include e(z) in the fractal equation\"}, comptime power: struct{comptime type: type = f32, comptime minValue: comptime_float = -12, comptime maxValue: comptime_float = 12, comptime defaultValue: comptime_float = 3, comptime description: *const [60:0]u8 = \"Raise z to the power e in the fractal formula: z' = z^e + mu\"} = .{.type = f32, .minValue = -12, .maxValue = 12, .defaultValue = 3, .description = \"Raise z to the power e in the fractal formula: z' = z^e + mu\"}, comptime powerFineTune: struct{comptime type: type = f32, comptime minValue: comptime_float = -0.1, comptime maxValue: comptime_float = 0.1, comptime defaultValue: comptime_float = 0, comptime description: *const [23:0]u8 = \"Fine tune the exponent.\"} = .{.type = f32, .minValue = -0.1, .maxValue = 0.1, .defaultValue = 0, .description = \"Fine tune the exponent.\"}, comptime mu: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.42, comptime comptime_float = 0} = .{0.42, 0}, comptime description: *const [59:0]u8 = \"The complex parameter of the fractal formula: z' = z^e + mu\"} = .{.type = @Vector(2, f32), .minValue = .{-1, -1}, .maxValue = .{1, 1}, .defaultValue = .{0.42, 0}, .description = \"The complex parameter of the fractal formula: z' = z^e + mu\"}, comptime muFineTune: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -0.01, comptime comptime_float = -0.01} = .{-0.01, -0.01}, comptime maxValue: struct{comptime comptime_float = 0.01, comptime comptime_float = 0.01} = .{0.01, 0.01}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [13:0]u8 = \"Fine tune mu.\"} = .{.type = @Vector(2, f32), .minValue = .{-0.01, -0.01}, .maxValue = .{0.01, 0.01}, .defaultValue = .{0, 0}, .description = \"Fine tune mu.\"}, comptime bailoutStyle: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 3, comptime defaultValue: comptime_int = 0, comptime description: *const [40:0]u8 = \"Changes the style of the bailout effect.\", comptime aeDisplayName: *const [13:0]u8 = \"Bailout style\", comptime aeUIControl: *const [7:0]u8 = \"aePopup\", comptime aePopupString: *const [26:0]u8 = \"Smooth|Spiky|Stalks|Swirls\"} = .{.type = i32, .minValue = 0, .maxValue = 3, .defaultValue = 0, .description = \"Changes the style of the bailout effect.\", .aeDisplayName = \"Bailout style\", .aeUIControl = \"aePopup\", .aePopupString = \"Smooth|Spiky|Stalks|Swirls\"}, comptime bailout: struct{comptime type: type = f32, comptime minValue: comptime_float = 2, comptime maxValue: comptime_float = 150, comptime defaultValue: comptime_float = 4, comptime description: *const [18:0]u8 = \"Bailout threshold.\"} = .{.type = f32, .minValue = 2, .maxValue = 150, .defaultValue = 4, .description = \"Bailout threshold.\"}, comptime iterations: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 300, comptime defaultValue: comptime_int = 70, comptime description: *const [108:0]u8 = \"The maximum number of iterations for each pixel before bailout. Use to increase detail at the fractal edges.\"} = .{.type = i32, .minValue = 1, .maxValue = 300, .defaultValue = 70, .description = \"The maximum number of iterations for each pixel before bailout. Use to increase detail at the fractal edges.\"}, comptime iterationsOffset: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 150, comptime defaultValue: comptime_int = 0, comptime description: *const [39:0]u8 = \"Offset the start of the iteration count\"} = .{.type = i32, .minValue = 0, .maxValue = 150, .defaultValue = 0, .description = \"Offset the start of the iteration count\"}, comptime colorMode: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 5, comptime defaultValue: comptime_int = 0, comptime description: *const [25:0]u8 = \"Different colouring modes\", comptime aeDisplayName: *const [14:0]u8 = \"Colouring mode\", comptime aeUIControl: *const [7:0]u8 = \"aePopup\", comptime aePopupString: *const [76:0]u8 = \"Smooth|Shelf banding|Solid banding|Binary deconvolution|Contour bands|Spikes\"} = .{.type = i32, .minValue = 0, .maxValue = 5, .defaultValue = 0, .description = \"Different colouring modes\", .aeDisplayName = \"Colouring mode\", .aeUIControl = \"aePopup\", .aePopupString = \"Smooth|Shelf banding|Solid banding|Binary deconvolution|Contour bands|Spikes\"}, comptime hsbColor: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [42:0]u8 = \"Use hue, saturation, brightness colouring.\"} = .{.type = bool, .defaultValue = false, .description = \"Use hue, saturation, brightness colouring.\"}, comptime color1: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime description: *const [17:0]u8 = \"The outer colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{1, 1, 1}, .description = \"The outer colour.\", .aeUIControl = \"aeColor\"}, comptime color2: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0.28, comptime comptime_float = 0.46} = .{0, 0.28, 0.46}, comptime description: *const [17:0]u8 = \"The inner colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0, 0.28, 0.46}, .description = \"The inner colour.\", .aeUIControl = \"aeColor\"}, comptime colorBackground: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime description: *const [22:0]u8 = \"The background colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0, 0, 0}, .description = \"The background colour.\", .aeUIControl = \"aeColor\"}, comptime colorCycle: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime description: *const [48:0]u8 = \"The number of times the colour gradient repeats.\"} = .{.type = f32, .minValue = 1, .maxValue = 10, .defaultValue = 1, .description = \"The number of times the colour gradient repeats.\"}, comptime colorCycleOffset: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [25:0]u8 = \"Shift the colour mapping.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0, .description = \"Shift the colour mapping.\"}, comptime colorCycleMirror: struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [48:0]u8 = \"Reflect the colour gradient or use abrupt steps.\"} = .{.type = bool, .defaultValue = true, .description = \"Reflect the colour gradient or use abrupt steps.\"}, comptime colorScale: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 20, comptime defaultValue: comptime_float = 3, comptime description: *const [43:0]u8 = \"Determines the mapping scale of the colour.\"} = .{.type = f32, .minValue = 1, .maxValue = 20, .defaultValue = 3, .description = \"Determines the mapping scale of the colour.\"}, comptime colorAlpha: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime description: *const [88:0]u8 = \"Separate alpha controls for color1, color2 and colorBackground for AfterEffects support.\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{1, 1, 1}, .description = \"Separate alpha controls for color1, color2 and colorBackground for AfterEffects support.\"}, comptime iterationColorBlend: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [80:0]u8 = \"Add the illusion of depth by blending subsequent iterations into the background.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0, .description = \"Add the illusion of depth by blending subsequent iterations into the background.\"}, comptime rotate: struct{comptime type: type = f32, comptime minValue: comptime_float = -180, comptime maxValue: comptime_float = 180, comptime defaultValue: comptime_float = 0, comptime description: *const [19:0]u8 = \"Rotate the fractal.\"} = .{.type = f32, .minValue = -180, .maxValue = 180, .defaultValue = 0, .description = \"Rotate the fractal.\"}, comptime size: struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 4096, comptime comptime_int = 4096} = .{4096, 4096}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}, comptime description: *const [33:0]u8 = \"The size of the rendered fractal.\"} = .{.type = @Vector(2, i32), .minValue = .{100, 100}, .maxValue = .{4096, 4096}, .defaultValue = .{512, 512}, .description = \"The size of the rendered fractal.\"}, comptime zoom: struct{comptime type: type = f32, comptime minValue: comptime_float = -2, comptime maxValue: comptime_float = 13, comptime defaultValue: comptime_float = 0.1, comptime description: *const [13:0]u8 = \"Primary zoom.\"} = .{.type = f32, .minValue = -2, .maxValue = 13, .defaultValue = 0.1, .description = \"Primary zoom.\"}, comptime zoomFineTune: struct{comptime type: type = f32, comptime minValue: comptime_float = -1, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [19:0]u8 = \"Fine tune the zoom.\"} = .{.type = f32, .minValue = -1, .maxValue = 1, .defaultValue = 0, .description = \"Fine tune the zoom.\"}}",
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
        structure: s19,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "center",
        structure: s34,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "centerFineTune",
        structure: s43,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "centerPreset",
        structure: s57,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "mandelbrot",
        structure: s64,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "withPowerZ",
        structure: s69,
      },
      {
        ...m,
        type: 8,
        slot: 6,
        name: "withSine",
        structure: s74,
      },
      {
        ...m,
        type: 8,
        slot: 7,
        name: "withE",
        structure: s79,
      },
      {
        ...m,
        type: 8,
        slot: 8,
        name: "power",
        structure: s81,
      },
      {
        ...m,
        type: 8,
        slot: 9,
        name: "powerFineTune",
        structure: s86,
      },
      {
        ...m,
        type: 8,
        slot: 10,
        name: "mu",
        structure: s90,
      },
      {
        ...m,
        type: 8,
        slot: 11,
        name: "muFineTune",
        structure: s99,
      },
      {
        ...m,
        type: 8,
        slot: 12,
        name: "bailoutStyle",
        structure: s104,
      },
      {
        ...m,
        type: 8,
        slot: 13,
        name: "bailout",
        structure: s109,
      },
      {
        ...m,
        type: 8,
        slot: 14,
        name: "iterations",
        structure: s114,
      },
      {
        ...m,
        type: 8,
        slot: 15,
        name: "iterationsOffset",
        structure: s119,
      },
      {
        ...m,
        type: 8,
        slot: 16,
        name: "colorMode",
        structure: s130,
      },
      {
        ...m,
        type: 8,
        slot: 17,
        name: "hsbColor",
        structure: s135,
      },
      {
        ...m,
        type: 8,
        slot: 18,
        name: "color1",
        structure: s145,
      },
      {
        ...m,
        type: 8,
        slot: 19,
        name: "color2",
        structure: s149,
      },
      {
        ...m,
        type: 8,
        slot: 20,
        name: "colorBackground",
        structure: s154,
      },
      {
        ...m,
        type: 8,
        slot: 21,
        name: "colorCycle",
        structure: s159,
      },
      {
        ...m,
        type: 8,
        slot: 22,
        name: "colorCycleOffset",
        structure: s161,
      },
      {
        ...m,
        type: 8,
        slot: 23,
        name: "colorCycleMirror",
        structure: s163,
      },
      {
        ...m,
        type: 8,
        slot: 24,
        name: "colorScale",
        structure: s168,
      },
      {
        ...m,
        type: 8,
        slot: 25,
        name: "colorAlpha",
        structure: s173,
      },
      {
        ...m,
        type: 8,
        slot: 26,
        name: "iterationColorBlend",
        structure: s178,
      },
      {
        ...m,
        type: 8,
        slot: 27,
        name: "rotate",
        structure: s180,
      },
      {
        ...m,
        type: 8,
        slot: 28,
        name: "size",
        structure: s192,
      },
      {
        ...m,
        type: 8,
        slot: 29,
        name: "zoom",
        structure: s194,
      },
      {
        ...m,
        type: 8,
        slot: 30,
        name: "zoomFineTune",
        structure: s196,
      },
    ],
    methods: [],
    template: {
      memory: { array: a314 },
      slots: {
        0: {
          structure: s19,
          memory: { array: a315 },
          slots: {
            0: {
              structure: s18,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s34,
          memory: { array: a316 },
          slots: {
            0: {
              structure: s33,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s43,
          memory: { array: a317 },
          slots: {
            0: {
              structure: s42,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s57,
          memory: { array: a318 },
          slots: {
            0: {
              structure: s56,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s64,
          memory: { array: a319 },
          slots: {
            0: {
              structure: s63,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s69,
          memory: { array: a320 },
          slots: {
            0: {
              structure: s68,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s74,
          memory: { array: a321 },
          slots: {
            0: {
              structure: s73,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        7: {
          structure: s79,
          memory: { array: a322 },
          slots: {
            0: {
              structure: s78,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        8: {
          structure: s81,
          memory: { array: a323 },
          slots: {
            0: {
              structure: s80,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        9: {
          structure: s86,
          memory: { array: a324 },
          slots: {
            0: {
              structure: s85,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        10: {
          structure: s90,
          memory: { array: a325 },
          slots: {
            0: {
              structure: s89,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        11: {
          structure: s99,
          memory: { array: a326 },
          slots: {
            0: {
              structure: s98,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        12: {
          structure: s104,
          memory: { array: a327 },
          slots: {
            0: {
              structure: s103,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        13: {
          structure: s109,
          memory: { array: a328 },
          slots: {
            0: {
              structure: s108,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        14: {
          structure: s114,
          memory: { array: a329 },
          slots: {
            0: {
              structure: s113,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        15: {
          structure: s119,
          memory: { array: a330 },
          slots: {
            0: {
              structure: s118,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        16: {
          structure: s130,
          memory: { array: a331 },
          slots: {
            0: {
              structure: s129,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        17: {
          structure: s135,
          memory: { array: a332 },
          slots: {
            0: {
              structure: s134,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        18: {
          structure: s145,
          memory: { array: a333 },
          slots: {
            0: {
              structure: s144,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        19: {
          structure: s149,
          memory: { array: a334 },
          slots: {
            0: {
              structure: s148,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        20: {
          structure: s154,
          memory: { array: a335 },
          slots: {
            0: {
              structure: s153,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        21: {
          structure: s159,
          memory: { array: a336 },
          slots: {
            0: {
              structure: s158,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        22: {
          structure: s161,
          memory: { array: a337 },
          slots: {
            0: {
              structure: s160,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        23: {
          structure: s163,
          memory: { array: a338 },
          slots: {
            0: {
              structure: s162,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        24: {
          structure: s168,
          memory: { array: a339 },
          slots: {
            0: {
              structure: s167,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        25: {
          structure: s173,
          memory: { array: a340 },
          slots: {
            0: {
              structure: s172,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        26: {
          structure: s178,
          memory: { array: a341 },
          slots: {
            0: {
              structure: s177,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        27: {
          structure: s180,
          memory: { array: a342 },
          slots: {
            0: {
              structure: s179,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        28: {
          structure: s192,
          memory: { array: a343 },
          slots: {
            0: {
              structure: s191,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        29: {
          structure: s194,
          memory: { array: a344 },
          slots: {
            0: {
              structure: s193,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        30: {
          structure: s196,
          memory: { array: a345 },
          slots: {
            0: {
              structure: s195,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 18,
});
Object.assign(s198, {
  ...s,
  type: 11,
  name: "*const struct{comptime antialiasing: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 3, comptime defaultValue: comptime_int = 1, comptime description: *const [60:0]u8 = \"Super sampling quality. Number of samples squared per pixel.\"} = .{.type = i32, .minValue = 1, .maxValue = 3, .defaultValue = 1, .description = \"Super sampling quality. Number of samples squared per pixel.\"}, comptime center: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -2, comptime comptime_float = -2} = .{-2, -2}, comptime maxValue: struct{comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [26:0]u8 = \"The center of the fractal.\"} = .{.type = @Vector(2, f32), .minValue = .{-2, -2}, .maxValue = .{2, 2}, .defaultValue = .{0, 0}, .description = \"The center of the fractal.\"}, comptime centerFineTune: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [30:0]u8 = \"Fine tune the center position.\"} = .{.type = @Vector(2, f32), .minValue = .{-1, -1}, .maxValue = .{1, 1}, .defaultValue = .{0, 0}, .description = \"Fine tune the center position.\"}, comptime centerPreset: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 4, comptime defaultValue: comptime_int = 0, comptime description: *const [49:0]u8 = \"Some nice areas to explore in the Mandelbrot set.\", comptime aeDisplayName: *const [24:0]u8 = \"Mandelbrot center preset\", comptime aeUIControl: *const [7:0]u8 = \"aePopup\", comptime aePopupString: *const [59:0]u8 = \"Free control|Seahorse tail|Lightning|Spiral|Mini Mandelbrot\"} = .{.type = i32, .minValue = 0, .maxValue = 4, .defaultValue = 0, .description = \"Some nice areas to explore in the Mandelbrot set.\", .aeDisplayName = \"Mandelbrot center preset\", .aeUIControl = \"aePopup\", .aePopupString = \"Free control|Seahorse tail|Lightning|Spiral|Mini Mandelbrot\"}, comptime mandelbrot: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [37:0]u8 = \"Use the standard Mandelbrot equation.\"} = .{.type = bool, .defaultValue = false, .description = \"Use the standard Mandelbrot equation.\"}, comptime withPowerZ: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [35:0]u8 = \"Include z^z in the fractal equation\"} = .{.type = bool, .defaultValue = false, .description = \"Include z^z in the fractal equation\"}, comptime withSine: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [38:0]u8 = \"Include sin(z) in the fractal equation\"} = .{.type = bool, .defaultValue = false, .description = \"Include sin(z) in the fractal equation\"}, comptime withE: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [36:0]u8 = \"Include e(z) in the fractal equation\"} = .{.type = bool, .defaultValue = false, .description = \"Include e(z) in the fractal equation\"}, comptime power: struct{comptime type: type = f32, comptime minValue: comptime_float = -12, comptime maxValue: comptime_float = 12, comptime defaultValue: comptime_float = 3, comptime description: *const [60:0]u8 = \"Raise z to the power e in the fractal formula: z' = z^e + mu\"} = .{.type = f32, .minValue = -12, .maxValue = 12, .defaultValue = 3, .description = \"Raise z to the power e in the fractal formula: z' = z^e + mu\"}, comptime powerFineTune: struct{comptime type: type = f32, comptime minValue: comptime_float = -0.1, comptime maxValue: comptime_float = 0.1, comptime defaultValue: comptime_float = 0, comptime description: *const [23:0]u8 = \"Fine tune the exponent.\"} = .{.type = f32, .minValue = -0.1, .maxValue = 0.1, .defaultValue = 0, .description = \"Fine tune the exponent.\"}, comptime mu: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -1, comptime comptime_float = -1} = .{-1, -1}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.42, comptime comptime_float = 0} = .{0.42, 0}, comptime description: *const [59:0]u8 = \"The complex parameter of the fractal formula: z' = z^e + mu\"} = .{.type = @Vector(2, f32), .minValue = .{-1, -1}, .maxValue = .{1, 1}, .defaultValue = .{0.42, 0}, .description = \"The complex parameter of the fractal formula: z' = z^e + mu\"}, comptime muFineTune: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -0.01, comptime comptime_float = -0.01} = .{-0.01, -0.01}, comptime maxValue: struct{comptime comptime_float = 0.01, comptime comptime_float = 0.01} = .{0.01, 0.01}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [13:0]u8 = \"Fine tune mu.\"} = .{.type = @Vector(2, f32), .minValue = .{-0.01, -0.01}, .maxValue = .{0.01, 0.01}, .defaultValue = .{0, 0}, .description = \"Fine tune mu.\"}, comptime bailoutStyle: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 3, comptime defaultValue: comptime_int = 0, comptime description: *const [40:0]u8 = \"Changes the style of the bailout effect.\", comptime aeDisplayName: *const [13:0]u8 = \"Bailout style\", comptime aeUIControl: *const [7:0]u8 = \"aePopup\", comptime aePopupString: *const [26:0]u8 = \"Smooth|Spiky|Stalks|Swirls\"} = .{.type = i32, .minValue = 0, .maxValue = 3, .defaultValue = 0, .description = \"Changes the style of the bailout effect.\", .aeDisplayName = \"Bailout style\", .aeUIControl = \"aePopup\", .aePopupString = \"Smooth|Spiky|Stalks|Swirls\"}, comptime bailout: struct{comptime type: type = f32, comptime minValue: comptime_float = 2, comptime maxValue: comptime_float = 150, comptime defaultValue: comptime_float = 4, comptime description: *const [18:0]u8 = \"Bailout threshold.\"} = .{.type = f32, .minValue = 2, .maxValue = 150, .defaultValue = 4, .description = \"Bailout threshold.\"}, comptime iterations: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 300, comptime defaultValue: comptime_int = 70, comptime description: *const [108:0]u8 = \"The maximum number of iterations for each pixel before bailout. Use to increase detail at the fractal edges.\"} = .{.type = i32, .minValue = 1, .maxValue = 300, .defaultValue = 70, .description = \"The maximum number of iterations for each pixel before bailout. Use to increase detail at the fractal edges.\"}, comptime iterationsOffset: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 150, comptime defaultValue: comptime_int = 0, comptime description: *const [39:0]u8 = \"Offset the start of the iteration count\"} = .{.type = i32, .minValue = 0, .maxValue = 150, .defaultValue = 0, .description = \"Offset the start of the iteration count\"}, comptime colorMode: struct{comptime type: type = i32, comptime minValue: comptime_int = 0, comptime maxValue: comptime_int = 5, comptime defaultValue: comptime_int = 0, comptime description: *const [25:0]u8 = \"Different colouring modes\", comptime aeDisplayName: *const [14:0]u8 = \"Colouring mode\", comptime aeUIControl: *const [7:0]u8 = \"aePopup\", comptime aePopupString: *const [76:0]u8 = \"Smooth|Shelf banding|Solid banding|Binary deconvolution|Contour bands|Spikes\"} = .{.type = i32, .minValue = 0, .maxValue = 5, .defaultValue = 0, .description = \"Different colouring modes\", .aeDisplayName = \"Colouring mode\", .aeUIControl = \"aePopup\", .aePopupString = \"Smooth|Shelf banding|Solid banding|Binary deconvolution|Contour bands|Spikes\"}, comptime hsbColor: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [42:0]u8 = \"Use hue, saturation, brightness colouring.\"} = .{.type = bool, .defaultValue = false, .description = \"Use hue, saturation, brightness colouring.\"}, comptime color1: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime description: *const [17:0]u8 = \"The outer colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{1, 1, 1}, .description = \"The outer colour.\", .aeUIControl = \"aeColor\"}, comptime color2: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0.28, comptime comptime_float = 0.46} = .{0, 0.28, 0.46}, comptime description: *const [17:0]u8 = \"The inner colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0, 0.28, 0.46}, .description = \"The inner colour.\", .aeUIControl = \"aeColor\"}, comptime colorBackground: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime description: *const [22:0]u8 = \"The background colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0, 0, 0}, .description = \"The background colour.\", .aeUIControl = \"aeColor\"}, comptime colorCycle: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 1, comptime description: *const [48:0]u8 = \"The number of times the colour gradient repeats.\"} = .{.type = f32, .minValue = 1, .maxValue = 10, .defaultValue = 1, .description = \"The number of times the colour gradient repeats.\"}, comptime colorCycleOffset: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [25:0]u8 = \"Shift the colour mapping.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0, .description = \"Shift the colour mapping.\"}, comptime colorCycleMirror: struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [48:0]u8 = \"Reflect the colour gradient or use abrupt steps.\"} = .{.type = bool, .defaultValue = true, .description = \"Reflect the colour gradient or use abrupt steps.\"}, comptime colorScale: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 20, comptime defaultValue: comptime_float = 3, comptime description: *const [43:0]u8 = \"Determines the mapping scale of the colour.\"} = .{.type = f32, .minValue = 1, .maxValue = 20, .defaultValue = 3, .description = \"Determines the mapping scale of the colour.\"}, comptime colorAlpha: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime description: *const [88:0]u8 = \"Separate alpha controls for color1, color2 and colorBackground for AfterEffects support.\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{1, 1, 1}, .description = \"Separate alpha controls for color1, color2 and colorBackground for AfterEffects support.\"}, comptime iterationColorBlend: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [80:0]u8 = \"Add the illusion of depth by blending subsequent iterations into the background.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0, .description = \"Add the illusion of depth by blending subsequent iterations into the background.\"}, comptime rotate: struct{comptime type: type = f32, comptime minValue: comptime_float = -180, comptime maxValue: comptime_float = 180, comptime defaultValue: comptime_float = 0, comptime description: *const [19:0]u8 = \"Rotate the fractal.\"} = .{.type = f32, .minValue = -180, .maxValue = 180, .defaultValue = 0, .description = \"Rotate the fractal.\"}, comptime size: struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 4096, comptime comptime_int = 4096} = .{4096, 4096}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}, comptime description: *const [33:0]u8 = \"The size of the rendered fractal.\"} = .{.type = @Vector(2, i32), .minValue = .{100, 100}, .maxValue = .{4096, 4096}, .defaultValue = .{512, 512}, .description = \"The size of the rendered fractal.\"}, comptime zoom: struct{comptime type: type = f32, comptime minValue: comptime_float = -2, comptime maxValue: comptime_float = 13, comptime defaultValue: comptime_float = 0.1, comptime description: *const [13:0]u8 = \"Primary zoom.\"} = .{.type = f32, .minValue = -2, .maxValue = 13, .defaultValue = 0.1, .description = \"Primary zoom.\"}, comptime zoomFineTune: struct{comptime type: type = f32, comptime minValue: comptime_float = -1, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [19:0]u8 = \"Fine tune the zoom.\"} = .{.type = f32, .minValue = -1, .maxValue = 1, .defaultValue = 0, .description = \"Fine tune the zoom.\"}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s197,
      },
    ],
    methods: [],
    template: null
  },
  slot: 17,
});
const a346 = new Uint8Array([  ]);
Object.assign(s199, {
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
      memory: { array: a346 },
    },
  },
  slot: 20,
});
Object.assign(s200, {
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
        structure: s199,
      },
    ],
    methods: [],
    template: null
  },
  slot: 19,
});
const a347 = new Uint8Array([  ]);
const a348 = new Uint8Array([ 208, 30, 16, 0 ]);
Object.assign(s201, {
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
      memory: { array: a347 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a348 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a48 },
              address: 1056464,
            },
          },
        },
      },
    },
  },
  slot: 105,
});
Object.assign(s202, {
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
        structure: s201,
      },
    ],
    methods: [],
    template: null
  },
  slot: 104,
});
const a349 = new Uint8Array([  ]);
const a350 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s203, {
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
        structure: s202,
      },
    ],
    methods: [],
    template: {
      memory: { array: a349 },
      slots: {
        0: {
          structure: s202,
          memory: { array: a350 },
          slots: {
            0: {
              structure: s201,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 22,
});
Object.assign(s204, {
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
        structure: s203,
      },
    ],
    methods: [],
    template: null
  },
  slot: 21,
});
const a351 = new Uint8Array([  ]);
const a352 = new Uint8Array([  ]);
const a353 = new Uint8Array([ 12, 2, 17, 0 ]);
const a354 = new Uint8Array([ 188, 1, 17, 0 ]);
const a355 = new Uint8Array([ 99, 111, 109, 46, 115, 117, 98, 98, 108, 117, 101, 46, 102, 105, 108, 116, 101, 114, 115, 0 ]);
const a356 = new Uint8Array([ 8, 2, 17, 0 ]);
const a357 = new Uint8Array([ 166, 1, 17, 0 ]);
const a358 = new Uint8Array([ 84, 111, 109, 32, 66, 101, 100, 100, 97, 114, 100, 0 ]);
const a359 = new Uint8Array([ 132, 31, 16, 0 ]);
const a360 = new Uint8Array([ 4, 2, 17, 0 ]);
const a361 = new Uint8Array([ 134, 1, 17, 0 ]);
const a362 = new Uint8Array([ 70, 114, 97, 99, 116, 97, 108, 32, 101, 120, 112, 108, 111, 114, 101, 114, 0 ]);
const a363 = new Uint8Array([ 0, 2, 17, 0 ]);
const a364 = new Uint8Array([ 117, 1, 17, 0 ]);
const a365 = new Uint8Array([ 70, 114, 97, 99, 116, 97, 108, 32, 69, 120, 112, 108, 111, 114, 101, 114, 0 ]);
const a366 = new Uint8Array([ 252, 1, 17, 0 ]);
const a367 = new Uint8Array([ 92, 1, 17, 0 ]);
const a368 = new Uint8Array([ 80, 105, 120, 101, 108, 32, 66, 101, 110, 100, 101, 114, 0 ]);
const a369 = new Uint8Array([ 170, 170, 170, 170 ]);
const a370 = new Uint8Array([ 170, 170, 170, 170 ]);
const a371 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s205, {
  ...s,
  type: 2,
  name: "fractal-explorer.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a351 },
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
        name: "displayName",
        structure: s11,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "category",
        structure: s14,
      },
      {
        ...m,
        type: 6,
        slot: 6,
        name: "parameters",
        structure: s198,
      },
      {
        ...m,
        type: 6,
        slot: 7,
        name: "inputImages",
        structure: s200,
      },
      {
        ...m,
        type: 6,
        slot: 8,
        name: "outputImages",
        structure: s204,
      },
    ],
    methods: [],
    template: {
      memory: { array: a352 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a353 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a354 },
              address: 1114636,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a355 },
                  address: 1114556,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a356 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a357 },
              address: 1114632,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a358 },
                  address: 1114534,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a359 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a2 },
              address: 1056644,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a360 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a361 },
              address: 1114628,
              slots: {
                0: {
                  structure: s9,
                  memory: { array: a362 },
                  address: 1114502,
                },
              },
            },
          },
        },
        4: {
          structure: s11,
          memory: { array: a363 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a364 },
              address: 1114624,
              slots: {
                0: {
                  structure: s9,
                  memory: { array: a365 },
                  address: 1114485,
                },
              },
            },
          },
        },
        5: {
          structure: s14,
          memory: { array: a366 },
          slots: {
            0: {
              structure: s13,
              memory: { array: a367 },
              address: 1114620,
              slots: {
                0: {
                  structure: s12,
                  memory: { array: a368 },
                  address: 1114460,
                },
              },
            },
          },
        },
        6: {
          structure: s198,
          memory: { array: a369 },
          slots: {
            0: {
              structure: s197,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        7: {
          structure: s200,
          memory: { array: a370 },
          slots: {
            0: {
              structure: s199,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
        8: {
          structure: s204,
          memory: { array: a371 },
          slots: {
            0: {
              structure: s203,
              memory: { array: a23 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
const a372 = new Uint8Array([  ]);
Object.assign(s206, {
  ...s,
  type: 2,
  name: "fractal-explorer.KernelInput(u8,fractal-explorer.kernel)",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a372 },
    },
  },
  slot: 23,
});
Object.assign(s207, {
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
  slot: 28,
});
Object.assign(s208, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s207,
      },
    ],
    methods: [],
    template: null
  },
  slot: 27,
});
Object.assign(s209, {
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
        structure: s208,
      },
    ],
    methods: [],
    template: null
  },
  slot: 26,
});
Object.assign(s210, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s210,
      },
    ],
    methods: [],
    template: null
  },
  slot: 29,
});
const a373 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s211, {
  ...s,
  type: 9,
  name: "fractal-explorer.ColorSpace",
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
      memory: { array: a373 },
    },
  },
  slot: 30,
});
Object.assign(s212, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s212,
      },
    ],
    methods: [],
    template: null
  },
  slot: 32,
});
Object.assign(s213, {
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
        structure: s20,
      },
    ],
    methods: [],
    template: null
  },
  slot: 106,
});
const a374 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a375 = new Uint8Array([  ]);
const a376 = new Uint8Array([ 208, 30, 16, 0 ]);
Object.assign(s214, {
  ...s,
  type: 2,
  name: "fractal-explorer.Image(u8,4,true)",
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
        structure: s209,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s210,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s210,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s211,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s58,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s212,
      },
    ],
    methods: [],
    template: {
      memory: { array: a374 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s207,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s213,
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
      memory: { array: a375 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a376 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a48 },
              address: 1056464,
            },
          },
        },
      },
    },
  },
  slot: 25,
});
const a377 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a378 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a379 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a380 = new Uint8Array([  ]);
Object.assign(s215, {
  ...s,
  type: 2,
  name: "fractal-explorer.KernelOutput(u8,fractal-explorer.kernel)",
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
        structure: s214,
      },
    ],
    methods: [],
    template: {
      memory: { array: a377 },
      slots: {
        0: {
          structure: s214,
          memory: { array: a378 },
          slots: {
            0: {
              structure: s209,
              memory: { array: a379 },
              slots: {
                0: {
                  structure: s208,
                  memory: { array: a380 },
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 24,
});
const a381 = new Uint8Array([ 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 41, 92, 143, 62, 31, 133, 235, 62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 61, 10, 215, 62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 64, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 64, 64, 0, 0, 0, 0, 0, 0, 0, 0, 205, 204, 204, 61, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ]);
Object.assign(s216, {
  ...s,
  type: 2,
  name: "fractal-explorer.KernelParameters(fractal-explorer.kernel)",
  length: 1,
  byteSize: 176,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 2,
        bitOffset: 832,
        slot: 0,
        name: "antialiasing",
        structure: s7,
      },
      {
        ...m,
        type: 6,
        bitOffset: 512,
        bitSize: 64,
        byteSize: 8,
        slot: 1,
        name: "center",
        structure: s21,
      },
      {
        ...m,
        type: 6,
        bitOffset: 576,
        bitSize: 64,
        byteSize: 8,
        slot: 2,
        name: "centerFineTune",
        structure: s21,
      },
      {
        ...m,
        type: 2,
        bitOffset: 864,
        slot: 3,
        name: "centerPreset",
        structure: s7,
      },
      {
        ...m,
        type: 1,
        bitOffset: 1344,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "mandelbrot",
        structure: s58,
      },
      {
        ...m,
        type: 1,
        bitOffset: 1352,
        bitSize: 1,
        byteSize: 1,
        slot: 5,
        name: "withPowerZ",
        structure: s58,
      },
      {
        ...m,
        type: 1,
        bitOffset: 1360,
        bitSize: 1,
        byteSize: 1,
        slot: 6,
        name: "withSine",
        structure: s58,
      },
      {
        ...m,
        type: 1,
        bitOffset: 1368,
        bitSize: 1,
        byteSize: 1,
        slot: 7,
        name: "withE",
        structure: s58,
      },
      {
        ...m,
        type: 4,
        bitOffset: 896,
        slot: 8,
        name: "power",
        structure: s20,
      },
      {
        ...m,
        type: 4,
        bitOffset: 928,
        slot: 9,
        name: "powerFineTune",
        structure: s20,
      },
      {
        ...m,
        type: 6,
        bitOffset: 640,
        bitSize: 64,
        byteSize: 8,
        slot: 10,
        name: "mu",
        structure: s21,
      },
      {
        ...m,
        type: 6,
        bitOffset: 704,
        bitSize: 64,
        byteSize: 8,
        slot: 11,
        name: "muFineTune",
        structure: s21,
      },
      {
        ...m,
        type: 2,
        bitOffset: 960,
        slot: 12,
        name: "bailoutStyle",
        structure: s7,
      },
      {
        ...m,
        type: 4,
        bitOffset: 992,
        slot: 13,
        name: "bailout",
        structure: s20,
      },
      {
        ...m,
        type: 2,
        bitOffset: 1024,
        slot: 14,
        name: "iterations",
        structure: s7,
      },
      {
        ...m,
        type: 2,
        bitOffset: 1056,
        slot: 15,
        name: "iterationsOffset",
        structure: s7,
      },
      {
        ...m,
        type: 2,
        bitOffset: 1088,
        slot: 16,
        name: "colorMode",
        structure: s7,
      },
      {
        ...m,
        type: 1,
        bitOffset: 1376,
        bitSize: 1,
        byteSize: 1,
        slot: 17,
        name: "hsbColor",
        structure: s58,
      },
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 96,
        byteSize: 16,
        slot: 18,
        name: "color1",
        structure: s136,
      },
      {
        ...m,
        type: 6,
        bitOffset: 128,
        bitSize: 96,
        byteSize: 16,
        slot: 19,
        name: "color2",
        structure: s136,
      },
      {
        ...m,
        type: 6,
        bitOffset: 256,
        bitSize: 96,
        byteSize: 16,
        slot: 20,
        name: "colorBackground",
        structure: s136,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1120,
        slot: 21,
        name: "colorCycle",
        structure: s20,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1152,
        slot: 22,
        name: "colorCycleOffset",
        structure: s20,
      },
      {
        ...m,
        type: 1,
        bitOffset: 1384,
        bitSize: 1,
        byteSize: 1,
        slot: 23,
        name: "colorCycleMirror",
        structure: s58,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1184,
        slot: 24,
        name: "colorScale",
        structure: s20,
      },
      {
        ...m,
        type: 6,
        bitOffset: 384,
        bitSize: 96,
        byteSize: 16,
        slot: 25,
        name: "colorAlpha",
        structure: s136,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1216,
        slot: 26,
        name: "iterationColorBlend",
        structure: s20,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1248,
        slot: 27,
        name: "rotate",
        structure: s20,
      },
      {
        ...m,
        type: 6,
        bitOffset: 768,
        bitSize: 64,
        byteSize: 8,
        slot: 28,
        name: "size",
        structure: s181,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1280,
        slot: 29,
        name: "zoom",
        structure: s20,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1312,
        slot: 30,
        name: "zoomFineTune",
        structure: s20,
      },
    ],
    methods: [],
    template: {
      memory: { array: a381 },
    },
  },
  slot: 33,
});
Object.assign(s217, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(fractal-explorer.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 107,
});
Object.assign(s218, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(fractal-explorer.createOutput)).Fn.return_type.?).ErrorUnion.error_set!fractal-explorer.KernelOutput(u8,fractal-explorer.kernel)",
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
        structure: s215,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s217,
      },
    ],
    methods: [],
    template: null
  },
  slot: 40,
});
Object.assign(s219, {
  ...s,
  type: 3,
  name: "createOutput",
  length: 1,
  byteSize: 224,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 1408,
        slot: 0,
        name: "0",
        structure: s210,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 1440,
        slot: 1,
        name: "1",
        structure: s210,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1792,
        bitSize: 0,
        byteSize: 0,
        slot: 2,
        name: "2",
        structure: s206,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 1408,
        byteSize: 176,
        slot: 3,
        name: "3",
        structure: s216,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1472,
        bitSize: 224,
        byteSize: 28,
        slot: 4,
        name: "retval",
        structure: s218,
      },
    ],
    methods: [],
    template: null
  },
  slot: 38,
});
Object.assign(s220, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(fractal-explorer.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 108,
});
Object.assign(s221, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(fractal-explorer.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!fractal-explorer.KernelOutput(u8,fractal-explorer.kernel)",
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
        structure: s215,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s220,
      },
    ],
    methods: [],
    template: null
  },
  slot: 41,
});
Object.assign(s222, {
  ...s,
  type: 3,
  name: "createPartialOutput",
  length: 1,
  byteSize: 224,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 1408,
        slot: 0,
        name: "0",
        structure: s210,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 1440,
        slot: 1,
        name: "1",
        structure: s210,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 1472,
        slot: 2,
        name: "2",
        structure: s210,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 1504,
        slot: 3,
        name: "3",
        structure: s210,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1792,
        bitSize: 0,
        byteSize: 0,
        slot: 4,
        name: "4",
        structure: s206,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 1408,
        byteSize: 176,
        slot: 5,
        name: "5",
        structure: s216,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 1536,
        bitSize: 224,
        byteSize: 28,
        slot: 6,
        name: "retval",
        structure: s221,
      },
    ],
    methods: [],
    template: null
  },
  slot: 39,
});
const f0 = {
  argStruct: s219,
  thunk: 1,
  name: "createOutput",
};
const f1 = {
  argStruct: s222,
  thunk: 6,
  name: "createPartialOutput",
};
Object.assign(s223, {
  ...s,
  type: 2,
  name: "fractal-explorer",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a380 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s205,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s206,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s215,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s216,
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
  s160, s161, s162, s163, s164, s165, s166, s167, s168, s169,
  s170, s171, s172, s173, s174, s175, s176, s177, s178, s179,
  s180, s181, s182, s183, s184, s185, s186, s187, s188, s189,
  s190, s191, s192, s193, s194, s195, s196, s197, s198, s199,
  s200, s201, s202, s203, s204, s205, s206, s207, s208, s209,
  s210, s211, s212, s213, s214, s215, s216, s217, s218, s219,
  s220, s221, s222, s223,
];
const linkage = finalizeStructures(structures);
const module = s223.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_e21edce6;
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