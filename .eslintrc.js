const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    project: path.resolve(
      __dirname,
      "./tsconfig.json",
    ),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: "module",
    createDefaultProgram: true,
  },
  globals: {
    __dirname: true,
    module: true,
    BUILD_TYPE: true,
    TARGET_ENV_TYPE: true,
    API_BASE_URL: true,
  },
  overrides: [
    {
      files: ["*.config.js"],
      rules: {
        "@typescript-eslint/no-var-requires":
          "off",
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "newline-after-var": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ],
      },
    },
  },
  rules: {
    // override airbnb
    "no-console": ["off", "always"],
    "no-use-before-define": [
      "error",
      {functions: false},
    ],
    "operator-linebreak": [
      "error",
      "before",
      {overrides: {"=": "after"}},
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {devDependencies: true},
    ],
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],


    // prettier rules
    "max-len": [
      "error",
      {
        code: 80,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    indent: ["error", 2],
    semi: ["error", "always"],
    "comma-dangle": ["error", "only-multiline"],
    "object-curly-spacing": ["error", "never"],
    quotes: ["error", "double"],
    "arrow-parens": ["error", "always"],
    "linebreak-style": 0,

    // @typescript-eslint  overrides
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescsript-eslint/no-explicit-any": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/ban-ts-ignore": 0,

    "no-undefined": 0,
    complexity: ["error", 10],
    "func-names": 0,
    "class-methods-use-this": 0,

    // tsc already catches these kind of errors
    "no-undef": 0,

    "arrow-body-style": ["error", "always"],

    indent: ["error", 2, {SwitchCase: 1}],
    "array-bracket-newline": [
      "error",
      {minItems: 2},
    ],
    "array-element-newline": [
      "error",
      {minItems: 2},
    ],
    "object-curly-newline": [
      "error",
      {
        /* ObjectExpression: "always",
        ObjectPattern: {multiline: true}, */
        ImportDeclaration: {
          multiline: true,
          minProperties: 2,
          consistent: true,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 2,
        },
      },
    ],
    "object-property-newline": "error",
  },
};
