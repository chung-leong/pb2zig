import { usePrimitive, useType, useUint, useArray, usePointer, useObject, useComptime, useInt, useFloat, useStruct, useVector, useSlice, useEnumeration, useExtendedUint, useErrorSet, useErrorUnion, useArgStruct, createEnvironment } from 'zigar-runtime';

// activate features
usePrimitive();
useType();
useUint();
useArray();
usePointer();
useObject();
useComptime();
useInt();
useFloat();
useStruct();
useVector();
useSlice();
useEnumeration();
useExtendedUint();
useErrorSet();
useErrorUnion();
useArgStruct();

// structure defaults
const s = {
  constructor: null,
  typedArray: null,
  type: 0,
  name: undefined,
  byteSize: 0,
  align: 0,
  isConst: false,
  hasPointer: false,
  instance: {
    members: [],
    methods: [],
    template: null,
  },
  static: {
    members: [],
    methods: [],
    template: null,
  },
};

// member defaults
const m = {
  type: 0,
  isRequired: false,
};

const s0 = {}, s1 = {}, s2 = {}, s3 = {}, s4 = {}, s5 = {}, s6 = {}, s7 = {}, s8 = {}, s9 = {};
const s10 = {}, s11 = {}, s12 = {}, s13 = {}, s14 = {}, s15 = {}, s16 = {}, s17 = {}, s18 = {}, s19 = {};
const s20 = {}, s21 = {}, s22 = {}, s23 = {}, s24 = {}, s25 = {}, s26 = {}, s27 = {}, s28 = {}, s29 = {};
const s30 = {}, s31 = {}, s32 = {}, s33 = {}, s34 = {}, s35 = {}, s36 = {}, s37 = {}, s38 = {}, s39 = {};
const s40 = {}, s41 = {}, s42 = {}, s43 = {}, s44 = {}, s45 = {}, s46 = {};
const o0 = {}, o1 = {}, o2 = {}, o3 = {}, o4 = {}, o5 = {}, o6 = {}, o7 = {}, o8 = {}, o9 = {};
const o10 = {}, o11 = {}, o12 = {}, o13 = {}, o14 = {}, o15 = {}, o16 = {}, o17 = {}, o18 = {}, o19 = {};
const o20 = {}, o21 = {}, o22 = {}, o23 = {}, o24 = {}, o25 = {}, o26 = {}, o27 = {}, o28 = {}, o29 = {};
const o30 = {}, o31 = {}, o32 = {}, o33 = {}, o34 = {}, o35 = {}, o36 = {}, o37 = {}, o38 = {}, o39 = {};
const o40 = {}, o41 = {}, o42 = {}, o43 = {}, o44 = {}, o45 = {}, o46 = {}, o47 = {}, o48 = {}, o49 = {};
const o50 = {}, o51 = {}, o52 = {}, o53 = {}, o54 = {}, o55 = {}, o56 = {}, o57 = {}, o58 = {}, o59 = {};
const o60 = {}, o61 = {}, o62 = {}, o63 = {}, o64 = {}, o65 = {}, o66 = {}, o67 = {}, o68 = {}, o69 = {};
const o70 = {}, o71 = {}, o72 = {}, o73 = {}, o74 = {}, o75 = {}, o76 = {}, o77 = {}, o78 = {}, o79 = {};
const o80 = {}, o81 = {}, o82 = {}, o83 = {}, o84 = {}, o85 = {}, o86 = {}, o87 = {}, o88 = {}, o89 = {};
const o90 = {}, o91 = {}, o92 = {}, o93 = {}, o94 = {}, o95 = {}, o96 = {}, o97 = {}, o98 = {}, o99 = {};
const o100 = {}, o101 = {}, o102 = {}, o103 = {}, o104 = {}, o105 = {}, o106 = {}, o107 = {}, o108 = {}, o109 = {};
const o110 = {}, o111 = {}, o112 = {};
const a0 = new Uint8Array();
const a1 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 191 ]);
const a2 = new Uint8Array();
const a3 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 191 ]);
const a4 = new Uint8Array();
const a5 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 191 ]);
const a6 = new Uint8Array();
const a7 = new Uint8Array();
const a8 = new Uint8Array();
const a9 = new Uint8Array();
const a10 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a11 = new Uint8Array();
const a12 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a13 = new Uint8Array();
const a14 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a15 = new Uint8Array();
const a16 = new Uint8Array();
const a17 = new Uint8Array();
const a18 = new Uint8Array();
const a19 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 224, 63 ]);
const a20 = new Uint8Array();
const a21 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a22 = new Uint8Array();
const a23 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a24 = new Uint8Array();
const a25 = new Uint8Array([ 51, 51, 51, 51, 51, 51, 211, 63 ]);
const a26 = new Uint8Array();
const a27 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a28 = new Uint8Array();
const a29 = new Uint8Array([ 102, 102, 102, 102, 102, 102, 230, 63 ]);
const a30 = new Uint8Array();
const a31 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 185, 63 ]);
const a32 = new Uint8Array();
const a33 = new Uint8Array([ 51, 51, 51, 51, 51, 51, 211, 63 ]);
const a34 = new Uint8Array();
const a35 = new Uint8Array([ 154, 153, 153, 153, 153, 153, 233, 63 ]);
const a36 = new Uint8Array();
const a37 = new Uint8Array();
const a38 = new Uint8Array();
const a39 = new Uint8Array();
const a40 = new Uint8Array();
const a41 = new Uint8Array();
const a42 = new Uint8Array();
const a43 = new Uint8Array();
const a44 = new Uint8Array();
const a45 = new Uint8Array([ 3 ]);
const a46 = new Uint8Array();
const a47 = new Uint8Array();
const a48 = new Uint8Array([ 20, 5, 0, 1 ]);
const a49 = new Uint8Array([ 89, 111, 117, 114, 32, 78, 97, 109, 101, 115, 112, 97, 99, 101, 0 ]);
const a50 = new Uint8Array([ 46, 5, 0, 1 ]);
const a51 = new Uint8Array([ 89, 111, 117, 114, 32, 86, 101, 110, 100, 111, 114, 0 ]);
const a52 = new Uint8Array();
const a53 = new Uint8Array([ 1 ]);
const a54 = new Uint8Array();
const a55 = new Uint8Array();
const a56 = new Uint8Array();
const a57 = new Uint8Array([ 0 ]);
const a58 = new Uint8Array([ 1 ]);
const a59 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a61 = new Uint8Array();
const a62 = new Uint8Array();
const a63 = new Uint8Array();
const a64 = new Uint8Array();
const a65 = new Uint8Array([ 3 ]);
const a66 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a69 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a71 = new Uint8Array();
const a72 = new Uint8Array();
const a73 = new Uint8Array();
const a74 = new Uint8Array();
const a75 = new Uint8Array([ 3 ]);
const a76 = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
const a79 = new Uint8Array([ 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 153, 153, 62, 0, 0, 128, 63, 51, 51, 51, 63, 0, 0, 0, 0, 205, 204, 204, 61, 154, 153, 153, 62, 205, 204, 76, 63, 0, 0, 0, 0 ]);
const a80 = new Uint8Array([ 27, 0 ]);
const a81 = new Uint8Array([ 27, 0 ]);
const a82 = new Uint8Array();
const a83 = new Uint8Array();
const a84 = new Uint8Array();
const a85 = new Uint8Array();

// define objects
Object.assign(o0, {
  slots: {
    0: o1, 1: o3, 2: o5,
  },
});
Object.assign(o1, {
  structure: s8,
  memory: { array: a0 },
  const: true,
  slots: {
    0: o2,
  },
});
Object.assign(o2, {
  structure: s9,
  memory: { array: a1 },
  const: true,
});
Object.assign(o3, {
  structure: s8,
  memory: { array: a2 },
  const: true,
  slots: {
    0: o4,
  },
});
Object.assign(o4, {
  structure: s9,
  memory: { array: a3 },
  const: true,
});
Object.assign(o5, {
  structure: s8,
  memory: { array: a4 },
  const: true,
  slots: {
    0: o6,
  },
});
Object.assign(o6, {
  structure: s9,
  memory: { array: a5 },
  const: true,
});
Object.assign(o7, {
  slots: {
    0: o8, 1: o9, 2: o10,
  },
});
Object.assign(o8, {
  structure: s10,
  memory: { array: a6 },
  const: true,
  slots: {
    0: o1, 1: o3, 2: o5,
  },
});
Object.assign(o9, {
  structure: s10,
  memory: { array: a7 },
  const: true,
  slots: {
    0: o1, 1: o3, 2: o5,
  },
});
Object.assign(o10, {
  structure: s10,
  memory: { array: a8 },
  const: true,
  slots: {
    0: o1, 1: o3, 2: o5,
  },
});
Object.assign(o11, {
  slots: {
    0: o12, 1: o14, 2: o16,
  },
});
Object.assign(o12, {
  structure: s8,
  memory: { array: a9 },
  const: true,
  slots: {
    0: o13,
  },
});
Object.assign(o13, {
  structure: s9,
  memory: { array: a10 },
  const: true,
});
Object.assign(o14, {
  structure: s8,
  memory: { array: a11 },
  const: true,
  slots: {
    0: o15,
  },
});
Object.assign(o15, {
  structure: s9,
  memory: { array: a12 },
  const: true,
});
Object.assign(o16, {
  structure: s8,
  memory: { array: a13 },
  const: true,
  slots: {
    0: o17,
  },
});
Object.assign(o17, {
  structure: s9,
  memory: { array: a14 },
  const: true,
});
Object.assign(o18, {
  slots: {
    0: o19, 1: o20, 2: o21,
  },
});
Object.assign(o19, {
  structure: s12,
  memory: { array: a15 },
  const: true,
  slots: {
    0: o12, 1: o14, 2: o16,
  },
});
Object.assign(o20, {
  structure: s12,
  memory: { array: a16 },
  const: true,
  slots: {
    0: o12, 1: o14, 2: o16,
  },
});
Object.assign(o21, {
  structure: s12,
  memory: { array: a17 },
  const: true,
  slots: {
    0: o12, 1: o14, 2: o16,
  },
});
Object.assign(o22, {
  slots: {
    0: o23, 1: o25, 2: o27,
  },
});
Object.assign(o23, {
  structure: s8,
  memory: { array: a18 },
  const: true,
  slots: {
    0: o24,
  },
});
Object.assign(o24, {
  structure: s9,
  memory: { array: a19 },
  const: true,
});
Object.assign(o25, {
  structure: s8,
  memory: { array: a20 },
  const: true,
  slots: {
    0: o26,
  },
});
Object.assign(o26, {
  structure: s9,
  memory: { array: a21 },
  const: true,
});
Object.assign(o27, {
  structure: s8,
  memory: { array: a22 },
  const: true,
  slots: {
    0: o28,
  },
});
Object.assign(o28, {
  structure: s9,
  memory: { array: a23 },
  const: true,
});
Object.assign(o29, {
  slots: {
    0: o30, 1: o32, 2: o34,
  },
});
Object.assign(o30, {
  structure: s8,
  memory: { array: a24 },
  const: true,
  slots: {
    0: o31,
  },
});
Object.assign(o31, {
  structure: s9,
  memory: { array: a25 },
  const: true,
});
Object.assign(o32, {
  structure: s8,
  memory: { array: a26 },
  const: true,
  slots: {
    0: o33,
  },
});
Object.assign(o33, {
  structure: s9,
  memory: { array: a27 },
  const: true,
});
Object.assign(o34, {
  structure: s8,
  memory: { array: a28 },
  const: true,
  slots: {
    0: o35,
  },
});
Object.assign(o35, {
  structure: s9,
  memory: { array: a29 },
  const: true,
});
Object.assign(o36, {
  slots: {
    0: o37, 1: o39, 2: o41,
  },
});
Object.assign(o37, {
  structure: s8,
  memory: { array: a30 },
  const: true,
  slots: {
    0: o38,
  },
});
Object.assign(o38, {
  structure: s9,
  memory: { array: a31 },
  const: true,
});
Object.assign(o39, {
  structure: s8,
  memory: { array: a32 },
  const: true,
  slots: {
    0: o40,
  },
});
Object.assign(o40, {
  structure: s9,
  memory: { array: a33 },
  const: true,
});
Object.assign(o41, {
  structure: s8,
  memory: { array: a34 },
  const: true,
  slots: {
    0: o42,
  },
});
Object.assign(o42, {
  structure: s9,
  memory: { array: a35 },
  const: true,
});
Object.assign(o43, {
  slots: {
    0: o44, 1: o45, 2: o46,
  },
});
Object.assign(o44, {
  structure: s14,
  memory: { array: a36 },
  const: true,
  slots: {
    0: o23, 1: o25, 2: o27,
  },
});
Object.assign(o45, {
  structure: s15,
  memory: { array: a37 },
  const: true,
  slots: {
    0: o30, 1: o32, 2: o34,
  },
});
Object.assign(o46, {
  structure: s16,
  memory: { array: a38 },
  const: true,
  slots: {
    0: o37, 1: o39, 2: o41,
  },
});
Object.assign(o47, {
  slots: {
    0: o48, 1: o50, 2: o51, 3: o52,
  },
});
Object.assign(o48, {
  structure: s0,
  memory: { array: a39 },
  const: true,
  slots: {
    0: o49,
  },
});
Object.assign(o49, {
  structure: s20,
});
Object.assign(o50, {
  structure: s11,
  memory: { array: a40 },
  const: true,
  slots: {
    0: o8, 1: o9, 2: o10,
  },
});
Object.assign(o51, {
  structure: s13,
  memory: { array: a41 },
  const: true,
  slots: {
    0: o19, 1: o20, 2: o21,
  },
});
Object.assign(o52, {
  structure: s17,
  memory: { array: a42 },
  const: true,
  slots: {
    0: o44, 1: o45, 2: o46,
  },
});
Object.assign(o53, {
  slots: {
    0: o54,
  },
});
Object.assign(o54, {
  structure: s21,
  memory: { array: a43 },
  const: true,
  slots: {
    0: o48, 1: o50, 2: o51, 3: o52,
  },
});
Object.assign(o55, {
  slots: {
    0: o56,
  },
});
Object.assign(o56, {
  structure: s6,
  memory: { array: a44 },
  const: true,
  slots: {
    0: o57,
  },
});
Object.assign(o57, {
  structure: s7,
  memory: { array: a45 },
  const: true,
});
Object.assign(o58, {
  slots: {
    0: o59,
  },
});
Object.assign(o59, {
  structure: s23,
  memory: { array: a46 },
  const: true,
  slots: {
    0: o56,
  },
});
Object.assign(o60, {
  slots: {
    0: o61,
  },
});
Object.assign(o61, {
  structure: s23,
  memory: { array: a47 },
  const: true,
  slots: {
    0: o56,
  },
});
Object.assign(o62, {
  slots: {
    0: o63, 1: o65, 2: o67, 3: o69, 4: o70, 5: o71,
  },
});
Object.assign(o63, {
  structure: s3,
  memory: { array: a48 },
  const: true,
  slots: {
    0: o64,
  },
});
Object.assign(o64, {
  structure: s2,
  memory: { array: a49 },
  reloc: 16778516,
});
Object.assign(o65, {
  structure: s5,
  memory: { array: a50 },
  const: true,
  slots: {
    0: o66,
  },
});
Object.assign(o66, {
  structure: s4,
  memory: { array: a51 },
  reloc: 16778542,
});
Object.assign(o67, {
  structure: s6,
  memory: { array: a52 },
  const: true,
  slots: {
    0: o68,
  },
});
Object.assign(o68, {
  structure: s7,
  memory: { array: a53 },
  const: true,
});
Object.assign(o69, {
  structure: s22,
  memory: { array: a54 },
  const: true,
  slots: {
    0: o54,
  },
});
Object.assign(o70, {
  structure: s24,
  memory: { array: a55 },
  const: true,
  slots: {
    0: o59,
  },
});
Object.assign(o71, {
  structure: s25,
  memory: { array: a56 },
  const: true,
  slots: {
    0: o61,
  },
});
Object.assign(o72, {
  slots: {
    0: o73, 1: o74,
  },
});
Object.assign(o73, {
  structure: s31,
  memory: { array: a57 },
  const: true,
});
Object.assign(o74, {
  structure: s31,
  memory: { array: a58 },
  const: true,
});
Object.assign(o75, {
  memory: { array: a59 },
  slots: {
    0: o76,
  },
});
Object.assign(o76, {
  structure: s29,
  memory: { array: a59, offset: 0, length: 8 },
  slots: {
    0: o77,
  },
});
Object.assign(o77, {
  structure: s28,
  memory: { array: a61 },
  reloc: 0,
});
Object.assign(o78, {
  slots: {
    0: o79, 1: o81, 2: o83,
  },
});
Object.assign(o79, {
  structure: s0,
  memory: { array: a62 },
  const: true,
  slots: {
    0: o80,
  },
});
Object.assign(o80, {
  structure: s27,
});
Object.assign(o81, {
  structure: s0,
  memory: { array: a63 },
  const: true,
  slots: {
    0: o82,
  },
});
Object.assign(o82, {
  structure: s19,
});
Object.assign(o83, {
  structure: s6,
  memory: { array: a64 },
  const: true,
  slots: {
    0: o84,
  },
});
Object.assign(o84, {
  structure: s7,
  memory: { array: a65 },
  const: true,
});
Object.assign(o85, {
  memory: { array: a66 },
  slots: {
    0: o86,
  },
});
Object.assign(o86, {
  structure: s33,
  memory: { array: a66 },
  slots: {
    0: o87,
  },
});
Object.assign(o87, {
  structure: s29,
  memory: { array: a66, offset: 0, length: 8 },
  slots: {
    0: o77,
  },
});
Object.assign(o88, {
  memory: { array: a69 },
  slots: {
    0: o89,
  },
});
Object.assign(o89, {
  structure: s36,
  memory: { array: a69, offset: 0, length: 8 },
  slots: {
    0: o90,
  },
});
Object.assign(o90, {
  structure: s35,
  memory: { array: a71 },
  reloc: 0,
});
Object.assign(o91, {
  slots: {
    0: o92, 1: o93, 2: o94,
  },
});
Object.assign(o92, {
  structure: s0,
  memory: { array: a72 },
  const: true,
  slots: {
    0: o80,
  },
});
Object.assign(o93, {
  structure: s0,
  memory: { array: a73 },
  const: true,
  slots: {
    0: o82,
  },
});
Object.assign(o94, {
  structure: s6,
  memory: { array: a74 },
  const: true,
  slots: {
    0: o95,
  },
});
Object.assign(o95, {
  structure: s7,
  memory: { array: a75 },
  const: true,
});
Object.assign(o96, {
  memory: { array: a76 },
  slots: {
    0: o97,
  },
});
Object.assign(o97, {
  structure: s37,
  memory: { array: a76 },
  slots: {
    0: o98,
  },
});
Object.assign(o98, {
  structure: s36,
  memory: { array: a76, offset: 0, length: 8 },
  slots: {
    0: o90,
  },
});
Object.assign(o99, {
  memory: { array: a79 },
});
Object.assign(o100, {
  slots: {
    0: o101,
  },
});
Object.assign(o101, {
  structure: s40,
  memory: { array: a80 },
  const: true,
});
Object.assign(o102, {
  slots: {
    0: o103,
  },
});
Object.assign(o103, {
  structure: s43,
  memory: { array: a81 },
  const: true,
});
Object.assign(o104, {
  slots: {
    0: o105, 1: o107, 2: o109, 3: o111,
  },
});
Object.assign(o105, {
  structure: s0,
  memory: { array: a82 },
  const: true,
  slots: {
    0: o106,
  },
});
Object.assign(o106, {
  structure: s26,
});
Object.assign(o107, {
  structure: s0,
  memory: { array: a83 },
  const: true,
  slots: {
    0: o108,
  },
});
Object.assign(o108, {
  structure: s34,
});
Object.assign(o109, {
  structure: s0,
  memory: { array: a84 },
  const: true,
  slots: {
    0: o110,
  },
});
Object.assign(o110, {
  structure: s38,
});
Object.assign(o111, {
  structure: s0,
  memory: { array: a85 },
  const: true,
  slots: {
    0: o112,
  },
});
Object.assign(o112, {
  structure: s39,
});

// define functions
const f0 = {
  argStruct: s42,
  thunkId: 2,
  name: "createOutput",
};
const f1 = {
  argStruct: s45,
  thunkId: 3,
  name: "createPartialOutput",
};

// define structures
Object.assign(s0, {
  ...s,
  name: "type",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 6,
        bitOffset: 0,
        bitSize: 0,
        byteSize: 0,
        slot: 0,
        structure: s0,
      },
    ],
    methods: [],
  },
});
Object.assign(s1, {
  ...s,
  name: "u8",
  byteSize: 1,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        bitSize: 8,
        byteSize: 1,
        structure: s1,
      },
    ],
    methods: [],
  },
});
Object.assign(s2, {
  ...s,
  type: 1,
  name: "[14:0]u8",
  length: 14,
  byteSize: 15,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitSize: 8,
        byteSize: 1,
        structure: s1,
      },
    ],
    methods: [],
  },
});
Object.assign(s3, {
  ...s,
  type: 13,
  name: "*const [14:0]u8",
  byteSize: 4,
  align: 4,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        structure: s2,
      },
    ],
    methods: [],
  },
});
Object.assign(s4, {
  ...s,
  type: 1,
  name: "[11:0]u8",
  length: 11,
  byteSize: 12,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitSize: 8,
        byteSize: 1,
        structure: s1,
      },
    ],
    methods: [],
  },
});
Object.assign(s5, {
  ...s,
  type: 13,
  name: "*const [11:0]u8",
  byteSize: 4,
  align: 4,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        structure: s4,
      },
    ],
    methods: [],
  },
});
Object.assign(s6, {
  ...s,
  name: "comptime_int",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        bitOffset: 0,
        bitSize: 0,
        byteSize: 0,
        slot: 0,
        structure: s6,
      },
    ],
    methods: [],
  },
});
Object.assign(s7, {
  ...s,
  name: "i8",
  byteSize: 1,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 2,
        bitOffset: 0,
        bitSize: 8,
        byteSize: 1,
        structure: s7,
      },
    ],
    methods: [],
  },
});
Object.assign(s8, {
  ...s,
  name: "comptime_float",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        bitOffset: 0,
        bitSize: 0,
        byteSize: 0,
        slot: 0,
        structure: s8,
      },
    ],
    methods: [],
  },
});
Object.assign(s9, {
  ...s,
  name: "f64",
  byteSize: 8,
  align: 8,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 0,
        bitSize: 64,
        byteSize: 8,
        structure: s9,
      },
    ],
    methods: [],
  },
});
Object.assign(s10, {
  ...s,
  type: 2,
  name: "Struct3651955411",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        structure: s8,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        structure: s8,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        structure: s8,
      },
    ],
    methods: [],
    template: o0
  },
});
Object.assign(s11, {
  ...s,
  type: 2,
  name: "Struct1390697979",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        structure: s10,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        structure: s10,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        structure: s10,
      },
    ],
    methods: [],
    template: o7
  },
});
Object.assign(s12, {
  ...s,
  type: 2,
  name: "Struct2060771296",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        structure: s8,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        structure: s8,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        structure: s8,
      },
    ],
    methods: [],
    template: o11
  },
});
Object.assign(s13, {
  ...s,
  type: 2,
  name: "Struct644281370",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        structure: s12,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        structure: s12,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        structure: s12,
      },
    ],
    methods: [],
    template: o18
  },
});
Object.assign(s14, {
  ...s,
  type: 2,
  name: "Struct3800968537",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        structure: s8,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        structure: s8,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        structure: s8,
      },
    ],
    methods: [],
    template: o22
  },
});
Object.assign(s15, {
  ...s,
  type: 2,
  name: "Struct2724820031",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        structure: s8,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        structure: s8,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        structure: s8,
      },
    ],
    methods: [],
    template: o29
  },
});
Object.assign(s16, {
  ...s,
  type: 2,
  name: "Struct1350969599",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        structure: s8,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        structure: s8,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        structure: s8,
      },
    ],
    methods: [],
    template: o36
  },
});
Object.assign(s17, {
  ...s,
  type: 2,
  name: "Struct2019922924",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        structure: s14,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        structure: s15,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        structure: s16,
      },
    ],
    methods: [],
    template: o43
  },
});
Object.assign(s18, {
  ...s,
  name: "f32",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        structure: s18,
      },
    ],
    methods: [],
  },
});
Object.assign(s19, {
  ...s,
  type: 15,
  name: "@Vector(3, f32)",
  length: 3,
  byteSize: 16,
  align: 16,
  instance: {
    members: [
      {
        ...m,
        type: 4,
        bitSize: 32,
        byteSize: 4,
        structure: s18,
      },
    ],
    methods: [],
  },
});
Object.assign(s20, {
  ...s,
  type: 1,
  name: "[3]@Vector(3, f32)",
  length: 3,
  byteSize: 48,
  align: 16,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 96,
        byteSize: 16,
        structure: s19,
      },
    ],
    methods: [],
  },
});
Object.assign(s21, {
  ...s,
  type: 2,
  name: "Struct3448744814",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        name: "type",
        structure: s0,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        name: "minValue",
        structure: s11,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        name: "maxValue",
        structure: s13,
      },
      {
        ...m,
        type: 7,
        slot: 3,
        name: "defaultValue",
        structure: s17,
      },
    ],
    methods: [],
    template: o47
  },
});
Object.assign(s22, {
  ...s,
  type: 2,
  name: "Struct3437036445",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        name: "transform",
        structure: s21,
      },
    ],
    methods: [],
    template: o53
  },
});
Object.assign(s23, {
  ...s,
  type: 2,
  name: "Struct3196272719",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        name: "channels",
        structure: s6,
      },
    ],
    methods: [],
    template: o55
  },
});
Object.assign(s24, {
  ...s,
  type: 2,
  name: "Struct3897456493",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        name: "src",
        structure: s23,
      },
    ],
    methods: [],
    template: o58
  },
});
Object.assign(s25, {
  ...s,
  type: 2,
  name: "Struct4047475671",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        name: "dst",
        structure: s23,
      },
    ],
    methods: [],
    template: o60
  },
});
Object.assign(s26, {
  ...s,
  type: 2,
  name: "simple.kernel",
  align: 1,
  static: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        name: "namespace",
        structure: s3,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        name: "vendor",
        structure: s5,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        name: "version",
        structure: s6,
      },
      {
        ...m,
        type: 7,
        slot: 3,
        name: "parameters",
        structure: s22,
      },
      {
        ...m,
        type: 7,
        slot: 4,
        name: "inputImages",
        structure: s24,
      },
      {
        ...m,
        type: 7,
        slot: 5,
        name: "outputImages",
        structure: s25,
      },
    ],
    methods: [],
    template: o62
  },
});
Object.assign(s27, {
  ...s,
  type: 15,
  name: "@Vector(4, u8)",
  length: 4,
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitSize: 8,
        byteSize: 1,
        structure: s1,
      },
    ],
    methods: [],
  },
});
Object.assign(s28, {
  ...s,
  type: 14,
  name: "[_]const @Vector(4, u8)",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 32,
        byteSize: 4,
        structure: s27,
      },
    ],
    methods: [],
  },
});
Object.assign(s29, {
  ...s,
  type: 13,
  name: "[]const @Vector(4, u8)",
  byteSize: 8,
  align: 4,
  isConst: true,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        structure: s28,
      },
    ],
    methods: [],
  },
});
Object.assign(s30, {
  ...s,
  name: "u32",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        structure: s30,
      },
    ],
    methods: [],
  },
});
Object.assign(s31, {
  ...s,
  type: 11,
  name: "simple.ColorSpace",
  byteSize: 1,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        bitSize: 1,
        byteSize: 1,
        structure: s31,
      },
    ],
    methods: [],
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        name: "srgb",
        structure: s31,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        name: "display-p3",
        structure: s31,
      },
    ],
    methods: [],
    template: o72
  },
});
Object.assign(s32, {
  ...s,
  name: "usize",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        structure: s32,
      },
    ],
    methods: [],
  },
});
Object.assign(s33, {
  ...s,
  type: 2,
  name: "simple.Image(u8,3,false)",
  byteSize: 24,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        isRequired: true,
        bitOffset: 0,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        name: "data",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        bitSize: 32,
        byteSize: 4,
        slot: 1,
        name: "width",
        structure: s30,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        bitSize: 32,
        byteSize: 4,
        slot: 2,
        name: "height",
        structure: s30,
      },
      {
        ...m,
        type: 3,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s31,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        bitSize: 32,
        byteSize: 4,
        slot: 4,
        name: "offset",
        structure: s32,
      },
    ],
    methods: [],
    template: o75
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        name: "Pixel",
        structure: s0,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        name: "FPixel",
        structure: s0,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        name: "channels",
        structure: s6,
      },
    ],
    methods: [],
    template: o78
  },
});
Object.assign(s34, {
  ...s,
  type: 2,
  name: "simple.KernelInput(u8,simple.kernel)",
  byteSize: 24,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitOffset: 0,
        bitSize: 192,
        byteSize: 24,
        slot: 0,
        name: "src",
        structure: s33,
      },
    ],
    methods: [],
    template: o85
  },
});
Object.assign(s35, {
  ...s,
  type: 14,
  name: "[_]@Vector(4, u8)",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 32,
        byteSize: 4,
        structure: s27,
      },
    ],
    methods: [],
  },
});
Object.assign(s36, {
  ...s,
  type: 13,
  name: "[]@Vector(4, u8)",
  byteSize: 8,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        structure: s35,
      },
    ],
    methods: [],
  },
});
Object.assign(s37, {
  ...s,
  type: 2,
  name: "simple.Image(u8,3,true)",
  byteSize: 24,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        isRequired: true,
        bitOffset: 0,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        name: "data",
        structure: s36,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 64,
        bitSize: 32,
        byteSize: 4,
        slot: 1,
        name: "width",
        structure: s30,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 96,
        bitSize: 32,
        byteSize: 4,
        slot: 2,
        name: "height",
        structure: s30,
      },
      {
        ...m,
        type: 3,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s31,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        bitSize: 32,
        byteSize: 4,
        slot: 4,
        name: "offset",
        structure: s32,
      },
    ],
    methods: [],
    template: o88
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        name: "Pixel",
        structure: s0,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        name: "FPixel",
        structure: s0,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        name: "channels",
        structure: s6,
      },
    ],
    methods: [],
    template: o91
  },
});
Object.assign(s38, {
  ...s,
  type: 2,
  name: "simple.KernelOutput(u8,simple.kernel)",
  byteSize: 24,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitOffset: 0,
        bitSize: 192,
        byteSize: 24,
        slot: 0,
        name: "dst",
        structure: s37,
      },
    ],
    methods: [],
    template: o96
  },
});
Object.assign(s39, {
  ...s,
  type: 2,
  name: "simple.KernelParameters(simple.kernel)",
  byteSize: 48,
  align: 16,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitOffset: 0,
        bitSize: 352,
        byteSize: 48,
        slot: 0,
        name: "transform",
        structure: s20,
      },
    ],
    methods: [],
    template: o99
  },
});
Object.assign(s40, {
  ...s,
  type: 10,
  name: "ErrorSet2014799019",
  byteSize: 2,
  align: 2,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        bitSize: 16,
        byteSize: 2,
        structure: s40,
      },
    ],
    methods: [],
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        name: "OutOfMemory",
        structure: s40,
      },
    ],
    methods: [],
    template: o100
  },
});
Object.assign(s41, {
  ...s,
  type: 9,
  name: "ErrorSet2014799019!simple.KernelOutput(u8,simple.kernel)",
  byteSize: 28,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitOffset: 0,
        bitSize: 192,
        byteSize: 24,
        slot: 0,
        name: "value",
        structure: s38,
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
  },
});
Object.assign(s42, {
  ...s,
  type: 5,
  name: "createOutput",
  byteSize: 112,
  align: 16,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 384,
        bitSize: 32,
        byteSize: 4,
        slot: 3,
        name: "0",
        structure: s30,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 416,
        bitSize: 32,
        byteSize: 4,
        slot: 4,
        name: "1",
        structure: s30,
      },
      {
        ...m,
        type: 5,
        isRequired: true,
        bitOffset: 448,
        bitSize: 192,
        byteSize: 24,
        slot: 0,
        name: "2",
        structure: s34,
      },
      {
        ...m,
        type: 5,
        isRequired: true,
        bitOffset: 0,
        bitSize: 384,
        byteSize: 48,
        slot: 1,
        name: "3",
        structure: s39,
      },
      {
        ...m,
        type: 5,
        isRequired: true,
        bitOffset: 640,
        bitSize: 224,
        byteSize: 28,
        slot: 2,
        name: "retval",
        structure: s41,
      },
    ],
    methods: [],
  },
});
Object.assign(s43, {
  ...s,
  type: 10,
  name: "ErrorSet3697547636",
  byteSize: 2,
  align: 2,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        bitSize: 16,
        byteSize: 2,
        structure: s43,
      },
    ],
    methods: [],
  },
  static: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        name: "OutOfMemory",
        structure: s43,
      },
    ],
    methods: [],
    template: o102
  },
});
Object.assign(s44, {
  ...s,
  type: 9,
  name: "ErrorSet3697547636!simple.KernelOutput(u8,simple.kernel)",
  byteSize: 28,
  align: 4,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitOffset: 0,
        bitSize: 192,
        byteSize: 24,
        slot: 0,
        name: "value",
        structure: s38,
      },
      {
        ...m,
        type: 3,
        bitOffset: 192,
        bitSize: 16,
        byteSize: 2,
        name: "error",
        structure: s43,
      },
    ],
    methods: [],
  },
});
Object.assign(s45, {
  ...s,
  type: 5,
  name: "createPartialOutput",
  byteSize: 128,
  align: 16,
  hasPointer: true,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 384,
        bitSize: 32,
        byteSize: 4,
        slot: 3,
        name: "0",
        structure: s30,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 416,
        bitSize: 32,
        byteSize: 4,
        slot: 4,
        name: "1",
        structure: s30,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 448,
        bitSize: 32,
        byteSize: 4,
        slot: 5,
        name: "2",
        structure: s30,
      },
      {
        ...m,
        type: 3,
        isRequired: true,
        bitOffset: 480,
        bitSize: 32,
        byteSize: 4,
        slot: 6,
        name: "3",
        structure: s30,
      },
      {
        ...m,
        type: 5,
        isRequired: true,
        bitOffset: 512,
        bitSize: 192,
        byteSize: 24,
        slot: 0,
        name: "4",
        structure: s34,
      },
      {
        ...m,
        type: 5,
        isRequired: true,
        bitOffset: 0,
        bitSize: 384,
        byteSize: 48,
        slot: 1,
        name: "5",
        structure: s39,
      },
      {
        ...m,
        type: 5,
        isRequired: true,
        bitOffset: 704,
        bitSize: 224,
        byteSize: 28,
        slot: 2,
        name: "retval",
        structure: s44,
      },
    ],
    methods: [],
  },
});
Object.assign(s46, {
  ...s,
  type: 2,
  name: "simple",
  align: 1,
  static: {
    members: [
      {
        ...m,
        type: 7,
        slot: 0,
        name: "kernel",
        structure: s0,
      },
      {
        ...m,
        type: 7,
        slot: 1,
        name: "Input",
        structure: s0,
      },
      {
        ...m,
        type: 7,
        slot: 2,
        name: "Output",
        structure: s0,
      },
      {
        ...m,
        type: 7,
        slot: 3,
        name: "Parameters",
        structure: s0,
      },
    ],
    methods: [
      f0, f1,
    ],
    template: o104
  },
});
const structures = [
  s0, s1, s2, s3, s4, s5, s6, s7, s8, s9,
  s10, s11, s12, s13, s14, s15, s16, s17, s18, s19,
  s20, s21, s22, s23, s24, s25, s26, s27, s28, s29,
  s30, s31, s32, s33, s34, s35, s36, s37, s38, s39,
  s40, s41, s42, s43, s44, s45, s46,
];
const root = s46;
const options = {
  runtimeSafety: false,
  littleEndian: true,
};

// create runtime environment
const env = createEnvironment(null);
const __zigar = env.getSpecialExports();

// recreate structures
env.recreateStructures(structures, options);

// initiate loading and compilation of WASM bytecodes
const source = (async () => {
  const url = new URL('assets/simple-iE_8-aNG.wasm', import.meta.url).href;
  if (typeof(process) === 'object' && process[Symbol.toStringTag] === 'process') {
    const { readFile } = await import('fs/promises');
    const { fileURLToPath } = await import('url');
    const path = fileURLToPath(url);
    return readFile(path);
  } else {
    return fetch(url);
  }
})();
env.loadModule(source);
env.linkVariables(true);

// export root namespace and its methods and constants
const { constructor } = root;
// rollup-plugin-pb2zig additions
const { createPartialOutput, Input, kernel } = constructor;

function createImageData(width, height, source = {}, params = {}) {
  return createPartialImageData(width, height, 0, height, source, params);
}

function createPartialImageData(width, height, start, count, source = {}, params = {}) {
  const inputKeys = [];
  for (const [ key ] of kernel.inputImages) {
    inputKeys.push(key);
  }
  const outputKeys = [];
  for (const [ key ] of kernel.outputImages) {
    outputKeys.push(key);
  }
  if (Array.isArray(source)) {
    const list = source;
    source = {};
    for (const [ index, key ] of inputKeys.entries()) {
      source[key] = list[index];
    }
  }
  const input = new Input(undefined);
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

function getKernelInfo() {
  const info = {};
  for (let [ name, value ] of kernel) {
    if (name === 'parameters') {
      const params = {};
      for (const [ pname, pvalue ] of value) {
        const param = params[pname] = {};
        for (let [ aname, avalue ] of pvalue) {
          if (typeof(avalue) === 'object') {
            value = avalue.string ?? avalue.valueOf();
          } else if (typeof(avalue) === 'function') {
            avalue = getPBType(avalue.name);
          }
          param[aname] = avalue;
        }
      }
      value = params;
    } else {
      if (typeof(value) === 'object') {
        value = value.string ?? value.valueOf();
      }
    }
    info[name] = value;
  }
  return info;
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

export { __zigar, createImageData, createPartialImageData, getKernelInfo };
