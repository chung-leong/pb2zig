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
const s220 = {}, s221 = {}, s222 = {}, s223 = {}, s224 = {}, s225 = {}, s226 = {}, s227 = {}, s228 = {}, s229 = {};
const s230 = {}, s231 = {}, s232 = {}, s233 = {};
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
  slot: 13,
});
Object.assign(s10, {
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
  slot: 112,
});
Object.assign(s13, {
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
        structure: s12,
      },
    ],
    methods: [],
    template: null
  },
  slot: 111,
});
Object.assign(s14, {
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
        structure: s13,
      },
    ],
    methods: [],
    template: null
  },
  slot: 110,
});
const a0 = new Uint8Array([  ]);
const a1 = new Uint8Array([ 72, 31, 16, 0 ]);
const a2 = new Uint8Array([ 1, 0, 0, 0 ]);
const a3 = new Uint8Array([ 80, 32, 16, 0 ]);
const a4 = new Uint8Array([ 3, 0, 0, 0 ]);
const a5 = new Uint8Array([ 72, 31, 16, 0 ]);
const a6 = new Uint8Array([ 76, 32, 16, 0 ]);
const a7 = new Uint8Array([ 104, 37, 16, 0 ]);
const a8 = new Uint8Array([ 83, 117, 112, 101, 114, 32, 115, 97, 109, 112, 108, 105, 110, 103, 32, 113, 117, 97, 108, 105, 116, 121, 46, 32, 78, 117, 109, 98, 101, 114, 32, 111, 102, 32, 115, 97, 109, 112, 108, 101, 115, 32, 115, 113, 117, 97, 114, 101, 100, 32, 112, 101, 114, 32, 112, 105, 120, 101, 108, 46, 0 ]);
Object.assign(s15, {
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
              address: 1056584,
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
              address: 1056848,
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
              address: 1056584,
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
              address: 1056844,
              slots: {
                0: {
                  structure: s12,
                  memory: { array: a8 },
                  address: 1058152,
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
        structure: s17,
      },
    ],
    methods: [],
    template: null
  },
  slot: 28,
});
Object.assign(s18, {
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
        structure: s17,
      },
    ],
    methods: [],
    template: null
  },
  slot: 113,
});
Object.assign(s19, {
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
  slot: 116,
});
Object.assign(s20, {
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
        structure: s19,
      },
    ],
    methods: [],
    template: null
  },
  slot: 115,
});
Object.assign(s21, {
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
        structure: s20,
      },
    ],
    methods: [],
    template: null
  },
  slot: 114,
});
const a9 = new Uint8Array([  ]);
const a10 = new Uint8Array([ 72, 32, 16, 0 ]);
const a11 = new Uint8Array([ 1 ]);
const a12 = new Uint8Array([ 68, 32, 16, 0 ]);
const a13 = new Uint8Array([ 82, 37, 16, 0 ]);
const a14 = new Uint8Array([ 69, 110, 97, 98, 108, 101, 32, 112, 104, 111, 110, 103, 32, 115, 104, 97, 100, 105, 110, 103, 46, 0 ]);
Object.assign(s22, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [21:0]u8 = \"Enable phong shading.\"}",
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
        name: "defaultValue",
        structure: s18,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s21,
      },
    ],
    methods: [],
    template: {
      memory: { array: a9 },
      slots: {
        0: {
          structure: s18,
          memory: { array: a10 },
          slots: {
            0: {
              structure: s17,
              memory: { array: a11 },
              address: 1056840,
            },
          },
        },
        1: {
          structure: s21,
          memory: { array: a12 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a13 },
              address: 1056836,
              slots: {
                0: {
                  structure: s19,
                  memory: { array: a14 },
                  address: 1058130,
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
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [21:0]u8 = \"Enable phong shading.\"}",
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
  slot: 119,
});
Object.assign(s25, {
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
        structure: s24,
      },
    ],
    methods: [],
    template: null
  },
  slot: 118,
});
Object.assign(s26, {
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
        structure: s25,
      },
    ],
    methods: [],
    template: null
  },
  slot: 117,
});
const a15 = new Uint8Array([  ]);
const a16 = new Uint8Array([ 60, 32, 16, 0 ]);
const a17 = new Uint8Array([ 0 ]);
const a18 = new Uint8Array([ 64, 32, 16, 0 ]);
const a19 = new Uint8Array([ 56, 37, 16, 0 ]);
const a20 = new Uint8Array([ 69, 110, 97, 98, 108, 101, 32, 74, 117, 108, 105, 97, 32, 115, 101, 116, 32, 118, 101, 114, 115, 105, 111, 110, 46, 0 ]);
Object.assign(s27, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [25:0]u8 = \"Enable Julia set version.\"}",
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
        name: "defaultValue",
        structure: s18,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s26,
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
              memory: { array: a17 },
              address: 1056828,
            },
          },
        },
        1: {
          structure: s26,
          memory: { array: a18 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a19 },
              address: 1056832,
              slots: {
                0: {
                  structure: s24,
                  memory: { array: a20 },
                  address: 1058104,
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
Object.assign(s28, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [25:0]u8 = \"Enable Julia set version.\"}",
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
  slot: 43,
});
Object.assign(s29, {
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
  slot: 122,
});
Object.assign(s30, {
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
        structure: s29,
      },
    ],
    methods: [],
    template: null
  },
  slot: 121,
});
Object.assign(s31, {
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
        structure: s30,
      },
    ],
    methods: [],
    template: null
  },
  slot: 120,
});
const a21 = new Uint8Array([  ]);
const a22 = new Uint8Array([ 60, 32, 16, 0 ]);
const a23 = new Uint8Array([ 56, 32, 16, 0 ]);
const a24 = new Uint8Array([ 31, 37, 16, 0 ]);
const a25 = new Uint8Array([ 69, 110, 97, 98, 108, 101, 32, 114, 97, 100, 105, 111, 108, 97, 114, 105, 97, 32, 115, 116, 121, 108, 101, 46, 0 ]);
Object.assign(s32, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [24:0]u8 = \"Enable radiolaria style.\"}",
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
        name: "defaultValue",
        structure: s18,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "description",
        structure: s31,
      },
    ],
    methods: [],
    template: {
      memory: { array: a21 },
      slots: {
        0: {
          structure: s18,
          memory: { array: a22 },
          slots: {
            0: {
              structure: s17,
              memory: { array: a17 },
              address: 1056828,
            },
          },
        },
        1: {
          structure: s31,
          memory: { array: a23 },
          slots: {
            0: {
              structure: s30,
              memory: { array: a24 },
              address: 1056824,
              slots: {
                0: {
                  structure: s29,
                  memory: { array: a25 },
                  address: 1058079,
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
  name: "*const struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [24:0]u8 = \"Enable radiolaria style.\"}",
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
  name: "f32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 0,
        structure: s34,
      },
    ],
    methods: [],
    template: null
  },
  slot: 31,
});
Object.assign(s35, {
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
        structure: s35,
      },
    ],
    methods: [],
    template: null
  },
  slot: 124,
});
Object.assign(s36, {
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
        structure: s35,
      },
    ],
    methods: [],
    template: null
  },
  slot: 123,
});
Object.assign(s37, {
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
  slot: 127,
});
Object.assign(s38, {
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
        structure: s37,
      },
    ],
    methods: [],
    template: null
  },
  slot: 126,
});
Object.assign(s39, {
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
        structure: s38,
      },
    ],
    methods: [],
    template: null
  },
  slot: 125,
});
const a26 = new Uint8Array([  ]);
const a27 = new Uint8Array([ 8, 31, 16, 0 ]);
const a28 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 16, 192 ]);
const a29 = new Uint8Array([ 0, 31, 16, 0 ]);
const a30 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 16, 64 ]);
const a31 = new Uint8Array([ 112, 30, 16, 0 ]);
const a32 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a33 = new Uint8Array([ 52, 32, 16, 0 ]);
const a34 = new Uint8Array([ 2, 37, 16, 0 ]);
const a35 = new Uint8Array([ 84, 119, 101, 97, 107, 32, 116, 104, 101, 32, 114, 97, 100, 105, 111, 108, 97, 114, 105, 97, 32, 101, 102, 102, 101, 99, 116, 46, 0 ]);
Object.assign(s40, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -4, comptime maxValue: comptime_float = 4, comptime defaultValue: comptime_float = 0, comptime description: *const [28:0]u8 = \"Tweak the radiolaria effect.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s39,
      },
    ],
    methods: [],
    template: {
      memory: { array: a26 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a27 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a28 },
              address: 1056520,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a29 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a30 },
              address: 1056512,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a31 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        3: {
          structure: s39,
          memory: { array: a33 },
          slots: {
            0: {
              structure: s38,
              memory: { array: a34 },
              address: 1056820,
              slots: {
                0: {
                  structure: s37,
                  memory: { array: a35 },
                  address: 1058050,
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
Object.assign(s41, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -4, comptime maxValue: comptime_float = 4, comptime defaultValue: comptime_float = 0, comptime description: *const [28:0]u8 = \"Tweak the radiolaria effect.\"}",
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
  slot: 47,
});
Object.assign(s42, {
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
  slot: 130,
});
Object.assign(s43, {
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
        structure: s42,
      },
    ],
    methods: [],
    template: null
  },
  slot: 129,
});
Object.assign(s44, {
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
        structure: s43,
      },
    ],
    methods: [],
    template: null
  },
  slot: 128,
});
const a36 = new Uint8Array([  ]);
const a37 = new Uint8Array([ 112, 30, 16, 0 ]);
const a38 = new Uint8Array([ 144, 30, 16, 0 ]);
const a39 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a40 = new Uint8Array([ 112, 30, 16, 0 ]);
const a41 = new Uint8Array([ 48, 32, 16, 0 ]);
const a42 = new Uint8Array([ 231, 36, 16, 0 ]);
const a43 = new Uint8Array([ 69, 110, 97, 98, 108, 101, 32, 114, 97, 121, 32, 116, 114, 97, 99, 101, 100, 32, 115, 104, 97, 100, 111, 119, 115, 46, 0 ]);
Object.assign(s45, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [26:0]u8 = \"Enable ray traced shadows.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s44,
      },
    ],
    methods: [],
    template: {
      memory: { array: a36 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a37 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a38 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a40 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        3: {
          structure: s44,
          memory: { array: a41 },
          slots: {
            0: {
              structure: s43,
              memory: { array: a42 },
              address: 1056816,
              slots: {
                0: {
                  structure: s42,
                  memory: { array: a43 },
                  address: 1058023,
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
Object.assign(s46, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [26:0]u8 = \"Enable ray traced shadows.\"}",
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
  slot: 49,
});
Object.assign(s47, {
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
  slot: 133,
});
Object.assign(s48, {
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
        structure: s48,
      },
    ],
    methods: [],
    template: null
  },
  slot: 131,
});
const a44 = new Uint8Array([  ]);
const a45 = new Uint8Array([ 112, 30, 16, 0 ]);
const a46 = new Uint8Array([ 144, 30, 16, 0 ]);
const a47 = new Uint8Array([ 40, 32, 16, 0 ]);
const a48 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 233, 63 ]);
const a49 = new Uint8Array([ 32, 32, 16, 0 ]);
const a50 = new Uint8Array([ 169, 36, 16, 0 ]);
const a51 = new Uint8Array([ 69, 110, 97, 98, 108, 101, 32, 102, 97, 107, 101, 32, 97, 109, 98, 105, 101, 110, 116, 32, 111, 99, 99, 108, 117, 115, 105, 111, 110, 32, 102, 97, 99, 116, 111, 114, 32, 98, 97, 115, 101, 100, 32, 111, 110, 32, 116, 104, 101, 32, 111, 114, 98, 105, 116, 32, 116, 114, 97, 112, 46, 0 ]);
Object.assign(s50, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.8, comptime description: *const [61:0]u8 = \"Enable fake ambient occlusion factor based on the orbit trap.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s49,
      },
    ],
    methods: [],
    template: {
      memory: { array: a44 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a45 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a46 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a47 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a48 },
              address: 1056808,
            },
          },
        },
        3: {
          structure: s49,
          memory: { array: a49 },
          slots: {
            0: {
              structure: s48,
              memory: { array: a50 },
              address: 1056800,
              slots: {
                0: {
                  structure: s47,
                  memory: { array: a51 },
                  address: 1057961,
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
Object.assign(s51, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.8, comptime description: *const [61:0]u8 = \"Enable fake ambient occlusion factor based on the orbit trap.\"}",
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
  slot: 51,
});
Object.assign(s52, {
  ...s,
  type: 1,
  name: "[100:0]u8",
  length: 100,
  byteSize: 101,
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
Object.assign(s53, {
  ...s,
  type: 11,
  name: "*const [100:0]u8",
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
  slot: 135,
});
Object.assign(s54, {
  ...s,
  type: 11,
  name: "*const *const [100:0]u8",
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
  slot: 134,
});
const a52 = new Uint8Array([  ]);
const a53 = new Uint8Array([ 112, 30, 16, 0 ]);
const a54 = new Uint8Array([ 144, 30, 16, 0 ]);
const a55 = new Uint8Array([ 24, 32, 16, 0 ]);
const a56 = new Uint8Array([ 143, 194, 245, 40, 92, 143, 226, 63 ]);
const a57 = new Uint8Array([ 16, 32, 16, 0 ]);
const a58 = new Uint8Array([ 68, 36, 16, 0 ]);
const a59 = new Uint8Array([ 69, 109, 112, 104, 97, 115, 105, 115, 101, 32, 116, 104, 101, 32, 115, 116, 114, 117, 99, 116, 117, 114, 101, 32, 101, 100, 103, 101, 115, 32, 98, 97, 115, 101, 100, 32, 111, 110, 32, 116, 104, 101, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 115, 116, 101, 112, 115, 32, 105, 116, 32, 116, 97, 107, 101, 115, 32, 116, 111, 32, 114, 101, 97, 99, 104, 32, 97, 32, 112, 111, 105, 110, 116, 32, 105, 110, 32, 116, 104, 101, 32, 102, 114, 97, 99, 116, 97, 108, 46, 0 ]);
Object.assign(s55, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.58, comptime description: *const [100:0]u8 = \"Emphasise the structure edges based on the number of steps it takes to reach a point in the fractal.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s54,
      },
    ],
    methods: [],
    template: {
      memory: { array: a52 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a53 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a54 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a55 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a56 },
              address: 1056792,
            },
          },
        },
        3: {
          structure: s54,
          memory: { array: a57 },
          slots: {
            0: {
              structure: s53,
              memory: { array: a58 },
              address: 1056784,
              slots: {
                0: {
                  structure: s52,
                  memory: { array: a59 },
                  address: 1057860,
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
Object.assign(s56, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.58, comptime description: *const [100:0]u8 = \"Emphasise the structure edges based on the number of steps it takes to reach a point in the fractal.\"}",
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
  slot: 53,
});
Object.assign(s57, {
  ...s,
  type: 1,
  name: "[66:0]u8",
  length: 66,
  byteSize: 67,
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
Object.assign(s58, {
  ...s,
  type: 11,
  name: "*const [66:0]u8",
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
  slot: 138,
});
Object.assign(s59, {
  ...s,
  type: 11,
  name: "*const *const [66:0]u8",
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
  slot: 137,
});
const a60 = new Uint8Array([  ]);
const a61 = new Uint8Array([ 144, 30, 16, 0 ]);
const a62 = new Uint8Array([ 8, 32, 16, 0 ]);
const a63 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 48, 64 ]);
const a64 = new Uint8Array([ 0, 32, 16, 0 ]);
const a65 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 4, 64 ]);
const a66 = new Uint8Array([ 248, 31, 16, 0 ]);
const a67 = new Uint8Array([ 1, 36, 16, 0 ]);
const a68 = new Uint8Array([ 83, 101, 116, 115, 32, 116, 104, 101, 32, 98, 111, 117, 110, 100, 105, 110, 103, 32, 115, 112, 104, 101, 114, 101, 32, 114, 97, 100, 105, 117, 115, 32, 116, 111, 32, 104, 101, 108, 112, 32, 97, 99, 99, 101, 108, 101, 114, 97, 116, 101, 32, 116, 104, 101, 32, 114, 97, 121, 116, 114, 97, 99, 105, 110, 103, 46, 0 ]);
Object.assign(s60, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 16, comptime defaultValue: comptime_float = 2.5, comptime description: *const [66:0]u8 = \"Sets the bounding sphere radius to help accelerate the raytracing.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s59,
      },
    ],
    methods: [],
    template: {
      memory: { array: a60 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a61 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a62 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a63 },
              address: 1056776,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a64 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a65 },
              address: 1056768,
            },
          },
        },
        3: {
          structure: s59,
          memory: { array: a66 },
          slots: {
            0: {
              structure: s58,
              memory: { array: a67 },
              address: 1056760,
              slots: {
                0: {
                  structure: s57,
                  memory: { array: a68 },
                  address: 1057793,
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
Object.assign(s61, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 16, comptime defaultValue: comptime_float = 2.5, comptime description: *const [66:0]u8 = \"Sets the bounding sphere radius to help accelerate the raytracing.\"}",
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
  slot: 55,
});
Object.assign(s62, {
  ...s,
  type: 1,
  name: "[101:0]u8",
  length: 101,
  byteSize: 102,
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
Object.assign(s63, {
  ...s,
  type: 11,
  name: "*const [101:0]u8",
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
  slot: 141,
});
Object.assign(s64, {
  ...s,
  type: 11,
  name: "*const *const [101:0]u8",
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
  slot: 140,
});
const a69 = new Uint8Array([  ]);
const a70 = new Uint8Array([ 240, 31, 16, 0 ]);
const a71 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 224, 63 ]);
const a72 = new Uint8Array([ 232, 31, 16, 0 ]);
const a73 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 40, 64 ]);
const a74 = new Uint8Array([ 0, 31, 16, 0 ]);
const a75 = new Uint8Array([ 224, 31, 16, 0 ]);
const a76 = new Uint8Array([ 155, 35, 16, 0 ]);
const a77 = new Uint8Array([ 83, 101, 116, 115, 32, 116, 104, 101, 32, 98, 97, 105, 108, 111, 117, 116, 32, 118, 97, 108, 117, 101, 32, 102, 111, 114, 32, 116, 104, 101, 32, 102, 114, 97, 99, 116, 97, 108, 32, 99, 97, 108, 99, 117, 108, 97, 116, 105, 111, 110, 46, 32, 76, 111, 119, 101, 114, 32, 118, 97, 108, 117, 101, 115, 32, 103, 105, 118, 101, 32, 115, 109, 111, 111, 116, 104, 101, 114, 32, 108, 101, 115, 115, 32, 100, 101, 116, 97, 105, 108, 101, 100, 32, 114, 101, 115, 117, 108, 116, 115, 46, 0 ]);
Object.assign(s65, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0.5, comptime maxValue: comptime_float = 12, comptime defaultValue: comptime_float = 4, comptime description: *const [101:0]u8 = \"Sets the bailout value for the fractal calculation. Lower values give smoother less detailed results.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s64,
      },
    ],
    methods: [],
    template: {
      memory: { array: a69 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a70 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a71 },
              address: 1056752,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a72 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a73 },
              address: 1056744,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a74 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a30 },
              address: 1056512,
            },
          },
        },
        3: {
          structure: s64,
          memory: { array: a75 },
          slots: {
            0: {
              structure: s63,
              memory: { array: a76 },
              address: 1056736,
              slots: {
                0: {
                  structure: s62,
                  memory: { array: a77 },
                  address: 1057691,
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
Object.assign(s66, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0.5, comptime maxValue: comptime_float = 12, comptime defaultValue: comptime_float = 4, comptime description: *const [101:0]u8 = \"Sets the bailout value for the fractal calculation. Lower values give smoother less detailed results.\"}",
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
  slot: 57,
});
const a78 = new Uint8Array([  ]);
const a79 = new Uint8Array([ 216, 31, 16, 0 ]);
const a80 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 52, 192 ]);
const a81 = new Uint8Array([ 208, 31, 16, 0 ]);
const a82 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 52, 64 ]);
const a83 = new Uint8Array([ 200, 31, 16, 0 ]);
const a84 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 32, 64 ]);
const a85 = new Uint8Array([ 196, 31, 16, 0 ]);
const a86 = new Uint8Array([ 129, 35, 16, 0 ]);
const a87 = new Uint8Array([ 84, 104, 101, 32, 112, 111, 119, 101, 114, 32, 111, 102, 32, 116, 104, 101, 32, 102, 114, 97, 99, 116, 97, 108, 46, 0 ]);
Object.assign(s67, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = -20, comptime maxValue: comptime_float = 20, comptime defaultValue: comptime_float = 8, comptime description: *const [25:0]u8 = \"The power of the fractal.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s26,
      },
    ],
    methods: [],
    template: {
      memory: { array: a78 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a79 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a80 },
              address: 1056728,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a81 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a82 },
              address: 1056720,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a83 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a84 },
              address: 1056712,
            },
          },
        },
        3: {
          structure: s26,
          memory: { array: a85 },
          slots: {
            0: {
              structure: s25,
              memory: { array: a86 },
              address: 1056708,
              slots: {
                0: {
                  structure: s24,
                  memory: { array: a87 },
                  address: 1057665,
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
Object.assign(s68, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = -20, comptime maxValue: comptime_float = 20, comptime defaultValue: comptime_float = 8, comptime description: *const [25:0]u8 = \"The power of the fractal.\"}",
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
Object.assign(s69, {
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
        structure: s34,
      },
    ],
    methods: [],
    template: null
  },
  slot: 32,
});
const a88 = new Uint8Array([  ]);
const a89 = new Uint8Array([ 24, 31, 16, 0 ]);
const a90 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 192 ]);
const a91 = new Uint8Array([ 24, 31, 16, 0 ]);
Object.assign(s70, {
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a88 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a89 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a90 },
              address: 1056536,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a91 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a90 },
              address: 1056536,
            },
          },
        },
      },
    },
  },
  slot: 144,
});
Object.assign(s71, {
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
        structure: s70,
      },
    ],
    methods: [],
    template: null
  },
  slot: 143,
});
const a92 = new Uint8Array([  ]);
const a93 = new Uint8Array([ 16, 31, 16, 0 ]);
const a94 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 64 ]);
const a95 = new Uint8Array([ 16, 31, 16, 0 ]);
Object.assign(s72, {
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a92 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a93 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a94 },
              address: 1056528,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a95 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a94 },
              address: 1056528,
            },
          },
        },
      },
    },
  },
  slot: 146,
});
Object.assign(s73, {
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
        structure: s72,
      },
    ],
    methods: [],
    template: null
  },
  slot: 145,
});
const a96 = new Uint8Array([  ]);
const a97 = new Uint8Array([ 112, 30, 16, 0 ]);
const a98 = new Uint8Array([ 112, 30, 16, 0 ]);
Object.assign(s74, {
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a96 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a97 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a98 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
      },
    },
  },
  slot: 148,
});
Object.assign(s75, {
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
        structure: s74,
      },
    ],
    methods: [],
    template: null
  },
  slot: 147,
});
Object.assign(s76, {
  ...s,
  type: 1,
  name: "[110:0]u8",
  length: 110,
  byteSize: 111,
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
Object.assign(s77, {
  ...s,
  type: 11,
  name: "*const [110:0]u8",
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
Object.assign(s78, {
  ...s,
  type: 11,
  name: "*const *const [110:0]u8",
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
  slot: 149,
});
const a99 = new Uint8Array([  ]);
const a100 = new Uint8Array([ 170, 170, 170, 170 ]);
const a101 = new Uint8Array([  ]);
const a102 = new Uint8Array([ 170, 170, 170, 170 ]);
const a103 = new Uint8Array([ 170, 170, 170, 170 ]);
const a104 = new Uint8Array([ 192, 31, 16, 0 ]);
const a105 = new Uint8Array([ 18, 35, 16, 0 ]);
const a106 = new Uint8Array([ 84, 119, 101, 97, 107, 32, 116, 104, 101, 32, 109, 97, 112, 112, 105, 110, 103, 32, 111, 102, 32, 116, 104, 101, 32, 116, 114, 105, 112, 108, 101, 120, 32, 110, 117, 109, 98, 101, 114, 115, 32, 105, 110, 116, 111, 32, 115, 112, 104, 101, 114, 105, 99, 97, 108, 32, 99, 111, 45, 111, 114, 100, 105, 110, 97, 116, 101, 115, 32, 45, 32, 105, 110, 32, 111, 116, 104, 101, 114, 32, 119, 111, 114, 100, 115, 32, 116, 119, 101, 97, 107, 32, 116, 104, 101, 32, 115, 117, 114, 102, 97, 99, 101, 32, 115, 104, 97, 112, 101, 46, 0 ]);
Object.assign(s79, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -2, comptime comptime_float = -2} = .{-2, -2}, comptime maxValue: struct{comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [110:0]u8 = \"Tweak the mapping of the triplex numbers into spherical co-ordinates - in other words tweak the surface shape.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s69,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s71,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s73,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s75,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s78,
      },
    ],
    methods: [],
    template: {
      memory: { array: a99 },
      slots: {
        0: {
          structure: s71,
          memory: { array: a100 },
          slots: {
            0: {
              structure: s70,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s73,
          memory: { array: a102 },
          slots: {
            0: {
              structure: s72,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s75,
          memory: { array: a103 },
          slots: {
            0: {
              structure: s74,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s78,
          memory: { array: a104 },
          slots: {
            0: {
              structure: s77,
              memory: { array: a105 },
              address: 1056704,
              slots: {
                0: {
                  structure: s76,
                  memory: { array: a106 },
                  address: 1057554,
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
Object.assign(s80, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -2, comptime comptime_float = -2} = .{-2, -2}, comptime maxValue: struct{comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [110:0]u8 = \"Tweak the mapping of the triplex numbers into spherical co-ordinates - in other words tweak the surface shape.\"}",
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
  slot: 61,
});
Object.assign(s81, {
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
        structure: s34,
      },
    ],
    methods: [],
    template: null
  },
  slot: 33,
});
const a107 = new Uint8Array([  ]);
const a108 = new Uint8Array([ 24, 31, 16, 0 ]);
const a109 = new Uint8Array([ 24, 31, 16, 0 ]);
const a110 = new Uint8Array([ 24, 31, 16, 0 ]);
Object.assign(s82, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -2, comptime comptime_float = -2, comptime comptime_float = -2}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a107 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a108 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a90 },
              address: 1056536,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a109 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a90 },
              address: 1056536,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a110 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a90 },
              address: 1056536,
            },
          },
        },
      },
    },
  },
  slot: 153,
});
Object.assign(s83, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -2, comptime comptime_float = -2, comptime comptime_float = -2}",
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
  slot: 152,
});
const a111 = new Uint8Array([  ]);
const a112 = new Uint8Array([ 16, 31, 16, 0 ]);
const a113 = new Uint8Array([ 16, 31, 16, 0 ]);
const a114 = new Uint8Array([ 16, 31, 16, 0 ]);
Object.assign(s84, {
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a111 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a112 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a94 },
              address: 1056528,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a113 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a94 },
              address: 1056528,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a114 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a94 },
              address: 1056528,
            },
          },
        },
      },
    },
  },
  slot: 155,
});
Object.assign(s85, {
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
        structure: s84,
      },
    ],
    methods: [],
    template: null
  },
  slot: 154,
});
const a115 = new Uint8Array([  ]);
const a116 = new Uint8Array([ 144, 30, 16, 0 ]);
const a117 = new Uint8Array([ 112, 30, 16, 0 ]);
const a118 = new Uint8Array([ 112, 30, 16, 0 ]);
Object.assign(s86, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 1, comptime comptime_float = 0, comptime comptime_float = 0}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a115 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a116 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a117 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a118 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
      },
    },
  },
  slot: 157,
});
Object.assign(s87, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 1, comptime comptime_float = 0, comptime comptime_float = 0}",
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
  slot: 156,
});
Object.assign(s88, {
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
  slot: 160,
});
Object.assign(s89, {
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
        structure: s88,
      },
    ],
    methods: [],
    template: null
  },
  slot: 159,
});
Object.assign(s90, {
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
        structure: s89,
      },
    ],
    methods: [],
    template: null
  },
  slot: 158,
});
const a119 = new Uint8Array([  ]);
const a120 = new Uint8Array([ 170, 170, 170, 170 ]);
const a121 = new Uint8Array([ 170, 170, 170, 170 ]);
const a122 = new Uint8Array([ 170, 170, 170, 170 ]);
const a123 = new Uint8Array([ 188, 31, 16, 0 ]);
const a124 = new Uint8Array([ 236, 34, 16, 0 ]);
const a125 = new Uint8Array([ 84, 104, 101, 32, 99, 32, 99, 111, 110, 115, 116, 97, 110, 116, 32, 102, 111, 114, 32, 74, 117, 108, 105, 97, 32, 115, 101, 116, 32, 102, 114, 97, 99, 116, 97, 108, 115, 0 ]);
Object.assign(s91, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -2, comptime comptime_float = -2, comptime comptime_float = -2} = .{-2, -2, -2}, comptime maxValue: struct{comptime comptime_float = 2, comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2, 2}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 0, comptime comptime_float = 0} = .{1, 0, 0}, comptime description: *const [37:0]u8 = \"The c constant for Julia set fractals\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s81,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s83,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s85,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s87,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s90,
      },
    ],
    methods: [],
    template: {
      memory: { array: a119 },
      slots: {
        0: {
          structure: s83,
          memory: { array: a120 },
          slots: {
            0: {
              structure: s82,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s85,
          memory: { array: a121 },
          slots: {
            0: {
              structure: s84,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s87,
          memory: { array: a122 },
          slots: {
            0: {
              structure: s86,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s90,
          memory: { array: a123 },
          slots: {
            0: {
              structure: s89,
              memory: { array: a124 },
              address: 1056700,
              slots: {
                0: {
                  structure: s88,
                  memory: { array: a125 },
                  address: 1057516,
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
Object.assign(s92, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -2, comptime comptime_float = -2, comptime comptime_float = -2} = .{-2, -2, -2}, comptime maxValue: struct{comptime comptime_float = 2, comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2, 2}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 0, comptime comptime_float = 0} = .{1, 0, 0}, comptime description: *const [37:0]u8 = \"The c constant for Julia set fractals\"}",
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
  slot: 63,
});
const a126 = new Uint8Array([  ]);
const a127 = new Uint8Array([ 8, 31, 16, 0 ]);
const a128 = new Uint8Array([ 8, 31, 16, 0 ]);
const a129 = new Uint8Array([ 8, 31, 16, 0 ]);
Object.assign(s93, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -4, comptime comptime_float = -4, comptime comptime_float = -4}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a126 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a127 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a28 },
              address: 1056520,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a128 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a28 },
              address: 1056520,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a129 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a28 },
              address: 1056520,
            },
          },
        },
      },
    },
  },
  slot: 162,
});
Object.assign(s94, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -4, comptime comptime_float = -4, comptime comptime_float = -4}",
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
  slot: 161,
});
const a130 = new Uint8Array([  ]);
const a131 = new Uint8Array([ 0, 31, 16, 0 ]);
const a132 = new Uint8Array([ 0, 31, 16, 0 ]);
const a133 = new Uint8Array([ 0, 31, 16, 0 ]);
Object.assign(s95, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 4, comptime comptime_float = 4, comptime comptime_float = 4}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a130 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a131 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a30 },
              address: 1056512,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a132 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a30 },
              address: 1056512,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a133 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a30 },
              address: 1056512,
            },
          },
        },
      },
    },
  },
  slot: 164,
});
Object.assign(s96, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 4, comptime comptime_float = 4, comptime comptime_float = 4}",
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
  slot: 163,
});
const a134 = new Uint8Array([  ]);
const a135 = new Uint8Array([ 112, 30, 16, 0 ]);
const a136 = new Uint8Array([ 248, 30, 16, 0 ]);
const a137 = new Uint8Array([ 205, 204, 204, 204, 204, 204, 4, 192 ]);
const a138 = new Uint8Array([ 112, 30, 16, 0 ]);
Object.assign(s97, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0, comptime comptime_float = -2.6, comptime comptime_float = 0}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a134 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a135 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a136 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a137 },
              address: 1056504,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a138 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
      },
    },
  },
  slot: 166,
});
Object.assign(s98, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0, comptime comptime_float = -2.6, comptime comptime_float = 0}",
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
  slot: 165,
});
Object.assign(s99, {
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
  slot: 169,
});
Object.assign(s100, {
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
        structure: s99,
      },
    ],
    methods: [],
    template: null
  },
  slot: 168,
});
Object.assign(s101, {
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
        structure: s100,
      },
    ],
    methods: [],
    template: null
  },
  slot: 167,
});
const a139 = new Uint8Array([  ]);
const a140 = new Uint8Array([ 170, 170, 170, 170 ]);
const a141 = new Uint8Array([ 170, 170, 170, 170 ]);
const a142 = new Uint8Array([ 170, 170, 170, 170 ]);
const a143 = new Uint8Array([ 184, 31, 16, 0 ]);
const a144 = new Uint8Array([ 219, 34, 16, 0 ]);
const a145 = new Uint8Array([ 67, 97, 109, 101, 114, 97, 32, 112, 111, 115, 105, 116, 105, 111, 110, 46, 0 ]);
Object.assign(s102, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -4, comptime comptime_float = -4, comptime comptime_float = -4} = .{-4, -4, -4}, comptime maxValue: struct{comptime comptime_float = 4, comptime comptime_float = 4, comptime comptime_float = 4} = .{4, 4, 4}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = -2.6, comptime comptime_float = 0} = .{0, -2.6, 0}, comptime description: *const [16:0]u8 = \"Camera position.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s81,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s94,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s96,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s98,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s101,
      },
    ],
    methods: [],
    template: {
      memory: { array: a139 },
      slots: {
        0: {
          structure: s94,
          memory: { array: a140 },
          slots: {
            0: {
              structure: s93,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s96,
          memory: { array: a141 },
          slots: {
            0: {
              structure: s95,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s98,
          memory: { array: a142 },
          slots: {
            0: {
              structure: s97,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s101,
          memory: { array: a143 },
          slots: {
            0: {
              structure: s100,
              memory: { array: a144 },
              address: 1056696,
              slots: {
                0: {
                  structure: s99,
                  memory: { array: a145 },
                  address: 1057499,
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
Object.assign(s103, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -4, comptime comptime_float = -4, comptime comptime_float = -4} = .{-4, -4, -4}, comptime maxValue: struct{comptime comptime_float = 4, comptime comptime_float = 4, comptime comptime_float = 4} = .{4, 4, 4}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = -2.6, comptime comptime_float = 0} = .{0, -2.6, 0}, comptime description: *const [16:0]u8 = \"Camera position.\"}",
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
  slot: 65,
});
const a146 = new Uint8Array([  ]);
const a147 = new Uint8Array([ 240, 30, 16, 0 ]);
const a148 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 185, 191 ]);
const a149 = new Uint8Array([ 240, 30, 16, 0 ]);
const a150 = new Uint8Array([ 240, 30, 16, 0 ]);
Object.assign(s104, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -0.1, comptime comptime_float = -0.1, comptime comptime_float = -0.1}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a146 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a147 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a148 },
              address: 1056496,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a149 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a148 },
              address: 1056496,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a150 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a148 },
              address: 1056496,
            },
          },
        },
      },
    },
  },
  slot: 171,
});
Object.assign(s105, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -0.1, comptime comptime_float = -0.1, comptime comptime_float = -0.1}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s104,
      },
    ],
    methods: [],
    template: null
  },
  slot: 170,
});
const a151 = new Uint8Array([  ]);
const a152 = new Uint8Array([ 232, 30, 16, 0 ]);
const a153 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 185, 63 ]);
const a154 = new Uint8Array([ 232, 30, 16, 0 ]);
const a155 = new Uint8Array([ 232, 30, 16, 0 ]);
Object.assign(s106, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.1, comptime comptime_float = 0.1, comptime comptime_float = 0.1}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a151 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a152 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a153 },
              address: 1056488,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a154 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a153 },
              address: 1056488,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a155 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a153 },
              address: 1056488,
            },
          },
        },
      },
    },
  },
  slot: 173,
});
Object.assign(s107, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.1, comptime comptime_float = 0.1, comptime comptime_float = 0.1}",
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
  slot: 172,
});
const a156 = new Uint8Array([  ]);
const a157 = new Uint8Array([ 112, 30, 16, 0 ]);
const a158 = new Uint8Array([ 112, 30, 16, 0 ]);
const a159 = new Uint8Array([ 112, 30, 16, 0 ]);
Object.assign(s108, {
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a156 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a157 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a158 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a159 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
      },
    },
  },
  slot: 175,
});
Object.assign(s109, {
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
        structure: s108,
      },
    ],
    methods: [],
    template: null
  },
  slot: 174,
});
const a160 = new Uint8Array([  ]);
const a161 = new Uint8Array([ 170, 170, 170, 170 ]);
const a162 = new Uint8Array([ 170, 170, 170, 170 ]);
const a163 = new Uint8Array([ 170, 170, 170, 170 ]);
const a164 = new Uint8Array([ 180, 31, 16, 0 ]);
const a165 = new Uint8Array([ 199, 34, 16, 0 ]);
const a166 = new Uint8Array([ 70, 105, 110, 101, 32, 116, 117, 110, 101, 32, 112, 111, 115, 105, 116, 105, 111, 110, 46, 0 ]);
Object.assign(s110, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -0.1, comptime comptime_float = -0.1, comptime comptime_float = -0.1} = .{-0.1, -0.1, -0.1}, comptime maxValue: struct{comptime comptime_float = 0.1, comptime comptime_float = 0.1, comptime comptime_float = 0.1} = .{0.1, 0.1, 0.1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime description: *const [19:0]u8 = \"Fine tune position.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s81,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s105,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s107,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s109,
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
      memory: { array: a160 },
      slots: {
        0: {
          structure: s105,
          memory: { array: a161 },
          slots: {
            0: {
              structure: s104,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s107,
          memory: { array: a162 },
          slots: {
            0: {
              structure: s106,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s109,
          memory: { array: a163 },
          slots: {
            0: {
              structure: s108,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s3,
          memory: { array: a164 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a165 },
              address: 1056692,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a166 },
                  address: 1057479,
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
Object.assign(s111, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -0.1, comptime comptime_float = -0.1, comptime comptime_float = -0.1} = .{-0.1, -0.1, -0.1}, comptime maxValue: struct{comptime comptime_float = 0.1, comptime comptime_float = 0.1, comptime comptime_float = 0.1} = .{0.1, 0.1, 0.1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime description: *const [19:0]u8 = \"Fine tune position.\"}",
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
  slot: 67,
});
const a167 = new Uint8Array([  ]);
const a168 = new Uint8Array([ 224, 30, 16, 0 ]);
const a169 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 102, 192 ]);
const a170 = new Uint8Array([ 224, 30, 16, 0 ]);
const a171 = new Uint8Array([ 224, 30, 16, 0 ]);
Object.assign(s112, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a167 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a168 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a169 },
              address: 1056480,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a170 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a169 },
              address: 1056480,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a171 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a169 },
              address: 1056480,
            },
          },
        },
      },
    },
  },
  slot: 177,
});
Object.assign(s113, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180}",
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
  slot: 176,
});
const a172 = new Uint8Array([  ]);
const a173 = new Uint8Array([ 216, 30, 16, 0 ]);
const a174 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 102, 64 ]);
const a175 = new Uint8Array([ 216, 30, 16, 0 ]);
const a176 = new Uint8Array([ 216, 30, 16, 0 ]);
Object.assign(s114, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a172 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a173 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a174 },
              address: 1056472,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a175 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a174 },
              address: 1056472,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a176 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a174 },
              address: 1056472,
            },
          },
        },
      },
    },
  },
  slot: 179,
});
Object.assign(s115, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180}",
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
  slot: 178,
});
const a177 = new Uint8Array([  ]);
const a178 = new Uint8Array([ 112, 30, 16, 0 ]);
const a179 = new Uint8Array([ 112, 30, 16, 0 ]);
const a180 = new Uint8Array([ 208, 30, 16, 0 ]);
const a181 = new Uint8Array([ 0, 0, 0, 0, 0, 128, 86, 192 ]);
Object.assign(s116, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = -90}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a177 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a178 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a179 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a180 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a181 },
              address: 1056464,
            },
          },
        },
      },
    },
  },
  slot: 181,
});
Object.assign(s117, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = -90}",
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
  slot: 180,
});
Object.assign(s118, {
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
  slot: 184,
});
Object.assign(s119, {
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
        structure: s118,
      },
    ],
    methods: [],
    template: null
  },
  slot: 183,
});
Object.assign(s120, {
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
        structure: s119,
      },
    ],
    methods: [],
    template: null
  },
  slot: 182,
});
const a182 = new Uint8Array([  ]);
const a183 = new Uint8Array([ 170, 170, 170, 170 ]);
const a184 = new Uint8Array([ 170, 170, 170, 170 ]);
const a185 = new Uint8Array([ 170, 170, 170, 170 ]);
const a186 = new Uint8Array([ 176, 31, 16, 0 ]);
const a187 = new Uint8Array([ 156, 34, 16, 0 ]);
const a188 = new Uint8Array([ 80, 111, 105, 110, 116, 105, 110, 103, 32, 97, 110, 103, 108, 101, 32, 105, 110, 32, 101, 97, 99, 104, 32, 97, 120, 105, 115, 32, 111, 102, 32, 116, 104, 101, 32, 99, 97, 109, 101, 114, 97, 46, 0 ]);
Object.assign(s121, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180} = .{-180, -180, -180}, comptime maxValue: struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180} = .{180, 180, 180}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = -90} = .{0, 0, -90}, comptime description: *const [42:0]u8 = \"Pointing angle in each axis of the camera.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s81,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s113,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s115,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s117,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s120,
      },
    ],
    methods: [],
    template: {
      memory: { array: a182 },
      slots: {
        0: {
          structure: s113,
          memory: { array: a183 },
          slots: {
            0: {
              structure: s112,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s115,
          memory: { array: a184 },
          slots: {
            0: {
              structure: s114,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s117,
          memory: { array: a185 },
          slots: {
            0: {
              structure: s116,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s120,
          memory: { array: a186 },
          slots: {
            0: {
              structure: s119,
              memory: { array: a187 },
              address: 1056688,
              slots: {
                0: {
                  structure: s118,
                  memory: { array: a188 },
                  address: 1057436,
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
Object.assign(s122, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180} = .{-180, -180, -180}, comptime maxValue: struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180} = .{180, 180, 180}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = -90} = .{0, 0, -90}, comptime description: *const [42:0]u8 = \"Pointing angle in each axis of the camera.\"}",
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
  slot: 69,
});
const a189 = new Uint8Array([  ]);
const a190 = new Uint8Array([ 112, 30, 16, 0 ]);
const a191 = new Uint8Array([ 168, 31, 16, 0 ]);
const a192 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 36, 64 ]);
const a193 = new Uint8Array([ 112, 30, 16, 0 ]);
const a194 = new Uint8Array([ 164, 31, 16, 0 ]);
const a195 = new Uint8Array([ 134, 34, 16, 0 ]);
const a196 = new Uint8Array([ 90, 111, 111, 109, 32, 116, 104, 101, 32, 99, 97, 109, 101, 114, 97, 32, 118, 105, 101, 119, 46, 0 ]);
Object.assign(s123, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 0, comptime description: *const [21:0]u8 = \"Zoom the camera view.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
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
      memory: { array: a189 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a190 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a191 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a192 },
              address: 1056680,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a193 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        3: {
          structure: s21,
          memory: { array: a194 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a195 },
              address: 1056676,
              slots: {
                0: {
                  structure: s19,
                  memory: { array: a196 },
                  address: 1057414,
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
Object.assign(s124, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 0, comptime description: *const [21:0]u8 = \"Zoom the camera view.\"}",
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
  slot: 71,
});
const a197 = new Uint8Array([  ]);
const a198 = new Uint8Array([ 200, 30, 16, 0 ]);
const a199 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 73, 192 ]);
const a200 = new Uint8Array([ 200, 30, 16, 0 ]);
const a201 = new Uint8Array([ 200, 30, 16, 0 ]);
Object.assign(s125, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = -50, comptime comptime_float = -50, comptime comptime_float = -50}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a197 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a198 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a199 },
              address: 1056456,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a200 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a199 },
              address: 1056456,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a201 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a199 },
              address: 1056456,
            },
          },
        },
      },
    },
  },
  slot: 186,
});
Object.assign(s126, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = -50, comptime comptime_float = -50, comptime comptime_float = -50}",
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
  slot: 185,
});
const a202 = new Uint8Array([  ]);
const a203 = new Uint8Array([ 192, 30, 16, 0 ]);
const a204 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 73, 64 ]);
const a205 = new Uint8Array([ 192, 30, 16, 0 ]);
const a206 = new Uint8Array([ 192, 30, 16, 0 ]);
Object.assign(s127, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 50, comptime comptime_float = 50, comptime comptime_float = 50}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a202 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a203 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a204 },
              address: 1056448,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a205 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a204 },
              address: 1056448,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a206 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a204 },
              address: 1056448,
            },
          },
        },
      },
    },
  },
  slot: 188,
});
Object.assign(s128, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 50, comptime comptime_float = 50, comptime comptime_float = 50}",
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
  slot: 187,
});
const a207 = new Uint8Array([  ]);
const a208 = new Uint8Array([ 176, 30, 16, 0 ]);
const a209 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 67, 64 ]);
const a210 = new Uint8Array([ 184, 30, 16, 0 ]);
const a211 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 69, 192 ]);
const a212 = new Uint8Array([ 176, 30, 16, 0 ]);
Object.assign(s129, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 38, comptime comptime_float = -42, comptime comptime_float = 38}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a207 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a208 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a209 },
              address: 1056432,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a210 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a211 },
              address: 1056440,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a212 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a209 },
              address: 1056432,
            },
          },
        },
      },
    },
  },
  slot: 190,
});
Object.assign(s130, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 38, comptime comptime_float = -42, comptime comptime_float = 38}",
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
  slot: 189,
});
const a213 = new Uint8Array([  ]);
const a214 = new Uint8Array([ 170, 170, 170, 170 ]);
const a215 = new Uint8Array([ 170, 170, 170, 170 ]);
const a216 = new Uint8Array([ 170, 170, 170, 170 ]);
const a217 = new Uint8Array([ 160, 31, 16, 0 ]);
const a218 = new Uint8Array([ 109, 34, 16, 0 ]);
const a219 = new Uint8Array([ 80, 111, 115, 105, 116, 105, 111, 110, 32, 111, 102, 32, 112, 111, 105, 110, 116, 32, 108, 105, 103, 104, 116, 46, 0 ]);
Object.assign(s131, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -50, comptime comptime_float = -50, comptime comptime_float = -50} = .{-50, -50, -50}, comptime maxValue: struct{comptime comptime_float = 50, comptime comptime_float = 50, comptime comptime_float = 50} = .{50, 50, 50}, comptime defaultValue: struct{comptime comptime_float = 38, comptime comptime_float = -42, comptime comptime_float = 38} = .{38, -42, 38}, comptime description: *const [24:0]u8 = \"Position of point light.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s81,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s126,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s128,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s130,
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
      memory: { array: a213 },
      slots: {
        0: {
          structure: s126,
          memory: { array: a214 },
          slots: {
            0: {
              structure: s125,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s128,
          memory: { array: a215 },
          slots: {
            0: {
              structure: s127,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s130,
          memory: { array: a216 },
          slots: {
            0: {
              structure: s129,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s31,
          memory: { array: a217 },
          slots: {
            0: {
              structure: s30,
              memory: { array: a218 },
              address: 1056672,
              slots: {
                0: {
                  structure: s29,
                  memory: { array: a219 },
                  address: 1057389,
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
Object.assign(s132, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -50, comptime comptime_float = -50, comptime comptime_float = -50} = .{-50, -50, -50}, comptime maxValue: struct{comptime comptime_float = 50, comptime comptime_float = 50, comptime comptime_float = 50} = .{50, 50, 50}, comptime defaultValue: struct{comptime comptime_float = 38, comptime comptime_float = -42, comptime comptime_float = 38} = .{38, -42, 38}, comptime description: *const [24:0]u8 = \"Position of point light.\"}",
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
  slot: 73,
});
const a220 = new Uint8Array([  ]);
const a221 = new Uint8Array([ 144, 30, 16, 0 ]);
const a222 = new Uint8Array([ 144, 30, 16, 0 ]);
const a223 = new Uint8Array([ 144, 30, 16, 0 ]);
Object.assign(s133, {
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a220 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a221 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a222 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a223 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
      },
    },
  },
  slot: 192,
});
Object.assign(s134, {
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
        structure: s133,
      },
    ],
    methods: [],
    template: null
  },
  slot: 191,
});
Object.assign(s135, {
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
  slot: 195,
});
Object.assign(s136, {
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
        structure: s135,
      },
    ],
    methods: [],
    template: null
  },
  slot: 194,
});
Object.assign(s137, {
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
        structure: s136,
      },
    ],
    methods: [],
    template: null
  },
  slot: 193,
});
Object.assign(s138, {
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
  slot: 198,
});
Object.assign(s139, {
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
        structure: s138,
      },
    ],
    methods: [],
    template: null
  },
  slot: 197,
});
Object.assign(s140, {
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
        structure: s139,
      },
    ],
    methods: [],
    template: null
  },
  slot: 196,
});
const a224 = new Uint8Array([  ]);
const a225 = new Uint8Array([ 170, 170, 170, 170 ]);
const a226 = new Uint8Array([ 170, 170, 170, 170 ]);
const a227 = new Uint8Array([ 170, 170, 170, 170 ]);
const a228 = new Uint8Array([ 156, 31, 16, 0 ]);
const a229 = new Uint8Array([ 90, 34, 16, 0 ]);
const a230 = new Uint8Array([ 66, 97, 99, 107, 103, 114, 111, 117, 110, 100, 32, 99, 111, 108, 111, 117, 114, 46, 0 ]);
const a231 = new Uint8Array([ 120, 31, 16, 0 ]);
const a232 = new Uint8Array([ 82, 34, 16, 0 ]);
const a233 = new Uint8Array([ 97, 101, 67, 111, 108, 111, 114, 0 ]);
Object.assign(s141, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime description: *const [18:0]u8 = \"Background colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s81,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s109,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s134,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s109,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s137,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "aeUIControl",
        structure: s140,
      },
    ],
    methods: [],
    template: {
      memory: { array: a224 },
      slots: {
        0: {
          structure: s109,
          memory: { array: a225 },
          slots: {
            0: {
              structure: s108,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s134,
          memory: { array: a226 },
          slots: {
            0: {
              structure: s133,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s109,
          memory: { array: a227 },
          slots: {
            0: {
              structure: s108,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s137,
          memory: { array: a228 },
          slots: {
            0: {
              structure: s136,
              memory: { array: a229 },
              address: 1056668,
              slots: {
                0: {
                  structure: s135,
                  memory: { array: a230 },
                  address: 1057370,
                },
              },
            },
          },
        },
        4: {
          structure: s140,
          memory: { array: a231 },
          slots: {
            0: {
              structure: s139,
              memory: { array: a232 },
              address: 1056632,
              slots: {
                0: {
                  structure: s138,
                  memory: { array: a233 },
                  address: 1057362,
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
Object.assign(s142, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime description: *const [18:0]u8 = \"Background colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
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
  slot: 75,
});
const a234 = new Uint8Array([  ]);
const a235 = new Uint8Array([ 112, 30, 16, 0 ]);
const a236 = new Uint8Array([ 144, 30, 16, 0 ]);
const a237 = new Uint8Array([ 144, 30, 16, 0 ]);
const a238 = new Uint8Array([ 152, 31, 16, 0 ]);
const a239 = new Uint8Array([ 57, 34, 16, 0 ]);
const a240 = new Uint8Array([ 66, 97, 99, 107, 103, 114, 111, 117, 110, 100, 32, 116, 114, 97, 110, 115, 112, 97, 114, 101, 110, 99, 121, 46, 0 ]);
Object.assign(s143, {
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
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
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
      memory: { array: a234 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a235 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a236 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a237 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        3: {
          structure: s31,
          memory: { array: a238 },
          slots: {
            0: {
              structure: s30,
              memory: { array: a239 },
              address: 1056664,
              slots: {
                0: {
                  structure: s29,
                  memory: { array: a240 },
                  address: 1057337,
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
Object.assign(s144, {
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
        structure: s143,
      },
    ],
    methods: [],
    template: null
  },
  slot: 77,
});
const a241 = new Uint8Array([  ]);
const a242 = new Uint8Array([ 112, 30, 16, 0 ]);
const a243 = new Uint8Array([ 152, 30, 16, 0 ]);
const a244 = new Uint8Array([ 51, 51, 51, 51, 51, 51, 235, 63 ]);
const a245 = new Uint8Array([ 168, 30, 16, 0 ]);
const a246 = new Uint8Array([ 174, 71, 225, 122, 20, 174, 239, 63 ]);
Object.assign(s145, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0, comptime comptime_float = 0.85, comptime comptime_float = 0.99}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a241 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a242 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a243 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a244 },
              address: 1056408,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a245 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a246 },
              address: 1056424,
            },
          },
        },
      },
    },
  },
  slot: 200,
});
Object.assign(s146, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0, comptime comptime_float = 0.85, comptime comptime_float = 0.99}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s145,
      },
    ],
    methods: [],
    template: null
  },
  slot: 199,
});
Object.assign(s147, {
  ...s,
  type: 1,
  name: "[15:0]u8",
  length: 15,
  byteSize: 16,
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
  slot: 203,
});
Object.assign(s148, {
  ...s,
  type: 11,
  name: "*const [15:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s147,
      },
    ],
    methods: [],
    template: null
  },
  slot: 202,
});
Object.assign(s149, {
  ...s,
  type: 11,
  name: "*const *const [15:0]u8",
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
  slot: 201,
});
const a247 = new Uint8Array([  ]);
const a248 = new Uint8Array([ 170, 170, 170, 170 ]);
const a249 = new Uint8Array([ 170, 170, 170, 170 ]);
const a250 = new Uint8Array([ 170, 170, 170, 170 ]);
const a251 = new Uint8Array([ 148, 31, 16, 0 ]);
const a252 = new Uint8Array([ 41, 34, 16, 0 ]);
const a253 = new Uint8Array([ 68, 105, 102, 102, 117, 115, 101, 32, 99, 111, 108, 111, 117, 114, 46, 0 ]);
const a254 = new Uint8Array([ 120, 31, 16, 0 ]);
Object.assign(s150, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0.85, comptime comptime_float = 0.99} = .{0, 0.85, 0.99}, comptime description: *const [15:0]u8 = \"Diffuse colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s81,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s109,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s134,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s146,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s149,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "aeUIControl",
        structure: s140,
      },
    ],
    methods: [],
    template: {
      memory: { array: a247 },
      slots: {
        0: {
          structure: s109,
          memory: { array: a248 },
          slots: {
            0: {
              structure: s108,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s134,
          memory: { array: a249 },
          slots: {
            0: {
              structure: s133,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s146,
          memory: { array: a250 },
          slots: {
            0: {
              structure: s145,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s149,
          memory: { array: a251 },
          slots: {
            0: {
              structure: s148,
              memory: { array: a252 },
              address: 1056660,
              slots: {
                0: {
                  structure: s147,
                  memory: { array: a253 },
                  address: 1057321,
                },
              },
            },
          },
        },
        4: {
          structure: s140,
          memory: { array: a254 },
          slots: {
            0: {
              structure: s139,
              memory: { array: a232 },
              address: 1056632,
              slots: {
                0: {
                  structure: s138,
                  memory: { array: a233 },
                  address: 1057362,
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
Object.assign(s151, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0.85, comptime comptime_float = 0.99} = .{0, 0.85, 0.99}, comptime description: *const [15:0]u8 = \"Diffuse colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
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
  slot: 79,
});
const a255 = new Uint8Array([  ]);
const a256 = new Uint8Array([ 160, 30, 16, 0 ]);
const a257 = new Uint8Array([ 113, 61, 10, 215, 163, 112, 229, 63 ]);
const a258 = new Uint8Array([ 152, 30, 16, 0 ]);
const a259 = new Uint8Array([ 144, 30, 16, 0 ]);
Object.assign(s152, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.67, comptime comptime_float = 0.85, comptime comptime_float = 1}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a255 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a256 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a257 },
              address: 1056416,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a258 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a244 },
              address: 1056408,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a259 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
      },
    },
  },
  slot: 205,
});
Object.assign(s153, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.67, comptime comptime_float = 0.85, comptime comptime_float = 1}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s152,
      },
    ],
    methods: [],
    template: null
  },
  slot: 204,
});
const a260 = new Uint8Array([  ]);
const a261 = new Uint8Array([ 170, 170, 170, 170 ]);
const a262 = new Uint8Array([ 170, 170, 170, 170 ]);
const a263 = new Uint8Array([ 170, 170, 170, 170 ]);
const a264 = new Uint8Array([ 144, 31, 16, 0 ]);
const a265 = new Uint8Array([ 19, 34, 16, 0 ]);
const a266 = new Uint8Array([ 65, 109, 98, 105, 101, 110, 116, 32, 108, 105, 103, 104, 116, 32, 99, 111, 108, 111, 117, 114, 46, 0 ]);
const a267 = new Uint8Array([ 120, 31, 16, 0 ]);
Object.assign(s154, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.67, comptime comptime_float = 0.85, comptime comptime_float = 1} = .{0.67, 0.85, 1}, comptime description: *const [21:0]u8 = \"Ambient light colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s81,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s109,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s134,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s153,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s21,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "aeUIControl",
        structure: s140,
      },
    ],
    methods: [],
    template: {
      memory: { array: a260 },
      slots: {
        0: {
          structure: s109,
          memory: { array: a261 },
          slots: {
            0: {
              structure: s108,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s134,
          memory: { array: a262 },
          slots: {
            0: {
              structure: s133,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s153,
          memory: { array: a263 },
          slots: {
            0: {
              structure: s152,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s21,
          memory: { array: a264 },
          slots: {
            0: {
              structure: s20,
              memory: { array: a265 },
              address: 1056656,
              slots: {
                0: {
                  structure: s19,
                  memory: { array: a266 },
                  address: 1057299,
                },
              },
            },
          },
        },
        4: {
          structure: s140,
          memory: { array: a267 },
          slots: {
            0: {
              structure: s139,
              memory: { array: a232 },
              address: 1056632,
              slots: {
                0: {
                  structure: s138,
                  memory: { array: a233 },
                  address: 1057362,
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
Object.assign(s155, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.67, comptime comptime_float = 0.85, comptime comptime_float = 1} = .{0.67, 0.85, 1}, comptime description: *const [21:0]u8 = \"Ambient light colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s154,
      },
    ],
    methods: [],
    template: null
  },
  slot: 81,
});
const a268 = new Uint8Array([  ]);
const a269 = new Uint8Array([ 112, 30, 16, 0 ]);
const a270 = new Uint8Array([ 144, 30, 16, 0 ]);
const a271 = new Uint8Array([ 136, 31, 16, 0 ]);
const a272 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 217, 63 ]);
const a273 = new Uint8Array([ 128, 31, 16, 0 ]);
const a274 = new Uint8Array([ 250, 33, 16, 0 ]);
const a275 = new Uint8Array([ 65, 109, 98, 105, 101, 110, 116, 32, 108, 105, 103, 104, 116, 32, 105, 110, 116, 101, 110, 115, 105, 116, 121, 46, 0 ]);
Object.assign(s156, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.4, comptime description: *const [24:0]u8 = \"Ambient light intensity.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
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
      memory: { array: a268 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a269 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a270 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a271 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a272 },
              address: 1056648,
            },
          },
        },
        3: {
          structure: s31,
          memory: { array: a273 },
          slots: {
            0: {
              structure: s30,
              memory: { array: a274 },
              address: 1056640,
              slots: {
                0: {
                  structure: s29,
                  memory: { array: a275 },
                  address: 1057274,
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
Object.assign(s157, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.4, comptime description: *const [24:0]u8 = \"Ambient light intensity.\"}",
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
  slot: 83,
});
const a276 = new Uint8Array([  ]);
const a277 = new Uint8Array([ 136, 30, 16, 0 ]);
const a278 = new Uint8Array([ 184, 30, 133, 235, 81, 184, 222, 63 ]);
const a279 = new Uint8Array([ 128, 30, 16, 0 ]);
const a280 = new Uint8Array([ 225, 122, 20, 174, 71, 225, 226, 63 ]);
const a281 = new Uint8Array([ 120, 30, 16, 0 ]);
const a282 = new Uint8Array([ 31, 133, 235, 81, 184, 30, 229, 63 ]);
Object.assign(s158, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0.48, comptime comptime_float = 0.59, comptime comptime_float = 0.66}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a276 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a277 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a278 },
              address: 1056392,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a279 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a280 },
              address: 1056384,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a281 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a282 },
              address: 1056376,
            },
          },
        },
      },
    },
  },
  slot: 207,
});
Object.assign(s159, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0.48, comptime comptime_float = 0.59, comptime comptime_float = 0.66}",
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
  slot: 206,
});
Object.assign(s160, {
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
  slot: 210,
});
Object.assign(s161, {
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
        structure: s160,
      },
    ],
    methods: [],
    template: null
  },
  slot: 209,
});
Object.assign(s162, {
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
        structure: s161,
      },
    ],
    methods: [],
    template: null
  },
  slot: 208,
});
const a283 = new Uint8Array([  ]);
const a284 = new Uint8Array([ 170, 170, 170, 170 ]);
const a285 = new Uint8Array([ 170, 170, 170, 170 ]);
const a286 = new Uint8Array([ 170, 170, 170, 170 ]);
const a287 = new Uint8Array([ 124, 31, 16, 0 ]);
const a288 = new Uint8Array([ 236, 33, 16, 0 ]);
const a289 = new Uint8Array([ 76, 105, 103, 104, 116, 32, 99, 111, 108, 111, 117, 114, 46, 0 ]);
const a290 = new Uint8Array([ 120, 31, 16, 0 ]);
Object.assign(s163, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.48, comptime comptime_float = 0.59, comptime comptime_float = 0.66} = .{0.48, 0.59, 0.66}, comptime description: *const [13:0]u8 = \"Light colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s81,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s109,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s134,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s159,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s162,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "aeUIControl",
        structure: s140,
      },
    ],
    methods: [],
    template: {
      memory: { array: a283 },
      slots: {
        0: {
          structure: s109,
          memory: { array: a284 },
          slots: {
            0: {
              structure: s108,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s134,
          memory: { array: a285 },
          slots: {
            0: {
              structure: s133,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s159,
          memory: { array: a286 },
          slots: {
            0: {
              structure: s158,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s162,
          memory: { array: a287 },
          slots: {
            0: {
              structure: s161,
              memory: { array: a288 },
              address: 1056636,
              slots: {
                0: {
                  structure: s160,
                  memory: { array: a289 },
                  address: 1057260,
                },
              },
            },
          },
        },
        4: {
          structure: s140,
          memory: { array: a290 },
          slots: {
            0: {
              structure: s139,
              memory: { array: a232 },
              address: 1056632,
              slots: {
                0: {
                  structure: s138,
                  memory: { array: a233 },
                  address: 1057362,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 86,
});
Object.assign(s164, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.48, comptime comptime_float = 0.59, comptime comptime_float = 0.66} = .{0.48, 0.59, 0.66}, comptime description: *const [13:0]u8 = \"Light colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s163,
      },
    ],
    methods: [],
    template: null
  },
  slot: 85,
});
Object.assign(s165, {
  ...s,
  type: 1,
  name: "[46:0]u8",
  length: 46,
  byteSize: 47,
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
  slot: 213,
});
Object.assign(s166, {
  ...s,
  type: 11,
  name: "*const [46:0]u8",
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
  slot: 212,
});
Object.assign(s167, {
  ...s,
  type: 11,
  name: "*const *const [46:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s166,
      },
    ],
    methods: [],
    template: null
  },
  slot: 211,
});
const a291 = new Uint8Array([  ]);
const a292 = new Uint8Array([ 112, 30, 16, 0 ]);
const a293 = new Uint8Array([ 144, 30, 16, 0 ]);
const a294 = new Uint8Array([ 112, 31, 16, 0 ]);
const a295 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 201, 63 ]);
const a296 = new Uint8Array([ 104, 31, 16, 0 ]);
const a297 = new Uint8Array([ 189, 33, 16, 0 ]);
const a298 = new Uint8Array([ 86, 97, 114, 121, 32, 116, 104, 101, 32, 99, 111, 108, 111, 117, 114, 32, 98, 97, 115, 101, 100, 32, 111, 110, 32, 116, 104, 101, 32, 110, 111, 114, 109, 97, 108, 32, 100, 105, 114, 101, 99, 116, 105, 111, 110, 46, 0 ]);
Object.assign(s168, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.2, comptime description: *const [46:0]u8 = \"Vary the colour based on the normal direction.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s167,
      },
    ],
    methods: [],
    template: {
      memory: { array: a291 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a292 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a293 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a294 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a295 },
              address: 1056624,
            },
          },
        },
        3: {
          structure: s167,
          memory: { array: a296 },
          slots: {
            0: {
              structure: s166,
              memory: { array: a297 },
              address: 1056616,
              slots: {
                0: {
                  structure: s165,
                  memory: { array: a298 },
                  address: 1057213,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 88,
});
Object.assign(s169, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.2, comptime description: *const [46:0]u8 = \"Vary the colour based on the normal direction.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s168,
      },
    ],
    methods: [],
    template: null
  },
  slot: 87,
});
Object.assign(s170, {
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
  slot: 216,
});
Object.assign(s171, {
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
        structure: s170,
      },
    ],
    methods: [],
    template: null
  },
  slot: 215,
});
Object.assign(s172, {
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
        structure: s171,
      },
    ],
    methods: [],
    template: null
  },
  slot: 214,
});
const a299 = new Uint8Array([  ]);
const a300 = new Uint8Array([ 112, 30, 16, 0 ]);
const a301 = new Uint8Array([ 144, 30, 16, 0 ]);
const a302 = new Uint8Array([ 112, 30, 16, 0 ]);
const a303 = new Uint8Array([ 100, 31, 16, 0 ]);
const a304 = new Uint8Array([ 171, 33, 16, 0 ]);
const a305 = new Uint8Array([ 82, 105, 109, 32, 108, 105, 103, 104, 116, 32, 102, 97, 99, 116, 111, 114, 46, 0 ]);
Object.assign(s173, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [17:0]u8 = \"Rim light factor.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s172,
      },
    ],
    methods: [],
    template: {
      memory: { array: a299 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a300 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a301 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a302 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        3: {
          structure: s172,
          memory: { array: a303 },
          slots: {
            0: {
              structure: s171,
              memory: { array: a304 },
              address: 1056612,
              slots: {
                0: {
                  structure: s170,
                  memory: { array: a305 },
                  address: 1057195,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 90,
});
Object.assign(s174, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [17:0]u8 = \"Rim light factor.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s173,
      },
    ],
    methods: [],
    template: null
  },
  slot: 89,
});
const a306 = new Uint8Array([  ]);
const a307 = new Uint8Array([ 112, 30, 16, 0 ]);
const a308 = new Uint8Array([ 144, 30, 16, 0 ]);
const a309 = new Uint8Array([ 120, 30, 16, 0 ]);
const a310 = new Uint8Array([ 96, 31, 16, 0 ]);
const a311 = new Uint8Array([ 153, 33, 16, 0 ]);
const a312 = new Uint8Array([ 80, 104, 111, 110, 101, 32, 115, 112, 101, 99, 117, 108, 97, 114, 105, 116, 121, 0 ]);
Object.assign(s175, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.66, comptime description: *const [17:0]u8 = \"Phone specularity\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s172,
      },
    ],
    methods: [],
    template: {
      memory: { array: a306 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a307 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a308 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a309 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a282 },
              address: 1056376,
            },
          },
        },
        3: {
          structure: s172,
          memory: { array: a310 },
          slots: {
            0: {
              structure: s171,
              memory: { array: a311 },
              address: 1056608,
              slots: {
                0: {
                  structure: s170,
                  memory: { array: a312 },
                  address: 1057177,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 92,
});
Object.assign(s176, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.66, comptime description: *const [17:0]u8 = \"Phone specularity\"}",
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
  slot: 91,
});
const a313 = new Uint8Array([  ]);
const a314 = new Uint8Array([ 232, 30, 16, 0 ]);
const a315 = new Uint8Array([ 192, 30, 16, 0 ]);
const a316 = new Uint8Array([ 88, 31, 16, 0 ]);
const a317 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 46, 64 ]);
const a318 = new Uint8Array([ 80, 31, 16, 0 ]);
const a319 = new Uint8Array([ 137, 33, 16, 0 ]);
const a320 = new Uint8Array([ 80, 104, 111, 110, 103, 32, 115, 104, 105, 110, 105, 110, 101, 115, 115, 0 ]);
Object.assign(s177, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 50, comptime defaultValue: comptime_float = 15, comptime description: *const [15:0]u8 = \"Phong shininess\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s149,
      },
    ],
    methods: [],
    template: {
      memory: { array: a313 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a314 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a153 },
              address: 1056488,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a315 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a204 },
              address: 1056448,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a316 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a317 },
              address: 1056600,
            },
          },
        },
        3: {
          structure: s149,
          memory: { array: a318 },
          slots: {
            0: {
              structure: s148,
              memory: { array: a319 },
              address: 1056592,
              slots: {
                0: {
                  structure: s147,
                  memory: { array: a320 },
                  address: 1057161,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 94,
});
Object.assign(s178, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 50, comptime defaultValue: comptime_float = 15, comptime description: *const [15:0]u8 = \"Phong shininess\"}",
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
  slot: 93,
});
const a321 = new Uint8Array([  ]);
const a322 = new Uint8Array([ 112, 30, 16, 0 ]);
const a323 = new Uint8Array([ 104, 30, 16, 0 ]);
const a324 = new Uint8Array([ 0, 0, 0, 0, 0, 64, 67, 64 ]);
const a325 = new Uint8Array([ 96, 30, 16, 0 ]);
const a326 = new Uint8Array([ 205, 204, 204, 204, 204, 204, 57, 64 ]);
Object.assign(s179, {
  ...s,
  type: 2,
  name: "struct{comptime comptime_float = 0, comptime comptime_float = 38.5, comptime comptime_float = 25.8}",
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "1",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "2",
        structure: s36,
      },
    ],
    methods: [],
    template: {
      memory: { array: a321 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a322 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a32 },
              address: 1056368,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a323 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a324 },
              address: 1056360,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a325 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a326 },
              address: 1056352,
            },
          },
        },
      },
    },
  },
  slot: 218,
});
Object.assign(s180, {
  ...s,
  type: 11,
  name: "*const struct{comptime comptime_float = 0, comptime comptime_float = 38.5, comptime comptime_float = 25.8}",
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
  slot: 217,
});
Object.assign(s181, {
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
  slot: 221,
});
Object.assign(s182, {
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
        structure: s181,
      },
    ],
    methods: [],
    template: null
  },
  slot: 220,
});
Object.assign(s183, {
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
        structure: s182,
      },
    ],
    methods: [],
    template: null
  },
  slot: 219,
});
const a327 = new Uint8Array([  ]);
const a328 = new Uint8Array([ 170, 170, 170, 170 ]);
const a329 = new Uint8Array([ 170, 170, 170, 170 ]);
const a330 = new Uint8Array([ 170, 170, 170, 170 ]);
const a331 = new Uint8Array([ 76, 31, 16, 0 ]);
const a332 = new Uint8Array([ 101, 33, 16, 0 ]);
const a333 = new Uint8Array([ 82, 111, 116, 97, 116, 101, 32, 116, 104, 101, 32, 77, 97, 110, 100, 101, 108, 98, 117, 108, 98, 32, 105, 110, 32, 101, 97, 99, 104, 32, 97, 120, 105, 115, 46, 0 ]);
Object.assign(s184, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180} = .{-180, -180, -180}, comptime maxValue: struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180} = .{180, 180, 180}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 38.5, comptime comptime_float = 25.8} = .{0, 38.5, 25.8}, comptime description: *const [35:0]u8 = \"Rotate the Mandelbulb in each axis.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s81,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s113,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s115,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s180,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s183,
      },
    ],
    methods: [],
    template: {
      memory: { array: a327 },
      slots: {
        0: {
          structure: s113,
          memory: { array: a328 },
          slots: {
            0: {
              structure: s112,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s115,
          memory: { array: a329 },
          slots: {
            0: {
              structure: s114,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s180,
          memory: { array: a330 },
          slots: {
            0: {
              structure: s179,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s183,
          memory: { array: a331 },
          slots: {
            0: {
              structure: s182,
              memory: { array: a332 },
              address: 1056588,
              slots: {
                0: {
                  structure: s181,
                  memory: { array: a333 },
                  address: 1057125,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 96,
});
Object.assign(s185, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180} = .{-180, -180, -180}, comptime maxValue: struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180} = .{180, 180, 180}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 38.5, comptime comptime_float = 25.8} = .{0, 38.5, 25.8}, comptime description: *const [35:0]u8 = \"Rotate the Mandelbulb in each axis.\"}",
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
  slot: 95,
});
Object.assign(s186, {
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
  slot: 224,
});
Object.assign(s187, {
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
        structure: s186,
      },
    ],
    methods: [],
    template: null
  },
  slot: 223,
});
Object.assign(s188, {
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
        structure: s187,
      },
    ],
    methods: [],
    template: null
  },
  slot: 222,
});
const a334 = new Uint8Array([  ]);
const a335 = new Uint8Array([ 72, 31, 16, 0 ]);
const a336 = new Uint8Array([ 68, 31, 16, 0 ]);
const a337 = new Uint8Array([ 20, 0, 0, 0 ]);
const a338 = new Uint8Array([ 64, 31, 16, 0 ]);
const a339 = new Uint8Array([ 6, 0, 0, 0 ]);
const a340 = new Uint8Array([ 60, 31, 16, 0 ]);
const a341 = new Uint8Array([ 12, 33, 16, 0 ]);
const a342 = new Uint8Array([ 77, 111, 114, 101, 32, 105, 116, 101, 114, 97, 116, 105, 111, 110, 115, 32, 114, 101, 118, 101, 97, 108, 32, 109, 111, 114, 101, 32, 100, 101, 116, 97, 105, 108, 32, 105, 110, 32, 116, 104, 101, 32, 102, 114, 97, 99, 116, 97, 108, 32, 115, 117, 114, 102, 97, 99, 101, 32, 98, 117, 116, 32, 116, 97, 107, 101, 115, 32, 108, 111, 110, 103, 101, 114, 32, 116, 111, 32, 99, 97, 108, 99, 117, 108, 97, 116, 101, 46, 0 ]);
Object.assign(s189, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 20, comptime defaultValue: comptime_int = 6, comptime description: *const [88:0]u8 = \"More iterations reveal more detail in the fractal surface but takes longer to calculate.\"}",
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
        structure: s188,
      },
    ],
    methods: [],
    template: {
      memory: { array: a334 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a335 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a2 },
              address: 1056584,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a336 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a337 },
              address: 1056580,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a338 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a339 },
              address: 1056576,
            },
          },
        },
        3: {
          structure: s188,
          memory: { array: a340 },
          slots: {
            0: {
              structure: s187,
              memory: { array: a341 },
              address: 1056572,
              slots: {
                0: {
                  structure: s186,
                  memory: { array: a342 },
                  address: 1057036,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 98,
});
Object.assign(s190, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 20, comptime defaultValue: comptime_int = 6, comptime description: *const [88:0]u8 = \"More iterations reveal more detail in the fractal surface but takes longer to calculate.\"}",
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
  slot: 97,
});
const a343 = new Uint8Array([  ]);
const a344 = new Uint8Array([ 56, 31, 16, 0 ]);
const a345 = new Uint8Array([ 10, 0, 0, 0 ]);
const a346 = new Uint8Array([ 52, 31, 16, 0 ]);
const a347 = new Uint8Array([ 200, 0, 0, 0 ]);
const a348 = new Uint8Array([ 48, 31, 16, 0 ]);
const a349 = new Uint8Array([ 110, 0, 0, 0 ]);
const a350 = new Uint8Array([ 44, 31, 16, 0 ]);
const a351 = new Uint8Array([ 221, 32, 16, 0 ]);
const a352 = new Uint8Array([ 84, 104, 101, 32, 109, 97, 120, 105, 109, 117, 109, 32, 110, 117, 109, 98, 101, 114, 32, 111, 102, 32, 115, 116, 101, 112, 115, 32, 97, 32, 114, 97, 121, 32, 115, 104, 111, 117, 108, 100, 32, 116, 97, 107, 101, 46, 0 ]);
Object.assign(s191, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = i32, comptime minValue: comptime_int = 10, comptime maxValue: comptime_int = 200, comptime defaultValue: comptime_int = 110, comptime description: *const [46:0]u8 = \"The maximum number of steps a ray should take.\"}",
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
        structure: s167,
      },
    ],
    methods: [],
    template: {
      memory: { array: a343 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a344 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a345 },
              address: 1056568,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a346 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a347 },
              address: 1056564,
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a348 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a349 },
              address: 1056560,
            },
          },
        },
        3: {
          structure: s167,
          memory: { array: a350 },
          slots: {
            0: {
              structure: s166,
              memory: { array: a351 },
              address: 1056556,
              slots: {
                0: {
                  structure: s165,
                  memory: { array: a352 },
                  address: 1056989,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 100,
});
Object.assign(s192, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = i32, comptime minValue: comptime_int = 10, comptime maxValue: comptime_int = 200, comptime defaultValue: comptime_int = 110, comptime description: *const [46:0]u8 = \"The maximum number of steps a ray should take.\"}",
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
  slot: 99,
});
Object.assign(s193, {
  ...s,
  type: 1,
  name: "[109:0]u8",
  length: 109,
  byteSize: 110,
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
  slot: 227,
});
Object.assign(s194, {
  ...s,
  type: 11,
  name: "*const [109:0]u8",
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
  slot: 226,
});
Object.assign(s195, {
  ...s,
  type: 11,
  name: "*const *const [109:0]u8",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s194,
      },
    ],
    methods: [],
    template: null
  },
  slot: 225,
});
const a353 = new Uint8Array([  ]);
const a354 = new Uint8Array([ 232, 30, 16, 0 ]);
const a355 = new Uint8Array([ 144, 30, 16, 0 ]);
const a356 = new Uint8Array([ 144, 30, 16, 0 ]);
const a357 = new Uint8Array([ 40, 31, 16, 0 ]);
const a358 = new Uint8Array([ 111, 32, 16, 0 ]);
const a359 = new Uint8Array([ 83, 99, 97, 108, 101, 32, 116, 104, 101, 32, 101, 112, 115, 105, 108, 111, 110, 32, 115, 116, 101, 112, 32, 100, 105, 115, 116, 97, 110, 99, 101, 46, 32, 83, 109, 97, 108, 108, 101, 114, 32, 118, 97, 108, 117, 101, 115, 32, 97, 114, 101, 32, 115, 108, 111, 119, 101, 114, 32, 98, 117, 116, 32, 119, 105, 108, 108, 32, 103, 101, 110, 101, 114, 97, 116, 101, 32, 115, 109, 111, 111, 116, 104, 101, 114, 32, 114, 101, 115, 117, 108, 116, 115, 32, 102, 111, 114, 32, 116, 104, 105, 110, 32, 97, 114, 101, 97, 115, 46, 0 ]);
Object.assign(s196, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [109:0]u8 = \"Scale the epsilon step distance. Smaller values are slower but will generate smoother results for thin areas.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s34,
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
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s36,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s195,
      },
    ],
    methods: [],
    template: {
      memory: { array: a353 },
      slots: {
        0: {
          structure: s36,
          memory: { array: a354 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a153 },
              address: 1056488,
            },
          },
        },
        1: {
          structure: s36,
          memory: { array: a355 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        2: {
          structure: s36,
          memory: { array: a356 },
          slots: {
            0: {
              structure: s35,
              memory: { array: a39 },
              address: 1056400,
            },
          },
        },
        3: {
          structure: s195,
          memory: { array: a357 },
          slots: {
            0: {
              structure: s194,
              memory: { array: a358 },
              address: 1056552,
              slots: {
                0: {
                  structure: s193,
                  memory: { array: a359 },
                  address: 1056879,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 102,
});
Object.assign(s197, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [109:0]u8 = \"Scale the epsilon step distance. Smaller values are slower but will generate smoother results for thin areas.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s196,
      },
    ],
    methods: [],
    template: null
  },
  slot: 101,
});
Object.assign(s198, {
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
const a360 = new Uint8Array([  ]);
const a361 = new Uint8Array([ 88, 30, 16, 0 ]);
const a362 = new Uint8Array([ 100, 0, 0, 0 ]);
const a363 = new Uint8Array([ 88, 30, 16, 0 ]);
Object.assign(s199, {
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
      memory: { array: a360 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a361 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a362 },
              address: 1056344,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a363 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a362 },
              address: 1056344,
            },
          },
        },
      },
    },
  },
  slot: 229,
});
Object.assign(s200, {
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
        structure: s199,
      },
    ],
    methods: [],
    template: null
  },
  slot: 228,
});
const a364 = new Uint8Array([  ]);
const a365 = new Uint8Array([ 84, 30, 16, 0 ]);
const a366 = new Uint8Array([ 0, 8, 0, 0 ]);
const a367 = new Uint8Array([ 84, 30, 16, 0 ]);
Object.assign(s201, {
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
      memory: { array: a364 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a365 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a366 },
              address: 1056340,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a367 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a366 },
              address: 1056340,
            },
          },
        },
      },
    },
  },
  slot: 231,
});
Object.assign(s202, {
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
        structure: s201,
      },
    ],
    methods: [],
    template: null
  },
  slot: 230,
});
const a368 = new Uint8Array([  ]);
const a369 = new Uint8Array([ 80, 30, 16, 0 ]);
const a370 = new Uint8Array([ 0, 2, 0, 0 ]);
const a371 = new Uint8Array([ 80, 30, 16, 0 ]);
Object.assign(s203, {
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
      memory: { array: a368 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a369 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a370 },
              address: 1056336,
            },
          },
        },
        1: {
          structure: s8,
          memory: { array: a371 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a370 },
              address: 1056336,
            },
          },
        },
      },
    },
  },
  slot: 233,
});
Object.assign(s204, {
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
        structure: s203,
      },
    ],
    methods: [],
    template: null
  },
  slot: 232,
});
const a372 = new Uint8Array([  ]);
const a373 = new Uint8Array([ 170, 170, 170, 170 ]);
const a374 = new Uint8Array([ 170, 170, 170, 170 ]);
const a375 = new Uint8Array([ 170, 170, 170, 170 ]);
const a376 = new Uint8Array([ 36, 31, 16, 0 ]);
const a377 = new Uint8Array([ 84, 32, 16, 0 ]);
const a378 = new Uint8Array([ 84, 104, 101, 32, 111, 117, 116, 112, 117, 116, 32, 115, 105, 122, 101, 32, 105, 110, 32, 112, 105, 120, 101, 108, 115, 46, 0 ]);
Object.assign(s205, {
  ...s,
  type: 2,
  name: "struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 2048, comptime comptime_int = 2048} = .{2048, 2048}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}, comptime description: *const [26:0]u8 = \"The output size in pixels.\"}",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        name: "type",
        structure: s198,
      },
      {
        ...m,
        type: 8,
        slot: 0,
        name: "minValue",
        structure: s200,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "maxValue",
        structure: s202,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "defaultValue",
        structure: s204,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "description",
        structure: s44,
      },
    ],
    methods: [],
    template: {
      memory: { array: a372 },
      slots: {
        0: {
          structure: s200,
          memory: { array: a373 },
          slots: {
            0: {
              structure: s199,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s202,
          memory: { array: a374 },
          slots: {
            0: {
              structure: s201,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s204,
          memory: { array: a375 },
          slots: {
            0: {
              structure: s203,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s44,
          memory: { array: a376 },
          slots: {
            0: {
              structure: s43,
              memory: { array: a377 },
              address: 1056548,
              slots: {
                0: {
                  structure: s42,
                  memory: { array: a378 },
                  address: 1056852,
                },
              },
            },
          },
        },
      },
    },
  },
  slot: 104,
});
Object.assign(s206, {
  ...s,
  type: 11,
  name: "*const struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 2048, comptime comptime_int = 2048} = .{2048, 2048}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}, comptime description: *const [26:0]u8 = \"The output size in pixels.\"}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s205,
      },
    ],
    methods: [],
    template: null
  },
  slot: 103,
});
const a379 = new Uint8Array([  ]);
const a380 = new Uint8Array([ 170, 170, 170, 170 ]);
const a381 = new Uint8Array([ 170, 170, 170, 170 ]);
const a382 = new Uint8Array([ 170, 170, 170, 170 ]);
const a383 = new Uint8Array([ 170, 170, 170, 170 ]);
const a384 = new Uint8Array([ 170, 170, 170, 170 ]);
const a385 = new Uint8Array([ 170, 170, 170, 170 ]);
const a386 = new Uint8Array([ 170, 170, 170, 170 ]);
const a387 = new Uint8Array([ 170, 170, 170, 170 ]);
const a388 = new Uint8Array([ 170, 170, 170, 170 ]);
const a389 = new Uint8Array([ 170, 170, 170, 170 ]);
const a390 = new Uint8Array([ 170, 170, 170, 170 ]);
const a391 = new Uint8Array([ 170, 170, 170, 170 ]);
const a392 = new Uint8Array([ 170, 170, 170, 170 ]);
const a393 = new Uint8Array([ 170, 170, 170, 170 ]);
const a394 = new Uint8Array([ 170, 170, 170, 170 ]);
const a395 = new Uint8Array([ 170, 170, 170, 170 ]);
const a396 = new Uint8Array([ 170, 170, 170, 170 ]);
const a397 = new Uint8Array([ 170, 170, 170, 170 ]);
const a398 = new Uint8Array([ 170, 170, 170, 170 ]);
const a399 = new Uint8Array([ 170, 170, 170, 170 ]);
const a400 = new Uint8Array([ 170, 170, 170, 170 ]);
const a401 = new Uint8Array([ 170, 170, 170, 170 ]);
const a402 = new Uint8Array([ 170, 170, 170, 170 ]);
const a403 = new Uint8Array([ 170, 170, 170, 170 ]);
const a404 = new Uint8Array([ 170, 170, 170, 170 ]);
const a405 = new Uint8Array([ 170, 170, 170, 170 ]);
const a406 = new Uint8Array([ 170, 170, 170, 170 ]);
const a407 = new Uint8Array([ 170, 170, 170, 170 ]);
const a408 = new Uint8Array([ 170, 170, 170, 170 ]);
const a409 = new Uint8Array([ 170, 170, 170, 170 ]);
const a410 = new Uint8Array([ 170, 170, 170, 170 ]);
const a411 = new Uint8Array([ 170, 170, 170, 170 ]);
const a412 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s207, {
  ...s,
  type: 2,
  name: "struct{comptime antialiasing: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 3, comptime defaultValue: comptime_int = 1, comptime description: *const [60:0]u8 = \"Super sampling quality. Number of samples squared per pixel.\"} = .{.type = i32, .minValue = 1, .maxValue = 3, .defaultValue = 1, .description = \"Super sampling quality. Number of samples squared per pixel.\"}, comptime phong: struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [21:0]u8 = \"Enable phong shading.\"} = .{.type = bool, .defaultValue = true, .description = \"Enable phong shading.\"}, comptime julia: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [25:0]u8 = \"Enable Julia set version.\"} = .{.type = bool, .defaultValue = false, .description = \"Enable Julia set version.\"}, comptime radiolaria: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [24:0]u8 = \"Enable radiolaria style.\"} = .{.type = bool, .defaultValue = false, .description = \"Enable radiolaria style.\"}, comptime radiolariaFactor: struct{comptime type: type = f32, comptime minValue: comptime_float = -4, comptime maxValue: comptime_float = 4, comptime defaultValue: comptime_float = 0, comptime description: *const [28:0]u8 = \"Tweak the radiolaria effect.\"} = .{.type = f32, .minValue = -4, .maxValue = 4, .defaultValue = 0, .description = \"Tweak the radiolaria effect.\"}, comptime shadows: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [26:0]u8 = \"Enable ray traced shadows.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0, .description = \"Enable ray traced shadows.\"}, comptime ambientOcclusion: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.8, comptime description: *const [61:0]u8 = \"Enable fake ambient occlusion factor based on the orbit trap.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.8, .description = \"Enable fake ambient occlusion factor based on the orbit trap.\"}, comptime ambientOcclusionEmphasis: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.58, comptime description: *const [100:0]u8 = \"Emphasise the structure edges based on the number of steps it takes to reach a point in the fractal.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.58, .description = \"Emphasise the structure edges based on the number of steps it takes to reach a point in the fractal.\"}, comptime bounding: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 16, comptime defaultValue: comptime_float = 2.5, comptime description: *const [66:0]u8 = \"Sets the bounding sphere radius to help accelerate the raytracing.\"} = .{.type = f32, .minValue = 1, .maxValue = 16, .defaultValue = 2.5, .description = \"Sets the bounding sphere radius to help accelerate the raytracing.\"}, comptime bailout: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.5, comptime maxValue: comptime_float = 12, comptime defaultValue: comptime_float = 4, comptime description: *const [101:0]u8 = \"Sets the bailout value for the fractal calculation. Lower values give smoother less detailed results.\"} = .{.type = f32, .minValue = 0.5, .maxValue = 12, .defaultValue = 4, .description = \"Sets the bailout value for the fractal calculation. Lower values give smoother less detailed results.\"}, comptime power: struct{comptime type: type = f32, comptime minValue: comptime_float = -20, comptime maxValue: comptime_float = 20, comptime defaultValue: comptime_float = 8, comptime description: *const [25:0]u8 = \"The power of the fractal.\"} = .{.type = f32, .minValue = -20, .maxValue = 20, .defaultValue = 8, .description = \"The power of the fractal.\"}, comptime phase: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -2, comptime comptime_float = -2} = .{-2, -2}, comptime maxValue: struct{comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [110:0]u8 = \"Tweak the mapping of the triplex numbers into spherical co-ordinates - in other words tweak the surface shape.\"} = .{.type = @Vector(2, f32), .minValue = .{-2, -2}, .maxValue = .{2, 2}, .defaultValue = .{0, 0}, .description = \"Tweak the mapping of the triplex numbers into spherical co-ordinates - in other words tweak the surface shape.\"}, comptime julia_c: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -2, comptime comptime_float = -2, comptime comptime_float = -2} = .{-2, -2, -2}, comptime maxValue: struct{comptime comptime_float = 2, comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2, 2}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 0, comptime comptime_float = 0} = .{1, 0, 0}, comptime description: *const [37:0]u8 = \"The c constant for Julia set fractals\"} = .{.type = @Vector(3, f32), .minValue = .{-2, -2, -2}, .maxValue = .{2, 2, 2}, .defaultValue = .{1, 0, 0}, .description = \"The c constant for Julia set fractals\"}, comptime cameraPosition: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -4, comptime comptime_float = -4, comptime comptime_float = -4} = .{-4, -4, -4}, comptime maxValue: struct{comptime comptime_float = 4, comptime comptime_float = 4, comptime comptime_float = 4} = .{4, 4, 4}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = -2.6, comptime comptime_float = 0} = .{0, -2.6, 0}, comptime description: *const [16:0]u8 = \"Camera position.\"} = .{.type = @Vector(3, f32), .minValue = .{-4, -4, -4}, .maxValue = .{4, 4, 4}, .defaultValue = .{0, -2.6, 0}, .description = \"Camera position.\"}, comptime cameraPositionFine: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -0.1, comptime comptime_float = -0.1, comptime comptime_float = -0.1} = .{-0.1, -0.1, -0.1}, comptime maxValue: struct{comptime comptime_float = 0.1, comptime comptime_float = 0.1, comptime comptime_float = 0.1} = .{0.1, 0.1, 0.1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime description: *const [19:0]u8 = \"Fine tune position.\"} = .{.type = @Vector(3, f32), .minValue = .{-0.1, -0.1, -0.1}, .maxValue = .{0.1, 0.1, 0.1}, .defaultValue = .{0, 0, 0}, .description = \"Fine tune position.\"}, comptime cameraRotation: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180} = .{-180, -180, -180}, comptime maxValue: struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180} = .{180, 180, 180}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = -90} = .{0, 0, -90}, comptime description: *const [42:0]u8 = \"Pointing angle in each axis of the camera.\"} = .{.type = @Vector(3, f32), .minValue = .{-180, -180, -180}, .maxValue = .{180, 180, 180}, .defaultValue = .{0, 0, -90}, .description = \"Pointing angle in each axis of the camera.\"}, comptime cameraZoom: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 0, comptime description: *const [21:0]u8 = \"Zoom the camera view.\"} = .{.type = f32, .minValue = 0, .maxValue = 10, .defaultValue = 0, .description = \"Zoom the camera view.\"}, comptime light: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -50, comptime comptime_float = -50, comptime comptime_float = -50} = .{-50, -50, -50}, comptime maxValue: struct{comptime comptime_float = 50, comptime comptime_float = 50, comptime comptime_float = 50} = .{50, 50, 50}, comptime defaultValue: struct{comptime comptime_float = 38, comptime comptime_float = -42, comptime comptime_float = 38} = .{38, -42, 38}, comptime description: *const [24:0]u8 = \"Position of point light.\"} = .{.type = @Vector(3, f32), .minValue = .{-50, -50, -50}, .maxValue = .{50, 50, 50}, .defaultValue = .{38, -42, 38}, .description = \"Position of point light.\"}, comptime colorBackground: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime description: *const [18:0]u8 = \"Background colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0, 0, 0}, .description = \"Background colour.\", .aeUIControl = \"aeColor\"}, comptime colorBackgroundTransparency: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [24:0]u8 = \"Background transparency.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 1, .description = \"Background transparency.\"}, comptime colorDiffuse: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0.85, comptime comptime_float = 0.99} = .{0, 0.85, 0.99}, comptime description: *const [15:0]u8 = \"Diffuse colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0, 0.85, 0.99}, .description = \"Diffuse colour.\", .aeUIControl = \"aeColor\"}, comptime colorAmbient: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.67, comptime comptime_float = 0.85, comptime comptime_float = 1} = .{0.67, 0.85, 1}, comptime description: *const [21:0]u8 = \"Ambient light colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0.67, 0.85, 1}, .description = \"Ambient light colour.\", .aeUIControl = \"aeColor\"}, comptime colorAmbientIntensity: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.4, comptime description: *const [24:0]u8 = \"Ambient light intensity.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.4, .description = \"Ambient light intensity.\"}, comptime colorLight: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.48, comptime comptime_float = 0.59, comptime comptime_float = 0.66} = .{0.48, 0.59, 0.66}, comptime description: *const [13:0]u8 = \"Light colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0.48, 0.59, 0.66}, .description = \"Light colour.\", .aeUIControl = \"aeColor\"}, comptime colorSpread: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.2, comptime description: *const [46:0]u8 = \"Vary the colour based on the normal direction.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.2, .description = \"Vary the colour based on the normal direction.\"}, comptime rimLight: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [17:0]u8 = \"Rim light factor.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0, .description = \"Rim light factor.\"}, comptime specularity: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.66, comptime description: *const [17:0]u8 = \"Phone specularity\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.66, .description = \"Phone specularity\"}, comptime specularExponent: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 50, comptime defaultValue: comptime_float = 15, comptime description: *const [15:0]u8 = \"Phong shininess\"} = .{.type = f32, .minValue = 0.1, .maxValue = 50, .defaultValue = 15, .description = \"Phong shininess\"}, comptime rotation: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180} = .{-180, -180, -180}, comptime maxValue: struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180} = .{180, 180, 180}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 38.5, comptime comptime_float = 25.8} = .{0, 38.5, 25.8}, comptime description: *const [35:0]u8 = \"Rotate the Mandelbulb in each axis.\"} = .{.type = @Vector(3, f32), .minValue = .{-180, -180, -180}, .maxValue = .{180, 180, 180}, .defaultValue = .{0, 38.5, 25.8}, .description = \"Rotate the Mandelbulb in each axis.\"}, comptime maxIterations: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 20, comptime defaultValue: comptime_int = 6, comptime description: *const [88:0]u8 = \"More iterations reveal more detail in the fractal surface but takes longer to calculate.\"} = .{.type = i32, .minValue = 1, .maxValue = 20, .defaultValue = 6, .description = \"More iterations reveal more detail in the fractal surface but takes longer to calculate.\"}, comptime stepLimit: struct{comptime type: type = i32, comptime minValue: comptime_int = 10, comptime maxValue: comptime_int = 200, comptime defaultValue: comptime_int = 110, comptime description: *const [46:0]u8 = \"The maximum number of steps a ray should take.\"} = .{.type = i32, .minValue = 10, .maxValue = 200, .defaultValue = 110, .description = \"The maximum number of steps a ray should take.\"}, comptime epsilonScale: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [109:0]u8 = \"Scale the epsilon step distance. Smaller values are slower but will generate smoother results for thin areas.\"} = .{.type = f32, .minValue = 0.1, .maxValue = 1, .defaultValue = 1, .description = \"Scale the epsilon step distance. Smaller values are slower but will generate smoother results for thin areas.\"}, comptime size: struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 2048, comptime comptime_int = 2048} = .{2048, 2048}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}, comptime description: *const [26:0]u8 = \"The output size in pixels.\"} = .{.type = @Vector(2, i32), .minValue = .{100, 100}, .maxValue = .{2048, 2048}, .defaultValue = .{512, 512}, .description = \"The output size in pixels.\"}}",
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
        structure: s16,
      },
      {
        ...m,
        type: 8,
        slot: 1,
        name: "phong",
        structure: s23,
      },
      {
        ...m,
        type: 8,
        slot: 2,
        name: "julia",
        structure: s28,
      },
      {
        ...m,
        type: 8,
        slot: 3,
        name: "radiolaria",
        structure: s33,
      },
      {
        ...m,
        type: 8,
        slot: 4,
        name: "radiolariaFactor",
        structure: s41,
      },
      {
        ...m,
        type: 8,
        slot: 5,
        name: "shadows",
        structure: s46,
      },
      {
        ...m,
        type: 8,
        slot: 6,
        name: "ambientOcclusion",
        structure: s51,
      },
      {
        ...m,
        type: 8,
        slot: 7,
        name: "ambientOcclusionEmphasis",
        structure: s56,
      },
      {
        ...m,
        type: 8,
        slot: 8,
        name: "bounding",
        structure: s61,
      },
      {
        ...m,
        type: 8,
        slot: 9,
        name: "bailout",
        structure: s66,
      },
      {
        ...m,
        type: 8,
        slot: 10,
        name: "power",
        structure: s68,
      },
      {
        ...m,
        type: 8,
        slot: 11,
        name: "phase",
        structure: s80,
      },
      {
        ...m,
        type: 8,
        slot: 12,
        name: "julia_c",
        structure: s92,
      },
      {
        ...m,
        type: 8,
        slot: 13,
        name: "cameraPosition",
        structure: s103,
      },
      {
        ...m,
        type: 8,
        slot: 14,
        name: "cameraPositionFine",
        structure: s111,
      },
      {
        ...m,
        type: 8,
        slot: 15,
        name: "cameraRotation",
        structure: s122,
      },
      {
        ...m,
        type: 8,
        slot: 16,
        name: "cameraZoom",
        structure: s124,
      },
      {
        ...m,
        type: 8,
        slot: 17,
        name: "light",
        structure: s132,
      },
      {
        ...m,
        type: 8,
        slot: 18,
        name: "colorBackground",
        structure: s142,
      },
      {
        ...m,
        type: 8,
        slot: 19,
        name: "colorBackgroundTransparency",
        structure: s144,
      },
      {
        ...m,
        type: 8,
        slot: 20,
        name: "colorDiffuse",
        structure: s151,
      },
      {
        ...m,
        type: 8,
        slot: 21,
        name: "colorAmbient",
        structure: s155,
      },
      {
        ...m,
        type: 8,
        slot: 22,
        name: "colorAmbientIntensity",
        structure: s157,
      },
      {
        ...m,
        type: 8,
        slot: 23,
        name: "colorLight",
        structure: s164,
      },
      {
        ...m,
        type: 8,
        slot: 24,
        name: "colorSpread",
        structure: s169,
      },
      {
        ...m,
        type: 8,
        slot: 25,
        name: "rimLight",
        structure: s174,
      },
      {
        ...m,
        type: 8,
        slot: 26,
        name: "specularity",
        structure: s176,
      },
      {
        ...m,
        type: 8,
        slot: 27,
        name: "specularExponent",
        structure: s178,
      },
      {
        ...m,
        type: 8,
        slot: 28,
        name: "rotation",
        structure: s185,
      },
      {
        ...m,
        type: 8,
        slot: 29,
        name: "maxIterations",
        structure: s190,
      },
      {
        ...m,
        type: 8,
        slot: 30,
        name: "stepLimit",
        structure: s192,
      },
      {
        ...m,
        type: 8,
        slot: 31,
        name: "epsilonScale",
        structure: s197,
      },
      {
        ...m,
        type: 8,
        slot: 32,
        name: "size",
        structure: s206,
      },
    ],
    methods: [],
    template: {
      memory: { array: a379 },
      slots: {
        0: {
          structure: s16,
          memory: { array: a380 },
          slots: {
            0: {
              structure: s15,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        1: {
          structure: s23,
          memory: { array: a381 },
          slots: {
            0: {
              structure: s22,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        2: {
          structure: s28,
          memory: { array: a382 },
          slots: {
            0: {
              structure: s27,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        3: {
          structure: s33,
          memory: { array: a383 },
          slots: {
            0: {
              structure: s32,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        4: {
          structure: s41,
          memory: { array: a384 },
          slots: {
            0: {
              structure: s40,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s46,
          memory: { array: a385 },
          slots: {
            0: {
              structure: s45,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s51,
          memory: { array: a386 },
          slots: {
            0: {
              structure: s50,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        7: {
          structure: s56,
          memory: { array: a387 },
          slots: {
            0: {
              structure: s55,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        8: {
          structure: s61,
          memory: { array: a388 },
          slots: {
            0: {
              structure: s60,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        9: {
          structure: s66,
          memory: { array: a389 },
          slots: {
            0: {
              structure: s65,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        10: {
          structure: s68,
          memory: { array: a390 },
          slots: {
            0: {
              structure: s67,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        11: {
          structure: s80,
          memory: { array: a391 },
          slots: {
            0: {
              structure: s79,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        12: {
          structure: s92,
          memory: { array: a392 },
          slots: {
            0: {
              structure: s91,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        13: {
          structure: s103,
          memory: { array: a393 },
          slots: {
            0: {
              structure: s102,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        14: {
          structure: s111,
          memory: { array: a394 },
          slots: {
            0: {
              structure: s110,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        15: {
          structure: s122,
          memory: { array: a395 },
          slots: {
            0: {
              structure: s121,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        16: {
          structure: s124,
          memory: { array: a396 },
          slots: {
            0: {
              structure: s123,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        17: {
          structure: s132,
          memory: { array: a397 },
          slots: {
            0: {
              structure: s131,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        18: {
          structure: s142,
          memory: { array: a398 },
          slots: {
            0: {
              structure: s141,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        19: {
          structure: s144,
          memory: { array: a399 },
          slots: {
            0: {
              structure: s143,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        20: {
          structure: s151,
          memory: { array: a400 },
          slots: {
            0: {
              structure: s150,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        21: {
          structure: s155,
          memory: { array: a401 },
          slots: {
            0: {
              structure: s154,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        22: {
          structure: s157,
          memory: { array: a402 },
          slots: {
            0: {
              structure: s156,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        23: {
          structure: s164,
          memory: { array: a403 },
          slots: {
            0: {
              structure: s163,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        24: {
          structure: s169,
          memory: { array: a404 },
          slots: {
            0: {
              structure: s168,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        25: {
          structure: s174,
          memory: { array: a405 },
          slots: {
            0: {
              structure: s173,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        26: {
          structure: s176,
          memory: { array: a406 },
          slots: {
            0: {
              structure: s175,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        27: {
          structure: s178,
          memory: { array: a407 },
          slots: {
            0: {
              structure: s177,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        28: {
          structure: s185,
          memory: { array: a408 },
          slots: {
            0: {
              structure: s184,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        29: {
          structure: s190,
          memory: { array: a409 },
          slots: {
            0: {
              structure: s189,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        30: {
          structure: s192,
          memory: { array: a410 },
          slots: {
            0: {
              structure: s191,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        31: {
          structure: s197,
          memory: { array: a411 },
          slots: {
            0: {
              structure: s196,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        32: {
          structure: s206,
          memory: { array: a412 },
          slots: {
            0: {
              structure: s205,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 15,
});
Object.assign(s208, {
  ...s,
  type: 11,
  name: "*const struct{comptime antialiasing: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 3, comptime defaultValue: comptime_int = 1, comptime description: *const [60:0]u8 = \"Super sampling quality. Number of samples squared per pixel.\"} = .{.type = i32, .minValue = 1, .maxValue = 3, .defaultValue = 1, .description = \"Super sampling quality. Number of samples squared per pixel.\"}, comptime phong: struct{comptime type: type = bool, comptime defaultValue: bool = true, comptime description: *const [21:0]u8 = \"Enable phong shading.\"} = .{.type = bool, .defaultValue = true, .description = \"Enable phong shading.\"}, comptime julia: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [25:0]u8 = \"Enable Julia set version.\"} = .{.type = bool, .defaultValue = false, .description = \"Enable Julia set version.\"}, comptime radiolaria: struct{comptime type: type = bool, comptime defaultValue: bool = false, comptime description: *const [24:0]u8 = \"Enable radiolaria style.\"} = .{.type = bool, .defaultValue = false, .description = \"Enable radiolaria style.\"}, comptime radiolariaFactor: struct{comptime type: type = f32, comptime minValue: comptime_float = -4, comptime maxValue: comptime_float = 4, comptime defaultValue: comptime_float = 0, comptime description: *const [28:0]u8 = \"Tweak the radiolaria effect.\"} = .{.type = f32, .minValue = -4, .maxValue = 4, .defaultValue = 0, .description = \"Tweak the radiolaria effect.\"}, comptime shadows: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [26:0]u8 = \"Enable ray traced shadows.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0, .description = \"Enable ray traced shadows.\"}, comptime ambientOcclusion: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.8, comptime description: *const [61:0]u8 = \"Enable fake ambient occlusion factor based on the orbit trap.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.8, .description = \"Enable fake ambient occlusion factor based on the orbit trap.\"}, comptime ambientOcclusionEmphasis: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.58, comptime description: *const [100:0]u8 = \"Emphasise the structure edges based on the number of steps it takes to reach a point in the fractal.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.58, .description = \"Emphasise the structure edges based on the number of steps it takes to reach a point in the fractal.\"}, comptime bounding: struct{comptime type: type = f32, comptime minValue: comptime_float = 1, comptime maxValue: comptime_float = 16, comptime defaultValue: comptime_float = 2.5, comptime description: *const [66:0]u8 = \"Sets the bounding sphere radius to help accelerate the raytracing.\"} = .{.type = f32, .minValue = 1, .maxValue = 16, .defaultValue = 2.5, .description = \"Sets the bounding sphere radius to help accelerate the raytracing.\"}, comptime bailout: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.5, comptime maxValue: comptime_float = 12, comptime defaultValue: comptime_float = 4, comptime description: *const [101:0]u8 = \"Sets the bailout value for the fractal calculation. Lower values give smoother less detailed results.\"} = .{.type = f32, .minValue = 0.5, .maxValue = 12, .defaultValue = 4, .description = \"Sets the bailout value for the fractal calculation. Lower values give smoother less detailed results.\"}, comptime power: struct{comptime type: type = f32, comptime minValue: comptime_float = -20, comptime maxValue: comptime_float = 20, comptime defaultValue: comptime_float = 8, comptime description: *const [25:0]u8 = \"The power of the fractal.\"} = .{.type = f32, .minValue = -20, .maxValue = 20, .defaultValue = 8, .description = \"The power of the fractal.\"}, comptime phase: struct{comptime type: type = @Vector(2, f32), comptime minValue: struct{comptime comptime_float = -2, comptime comptime_float = -2} = .{-2, -2}, comptime maxValue: struct{comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0}, comptime description: *const [110:0]u8 = \"Tweak the mapping of the triplex numbers into spherical co-ordinates - in other words tweak the surface shape.\"} = .{.type = @Vector(2, f32), .minValue = .{-2, -2}, .maxValue = .{2, 2}, .defaultValue = .{0, 0}, .description = \"Tweak the mapping of the triplex numbers into spherical co-ordinates - in other words tweak the surface shape.\"}, comptime julia_c: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -2, comptime comptime_float = -2, comptime comptime_float = -2} = .{-2, -2, -2}, comptime maxValue: struct{comptime comptime_float = 2, comptime comptime_float = 2, comptime comptime_float = 2} = .{2, 2, 2}, comptime defaultValue: struct{comptime comptime_float = 1, comptime comptime_float = 0, comptime comptime_float = 0} = .{1, 0, 0}, comptime description: *const [37:0]u8 = \"The c constant for Julia set fractals\"} = .{.type = @Vector(3, f32), .minValue = .{-2, -2, -2}, .maxValue = .{2, 2, 2}, .defaultValue = .{1, 0, 0}, .description = \"The c constant for Julia set fractals\"}, comptime cameraPosition: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -4, comptime comptime_float = -4, comptime comptime_float = -4} = .{-4, -4, -4}, comptime maxValue: struct{comptime comptime_float = 4, comptime comptime_float = 4, comptime comptime_float = 4} = .{4, 4, 4}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = -2.6, comptime comptime_float = 0} = .{0, -2.6, 0}, comptime description: *const [16:0]u8 = \"Camera position.\"} = .{.type = @Vector(3, f32), .minValue = .{-4, -4, -4}, .maxValue = .{4, 4, 4}, .defaultValue = .{0, -2.6, 0}, .description = \"Camera position.\"}, comptime cameraPositionFine: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -0.1, comptime comptime_float = -0.1, comptime comptime_float = -0.1} = .{-0.1, -0.1, -0.1}, comptime maxValue: struct{comptime comptime_float = 0.1, comptime comptime_float = 0.1, comptime comptime_float = 0.1} = .{0.1, 0.1, 0.1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime description: *const [19:0]u8 = \"Fine tune position.\"} = .{.type = @Vector(3, f32), .minValue = .{-0.1, -0.1, -0.1}, .maxValue = .{0.1, 0.1, 0.1}, .defaultValue = .{0, 0, 0}, .description = \"Fine tune position.\"}, comptime cameraRotation: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180} = .{-180, -180, -180}, comptime maxValue: struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180} = .{180, 180, 180}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = -90} = .{0, 0, -90}, comptime description: *const [42:0]u8 = \"Pointing angle in each axis of the camera.\"} = .{.type = @Vector(3, f32), .minValue = .{-180, -180, -180}, .maxValue = .{180, 180, 180}, .defaultValue = .{0, 0, -90}, .description = \"Pointing angle in each axis of the camera.\"}, comptime cameraZoom: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 10, comptime defaultValue: comptime_float = 0, comptime description: *const [21:0]u8 = \"Zoom the camera view.\"} = .{.type = f32, .minValue = 0, .maxValue = 10, .defaultValue = 0, .description = \"Zoom the camera view.\"}, comptime light: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -50, comptime comptime_float = -50, comptime comptime_float = -50} = .{-50, -50, -50}, comptime maxValue: struct{comptime comptime_float = 50, comptime comptime_float = 50, comptime comptime_float = 50} = .{50, 50, 50}, comptime defaultValue: struct{comptime comptime_float = 38, comptime comptime_float = -42, comptime comptime_float = 38} = .{38, -42, 38}, comptime description: *const [24:0]u8 = \"Position of point light.\"} = .{.type = @Vector(3, f32), .minValue = .{-50, -50, -50}, .maxValue = .{50, 50, 50}, .defaultValue = .{38, -42, 38}, .description = \"Position of point light.\"}, comptime colorBackground: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime description: *const [18:0]u8 = \"Background colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0, 0, 0}, .description = \"Background colour.\", .aeUIControl = \"aeColor\"}, comptime colorBackgroundTransparency: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [24:0]u8 = \"Background transparency.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 1, .description = \"Background transparency.\"}, comptime colorDiffuse: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 0.85, comptime comptime_float = 0.99} = .{0, 0.85, 0.99}, comptime description: *const [15:0]u8 = \"Diffuse colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0, 0.85, 0.99}, .description = \"Diffuse colour.\", .aeUIControl = \"aeColor\"}, comptime colorAmbient: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.67, comptime comptime_float = 0.85, comptime comptime_float = 1} = .{0.67, 0.85, 1}, comptime description: *const [21:0]u8 = \"Ambient light colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0.67, 0.85, 1}, .description = \"Ambient light colour.\", .aeUIControl = \"aeColor\"}, comptime colorAmbientIntensity: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.4, comptime description: *const [24:0]u8 = \"Ambient light intensity.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.4, .description = \"Ambient light intensity.\"}, comptime colorLight: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = 0, comptime comptime_float = 0, comptime comptime_float = 0} = .{0, 0, 0}, comptime maxValue: struct{comptime comptime_float = 1, comptime comptime_float = 1, comptime comptime_float = 1} = .{1, 1, 1}, comptime defaultValue: struct{comptime comptime_float = 0.48, comptime comptime_float = 0.59, comptime comptime_float = 0.66} = .{0.48, 0.59, 0.66}, comptime description: *const [13:0]u8 = \"Light colour.\", comptime aeUIControl: *const [7:0]u8 = \"aeColor\"} = .{.type = @Vector(3, f32), .minValue = .{0, 0, 0}, .maxValue = .{1, 1, 1}, .defaultValue = .{0.48, 0.59, 0.66}, .description = \"Light colour.\", .aeUIControl = \"aeColor\"}, comptime colorSpread: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.2, comptime description: *const [46:0]u8 = \"Vary the colour based on the normal direction.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.2, .description = \"Vary the colour based on the normal direction.\"}, comptime rimLight: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0, comptime description: *const [17:0]u8 = \"Rim light factor.\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0, .description = \"Rim light factor.\"}, comptime specularity: struct{comptime type: type = f32, comptime minValue: comptime_float = 0, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 0.66, comptime description: *const [17:0]u8 = \"Phone specularity\"} = .{.type = f32, .minValue = 0, .maxValue = 1, .defaultValue = 0.66, .description = \"Phone specularity\"}, comptime specularExponent: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 50, comptime defaultValue: comptime_float = 15, comptime description: *const [15:0]u8 = \"Phong shininess\"} = .{.type = f32, .minValue = 0.1, .maxValue = 50, .defaultValue = 15, .description = \"Phong shininess\"}, comptime rotation: struct{comptime type: type = @Vector(3, f32), comptime minValue: struct{comptime comptime_float = -180, comptime comptime_float = -180, comptime comptime_float = -180} = .{-180, -180, -180}, comptime maxValue: struct{comptime comptime_float = 180, comptime comptime_float = 180, comptime comptime_float = 180} = .{180, 180, 180}, comptime defaultValue: struct{comptime comptime_float = 0, comptime comptime_float = 38.5, comptime comptime_float = 25.8} = .{0, 38.5, 25.8}, comptime description: *const [35:0]u8 = \"Rotate the Mandelbulb in each axis.\"} = .{.type = @Vector(3, f32), .minValue = .{-180, -180, -180}, .maxValue = .{180, 180, 180}, .defaultValue = .{0, 38.5, 25.8}, .description = \"Rotate the Mandelbulb in each axis.\"}, comptime maxIterations: struct{comptime type: type = i32, comptime minValue: comptime_int = 1, comptime maxValue: comptime_int = 20, comptime defaultValue: comptime_int = 6, comptime description: *const [88:0]u8 = \"More iterations reveal more detail in the fractal surface but takes longer to calculate.\"} = .{.type = i32, .minValue = 1, .maxValue = 20, .defaultValue = 6, .description = \"More iterations reveal more detail in the fractal surface but takes longer to calculate.\"}, comptime stepLimit: struct{comptime type: type = i32, comptime minValue: comptime_int = 10, comptime maxValue: comptime_int = 200, comptime defaultValue: comptime_int = 110, comptime description: *const [46:0]u8 = \"The maximum number of steps a ray should take.\"} = .{.type = i32, .minValue = 10, .maxValue = 200, .defaultValue = 110, .description = \"The maximum number of steps a ray should take.\"}, comptime epsilonScale: struct{comptime type: type = f32, comptime minValue: comptime_float = 0.1, comptime maxValue: comptime_float = 1, comptime defaultValue: comptime_float = 1, comptime description: *const [109:0]u8 = \"Scale the epsilon step distance. Smaller values are slower but will generate smoother results for thin areas.\"} = .{.type = f32, .minValue = 0.1, .maxValue = 1, .defaultValue = 1, .description = \"Scale the epsilon step distance. Smaller values are slower but will generate smoother results for thin areas.\"}, comptime size: struct{comptime type: type = @Vector(2, i32), comptime minValue: struct{comptime comptime_int = 100, comptime comptime_int = 100} = .{100, 100}, comptime maxValue: struct{comptime comptime_int = 2048, comptime comptime_int = 2048} = .{2048, 2048}, comptime defaultValue: struct{comptime comptime_int = 512, comptime comptime_int = 512} = .{512, 512}, comptime description: *const [26:0]u8 = \"The output size in pixels.\"} = .{.type = @Vector(2, i32), .minValue = .{100, 100}, .maxValue = .{2048, 2048}, .defaultValue = .{512, 512}, .description = \"The output size in pixels.\"}}",
  length: 1,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        slot: 0,
        structure: s207,
      },
    ],
    methods: [],
    template: null
  },
  slot: 14,
});
const a413 = new Uint8Array([  ]);
Object.assign(s209, {
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
      memory: { array: a413 },
    },
  },
  slot: 17,
});
Object.assign(s210, {
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
        structure: s209,
      },
    ],
    methods: [],
    template: null
  },
  slot: 16,
});
const a414 = new Uint8Array([  ]);
const a415 = new Uint8Array([ 32, 31, 16, 0 ]);
const a416 = new Uint8Array([ 4, 0, 0, 0 ]);
Object.assign(s211, {
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
      memory: { array: a414 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a415 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a416 },
              address: 1056544,
            },
          },
        },
      },
    },
  },
  slot: 106,
});
Object.assign(s212, {
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
        structure: s211,
      },
    ],
    methods: [],
    template: null
  },
  slot: 105,
});
const a417 = new Uint8Array([  ]);
const a418 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s213, {
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
        structure: s212,
      },
    ],
    methods: [],
    template: {
      memory: { array: a417 },
      slots: {
        0: {
          structure: s212,
          memory: { array: a418 },
          slots: {
            0: {
              structure: s211,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 19,
});
Object.assign(s214, {
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
        structure: s213,
      },
    ],
    methods: [],
    template: null
  },
  slot: 18,
});
const a419 = new Uint8Array([  ]);
const a420 = new Uint8Array([  ]);
const a421 = new Uint8Array([ 160, 36, 17, 0 ]);
const a422 = new Uint8Array([ 95, 36, 17, 0 ]);
const a423 = new Uint8Array([ 99, 111, 109, 46, 115, 117, 98, 98, 108, 117, 101, 46, 102, 105, 108, 116, 101, 114, 115, 0 ]);
const a424 = new Uint8Array([ 156, 36, 17, 0 ]);
const a425 = new Uint8Array([ 73, 36, 17, 0 ]);
const a426 = new Uint8Array([ 84, 111, 109, 32, 66, 101, 100, 100, 97, 114, 100, 0 ]);
const a427 = new Uint8Array([ 72, 31, 16, 0 ]);
const a428 = new Uint8Array([ 152, 36, 17, 0 ]);
const a429 = new Uint8Array([ 9, 36, 17, 0 ]);
const a430 = new Uint8Array([ 77, 97, 110, 100, 101, 108, 98, 117, 108, 98, 32, 70, 114, 97, 99, 116, 97, 108, 32, 82, 97, 121, 32, 84, 114, 97, 99, 101, 114, 32, 45, 32, 116, 104, 101, 32, 102, 117, 108, 108, 32, 118, 101, 114, 115, 105, 111, 110, 0 ]);
const a431 = new Uint8Array([ 170, 170, 170, 170 ]);
const a432 = new Uint8Array([ 170, 170, 170, 170 ]);
const a433 = new Uint8Array([ 170, 170, 170, 170 ]);
Object.assign(s215, {
  ...s,
  type: 2,
  name: "mandelbulb.kernel",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a419 },
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
        structure: s208,
      },
      {
        ...m,
        type: 6,
        slot: 5,
        name: "inputImages",
        structure: s210,
      },
      {
        ...m,
        type: 6,
        slot: 6,
        name: "outputImages",
        structure: s214,
      },
    ],
    methods: [],
    template: {
      memory: { array: a420 },
      slots: {
        0: {
          structure: s3,
          memory: { array: a421 },
          slots: {
            0: {
              structure: s2,
              memory: { array: a422 },
              address: 1123488,
              slots: {
                0: {
                  structure: s1,
                  memory: { array: a423 },
                  address: 1123423,
                },
              },
            },
          },
        },
        1: {
          structure: s6,
          memory: { array: a424 },
          slots: {
            0: {
              structure: s5,
              memory: { array: a425 },
              address: 1123484,
              slots: {
                0: {
                  structure: s4,
                  memory: { array: a426 },
                  address: 1123401,
                },
              },
            },
          },
        },
        2: {
          structure: s8,
          memory: { array: a427 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a2 },
              address: 1056584,
            },
          },
        },
        3: {
          structure: s11,
          memory: { array: a428 },
          slots: {
            0: {
              structure: s10,
              memory: { array: a429 },
              address: 1123480,
              slots: {
                0: {
                  structure: s9,
                  memory: { array: a430 },
                  address: 1123337,
                },
              },
            },
          },
        },
        4: {
          structure: s208,
          memory: { array: a431 },
          slots: {
            0: {
              structure: s207,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        5: {
          structure: s210,
          memory: { array: a432 },
          slots: {
            0: {
              structure: s209,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
        6: {
          structure: s214,
          memory: { array: a433 },
          slots: {
            0: {
              structure: s213,
              memory: { array: a101 },
              address: -1431655766,
            },
          },
        },
      },
    },
  },
  slot: 1,
});
const a434 = new Uint8Array([  ]);
Object.assign(s216, {
  ...s,
  type: 2,
  name: "mandelbulb.KernelInput(u8,mandelbulb.kernel)",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a434 },
    },
  },
  slot: 20,
});
Object.assign(s217, {
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
Object.assign(s218, {
  ...s,
  type: 12,
  name: "[_]@Vector(4, u8)",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        structure: s217,
      },
    ],
    methods: [],
    template: null
  },
  slot: 24,
});
Object.assign(s219, {
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
        structure: s218,
      },
    ],
    methods: [],
    template: null
  },
  slot: 23,
});
Object.assign(s220, {
  ...s,
  name: "u32",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s220,
      },
    ],
    methods: [],
    template: null
  },
  slot: 26,
});
const a435 = new Uint8Array([ 0, 0, 0, 0, 1, 0, 0, 0 ]);
Object.assign(s221, {
  ...s,
  type: 9,
  name: "mandelbulb.ColorSpace",
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
      memory: { array: a435 },
    },
  },
  slot: 27,
});
Object.assign(s222, {
  ...s,
  name: "usize",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        structure: s222,
      },
    ],
    methods: [],
    template: null
  },
  slot: 29,
});
Object.assign(s223, {
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
        structure: s34,
      },
    ],
    methods: [],
    template: null
  },
  slot: 107,
});
const a436 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a437 = new Uint8Array([  ]);
const a438 = new Uint8Array([ 32, 31, 16, 0 ]);
Object.assign(s224, {
  ...s,
  type: 2,
  name: "mandelbulb.Image(u8,4,true)",
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
        structure: s219,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        slot: 1,
        name: "width",
        structure: s220,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        slot: 2,
        name: "height",
        structure: s220,
      },
      {
        ...m,
        type: 5,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s221,
      },
      {
        ...m,
        type: 1,
        bitOffset: 168,
        bitSize: 1,
        byteSize: 1,
        slot: 4,
        name: "premultiplied",
        structure: s17,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        slot: 5,
        name: "offset",
        structure: s222,
      },
    ],
    methods: [],
    template: {
      memory: { array: a436 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "Pixel",
        structure: s217,
      },
      {
        ...m,
        type: 7,
        name: "FPixel",
        structure: s223,
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
      memory: { array: a437 },
      slots: {
        0: {
          structure: s8,
          memory: { array: a438 },
          slots: {
            0: {
              structure: s7,
              memory: { array: a416 },
              address: 1056544,
            },
          },
        },
      },
    },
  },
  slot: 22,
});
const a439 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a440 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a441 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a442 = new Uint8Array([  ]);
Object.assign(s225, {
  ...s,
  type: 2,
  name: "mandelbulb.KernelOutput(u8,mandelbulb.kernel)",
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
        structure: s224,
      },
    ],
    methods: [],
    template: {
      memory: { array: a439 },
      slots: {
        0: {
          structure: s224,
          memory: { array: a440 },
          slots: {
            0: {
              structure: s219,
              memory: { array: a441 },
              slots: {
                0: {
                  structure: s218,
                  memory: { array: a442 },
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
const a443 = new Uint8Array([ 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 102, 102, 38, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 180, 194, 0, 0, 0, 0, 0, 0, 24, 66, 0, 0, 40, 194, 0, 0, 24, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 153, 89, 63, 164, 112, 125, 63, 0, 0, 0, 0, 31, 133, 43, 63, 154, 153, 89, 63, 0, 0, 128, 63, 0, 0, 0, 0, 143, 194, 245, 62, 61, 10, 23, 63, 195, 245, 40, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 66, 102, 102, 206, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 204, 76, 63, 225, 122, 20, 63, 0, 0, 32, 64, 0, 0, 128, 64, 0, 0, 0, 65, 0, 0, 0, 0, 0, 0, 128, 63, 205, 204, 204, 62, 205, 204, 76, 62, 0, 0, 0, 0, 195, 245, 40, 63, 0, 0, 112, 65, 6, 0, 0, 0, 110, 0, 0, 0, 0, 0, 128, 63, 1, 0, 0, 0, 0, 0, 0, 0 ]);
Object.assign(s226, {
  ...s,
  type: 2,
  name: "mandelbulb.KernelParameters(mandelbulb.kernel)",
  length: 1,
  byteSize: 256,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 2,
        bitOffset: 1408,
        slot: 0,
        name: "antialiasing",
        structure: s7,
      },
      {
        ...m,
        type: 1,
        bitOffset: 1984,
        bitSize: 1,
        byteSize: 1,
        slot: 1,
        name: "phong",
        structure: s17,
      },
      {
        ...m,
        type: 1,
        bitOffset: 1992,
        bitSize: 1,
        byteSize: 1,
        slot: 2,
        name: "julia",
        structure: s17,
      },
      {
        ...m,
        type: 1,
        bitOffset: 2000,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "radiolaria",
        structure: s17,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1440,
        slot: 4,
        name: "radiolariaFactor",
        structure: s34,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1472,
        slot: 5,
        name: "shadows",
        structure: s34,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1504,
        slot: 6,
        name: "ambientOcclusion",
        structure: s34,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1536,
        slot: 7,
        name: "ambientOcclusionEmphasis",
        structure: s34,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1568,
        slot: 8,
        name: "bounding",
        structure: s34,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1600,
        slot: 9,
        name: "bailout",
        structure: s34,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1632,
        slot: 10,
        name: "power",
        structure: s34,
      },
      {
        ...m,
        type: 6,
        bitOffset: 1280,
        bitSize: 64,
        byteSize: 8,
        slot: 11,
        name: "phase",
        structure: s69,
      },
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 96,
        byteSize: 16,
        slot: 12,
        name: "julia_c",
        structure: s81,
      },
      {
        ...m,
        type: 6,
        bitOffset: 128,
        bitSize: 96,
        byteSize: 16,
        slot: 13,
        name: "cameraPosition",
        structure: s81,
      },
      {
        ...m,
        type: 6,
        bitOffset: 256,
        bitSize: 96,
        byteSize: 16,
        slot: 14,
        name: "cameraPositionFine",
        structure: s81,
      },
      {
        ...m,
        type: 6,
        bitOffset: 384,
        bitSize: 96,
        byteSize: 16,
        slot: 15,
        name: "cameraRotation",
        structure: s81,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1664,
        slot: 16,
        name: "cameraZoom",
        structure: s34,
      },
      {
        ...m,
        type: 6,
        bitOffset: 512,
        bitSize: 96,
        byteSize: 16,
        slot: 17,
        name: "light",
        structure: s81,
      },
      {
        ...m,
        type: 6,
        bitOffset: 640,
        bitSize: 96,
        byteSize: 16,
        slot: 18,
        name: "colorBackground",
        structure: s81,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1696,
        slot: 19,
        name: "colorBackgroundTransparency",
        structure: s34,
      },
      {
        ...m,
        type: 6,
        bitOffset: 768,
        bitSize: 96,
        byteSize: 16,
        slot: 20,
        name: "colorDiffuse",
        structure: s81,
      },
      {
        ...m,
        type: 6,
        bitOffset: 896,
        bitSize: 96,
        byteSize: 16,
        slot: 21,
        name: "colorAmbient",
        structure: s81,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1728,
        slot: 22,
        name: "colorAmbientIntensity",
        structure: s34,
      },
      {
        ...m,
        type: 6,
        bitOffset: 1024,
        bitSize: 96,
        byteSize: 16,
        slot: 23,
        name: "colorLight",
        structure: s81,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1760,
        slot: 24,
        name: "colorSpread",
        structure: s34,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1792,
        slot: 25,
        name: "rimLight",
        structure: s34,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1824,
        slot: 26,
        name: "specularity",
        structure: s34,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1856,
        slot: 27,
        name: "specularExponent",
        structure: s34,
      },
      {
        ...m,
        type: 6,
        bitOffset: 1152,
        bitSize: 96,
        byteSize: 16,
        slot: 28,
        name: "rotation",
        structure: s81,
      },
      {
        ...m,
        type: 2,
        bitOffset: 1888,
        slot: 29,
        name: "maxIterations",
        structure: s7,
      },
      {
        ...m,
        type: 2,
        bitOffset: 1920,
        slot: 30,
        name: "stepLimit",
        structure: s7,
      },
      {
        ...m,
        type: 4,
        bitOffset: 1952,
        slot: 31,
        name: "epsilonScale",
        structure: s34,
      },
      {
        ...m,
        type: 6,
        bitOffset: 1344,
        bitSize: 64,
        byteSize: 8,
        slot: 32,
        name: "size",
        structure: s198,
      },
    ],
    methods: [],
    template: {
      memory: { array: a443 },
    },
  },
  slot: 30,
});
Object.assign(s227, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(mandelbulb.createOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
Object.assign(s228, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(mandelbulb.createOutput)).Fn.return_type.?).ErrorUnion.error_set!mandelbulb.KernelOutput(u8,mandelbulb.kernel)",
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
        structure: s225,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s227,
      },
    ],
    methods: [],
    template: null
  },
  slot: 37,
});
Object.assign(s229, {
  ...s,
  type: 3,
  name: "createOutput",
  length: 1,
  byteSize: 304,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 2048,
        slot: 0,
        name: "0",
        structure: s220,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 2080,
        slot: 1,
        name: "1",
        structure: s220,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 2432,
        bitSize: 0,
        byteSize: 0,
        slot: 2,
        name: "2",
        structure: s216,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 2048,
        byteSize: 256,
        slot: 3,
        name: "3",
        structure: s226,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 2112,
        bitSize: 224,
        byteSize: 28,
        slot: 4,
        name: "retval",
        structure: s228,
      },
    ],
    methods: [],
    template: null
  },
  slot: 35,
});
Object.assign(s230, {
  ...s,
  type: 8,
  name: "@typeInfo(@typeInfo(@TypeOf(mandelbulb.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set",
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
  slot: 109,
});
Object.assign(s231, {
  ...s,
  type: 7,
  name: "@typeInfo(@typeInfo(@TypeOf(mandelbulb.createPartialOutput)).Fn.return_type.?).ErrorUnion.error_set!mandelbulb.KernelOutput(u8,mandelbulb.kernel)",
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
        structure: s225,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s230,
      },
    ],
    methods: [],
    template: null
  },
  slot: 38,
});
Object.assign(s232, {
  ...s,
  type: 3,
  name: "createPartialOutput",
  length: 1,
  byteSize: 304,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 2048,
        slot: 0,
        name: "0",
        structure: s220,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 2080,
        slot: 1,
        name: "1",
        structure: s220,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 2112,
        slot: 2,
        name: "2",
        structure: s220,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 2144,
        slot: 3,
        name: "3",
        structure: s220,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 2432,
        bitSize: 0,
        byteSize: 0,
        slot: 4,
        name: "4",
        structure: s216,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 0,
        bitSize: 2048,
        byteSize: 256,
        slot: 5,
        name: "5",
        structure: s226,
      },
      {
        ...m,
        type: 6,
        isRequired: true,
        bitOffset: 2176,
        bitSize: 224,
        byteSize: 28,
        slot: 6,
        name: "retval",
        structure: s231,
      },
    ],
    methods: [],
    template: null
  },
  slot: 36,
});
const f0 = {
  argStruct: s229,
  thunk: 1,
  name: "createOutput",
};
const f1 = {
  argStruct: s232,
  thunk: 2,
  name: "createPartialOutput",
};
Object.assign(s233, {
  ...s,
  type: 2,
  name: "mandelbulb",
  length: 1,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    methods: [],
    template: {
      memory: { array: a442 },
    },
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        name: "kernel",
        structure: s215,
      },
      {
        ...m,
        type: 7,
        name: "Input",
        structure: s216,
      },
      {
        ...m,
        type: 7,
        name: "Output",
        structure: s225,
      },
      {
        ...m,
        type: 7,
        name: "Parameters",
        structure: s226,
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
  s220, s221, s222, s223, s224, s225, s226, s227, s228, s229,
  s230, s231, s232, s233,
];
const linkage = finalizeStructures(structures);
const module = s233.constructor;

// initiate loading and compilation of WASM bytecodes
const wasmPromise = (async () => {
  const url = import.meta.ROLLUP_FILE_URL_8d9e4dd2;
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