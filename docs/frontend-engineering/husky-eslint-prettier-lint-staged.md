## 前言

团队开发中，我们常常需要统一代码风格，比如命名、缩进、代码块间的空行间隔，是否有尾逗号，是否添加分号等等，有一些风格需要开发者主动遵守，有一部分可以通过格式化工具在项目中进行约束。

本文的工具用于规范化项目中的代码，包括eslint、prettier、husky、lint-staged、commitlint

| 工具        | 作用                                                                  |
| ----------- | --------------------------------------------------------------------- |
| eslint      | 校验代码风格和质量，可以执行部分格式化规则                            |
| prettier    | 按照prettier内置的风格进行格式化，格式化覆盖了eslint没有规定的规则    |
| husky       | 配置git钩子，用于在commit的之前校验代码，在commit的时候校验提交信息等 |
| lint-staged | 可以获取到git暂存区的代码，配合husky和eslint进行校验                  |
| commitlint  | 校验git commit信息，与husky配合使用                                   |
| commitizen  | 通过命令选项式进行git提交                                             |

以上工具可以单独安装并配置，也可以采用一键安装脚本进行安装。一键安装的脚本可以采用开源的，如阿里巴巴开发的[f2elint](https://www.npmjs.com/package/f2elint)，也可以根据自己团队风格，自己编写一个脚本。

下面介绍各个工具的作用以及配置

## eslint配置

[官方文档](https://zh-hans.eslint.org/docs/latest/use/getting-started)

### 安装

可以使用该命令安装并配置 ESLint：

```
npm init @eslint/config
```

在vscode上搜索扩展`dbaeumer.vscode-eslint`并安装

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

Prettier 是一个格式化工具，格式化风格由prettier自己决定，用户只能有少量[option](https://prettier.io/docs/en/options)可以修改。支持js、ts、jsx、angular、vue、css、less、scss、html等等文件的格式化。

### 安装

::: code-group

```bash [npm]
npm install -D prettier
```

```bash [yarn]
yarn add -D prettier
```

```bash [pnpm]
pnpm add -D prettier
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

相关配置参考[prettier-options](https://prettier.io/docs/en/options)，一般只使用以下几个配置：

```
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true
}
```

3. 代码编辑器安装prettier扩展

在vscode上搜索扩展`esbenp.prettier-vscode`并安装

## eslint和prettier

### eslint 和 prettier 冲突

eslint和prettier规则不一致可能会导致冲突，举个例子，prettier配置了代码缩进是4个空格，而eslint中[indent]规则是2个空格，那么在prettier格式化成4个空格缩进后，eslint会校验不通过。

可以通过以下方式解决冲突：

1. 在eslint中关闭冲突的规则
2. 将prettier的规则加入到eslint规则中

#### 在eslint中关闭冲突的规则

在eslint配置中，可以使用 [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) 扩展来禁用冲突的规则。

1. 安装[eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)依赖

::: code-group

```bash [npm]
npm install -D eslint-config-prettier
```

```bash [yarn]
yarn add -D eslint-config-prettier
```

```bash [pnpm]
pnpm add -D eslint-config-prettier
```

:::

2. 在eslint配置文件中扩展`eslint-config-prettier`

```js{8}
module.exports = {
    ...
    extends: [
        'eslint:recommended',
        'standard-with-typescript',
        'plugin:vue/vue3-essential',
        'plugin:markdown/recommended',
        'prettier',
    ],
    ...
}
```

在配置完成后，eslint禁用冲突的规则，不会进行冲突规则的校验和格式化，冲突规则的格式化交给prettier完成。

> [!WARNING]
> 需要注意，prettier扩展一定要放在`extends`配置的最后一项，如果前面的扩展中打开了一些冲突规则，将prettier扩展放到最后才能做到覆盖前面的冲突规则

在eslint扩展中加入`prettier`后，会发现，之前prettier格式化后eslint报缩进错误的红色波浪线消失了。

#### 将prettier的规则加入到eslint规则中

将prettier的规则加入到eslint规则中，eslint校验的规则与prettier格式化规则一致时，便没有冲突了

在eslint配置中添加插件[eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)，就可以实现将prettier的规则加入到eslint，随后eslint会有一条规则叫`prettier/prettier`。

#### 解决方案选择

【在eslint中关闭冲突规则】和【将prettier的规则加入到eslint规则中】两种方案

### 疑问：为什么eslint可以执行代码格式化，还需要prettier？

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
