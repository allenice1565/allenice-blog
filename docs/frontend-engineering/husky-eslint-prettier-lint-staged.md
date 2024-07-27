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

相比于eslint，eslint必须要用户配置某一项规则，才能进行格式化，否则不能进行格式化，而作为使用者，很难做到熟悉每一条eslint规则，因此不可能单独配置每一条规则而导致很多细致的点无法统一代码风格。

而prettier不同的是，prettier的大部分格式化规则内置在prettier插件中，对于每个细节都有定义，只提供了少量的[option](https://prettier.io/docs/en/options)提供给用户修改，这样可以做到团队开发的代码风格统一，因此我们需要使用prettier配合eslint进行代码风格和质量的规范。

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

## eslint和prettier

### eslint 和 prettier 冲突

参考文章 [解决eslint和prettier冲突](https://cloud.tencent.com/developer/article/2346141?shareByChannel=link)

eslint可以执行部分格式化功能，prettier也是格式化，二者功能会有部分重叠，如果二者同时格式化，可能会导致冲突，举个例子，prettier配置了代码缩进是4个空格，而eslint中[indent]规则是2个空格，那么在prettier格式化后，代码会有eslint校验不通过的红色波浪线提示。

可以通过以下方式解决冲突：

1. 关闭冲突的eslint规则
2. 调整eslint和prettier的执行顺序，先执行prettier，再执行eslint
3. 手动调整冲突规则，使得冲突的规则一致

#### 关闭eslint冲突规则

使用 [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) 插件来禁用 ESLint 中与 Prettier 冲突的规则，该插件会将 Prettier 的规则应用到 ESLint 中，并自动禁用冲突的规则。

1. 安装[eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)插件

```
npm install -D eslint-config-prettier
```

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

在配置完成后，eslint将会加入prettier的规则，同时禁用会冲突的规则。

> [!WARNING]
> 需要注意，prettier扩展一定要放在`extends`配置的最后一项，才能做到覆盖前面的扩展设置的冲突规则，不然可能会被后续的扩展打开冲突的规则，进而导致prettier格式化后，eslint仍校验飘红

在eslint扩展中加入`prettier`后，会发现，之前prettier格式化后eslint报缩进错误的红色波浪线消失了。如果没有消失，重启vscode就可以生效。

#### 调整执行顺序

先执行prettier，再执行eslint，即时有冲突，在两次格式化后，代码也是满足eslint校验的，不会飘红。

具体的实施流程是：

1. 将prettier的格式化规则通过[eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)插件添加到eslint规则中
2. 不直接使用prettier格式化文件，而是使用eslint格式化文件，由于加入了prettier的所有规则，因此使用eslint格式化与使用直接prettier的效果是一致的，由于将prettier规则放到了eslint中，保证了格式化时同时满足prettier的风格，也满足了eslint风格和质量校验，也就解决了冲突

> [!WARNING]
> 需要注意，在文件保存的时候要配置eslint作为默认格式化工具，才能起到上述效果，不然依然是使用prettier进行的格式化。
> 举个例子：
> 如果使用prettier作为编辑器的格式化工具，同时eslint的rules自定义了一些冲突规则，在文件保存时，prettier会先执行，执行后的结果是不满足冲突规则的，此时代码会波浪线飘红
> 因此，需要配置eslint作为项目的格式化工具

配置eslint作为项目格式化工具

在vscode的项目配置文件中进行设置，如果是其他代码编辑器应该也有对应的设置，以vscode为例，配置文件位于项目根目录下的`.vscode/settings.json`

```json{3}
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "eslint.codeActionsOnSave.mode": "all",
    "eslint.format.enable": true,
    "eslint.run": "onSave"
}

```

#### 手动调整冲突规则

手动调整冲突规则指的是将eslint和prettier的规则设置成一致的。

这个解决办法理论上可行，实际操作中，使用者很难掌握所有的规则细节。

#### 解决方案选择

上述三种解决方案忽略最后一种，对比一下**关闭eslint冲突规则**和**调整执行顺序**两种方案的特点

-   关闭eslint冲突规则：编辑器默认格式化由prettier来做，eslint只校验代码质量部分，代码风格不进行校验，这是prettier官网推荐的方式，在写代码的过程中不会出现冲突规则的飘红
-   调整执行顺序：将pretter作为了eslint的一部分，格式化的时候效率会比【关闭eslint冲突规则】方案低，在写代码过程中如果没有满足冲突规则会飘红

网上很多教程中都使用【调整执行顺序】的方式来解决冲突问题，下面说说我个人的想法，【关闭eslint冲突规则】方案配置非常简单，只需要添加[eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)扩展，默认使用prettier作为格式化工具，也符合prettier官网的推荐。需要注意的就是不要在eslint配置文件rules中再添加一些冲突规则了，不然冲突问题又会出现，而【调整执行顺序】方案不会有这个问题，但就是

### prettier负责格式化，eslint负责校验语法等错误

> ESLint/TSLint/stylelint等等linters有两类规则：
>
> -   格式化规则：[max-len](https://eslint.org/docs/rules/max-len), [no-mixed-spaces-and-tabs](https://eslint.org/docs/rules/no-mixed-spaces-and-tabs), [keyword-spacing](https://eslint.org/docs/rules/keyword-spacing), [comma-style](https://eslint.org/docs/rules/comma-style)…
>     prettier可以替代这一类规则，prettier会以一致的风格格式化整个文件，格式化之后，会一定能满足上述规则，因此不会有相应的校验错误产生，开发者可以放心的写
> -   代码质量规则：[no-unused-vars](https://eslint.org/docs/rules/no-unused-vars), [no-extra-bind](https://eslint.org/docs/rules/no-extra-bind), [no-implicit-globals](https://eslint.org/docs/rules/no-implicit-globals), [prefer-promise-reject-errors](https://eslint.org/docs/rules/prefer-promise-reject-errors)…
>     prettier不会处理这类规则，这类规则是由linters进行校验

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
