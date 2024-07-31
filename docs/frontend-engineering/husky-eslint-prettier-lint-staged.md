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

【在eslint中关闭冲突规则】和【将prettier的规则加入到eslint规则中】两种方案都可以，prettier官网推荐前者，前者速度快些。

最开始我也是觉得【在eslint中关闭冲突规则】的方案更加简单，效率也高，后来发现，eslint中一些插件提供了prettier风格以外的风格，比如vue组件属性顺序格式化，js import导入的顺序格式化，这些是prettier做不了的，如果只是单纯的把代码风格交给prettier，代码质量交给eslint，那么一些特定场景的代码风格就处理不了，所以还是得选择后者【将prettier的规则加入到eslint规则中】。

将prettier的规则加入到eslint规则中后，将默认的格式化设置为eslint，则可以在保存文件的时候进行格式化。

```.vscode/settings.json
{
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.formatOnSave": true,
    "eslint.format.enable": true
}

```

### 疑问：为什么eslint可以执行代码格式化，还需要prettier？

eslint格式化特点就是配置了哪些规则，就只会按照相应的规则格式化，，而prettier对于代码风格这方面做的非常细致，团队内部所有人使用prettier格式化后的结果可以做到风格一致。这一点eslint做不到，比如下面代码：

```
import { ref, computed, nextTick, watch, toRef, inject, onMounted, onBeforeUnmount } from 'vue'
```

这样写能通过eslint校验

```
import {
  ref, computed, nextTick, watch,
  toRef,
  inject, onMounted, onBeforeUnmount
} from 'vue'
```

这样写也能通过eslint校验

使用prettier格式化后，只会有一个结果：

```
import {
    ref,
    computed,
    nextTick,
    watch,
    toRef,
    inject,
    onMounted,
    onBeforeUnmount,
} from 'vue'
```

> [!TIP]
> 只靠eslint很难做到统一团队内的代码风格，我们很难熟悉每一个格式化的规则并添加到eslint规则中。
> 因此，我们需要eslint和prettier相互配合，prettier来完成统一代码风格的任务，eslint校验代码质量。

## husky

[官方文档](https://typicode.github.io/husky/zh/)

上面的eslint和prettier只是完成了团队中每一个人的代码规范，但是不能约束大家提交到git远程服务器的代码都是符合这个规范的，因此我们要对git提交过程进行校验以及格式化

husky是一个[git钩子](https://git-scm.com/docs/githooks)工具，可以在git操作的时候执行一段脚本。我们可以依赖[git钩子](https://git-scm.com/docs/githooks)进行代码质量和风格校验，提交信息的格式校验。

### 安装

::: code-group

```bash [npm]
npm install --save-dev husky
```

```bash [pnpm]
pnpm add --save-dev husky
```

```bash [yarn]
yarn add --dev husky
# Add pinst ONLY if your package is not private
yarn add --dev pinst
```

```bash [bun]
bun add --dev husky
```

:::

### 初始化

推荐使用`husky init`命令初始化，这个命令在`.husky/`可以创建`pre-commit`脚本并且在`package.json`中更新`prepare`脚本命令

::: code-group

```bash [npm]
npx husky init
```

```bash [pnpm]
pnpm exec husky init
```

```bash [yarn]
# Due to specific caveats and differences with other package managers,
# refer to the How To section.
```

```bash [bun]
bunx husky init
```

:::

初始化后，husky自动创建了`pre-commit`脚本，这个脚本在提交代码的时候执行，可以看到在`.husky/pre-commit`文件中，husky写入了`npm`脚本命令，在提交代码的时候，这个脚本命令会执行。

后面可以配合lint-staged和commitlint工具分别校验暂存区代码以及提交信息。

## lint-staged

[lint-staged](https://github.com/lint-staged/lint-staged)可以拿到git暂存区的代码，然后执行代码质量和风格检查。

### 安装

::: code-group

```bash [npm]
npm install --save-dev lint-staged # requires further setup
```

```bash [pnpm]
pnpm add -D lint-staged
```

:::

### 准备工作

1. 安装lint-staged
2. 安装husky并设置pre-commit钩子
3. 安装eslint和prettier
4. 配置lint-staged以执行eslint和prettier

> [!WARNING]
> lint-staged`v15.0.0`版本开始不支持nodejs 16，nodejs版本最低需要`18.12.0`

### 配置

#### 配置方式

1. 在package.json中配置`lint-staged`对象
2. `.lintstagedrc`文件，可以通过扩展名决定是JSON还是YML语法：
    - `.lintstagedrc.json`
    - `.lintstagedrc.yaml`
    - `.lintstagedrc.yml`
3. `.lintstagedrc.js` 或者 `lint-staged.config.js`文件

#### 配置规则

配置是一个对象，对象的属性名是一个`glob`匹配模式（参考[micromatch](https://github.com/micromatch/micromatch)），对象的值是要运行的命令代码。js配置文件也可以导出一个函数，参考[Using JS configuration files](https://github.com/lint-staged/lint-staged?tab=readme-ov-file#using-js-configuration-files)。

如果同一个匹配规则下需要执行多条命令，对象的值可以是一个数组。

#### 案例

`package.json`

```
{
  "lint-staged": {
    "*": "your-cmd"
  }
}
```

`.lintstagedrc`

```
{
  "*": "your-cmd"
}
```

这个配置里面的`your-cmd`会在被执行的时候传入当前暂存区的文件作为参数。就像这样：`your-cmd file1.ext file2.ext`

#### 并发执行

默认情况下，lint-staged会同时执行匹配到的文件

如果要对同一组文件运行多个命令，可以使用数组语法来确保命令按顺序运行

```
{
  "*.ts": ["prettier --list-different", "eslint"],
  "*.md": "prettier --list-different"
}
```

当配置的 glob 重叠且任务对文件进行编辑时，请特别注意。例如，在此配置中prettier，可能会尝试同时eslint对同一文件进行更改，从而导致竞争条件

```
{
  "*": "prettier --write",
  "*.ts": "eslint --fix"
}
```

可以使用否定模式和数组语法来解决它：

```
{
  "!(*.ts)": "prettier --write",
  "*.ts": ["eslint --fix", "prettier --write"]
}
```

另一个示例是，任务对文件进行编辑并且 glob 匹配多个文件但不重叠：

```
{
  "*.css": ["stylelint --fix", "prettier --write"],
  "*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "!(*.css|*.js|*.jsx)": ["prettier --write"]
}
```

如果有必要，您可以使用限制并发性`--concurrent <number>`或者用完全禁用它`--concurrent false`

## commitlint

### 安装

::: code-group

```bash [npm]
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

```bash [yarn]
yarn add --dev @commitlint/{cli,config-conventional}
```

```bash [pnpm]
pnpm add --save-dev @commitlint/{cli,config-conventional}
```

:::

### 配置

[官方文档](https://commitlint.js.org/reference/configuration.html)


要使用commitlint，你需要设置commit-msg钩子，可以使用[Husky](https://typicode.github.io/husky/)的commit-msg钩子。

初始化husky后，可以使用命令行创建commit-msg钩子

```bash
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

也可以在`.husky`目录下手动创建文件`commit-msg`



安装依赖：
``` bash
pnpm add -D conventional-changelog-atom @commitlint/format
```
在项目根目录下添加文件`commitlint.config.mjs`，

```js
export default {
    extends: ['@commitlint/config-conventional'],
    parserPreset: 'conventional-changelog-atom',
    formatter: '@commitlint/format',
    rules: {
        'type-enum': [2, 'always', ['foo']],
    },
    ignores: [
        (commit) => {
            return commit.trim() === '测试提交'
        },
    ],
    defaultIgnores: true,
    helpUrl:
        'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
    prompt: {
        messages: {},
        questions: {
            type: {
                description: 'please input type:',
            },
        },
    },
}
```

### 提交类型枚举
```js
[
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test',
];
```

## commitizen

[commitizen](https://github.com/commitizen/cz-cli)可以用命令行进行选项式的提交

### 安装

```bash
pnpm install -D commitizen
```

初始化

```bash
npx commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact
```
注意，如果用的是pnpm包管理器，则使用`--pnpm`参数，不加参数，默认是npm。如果是yarn，则使用`--yarn`

### 交互式提交

将待提交文件添加到暂存区后，执行下面的命令
```
npx cz
```
如果是全局安装的`commitizen`的话，则直接使用`cz`命令进行提交

### 适配器

如果要更改提问内容以及对提交信息做处理，可以自行编写adapter，参考[流行的adapter](https://github.com/commitizen/cz-cli?tab=readme-ov-file#adapters)修改