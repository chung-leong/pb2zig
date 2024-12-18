import { createEnvironment } from 'zigar-runtime';
import 'zigar-runtime/accessors/all.js';
import 'zigar-runtime/accessors/bool.js';
import 'zigar-runtime/accessors/uint.js';
import 'zigar-runtime/features/allocator-methods.js';
import 'zigar-runtime/features/call-marshaling-inbound.js';
import 'zigar-runtime/features/call-marshaling-outbound.js';
import 'zigar-runtime/features/data-copying.js';
import 'zigar-runtime/features/int-conversion.js';
import 'zigar-runtime/features/memory-mapping.js';
import 'zigar-runtime/features/module-loading.js';
import 'zigar-runtime/features/object-linkage.js';
import 'zigar-runtime/features/pointer-synchronization.js';
import 'zigar-runtime/features/runtime-safety.js';
import 'zigar-runtime/features/stream-redirection.js';
import 'zigar-runtime/features/view-management.js';
import 'zigar-runtime/features/wasi-support.js';
import 'zigar-runtime/features/write-protection.js';
import 'zigar-runtime/members/all.js';
import 'zigar-runtime/members/base64.js';
import 'zigar-runtime/members/bool.js';
import 'zigar-runtime/members/clamped-array.js';
import 'zigar-runtime/members/data-view.js';
import 'zigar-runtime/members/float.js';
import 'zigar-runtime/members/int.js';
import 'zigar-runtime/members/object.js';
import 'zigar-runtime/members/primitive.js';
import 'zigar-runtime/members/sentinel.js';
import 'zigar-runtime/members/string.js';
import 'zigar-runtime/members/to-json.js';
import 'zigar-runtime/members/type.js';
import 'zigar-runtime/members/typed-array.js';
import 'zigar-runtime/members/uint.js';
import 'zigar-runtime/members/value-of.js';
import 'zigar-runtime/members/void.js';
import 'zigar-runtime/structures/all.js';
import 'zigar-runtime/structures/arg-struct.js';
import 'zigar-runtime/structures/array.js';
import 'zigar-runtime/structures/array-like.js';
import 'zigar-runtime/structures/enum.js';
import 'zigar-runtime/structures/error-set.js';
import 'zigar-runtime/structures/error-union.js';
import 'zigar-runtime/structures/function.js';
import 'zigar-runtime/structures/optional.js';
import 'zigar-runtime/structures/pointer.js';
import 'zigar-runtime/structures/primitive.js';
import 'zigar-runtime/structures/slice.js';
import 'zigar-runtime/structures/struct.js';
import 'zigar-runtime/structures/struct-like.js';
import 'zigar-runtime/structures/vector.js';
import 'zigar-runtime/visitors/all.js';
import 'zigar-runtime/visitors/in-arg-struct.js';
import 'zigar-runtime/visitors/in-error-union.js';
import 'zigar-runtime/visitors/in-optional.js';
import 'zigar-runtime/visitors/in-struct.js';
import 'zigar-runtime/features/baseline.js';
import 'zigar-runtime/features/default-allocator.js';
import 'zigar-runtime/features/promise-callback.js';
import 'zigar-runtime/features/abort-signal.js';
import 'zigar-runtime/features/worker-support-compat.js';

// structure defaults
const s = {
  constructor: null,
  type: 0,
  flags: 0,
  name: undefined,
  byteSize: 0,
  align: 0,
  instance: {
    members: [],
    template: null,
  },
  static: {
    members: [],
    template: null,
  },
};

// member defaults
const m = {
  type: 0,
  flags: 0,
};

// declare structure objects
const s0 = {}, s1 = {}, s2 = {}, s3 = {}, s4 = {}, s5 = {}, s6 = {}, s7 = {}, s8 = {}, s9 = {};
const s10 = {}, s11 = {}, s12 = {}, s13 = {}, s14 = {}, s15 = {}, s16 = {}, s17 = {}, s18 = {}, s19 = {};
const s20 = {}, s21 = {}, s22 = {}, s23 = {}, s24 = {}, s25 = {}, s26 = {}, s27 = {}, s28 = {}, s29 = {};
const s30 = {}, s31 = {}, s32 = {}, s33 = {}, s34 = {}, s35 = {}, s36 = {}, s37 = {}, s38 = {}, s39 = {};
const s40 = {}, s41 = {}, s42 = {}, s43 = {}, s44 = {}, s45 = {}, s46 = {}, s47 = {}, s48 = {}, s49 = {};
const s50 = {}, s51 = {}, s52 = {}, s53 = {}, s54 = {}, s55 = {}, s56 = {}, s57 = {}, s58 = {}, s59 = {};
const s60 = {}, s61 = {}, s62 = {}, s63 = {}, s64 = {}, s65 = {}, s66 = {}, s67 = {}, s68 = {}, s69 = {};
const s70 = {}, s71 = {}, s72 = {}, s73 = {}, s74 = {}, s75 = {}, s76 = {}, s77 = {}, s78 = {}, s79 = {};
const s80 = {}, s81 = {}, s82 = {}, s83 = {}, s84 = {}, s85 = {}, s86 = {}, s87 = {}, s88 = {}, s89 = {};
const s90 = {}, s91 = {}, s92 = {}, s93 = {}, s94 = {};

// declare objects
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
const o110 = {}, o111 = {}, o112 = {}, o113 = {}, o114 = {}, o115 = {}, o116 = {}, o117 = {}, o118 = {}, o119 = {};
const o120 = {}, o121 = {}, o122 = {}, o123 = {}, o124 = {}, o125 = {}, o126 = {}, o127 = {}, o128 = {}, o129 = {};
const o130 = {}, o131 = {}, o132 = {}, o133 = {}, o134 = {}, o135 = {}, o136 = {}, o137 = {}, o138 = {}, o139 = {};
const o140 = {}, o141 = {}, o142 = {}, o143 = {}, o144 = {}, o145 = {}, o146 = {}, o147 = {}, o148 = {}, o149 = {};
const o150 = {}, o151 = {}, o152 = {}, o153 = {}, o154 = {}, o155 = {}, o156 = {}, o157 = {}, o158 = {}, o159 = {};
const o160 = {}, o161 = {}, o162 = {}, o163 = {}, o164 = {}, o165 = {}, o166 = {}, o167 = {}, o168 = {}, o169 = {};
const o170 = {}, o171 = {}, o172 = {}, o173 = {}, o174 = {}, o175 = {}, o176 = {}, o177 = {}, o178 = {}, o179 = {};
const o180 = {}, o181 = {}, o182 = {}, o183 = {}, o184 = {}, o185 = {}, o186 = {}, o187 = {}, o188 = {}, o189 = {};
const o190 = {}, o191 = {}, o192 = {}, o193 = {}, o194 = {}, o195 = {}, o196 = {}, o197 = {}, o198 = {}, o199 = {};
const o200 = {}, o201 = {}, o202 = {}, o203 = {}, o204 = {}, o205 = {}, o206 = {}, o207 = {}, o208 = {}, o209 = {};
const o210 = {}, o211 = {}, o212 = {}, o213 = {}, o214 = {}, o215 = {}, o216 = {}, o217 = {}, o218 = {}, o219 = {};
const o220 = {}, o221 = {}, o222 = {}, o223 = {}, o224 = {}, o225 = {}, o226 = {};

// define byte arrays
const U = i => new Uint8Array(i);
const a0 = U(1);
const a1 = U(1);
const a2 = U(0);
const a3 = U([ 0, 0, 0, 0, 0, 0, 240, 191 ]);
const a4 = U(a3);
const a5 = U(a3);
const a6 = U([ 0, 0, 0, 0, 0, 0, 240, 63 ]);
const a7 = U(a6);
const a8 = U(a6);
const a9 = U([ 0, 0, 0, 0, 0, 0, 224, 63 ]);
const a10 = U(8);
const a11 = U(8);
const a12 = U([ 51, 51, 51, 51, 51, 51, 211, 63 ]);
const a13 = U(a6);
const a14 = U([ 102, 102, 102, 102, 102, 102, 230, 63 ]);
const a15 = U([ 154, 153, 153, 153, 153, 153, 185, 63 ]);
const a16 = U(a12);
const a17 = U([ 154, 153, 153, 153, 153, 153, 233, 63 ]);
const a18 = U([ 3 ]);
const a19 = U([ 68, 7, 0, 1 ]);
const a20 = U([ 89, 111, 117, 114, 32, 78, 97, 109, 101, 115, 112, 97, 99, 101, 0 ]);
const a21 = U([ 190, 2, 0, 1 ]);
const a22 = U([ 89, 111, 117, 114, 32, 86, 101, 110, 100, 111, 114, 0 ]);
const a23 = U([ 1 ]);
const a24 = U(1);
const a25 = U(a23);
const a26 = U(20);
const a27 = U(a18);
const a28 = U(20);
const a29 = U(20);
const a30 = U(20);
const a31 = U(a18);
const a32 = U(20);
const a33 = U(20);
const a34 = U([ 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 153, 153, 62, 0, 0, 128, 63, 51, 51, 51, 63, 0, 0, 0, 0, 205, 204, 204, 61, 154, 153, 153, 62, 205, 204, 76, 63, 0, 0, 0, 0 ]);
const a35 = U([ 8, 0 ]);
const a36 = U(12);
const a37 = U(a35);
const a38 = U(8);
const a39 = U(a35);
const a40 = U([ 9, 0 ]);
const a41 = U([ 10, 0 ]);
const a42 = U(a35);
const a43 = U([ 11, 0 ]);
const a44 = U([ 12, 0 ]);
const a45 = U([ 13, 0 ]);
const a46 = U([ 14, 0 ]);
const a47 = U([ 15, 0 ]);
const a48 = U([ 16, 0 ]);
const a49 = U([ 17, 0 ]);
const a50 = U([ 18, 0 ]);
const a51 = U([ 19, 0 ]);
const a52 = U([ 20, 0 ]);
const a53 = U([ 21, 0 ]);
const a54 = U([ 22, 0 ]);
const a55 = U([ 23, 0 ]);
const a56 = U([ 24, 0 ]);
const a57 = U([ 25, 0 ]);
const a58 = U([ 26, 0 ]);
const a59 = U([ 27, 0 ]);
const a60 = U([ 28, 0 ]);
const a61 = U([ 29, 0 ]);
const a62 = U([ 30, 0 ]);
const a63 = U([ 31, 0 ]);
const a64 = U([ 32, 0 ]);
const a65 = U([ 33, 0 ]);
const a66 = U([ 34, 0 ]);
const a67 = U([ 35, 0 ]);
const a68 = U([ 36, 0 ]);
const a69 = U([ 37, 0 ]);
const a70 = U(a35);
const a71 = U(a43);
const a72 = U(a44);
const a73 = U(a45);
const a74 = U(a46);
const a75 = U(a47);
const a76 = U(a48);
const a77 = U(a49);
const a78 = U(a50);
const a79 = U(a51);
const a80 = U(a52);
const a81 = U(a53);
const a82 = U(a54);
const a83 = U(a55);
const a84 = U(a56);
const a85 = U(a57);
const a86 = U(a58);
const a87 = U(a59);
const a88 = U(a60);
const a89 = U(a61);
const a90 = U(a62);
const a91 = U(a63);
const a92 = U(a64);
const a93 = U(a65);
const a94 = U(a35);
const a95 = U(a40);
const a96 = U(a41);
const a97 = U(4);
const a98 = U(4);
const a99 = U(4);
const a100 = U(4);

// fill in object properties
const $ = Object.assign;
$(o0, {
  memory: { array: a0 },
});
$(o1, {
  memory: { array: a1 },
});
$(o2, {
  slots: {
    0: o3, 1: o5, 2: o7,
  },
});
$(o3, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o4,
  },
});
$(o4, {
  structure: s8,
  memory: { array: a3 },
  const: true,
});
$(o5, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o6,
  },
});
$(o6, {
  structure: s8,
  memory: { array: a4 },
  const: true,
});
$(o7, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o8,
  },
});
$(o8, {
  structure: s8,
  memory: { array: a5 },
  const: true,
});
$(o9, {
  slots: {
    0: o10, 1: o11, 2: o12,
  },
});
$(o10, {
  structure: s9,
  memory: { array: a2 },
  slots: {
    0: o3, 1: o5, 2: o7,
  },
});
$(o11, {
  structure: s9,
  memory: { array: a2 },
  slots: {
    0: o3, 1: o5, 2: o7,
  },
});
$(o12, {
  structure: s9,
  memory: { array: a2 },
  slots: {
    0: o3, 1: o5, 2: o7,
  },
});
$(o13, {
  slots: {
    0: o14, 1: o16, 2: o18,
  },
});
$(o14, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o15,
  },
});
$(o15, {
  structure: s8,
  memory: { array: a6 },
  const: true,
});
$(o16, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o17,
  },
});
$(o17, {
  structure: s8,
  memory: { array: a7 },
  const: true,
});
$(o18, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o19,
  },
});
$(o19, {
  structure: s8,
  memory: { array: a8 },
  const: true,
});
$(o20, {
  slots: {
    0: o21, 1: o22, 2: o23,
  },
});
$(o21, {
  structure: s11,
  memory: { array: a2 },
  slots: {
    0: o14, 1: o16, 2: o18,
  },
});
$(o22, {
  structure: s11,
  memory: { array: a2 },
  slots: {
    0: o14, 1: o16, 2: o18,
  },
});
$(o23, {
  structure: s11,
  memory: { array: a2 },
  slots: {
    0: o14, 1: o16, 2: o18,
  },
});
$(o24, {
  slots: {
    0: o25, 1: o27, 2: o29,
  },
});
$(o25, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o26,
  },
});
$(o26, {
  structure: s8,
  memory: { array: a9 },
  const: true,
});
$(o27, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o28,
  },
});
$(o28, {
  structure: s8,
  memory: { array: a10 },
  const: true,
});
$(o29, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o30,
  },
});
$(o30, {
  structure: s8,
  memory: { array: a11 },
  const: true,
});
$(o31, {
  slots: {
    0: o32, 1: o34, 2: o36,
  },
});
$(o32, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o33,
  },
});
$(o33, {
  structure: s8,
  memory: { array: a12 },
  const: true,
});
$(o34, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o35,
  },
});
$(o35, {
  structure: s8,
  memory: { array: a13 },
  const: true,
});
$(o36, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o37,
  },
});
$(o37, {
  structure: s8,
  memory: { array: a14 },
  const: true,
});
$(o38, {
  slots: {
    0: o39, 1: o41, 2: o43,
  },
});
$(o39, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o40,
  },
});
$(o40, {
  structure: s8,
  memory: { array: a15 },
  const: true,
});
$(o41, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o42,
  },
});
$(o42, {
  structure: s8,
  memory: { array: a16 },
  const: true,
});
$(o43, {
  structure: s7,
  memory: { array: a2 },
  slots: {
    0: o44,
  },
});
$(o44, {
  structure: s8,
  memory: { array: a17 },
  const: true,
});
$(o45, {
  slots: {
    0: o46, 1: o47, 2: o48,
  },
});
$(o46, {
  structure: s13,
  memory: { array: a2 },
  slots: {
    0: o25, 1: o27, 2: o29,
  },
});
$(o47, {
  structure: s14,
  memory: { array: a2 },
  slots: {
    0: o32, 1: o34, 2: o36,
  },
});
$(o48, {
  structure: s15,
  memory: { array: a2 },
  slots: {
    0: o39, 1: o41, 2: o43,
  },
});
$(o49, {
  slots: {
    0: o50, 1: o52, 2: o53, 3: o54,
  },
});
$(o50, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o51,
  },
});
$(o51, {
  structure: s19,
});
$(o52, {
  structure: s10,
  memory: { array: a2 },
  slots: {
    0: o10, 1: o11, 2: o12,
  },
});
$(o53, {
  structure: s12,
  memory: { array: a2 },
  slots: {
    0: o21, 1: o22, 2: o23,
  },
});
$(o54, {
  structure: s16,
  memory: { array: a2 },
  slots: {
    0: o46, 1: o47, 2: o48,
  },
});
$(o55, {
  slots: {
    0: o56,
  },
});
$(o56, {
  structure: s20,
  memory: { array: a2 },
  slots: {
    0: o50, 1: o52, 2: o53, 3: o54,
  },
});
$(o57, {
  slots: {
    0: o58,
  },
});
$(o58, {
  structure: s6,
  memory: { array: a2 },
  slots: {
    0: o59,
  },
});
$(o59, {
  structure: s1,
  memory: { array: a18 },
  const: true,
});
$(o60, {
  slots: {
    0: o61,
  },
});
$(o61, {
  structure: s22,
  memory: { array: a2 },
  slots: {
    0: o58,
  },
});
$(o62, {
  slots: {
    0: o63,
  },
});
$(o63, {
  structure: s22,
  memory: { array: a2 },
  slots: {
    0: o58,
  },
});
$(o64, {
  slots: {
    0: o65, 1: o67, 2: o69, 3: o71, 4: o72, 5: o73,
  },
});
$(o65, {
  structure: s3,
  memory: { array: a19 },
  handle: 16780152,
  slots: {
    0: o66,
  },
});
$(o66, {
  structure: s2,
  memory: { array: a20 },
});
$(o67, {
  structure: s5,
  memory: { array: a21 },
  handle: 16780156,
  slots: {
    0: o68,
  },
});
$(o68, {
  structure: s4,
  memory: { array: a22 },
});
$(o69, {
  structure: s6,
  memory: { array: a2 },
  slots: {
    0: o70,
  },
});
$(o70, {
  structure: s1,
  memory: { array: a23 },
  const: true,
});
$(o71, {
  structure: s21,
  memory: { array: a2 },
  slots: {
    0: o56,
  },
});
$(o72, {
  structure: s23,
  memory: { array: a2 },
  slots: {
    0: o61,
  },
});
$(o73, {
  structure: s24,
  memory: { array: a2 },
  slots: {
    0: o63,
  },
});
$(o74, {
  slots: {
    0: o75, 1: o76,
  },
});
$(o75, {
  structure: s30,
  memory: { array: a24 },
  const: true,
});
$(o76, {
  structure: s30,
  memory: { array: a25 },
  const: true,
});
$(o77, {
  memory: { array: a26 },
  handle: 16781480,
  slots: {
    0: o78,
  },
});
$(o78, {
  structure: s28,
  memory: { array: a26, offset: 0, length: 8 },
});
$(o79, {
  slots: {
    0: o80, 1: o82, 2: o84,
  },
});
$(o80, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o81,
  },
});
$(o81, {
  structure: s26,
});
$(o82, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o83,
  },
});
$(o83, {
  structure: s18,
});
$(o84, {
  structure: s6,
  memory: { array: a2 },
  slots: {
    0: o85,
  },
});
$(o85, {
  structure: s1,
  memory: { array: a27 },
  const: true,
});
$(o86, {
  memory: { array: a28 },
  handle: 16780856,
  slots: {
    0: o87,
  },
});
$(o87, {
  structure: s31,
  memory: { array: a29 },
  handle: 16780856,
  slots: {
    0: o88,
  },
});
$(o88, {
  structure: s28,
  memory: { array: a28, offset: 0, length: 8 },
});
$(o89, {
  memory: { array: a30 },
  handle: 16781656,
  slots: {
    0: o90,
  },
});
$(o90, {
  structure: s33,
  memory: { array: a30, offset: 0, length: 8 },
});
$(o91, {
  slots: {
    0: o92, 1: o93, 2: o94,
  },
});
$(o92, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o81,
  },
});
$(o93, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o83,
  },
});
$(o94, {
  structure: s6,
  memory: { array: a2 },
  slots: {
    0: o95,
  },
});
$(o95, {
  structure: s1,
  memory: { array: a31 },
  const: true,
});
$(o96, {
  memory: { array: a32 },
  handle: 16780912,
  slots: {
    0: o97,
  },
});
$(o97, {
  structure: s34,
  memory: { array: a33 },
  handle: 16780912,
  slots: {
    0: o98,
  },
});
$(o98, {
  structure: s33,
  memory: { array: a32, offset: 0, length: 8 },
});
$(o99, {
  memory: { array: a34 },
});
$(o100, {
  slots: {
    0: o101,
  },
});
$(o101, {
  structure: s37,
  memory: { array: a35 },
  const: true,
});
$(o102, {
  memory: { array: a2 },
  handle: 28,
});
$(o103, {
  memory: { array: a2 },
  handle: 29,
});
$(o104, {
  memory: { array: a2 },
  handle: 19,
});
$(o105, {
  memory: { array: a2 },
  handle: 20,
});
$(o106, {
  memory: { array: a2 },
  handle: 21,
});
$(o107, {
  memory: { array: a2 },
  handle: 22,
});
$(o108, {
  memory: { array: a36 },
  handle: 16784416,
  slots: {
    0: o109, 1: o111, 2: o113,
  },
});
$(o109, {
  structure: s47,
  memory: { array: a36, offset: 0, length: 4 },
  slots: {
    0: o110,
  },
});
$(o110, {
  structure: s46,
  memory: { array: a2 },
});
$(o111, {
  structure: s52,
  memory: { array: a36, offset: 4, length: 4 },
  slots: {
    0: o112,
  },
});
$(o112, {
  structure: s51,
  memory: { array: a2 },
});
$(o113, {
  structure: s56,
  memory: { array: a36, offset: 8, length: 4 },
  slots: {
    0: o114,
  },
});
$(o114, {
  structure: s55,
  memory: { array: a2 },
});
$(o115, {
  slots: {
    0: o116,
  },
});
$(o116, {
  structure: s59,
  memory: { array: a37 },
  const: true,
});
$(o117, {
  memory: { array: a2 },
  handle: 23,
});
$(o118, {
  memory: { array: a2 },
  handle: 23,
});
$(o119, {
  memory: { array: a2 },
  handle: 24,
});
$(o120, {
  memory: { array: a2 },
  handle: 24,
});
$(o121, {
  memory: { array: a2 },
  handle: 25,
});
$(o122, {
  memory: { array: a2 },
  handle: 25,
});
$(o123, {
  memory: { array: a38 },
  handle: 16783316,
  slots: {
    0: o124, 1: o126,
  },
});
$(o124, {
  structure: s40,
  memory: { array: a38, offset: 0, length: 4 },
  slots: {
    0: o125,
  },
});
$(o125, {
  structure: s39,
  memory: { array: a2 },
});
$(o126, {
  structure: s58,
  memory: { array: a38, offset: 4, length: 4 },
});
$(o127, {
  slots: {
    0: o128, 1: o130, 2: o132, 3: o134, 4: o135, 5: o136, 6: o137, 7: o138,
  },
});
$(o128, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o129,
  },
});
$(o129, {
  structure: s59,
});
$(o130, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o131,
  },
});
$(o131, {
  structure: s60,
});
$(o132, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o133,
  },
});
$(o133, {
  structure: s57,
});
$(o134, {
  structure: s51,
  memory: { array: a2 },
  handle: 14,
});
$(o135, {
  structure: s55,
  memory: { array: a2 },
  handle: 15,
});
$(o136, {
  structure: s63,
  memory: { array: a2 },
  handle: 16,
});
$(o137, {
  structure: s66,
  memory: { array: a2 },
  handle: 17,
});
$(o138, {
  structure: s69,
  memory: { array: a2 },
  handle: 18,
});
$(o139, {
  memory: { array: a2 },
  handle: 10,
});
$(o140, {
  slots: {
    0: o141, 1: o142, 2: o143,
  },
});
$(o141, {
  structure: s73,
  memory: { array: a39 },
  const: true,
});
$(o142, {
  structure: s73,
  memory: { array: a40 },
  const: true,
});
$(o143, {
  structure: s73,
  memory: { array: a41 },
  const: true,
});
$(o144, {
  slots: {
    0: o145, 1: o146, 2: o147, 3: o148, 4: o149, 5: o150, 6: o151, 7: o152, 8: o153, 9: o154,
    10: o155, 11: o156, 12: o157, 13: o158, 14: o159, 15: o160, 16: o161, 17: o162, 18: o163, 19: o164,
    20: o165, 21: o166, 22: o167, 23: o168, 24: o169, 25: o170, 26: o171, 27: o172,
  },
});
$(o145, {
  structure: s74,
  memory: { array: a42 },
  const: true,
});
$(o146, {
  structure: s74,
  memory: { array: a43 },
  const: true,
});
$(o147, {
  structure: s74,
  memory: { array: a44 },
  const: true,
});
$(o148, {
  structure: s74,
  memory: { array: a45 },
  const: true,
});
$(o149, {
  structure: s74,
  memory: { array: a46 },
  const: true,
});
$(o150, {
  structure: s74,
  memory: { array: a47 },
  const: true,
});
$(o151, {
  structure: s74,
  memory: { array: a48 },
  const: true,
});
$(o152, {
  structure: s74,
  memory: { array: a49 },
  const: true,
});
$(o153, {
  structure: s74,
  memory: { array: a50 },
  const: true,
});
$(o154, {
  structure: s74,
  memory: { array: a51 },
  const: true,
});
$(o155, {
  structure: s74,
  memory: { array: a52 },
  const: true,
});
$(o156, {
  structure: s74,
  memory: { array: a53 },
  const: true,
});
$(o157, {
  structure: s74,
  memory: { array: a54 },
  const: true,
});
$(o158, {
  structure: s74,
  memory: { array: a55 },
  const: true,
});
$(o159, {
  structure: s74,
  memory: { array: a56 },
  const: true,
});
$(o160, {
  structure: s74,
  memory: { array: a57 },
  const: true,
});
$(o161, {
  structure: s74,
  memory: { array: a58 },
  const: true,
});
$(o162, {
  structure: s74,
  memory: { array: a59 },
  const: true,
});
$(o163, {
  structure: s74,
  memory: { array: a60 },
  const: true,
});
$(o164, {
  structure: s74,
  memory: { array: a61 },
  const: true,
});
$(o165, {
  structure: s74,
  memory: { array: a62 },
  const: true,
});
$(o166, {
  structure: s74,
  memory: { array: a63 },
  const: true,
});
$(o167, {
  structure: s74,
  memory: { array: a64 },
  const: true,
});
$(o168, {
  structure: s74,
  memory: { array: a65 },
  const: true,
});
$(o169, {
  structure: s74,
  memory: { array: a66 },
  const: true,
});
$(o170, {
  structure: s74,
  memory: { array: a67 },
  const: true,
});
$(o171, {
  structure: s74,
  memory: { array: a68 },
  const: true,
});
$(o172, {
  structure: s74,
  memory: { array: a69 },
  const: true,
});
$(o173, {
  memory: { array: a2 },
  handle: 11,
});
$(o174, {
  slots: {
    0: o175, 1: o176, 2: o177, 3: o178, 4: o179, 5: o180, 6: o181, 7: o182, 8: o183, 9: o184,
    10: o185, 11: o186, 12: o187, 13: o188, 14: o189, 15: o190, 16: o191, 17: o192, 18: o193, 19: o194,
    20: o195, 21: o196, 22: o197, 23: o198,
  },
});
$(o175, {
  structure: s78,
  memory: { array: a70 },
  const: true,
});
$(o176, {
  structure: s78,
  memory: { array: a71 },
  const: true,
});
$(o177, {
  structure: s78,
  memory: { array: a72 },
  const: true,
});
$(o178, {
  structure: s78,
  memory: { array: a73 },
  const: true,
});
$(o179, {
  structure: s78,
  memory: { array: a74 },
  const: true,
});
$(o180, {
  structure: s78,
  memory: { array: a75 },
  const: true,
});
$(o181, {
  structure: s78,
  memory: { array: a76 },
  const: true,
});
$(o182, {
  structure: s78,
  memory: { array: a77 },
  const: true,
});
$(o183, {
  structure: s78,
  memory: { array: a78 },
  const: true,
});
$(o184, {
  structure: s78,
  memory: { array: a79 },
  const: true,
});
$(o185, {
  structure: s78,
  memory: { array: a80 },
  const: true,
});
$(o186, {
  structure: s78,
  memory: { array: a81 },
  const: true,
});
$(o187, {
  structure: s78,
  memory: { array: a82 },
  const: true,
});
$(o188, {
  structure: s78,
  memory: { array: a83 },
  const: true,
});
$(o189, {
  structure: s78,
  memory: { array: a84 },
  const: true,
});
$(o190, {
  structure: s78,
  memory: { array: a85 },
  const: true,
});
$(o191, {
  structure: s78,
  memory: { array: a86 },
  const: true,
});
$(o192, {
  structure: s78,
  memory: { array: a87 },
  const: true,
});
$(o193, {
  structure: s78,
  memory: { array: a88 },
  const: true,
});
$(o194, {
  structure: s78,
  memory: { array: a89 },
  const: true,
});
$(o195, {
  structure: s78,
  memory: { array: a90 },
  const: true,
});
$(o196, {
  structure: s78,
  memory: { array: a91 },
  const: true,
});
$(o197, {
  structure: s78,
  memory: { array: a92 },
  const: true,
});
$(o198, {
  structure: s78,
  memory: { array: a93 },
  const: true,
});
$(o199, {
  memory: { array: a2 },
  handle: 12,
});
$(o200, {
  slots: {
    0: o201, 1: o202, 2: o203,
  },
});
$(o201, {
  structure: s82,
  memory: { array: a94 },
  const: true,
});
$(o202, {
  structure: s82,
  memory: { array: a95 },
  const: true,
});
$(o203, {
  structure: s82,
  memory: { array: a96 },
  const: true,
});
$(o204, {
  memory: { array: a2 },
  handle: 26,
});
$(o205, {
  memory: { array: a2 },
  handle: 27,
});
$(o206, {
  memory: { array: a97 },
  handle: 16783664,
  slots: {
    0: o207,
  },
});
$(o207, {
  structure: s87,
  memory: { array: a98 },
  handle: 16783664,
  slots: {
    0: o208,
  },
});
$(o208, {
  structure: s86,
  memory: { array: a2 },
});
$(o209, {
  memory: { array: a99 },
  handle: 16783708,
  slots: {
    0: o210,
  },
});
$(o210, {
  structure: s90,
  memory: { array: a100 },
  handle: 16783708,
});
$(o211, {
  memory: { array: a2 },
  handle: 13,
});
$(o212, {
  slots: {
    0: o213, 1: o215, 2: o217, 3: o219, 4: o221, 9: o222, 10: o224, 11: o225, 12: o226,
  },
});
$(o213, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o214,
  },
});
$(o214, {
  structure: s25,
});
$(o215, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o216,
  },
});
$(o216, {
  structure: s32,
});
$(o217, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o218,
  },
});
$(o218, {
  structure: s35,
});
$(o219, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o220,
  },
});
$(o220, {
  structure: s36,
});
$(o221, {
  structure: s72,
  memory: { array: a2 },
  handle: 6,
});
$(o222, {
  structure: s0,
  memory: { array: a2 },
  slots: {
    0: o223,
  },
});
$(o223, {
  structure: s73,
});
$(o224, {
  structure: s77,
  memory: { array: a2 },
  handle: 7,
});
$(o225, {
  structure: s81,
  memory: { array: a2 },
  handle: 8,
});
$(o226, {
  structure: s93,
  memory: { array: a2 },
  handle: 9,
});

// fill in structure properties
$(s0, {
  ...s,
  flags: 9,
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
  },
});
$(s1, {
  ...s,
  flags: 1,
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
  },
});
$(s2, {
  ...s,
  type: 1,
  flags: 240,
  name: "[14]u8",
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
      {
        ...m,
        type: 3,
        flags: 33,
        bitOffset: 0,
        bitSize: 8,
        byteSize: 1,
        structure: s1,
      },
    ],
    template: o0
  },
});
$(s3, {
  ...s,
  type: 8,
  flags: 204,
  name: "*const [14]u8",
  byteSize: 4,
  align: 4,
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
  },
});
$(s4, {
  ...s,
  type: 1,
  flags: 240,
  name: "[11]u8",
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
      {
        ...m,
        type: 3,
        flags: 33,
        bitOffset: 0,
        bitSize: 8,
        byteSize: 1,
        structure: s1,
      },
    ],
    template: o1
  },
});
$(s5, {
  ...s,
  type: 8,
  flags: 204,
  name: "*const [11]u8",
  byteSize: 4,
  align: 4,
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
  },
});
$(s6, {
  ...s,
  flags: 9,
  name: "comptime",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitOffset: 0,
        bitSize: 0,
        byteSize: 0,
        slot: 0,
        structure: s6,
      },
    ],
  },
});
$(s7, {
  ...s,
  flags: 9,
  name: "comptime",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitOffset: 0,
        bitSize: 0,
        byteSize: 0,
        slot: 0,
        structure: s7,
      },
    ],
  },
});
$(s8, {
  ...s,
  flags: 1,
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
        structure: s8,
      },
    ],
  },
});
$(s9, {
  ...s,
  type: 2,
  flags: 136,
  name: "S0",
  length: 3,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "0",
        structure: s7,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "1",
        structure: s7,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "2",
        structure: s7,
      },
    ],
    template: o2
  },
});
$(s10, {
  ...s,
  type: 2,
  flags: 138,
  name: "S1",
  length: 3,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "0",
        structure: s9,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "1",
        structure: s9,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "2",
        structure: s9,
      },
    ],
    template: o9
  },
});
$(s11, {
  ...s,
  type: 2,
  flags: 136,
  name: "S2",
  length: 3,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "0",
        structure: s7,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "1",
        structure: s7,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "2",
        structure: s7,
      },
    ],
    template: o13
  },
});
$(s12, {
  ...s,
  type: 2,
  flags: 138,
  name: "S3",
  length: 3,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "0",
        structure: s11,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "1",
        structure: s11,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "2",
        structure: s11,
      },
    ],
    template: o20
  },
});
$(s13, {
  ...s,
  type: 2,
  flags: 136,
  name: "S4",
  length: 3,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "0",
        structure: s7,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "1",
        structure: s7,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "2",
        structure: s7,
      },
    ],
    template: o24
  },
});
$(s14, {
  ...s,
  type: 2,
  flags: 136,
  name: "S5",
  length: 3,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "0",
        structure: s7,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "1",
        structure: s7,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "2",
        structure: s7,
      },
    ],
    template: o31
  },
});
$(s15, {
  ...s,
  type: 2,
  flags: 136,
  name: "S6",
  length: 3,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "0",
        structure: s7,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "1",
        structure: s7,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "2",
        structure: s7,
      },
    ],
    template: o38
  },
});
$(s16, {
  ...s,
  type: 2,
  flags: 138,
  name: "S7",
  length: 3,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "0",
        structure: s13,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "1",
        structure: s14,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "2",
        structure: s15,
      },
    ],
    template: o45
  },
});
$(s17, {
  ...s,
  flags: 1,
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
        structure: s17,
      },
    ],
  },
});
$(s18, {
  ...s,
  type: 10,
  flags: 16,
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
        structure: s17,
      },
    ],
  },
});
$(s19, {
  ...s,
  type: 1,
  flags: 74,
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
        structure: s18,
      },
    ],
  },
});
$(s20, {
  ...s,
  type: 2,
  flags: 10,
  name: "S8",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "type",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "minValue",
        structure: s10,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "maxValue",
        structure: s12,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 3,
        name: "defaultValue",
        structure: s16,
      },
    ],
    template: o49
  },
});
$(s21, {
  ...s,
  type: 2,
  flags: 10,
  name: "S9",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "transform",
        structure: s20,
      },
    ],
    template: o55
  },
});
$(s22, {
  ...s,
  type: 2,
  flags: 8,
  name: "S10",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "channels",
        structure: s6,
      },
    ],
    template: o57
  },
});
$(s23, {
  ...s,
  type: 2,
  flags: 10,
  name: "S11",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "src",
        structure: s22,
      },
    ],
    template: o60
  },
});
$(s24, {
  ...s,
  type: 2,
  flags: 10,
  name: "S12",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "dst",
        structure: s22,
      },
    ],
    template: o62
  },
});
$(s25, {
  ...s,
  type: 2,
  name: "kernel",
  align: 1,
  static: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "namespace",
        structure: s3,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "vendor",
        structure: s5,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "version",
        structure: s6,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 3,
        name: "parameters",
        structure: s21,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 4,
        name: "inputImages",
        structure: s23,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 5,
        name: "outputImages",
        structure: s24,
      },
    ],
    template: o64
  },
});
$(s26, {
  ...s,
  type: 10,
  flags: 16,
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
  },
});
$(s27, {
  ...s,
  type: 9,
  flags: 202,
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
        structure: s26,
      },
    ],
  },
});
$(s28, {
  ...s,
  type: 8,
  flags: 188,
  name: "[]const @Vector(4, u8)",
  byteSize: 8,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        structure: s27,
      },
    ],
  },
});
$(s29, {
  ...s,
  flags: 1,
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
        structure: s29,
      },
    ],
  },
});
$(s30, {
  ...s,
  type: 6,
  flags: 1,
  name: "ColorSpace",
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
        structure: s30,
      },
    ],
  },
  static: {
    members: [
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 0,
        name: "srgb",
        structure: s30,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 1,
        name: "display-p3",
        structure: s30,
      },
    ],
    template: o74
  },
});
$(s31, {
  ...s,
  type: 2,
  flags: 14,
  name: "S13",
  byteSize: 20,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 1,
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
        flags: 1,
        bitOffset: 64,
        bitSize: 32,
        byteSize: 4,
        slot: 1,
        name: "width",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 96,
        bitSize: 32,
        byteSize: 4,
        slot: 2,
        name: "height",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s30,
      },
    ],
    template: o77
  },
  static: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "Pixel",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "FPixel",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "channels",
        structure: s6,
      },
    ],
    template: o79
  },
});
$(s32, {
  ...s,
  type: 2,
  flags: 14,
  name: "S14",
  byteSize: 20,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitOffset: 0,
        bitSize: 160,
        byteSize: 20,
        slot: 0,
        name: "src",
        structure: s31,
      },
    ],
    template: o86
  },
});
$(s33, {
  ...s,
  type: 8,
  flags: 60,
  name: "[]@Vector(4, u8)",
  byteSize: 8,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        structure: s27,
      },
    ],
  },
});
$(s34, {
  ...s,
  type: 2,
  flags: 14,
  name: "S15",
  byteSize: 20,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 1,
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
        flags: 1,
        bitOffset: 64,
        bitSize: 32,
        byteSize: 4,
        slot: 1,
        name: "width",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 96,
        bitSize: 32,
        byteSize: 4,
        slot: 2,
        name: "height",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        bitOffset: 128,
        bitSize: 1,
        byteSize: 1,
        slot: 3,
        name: "colorSpace",
        structure: s30,
      },
    ],
    template: o89
  },
  static: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "Pixel",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "FPixel",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "channels",
        structure: s6,
      },
    ],
    template: o91
  },
});
$(s35, {
  ...s,
  type: 2,
  flags: 14,
  name: "S16",
  byteSize: 20,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitOffset: 0,
        bitSize: 160,
        byteSize: 20,
        slot: 0,
        name: "dst",
        structure: s34,
      },
    ],
    template: o96
  },
});
$(s36, {
  ...s,
  type: 2,
  flags: 10,
  name: "S17",
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
        structure: s19,
      },
    ],
    template: o99
  },
});
$(s37, {
  ...s,
  type: 5,
  flags: 1,
  name: "ES0",
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
        structure: s37,
      },
    ],
  },
  static: {
    members: [
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 0,
        name: "OutOfMemory",
        structure: s37,
      },
    ],
    template: o100
  },
});
$(s38, {
  ...s,
  type: 4,
  flags: 15,
  name: "ES0!S16",
  byteSize: 24,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitOffset: 0,
        bitSize: 160,
        byteSize: 20,
        slot: 0,
        structure: s35,
      },
      {
        ...m,
        type: 3,
        flags: 8,
        bitOffset: 160,
        bitSize: 16,
        byteSize: 2,
        structure: s37,
      },
    ],
  },
});
$(s39, {
  ...s,
  type: 9,
  flags: 480,
  name: "anyopaque",
  byteSize: undefined,
  align: undefined,
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
  },
});
$(s40, {
  ...s,
  type: 8,
  flags: 332,
  name: "*opaque",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        structure: s39,
      },
    ],
  },
});
$(s41, {
  ...s,
  type: 9,
  flags: 224,
  name: "[_]u8",
  byteSize: 1,
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
  },
});
$(s42, {
  ...s,
  type: 8,
  flags: 44,
  name: "[*]u8",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        structure: s41,
      },
    ],
  },
});
$(s43, {
  ...s,
  flags: 17,
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
        structure: s43,
      },
    ],
  },
});
$(s44, {
  ...s,
  type: 7,
  flags: 15,
  name: "?[*]u8",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        structure: s42,
      },
      {
        ...m,
        type: 3,
        flags: 8,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        structure: s43,
      },
    ],
  },
});
$(s45, {
  ...s,
  type: 12,
  flags: 14,
  name: "Arg(fn (*opaque, usize, u8, usize) ?[*]u8)",
  length: 4,
  byteSize: 20,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        name: "retval",
        structure: s44,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 32,
        bitSize: 32,
        byteSize: 4,
        slot: 1,
        name: "0",
        structure: s40,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 64,
        bitSize: 32,
        byteSize: 4,
        slot: 2,
        name: "1",
        structure: s43,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 128,
        bitSize: 8,
        byteSize: 1,
        slot: 3,
        name: "2",
        structure: s1,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 96,
        bitSize: 32,
        byteSize: 4,
        slot: 4,
        name: "3",
        structure: s43,
      },
    ],
  },
});
$(s46, {
  ...s,
  type: 14,
  name: "fn (*opaque, usize, u8, usize) ?[*]u8",
  length: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 160,
        byteSize: 20,
        structure: s45,
      },
    ],
    template: o102
  },
  static: {
    members: [],
    template: o103
  },
});
$(s47, {
  ...s,
  type: 8,
  flags: 204,
  name: "*const fn (*opaque, usize, u8, usize) ?[*]u8",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        structure: s46,
      },
    ],
  },
});
$(s48, {
  ...s,
  flags: 1,
  name: "bool",
  byteSize: 1,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 1,
        bitOffset: 0,
        bitSize: 1,
        byteSize: 1,
        structure: s48,
      },
    ],
  },
});
$(s49, {
  ...s,
  type: 8,
  flags: 60,
  name: "[]u8",
  byteSize: 8,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 64,
        byteSize: 8,
        slot: 0,
        structure: s41,
      },
    ],
  },
});
$(s50, {
  ...s,
  type: 12,
  flags: 14,
  name: "Arg(fn (*opaque, []u8, u8, usize, usize) bool)",
  length: 5,
  byteSize: 24,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 1,
        flags: 1,
        bitOffset: 160,
        bitSize: 1,
        byteSize: 1,
        slot: 0,
        name: "retval",
        structure: s48,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        slot: 1,
        name: "0",
        structure: s40,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 32,
        bitSize: 64,
        byteSize: 8,
        slot: 2,
        name: "1",
        structure: s49,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 168,
        bitSize: 8,
        byteSize: 1,
        slot: 3,
        name: "2",
        structure: s1,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 96,
        bitSize: 32,
        byteSize: 4,
        slot: 4,
        name: "3",
        structure: s43,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 128,
        bitSize: 32,
        byteSize: 4,
        slot: 5,
        name: "4",
        structure: s43,
      },
    ],
  },
});
$(s51, {
  ...s,
  type: 14,
  name: "fn (*opaque, []u8, u8, usize, usize) bool",
  length: 5,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 192,
        byteSize: 24,
        structure: s50,
      },
    ],
    template: o104
  },
  static: {
    members: [],
    template: o105
  },
});
$(s52, {
  ...s,
  type: 8,
  flags: 204,
  name: "*const fn (*opaque, []u8, u8, usize, usize) bool",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        structure: s51,
      },
    ],
  },
});
$(s53, {
  ...s,
  flags: 1,
  name: "void",
  align: 1,
  instance: {
    members: [
      {
        ...m,
        bitOffset: 0,
        bitSize: 0,
        byteSize: 0,
        structure: s53,
      },
    ],
  },
});
$(s54, {
  ...s,
  type: 12,
  flags: 14,
  name: "Arg(fn (*opaque, []u8, u8, usize) void)",
  length: 4,
  byteSize: 20,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        flags: 1,
        bitOffset: 128,
        bitSize: 0,
        byteSize: 0,
        slot: 0,
        name: "retval",
        structure: s53,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        slot: 1,
        name: "0",
        structure: s40,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 32,
        bitSize: 64,
        byteSize: 8,
        slot: 2,
        name: "1",
        structure: s49,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 128,
        bitSize: 8,
        byteSize: 1,
        slot: 3,
        name: "2",
        structure: s1,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 96,
        bitSize: 32,
        byteSize: 4,
        slot: 4,
        name: "3",
        structure: s43,
      },
    ],
  },
});
$(s55, {
  ...s,
  type: 14,
  name: "fn (*opaque, []u8, u8, usize) void",
  length: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 160,
        byteSize: 20,
        structure: s54,
      },
    ],
    template: o106
  },
  static: {
    members: [],
    template: o107
  },
});
$(s56, {
  ...s,
  type: 8,
  flags: 204,
  name: "*const fn (*opaque, []u8, u8, usize) void",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        structure: s55,
      },
    ],
  },
});
$(s57, {
  ...s,
  type: 2,
  flags: 14,
  name: "VTable",
  byteSize: 12,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        name: "alloc",
        structure: s47,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 32,
        bitSize: 32,
        byteSize: 4,
        slot: 1,
        name: "resize",
        structure: s52,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 64,
        bitSize: 32,
        byteSize: 4,
        slot: 2,
        name: "free",
        structure: s56,
      },
    ],
    template: o108
  },
});
$(s58, {
  ...s,
  type: 8,
  flags: 204,
  name: "*const VTable",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        structure: s57,
      },
    ],
  },
});
$(s59, {
  ...s,
  type: 5,
  flags: 1,
  name: "ES1",
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
        structure: s59,
      },
    ],
  },
  static: {
    members: [
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 0,
        name: "OutOfMemory",
        structure: s59,
      },
    ],
    template: o115
  },
});
$(s60, {
  ...s,
  flags: 1,
  name: "u5",
  byteSize: 1,
  align: 1,
  instance: {
    members: [
      {
        ...m,
        type: 3,
        bitOffset: 0,
        bitSize: 5,
        byteSize: 1,
        structure: s60,
      },
    ],
  },
});
$(s61, {
  ...s,
  type: 12,
  flags: 30,
  name: "Arg(fn (Allocator, usize, u8, usize) ?[*]u8)",
  length: 3,
  byteSize: 24,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        name: "retval",
        structure: s44,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 32,
        bitSize: 64,
        byteSize: 8,
        slot: 1,
        name: "0",
        structure: s70,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 96,
        bitSize: 32,
        byteSize: 4,
        slot: 2,
        name: "1",
        structure: s43,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 160,
        bitSize: 8,
        byteSize: 1,
        slot: 3,
        name: "2",
        structure: s1,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 128,
        bitSize: 32,
        byteSize: 4,
        slot: 4,
        name: "3",
        structure: s43,
      },
    ],
  },
});
$(s62, {
  ...s,
  type: 14,
  name: "fn (Allocator, usize, u8, usize) ?[*]u8",
  length: 3,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 192,
        byteSize: 24,
        structure: s61,
      },
    ],
    template: o117
  },
});
$(s63, {
  ...s,
  type: 14,
  name: "fn (Allocator, usize, u8, usize) ?[*]u8",
  length: 3,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 192,
        byteSize: 24,
        structure: s61,
      },
    ],
    template: o118
  },
});
$(s64, {
  ...s,
  type: 12,
  flags: 30,
  name: "Arg(fn (Allocator, []u8, u8, usize, usize) bool)",
  length: 4,
  byteSize: 28,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 1,
        flags: 1,
        bitOffset: 192,
        bitSize: 1,
        byteSize: 1,
        slot: 0,
        name: "retval",
        structure: s48,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 64,
        byteSize: 8,
        slot: 1,
        name: "0",
        structure: s70,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 64,
        bitSize: 64,
        byteSize: 8,
        slot: 2,
        name: "1",
        structure: s49,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 200,
        bitSize: 8,
        byteSize: 1,
        slot: 3,
        name: "2",
        structure: s1,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 128,
        bitSize: 32,
        byteSize: 4,
        slot: 4,
        name: "3",
        structure: s43,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 160,
        bitSize: 32,
        byteSize: 4,
        slot: 5,
        name: "4",
        structure: s43,
      },
    ],
  },
});
$(s65, {
  ...s,
  type: 14,
  name: "fn (Allocator, []u8, u8, usize, usize) bool",
  length: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 224,
        byteSize: 28,
        structure: s64,
      },
    ],
    template: o119
  },
});
$(s66, {
  ...s,
  type: 14,
  name: "fn (Allocator, []u8, u8, usize, usize) bool",
  length: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 224,
        byteSize: 28,
        structure: s64,
      },
    ],
    template: o120
  },
});
$(s67, {
  ...s,
  type: 12,
  flags: 30,
  name: "Arg(fn (Allocator, []u8, u8, usize) void)",
  length: 3,
  byteSize: 24,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        flags: 1,
        bitOffset: 160,
        bitSize: 0,
        byteSize: 0,
        slot: 0,
        name: "retval",
        structure: s53,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 64,
        byteSize: 8,
        slot: 1,
        name: "0",
        structure: s70,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 64,
        bitSize: 64,
        byteSize: 8,
        slot: 2,
        name: "1",
        structure: s49,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 160,
        bitSize: 8,
        byteSize: 1,
        slot: 3,
        name: "2",
        structure: s1,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 128,
        bitSize: 32,
        byteSize: 4,
        slot: 4,
        name: "3",
        structure: s43,
      },
    ],
  },
});
$(s68, {
  ...s,
  type: 14,
  name: "fn (Allocator, []u8, u8, usize) void",
  length: 3,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 192,
        byteSize: 24,
        structure: s67,
      },
    ],
    template: o121
  },
});
$(s69, {
  ...s,
  type: 14,
  name: "fn (Allocator, []u8, u8, usize) void",
  length: 3,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 192,
        byteSize: 24,
        structure: s67,
      },
    ],
    template: o122
  },
});
$(s70, {
  ...s,
  type: 2,
  flags: 270,
  name: "Allocator",
  byteSize: 8,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        name: "ptr",
        structure: s40,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 32,
        bitSize: 32,
        byteSize: 4,
        slot: 1,
        name: "vtable",
        structure: s58,
      },
    ],
    template: o123
  },
  static: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "Error",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "Log2Align",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "VTable",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 3,
        name: "noResize",
        structure: s51,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 4,
        name: "noFree",
        structure: s55,
      },
      {
        ...m,
        type: 5,
        flags: 18,
        slot: 5,
        name: "rawAlloc",
        structure: s62,
      },
      {
        ...m,
        type: 5,
        flags: 18,
        slot: 6,
        name: "rawResize",
        structure: s65,
      },
      {
        ...m,
        type: 5,
        flags: 18,
        slot: 7,
        name: "rawFree",
        structure: s68,
      },
    ],
    template: o127
  },
});
$(s71, {
  ...s,
  type: 12,
  flags: 62,
  name: "Arg(fn (Allocator, u32, u32, S14, S17) ES0!S16)",
  length: 4,
  byteSize: 112,
  align: 16,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 384,
        bitSize: 192,
        byteSize: 24,
        slot: 0,
        name: "retval",
        structure: s38,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 576,
        bitSize: 64,
        byteSize: 8,
        slot: 1,
        name: "0",
        structure: s70,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 640,
        bitSize: 32,
        byteSize: 4,
        slot: 2,
        name: "1",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 672,
        bitSize: 32,
        byteSize: 4,
        slot: 3,
        name: "2",
        structure: s29,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 704,
        bitSize: 160,
        byteSize: 20,
        slot: 4,
        name: "3",
        structure: s32,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 384,
        byteSize: 48,
        slot: 5,
        name: "4",
        structure: s36,
      },
    ],
  },
});
$(s72, {
  ...s,
  type: 14,
  name: "fn (Allocator, u32, u32, S14, S17) ES0!S16",
  length: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 896,
        byteSize: 112,
        structure: s71,
      },
    ],
    template: o139
  },
});
$(s73, {
  ...s,
  type: 5,
  flags: 1,
  name: "ES2",
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
        structure: s73,
      },
    ],
  },
  static: {
    members: [
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 0,
        name: "OutOfMemory",
        structure: s73,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 1,
        name: "NoThreadsAvailable",
        structure: s73,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 2,
        name: "Aborted",
        structure: s73,
      },
    ],
    template: o140
  },
});
$(s74, {
  ...s,
  type: 5,
  flags: 1,
  name: "ES3",
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
        structure: s74,
      },
    ],
  },
  static: {
    members: [
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 0,
        name: "OutOfMemory",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 1,
        name: "Unknown",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 2,
        name: "UnableToAllocateMemory",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 3,
        name: "UnableToFreeMemory",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 4,
        name: "UnableToRetrieveMemoryLocation",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 5,
        name: "UnableToCreateDataView",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 6,
        name: "UnableToCreateObject",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 7,
        name: "UnableToObtainSlot",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 8,
        name: "UnableToRetrieveObject",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 9,
        name: "UnableToInsertObject",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 10,
        name: "UnableToStartStructureDefinition",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 11,
        name: "UnableToAddStructureMember",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 12,
        name: "UnableToAddStaticMember",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 13,
        name: "UnableToAddMethod",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 14,
        name: "UnableToCreateStructureTemplate",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 15,
        name: "UnableToCreateString",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 16,
        name: "UnableToAddStructureTemplate",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 17,
        name: "UnableToDefineStructure",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 18,
        name: "UnableToWriteToConsole",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 19,
        name: "UnableToCreateFunction",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 20,
        name: "UnableToUseThread",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 21,
        name: "NotInMainThread",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 22,
        name: "MultithreadingNotEnabled",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 23,
        name: "TooManyArguments",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 24,
        name: "ThreadQuotaExceeded",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 25,
        name: "SystemResources",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 26,
        name: "LockedMemoryLimitExceeded",
        structure: s74,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 27,
        name: "Unexpected",
        structure: s74,
      },
    ],
    template: o144
  },
});
$(s75, {
  ...s,
  type: 4,
  flags: 1,
  name: "ES3!void",
  byteSize: 2,
  align: 2,
  instance: {
    members: [
      {
        ...m,
        bitOffset: 16,
        bitSize: 0,
        byteSize: 0,
        slot: 0,
        structure: s53,
      },
      {
        ...m,
        type: 3,
        flags: 8,
        bitOffset: 0,
        bitSize: 16,
        byteSize: 2,
        structure: s74,
      },
    ],
  },
});
$(s76, {
  ...s,
  type: 12,
  flags: 42,
  name: "Arg(fn (u32) ES3!void)",
  length: 1,
  byteSize: 8,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 32,
        bitSize: 16,
        byteSize: 2,
        slot: 0,
        name: "retval",
        structure: s75,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        slot: 1,
        name: "0",
        structure: s29,
      },
    ],
  },
});
$(s77, {
  ...s,
  type: 14,
  name: "fn (u32) ES3!void",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 64,
        byteSize: 8,
        structure: s76,
      },
    ],
    template: o173
  },
});
$(s78, {
  ...s,
  type: 5,
  flags: 1,
  name: "ES4",
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
        structure: s78,
      },
    ],
  },
  static: {
    members: [
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 0,
        name: "OutOfMemory",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 1,
        name: "Unknown",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 2,
        name: "UnableToAllocateMemory",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 3,
        name: "UnableToFreeMemory",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 4,
        name: "UnableToRetrieveMemoryLocation",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 5,
        name: "UnableToCreateDataView",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 6,
        name: "UnableToCreateObject",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 7,
        name: "UnableToObtainSlot",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 8,
        name: "UnableToRetrieveObject",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 9,
        name: "UnableToInsertObject",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 10,
        name: "UnableToStartStructureDefinition",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 11,
        name: "UnableToAddStructureMember",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 12,
        name: "UnableToAddStaticMember",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 13,
        name: "UnableToAddMethod",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 14,
        name: "UnableToCreateStructureTemplate",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 15,
        name: "UnableToCreateString",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 16,
        name: "UnableToAddStructureTemplate",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 17,
        name: "UnableToDefineStructure",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 18,
        name: "UnableToWriteToConsole",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 19,
        name: "UnableToCreateFunction",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 20,
        name: "UnableToUseThread",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 21,
        name: "NotInMainThread",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 22,
        name: "MultithreadingNotEnabled",
        structure: s78,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 23,
        name: "TooManyArguments",
        structure: s78,
      },
    ],
    template: o174
  },
});
$(s79, {
  ...s,
  type: 4,
  flags: 1,
  name: "ES4!void",
  byteSize: 2,
  align: 2,
  instance: {
    members: [
      {
        ...m,
        bitOffset: 16,
        bitSize: 0,
        byteSize: 0,
        slot: 0,
        structure: s53,
      },
      {
        ...m,
        type: 3,
        flags: 8,
        bitOffset: 0,
        bitSize: 16,
        byteSize: 2,
        structure: s78,
      },
    ],
  },
});
$(s80, {
  ...s,
  type: 12,
  flags: 42,
  name: "Arg(fn () ES4!void)",
  length: 0,
  byteSize: 2,
  align: 2,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 16,
        byteSize: 2,
        slot: 0,
        name: "retval",
        structure: s79,
      },
    ],
  },
});
$(s81, {
  ...s,
  type: 14,
  name: "fn () ES4!void",
  length: 0,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 16,
        byteSize: 2,
        structure: s80,
      },
    ],
    template: o199
  },
});
$(s82, {
  ...s,
  type: 5,
  flags: 1,
  name: "ES5",
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
        structure: s82,
      },
    ],
  },
  static: {
    members: [
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 0,
        name: "OutOfMemory",
        structure: s82,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 1,
        name: "NoThreadsAvailable",
        structure: s82,
      },
      {
        ...m,
        type: 5,
        flags: 4,
        slot: 2,
        name: "Aborted",
        structure: s82,
      },
    ],
    template: o200
  },
});
$(s83, {
  ...s,
  type: 4,
  flags: 1,
  name: "ES5!void",
  byteSize: 2,
  align: 2,
  instance: {
    members: [
      {
        ...m,
        bitOffset: 16,
        bitSize: 0,
        byteSize: 0,
        slot: 0,
        structure: s53,
      },
      {
        ...m,
        type: 3,
        flags: 8,
        bitOffset: 0,
        bitSize: 16,
        byteSize: 2,
        structure: s82,
      },
    ],
  },
});
$(s84, {
  ...s,
  type: 4,
  flags: 15,
  name: "ES2!S16",
  byteSize: 24,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitOffset: 0,
        bitSize: 160,
        byteSize: 20,
        slot: 0,
        structure: s35,
      },
      {
        ...m,
        type: 3,
        flags: 8,
        bitOffset: 160,
        bitSize: 16,
        byteSize: 2,
        structure: s73,
      },
    ],
  },
});
$(s85, {
  ...s,
  type: 12,
  flags: 14,
  name: "Arg(fn (ES2!S16) void)",
  length: 1,
  byteSize: 24,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        flags: 1,
        bitOffset: 192,
        bitSize: 0,
        byteSize: 0,
        slot: 0,
        name: "retval",
        structure: s53,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 192,
        byteSize: 24,
        slot: 1,
        name: "0",
        structure: s84,
      },
    ],
  },
});
$(s86, {
  ...s,
  type: 14,
  name: "fn (ES2!S16) void",
  length: 1,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 192,
        byteSize: 24,
        structure: s85,
      },
    ],
    template: o204
  },
  static: {
    members: [],
    template: o205
  },
});
$(s87, {
  ...s,
  type: 8,
  flags: 204,
  name: "*const fn (ES2!S16) void",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        structure: s86,
      },
    ],
  },
});
$(s88, {
  ...s,
  type: 2,
  flags: 526,
  name: "S18",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        name: "callback",
        structure: s87,
      },
    ],
    template: o206
  },
});
$(s89, {
  ...s,
  flags: 1,
  name: "i32",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 2,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        structure: s89,
      },
    ],
  },
});
$(s90, {
  ...s,
  type: 8,
  flags: 204,
  name: "*const i32",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        structure: s89,
      },
    ],
  },
});
$(s91, {
  ...s,
  type: 2,
  flags: 1038,
  name: "AbortSignal",
  byteSize: 4,
  align: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 32,
        byteSize: 4,
        slot: 0,
        name: "ptr",
        structure: s90,
      },
    ],
    template: o209
  },
});
$(s92, {
  ...s,
  type: 12,
  flags: 126,
  name: "Arg(fn (Allocator, S18, AbortSignal, u32, u32, S14, S17) ES5!void)",
  length: 4,
  byteSize: 96,
  align: 16,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 736,
        bitSize: 16,
        byteSize: 2,
        slot: 0,
        name: "retval",
        structure: s83,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 384,
        bitSize: 64,
        byteSize: 8,
        slot: 1,
        name: "0",
        structure: s70,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 448,
        bitSize: 32,
        byteSize: 4,
        slot: 2,
        name: "1",
        structure: s88,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 480,
        bitSize: 32,
        byteSize: 4,
        slot: 3,
        name: "2",
        structure: s91,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 512,
        bitSize: 32,
        byteSize: 4,
        slot: 4,
        name: "3",
        structure: s29,
      },
      {
        ...m,
        type: 3,
        flags: 1,
        bitOffset: 544,
        bitSize: 32,
        byteSize: 4,
        slot: 5,
        name: "4",
        structure: s29,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 576,
        bitSize: 160,
        byteSize: 20,
        slot: 6,
        name: "5",
        structure: s32,
      },
      {
        ...m,
        type: 5,
        flags: 1,
        bitOffset: 0,
        bitSize: 384,
        byteSize: 48,
        slot: 7,
        name: "6",
        structure: s36,
      },
    ],
  },
});
$(s93, {
  ...s,
  type: 14,
  name: "fn (Allocator, S18, AbortSignal, u32, u32, S14, S17) ES5!void",
  length: 4,
  instance: {
    members: [
      {
        ...m,
        type: 5,
        bitSize: 768,
        byteSize: 96,
        structure: s92,
      },
    ],
    template: o211
  },
});
$(s94, {
  ...s,
  type: 2,
  name: "simple",
  align: 1,
  static: {
    members: [
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 0,
        name: "kernel",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 1,
        name: "Input",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 2,
        name: "Output",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 3,
        name: "Parameters",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 4,
        name: "createOutput",
        structure: s72,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 9,
        name: "OutputError",
        structure: s0,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 10,
        name: "startThreadPool",
        structure: s77,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 11,
        name: "stopThreadPool",
        structure: s81,
      },
      {
        ...m,
        type: 5,
        flags: 2,
        slot: 12,
        name: "createOutputAsync",
        structure: s93,
      },
    ],
    template: o212
  },
});
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
  s90, s91, s92, s93, s94,
];
const root = s94;
const settings = {
  runtimeSafety: true,
  littleEndian: true,
  libc: false,
};

// create runtime environment
const env = createEnvironment();

// recreate structures
env.recreateStructures(structures, settings);

// initiate loading and compilation of WASM bytecodes
const source = (async () => {
  const url = new URL('assets/simple-B0FzZmn9.wasm', import.meta.url).href;
  if (typeof(process) === 'object' && process[Symbol.toStringTag] === 'process') {
    const { readFile } = await import('fs/promises');
    const { fileURLToPath } = await import('url');
    const path = fileURLToPath(url);
    return readFile(path);
  } else {
    return fetch(url);
  }
})();
env.loadModule(source, {"memoryMax":10240,"memoryInitial":257,"tableInitial":297,"multithreaded":true});
env.linkVariables(true);

// export root namespace and its methods and constants
const { constructor } = root;
const __zigar = env.getSpecialExports();

// rollup-plugin-pb2zig additions
const { createOutput, Input, kernel } = constructor;

const inputKeys = [];
for (const [ key ] of kernel.inputImages) {
  inputKeys.push(key);
}
const outputKeys = [];
for (const [ key ] of kernel.outputImages) {
  outputKeys.push(key);
}

function createInput(source) {
  if (Array.isArray(source)) {
    const list = source;
    source = {};
    for (const [ index, key ] of inputKeys.entries()) {
      source[key] = list[index];
    }
  }
  const input = new Input(undefined);
  const missing = [];
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
  }
  if (missing.length > 0) {
    throw new Error(`Missing input image${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`);
  }
  return input;
}

function getColorSpace(input) {
  let colorSpace;
  for (const key of inputKeys) {
    let imageData = input[key];
    if (colorSpace) {
      if (imageData.colorSpace !== colorSpace) {
        throw new Error(`Input images must all use the same color space: ${colorSpace}`);
      }
    } else {
      colorSpace = imageData.colorSpace;
    }
  }
  return colorSpace;
}

function createResult(output, colorSpace) {
  if (output[Symbol.toStringTag] === 'Promise') {
    return output.then(createResult);
  }
  const resultSet = {};
  for (const key of outputKeys) {
    let imageData;
    if (typeof(ImageData) === 'function') {
      const { data: { clampedArray }, width, height } = output[key];
      imageData = new ImageData(clampedArray, width, height, { colorSpace });
    } else {
      // for Node.js, which doesn't have ImageData
      const { data: { typedArray }, width, height } = output[key];
      imageData = { data: typedArray, width, height };
    }
    if (outputKeys.length === 1) {
      // just return the one image
      return imageData;
    }
    resultSet[key] = imageData;
  }
  return resultSet;
}

function createImageData(width, height, source = {}, params = {}) {
  const input = createInput(source);
  const colorSpace = getColorSpace(input);
  const output = createOutput(width, height, input, params);
  return createResult(output, colorSpace);
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
            avalue = avalue.string ?? avalue.valueOf();
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

const { createOutputAsync, startThreadPool, stopThreadPool } = constructor;

async function createImageDataAsync(width, height, source = {}, params = {}, options = {}) {
  const input = createInput(source);
  const colorSpace = getColorSpace(input);
  const output = await createOutputAsync(width, height, input, params, options);
  return createResult(output, colorSpace);
}

class AbortManager {
  currentOp = null;

  async call(cb) {
    const controller = new AbortController;
    const { signal } = controller;
    const prevOp = this.currentOp;
    const thisOp = this.currentOp = { controller, promise: null };
    if (prevOp) {
      // abort previous call and wait for promise rejection
      prevOp.controller.abort();
      await prevOp.promise?.catch(() => {});
    }
    if (signal.aborted) {
      // throw error now if the operation was aborted,
      // before the function is even called
      throw new Error('Aborted');
    }
    const result = await (this.currentOp.promise = cb?.(signal));
    if (thisOp === this.currentOp) {
      this.currentOp = null;
    }
    return result;
  }

  async stop() {
    return this.call(null);
  }
}

export { AbortManager, __zigar, createImageData, createImageDataAsync, getKernelInfo, startThreadPool, stopThreadPool };
