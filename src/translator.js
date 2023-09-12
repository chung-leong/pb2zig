import * as N from './nodes.js';

export class PixelBenderToZigTranslator {
    lines = [ '' ];
    tabs = 0;
    ast = null;

    indent(delta) {
        this.tabs += delta;
    }

    add(text) {
        var index = this.lines.length - 1;
        var line = this.lines[index];
        if (line.endsWith('{')) {
            if (!text.startsWith('}'))  {
                this.nl();
                line = '';
                index++;
            }
            this.indent(+1);
        }
        if (text.startsWith('}')) {
            this.indent(-1);
        }
        if (!line.endsWith('{')) {
            line += ' '.repeat(!line ? this.tabs * 4 : 1);
        }
        line += text;
        this.lines[index] = line;
        if (text.startsWith('}')) {
            this.nl();
        }
    }

    nl(count = 1) {
        for (let i = 0; i < count; i++) {
            this.lines.push('');
        }
    }

    find(Class) {
        const list = [];
        const f = (node) => {
            if (node instanceof Array) {
                node.forEach(f);
            } else if (node instanceof Class) {
                list.push(node);
            } else if (node instanceof Object) {
                for (const n of Object.values(node)) {
                    f(n);
                }
            }
        };
        f(this.ast);
        return list;
    }

    translate(ast) {
        this.ast = ast;
        this.addMetadata();
        this.addTypeFunction();
        this.ast = null;
        return this.lines;
    }

    translateType(type) {
        const table = {
            bool: 'bool',
            bool2: 'bool[2]',
            bool3: 'bool[3]',
            bool4: 'bool[4]',

            int: 'i32',
            int2: '@Vector(2, i32)',
            int3: '@Vector(3, i32)',
            int4: '@Vector(4, i32)',

            float: 'f32',
            float2: '@Vector(2, f32)',
            float3: '@Vector(3, f32)',
            float4: '@Vector(4, f32)',
        };
        const zigType = table[type];
        if (!zigType) {
            throw new Error(`Unknown type: ${type}`);
        }
        return zigType;
    }

    addMetadata() {
        const { name, meta } = this.ast;
        this.add(`// Pixel Bender "${name}" (translated using pb2zig)`);
        this.nl(2);
        for (const [ field, value ] of Object.entries(meta)) {
            if (value) {
                this.add(`// ${field}: ${value}`);
                this.nl();
            }
        }
        this.nl();
    }

    addTypeFunction() {
        this.add(`pub fn Kernel(comptime Image: type, comptime sampler: anytype) type {`);
        this.add(`return struct {`);
        this.addParameterFields();
        this.addParameterDecls();
        this.addSources();
        this.addDestination();
        this.addPixelFunction();
        this.add(`};`);
        this.add(`}`);
    }

    addParameterFields() {
        const params = this.find(N.Parameter);
        this.add(`// parameter fields`)
        this.nl();
        for (const param of params) {
            const type = this.translateType(param.type);
            if (param.defaultValue != undefined) {
                this.add(`var ${param.name}:${type} = parameters.${param.name}.defaultValue;`);
            } else {
                this.add(`var ${param.name}:${type};`);
            }
            this.nl();
        }
        this.nl();
    }

    addParameterDecls() {
        const params = this.find(N.Parameter);
        this.add(`// parameter info`);
        this.nl();
        this.add(`const parameters = .{`);
        for (const param of params) {
            this.add(`.${param.name} = .{`);
            for (const [ name, value ] of Object.entries(param)) {
                if (name !== 'name' && name !== 'type' && value != undefined) {
                    this.add(`.${name} = ${JSON.stringify(value)},`);
                    this.nl();
                }
            }
            this.add(`},`);
        }
        this.add(`};`);
        this.nl();
    }

    addSources() {
    }

    addDestination() {

    }

    addPixelFunction() {

    }
}
