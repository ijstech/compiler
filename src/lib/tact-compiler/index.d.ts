declare namespace TactCompiler {
                declare module "config/parseConfig" {
    import { z } from "zod";
    export const optionsSchema: z.ZodObject<{
        /**
         * If set to true, enables debug output of a contract and allows usage of `dump()` function,
         * which is useful for debugging purposes.
         *
         * Read more: https://docs.tact-lang.org/book/debug
         */
        debug: z.ZodOptional<z.ZodBoolean>;
        /**
         * If set to true, enables support of external message receivers.
         *
         * Read more: https://docs.tact-lang.org/book/external
         */
        external: z.ZodOptional<z.ZodBoolean>;
        /**
         * If set to true, enables generation of a getter with IPFS links describing the contract's ABI.
         *
         * Read more: https://docs.tact-lang.org/ref/evolution/OTP-003
         */
        ipfsAbiGetter: z.ZodOptional<z.ZodBoolean>;
        /**
         * If set to true, enables generation of a getter with a list of interfaces provided by the contract.
         *
         * Read more: https://docs.tact-lang.org/book/contracts#interfaces
         */
        interfacesGetter: z.ZodOptional<z.ZodBoolean>;
        /**
         * If set to "new", uses new parser. If set to "old", uses legacy parser. Default is "old".
         */
        parser: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"new">, z.ZodLiteral<"old">]>>;
        /**
         * Experimental options that might be removed in the future. Use with caution!
         */
        experimental: z.ZodOptional<z.ZodObject<{
            /**
             * If set to true, enables inlining of all functions in contracts.
             * This can reduce gas usage at the cost of bigger contracts.
             */
            inline: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            inline?: boolean;
        }, {
            inline?: boolean;
        }>>;
    }, "strict", z.ZodTypeAny, {
        external?: boolean;
        debug?: boolean;
        ipfsAbiGetter?: boolean;
        interfacesGetter?: boolean;
        parser?: "new" | "old";
        experimental?: {
            inline?: boolean;
        };
    }, {
        external?: boolean;
        debug?: boolean;
        ipfsAbiGetter?: boolean;
        interfacesGetter?: boolean;
        parser?: "new" | "old";
        experimental?: {
            inline?: boolean;
        };
    }>;
    export const projectSchema: z.ZodObject<{
        /**
         * Name of the project. All generated files are prefixed with it.
         *
         * Read more: https://docs.tact-lang.org/book/config#projects-name
         */
        name: z.ZodString;
        /**
         * Path to the project's Tact file. You can only specify one Tact file per project.
         *
         * Read more: https://docs.tact-lang.org/book/config#projects-path
         */
        path: z.ZodString;
        /**
         * Path to the directory where all generated files will be placed.
         *
         * Read more: https://docs.tact-lang.org/book/config#projects-output
         */
        output: z.ZodString;
        /**
         * Compilation options for the project.
         *
         * Read more: https://docs.tact-lang.org/book/config#projects-options
         */
        options: z.ZodOptional<z.ZodObject<{
            /**
             * If set to true, enables debug output of a contract and allows usage of `dump()` function,
             * which is useful for debugging purposes.
             *
             * Read more: https://docs.tact-lang.org/book/debug
             */
            debug: z.ZodOptional<z.ZodBoolean>;
            /**
             * If set to true, enables support of external message receivers.
             *
             * Read more: https://docs.tact-lang.org/book/external
             */
            external: z.ZodOptional<z.ZodBoolean>;
            /**
             * If set to true, enables generation of a getter with IPFS links describing the contract's ABI.
             *
             * Read more: https://docs.tact-lang.org/ref/evolution/OTP-003
             */
            ipfsAbiGetter: z.ZodOptional<z.ZodBoolean>;
            /**
             * If set to true, enables generation of a getter with a list of interfaces provided by the contract.
             *
             * Read more: https://docs.tact-lang.org/book/contracts#interfaces
             */
            interfacesGetter: z.ZodOptional<z.ZodBoolean>;
            /**
             * If set to "new", uses new parser. If set to "old", uses legacy parser. Default is "old".
             */
            parser: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"new">, z.ZodLiteral<"old">]>>;
            /**
             * Experimental options that might be removed in the future. Use with caution!
             */
            experimental: z.ZodOptional<z.ZodObject<{
                /**
                 * If set to true, enables inlining of all functions in contracts.
                 * This can reduce gas usage at the cost of bigger contracts.
                 */
                inline: z.ZodOptional<z.ZodBoolean>;
            }, "strict", z.ZodTypeAny, {
                inline?: boolean;
            }, {
                inline?: boolean;
            }>>;
        }, "strict", z.ZodTypeAny, {
            external?: boolean;
            debug?: boolean;
            ipfsAbiGetter?: boolean;
            interfacesGetter?: boolean;
            parser?: "new" | "old";
            experimental?: {
                inline?: boolean;
            };
        }, {
            external?: boolean;
            debug?: boolean;
            ipfsAbiGetter?: boolean;
            interfacesGetter?: boolean;
            parser?: "new" | "old";
            experimental?: {
                inline?: boolean;
            };
        }>>;
        /**
         * Compilation mode of the project.
         *
         * Read more: https://docs.tact-lang.org/book/config#projects-mode
         */
        mode: z.ZodOptional<z.ZodEnum<["fullWithDecompilation", "full", "funcOnly", "checkOnly"]>>;
    }, "strict", z.ZodTypeAny, {
        name?: string;
        output?: string;
        path?: string;
        options?: {
            external?: boolean;
            debug?: boolean;
            ipfsAbiGetter?: boolean;
            interfacesGetter?: boolean;
            parser?: "new" | "old";
            experimental?: {
                inline?: boolean;
            };
        };
        mode?: "full" | "fullWithDecompilation" | "funcOnly" | "checkOnly";
    }, {
        name?: string;
        output?: string;
        path?: string;
        options?: {
            external?: boolean;
            debug?: boolean;
            ipfsAbiGetter?: boolean;
            interfacesGetter?: boolean;
            parser?: "new" | "old";
            experimental?: {
                inline?: boolean;
            };
        };
        mode?: "full" | "fullWithDecompilation" | "funcOnly" | "checkOnly";
    }>;
    export const configSchema: z.ZodObject<{
        /**
         * A property for specifying a path or URL to the JSON schema of tact.config.json
         *
         * Read more: https://docs.tact-lang.org/book/config#schema
         */
        $schema: z.ZodOptional<z.ZodString>;
        /**
         * List of Tact projects with respective compilation options. Each .tact file represents its own Tact project.
         *
         * Read more: https://docs.tact-lang.org/book/config#projects
         */
        projects: z.ZodArray<z.ZodObject<{
            /**
             * Name of the project. All generated files are prefixed with it.
             *
             * Read more: https://docs.tact-lang.org/book/config#projects-name
             */
            name: z.ZodString;
            /**
             * Path to the project's Tact file. You can only specify one Tact file per project.
             *
             * Read more: https://docs.tact-lang.org/book/config#projects-path
             */
            path: z.ZodString;
            /**
             * Path to the directory where all generated files will be placed.
             *
             * Read more: https://docs.tact-lang.org/book/config#projects-output
             */
            output: z.ZodString;
            /**
             * Compilation options for the project.
             *
             * Read more: https://docs.tact-lang.org/book/config#projects-options
             */
            options: z.ZodOptional<z.ZodObject<{
                /**
                 * If set to true, enables debug output of a contract and allows usage of `dump()` function,
                 * which is useful for debugging purposes.
                 *
                 * Read more: https://docs.tact-lang.org/book/debug
                 */
                debug: z.ZodOptional<z.ZodBoolean>;
                /**
                 * If set to true, enables support of external message receivers.
                 *
                 * Read more: https://docs.tact-lang.org/book/external
                 */
                external: z.ZodOptional<z.ZodBoolean>;
                /**
                 * If set to true, enables generation of a getter with IPFS links describing the contract's ABI.
                 *
                 * Read more: https://docs.tact-lang.org/ref/evolution/OTP-003
                 */
                ipfsAbiGetter: z.ZodOptional<z.ZodBoolean>;
                /**
                 * If set to true, enables generation of a getter with a list of interfaces provided by the contract.
                 *
                 * Read more: https://docs.tact-lang.org/book/contracts#interfaces
                 */
                interfacesGetter: z.ZodOptional<z.ZodBoolean>;
                /**
                 * If set to "new", uses new parser. If set to "old", uses legacy parser. Default is "old".
                 */
                parser: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"new">, z.ZodLiteral<"old">]>>;
                /**
                 * Experimental options that might be removed in the future. Use with caution!
                 */
                experimental: z.ZodOptional<z.ZodObject<{
                    /**
                     * If set to true, enables inlining of all functions in contracts.
                     * This can reduce gas usage at the cost of bigger contracts.
                     */
                    inline: z.ZodOptional<z.ZodBoolean>;
                }, "strict", z.ZodTypeAny, {
                    inline?: boolean;
                }, {
                    inline?: boolean;
                }>>;
            }, "strict", z.ZodTypeAny, {
                external?: boolean;
                debug?: boolean;
                ipfsAbiGetter?: boolean;
                interfacesGetter?: boolean;
                parser?: "new" | "old";
                experimental?: {
                    inline?: boolean;
                };
            }, {
                external?: boolean;
                debug?: boolean;
                ipfsAbiGetter?: boolean;
                interfacesGetter?: boolean;
                parser?: "new" | "old";
                experimental?: {
                    inline?: boolean;
                };
            }>>;
            /**
             * Compilation mode of the project.
             *
             * Read more: https://docs.tact-lang.org/book/config#projects-mode
             */
            mode: z.ZodOptional<z.ZodEnum<["fullWithDecompilation", "full", "funcOnly", "checkOnly"]>>;
        }, "strict", z.ZodTypeAny, {
            name?: string;
            output?: string;
            path?: string;
            options?: {
                external?: boolean;
                debug?: boolean;
                ipfsAbiGetter?: boolean;
                interfacesGetter?: boolean;
                parser?: "new" | "old";
                experimental?: {
                    inline?: boolean;
                };
            };
            mode?: "full" | "fullWithDecompilation" | "funcOnly" | "checkOnly";
        }, {
            name?: string;
            output?: string;
            path?: string;
            options?: {
                external?: boolean;
                debug?: boolean;
                ipfsAbiGetter?: boolean;
                interfacesGetter?: boolean;
                parser?: "new" | "old";
                experimental?: {
                    inline?: boolean;
                };
            };
            mode?: "full" | "fullWithDecompilation" | "funcOnly" | "checkOnly";
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        $schema?: string;
        projects?: {
            name?: string;
            output?: string;
            path?: string;
            options?: {
                external?: boolean;
                debug?: boolean;
                ipfsAbiGetter?: boolean;
                interfacesGetter?: boolean;
                parser?: "new" | "old";
                experimental?: {
                    inline?: boolean;
                };
            };
            mode?: "full" | "fullWithDecompilation" | "funcOnly" | "checkOnly";
        }[];
    }, {
        $schema?: string;
        projects?: {
            name?: string;
            output?: string;
            path?: string;
            options?: {
                external?: boolean;
                debug?: boolean;
                ipfsAbiGetter?: boolean;
                interfacesGetter?: boolean;
                parser?: "new" | "old";
                experimental?: {
                    inline?: boolean;
                };
            };
            mode?: "full" | "fullWithDecompilation" | "funcOnly" | "checkOnly";
        }[];
    }>;
    /**
     * Compiler configuration schema
     *
     * Read more: https://docs.tact-lang.org/book/config
     */
    export type Config = z.infer<typeof configSchema>;
    /**
     * Per-project configuration options
     *
     * Read more: https://docs.tact-lang.org/book/config#projects
     */
    export type ConfigProject = z.infer<typeof projectSchema>;
    /**
     * Per-project configuration options
     *
     * Read more: https://docs.tact-lang.org/book/config#projects
     */
    export type Options = z.infer<typeof optionsSchema>;
    /**
     * Takes a stringified JSON [src] of a schema, converts to JSON and returns a parsed schema if it's valid
     *
     * @throws If the provided JSON string isn't a valid JSON
     * @throws If the provided JSON string isn't valid according to the config schema
     */
    export function parseConfig(src: string): {
        $schema?: string;
        projects?: {
            name?: string;
            output?: string;
            path?: string;
            options?: {
                external?: boolean;
                debug?: boolean;
                ipfsAbiGetter?: boolean;
                interfacesGetter?: boolean;
                parser?: "new" | "old";
                experimental?: {
                    inline?: boolean;
                };
            };
            mode?: "full" | "fullWithDecompilation" | "funcOnly" | "checkOnly";
        }[];
    };
    /**
     * Takes a config schema object and verifies that it's valid
     *
     * @throws If the provided object isn't valid according to the config schema
     */
    export function verifyConfig(config: Config): {
        $schema?: string;
        projects?: {
            name?: string;
            output?: string;
            path?: string;
            options?: {
                external?: boolean;
                debug?: boolean;
                ipfsAbiGetter?: boolean;
                interfacesGetter?: boolean;
                parser?: "new" | "old";
                experimental?: {
                    inline?: boolean;
                };
            };
            mode?: "full" | "fullWithDecompilation" | "funcOnly" | "checkOnly";
        }[];
    };
}
declare module "context/logger" {
    export enum LogLevel {
        /** Logging is turned off */
        NONE = 0,
        /** Logs only error messages */
        ERROR = 1,
        /** Logs warning and error messages */
        WARN = 2,
        /** Logs informational, warning, and error messages */
        INFO = 3,
        /** Logs debugging, informational, warning, and error messages */
        DEBUG = 4
    }
    type messageType = string | Error;
    /**
     * Interface defining the logging methods used by the `Logger` class, enabling
     * custom logger implementations.
     */
    export interface ILogger {
        debug: (message: messageType) => void;
        info: (message: messageType) => void;
        warn: (message: messageType) => void;
        error: (message: messageType) => void;
    }
    export class Logger {
        private level;
        private logMethods;
        constructor(level?: LogLevel);
        protected log(level: LogLevel, message: messageType): void;
        debug(message: messageType): void;
        info(message: messageType): void;
        warn(message: messageType): void;
        error(message: messageType): void;
        setLevel(level: LogLevel): void;
    }
}
declare module "utils/text" {
    export function isBlank(src: string): boolean;
    export function trimIndent(src: string): string;
    /**
     * Escapes unicode control codes in the [src] string
     * See: https://en.m.wikipedia.org/wiki/List_of_Unicode_characters#Control_codes
     */
    export function escapeUnicodeControlCodes(src: string): string;
}
declare module "utils/Writer" {
    export class Writer {
        private indent;
        private lines;
        inIndent: (handler: () => void) => void;
        append(src?: string): void;
        write(src: string): void;
        end(): string;
    }
}
declare module "grammar/src-info" {
    export type ItemOrigin = "stdlib" | "user";
    type LineAndColumnInfo = {
        lineNum: number;
        colNum: number;
        toString(...ranges: number[][]): string;
    };
    type Interval = {
        contents: string;
        getLineAndColumnMessage(): string;
        getLineAndColumn(): LineAndColumnInfo;
        startIdx: number;
        endIdx: number;
    };
    const srcInfoSymbol: unique symbol;
    export const isSrcInfo: (t: unknown) => t is SrcInfo;
    export interface SrcInfo {
        file: string | null;
        contents: string;
        interval: Interval;
        origin: ItemOrigin;
        /**
         * Tag so that custom snapshot serializer can distinguish it
         */
        [srcInfoSymbol]: true;
        /**
         * toJSON method is provided, so that it's not serialized into snapshots
         */
        toJSON: () => object;
    }
    export const srcInfoEqual: (left: SrcInfo, right: SrcInfo) => boolean;
    export const getSrcInfo: (sourceString: string, startIdx: number, endIdx: number, file: string | null, origin: ItemOrigin) => SrcInfo;
    export const dummySrcInfo: SrcInfo;
}
declare module "ast/ast" {
    import { Address, Cell, Slice } from "@ton/core";
    import { SrcInfo } from "grammar/src-info";
    export type AstModule = {
        kind: "module";
        imports: AstImport[];
        items: AstModuleItem[];
        id: number;
    };
    export type AstImport = {
        kind: "import";
        path: AstString;
        id: number;
        loc: SrcInfo;
    };
    export type AstModuleItem = AstPrimitiveTypeDecl | AstFunctionDef | AstAsmFunctionDef | AstNativeFunctionDecl | AstConstantDef | AstStructDecl | AstMessageDecl | AstContract | AstTrait;
    export type AstTypeDecl = AstPrimitiveTypeDecl | AstStructDecl | AstMessageDecl | AstContract | AstTrait;
    export type AstPrimitiveTypeDecl = {
        kind: "primitive_type_decl";
        name: AstId;
        id: number;
        loc: SrcInfo;
    };
    export type AstFunctionDef = {
        kind: "function_def";
        attributes: AstFunctionAttribute[];
        name: AstId;
        return: AstType | null;
        params: AstTypedParameter[];
        statements: AstStatement[];
        id: number;
        loc: SrcInfo;
    };
    export type AstAsmFunctionDef = {
        kind: "asm_function_def";
        shuffle: AstAsmShuffle;
        attributes: AstFunctionAttribute[];
        name: AstId;
        return: AstType | null;
        params: AstTypedParameter[];
        instructions: AstAsmInstruction[];
        id: number;
        loc: SrcInfo;
    };
    export type AstAsmInstruction = string;
    export type AstAsmShuffle = {
        args: AstId[];
        ret: AstNumber[];
    };
    export type AstFunctionDecl = {
        kind: "function_decl";
        attributes: AstFunctionAttribute[];
        name: AstId;
        return: AstType | null;
        params: AstTypedParameter[];
        id: number;
        loc: SrcInfo;
    };
    export type AstNativeFunctionDecl = {
        kind: "native_function_decl";
        attributes: AstFunctionAttribute[];
        name: AstId;
        nativeName: AstFuncId;
        params: AstTypedParameter[];
        return: AstType | null;
        id: number;
        loc: SrcInfo;
    };
    export type AstConstantDef = {
        kind: "constant_def";
        attributes: AstConstantAttribute[];
        name: AstId;
        type: AstType;
        initializer: AstExpression;
        id: number;
        loc: SrcInfo;
    };
    export type AstConstantDecl = {
        kind: "constant_decl";
        attributes: AstConstantAttribute[];
        name: AstId;
        type: AstType;
        id: number;
        loc: SrcInfo;
    };
    export type AstStructDecl = {
        kind: "struct_decl";
        name: AstId;
        fields: AstFieldDecl[];
        id: number;
        loc: SrcInfo;
    };
    export type AstMessageDecl = {
        kind: "message_decl";
        name: AstId;
        opcode: AstExpression | null;
        fields: AstFieldDecl[];
        id: number;
        loc: SrcInfo;
    };
    export type AstContract = {
        kind: "contract";
        name: AstId;
        traits: AstId[];
        attributes: AstContractAttribute[];
        declarations: AstContractDeclaration[];
        id: number;
        loc: SrcInfo;
    };
    export type AstTrait = {
        kind: "trait";
        name: AstId;
        traits: AstId[];
        attributes: AstContractAttribute[];
        declarations: AstTraitDeclaration[];
        id: number;
        loc: SrcInfo;
    };
    export type AstContractDeclaration = AstFieldDecl | AstFunctionDef | AstAsmFunctionDef | AstContractInit | AstReceiver | AstConstantDef;
    export type AstTraitDeclaration = AstFieldDecl | AstFunctionDef | AstAsmFunctionDef | AstFunctionDecl | AstReceiver | AstConstantDef | AstConstantDecl;
    export type AstFieldDecl = {
        kind: "field_decl";
        name: AstId;
        type: AstType;
        initializer: AstExpression | null;
        as: AstId | null;
        id: number;
        loc: SrcInfo;
    };
    export type AstReceiver = {
        kind: "receiver";
        selector: AstReceiverKind;
        statements: AstStatement[];
        id: number;
        loc: SrcInfo;
    };
    export type AstContractInit = {
        kind: "contract_init";
        params: AstTypedParameter[];
        statements: AstStatement[];
        id: number;
        loc: SrcInfo;
    };
    export type AstStatement = AstStatementLet | AstStatementReturn | AstStatementExpression | AstStatementAssign | AstStatementAugmentedAssign | AstCondition | AstStatementWhile | AstStatementUntil | AstStatementRepeat | AstStatementTry | AstStatementTryCatch | AstStatementForEach | AstStatementDestruct | AstStatementBlock;
    export type AstStatementLet = {
        kind: "statement_let";
        name: AstId;
        type: AstType | null;
        expression: AstExpression;
        id: number;
        loc: SrcInfo;
    };
    export type AstStatementReturn = {
        kind: "statement_return";
        expression: AstExpression | null;
        id: number;
        loc: SrcInfo;
    };
    export type AstStatementExpression = {
        kind: "statement_expression";
        expression: AstExpression;
        id: number;
        loc: SrcInfo;
    };
    export type AstStatementAssign = {
        kind: "statement_assign";
        path: AstExpression;
        expression: AstExpression;
        id: number;
        loc: SrcInfo;
    };
    export type AstAugmentedAssignOperation = "+" | "-" | "*" | "/" | "&&" | "||" | "%" | "|" | "<<" | ">>" | "&" | "^";
    export type AstStatementAugmentedAssign = {
        kind: "statement_augmentedassign";
        op: AstAugmentedAssignOperation;
        path: AstExpression;
        expression: AstExpression;
        id: number;
        loc: SrcInfo;
    };
    export type AstCondition = {
        kind: "statement_condition";
        condition: AstExpression;
        trueStatements: AstStatement[];
        falseStatements: AstStatement[] | null;
        elseif: AstCondition | null;
        id: number;
        loc: SrcInfo;
    };
    export type AstStatementWhile = {
        kind: "statement_while";
        condition: AstExpression;
        statements: AstStatement[];
        id: number;
        loc: SrcInfo;
    };
    export type AstStatementUntil = {
        kind: "statement_until";
        condition: AstExpression;
        statements: AstStatement[];
        id: number;
        loc: SrcInfo;
    };
    export type AstStatementRepeat = {
        kind: "statement_repeat";
        iterations: AstExpression;
        statements: AstStatement[];
        id: number;
        loc: SrcInfo;
    };
    export type AstStatementTry = {
        kind: "statement_try";
        statements: AstStatement[];
        id: number;
        loc: SrcInfo;
    };
    export type AstStatementTryCatch = {
        kind: "statement_try_catch";
        statements: AstStatement[];
        catchName: AstId;
        catchStatements: AstStatement[];
        id: number;
        loc: SrcInfo;
    };
    export type AstStatementForEach = {
        kind: "statement_foreach";
        keyName: AstId;
        valueName: AstId;
        map: AstExpression;
        statements: AstStatement[];
        id: number;
        loc: SrcInfo;
    };
    export type AstStatementDestruct = {
        kind: "statement_destruct";
        type: AstTypeId;
        /** field name -> [field id, local id] */
        identifiers: Map<string, [AstId, AstId]>;
        ignoreUnspecifiedFields: boolean;
        expression: AstExpression;
        id: number;
        loc: SrcInfo;
    };
    export type AstStatementBlock = {
        kind: "statement_block";
        statements: AstStatement[];
        id: number;
        loc: SrcInfo;
    };
    export type AstType = AstTypeId | AstOptionalType | AstMapType | AstBouncedMessageType;
    export type AstTypeId = {
        kind: "type_id";
        text: string;
        id: number;
        loc: SrcInfo;
    };
    export type AstOptionalType = {
        kind: "optional_type";
        typeArg: AstType;
        id: number;
        loc: SrcInfo;
    };
    export type AstMapType = {
        kind: "map_type";
        keyType: AstTypeId;
        keyStorageType: AstId | null;
        valueType: AstTypeId;
        valueStorageType: AstId | null;
        id: number;
        loc: SrcInfo;
    };
    export type AstBouncedMessageType = {
        kind: "bounced_message_type";
        messageType: AstTypeId;
        id: number;
        loc: SrcInfo;
    };
    export type AstExpression = AstOpBinary | AstOpUnary | AstConditional | AstMethodCall | AstFieldAccess | AstStaticCall | AstStructInstance | AstId | AstInitOf | AstString | AstLiteral;
    export type AstLiteral = AstNumber | AstBoolean | AstNull | AstSimplifiedString | AstAddress | AstCell | AstSlice | AstCommentValue | AstStructValue;
    export type AstBinaryOperation = "+" | "-" | "*" | "/" | "!=" | ">" | "<" | ">=" | "<=" | "==" | "&&" | "||" | "%" | "<<" | ">>" | "&" | "|" | "^";
    export type AstOpBinary = {
        kind: "op_binary";
        op: AstBinaryOperation;
        left: AstExpression;
        right: AstExpression;
        id: number;
        loc: SrcInfo;
    };
    export type AstUnaryOperation = "+" | "-" | "!" | "!!" | "~";
    export type AstOpUnary = {
        kind: "op_unary";
        op: AstUnaryOperation;
        operand: AstExpression;
        id: number;
        loc: SrcInfo;
    };
    export type AstFieldAccess = {
        kind: "field_access";
        aggregate: AstExpression;
        field: AstId;
        id: number;
        loc: SrcInfo;
    };
    export type AstMethodCall = {
        kind: "method_call";
        self: AstExpression;
        method: AstId;
        args: AstExpression[];
        id: number;
        loc: SrcInfo;
    };
    export type AstStaticCall = {
        kind: "static_call";
        function: AstId;
        args: AstExpression[];
        id: number;
        loc: SrcInfo;
    };
    export type AstStructInstance = {
        kind: "struct_instance";
        type: AstId;
        args: AstStructFieldInitializer[];
        id: number;
        loc: SrcInfo;
    };
    export type AstStructFieldInitializer = {
        kind: "struct_field_initializer";
        field: AstId;
        initializer: AstExpression;
        id: number;
        loc: SrcInfo;
    };
    export type AstInitOf = {
        kind: "init_of";
        contract: AstId;
        args: AstExpression[];
        id: number;
        loc: SrcInfo;
    };
    export type AstConditional = {
        kind: "conditional";
        condition: AstExpression;
        thenBranch: AstExpression;
        elseBranch: AstExpression;
        id: number;
        loc: SrcInfo;
    };
    export type AstId = {
        kind: "id";
        text: string;
        id: number;
        loc: SrcInfo;
    };
    export type AstFuncId = {
        kind: "func_id";
        text: string;
        id: number;
        loc: SrcInfo;
    };
    export function idText(ident: AstId | AstFuncId | AstTypeId): string;
    export function isInt(ident: AstTypeId): boolean;
    export function isBool(ident: AstTypeId): boolean;
    export function isCell(ident: AstTypeId): boolean;
    export function isSlice(ident: AstTypeId): boolean;
    export function isBuilder(ident: AstTypeId): boolean;
    export function isAddress(ident: AstTypeId): boolean;
    export function isString(ident: AstTypeId): boolean;
    export function isStringBuilder(ident: AstTypeId): boolean;
    export function isSelfId(ident: AstId): boolean;
    export function isWildcard(ident: AstId): boolean;
    export function isRequire(ident: AstId): boolean;
    export function eqNames(left: AstId | AstTypeId | string, right: AstId | AstTypeId | string): boolean;
    export function idOfText(text: string): AstId;
    export const selfId: AstId;
    export type AstDestructMapping = {
        kind: "destruct_mapping";
        field: AstId;
        name: AstId;
        id: number;
        loc: SrcInfo;
    };
    export type AstDestructEnd = {
        kind: "destruct_end";
        ignoreUnspecifiedFields: boolean;
        id: number;
        loc: SrcInfo;
    };
    export type AstNumber = {
        kind: "number";
        base: AstNumberBase;
        value: bigint;
        id: number;
        loc: SrcInfo;
    };
    export type AstNumberBase = 2 | 8 | 10 | 16;
    export function astNumToString(n: AstNumber): string;
    export type AstBoolean = {
        kind: "boolean";
        value: boolean;
        id: number;
        loc: SrcInfo;
    };
    export type AstSimplifiedString = {
        kind: "simplified_string";
        value: string;
        id: number;
        loc: SrcInfo;
    };
    /**
     * @deprecated AstSimplifiedString
     */
    export type AstString = {
        kind: "string";
        value: string;
        id: number;
        loc: SrcInfo;
    };
    export type AstNull = {
        kind: "null";
        id: number;
        loc: SrcInfo;
    };
    export type AstAddress = {
        kind: "address";
        value: Address;
        id: number;
        loc: SrcInfo;
    };
    export type AstCell = {
        kind: "cell";
        value: Cell;
        id: number;
        loc: SrcInfo;
    };
    export type AstSlice = {
        kind: "slice";
        value: Slice;
        id: number;
        loc: SrcInfo;
    };
    export type AstCommentValue = {
        kind: "comment_value";
        value: string;
        id: number;
        loc: SrcInfo;
    };
    export type AstStructValue = {
        kind: "struct_value";
        type: AstId;
        args: AstStructFieldValue[];
        id: number;
        loc: SrcInfo;
    };
    export type AstStructFieldValue = {
        kind: "struct_field_value";
        field: AstId;
        initializer: AstLiteral;
        id: number;
        loc: SrcInfo;
    };
    export type AstConstantAttributeName = "virtual" | "override" | "abstract";
    export type AstConstantAttribute = {
        type: AstConstantAttributeName;
        loc: SrcInfo;
    };
    export type AstContractAttribute = {
        type: "interface";
        name: AstString;
        loc: SrcInfo;
    };
    export type AstFunctionAttributeGet = {
        kind: "function_attribute";
        type: "get";
        methodId: AstExpression | null;
        loc: SrcInfo;
    };
    export type AstFunctionAttributeName = "mutates" | "extends" | "virtual" | "abstract" | "override" | "inline";
    export type AstFunctionAttributeRest = {
        kind: "function_attribute";
        type: AstFunctionAttributeName;
        loc: SrcInfo;
    };
    export type AstFunctionAttribute = AstFunctionAttributeGet | AstFunctionAttributeRest;
    export type AstTypedParameter = {
        kind: "typed_parameter";
        name: AstId;
        type: AstType;
        id: number;
        loc: SrcInfo;
    };
    export type AstReceiverKind = {
        kind: "internal-simple";
        param: AstTypedParameter;
    } | {
        kind: "internal-fallback";
    } | {
        kind: "internal-comment";
        comment: AstString;
    } | {
        kind: "bounce";
        param: AstTypedParameter;
    } | {
        kind: "external-simple";
        param: AstTypedParameter;
    } | {
        kind: "external-fallback";
    } | {
        kind: "external-comment";
        comment: AstString;
    };
    export type AstNode = AstFuncId | AstDestructMapping | AstDestructEnd | AstExpression | AstStatement | AstTypeDecl | AstFieldDecl | AstTypedParameter | AstFunctionDef | AstFunctionAttribute | AstAsmFunctionDef | AstFunctionDecl | AstModule | AstNativeFunctionDecl | AstStructFieldInitializer | AstStructFieldValue | AstType | AstContractInit | AstReceiver | AstImport | AstConstantDef | AstConstantDecl;
    /**
     * Check if input expression is a 'path expression',
     * i.e. an identifier or a sequence of field accesses starting from an identifier.
     * @param path A path expression to check.
     * @returns An array of identifiers or null if the input expression is not a path expression.
     */
    export function tryExtractPath(path: AstExpression): AstId[] | null;
    type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
    export const getAstFactory: () => {
        createNode: (src: DistributiveOmit<AstNode, "id">) => AstNode;
        cloneNode: <T extends AstNode>(src: T) => T;
    };
    export type FactoryAst = ReturnType<typeof getAstFactory>;
    export function eqExpressions(ast1: AstExpression, ast2: AstExpression): boolean;
    export function isLiteral(ast: AstExpression): ast is AstLiteral;
    export function checkLiteral<T>(ast: AstExpression, t: (node: AstLiteral) => T, f: (node: Exclude<AstExpression, AstLiteral>) => T): T;
}
declare module "grammar/next/grammar" {
    import * as $ from "@tonstudio/parser-runtime";
    export namespace $ast {
        type Module = $.Located<{
            readonly $: "Module";
            readonly imports: readonly Import[];
            readonly items: readonly moduleItem[];
        }>;
        type Import = $.Located<{
            readonly $: "Import";
            readonly path: StringLiteral;
        }>;
        type PrimitiveTypeDecl = $.Located<{
            readonly $: "PrimitiveTypeDecl";
            readonly name: TypeId;
        }>;
        type $Function = $.Located<{
            readonly $: "Function";
            readonly attributes: readonly FunctionAttribute[];
            readonly name: Id;
            readonly parameters: parameterList<Parameter>;
            readonly returnType: ascription | undefined;
            readonly body: FunctionDefinition | FunctionDeclaration;
        }>;
        type AsmFunction = $.Located<{
            readonly $: "AsmFunction";
            readonly shuffle: shuffle | undefined;
            readonly attributes: readonly FunctionAttribute[];
            readonly name: Id;
            readonly parameters: parameterList<Parameter>;
            readonly returnType: ascription | undefined;
            readonly instructions: assembly;
        }>;
        type NativeFunctionDecl = $.Located<{
            readonly $: "NativeFunctionDecl";
            readonly nativeName: FuncId;
            readonly attributes: readonly FunctionAttribute[];
            readonly name: Id;
            readonly parameters: parameterList<Parameter>;
            readonly returnType: ascription | undefined;
        }>;
        type Constant = $.Located<{
            readonly $: "Constant";
            readonly attributes: readonly ConstantAttribute[];
            readonly name: Id;
            readonly type: ascription;
            readonly body: ConstantDefinition | ConstantDeclaration;
        }>;
        type StructDecl = $.Located<{
            readonly $: "StructDecl";
            readonly name: TypeId;
            readonly fields: structFields;
        }>;
        type MessageDecl = $.Located<{
            readonly $: "MessageDecl";
            readonly opcode: expression | undefined;
            readonly name: TypeId;
            readonly fields: structFields;
        }>;
        type Contract = $.Located<{
            readonly $: "Contract";
            readonly attributes: readonly ContractAttribute[];
            readonly name: Id;
            readonly traits: inheritedTraits | undefined;
            readonly declarations: readonly contractItemDecl[];
        }>;
        type Trait = $.Located<{
            readonly $: "Trait";
            readonly attributes: readonly ContractAttribute[];
            readonly name: Id;
            readonly traits: inheritedTraits | undefined;
            readonly declarations: readonly traitItemDecl[];
        }>;
        type moduleItem = PrimitiveTypeDecl | $Function | AsmFunction | NativeFunctionDecl | Constant | StructDecl | MessageDecl | Contract | Trait;
        type ContractInit = $.Located<{
            readonly $: "ContractInit";
            readonly parameters: parameterList<Parameter>;
            readonly body: statements;
        }>;
        type Receiver = $.Located<{
            readonly $: "Receiver";
            readonly type: receiverType;
            readonly param: receiverParam;
            readonly body: statements;
        }>;
        type FieldDecl = $.Located<{
            readonly $: "FieldDecl";
            readonly name: Id;
            readonly type: ascription;
            readonly as: asType | undefined;
            readonly expression: expression | undefined;
        }>;
        type semicolon = ";" | "}";
        type storageVar = FieldDecl;
        type contractItemDecl = ContractInit | Receiver | $Function | Constant | storageVar;
        type traitItemDecl = Receiver | $Function | Constant | storageVar;
        type FunctionDefinition = $.Located<{
            readonly $: "FunctionDefinition";
            readonly body: statements;
        }>;
        type FunctionDeclaration = $.Located<{
            readonly $: "FunctionDeclaration";
        }>;
        type Id = $.Located<{
            readonly $: "Id";
            readonly name: string;
        }>;
        type IntegerLiteralDec = $.Located<{
            readonly $: "IntegerLiteralDec";
            readonly digits: underscored<digit>;
        }>;
        type shuffle = {
            readonly ids: readonly Id[];
            readonly to: readonly IntegerLiteralDec[] | undefined;
        };
        type ConstantAttribute = $.Located<{
            readonly $: "ConstantAttribute";
            readonly name: keyword<"virtual"> | keyword<"override"> | keyword<"abstract">;
        }>;
        type ConstantDefinition = $.Located<{
            readonly $: "ConstantDefinition";
            readonly expression: expression;
        }>;
        type ConstantDeclaration = $.Located<{
            readonly $: "ConstantDeclaration";
        }>;
        type inter<A, B> = {
            readonly head: A;
            readonly tail: readonly {
                readonly op: B;
                readonly right: A;
            }[];
        };
        type structFields = inter<FieldDecl, ";"> | undefined;
        type keyword<T> = T;
        type commaList<T> = inter<T, ",">;
        type inheritedTraits = commaList<Id>;
        type ContractAttribute = $.Located<{
            readonly $: "ContractAttribute";
            readonly name: StringLiteral;
        }>;
        type FunctionAttribute = $.Located<{
            readonly $: "FunctionAttribute";
            readonly name: GetAttribute | keyword<"mutates"> | keyword<"extends"> | keyword<"virtual"> | keyword<"override"> | keyword<"inline"> | keyword<"abstract">;
        }>;
        type GetAttribute = $.Located<{
            readonly $: "GetAttribute";
            readonly methodId: expression | undefined;
        }>;
        type receiverType = "bounced" | keyword<"receive"> | keyword<"external">;
        type Parameter = $.Located<{
            readonly $: "Parameter";
            readonly name: Id;
            readonly type: ascription;
        }>;
        type StringLiteral = $.Located<{
            readonly $: "StringLiteral";
            readonly value: string;
        }>;
        type receiverParam = Parameter | StringLiteral | undefined;
        type assembly = string;
        type multiLineComment = string;
        type singleLineComment = string;
        type comment = multiLineComment | singleLineComment;
        type assemblyItem = {} | comment | {} | readonly {}[];
        type assemblySequence = readonly assemblyItem[];
        type TypeOptional = $.Located<{
            readonly $: "TypeOptional";
            readonly child: TypeId;
        }>;
        type TypeRegular = $.Located<{
            readonly $: "TypeRegular";
            readonly child: TypeId;
        }>;
        type TypeMap = $.Located<{
            readonly $: "TypeMap";
            readonly key: TypeId;
            readonly keyAs: asType | undefined;
            readonly value: TypeId;
            readonly valueAs: asType | undefined;
        }>;
        type TypeBounced = $.Located<{
            readonly $: "TypeBounced";
            readonly child: TypeId;
        }>;
        type $type = TypeOptional | TypeRegular | TypeMap | TypeBounced;
        type ascription = $type;
        type TypeId = $.Located<{
            readonly $: "TypeId";
            readonly name: string;
        }>;
        type asType = Id;
        type StatementLet = $.Located<{
            readonly $: "StatementLet";
            readonly name: Id;
            readonly type: ascription | undefined;
            readonly init: expression;
        }>;
        type StatementDestruct = $.Located<{
            readonly $: "StatementDestruct";
            readonly type: TypeId;
            readonly fields: inter<destructItem, ",">;
            readonly rest: optionalRest;
            readonly init: expression;
        }>;
        type StatementBlock = $.Located<{
            readonly $: "StatementBlock";
            readonly body: statements;
        }>;
        type StatementReturn = $.Located<{
            readonly $: "StatementReturn";
            readonly expression: expression | undefined;
        }>;
        type StatementCondition = $.Located<{
            readonly $: "StatementCondition";
            readonly condition: expression;
            readonly trueBranch: statements;
            readonly falseBranch: FalseBranch | StatementCondition | undefined;
        }>;
        type StatementWhile = $.Located<{
            readonly $: "StatementWhile";
            readonly condition: parens;
            readonly body: statements;
        }>;
        type StatementRepeat = $.Located<{
            readonly $: "StatementRepeat";
            readonly condition: parens;
            readonly body: statements;
        }>;
        type StatementUntil = $.Located<{
            readonly $: "StatementUntil";
            readonly body: statements;
            readonly condition: parens;
        }>;
        type StatementTry = $.Located<{
            readonly $: "StatementTry";
            readonly body: statements;
            readonly handler: {
                readonly name: Id;
                readonly body: statements;
            } | undefined;
        }>;
        type StatementForEach = $.Located<{
            readonly $: "StatementForEach";
            readonly key: Id;
            readonly value: Id;
            readonly expression: expression;
            readonly body: statements;
        }>;
        type StatementExpression = $.Located<{
            readonly $: "StatementExpression";
            readonly expression: expression;
        }>;
        type StatementAssign = $.Located<{
            readonly $: "StatementAssign";
            readonly left: expression;
            readonly operator: augmentedOp | undefined;
            readonly right: expression;
        }>;
        type statement = StatementLet | StatementDestruct | StatementBlock | StatementReturn | StatementCondition | StatementWhile | StatementRepeat | StatementUntil | StatementTry | StatementForEach | StatementExpression | StatementAssign;
        type statements = readonly statement[];
        type augmentedOp = "||" | "&&" | ">>" | "<<" | "-" | "+" | "*" | "/" | "%" | "|" | "&" | "^";
        type FalseBranch = $.Located<{
            readonly $: "FalseBranch";
            readonly body: statements;
        }>;
        type RegularField = $.Located<{
            readonly $: "RegularField";
            readonly fieldName: Id;
            readonly varName: Id;
        }>;
        type PunnedField = $.Located<{
            readonly $: "PunnedField";
            readonly name: Id;
        }>;
        type destructItem = RegularField | PunnedField;
        type RestArgument = $.Located<{
            readonly $: "RestArgument";
        }>;
        type NoRestArgument = $.Located<{
            readonly $: "NoRestArgument";
        }>;
        type optionalRest = RestArgument | NoRestArgument;
        type Conditional = $.Located<{
            readonly $: "Conditional";
            readonly head: or;
            readonly tail: {
                readonly thenBranch: or;
                readonly elseBranch: Conditional;
            } | undefined;
        }>;
        type expression = Conditional;
        type Binary<T, U> = $.Located<{
            readonly $: "Binary";
            readonly exprs: inter<T, Operator<U>>;
        }>;
        type Unary = $.Located<{
            readonly $: "Unary";
            readonly prefixes: readonly Operator<"-" | "+" | "!" | "~">[];
            readonly expression: Suffix;
        }>;
        type mul = Binary<Unary, "*" | "/" | "%">;
        type add = Binary<mul, "+" | "-">;
        type bitwiseShift = Binary<add, "<<" | ">>">;
        type compare = Binary<bitwiseShift, "<=" | "<" | ">=" | ">">;
        type equality = Binary<compare, "!=" | "==">;
        type bitwiseAnd = Binary<equality, "&">;
        type bitwiseXor = Binary<bitwiseAnd, "^">;
        type bitwiseOr = Binary<bitwiseXor, "|">;
        type and = Binary<bitwiseOr, "&&">;
        type or = Binary<and, "||">;
        type Suffix = $.Located<{
            readonly $: "Suffix";
            readonly expression: primary;
            readonly suffixes: readonly suffix[];
        }>;
        type Operator<U> = $.Located<{
            readonly $: "Operator";
            readonly name: U;
        }>;
        type SuffixUnboxNotNull = $.Located<{
            readonly $: "SuffixUnboxNotNull";
        }>;
        type SuffixCall = $.Located<{
            readonly $: "SuffixCall";
            readonly params: parameterList<expression>;
        }>;
        type SuffixFieldAccess = $.Located<{
            readonly $: "SuffixFieldAccess";
            readonly name: Id;
        }>;
        type suffix = SuffixUnboxNotNull | SuffixCall | SuffixFieldAccess;
        type Parens = $.Located<{
            readonly $: "Parens";
            readonly child: parens;
        }>;
        type StructInstance = $.Located<{
            readonly $: "StructInstance";
            readonly type: TypeId;
            readonly fields: commaList<StructFieldInitializer> | undefined;
        }>;
        type IntegerLiteral = $.Located<{
            readonly $: "IntegerLiteral";
            readonly value: IntegerLiteralHex | IntegerLiteralBin | IntegerLiteralOct | IntegerLiteralDec;
        }>;
        type BoolLiteral = $.Located<{
            readonly $: "BoolLiteral";
            readonly value: "true" | "false";
        }>;
        type InitOf = $.Located<{
            readonly $: "InitOf";
            readonly name: Id;
            readonly params: parameterList<expression>;
        }>;
        type Null = $.Located<{
            readonly $: "Null";
        }>;
        type primary = Parens | StructInstance | IntegerLiteral | BoolLiteral | InitOf | Null | StringLiteral | Id;
        type parens = expression;
        type StructFieldInitializer = $.Located<{
            readonly $: "StructFieldInitializer";
            readonly name: Id;
            readonly init: expression | undefined;
        }>;
        type parameterList<T> = commaList<T> | undefined;
        type IntegerLiteralHex = $.Located<{
            readonly $: "IntegerLiteralHex";
            readonly digits: underscored<hexDigit>;
        }>;
        type IntegerLiteralBin = $.Located<{
            readonly $: "IntegerLiteralBin";
            readonly digits: underscored<"0" | "1">;
        }>;
        type IntegerLiteralOct = $.Located<{
            readonly $: "IntegerLiteralOct";
            readonly digits: underscored<string>;
        }>;
        type underscored<T> = string;
        type digit = string;
        type idPart = string | string | string | "_";
        type FuncId = $.Located<{
            readonly $: "FuncId";
            readonly accessor: "." | "~" | undefined;
            readonly id: string;
        }>;
        type hexDigit = string | string | string;
        type escapeChar = "\\" | "\"" | "n" | "r" | "t" | "v" | "b" | "f" | string | string | string;
        type reservedWord = keyword<"extend" | "public" | "fun" | "let" | "return" | "receive" | "native" | "primitive" | "null" | "if" | "else" | "while" | "repeat" | "do" | "until" | "try" | "catch" | "foreach" | "as" | "map" | "mutates" | "extends" | "external" | "import" | "with" | "trait" | "initOf" | "override" | "abstract" | "virtual" | "inline" | "const">;
        type space = " " | "\t" | "\r" | "\n" | comment;
        type JustImports = $.Located<{
            readonly $: "JustImports";
            readonly imports: readonly Import[];
        }>;
    }
    export const Module: $.Parser<$ast.Module>;
    export const Import: $.Parser<$ast.Import>;
    export const PrimitiveTypeDecl: $.Parser<$ast.PrimitiveTypeDecl>;
    export const $Function: $.Parser<$ast.$Function>;
    export const AsmFunction: $.Parser<$ast.AsmFunction>;
    export const NativeFunctionDecl: $.Parser<$ast.NativeFunctionDecl>;
    export const Constant: $.Parser<$ast.Constant>;
    export const StructDecl: $.Parser<$ast.StructDecl>;
    export const MessageDecl: $.Parser<$ast.MessageDecl>;
    export const Contract: $.Parser<$ast.Contract>;
    export const Trait: $.Parser<$ast.Trait>;
    export const moduleItem: $.Parser<$ast.moduleItem>;
    export const ContractInit: $.Parser<$ast.ContractInit>;
    export const Receiver: $.Parser<$ast.Receiver>;
    export const FieldDecl: $.Parser<$ast.FieldDecl>;
    export const semicolon: $.Parser<$ast.semicolon>;
    export const storageVar: $.Parser<$ast.storageVar>;
    export const contractItemDecl: $.Parser<$ast.contractItemDecl>;
    export const traitItemDecl: $.Parser<$ast.traitItemDecl>;
    export const FunctionDefinition: $.Parser<$ast.FunctionDefinition>;
    export const FunctionDeclaration: $.Parser<$ast.FunctionDeclaration>;
    export const Id: $.Parser<$ast.Id>;
    export const IntegerLiteralDec: $.Parser<$ast.IntegerLiteralDec>;
    export const shuffle: $.Parser<$ast.shuffle>;
    export const ConstantAttribute: $.Parser<$ast.ConstantAttribute>;
    export const ConstantDefinition: $.Parser<$ast.ConstantDefinition>;
    export const ConstantDeclaration: $.Parser<$ast.ConstantDeclaration>;
    export const inter: <A, B>(A: $.Parser<A>, B: $.Parser<B>) => $.Parser<$ast.inter<A, B>>;
    export const structFields: $.Parser<$ast.structFields>;
    export const keyword: <T>(T: $.Parser<T>) => $.Parser<$ast.keyword<T>>;
    export const commaList: <T>(T: $.Parser<T>) => $.Parser<$ast.commaList<T>>;
    export const inheritedTraits: $.Parser<$ast.inheritedTraits>;
    export const ContractAttribute: $.Parser<$ast.ContractAttribute>;
    export const FunctionAttribute: $.Parser<$ast.FunctionAttribute>;
    export const GetAttribute: $.Parser<$ast.GetAttribute>;
    export const receiverType: $.Parser<$ast.receiverType>;
    export const Parameter: $.Parser<$ast.Parameter>;
    export const StringLiteral: $.Parser<$ast.StringLiteral>;
    export const receiverParam: $.Parser<$ast.receiverParam>;
    export const assembly: $.Parser<$ast.assembly>;
    export const multiLineComment: $.Parser<$ast.multiLineComment>;
    export const singleLineComment: $.Parser<$ast.singleLineComment>;
    export const comment: $.Parser<$ast.comment>;
    export const assemblyItem: $.Parser<$ast.assemblyItem>;
    export const assemblySequence: $.Parser<$ast.assemblySequence>;
    export const TypeOptional: $.Parser<$ast.TypeOptional>;
    export const TypeRegular: $.Parser<$ast.TypeRegular>;
    export const TypeMap: $.Parser<$ast.TypeMap>;
    export const TypeBounced: $.Parser<$ast.TypeBounced>;
    export const $type: $.Parser<$ast.$type>;
    export const ascription: $.Parser<$ast.ascription>;
    export const TypeId: $.Parser<$ast.TypeId>;
    export const asType: $.Parser<$ast.asType>;
    export const StatementLet: $.Parser<$ast.StatementLet>;
    export const StatementDestruct: $.Parser<$ast.StatementDestruct>;
    export const StatementBlock: $.Parser<$ast.StatementBlock>;
    export const StatementReturn: $.Parser<$ast.StatementReturn>;
    export const StatementCondition: $.Parser<$ast.StatementCondition>;
    export const StatementWhile: $.Parser<$ast.StatementWhile>;
    export const StatementRepeat: $.Parser<$ast.StatementRepeat>;
    export const StatementUntil: $.Parser<$ast.StatementUntil>;
    export const StatementTry: $.Parser<$ast.StatementTry>;
    export const StatementForEach: $.Parser<$ast.StatementForEach>;
    export const StatementExpression: $.Parser<$ast.StatementExpression>;
    export const StatementAssign: $.Parser<$ast.StatementAssign>;
    export const statement: $.Parser<$ast.statement>;
    export const statements: $.Parser<$ast.statements>;
    export const augmentedOp: $.Parser<$ast.augmentedOp>;
    export const FalseBranch: $.Parser<$ast.FalseBranch>;
    export const RegularField: $.Parser<$ast.RegularField>;
    export const PunnedField: $.Parser<$ast.PunnedField>;
    export const destructItem: $.Parser<$ast.destructItem>;
    export const RestArgument: $.Parser<$ast.RestArgument>;
    export const NoRestArgument: $.Parser<$ast.NoRestArgument>;
    export const optionalRest: $.Parser<$ast.optionalRest>;
    export const Conditional: $.Parser<$ast.Conditional>;
    export const expression: $.Parser<$ast.expression>;
    export const Binary: <T, U>(T: $.Parser<T>, U: $.Parser<U>) => $.Parser<$ast.Binary<T, U>>;
    export const Unary: $.Parser<$ast.Unary>;
    export const mul: $.Parser<$ast.mul>;
    export const add: $.Parser<$ast.add>;
    export const bitwiseShift: $.Parser<$ast.bitwiseShift>;
    export const compare: $.Parser<$ast.compare>;
    export const equality: $.Parser<$ast.equality>;
    export const bitwiseAnd: $.Parser<$ast.bitwiseAnd>;
    export const bitwiseXor: $.Parser<$ast.bitwiseXor>;
    export const bitwiseOr: $.Parser<$ast.bitwiseOr>;
    export const and: $.Parser<$ast.and>;
    export const or: $.Parser<$ast.or>;
    export const Suffix: $.Parser<$ast.Suffix>;
    export const Operator: <U>(U: $.Parser<U>) => $.Parser<$ast.Operator<U>>;
    export const SuffixUnboxNotNull: $.Parser<$ast.SuffixUnboxNotNull>;
    export const SuffixCall: $.Parser<$ast.SuffixCall>;
    export const SuffixFieldAccess: $.Parser<$ast.SuffixFieldAccess>;
    export const suffix: $.Parser<$ast.suffix>;
    export const Parens: $.Parser<$ast.Parens>;
    export const StructInstance: $.Parser<$ast.StructInstance>;
    export const IntegerLiteral: $.Parser<$ast.IntegerLiteral>;
    export const BoolLiteral: $.Parser<$ast.BoolLiteral>;
    export const InitOf: $.Parser<$ast.InitOf>;
    export const Null: $.Parser<$ast.Null>;
    export const primary: $.Parser<$ast.primary>;
    export const parens: $.Parser<$ast.parens>;
    export const StructFieldInitializer: $.Parser<$ast.StructFieldInitializer>;
    export const parameterList: <T>(T: $.Parser<T>) => $.Parser<$ast.parameterList<T>>;
    export const IntegerLiteralHex: $.Parser<$ast.IntegerLiteralHex>;
    export const IntegerLiteralBin: $.Parser<$ast.IntegerLiteralBin>;
    export const IntegerLiteralOct: $.Parser<$ast.IntegerLiteralOct>;
    export const underscored: <T>(T: $.Parser<T>) => $.Parser<$ast.underscored<T>>;
    export const digit: $.Parser<$ast.digit>;
    export const idPart: $.Parser<$ast.idPart>;
    export const FuncId: $.Parser<$ast.FuncId>;
    export const hexDigit: $.Parser<$ast.hexDigit>;
    export const escapeChar: $.Parser<$ast.escapeChar>;
    export const reservedWord: $.Parser<$ast.reservedWord>;
    export const space: $.Parser<$ast.space>;
    export const JustImports: $.Parser<$ast.JustImports>;
}
declare module "error/display" {
    /**
     * Describes DSL for displaying errors
     */
    import { SrcInfo } from "grammar/index";
    export interface ErrorDisplay<T> {
        at: (loc: SrcInfo, body: T) => T;
        text: (text: string) => T;
        sub: (text: TemplateStringsArray, ...subst: T[]) => T;
        link: (text: string, loc: SrcInfo) => T;
    }
}
declare module "grammar/parser-error" {
    import { ErrorDisplay } from "error/display";
    export const syntaxErrorSchema: <T, U>(display: ErrorDisplay<T>, handle: (t: T) => U) => {
        constant: {
            duplicate: (attr: string) => U;
            notAbstract: () => U;
            tooAbstract: () => U;
        };
        function: {
            duplicate: (attr: string) => U;
            notAbstract: () => U;
            tooAbstract: () => U;
        };
        topLevelConstantWithAttribute: () => U;
        literalTooLong: () => U;
        extraneousComma: () => U;
        duplicateField: (name: string) => U;
        restShouldBeLast: () => U;
        importWithBackslash: () => U;
        reservedVarPrefix: (prefix: string) => U;
        notCallable: () => U;
        noBouncedWithoutArg: () => U;
        noBouncedWithString: () => U;
        noConstantDecl: () => U;
        noFunctionDecl: () => U;
        expected: (expects: ReadonlySet<string>) => U;
        invalidFuncId: () => U;
        reservedFuncId: () => U;
        numericFuncId: () => U;
        leadingZeroUnderscore: () => U;
    };
    export type SyntaxErrors<T> = ReturnType<typeof syntaxErrorSchema<unknown, T>>;
}
declare module "ast/getAstSchema" {
    /**
     * AST node constructors are not just constructors: they also generate ids
     * We have this file so that the "current id" state would not be stored globally
     */
    import { Loc } from "@tonstudio/parser-runtime";
    import * as A from "ast/ast";
    import { SrcInfo } from "grammar/src-info";
    export const getAstSchema: (factory: A.FactoryAst, toSrcInfo: (location: Loc) => SrcInfo) => {
        Module: (imports: A.AstImport[], items: A.AstModuleItem[]) => A.AstModule;
        Import: (path: A.AstString, loc: Loc) => A.AstImport;
        PrimitiveTypeDecl: (name: A.AstId, loc: Loc) => A.AstPrimitiveTypeDecl;
        FunctionDef: (attributes: A.AstFunctionAttribute[], name: A.AstId, retType: A.AstType | null, params: A.AstTypedParameter[], statements: A.AstStatement[], loc: Loc) => A.AstFunctionDef;
        AsmFunctionDef: (shuffle: A.AstAsmShuffle, attributes: A.AstFunctionAttribute[], name: A.AstId, retType: A.AstType | null, params: A.AstTypedParameter[], instructions: A.AstAsmInstruction[], loc: Loc) => A.AstAsmFunctionDef;
        FunctionDecl: (attributes: A.AstFunctionAttribute[], name: A.AstId, retType: A.AstType | null, params: A.AstTypedParameter[], loc: Loc) => A.AstFunctionDecl;
        NativeFunctionDecl: (attributes: A.AstFunctionAttribute[], name: A.AstId, nativeName: A.AstFuncId, params: A.AstTypedParameter[], retType: A.AstType | null, loc: Loc) => A.AstNativeFunctionDecl;
        ConstantDef: (attributes: A.AstConstantAttribute[], name: A.AstId, type: A.AstType, initializer: A.AstExpression, loc: Loc) => A.AstConstantDef;
        ConstantDecl: (attributes: A.AstConstantAttribute[], name: A.AstId, type: A.AstType, loc: Loc) => A.AstConstantDecl;
        StructDecl: (name: A.AstId, fields: A.AstFieldDecl[], loc: Loc) => A.AstStructDecl;
        MessageDecl: (name: A.AstId, opcode: A.AstExpression | null, fields: A.AstFieldDecl[], loc: Loc) => A.AstMessageDecl;
        Contract: (name: A.AstId, traits: A.AstId[], attributes: A.AstContractAttribute[], declarations: A.AstContractDeclaration[], loc: Loc) => A.AstContract;
        Trait: (name: A.AstId, traits: A.AstId[], attributes: A.AstContractAttribute[], declarations: A.AstTraitDeclaration[], loc: Loc) => A.AstTrait;
        FieldDecl: (name: A.AstId, type: A.AstType, initializer: A.AstExpression | null, as: A.AstId | null, loc: Loc) => A.AstFieldDecl;
        Receiver: (selector: A.AstReceiverKind, statements: A.AstStatement[], loc: Loc) => A.AstReceiver;
        ContractInit: (params: A.AstTypedParameter[], statements: A.AstStatement[], loc: Loc) => A.AstContractInit;
        StatementLet: (name: A.AstId, type: A.AstType | null, expression: A.AstExpression, loc: Loc) => A.AstStatementLet;
        StatementDestruct: (type: A.AstTypeId, identifiers: Map<string, [A.AstId, A.AstId]>, ignoreUnspecifiedFields: boolean, expression: A.AstExpression, loc: Loc) => A.AstStatementDestruct;
        StatementReturn: (expression: A.AstExpression | null, loc: Loc) => A.AstStatementReturn;
        StatementExpression: (expression: A.AstExpression, loc: Loc) => A.AstStatementExpression;
        StatementAssign: (path: A.AstExpression, expression: A.AstExpression, loc: Loc) => A.AstStatementAssign;
        StatementAugmentedAssign: (op: A.AstAugmentedAssignOperation, path: A.AstExpression, expression: A.AstExpression, loc: Loc) => A.AstStatementAugmentedAssign;
        Condition: (condition: A.AstExpression, trueStatements: A.AstStatement[], falseStatements: A.AstStatement[] | null, elseif: A.AstCondition | null, loc: Loc) => A.AstCondition;
        StatementWhile: (condition: A.AstExpression, statements: A.AstStatement[], loc: Loc) => A.AstStatementWhile;
        StatementUntil: (condition: A.AstExpression, statements: A.AstStatement[], loc: Loc) => A.AstStatementUntil;
        StatementRepeat: (iterations: A.AstExpression, statements: A.AstStatement[], loc: Loc) => A.AstStatementRepeat;
        StatementTry: (statements: A.AstStatement[], loc: Loc) => A.AstStatementTry;
        StatementTryCatch: (statements: A.AstStatement[], catchName: A.AstId, catchStatements: A.AstStatement[], loc: Loc) => A.AstStatementTryCatch;
        StatementForEach: (keyName: A.AstId, valueName: A.AstId, map: A.AstExpression, statements: A.AstStatement[], loc: Loc) => A.AstStatementForEach;
        StatementBlock: (statements: A.AstStatement[], loc: Loc) => A.AstStatementBlock;
        TypeId: (text: string, loc: Loc) => A.AstTypeId;
        OptionalType: (typeArg: A.AstType, loc: Loc) => A.AstOptionalType;
        MapType: (keyType: A.AstTypeId, keyStorageType: A.AstId | null, valueType: A.AstTypeId, valueStorageType: A.AstId | null, loc: Loc) => A.AstMapType;
        BouncedMessageType: (messageType: A.AstTypeId, loc: Loc) => A.AstBouncedMessageType;
        OpBinary: (op: A.AstBinaryOperation, left: A.AstExpression, right: A.AstExpression, loc: Loc) => A.AstOpBinary;
        OpUnary: (op: A.AstUnaryOperation, operand: A.AstExpression, loc: Loc) => A.AstOpUnary;
        FieldAccess: (aggregate: A.AstExpression, field: A.AstId, loc: Loc) => A.AstFieldAccess;
        MethodCall: (self: A.AstExpression, method: A.AstId, args: A.AstExpression[], loc: Loc) => A.AstMethodCall;
        StaticCall: (funcId: A.AstId, args: A.AstExpression[], loc: Loc) => A.AstStaticCall;
        StructInstance: (type: A.AstId, args: A.AstStructFieldInitializer[], loc: Loc) => A.AstStructInstance;
        StructFieldInitializer: (field: A.AstId, initializer: A.AstExpression, loc: Loc) => A.AstStructFieldInitializer;
        InitOf: (contract: A.AstId, args: A.AstExpression[], loc: Loc) => A.AstInitOf;
        Conditional: (condition: A.AstExpression, thenBranch: A.AstExpression, elseBranch: A.AstExpression, loc: Loc) => A.AstConditional;
        Id: (text: string, loc: Loc) => A.AstId;
        FuncId: (text: string, loc: Loc) => A.AstFuncId;
        Null: (loc: Loc) => A.AstNull;
        String: (value: string, loc: Loc) => A.AstString;
        Boolean: (value: boolean, loc: Loc) => A.AstBoolean;
        Number: (base: A.AstNumberBase, value: bigint, loc: Loc) => A.AstNumber;
        ContractAttribute: (name: A.AstString, loc: Loc) => A.AstContractAttribute;
        FunctionAttributeGet: (methodId: A.AstExpression | null, loc: Loc) => A.AstFunctionAttributeGet;
        FunctionAttribute: (type: A.AstFunctionAttributeName, loc: Loc) => A.AstFunctionAttributeRest;
        ConstantAttribute: (type: A.AstConstantAttributeName, loc: Loc) => A.AstConstantAttribute;
        TypedParameter: (name: A.AstId, type: A.AstType, loc: Loc) => A.AstTypedParameter;
    };
    /**
     * List of all constructors for AST nodes
     */
    export type AstSchema = ReturnType<typeof getAstSchema>;
}
declare module "error/display-to-string" {
    /**
     * Render error message to string for compiler CLI
     */
    import { ErrorDisplay } from "error/display";
    export const displayToString: ErrorDisplay<string>;
}
declare module "utils/tricks" {
    type Extend<T extends any[], H> = H extends infer A ? [...T, A] : never;
    type Flat<TS extends any[], R extends any[] = []> = TS extends [
        infer H,
        ...infer T
    ] ? Flat<T, Extend<R, H>> : R;
    const NoSuchCase: unique symbol;
    interface NoSuchCaseBug<L> extends Array<never> {
        [NoSuchCase]: L;
    }
    type On<I extends any[], O> = {
        on: <const DI extends any[]>(...key: I extends Flat<DI> ? DI : NoSuchCaseBug<DI>) => <const DO>(handler: (...args: Extract<I, Flat<DI>>) => DO) => MV<Exclude<I, Flat<DI>>, O | DO>;
    };
    const CasesAreNotExhaustive: unique symbol;
    interface NonExhaustiveBug<L> {
        [CasesAreNotExhaustive]: L;
    }
    type End<I extends any[], O> = [I] extends [never] ? EndInternal<I, O> : {
        otherwise: <const DO>(handle: (...input: I) => DO) => O | DO;
        end: NonExhaustiveBug<I>;
    };
    type MV<I extends any[], O> = End<I, O> & On<I, O>;
    type EndInternal<I extends any[], O> = {
        otherwise: <const DO>(handle: (...input: I) => DO) => O | DO;
        end: () => O;
    };
    export const match: <const I extends any[]>(...args: I) => MV<Flat<I>, never>;
    /**
     * Convert union to intersection. See https://stackoverflow.com/q/50374908
     */
    type Intersect<T> = (T extends unknown ? (x: T) => 0 : never) extends (x: infer R) => 0 ? R : never;
    /**
     * Makes types more readable
     * Example: Unwrap<{ a: 1 } & { b: 2 }> = { a: 1, b: 2 }
     */
    type Unwrap<T> = T extends infer R ? {
        [K in keyof R]: R[K];
    } : never;
    type Inputs<I, T extends string> = I extends {
        [Z in T]: infer K;
    } ? K extends string ? Record<K, (input: I) => unknown> : never : never;
    type Outputs<O> = {
        [K in keyof O]: (input: never) => O[K];
    };
    type Handlers<I, O, T extends string> = Unwrap<Intersect<Inputs<I, T>>> & Outputs<O>;
    export const makeMakeVisitor: <T extends string>(tag: T) => <I>() => <O>(handlers: Handlers<I, O, T>) => (input: Extract<I, { [K in T]: string; }>) => O[keyof O];
    /**
     * Make visitor for disjoint union (tagged union, discriminated union)
     */
    export const makeVisitor: <I>() => <O>(handlers: Handlers<I, O, "kind">) => (input: Extract<I, {
        kind: string;
    }>) => O[keyof O];
}
declare module "grammar/next/index" {
    import * as A from "ast/ast";
    import { ItemOrigin } from "grammar/src-info";
    export const getParser: (ast: A.FactoryAst) => {
        parse: (src: string, path: string, origin: ItemOrigin) => A.AstModule;
        parseExpression: (src: string) => A.AstExpression;
        parseImports: (src: string, path: string, origin: ItemOrigin) => A.AstImport[];
    };
}
declare module "grammar/prev/src-info" {
    import { Interval } from "ohm-js";
    import { ItemOrigin, SrcInfo } from "grammar/src-info";
    /**
     * @deprecated
     */
    export const getSrcInfoFromOhm: ({ sourceString, startIdx, endIdx }: Interval, file: string | null, origin: ItemOrigin) => SrcInfo;
}
declare module "grammar/prev/parser-error" {
    import { MatchResult } from "ohm-js";
    import { ErrorDisplay } from "error/display";
    import { ItemOrigin, SrcInfo } from "grammar/src-info";
    /**
     * @deprecated
     */
    export const parserErrorSchema: (display: ErrorDisplay<string>) => {
        generic: (matchResult: MatchResult, path: string, origin: ItemOrigin) => never;
        constant: {
            duplicate: (attr: string) => (source: SrcInfo) => never;
            notAbstract: () => (source: SrcInfo) => never;
            tooAbstract: () => (source: SrcInfo) => never;
        };
        function: {
            duplicate: (attr: string) => (source: SrcInfo) => never;
            notAbstract: () => (source: SrcInfo) => never;
            tooAbstract: () => (source: SrcInfo) => never;
        };
        topLevelConstantWithAttribute: () => (source: SrcInfo) => never;
        literalTooLong: () => (source: SrcInfo) => never;
        extraneousComma: () => (source: SrcInfo) => never;
        duplicateField: (name: string) => (source: SrcInfo) => never;
        restShouldBeLast: () => (source: SrcInfo) => never;
        importWithBackslash: () => (source: SrcInfo) => never;
        reservedVarPrefix: (prefix: string) => (source: SrcInfo) => never;
        notCallable: () => (source: SrcInfo) => never;
        noBouncedWithoutArg: () => (source: SrcInfo) => never;
        noBouncedWithString: () => (source: SrcInfo) => never;
        noConstantDecl: () => (source: SrcInfo) => never;
        noFunctionDecl: () => (source: SrcInfo) => never;
        expected: (expects: ReadonlySet<string>) => (source: SrcInfo) => never;
        invalidFuncId: () => (source: SrcInfo) => never;
        reservedFuncId: () => (source: SrcInfo) => never;
        numericFuncId: () => (source: SrcInfo) => never;
        leadingZeroUnderscore: () => (source: SrcInfo) => never;
    };
    /**
     * @deprecated
     */
    export type ParserErrors = ReturnType<typeof parserErrorSchema>;
}
declare module "grammar/prev/grammar" {
    import { AstExpression, AstModule, AstImport, FactoryAst } from "ast/ast";
    import { ItemOrigin } from "grammar/src-info";
    /**
     * @deprecated
     */
    export const getParser: (ast: FactoryAst) => {
        parse: (src: string, path: string, origin: ItemOrigin) => AstModule;
        parseExpression: (sourceCode: string) => AstExpression;
        parseImports: (src: string, path: string, origin: ItemOrigin) => AstImport[];
    };
}
declare module "grammar/grammar" {
    import { AstExpression, AstImport, AstModule, FactoryAst } from "ast/ast";
    import { ItemOrigin } from "grammar/src-info";
    export type Parser = {
        parse: (src: string, path: string, origin: ItemOrigin) => AstModule;
        parseExpression: (sourceCode: string) => AstExpression;
        parseImports: (src: string, path: string, origin: ItemOrigin) => AstImport[];
    };
    export const defaultParser = "new";
    export const getParser: (ast: FactoryAst, version: "old" | "new") => Parser;
}
declare module "grammar/index" {
    export { getParser, Parser } from "grammar/grammar";
    export { dummySrcInfo, ItemOrigin, SrcInfo } from "grammar/src-info";
}
declare module "error/errors" {
    import { AstFuncId, AstId, AstTypeId } from "ast/ast";
    import { SrcInfo } from "grammar/index";
    export class TactError extends Error {
        readonly loc?: SrcInfo;
        constructor(message: string, loc?: SrcInfo);
    }
    export class TactCompilationError extends TactError {
        constructor(message: string, loc?: SrcInfo);
    }
    export class TactInternalCompilerError extends TactError {
        constructor(message: string, loc?: SrcInfo);
    }
    export class TactConstEvalError extends TactCompilationError {
        fatal: boolean;
        constructor(message: string, fatal: boolean, loc: SrcInfo);
    }
    export function locationStr(sourceInfo: SrcInfo): string;
    export function throwCompilationError(message: string, source?: SrcInfo): never;
    export function throwInternalCompilerError(message: string, source?: SrcInfo): never;
    export function throwConstEvalError(message: string, fatal: boolean, source: SrcInfo): never;
    export function idTextErr(ident: AstId | AstFuncId | AstTypeId | string): string;
    export type TactErrorCollection = Error | TactCompilationError | TactInternalCompilerError | TactConstEvalError;
}
declare module "bindings/typescript/serializers" {
    import { ABITypeRef } from "@ton/core";
    import { Writer } from "utils/Writer";
    type Serializer<T> = {
        tsType: (v: T) => string;
        tsLoad: (v: T, slice: string, field: string, w: Writer) => void;
        tsLoadTuple: (v: T, reader: string, field: string, w: Writer, fromGet: boolean) => void;
        tsStore: (v: T, builder: string, field: string, w: Writer) => void;
        tsStoreTuple: (v: T, to: string, field: string, w: Writer) => void;
        abiMatcher: (src: ABITypeRef) => T | null;
    };
    export const serializers: Serializer<any>[];
}
declare module "storage/operation" {
    import { ABITypeRef } from "@ton/core";
    export type AllocationCell = {
        ops: AllocationOperation[];
        size: {
            bits: number;
            refs: number;
        };
        next: AllocationCell | null;
    };
    export type AllocationOperation = {
        name: string;
        type: ABITypeRef;
        op: AllocationOperationType;
    };
    export type AllocationOperationType = {
        kind: "int" | "uint";
        bits: number;
        optional: boolean;
    } | {
        kind: "boolean";
        optional: boolean;
    } | {
        kind: "varint16" | "varint32" | "varuint16" | "varuint32";
        optional: boolean;
    } | {
        kind: "address";
        optional: boolean;
    } | {
        kind: "struct";
        type: string;
        ref: boolean;
        optional: boolean;
        size: {
            bits: number;
            refs: number;
        };
    } | {
        kind: "cell";
        optional: boolean;
        format: "default" | "remainder";
    } | {
        kind: "slice";
        optional: boolean;
        format: "default" | "remainder";
    } | {
        kind: "builder";
        optional: boolean;
        format: "default" | "remainder";
    } | {
        kind: "map";
    } | {
        kind: "string";
        optional: boolean;
    } | {
        kind: "fixed-bytes";
        bytes: number;
        optional: boolean;
    };
}
declare module "bindings/typescript/writeStruct" {
    import { ABIType, ABITypeRef } from "@ton/core";
    import { AllocationCell } from "storage/operation";
    import { Writer } from "utils/Writer";
    export const maxTupleSize = 15;
    export function writeStruct(name: string, fields: {
        name: string;
        type: ABITypeRef;
    }[], exp: boolean, w: Writer): void;
    export function writeParser(s: ABIType, allocation: AllocationCell, w: Writer): void;
    export function writeSerializer(s: ABIType, allocation: AllocationCell, w: Writer): void;
    export function writeInitSerializer(name: string, allocation: AllocationCell, w: Writer): void;
    export function writeTupleParser(s: ABIType, w: Writer): void;
    export function writeGetterTupleParser(s: ABIType, w: Writer): void;
    export function writeGetParser(name: string, type: ABITypeRef, w: Writer): void;
    export function writeTupleSerializer(s: ABIType, w: Writer): void;
    export function writeArgumentToStack(name: string, ref: ABITypeRef, w: Writer): void;
    export function writeDictParser(s: ABIType, w: Writer): void;
}
declare module "utils/utils" {
    export function topologicalSort<T>(src: T[], references: (src: T) => T[]): T[];
}
declare module "storage/allocator" {
    import { ABITypeRef } from "@ton/core";
    import { AllocationCell, AllocationOperation, AllocationOperationType } from "storage/operation";
    export function getAllocationOperationFromField(src: ABITypeRef, structLoader: (name: string) => {
        bits: number;
        refs: number;
    }): AllocationOperationType;
    export function allocate(type: {
        reserved: {
            bits: number;
            refs: number;
        };
        ops: AllocationOperation[];
    }): AllocationCell;
}
declare module "bindings/writeTypescript" {
    import { ABIArgument, ContractABI } from "@scom/ton-core";
    export function writeTypescript(abi: ContractABI, init?: {
        code: string;
        system: string | null;
        args: ABIArgument[];
        prefix?: {
            value?: number;
            bits?: number;
        } | undefined;
    }): string;
}
declare module "context/context" {
    type Key = string | number;
    export type Store<T> = Map<Key, T>;
    type Stores = Map<symbol, Store<any> | undefined>;
    export class CompilerContext {
        readonly stores: Stores;
        constructor(args?: {
            stores: Stores;
        });
        updateStore: <T>(storeDispatch: symbol, key: Key, value: T) => CompilerContext;
    }
    export function createContextStore<T>(): {
        get(ctx: CompilerContext, key: Key): T | null;
        all(ctx: CompilerContext): Store<T>;
        set(ctx: CompilerContext, key: Key, v: T): CompilerContext;
    };
}
declare module "config/features" {
    import { CompilerContext } from "context/context";
    export function enabledInline(ctx: CompilerContext): boolean;
    export function enabledDebug(ctx: CompilerContext): boolean;
    export function enabledExternals(ctx: CompilerContext): boolean;
    export function enabledIpfsAbiGetter(ctx: CompilerContext): boolean;
    export function enabledInterfacesGetter(ctx: CompilerContext): boolean;
    export function featureEnable(ctx: CompilerContext, key: string): CompilerContext;
}
declare module "func/funcCompile" {
    import { ILogger } from "context/logger";
    export type FuncCompilationResult = {
        ok: false;
        log: string;
        fift: string | null;
        output: Buffer | null;
    } | {
        ok: true;
        log: string;
        fift: string;
        output: Buffer;
    };
    export function funcCompile(args: {
        entries: string[];
        sources: {
            path: string;
            content: string;
        }[];
        logger: ILogger;
    }): Promise<FuncCompilationResult>;
}
declare module "packaging/fileFormat" {
    import { z } from "zod";
    export const fileFormat: z.ZodObject<{
        name: z.ZodString;
        code: z.ZodString;
        abi: z.ZodString;
        init: z.ZodObject<{
            kind: z.ZodLiteral<"direct">;
            args: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                type: z.ZodUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"simple">;
                    type: z.ZodString;
                    optional: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
                    format: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNumber, z.ZodString]>>>;
                }, "strip", z.ZodTypeAny, {
                    type?: string;
                    optional?: boolean;
                    format?: string | number | boolean;
                    kind?: "simple";
                }, {
                    type?: string;
                    optional?: boolean;
                    format?: string | number | boolean;
                    kind?: "simple";
                }>, z.ZodObject<{
                    kind: z.ZodLiteral<"dict">;
                    format: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNumber, z.ZodString]>>>;
                    key: z.ZodString;
                    keyFormat: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNumber, z.ZodString]>>>;
                    value: z.ZodString;
                    valueFormat: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNumber, z.ZodString]>>>;
                }, "strip", z.ZodTypeAny, {
                    key?: string;
                    value?: string;
                    format?: string | number | boolean;
                    kind?: "dict";
                    keyFormat?: string | number | boolean;
                    valueFormat?: string | number | boolean;
                }, {
                    key?: string;
                    value?: string;
                    format?: string | number | boolean;
                    kind?: "dict";
                    keyFormat?: string | number | boolean;
                    valueFormat?: string | number | boolean;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                name?: string;
                type?: {
                    type?: string;
                    optional?: boolean;
                    format?: string | number | boolean;
                    kind?: "simple";
                } | {
                    key?: string;
                    value?: string;
                    format?: string | number | boolean;
                    kind?: "dict";
                    keyFormat?: string | number | boolean;
                    valueFormat?: string | number | boolean;
                };
            }, {
                name?: string;
                type?: {
                    type?: string;
                    optional?: boolean;
                    format?: string | number | boolean;
                    kind?: "simple";
                } | {
                    key?: string;
                    value?: string;
                    format?: string | number | boolean;
                    kind?: "dict";
                    keyFormat?: string | number | boolean;
                    valueFormat?: string | number | boolean;
                };
            }>, "many">;
            prefix: z.ZodOptional<z.ZodObject<{
                bits: z.ZodNumber;
                value: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                value?: number;
                bits?: number;
            }, {
                value?: number;
                bits?: number;
            }>>;
            deployment: z.ZodUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"direct">;
            }, "strip", z.ZodTypeAny, {
                kind?: "direct";
            }, {
                kind?: "direct";
            }>, z.ZodObject<{
                kind: z.ZodLiteral<"system-cell">;
                system: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                kind?: "system-cell";
                system?: string;
            }, {
                kind?: "system-cell";
                system?: string;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            prefix?: {
                value?: number;
                bits?: number;
            };
            args?: {
                name?: string;
                type?: {
                    type?: string;
                    optional?: boolean;
                    format?: string | number | boolean;
                    kind?: "simple";
                } | {
                    key?: string;
                    value?: string;
                    format?: string | number | boolean;
                    kind?: "dict";
                    keyFormat?: string | number | boolean;
                    valueFormat?: string | number | boolean;
                };
            }[];
            kind?: "direct";
            deployment?: {
                kind?: "direct";
            } | {
                kind?: "system-cell";
                system?: string;
            };
        }, {
            prefix?: {
                value?: number;
                bits?: number;
            };
            args?: {
                name?: string;
                type?: {
                    type?: string;
                    optional?: boolean;
                    format?: string | number | boolean;
                    kind?: "simple";
                } | {
                    key?: string;
                    value?: string;
                    format?: string | number | boolean;
                    kind?: "dict";
                    keyFormat?: string | number | boolean;
                    valueFormat?: string | number | boolean;
                };
            }[];
            kind?: "direct";
            deployment?: {
                kind?: "direct";
            } | {
                kind?: "system-cell";
                system?: string;
            };
        }>;
        sources: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        compiler: z.ZodObject<{
            name: z.ZodString;
            version: z.ZodString;
            parameters: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            name?: string;
            version?: string;
            parameters?: string;
        }, {
            name?: string;
            version?: string;
            parameters?: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        code?: string;
        name?: string;
        init?: {
            prefix?: {
                value?: number;
                bits?: number;
            };
            args?: {
                name?: string;
                type?: {
                    type?: string;
                    optional?: boolean;
                    format?: string | number | boolean;
                    kind?: "simple";
                } | {
                    key?: string;
                    value?: string;
                    format?: string | number | boolean;
                    kind?: "dict";
                    keyFormat?: string | number | boolean;
                    valueFormat?: string | number | boolean;
                };
            }[];
            kind?: "direct";
            deployment?: {
                kind?: "direct";
            } | {
                kind?: "system-cell";
                system?: string;
            };
        };
        abi?: string;
        sources?: Record<string, string>;
        compiler?: {
            name?: string;
            version?: string;
            parameters?: string;
        };
    }, {
        code?: string;
        name?: string;
        init?: {
            prefix?: {
                value?: number;
                bits?: number;
            };
            args?: {
                name?: string;
                type?: {
                    type?: string;
                    optional?: boolean;
                    format?: string | number | boolean;
                    kind?: "simple";
                } | {
                    key?: string;
                    value?: string;
                    format?: string | number | boolean;
                    kind?: "dict";
                    keyFormat?: string | number | boolean;
                    valueFormat?: string | number | boolean;
                };
            }[];
            kind?: "direct";
            deployment?: {
                kind?: "direct";
            } | {
                kind?: "system-cell";
                system?: string;
            };
        };
        abi?: string;
        sources?: Record<string, string>;
        compiler?: {
            name?: string;
            version?: string;
            parameters?: string;
        };
    }>;
    export type PackageFileFormat = z.infer<typeof fileFormat>;
}
declare module "ast/iterators" {
    import { AstNode } from "ast/ast";
    /**
     * Recursively iterates over each node in an AstNode and applies a callback to each AST element.
     * @public
     * @param node The node to traverse.
     * @param callback The callback function to apply to each AST element.
     */
    export function traverse(node: AstNode, callback: (node: AstNode) => void): void;
}
declare module "types/types" {
    import { ABIField } from "@ton/core";
    import { AstConstantDef, AstFunctionDef, AstContractInit, AstNativeFunctionDecl, AstReceiver, AstTypeDecl, AstId, AstFunctionDecl, AstConstantDecl, AstFieldDecl, AstAsmFunctionDef, AstNumber, AstLiteral } from "ast/ast";
    import { ItemOrigin, SrcInfo } from "grammar/index";
    export type TypeDescription = {
        kind: "struct" | "primitive_type_decl" | "contract" | "trait";
        origin: ItemOrigin;
        name: string;
        uid: number;
        header: AstNumber | null;
        tlb: string | null;
        signature: string | null;
        fields: FieldDescription[];
        partialFieldCount: number;
        traits: TypeDescription[];
        functions: Map<string, FunctionDescription>;
        receivers: ReceiverDescription[];
        init: InitDescription | null;
        ast: AstTypeDecl;
        dependsOn: TypeDescription[];
        interfaces: string[];
        constants: ConstantDescription[];
    };
    export type TypeRef = {
        kind: "ref";
        name: string;
        optional: boolean;
    } | {
        kind: "map";
        key: string;
        keyAs: string | null;
        value: string;
        valueAs: string | null;
    } | {
        kind: "ref_bounced";
        name: string;
    } | {
        kind: "void";
    } | {
        kind: "null";
    };
    export function showValue(val: AstLiteral): string;
    export type FieldDescription = {
        name: string;
        index: number;
        type: TypeRef;
        as: string | null;
        default: AstLiteral | undefined;
        loc: SrcInfo;
        ast: AstFieldDecl;
        abi: ABIField;
    };
    export type ConstantDescription = {
        name: string;
        type: TypeRef;
        value: AstLiteral | undefined;
        loc: SrcInfo;
        ast: AstConstantDef | AstConstantDecl;
    };
    export type FunctionParameter = {
        name: AstId;
        type: TypeRef;
        loc: SrcInfo;
    };
    export type InitParameter = {
        name: AstId;
        type: TypeRef;
        as: string | null;
        loc: SrcInfo;
    };
    export type FunctionDescription = {
        name: string;
        origin: ItemOrigin;
        isGetter: boolean;
        methodId: number | null;
        isMutating: boolean;
        isOverride: boolean;
        isVirtual: boolean;
        isAbstract: boolean;
        isInline: boolean;
        self: TypeRef | null;
        returns: TypeRef;
        params: FunctionParameter[];
        ast: AstFunctionDef | AstNativeFunctionDecl | AstFunctionDecl | AstAsmFunctionDef;
    };
    export type BinaryReceiverSelector = {
        kind: "internal-binary";
        type: string;
        name: AstId;
    } | {
        kind: "bounce-binary";
        name: AstId;
        type: string;
        bounced: boolean;
    } | {
        kind: "external-binary";
        type: string;
        name: AstId;
    };
    export type CommentReceiverSelector = {
        kind: "internal-comment";
        comment: string;
    } | {
        kind: "external-comment";
        comment: string;
    };
    type EmptyReceiverSelector = {
        kind: "internal-empty";
    } | {
        kind: "external-empty";
    };
    type FallbackReceiverSelector = {
        kind: "internal-comment-fallback";
        name: AstId;
    } | {
        kind: "internal-fallback";
        name: AstId;
    } | {
        kind: "bounce-fallback";
        name: AstId;
    } | {
        kind: "external-comment-fallback";
        name: AstId;
    } | {
        kind: "external-fallback";
        name: AstId;
    };
    export type ReceiverSelector = BinaryReceiverSelector | CommentReceiverSelector | EmptyReceiverSelector | FallbackReceiverSelector;
    export function receiverSelectorName(selector: ReceiverSelector): string;
    export type ReceiverDescription = {
        selector: ReceiverSelector;
        ast: AstReceiver;
    };
    export type InitDescription = {
        params: InitParameter[];
        ast: AstContractInit;
    };
    export function printTypeRef(src: TypeRef): string;
    export function typeRefEquals(a: TypeRef, b: TypeRef): boolean;
}
declare module "context/store" {
    import { AstModule, AstConstantDef, AstFunctionDef, AstNativeFunctionDecl, AstTypeDecl, AstAsmFunctionDef } from "ast/ast";
    import { CompilerContext } from "context/context";
    import { ItemOrigin } from "grammar/src-info";
    import { Parser } from "grammar/grammar";
    /**
     * @public
     */
    export type TactSource = {
        code: string;
        path: string;
        origin: ItemOrigin;
    };
    /**
     * Represents the storage for all AST-related data within the compiler context.
     * @public
     * @property functions AST entries representing top-level functions.
     * @property constants AST entries representing top-level constant definitions.
     * @property types AST entries representing structures, contracts, and traits.
     */
    export type AstStore = {
        sources: TactSource[];
        funcSources: {
            code: string;
            path: string;
        }[];
        functions: (AstFunctionDef | AstNativeFunctionDecl | AstAsmFunctionDef)[];
        constants: AstConstantDef[];
        types: AstTypeDecl[];
    };
    /**
     * Retrieves the raw AST for the given context.
     * @public
     * @param ctx The compiler context from which the AST is retrieved.
     * @throws Will throw an error if the AST is not found in the context.
     * @returns The AST types associated with the context.
     */
    export function getRawAST(ctx: CompilerContext): AstStore;
    /**
     * Parses multiple Tact source files into AST modules.
     * @public
     */
    export function parseModules(sources: TactSource[], parser: Parser): AstModule[];
    /**
     * Extends the compiler context by adding AST entries and source information from
     * given sources and parsed programs.
     * @public
     * @param parsedModules An optional array of previously parsed programs. If not defined, they will be parsed from `sources`.
     * @returns The updated compiler context.
     */
    export function openContext(ctx: CompilerContext, sources: TactSource[], funcSources: {
        code: string;
        path: string;
    }[], parser: Parser, parsedModules?: AstModule[]): CompilerContext;
}
declare module "ast/clone" {
    import { AstNode, FactoryAst } from "ast/ast";
    export function cloneNode<T extends AstNode>(src: T, { cloneNode }: FactoryAst): T;
}
declare module "utils/crc16" {
    export function crc16(data: string | Buffer): number;
}
declare module "utils/isSubsetOf" {
    /** Taken from TypeScript collection lib to perfectly match the .isSubsetOf signature */
    export interface ReadonlySetLike<T> {
        /**
         * Despite its name, returns an iterator of the values in the set-like.
         */
        keys(): Iterator<T>;
        /**
         * @returns a boolean indicating whether an element with the specified value exists in the set-like or not.
         */
        has(value: T): boolean;
        /**
         * @returns the number of (unique) elements in the set-like.
         */
        readonly size: number;
    }
    /**
     * @returns a boolean indicating whether all the elements in Set `one` are also in the `other`.
     */
    export function isSubsetOf<T>(one: Set<T>, other: ReadonlySetLike<unknown>): boolean;
}
declare module "optimizer/util" {
    import { Address, Cell, Slice } from "@ton/core";
    import { AstExpression, AstUnaryOperation, AstBinaryOperation, AstNumber, AstBoolean, AstSimplifiedString, AstNull, AstCell, AstSlice, AstAddress, AstLiteral, AstStructValue, AstStructFieldValue, AstId, AstCommentValue, FactoryAst } from "ast/ast";
    import { SrcInfo } from "grammar/index";
    export const getAstUtil: ({ createNode }: FactoryAst) => {
        makeUnaryExpression: (op: AstUnaryOperation, operand: AstExpression) => AstExpression;
        makeBinaryExpression: (op: AstBinaryOperation, left: AstExpression, right: AstExpression) => AstExpression;
        makeNumberLiteral: (n: bigint, loc: SrcInfo) => AstNumber;
        makeBooleanLiteral: (b: boolean, loc: SrcInfo) => AstBoolean;
        makeSimplifiedStringLiteral: (s: string, loc: SrcInfo) => AstSimplifiedString;
        makeCommentLiteral: (s: string, loc: SrcInfo) => AstCommentValue;
        makeNullLiteral: (loc: SrcInfo) => AstNull;
        makeCellLiteral: (c: Cell, loc: SrcInfo) => AstCell;
        makeSliceLiteral: (s: Slice, loc: SrcInfo) => AstSlice;
        makeAddressLiteral: (a: Address, loc: SrcInfo) => AstAddress;
        makeStructFieldValue: (fieldName: string, val: AstLiteral, loc: SrcInfo) => AstStructFieldValue;
        makeStructValue: (fields: AstStructFieldValue[], type: AstId, loc: SrcInfo) => AstStructValue;
    };
    export type AstUtil = ReturnType<typeof getAstUtil>;
    export function checkIsUnaryOpNode(ast: AstExpression): boolean;
    export function checkIsBinaryOpNode(ast: AstExpression): boolean;
    export function checkIsBinaryOp_With_RightValue(ast: AstExpression): boolean;
    export function checkIsBinaryOp_With_LeftValue(ast: AstExpression): boolean;
    export function checkIsNumber(ast: AstExpression, n: bigint): boolean;
    export function checkIsName(ast: AstExpression): boolean;
    export function checkIsBoolean(ast: AstExpression, b: boolean): boolean;
    export function divFloor(a: bigint, b: bigint): bigint;
    export function abs(a: bigint): bigint;
    export function sign(a: bigint): bigint;
    export function modFloor(a: bigint, b: bigint): bigint;
}
declare module "optimizer/types" {
    import { AstExpression } from "ast/ast";
    import { AstUtil } from "optimizer/util";
    export interface ExpressionTransformer {
        util: AstUtil;
        applyRules(ast: AstExpression): AstExpression;
    }
    export abstract class Rule {
        abstract applyRule(ast: AstExpression, optimizer: ExpressionTransformer): AstExpression;
    }
}
declare module "optimizer/algebraic" {
    import { AstExpression } from "ast/ast";
    import { ExpressionTransformer, Rule } from "optimizer/types";
    export class AddZero extends Rule {
        private additiveOperators;
        applyRule(ast: AstExpression, { util }: ExpressionTransformer): AstExpression;
    }
    export class MultiplyZero extends Rule {
        applyRule(ast: AstExpression, { util }: ExpressionTransformer): AstExpression;
    }
    export class MultiplyOne extends Rule {
        applyRule(ast: AstExpression, _optimizer: ExpressionTransformer): AstExpression;
    }
    export class SubtractSelf extends Rule {
        applyRule(ast: AstExpression, { util }: ExpressionTransformer): AstExpression;
    }
    export class AddSelf extends Rule {
        applyRule(ast: AstExpression, { applyRules, util }: ExpressionTransformer): AstExpression;
    }
    export class OrTrue extends Rule {
        applyRule(ast: AstExpression, { util }: ExpressionTransformer): AstExpression;
    }
    export class AndFalse extends Rule {
        applyRule(ast: AstExpression, { util }: ExpressionTransformer): AstExpression;
    }
    export class OrFalse extends Rule {
        applyRule(ast: AstExpression, _optimizer: ExpressionTransformer): AstExpression;
    }
    export class AndTrue extends Rule {
        applyRule(ast: AstExpression, _optimizer: ExpressionTransformer): AstExpression;
    }
    export class OrSelf extends Rule {
        applyRule(ast: AstExpression, _optimizer: ExpressionTransformer): AstExpression;
    }
    export class AndSelf extends Rule {
        applyRule(ast: AstExpression, _optimizer: ExpressionTransformer): AstExpression;
    }
    export class ExcludedMiddle extends Rule {
        applyRule(ast: AstExpression, { util }: ExpressionTransformer): AstExpression;
    }
    export class Contradiction extends Rule {
        applyRule(ast: AstExpression, { util }: ExpressionTransformer): AstExpression;
    }
    export class DoubleNegation extends Rule {
        applyRule(ast: AstExpression, _optimizer: ExpressionTransformer): AstExpression;
    }
    export class NegateTrue extends Rule {
        applyRule(ast: AstExpression, { util }: ExpressionTransformer): AstExpression;
    }
    export class NegateFalse extends Rule {
        applyRule(ast: AstExpression, { util }: ExpressionTransformer): AstExpression;
    }
}
declare module "types/subtyping" {
    import { TypeRef } from "types/types";
    export function isAssignable(src: TypeRef, to: TypeRef): boolean;
    export function moreGeneralType(type1: TypeRef, type2: TypeRef): TypeRef | null;
}
declare module "types/resolveStatements" {
    import { CompilerContext } from "context/context";
    import { AstId, FactoryAst } from "ast/ast";
    import { TypeRef } from "types/types";
    import { SrcInfo } from "grammar/index";
    export type StatementContext = {
        root: SrcInfo;
        funName: string | null;
        returns: TypeRef;
        vars: Map<string, TypeRef>;
        requiredFields: string[];
    };
    export function emptyContext(root: SrcInfo, funName: string | null, returns: TypeRef): StatementContext;
    export function isLvalue(path: AstId[], ctx: CompilerContext): boolean;
    export function resolveStatements(ctx: CompilerContext, Ast: FactoryAst): CompilerContext;
}
declare module "generator/Writer" {
    import { CompilerContext } from "context/context";
    type Flag = "inline" | "impure" | "inline_ref";
    type Body = {
        kind: "generic";
        code: string;
    } | {
        kind: "asm";
        shuffle: string;
        code: string;
    } | {
        kind: "skip";
    };
    export type WrittenFunction = {
        name: string;
        code: Body;
        signature: string;
        flags: Set<Flag>;
        depends: Set<string>;
        comment: string | null;
        context: string | null;
    };
    export class WriterContext {
        #private;
        readonly ctx: CompilerContext;
        constructor(ctx: CompilerContext, name: string);
        get name(): string;
        clone(): WriterContext;
        extract(debug?: boolean): WrittenFunction[];
        skip(name: string): void;
        fun(name: string, handler: () => void): void;
        asm(shuffle: string, code: string): void;
        body(handler: () => void): void;
        main(handler: () => void): void;
        signature(sig: string): void;
        flag(flag: Flag): void;
        used(name: string): string;
        comment(src: string): void;
        context(src: string): void;
        currentContext(): string;
        inIndent: (handler: () => void) => void;
        append(src?: string): void;
        write(src?: string): void;
        isRendered(key: string): boolean;
        markRendered(key: string): void;
    }
}
declare module "generator/writers/ops" {
    import { WriterContext } from "generator/Writer";
    export const ops: {
        writer: (type: string, ctx: WriterContext) => string;
        writerCell: (type: string, ctx: WriterContext) => string;
        writerCellOpt: (type: string, ctx: WriterContext) => string;
        reader: (type: string, ctx: WriterContext) => string;
        readerNonModifying: (type: string, ctx: WriterContext) => string;
        readerBounced: (type: string, ctx: WriterContext) => string;
        readerOpt: (type: string, ctx: WriterContext) => string;
        typeField: (type: string, name: string, ctx: WriterContext) => string;
        typeTensorCast: (type: string, ctx: WriterContext) => string;
        typeNotNull: (type: string, ctx: WriterContext) => string;
        typeAsOptional: (type: string, ctx: WriterContext) => string;
        typeToTuple: (type: string, ctx: WriterContext) => string;
        typeToOptTuple: (type: string, ctx: WriterContext) => string;
        typeFromTuple: (type: string, ctx: WriterContext) => string;
        typeFromOptTuple: (type: string, ctx: WriterContext) => string;
        typeToExternal: (type: string, ctx: WriterContext) => string;
        typeToOptExternal: (type: string, ctx: WriterContext) => string;
        typeConstructor: (type: string, fields: string[], ctx: WriterContext) => string;
        contractInit: (type: string, ctx: WriterContext) => string;
        contractInitChild: (type: string, ctx: WriterContext) => string;
        contractLoad: (type: string, ctx: WriterContext) => string;
        contractStore: (type: string, ctx: WriterContext) => string;
        contractRouter: (type: string, kind: "internal" | "external") => string;
        receiveEmpty: (type: string, kind: "internal" | "external") => string;
        receiveType: (type: string, kind: "internal" | "external", msg: string) => string;
        receiveAnyText: (type: string, kind: "internal" | "external") => string;
        receiveText: (type: string, kind: "internal" | "external", hash: string) => string;
        receiveAny: (type: string, kind: "internal" | "external") => string;
        receiveTypeBounce: (type: string, msg: string) => string;
        receiveBounceAny: (type: string) => string;
        extension: (type: string, name: string) => string;
        global: (name: string) => string;
        nonModifying: (name: string) => string;
        str: (id: string, ctx: WriterContext) => string;
    };
}
declare module "generator/writers/resolveFuncTypeUnpack" {
    import { TypeDescription, TypeRef } from "types/types";
    import { WriterContext } from "generator/Writer";
    export function resolveFuncTypeUnpack(descriptor: TypeRef | TypeDescription | string, name: string, ctx: WriterContext, optional?: boolean, usePartialFields?: boolean): string;
}
declare module "generator/writers/writeConstant" {
    import { Address, Cell, Slice } from "@ton/core";
    import { WriterContext } from "generator/Writer";
    export function writeString(str: string, ctx: WriterContext): string;
    export function writeComment(str: string, ctx: WriterContext): string;
    export function writeAddress(address: Address, ctx: WriterContext): string;
    export function writeCell(cell: Cell, ctx: WriterContext): string;
    export function writeSlice(slice: Slice, ctx: WriterContext): string;
}
declare module "types/resolveErrors" {
    import { CompilerContext } from "context/context";
    import { FactoryAst } from "ast/ast";
    type Exception = {
        value: string;
        id: number;
    };
    export function resolveErrors(ctx: CompilerContext, Ast: FactoryAst): CompilerContext;
    export function getAllErrors(ctx: CompilerContext): Exception[];
    export function getErrorId(value: string, ctx: CompilerContext): number;
}
declare module "abi/AbiFunction" {
    import { AstExpression } from "ast/ast";
    import { CompilerContext } from "context/context";
    import { WriterContext } from "generator/Writer";
    import { TypeRef } from "types/types";
    import { SrcInfo } from "grammar/index";
    export type AbiFunction = {
        name: string;
        resolve: (ctx: CompilerContext, args: TypeRef[], loc: SrcInfo) => TypeRef;
        generate: (ctx: WriterContext, args: TypeRef[], resolved: AstExpression[], loc: SrcInfo) => string;
    };
}
declare module "utils/filePath" {
    export function posixNormalize(path: string): string;
}
declare module "abi/global" {
    import { AbiFunction } from "abi/AbiFunction";
    export const GlobalFunctions: Map<string, AbiFunction>;
}
declare module "generator/writers/id" {
    import { AstId } from "ast/ast";
    export function funcIdOf(ident: AstId | string): string;
    export function funcInitIdOf(ident: AstId | string): string;
}
declare module "abi/struct" {
    import { AbiFunction } from "abi/AbiFunction";
    export const StructFunctions: Map<string, AbiFunction>;
}
declare module "generator/writers/resolveFuncType" {
    import { TypeDescription, TypeRef } from "types/types";
    import { WriterContext } from "generator/Writer";
    export function resolveFuncType(descriptor: TypeRef | TypeDescription | string, ctx: WriterContext, optional?: boolean, usePartialFields?: boolean): string;
}
declare module "generator/writers/resolveFuncPrimitive" {
    import { TypeDescription, TypeRef } from "types/types";
    import { WriterContext } from "generator/Writer";
    export function resolveFuncPrimitive(descriptor: TypeRef | TypeDescription | string, ctx: WriterContext): boolean;
}
declare module "generator/writers/cast" {
    import { TypeRef } from "types/types";
    import { WriterContext } from "generator/Writer";
    export function cast(from: TypeRef, to: TypeRef, expression: string, ctx: WriterContext): string;
}
declare module "generator/writers/resolveFuncTupleType" {
    import { TypeDescription, TypeRef } from "types/types";
    import { WriterContext } from "generator/Writer";
    export function resolveFuncTupleType(descriptor: TypeRef | TypeDescription | string, ctx: WriterContext): string;
}
declare module "generator/writers/freshIdentifier" {
    export function freshIdentifier(prefix: string): string;
}
declare module "utils/array" {
    export const isUndefined: <T>(t: T | undefined) => t is undefined;
    export const groupBy: <T, U>(items: readonly T[], f: (t: T) => U) => readonly (readonly T[])[];
    export const intercalate: <T>(items: readonly (readonly T[])[], value: T) => readonly T[];
}
declare module "prettyPrinter" {
    import * as A from "ast/ast";
    export const ppAstTypeId: typeof A.idText;
    export const ppAstTypeIdWithStorage: (type: A.AstTypeId, storageType: A.AstId | null) => string;
    export const ppAstMapType: ({ keyType, keyStorageType, valueType, valueStorageType, }: A.AstMapType) => string;
    export const ppAstBouncedMessageType: ({ messageType, }: A.AstBouncedMessageType) => string;
    export const ppAstOptionalType: ({ typeArg }: A.AstOptionalType) => string;
    export const ppAstType: (input: A.AstType) => string;
    export const unaryOperatorType: Record<A.AstUnaryOperation, "post" | "pre">;
    export const checkPostfix: (operator: A.AstUnaryOperation) => boolean;
    /**
     * Description of precedence of certain type of AST node
     */
    export type Precedence = {
        /**
         * Add parentheses around `code` if in this `parent` position we need brackets
         * @param check Position-checking function from parent
         * @param code Code to put parentheses around
         * @returns
         */
        brace: (position: (childPrecedence: number) => boolean, code: string) => string;
        /**
         * Used in positions where grammar rule mentions itself
         *
         * Passed down when a position allows same unparenthesized operator
         * For example, on left side of addition we can use another addition without
         * parentheses: `1 + 2 + 3` means `(1 + 2) + 3`. Thus for left-associative
         * operators we pass `self` to their left argument printer.
         */
        self: (childPrecedence: number) => boolean;
        /**
         * Used in positions where grammar rule mentions other rule
         *
         * Passed down when a position disallows same unparenthesized operator
         * For example, on the right side of subtraction we can't use another subtraction
         * without parentheses: `1 - (2 - 3)` is not the same as `(1 - 2) - 3`. Thus for
         * left-associative operators we pass `child` to their right argument printer.
         */
        child: (childPrecedence: number) => boolean;
    };
    /**
     * Given numeric value of precedence, where higher values stand for higher binding power,
     * create a helper object for precedence checking
     */
    export const makePrecedence: (myPrecedence: number) => Precedence;
    export const lowestPrecedence: Precedence;
    export const conditionalPrecedence: Precedence;
    export const binaryPrecedence: Readonly<Record<A.AstBinaryOperation, Precedence>>;
    export const prefixPrecedence: Precedence;
    export const postfixPrecedence: Precedence;
    /**
     * Expression printer takes an expression and a function from parent AST node printer that checks
     * whether expressions with given precedence should be parenthesized in parent context
     */
    export type ExprPrinter<T> = (expr: T) => (check: (childPrecedence: number) => boolean) => string;
    /**
     * Wrapper for AST nodes that should never be parenthesized, and thus do not require information
     * about the position they're printed in
     *
     * Takes a regular printer function and returns corresponding ExprPrinter that ignores all
     * position and precedence information
     */
    export const ppLeaf: <T>(printer: (t: T) => string) => ExprPrinter<T>;
    export const ppExprArgs: (args: A.AstExpression[]) => string;
    export const ppAstStructFieldInit: (param: A.AstStructFieldInitializer) => string;
    export const ppAstStructFieldValue: (param: A.AstStructFieldValue) => string;
    export const ppAstStructInstance: ({ type, args }: A.AstStructInstance) => string;
    export const ppAstStructValue: ({ type, args }: A.AstStructValue) => string;
    export const ppAstInitOf: ({ contract, args }: A.AstInitOf) => string;
    export const ppAstNumber: typeof A.astNumToString;
    export const ppAstBoolean: ({ value }: A.AstBoolean) => string;
    export const ppAstId: ({ text }: A.AstId) => string;
    export const ppAstNull: (_expr: A.AstNull) => string;
    export const ppAstString: ({ value }: A.AstString) => string;
    export const ppAstCommentValue: ({ value }: A.AstCommentValue) => string;
    export const ppAstSimplifiedString: ({ value }: A.AstSimplifiedString) => string;
    export const ppAstAddress: ({ value }: A.AstAddress) => string;
    export const ppAstCell: ({ value }: A.AstCell) => string;
    export const ppAstSlice: ({ value }: A.AstSlice) => string;
    export const ppAstStaticCall: ({ function: func, args }: A.AstStaticCall) => string;
    export const ppAstMethodCall: ExprPrinter<A.AstMethodCall>;
    export const ppAstFieldAccess: ExprPrinter<A.AstFieldAccess>;
    export const ppAstOpUnary: ExprPrinter<A.AstOpUnary>;
    export const ppAstOpBinary: ExprPrinter<A.AstOpBinary>;
    export const ppAstConditional: ExprPrinter<A.AstConditional>;
    export const ppAstExpressionNested: (input: A.AstExpression) => (check: (childPrecedence: number) => boolean) => string;
    export const ppAstExpression: (expr: A.AstExpression) => string;
    /**
     * An intermediate language that is only concerned of spacing and indentation
     */
    type Context<U> = {
        /**
         * Line of code with \n implied
         */
        row: (s: string) => U;
        /**
         * Stacks lines after each other
         */
        block: (rows: readonly U[]) => U;
        /**
         * Similar to `block`, but adjacent lines of groups get concatenated
         * [a, b] + [c, d] = [a, bc, d]
         */
        concat: (rows: readonly U[]) => U;
        /**
         * Same as `indent`, but indents `rows` 1 level deeper and adds `{` and `}`
         */
        braced: (rows: readonly U[]) => U;
        /**
         * Print a list of `items` with `print`
         */
        list: <T>(items: readonly T[], print: Printer<T>) => readonly U[];
        /**
         * Display `items` with `print` in groups distinguished by return value of `getTag`
         */
        grouped: <T, V>(options: {
            items: readonly T[];
            /**
             * Items with the same tag are displayed without extra empty line between them
             *
             * Use NaN for tag whenever items should always be displayed with empty line,
             * because NaN !== NaN
             */
            getTag: (t: T) => V;
            print: Printer<T>;
        }) => readonly U[];
    };
    /**
     * Prints AST node of type `T` into an intermediate language of row of type `U`
     *
     * We enforce `U` to be a generic argument so that no implementation can (ab)use
     * the fact it's a string and generate some indentation without resorting to
     * methods of `Context`.
     */
    type Printer<T> = (item: T) => <U>(ctx: Context<U>) => U;
    export const ppAstModule: Printer<A.AstModule>;
    export const ppAstStruct: Printer<A.AstStructDecl>;
    export const ppAstContract: Printer<A.AstContract>;
    export const ppAstPrimitiveTypeDecl: Printer<A.AstPrimitiveTypeDecl>;
    export const ppAstFunctionDef: Printer<A.AstFunctionDef>;
    export const ppAsmShuffle: ({ args, ret }: A.AstAsmShuffle) => string;
    export const ppAstAsmFunctionDef: Printer<A.AstAsmFunctionDef>;
    export const ppAstNativeFunction: Printer<A.AstNativeFunctionDecl>;
    export const ppAstTrait: Printer<A.AstTrait>;
    export const ppAstConstant: Printer<A.AstConstantDef>;
    export const ppAstMessage: Printer<A.AstMessageDecl>;
    export const ppModuleItem: Printer<A.AstModuleItem>;
    export const ppAstFieldDecl: Printer<A.AstFieldDecl>;
    export const ppAstReceiver: Printer<A.AstReceiver>;
    export const ppAstFunctionDecl: Printer<A.AstFunctionDecl>;
    export const ppAstConstDecl: Printer<A.AstConstantDecl>;
    export const ppTraitBody: Printer<A.AstTraitDeclaration>;
    export const ppAstInitFunction: Printer<A.AstContractInit>;
    export const ppContractBody: Printer<A.AstContractDeclaration>;
    export const ppAstImport: Printer<A.AstImport>;
    export const ppAstFunctionSignature: ({ name, attributes, return: retTy, params, }: A.AstFunctionDef | A.AstAsmFunctionDef | A.AstFunctionDecl) => string;
    export const ppAstFunctionAttribute: (attr: A.AstFunctionAttribute) => string;
    export const ppAstReceiverHeader: (input: A.AstReceiverKind) => string;
    export const ppAstFuncId: (func: A.AstFuncId) => string;
    export const ppStatementBlock: Printer<A.AstStatement[]>;
    export const ppAsmInstructionsBlock: Printer<A.AstAsmInstruction[]>;
    export const ppAstStatementLet: Printer<A.AstStatementLet>;
    export const ppAstStatementReturn: Printer<A.AstStatementReturn>;
    export const ppAstStatementExpression: Printer<A.AstStatementExpression>;
    export const ppAstStatementAssign: Printer<A.AstStatementAssign>;
    export const ppAstStatementAugmentedAssign: Printer<A.AstStatementAugmentedAssign>;
    export const ppAstCondition: Printer<A.AstCondition>;
    export const ppAstStatementWhile: Printer<A.AstStatementWhile>;
    export const ppAstStatementRepeat: Printer<A.AstStatementRepeat>;
    export const ppAstStatementUntil: Printer<A.AstStatementUntil>;
    export const ppAstStatementForEach: Printer<A.AstStatementForEach>;
    export const ppAstStatementTry: Printer<A.AstStatementTry>;
    export const ppAstStatementTryCatch: Printer<A.AstStatementTryCatch>;
    export const ppAstStatementDestruct: Printer<A.AstStatementDestruct>;
    export const ppAstStatementBlock: Printer<A.AstStatementBlock>;
    export const ppAstStatement: Printer<A.AstStatement>;
    export const exprNode: <T>(exprPrinter: (expr: T) => string) => Printer<T>;
    export const ppAstNode: Printer<A.AstNode>;
    /**
     * Pretty-prints an AST node into a string representation.
     * @param node The AST node to format.
     * @returns A string that represents the formatted AST node.
     */
    export const prettyPrint: (node: A.AstNode) => string;
}
declare module "generator/writers/writeFunction" {
    import { AstExpression, AstStatement } from "ast/ast";
    import { FunctionDescription, TypeRef } from "types/types";
    import { WriterContext } from "generator/Writer";
    export function writeCastedExpression(expression: AstExpression, to: TypeRef, ctx: WriterContext): string;
    export function writeStatement(f: AstStatement, self: string | null, returns: TypeRef | null, ctx: WriterContext): void;
    export function writeFunction(f: FunctionDescription, ctx: WriterContext): void;
    export function writeGetter(f: FunctionDescription, wCtx: WriterContext): void;
}
declare module "generator/writers/writeExpression" {
    import { AstExpression, AstId, AstLiteral } from "ast/ast";
    import { WriterContext } from "generator/Writer";
    export function writeValue(val: AstLiteral, wCtx: WriterContext): string;
    export function writePathExpression(path: AstId[]): string;
    export function writeExpression(f: AstExpression, wCtx: WriterContext): string;
}
declare module "abi/map" {
    import { AbiFunction } from "abi/AbiFunction";
    export const MapFunctions: Map<string, AbiFunction>;
}
declare module "types/resolveExpression" {
    import { AstExpression } from "ast/ast";
    import { CompilerContext } from "context/context";
    import { TypeRef } from "types/types";
    import { StatementContext } from "types/resolveStatements";
    export function getExpType(ctx: CompilerContext, exp: AstExpression): TypeRef;
    export function resolveExpression(exp: AstExpression, sctx: StatementContext, ctx: CompilerContext): CompilerContext;
    export function getAllExpressionTypes(ctx: CompilerContext): [string, string][];
}
declare module "optimizer/interpreter" {
    import { CompilerContext } from "context/context";
    import { AstAddress, AstBinaryOperation, AstBoolean, AstCell, AstCommentValue, AstCondition, AstConditional, AstConstantDef, AstContract, AstExpression, AstFieldAccess, AstFunctionDef, AstId, AstInitOf, AstLiteral, AstMessageDecl, AstMethodCall, AstModuleItem, AstNativeFunctionDecl, AstNull, AstNumber, AstOpBinary, AstOpUnary, AstPrimitiveTypeDecl, AstSimplifiedString, AstSlice, FactoryAst, AstStatement, AstStatementAssign, AstStatementAugmentedAssign, AstStatementDestruct, AstStatementExpression, AstStatementForEach, AstStatementLet, AstStatementRepeat, AstStatementReturn, AstStatementTry, AstStatementTryCatch, AstStatementUntil, AstStatementWhile, AstStaticCall, AstString, AstStructDecl, AstStructInstance, AstStructValue, AstTrait, AstUnaryOperation, AstStatementBlock } from "ast/ast";
    import { AstUtil } from "optimizer/util";
    import { Parser } from "grammar/grammar";
    import { SrcInfo } from "grammar/index";
    export function throwNonFatalErrorConstEval(msg: string, source: SrcInfo): never;
    type EvalResult = {
        kind: "ok";
        value: AstLiteral;
    } | {
        kind: "error";
        message: string;
    };
    export function ensureInt(val: AstExpression): AstNumber;
    export function ensureBoolean(val: AstExpression): AstBoolean;
    export function ensureString(val: AstExpression): AstString;
    export function ensureSimplifiedString(val: AstExpression): AstSimplifiedString;
    export function evalUnaryOp(op: AstUnaryOperation, valOperand: AstLiteral, source: SrcInfo, util: AstUtil): AstLiteral;
    export function evalBinaryOp(op: AstBinaryOperation, valLeft: AstLiteral, valRightContinuation: () => AstLiteral, // It needs to be a continuation, because some binary operators short-circuit
    source: SrcInfo, util: AstUtil): AstLiteral;
    export function interpretEscapeSequences(stringLiteral: string, source: SrcInfo): string;
    export type InterpreterConfig = {
        maxLoopIterations: bigint;
    };
    export function parseAndEvalExpression(sourceCode: string, ast?: FactoryAst, parser?: Parser, util?: AstUtil): EvalResult;
    export class Interpreter {
        private envStack;
        private context;
        private config;
        private util;
        constructor(util: AstUtil, context?: CompilerContext, config?: InterpreterConfig);
        interpretModuleItem(ast: AstModuleItem): void;
        interpretConstantDef(ast: AstConstantDef): void;
        interpretFunctionDef(ast: AstFunctionDef): void;
        interpretStructDecl(ast: AstStructDecl): void;
        interpretMessageDecl(ast: AstMessageDecl): void;
        interpretPrimitiveTypeDecl(ast: AstPrimitiveTypeDecl): void;
        interpretFunctionDecl(ast: AstNativeFunctionDecl): void;
        interpretContract(ast: AstContract): void;
        interpretTrait(ast: AstTrait): void;
        interpretExpression(ast: AstExpression): AstLiteral;
        interpretName(ast: AstId): AstLiteral;
        interpretMethodCall(ast: AstMethodCall): AstLiteral;
        interpretInitOf(ast: AstInitOf): AstLiteral;
        interpretNull(ast: AstNull): AstNull;
        interpretBoolean(ast: AstBoolean): AstBoolean;
        interpretNumber(ast: AstNumber): AstNumber;
        interpretString(ast: AstString): AstSimplifiedString;
        interpretCommentValue(ast: AstCommentValue): AstCommentValue;
        interpretSimplifiedString(ast: AstSimplifiedString): AstSimplifiedString;
        interpretAddress(ast: AstAddress): AstAddress;
        interpretCell(ast: AstCell): AstCell;
        interpretSlice(ast: AstSlice): AstSlice;
        interpretUnaryOp(ast: AstOpUnary): AstLiteral;
        interpretBinaryOp(ast: AstOpBinary): AstLiteral;
        interpretConditional(ast: AstConditional): AstLiteral;
        interpretStructInstance(ast: AstStructInstance): AstStructValue;
        interpretStructValue(ast: AstStructValue): AstStructValue;
        interpretFieldAccess(ast: AstFieldAccess): AstLiteral;
        interpretStaticCall(ast: AstStaticCall): AstLiteral;
        private evalStaticFunction;
        interpretStatement(ast: AstStatement): void;
        interpretLetStatement(ast: AstStatementLet): void;
        interpretDestructStatement(ast: AstStatementDestruct): void;
        interpretAssignStatement(ast: AstStatementAssign): void;
        interpretAugmentedAssignStatement(ast: AstStatementAugmentedAssign): void;
        interpretConditionStatement(ast: AstCondition): void;
        interpretExpressionStatement(ast: AstStatementExpression): void;
        interpretForEachStatement(ast: AstStatementForEach): void;
        interpretRepeatStatement(ast: AstStatementRepeat): void;
        interpretReturnStatement(ast: AstStatementReturn): void;
        interpretTryStatement(ast: AstStatementTry): void;
        interpretTryCatchStatement(ast: AstStatementTryCatch): void;
        interpretUntilStatement(ast: AstStatementUntil): void;
        interpretWhileStatement(ast: AstStatementWhile): void;
        interpretBlockStatement(ast: AstStatementBlock): void;
    }
}
declare module "optimizer/associative" {
    import { SrcInfo } from "grammar/index";
    import { AstBinaryOperation, AstExpression, AstLiteral } from "ast/ast";
    import { ExpressionTransformer, Rule } from "optimizer/types";
    import { AstUtil } from "optimizer/util";
    type TransformData = {
        simplifiedExpression: AstExpression;
        safetyCondition: boolean;
    };
    type Transform = (x1: AstExpression, c1: AstLiteral, c2: AstLiteral, util: AstUtil, s: SrcInfo) => TransformData;
    abstract class AssociativeRewriteRule extends Rule {
        private associativeOps;
        private commutativeOps;
        constructor();
        areAssociative(op1: AstBinaryOperation, op2: AstBinaryOperation): boolean;
        isCommutative(op: AstBinaryOperation): boolean;
    }
    abstract class AllowableOpRule extends AssociativeRewriteRule {
        private allowedOps;
        constructor();
        isAllowedOp(op: AstBinaryOperation): boolean;
        areAllowedOps(op: AstBinaryOperation[]): boolean;
    }
    export class AssociativeRule1 extends AllowableOpRule {
        applyRule(ast: AstExpression, { applyRules, util }: ExpressionTransformer): AstExpression;
    }
    export class AssociativeRule2 extends AllowableOpRule {
        applyRule(ast: AstExpression, { applyRules, util }: ExpressionTransformer): AstExpression;
    }
    export class AssociativeRule3 extends Rule {
        private leftAssocTransforms;
        private rightAssocTransforms;
        private rightCommuteTransforms;
        private leftCommuteTransforms;
        private standardAdditiveCondition;
        private shiftedAdditiveCondition;
        private oppositeAdditiveCondition;
        private standardMultiplicativeCondition;
        constructor();
        private lookupTransform;
        protected getLeftAssociativityTransform(keyOp1: AstBinaryOperation, keyOp2: AstBinaryOperation): Transform | undefined;
        protected getRightAssociativityTransform(keyOp1: AstBinaryOperation, keyOp2: AstBinaryOperation): Transform | undefined;
        protected getLeftCommutativityTransform(keyOp1: AstBinaryOperation, keyOp2: AstBinaryOperation): Transform | undefined;
        protected getRightCommutativityTransform(keyOp1: AstBinaryOperation, keyOp2: AstBinaryOperation): Transform | undefined;
        applyRule(ast: AstExpression, { applyRules, util }: ExpressionTransformer): AstExpression;
    }
}
declare module "optimizer/standardOptimizer" {
    import { AstExpression } from "ast/ast";
    import { ExpressionTransformer } from "optimizer/types";
    import { AstUtil } from "optimizer/util";
    export class StandardOptimizer implements ExpressionTransformer {
        util: AstUtil;
        private rules;
        constructor(util: AstUtil);
        applyRules: (ast: AstExpression) => AstExpression;
    }
}
declare module "optimizer/constEval" {
    import { CompilerContext } from "context/context";
    import { AstBinaryOperation, AstExpression, AstUnaryOperation, AstLiteral } from "ast/ast";
    import { AstUtil } from "optimizer/util";
    import { InterpreterConfig } from "optimizer/interpreter";
    import { SrcInfo } from "grammar/index";
    export const getOptimizer: (util: AstUtil) => {
        partiallyEvalUnaryOp: (op: AstUnaryOperation, operand: AstExpression, source: SrcInfo, ctx: CompilerContext) => AstExpression;
        partiallyEvalBinaryOp: (op: AstBinaryOperation, left: AstExpression, right: AstExpression, source: SrcInfo, ctx: CompilerContext) => AstExpression;
        partiallyEvalExpression: (ast: AstExpression, ctx: CompilerContext, interpreterConfig?: InterpreterConfig) => AstExpression;
    };
    export function evalConstantExpression(ast: AstExpression, ctx: CompilerContext, util: AstUtil, interpreterConfig?: InterpreterConfig): AstLiteral;
}
declare module "types/resolveABITypeRef" {
    import { ABITypeRef } from "@ton/core";
    import { AstFieldDecl } from "ast/ast";
    import { TypeRef } from "types/types";
    import { CompilerContext } from "context/context";
    import { SrcInfo } from "grammar/index";
    type FormatDef = Record<string, {
        type: string;
        format: string | number;
    } | undefined>;
    export const intMapKeyFormats: FormatDef;
    export const intMapValFormats: FormatDef;
    export function resolveABIType(src: AstFieldDecl): ABITypeRef;
    export function createABITypeRefFromTypeRef(ctx: CompilerContext, src: TypeRef, loc: SrcInfo): ABITypeRef;
}
declare module "types/isRuntimeType" {
    import { TypeRef } from "types/types";
    export function isRuntimeType(src: TypeRef): boolean;
}
declare module "types/resolveDescriptors" {
    import { AstId, AstType, AstTypeId, FactoryAst } from "ast/ast";
    import { CompilerContext } from "context/context";
    import { ConstantDescription, FunctionDescription, TypeDescription, TypeRef } from "types/types";
    export const toBounced: (type: string) => string;
    export function resolveTypeRef(ctx: CompilerContext, type: AstType): TypeRef;
    export function resolveDescriptors(ctx: CompilerContext, Ast: FactoryAst): CompilerContext;
    export function getType(ctx: CompilerContext, ident: AstId | AstTypeId | string): TypeDescription;
    export function getAllTypes(ctx: CompilerContext): TypeDescription[];
    export function getContracts(ctx: CompilerContext): string[];
    export function getStaticFunction(ctx: CompilerContext, name: string): FunctionDescription;
    export function hasStaticFunction(ctx: CompilerContext, name: string): boolean;
    export function getStaticConstant(ctx: CompilerContext, name: string): ConstantDescription;
    export function hasStaticConstant(ctx: CompilerContext, name: string): boolean;
    export function getAllStaticFunctions(ctx: CompilerContext): FunctionDescription[];
    export function getAllStaticConstants(ctx: CompilerContext): ConstantDescription[];
}
declare module "generator/writeReport" {
    import { CompilerContext } from "context/context";
    import { PackageFileFormat } from "packaging/fileFormat";
    export function writeReport(ctx: CompilerContext, pkg: PackageFileFormat): string;
}
declare module "imports/stdlib" {
    const files: Record<string, string>;
    export default files;
}
declare module "packaging/packageCode" {
    import { PackageFileFormat } from "packaging/fileFormat";
    export function packageCode(pkg: PackageFileFormat): string;
}
declare module "vfs/VirtualFileSystem" {
    export type VirtualFileSystem = {
        root: string;
        resolve(...path: string[]): string;
        exists(path: string): boolean;
        readFile(path: string): Buffer;
        writeFile(path: string, content: Buffer | string): void;
    };
}
declare module "vfs/createVirtualFileSystem" {
    import { VirtualFileSystem } from "vfs/VirtualFileSystem";
    export function createVirtualFileSystem(root: string, fs: Record<string, string>, readonly?: boolean): VirtualFileSystem;
}
declare module "abi/errors" {
    export const contractErrors: {
        null: {
            id: number;
            message: string;
        };
        invalidPrefix: {
            id: number;
            message: string;
        };
        invalidMessage: {
            id: number;
            message: string;
        };
        constraintsError: {
            id: number;
            message: string;
        };
        accessDenied: {
            id: number;
            message: string;
        };
        contractStopped: {
            id: number;
            message: string;
        };
        invalidArgument: {
            id: number;
            message: string;
        };
        codeNotFound: {
            id: number;
            message: string;
        };
    };
}
declare module "types/getSupportedInterfaces" {
    import { CompilerContext } from "context/context";
    import { TypeDescription } from "types/types";
    export function getSupportedInterfaces(type: TypeDescription, ctx: CompilerContext): string[];
}
declare module "generator/createABI" {
    import { ContractABI } from "@ton/core";
    import { CompilerContext } from "context/context";
    export function createABI(ctx: CompilerContext, name: string): ContractABI;
}
declare module "storage/StorageAllocation" {
    import { AllocationCell, AllocationOperation } from "storage/operation";
    export type StorageAllocation = {
        ops: AllocationOperation[];
        header: {
            value: number;
            bits: number;
        } | null;
        size: {
            bits: number;
            refs: number;
        };
        root: AllocationCell;
    };
}
declare module "storage/resolveAllocation" {
    import { CompilerContext } from "context/context";
    import { TypeDescription } from "types/types";
    import { StorageAllocation } from "storage/StorageAllocation";
    export function getAllocation(ctx: CompilerContext, name: string): StorageAllocation;
    export function getAllocations(ctx: CompilerContext): {
        allocation: StorageAllocation;
        type: TypeDescription;
    }[];
    export function getSortedTypes(ctx: CompilerContext): TypeDescription[];
    export function resolveAllocations(ctx: CompilerContext): CompilerContext;
}
declare module "generator/writers/resolveFuncTypeFromAbi" {
    import { ABITypeRef } from "@ton/core";
    import { WriterContext } from "generator/Writer";
    export function resolveFuncTypeFromAbi(fields: ABITypeRef[], ctx: WriterContext): string;
}
declare module "generator/writers/resolveFuncTypeFromAbiUnpack" {
    import { ABITypeRef } from "@ton/core";
    import { WriterContext } from "generator/Writer";
    export function resolveFuncTypeFromAbiUnpack(name: string, fields: {
        name: string;
        type: ABITypeRef;
    }[], ctx: WriterContext): string;
}
declare module "generator/writers/writeSerialization" {
    import { ItemOrigin } from "grammar/index";
    import { StorageAllocation } from "storage/StorageAllocation";
    import { WriterContext } from "generator/Writer";
    export function writeSerializer(name: string, forceInline: boolean, allocation: StorageAllocation, origin: ItemOrigin, ctx: WriterContext): void;
    export function writeOptionalSerializer(name: string, origin: ItemOrigin, ctx: WriterContext): void;
    export function writeParser(name: string, forceInline: boolean, allocation: StorageAllocation, origin: ItemOrigin, ctx: WriterContext): void;
    export function writeBouncedParser(name: string, forceInline: boolean, allocation: StorageAllocation, origin: ItemOrigin, ctx: WriterContext): void;
    export function writeOptionalParser(name: string, origin: ItemOrigin, ctx: WriterContext): void;
}
declare module "generator/writers/writeStdlib" {
    import { WriterContext } from "generator/Writer";
    export function writeStdlib(ctx: WriterContext): void;
}
declare module "generator/writers/resolveFuncFlatPack" {
    import { TypeDescription, TypeRef } from "types/types";
    import { WriterContext } from "generator/Writer";
    export function resolveFuncFlatPack(descriptor: TypeRef | TypeDescription | string, name: string, ctx: WriterContext, optional?: boolean): string[];
}
declare module "generator/writers/resolveFuncFlatTypes" {
    import { TypeDescription, TypeRef } from "types/types";
    import { WriterContext } from "generator/Writer";
    export function resolveFuncFlatTypes(descriptor: TypeRef | TypeDescription | string, ctx: WriterContext, optional?: boolean): string[];
}
declare module "generator/writers/writeAccessors" {
    import { ItemOrigin } from "grammar/index";
    import { TypeDescription } from "types/types";
    import { WriterContext } from "generator/Writer";
    export function writeAccessors(type: TypeDescription, origin: ItemOrigin, ctx: WriterContext): void;
}
declare module "utils/calculateIPFSlink" {
    export function calculateIPFSlink(data: Buffer): Promise<string>;
}
declare module "generator/emitter/createPadded" {
    export function createPadded(src: string): string;
}
declare module "generator/emitter/emit" {
    import { Maybe } from "@ton/core";
    import { WrittenFunction } from "generator/Writer";
    export function emit(args: {
        header?: Maybe<string>;
        functions?: Maybe<WrittenFunction[]>;
    }): string;
}
declare module "generator/writers/writeInterfaces" {
    import { TypeDescription } from "types/types";
    import { WriterContext } from "generator/Writer";
    export function writeInterfaces(type: TypeDescription, ctx: WriterContext): void;
}
declare module "generator/writers/writeRouter" {
    import { ReceiverDescription, TypeDescription } from "types/types";
    import { WriterContext } from "generator/Writer";
    export function commentPseudoOpcode(comment: string): string;
    export function writeRouter(type: TypeDescription, kind: "internal" | "external", ctx: WriterContext): void;
    export function writeReceiver(self: TypeDescription, f: ReceiverDescription, ctx: WriterContext): void;
}
declare module "generator/writers/writeContract" {
    import { ItemOrigin } from "grammar/index";
    import { InitDescription, TypeDescription } from "types/types";
    import { WriterContext } from "generator/Writer";
    export function writeStorageOps(type: TypeDescription, origin: ItemOrigin, ctx: WriterContext): void;
    export function writeInit(t: TypeDescription, init: InitDescription, ctx: WriterContext): void;
    export function writeMainContract(type: TypeDescription, abiLink: string, ctx: WriterContext): void;
}
declare module "utils/idToHex" {
    export function idToHex(id: number): string;
}
declare module "generator/writeProgram" {
    import { CompilerContext } from "context/context";
    import { ContractABI } from "@ton/core";
    export function writeProgram(ctx: CompilerContext, abiSrc: ContractABI, basename: string, debug?: boolean): Promise<{
        entrypoint: string;
        files: {
            name: string;
            code: string;
        }[];
        abi: string;
    }>;
}
declare module "pipeline/compile" {
    import { CompilerContext } from "context/context";
    export function compile(ctx: CompilerContext, name: string, basename: string): Promise<{
        output: {
            entrypoint: string;
            files: {
                name: string;
                code: string;
            }[];
            abi: string;
        };
        ctx: CompilerContext;
    }>;
}
declare module "types/resolveSignatures" {
    import { CompilerContext } from "context/context";
    import { FactoryAst } from "ast/ast";
    export function resolveSignatures(ctx: CompilerContext, Ast: FactoryAst): CompilerContext;
}
declare module "imports/parseImportPath" {
    export function parseImportPath(src: string): string[];
}
declare module "imports/resolveLibrary" {
    import { VirtualFileSystem } from "vfs/VirtualFileSystem";
    type ResolveLibraryArgs = {
        path: string;
        name: string;
        project: VirtualFileSystem;
        stdlib: VirtualFileSystem;
    };
    type ResolveLibraryResult = {
        ok: true;
        path: string;
        kind: "func" | "tact";
        source: "project" | "stdlib";
    } | {
        ok: false;
    };
    export function resolveLibrary(args: ResolveLibraryArgs): ResolveLibraryResult;
}
declare module "imports/resolveImports" {
    import { ItemOrigin, Parser } from "grammar/index";
    import { VirtualFileSystem } from "vfs/VirtualFileSystem";
    export function resolveImports(args: {
        entrypoint: string;
        project: VirtualFileSystem;
        stdlib: VirtualFileSystem;
        parser: Parser;
    }): {
        tact: {
            code: string;
            path: string;
            origin: ItemOrigin;
        }[];
        func: {
            code: string;
            path: string;
            origin: ItemOrigin;
        }[];
    };
}
declare module "pipeline/precompile" {
    import { CompilerContext } from "context/context";
    import { VirtualFileSystem } from "vfs/VirtualFileSystem";
    import { AstModule, FactoryAst } from "ast/ast";
    import { Parser } from "grammar/index";
    export function precompile(ctx: CompilerContext, project: VirtualFileSystem, stdlib: VirtualFileSystem, entrypoint: string, parser: Parser, ast: FactoryAst, parsedModules?: AstModule[]): CompilerContext;
}
declare module "pipeline/version" {
    export function __DANGER__disableVersionNumber(): void;
    export function getCompilerVersion(): string;
}
declare module "pipeline/build" {
    import { ConfigProject } from "config/parseConfig";
    import { CompilerContext } from "context/context";
    import { ILogger } from "context/logger";
    import { VirtualFileSystem } from "vfs/VirtualFileSystem";
    import { FactoryAst } from "ast/ast";
    import { TactErrorCollection } from "error/errors";
    import { Parser } from "grammar/index";
    export function enableFeatures(ctx: CompilerContext, logger: ILogger, config: ConfigProject): CompilerContext;
    export function build(args: {
        config: ConfigProject;
        project: VirtualFileSystem;
        stdlib: string | VirtualFileSystem;
        logger?: ILogger;
        parser?: Parser;
        ast?: FactoryAst;
    }): Promise<{
        ok: boolean;
        error: TactErrorCollection[];
    }>;
}
declare module "browser" {
    import { Config } from "config/parseConfig";
    import { ILogger } from "context/logger";
    export function run(args: {
        config: Config;
        files: Record<string, string>;
        logger?: ILogger;
    }): Promise<{
        ok: boolean;
        error: Error[];
    }>;
}
declare module "ast/sort" {
    import { AstFunctionAttribute, AstConstantAttribute, AstContractAttribute, AstNode } from "ast/ast";
    /**
     * Provides utilities to sort lists of AST nodes.
     */
    export class AstSorter {
        static sort<T extends AstNode>(items: T[]): T[];
        private static sortPrimitiveTypeDecls;
        static sortAttributes<T extends AstConstantAttribute | AstContractAttribute | AstFunctionAttribute>(attributes: T[]): T[];
    }
}
declare module "ast/hash" {
    import { AstNode } from "ast/ast";
    export type AstHash = string;
    /**
     * Provides functionality to hash AST nodes regardless of identifiers.
     */
    export class AstHasher {
        private readonly sort;
        private constructor();
        static make(params?: Partial<{
            sort: boolean;
        }>): AstHasher;
        hash(node: AstNode): AstHash;
        /**
         * Generates a string that is used to create a hash.
         */
        private getHashData;
        private hashDestructIdentifiers;
        private hashStructDecl;
        private hashMessageDecl;
        private hashFunctionDef;
        private hashAsmFunctionDef;
        private hashConstantDef;
        private hashTrait;
        private hashContract;
        private hashFields;
        private hashParams;
        private hashTypedParameter;
        private hashAttributes;
        private hashContractAttributes;
        private hashIds;
        private hashDeclarations;
        private hashStatements;
        private hashInstructions;
        private hashStructFieldInitializer;
        private hashFieldDecl;
        private hashContractInit;
        private hashNativeFunctionDecl;
        private hashReceiver;
        private hashFunctionDecl;
        private hashImport;
        private hashConstantDecl;
        private hashModule;
        private hashImports;
        private hashModuleItems;
    }
}
declare module "ast/rename" {
    import { AstModuleItem, AstModule, AstNode } from "ast/ast";
    /**
     * An utility class that provides alpha-renaming and topological sort functionality
     * for the AST comparison.
     */
    export class AstRenamer {
        private sort;
        private currentIdx;
        private renamed;
        private givenNames;
        private constructor();
        static make(params?: Partial<{
            sort: boolean;
        }>): AstRenamer;
        /**
         * Renames the given node based on its AST.
         */
        renameModule(module: AstModule): AstNode;
        private nextIdx;
        /**
         * Generates a new unique node name.
         */
        private generateName;
        /**
         * Tries to get an identifier based on the node definition.
         */
        private getName;
        /**
         * Sets new or an existent name based on node's hash.
         */
        private setName;
        renameModuleItems(items: AstModuleItem[]): AstModuleItem[];
        /**
         * Lexicographically sort items based on their kinds and then by their names.
         */
        private sortModuleItems;
        /**
         * Changes the name of a top-level/contract/trait element without inspecting its body.
         */
        private changeItemName;
        /**
         * Renames the contents of an AstModuleItem based on its kind.
         */
        private renameModuleItemContents;
        /**
         * Sorts attributes within an item if available.
         */
        private sortAttributes;
        /**
         * Renames the contents of a function.
         */
        private renameFunctionContents;
        /**
         * Renames getter's methodId expression.
         */
        private renameFunctionAttributes;
        /**
         * Renames the contents of a constant, focusing on the initializer.
         */
        private renameConstantContents;
        /**
         * Renames the contents of a trait, including its declarations.
         */
        private renameTraitContents;
        /**
         * Renames the contents of a contract, including its declarations and parameters.
         */
        private renameContractContents;
        private renameStatements;
        private renameStatement;
        private renameExpression;
        private renameStructFieldInitializer;
    }
}
declare module "ast/compare" {
    import { AstNode } from "ast/ast";
    /**
     * Provides an API to compare two AST nodes with extra options.
     */
    export class AstComparator {
        private readonly sort;
        private readonly canonicalize;
        /**
         * @param sort Topologically sort AST entries before comparing. Should be enabled
         *        in order to handle duplicate entries shuffled in the source code.
         * @param canonicalize Introduce de Brujin indices for local bindings to handle
         *        duplicate code with different names. Should be enabled in order to
         *        treat duplicate entries with different names as the same elements.
         */
        private constructor();
        static make(options?: Partial<{
            sort: boolean;
            canonicalize: boolean;
        }>): AstComparator;
        compare(node1: AstNode, node2: AstNode): boolean;
        private compareNullableNodes;
        private compareArray;
        private compareNullableArray;
        private compareAsmInstructions;
        private compareAttributes;
        private compareReceiverKinds;
    }
}
/// <amd-module name="@ijstech/tact" />
declare module "@ijstech/tact" {
    export { enableFeatures, build } from "pipeline/build";
    export { precompile } from "pipeline/precompile";
    export { TactError, TactCompilationError, TactInternalCompilerError, TactConstEvalError, TactErrorCollection, } from "error/errors";
    export { optionsSchema, projectSchema, configSchema, } from "config/parseConfig";
    export { AstSorter } from "ast/sort";
    export { AstRenamer } from "ast/rename";
    export { AstHasher } from "ast/hash";
    export { AstComparator } from "ast/compare";
    export { Config, ConfigProject, parseConfig, verifyConfig, } from "config/parseConfig";
    export { PackageFileFormat } from "packaging/fileFormat";
    export { VirtualFileSystem } from "vfs/VirtualFileSystem";
    export { createVirtualFileSystem } from "vfs/createVirtualFileSystem";
    export * from "browser";
    export * from "context/logger";
    export * from "error/errors";
}
declare module "vfs/createNodeFileSystem" {
    import { VirtualFileSystem } from "vfs/VirtualFileSystem";
    export function createNodeFileSystem(root: string, readonly?: boolean): VirtualFileSystem;
}
declare module "node" {
    import { ConfigProject } from "config/parseConfig";
    type AdditionalCliOptions = {
        mode?: ConfigProject["mode"];
    };
    export function run(args: {
        fileName?: string;
        configPath?: string;
        projectNames?: string[];
        additionalCliOptions?: AdditionalCliOptions;
        suppressLog?: boolean;
    }): Promise<{
        ok: boolean;
        error: Error[];
    }>;
    export { createNodeFileSystem } from "vfs/createNodeFileSystem";
    export { parseAndEvalExpression } from "optimizer/interpreter";
    export { showValue } from "types/types";
}
declare module "error/display-to-json" {
    import { SrcInfo } from "grammar/index";
    import { ErrorDisplay } from "error/display";
    export type ErrorJson = ErrorSub | ErrorText | ErrorLink | ErrorAt;
    export type ErrorText = {
        kind: "text";
        text: string;
    };
    export type ErrorSub = {
        kind: "sub";
        parts: string[];
        subst: ErrorJson[];
    };
    export type ErrorLink = {
        kind: "link";
        text: string;
        loc: SrcInfo;
    };
    export type ErrorAt = {
        kind: "at";
        body: ErrorJson;
        loc: SrcInfo;
    };
    export const errorJsonEqual: (left: ErrorJson, right: ErrorJson) => boolean;
    export const displayToJson: ErrorDisplay<ErrorJson>;
}
declare module "utils/loadCases" {
    export function loadCases(src: string): {
        name: string;
        code: string;
    }[];
}
declare module "utils/testKey" {
    export function testKey(seed: string): import("@ton/crypto").KeyPair;
}

                /// <amd-module name="@ijstech/tact" />
export { enableFeatures, build } from "./pipeline/build";
export { precompile } from "./pipeline/precompile";
export { TactError, TactCompilationError, TactInternalCompilerError, TactConstEvalError, TactErrorCollection, } from "./error/errors";
export { optionsSchema, projectSchema, configSchema, } from "./config/parseConfig";
export { AstSorter } from "./ast/sort";
export { AstRenamer } from "./ast/rename";
export { AstHasher } from "./ast/hash";
export { AstComparator } from "./ast/compare";
export { Config, ConfigProject, parseConfig, verifyConfig, } from "./config/parseConfig";
export { PackageFileFormat } from "./packaging/fileFormat";
export { VirtualFileSystem } from "./vfs/VirtualFileSystem";
export { createVirtualFileSystem } from "./vfs/createVirtualFileSystem";
export * from "./browser";
export * from "./context/logger";
export * from "./error/errors";

            };
 export = TactCompiler;