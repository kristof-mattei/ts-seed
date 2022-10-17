// eslint-disable-next-line no-undef
module.exports = {
    // parser: , // Specifies the ESLint parser, use default (which can handle JS)
    env: {},
    overrides: [
        {
            // the TS parser and TS specific rules
            files: ["src/**/*.ts"],
            parser: "@typescript-eslint/parser",
            settings: {
                "import/resolver": {
                    typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
                },
            },
            parserOptions: {
                ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
                sourceType: "module", // Allows for the use of imports
                // eslint-disable-next-line no-undef
                tsconfigRootDir: __dirname,
                project: "./tsconfig.json",
                ecmaFeatures: {
                    jsx: true,
                },
            },
            extends: [
                "plugin:import/typescript",
                "plugin:@typescript-eslint/recommended",
                // 'react-app',
                "prettier", // prettier now has built in support for typescript in eslint-config-prettier 8
            ],
            rules: {
                "@typescript-eslint/array-type": ["error", { default: "array" }],
                "@typescript-eslint/await-thenable": "error",
                "@typescript-eslint/adjacent-overload-signatures": "error",
                "@typescript-eslint/consistent-type-assertions": "error",
                "@typescript-eslint/consistent-type-definitions": "error",
                "@typescript-eslint/consistent-type-imports": "error",
                "@typescript-eslint/no-extraneous-class": "error",
                "@typescript-eslint/explicit-function-return-type": "error",
                "@typescript-eslint/explicit-member-accessibility": ["error"],
                "@typescript-eslint/naming-convention": [
                    "error",
                    {
                        selector: "enumMember",
                        format: ["camelCase", "PascalCase", "UPPER_CASE"],
                    },
                ],
                "@typescript-eslint/member-ordering": [
                    "error",
                    {
                        default: [
                            // Index signature
                            "signature",
                            // Fields
                            "private-field",
                            "public-field",
                            "protected-field",
                            // Constructors
                            "public-constructor",
                            "protected-constructor",
                            "private-constructor",
                            // Methods
                            "public-method",
                            "protected-method",
                            "private-method",
                        ],
                    },
                ],
                "@typescript-eslint/no-array-constructor": "error",
                "@typescript-eslint/no-empty-interface": "error",
                "@typescript-eslint/no-explicit-any": "error",
                "@typescript-eslint/no-extra-semi": "error",
                "@typescript-eslint/no-floating-promises": "error",
                "@typescript-eslint/no-for-in-array": "error",
                "@typescript-eslint/no-misused-promises": "error",
                "@typescript-eslint/no-non-null-assertion": "error",
                "@typescript-eslint/no-parameter-properties": ["error", { allows: ["readonly"] }],
                "@typescript-eslint/no-require-imports": "error",
                "@typescript-eslint/no-this-alias": "error",
                "@typescript-eslint/no-throw-literal": "error",
                "@typescript-eslint/no-unnecessary-type-assertion": "error",
                "@typescript-eslint/no-unused-expressions": "error",
                "@typescript-eslint/no-useless-constructor": "error",
                "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", ignoreRestSiblings: true }],
                "@typescript-eslint/no-shadow": "error",
                "@typescript-eslint/prefer-for-of": "error",
                "@typescript-eslint/prefer-includes": "error",
                "@typescript-eslint/prefer-regexp-exec": "warn",
                "@typescript-eslint/prefer-string-starts-ends-with": "error",
                "@typescript-eslint/promise-function-async": "off",
                "@typescript-eslint/require-await": "error",
                "@typescript-eslint/restrict-plus-operands": "error",
                "@typescript-eslint/sort-type-union-intersection-members": "error",
                "@typescript-eslint/unbound-method": "error",
                "@typescript-eslint/unified-signatures": "error",
                "@typescript-eslint/explicit-module-boundary-types": "error",
            },
        },
    ],
    extends: [
        "eslint:recommended",
        // "plugin:react/recommended",
        "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    plugins: ["import"],
    parserOptions: {
        ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
        sourceType: "module",
    },
    ignorePatterns: ["!.prettierrc.js", "!.dependency-cruiser.js"],
    rules: {
        "sort-imports": [
            "error",
            {
                ignoreDeclarationSort: true,
            },
        ],
        "import/no-unresolved": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        eqeqeq: 2,
        "no-fallthrough": "error",
        "no-return-await": "error",
        "require-await": "error",
        "prefer-template": "error",
        curly: "error",
        "arrow-body-style": ["error", "always"],
        quotes: [
            "error",
            "double",
            {
                avoidEscape: true,
                allowTemplateLiterals: false,
            },
        ],
        "eol-last": ["error", "always"],
        "object-shorthand": ["error", "always"],
        "no-useless-rename": [
            "error",
            {
                ignoreDestructuring: false,
                ignoreImport: false,
                ignoreExport: false,
            },
        ],
        "class-methods-use-this": "off",
        indent: ["error", 4],
        "max-len": "off",
        "no-dupe-class-members": "off",
        "no-extra-semi": "off",
        "no-new": "off",
        "no-param-reassign": "off",
        "no-underscore-dangle": "off",
        "no-useless-constructor": "off",
        "no-unused-expressions": "error",
        "no-restricted-syntax": ["error", "DebuggerStatement", "LabeledStatement", "WithStatement"],
        "no-use-before-define": "off",
        "no-shadow": "off",
        "import/prefer-default-export": "off",
        "import/no-cycle": "off",
        "import/no-extraneous-dependencies": "off",
        "import/extensions": ["error", "never"],
        "import/order": [
            "error",
            {
                "newlines-between": "always-and-inside-groups",
                alphabetize: { order: "asc", caseInsensitive: true },
            },
        ],
    },
    settings: {
        react: {
            version: "18.0",
        },
    },
};
