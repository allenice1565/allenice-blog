## 前言

团队开发中，我们常常需要统一代码风格，比如命名、缩进、代码块间的空行间隔，是否有尾逗号，是否添加分号等等，有一些风格需要开发者主动遵守，有一部分可以通过格式化工具在项目中进行约束。

本文的工具用于规范化项目中的代码，包括eslint、prettier、husky、lint-staged、commitlint

| 工具        | 作用                                                                |
| ----------- | ------------------------------------------------------------------- |
| eslint      | 格式化js代码，也可以通过配置插件，格式化vue代码                     |
| prettier    | eslint格式化的能力有限，有一些需要prettier来处理                    |
| husky       | 配置git钩子，用于在commit的之前校验代码，在commit的时候校验提交信息 |
| lint-staged | 可以获取到git暂存区的代码，配合husky和eslint进行校验                |
| commitlint  | 校验git commit信息，与husky配合使用                                 |

我们需要熟悉每一个工具的配置，最后在实际工作中，我们可能会封装一个脚本，来进行自动化的项目配置，比例阿里巴巴开发的[f2elint](https://www.npmjs.com/package/f2elint)。个人开发的话，可以直接使用现成的工具，比如[f2elint](https://www.npmjs.com/package/f2elint)，而在公司里多半是要统一一个自己公司的风格，可以封装一个属于自己团队的脚本，以后这个团队创建不同的项目，都使用相同的规范化配置，以达到风格统一的目的。

## eslint配置

[官方文档](https://zh-hans.eslint.org/docs/latest/use/getting-started)

### 安装

可以使用该命令安装并配置 ESLint：

```
npm init @eslint/config
```

### 规则配置

```
{
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```

`"semi"` 和 `"quotes"` 是 ESLint [规则](https://zh-hans.eslint.org/docs/latest/rules/)的名称。第一个值代表规则的错误级别，有以下几种可供选择：

-   `"off"` 或 `0` - 关闭该规则，不会对该规则进行校验
-   `"warn"` 或 `1` - 启用并警告（不影响现有代码），能够通过husky校验，起到一个提示的作用
-   `"error"` 或 `2` - 启用并报错（错误代码 1），不能通过husky校验

### markdown插件

插件名称：`eslint-plugin-markdown`

```
npm install -D eslint-plugin-markdown
```

安装好插件依赖后，在`.eslintrc.js`文件中扩展添加：

```js{10}
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "standard-with-typescript",
        "plugin:vue/vue3-essential",
        "plugin:markdown/recommended",
    ],
	...
}
```

## prettier配置

[官方文档](https://prettier.io/docs/en/)

Prettier 是一个格式化工具，格式化风格由工具决定，用户可配置的规则不多。支持js、ts、jsx、angular、vue、css、less、scss、html等等文件的格式化。

### 安装

::: code-group

```bash [npm]
npm install --save-dev --save-exact prettier
```

```bash [yarn]
yarn add --dev --exact prettier
```

```bash [pnpm]
pnpm add --save-dev --save-exact prettier
```

```bash [bun]
bun add --dev --exact prettier
```

:::

### 配置

1. vscode添加配置，保存文件的时候执行格式化。

在项目根目录创建文件 `.vscode/settings.json` 并添加如下内容：

```
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
}
```

> [!IMPORTANT]
> 修改`.vscode/settings.json`文件后，没有生效的话，**请重启vscode！**

2. prettier配置文件

项目根目录下添加`.prettierrc`文件，文件格式为json

相关配置参考[官网](https://prettier.io/docs/en/options)，一般只使用以下几个配置：

```
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true
}
```

## eslint和prettier分工

### prettier负责格式化，eslint负责校验语法等错误

> ESLint/TSLint/stylelint等等linters有两类规则：
>
> -   格式化规则：[max-len](https://eslint.org/docs/rules/max-len), [no-mixed-spaces-and-tabs](https://eslint.org/docs/rules/no-mixed-spaces-and-tabs), [keyword-spacing](https://eslint.org/docs/rules/keyword-spacing), [comma-style](https://eslint.org/docs/rules/comma-style)…
>     prettier可以替代这一类规则，prettier会以一致的风格格式化整个文件，格式化之后，会一定能满足上述规则，因此不会有相应的校验错误产生，开发者可以放心的写
> -   代码质量规则：[no-unused-vars](https://eslint.org/docs/rules/no-unused-vars), [no-extra-bind](https://eslint.org/docs/rules/no-extra-bind), [no-implicit-globals](https://eslint.org/docs/rules/no-implicit-globals), [prefer-promise-reject-errors](https://eslint.org/docs/rules/prefer-promise-reject-errors)…
>     prettier不会处理这类规则，这类规则是由linters进行校验

### 为什么eslint可以执行代码格式化，还需要prettier？

eslint只是指定格式化规则，比如[max-len](https://eslint.org/docs/rules/max-len)规则，只要满足eslint规则，eslint就不会进行格式化，而满足这条规则的写法有很多，容易造成风格不统一，比如：

```
import {
    Ref,
computed,
nextTick,
    watch,
toRef,
    inject,
onMounted,
    onBeforeUnmount
} from 'vue'
```

### eslint-config-prettier
