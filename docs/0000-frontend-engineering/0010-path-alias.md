
> [!NOTE]
> `__dirname`变量属于`commonjs`规范，在`esm`中没法使用这个变量
>
> `esm`中的`__dirname`等价于`url.fileURLToPath(import.meta.url)`
>
> `esm`要拼接路径使用`url.fileURLToPath(new URL('./relative-path', import.meta.url))`

## vite 别名

```js
// vite.config.js

import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@hooks': fileURLToPath(new URL('./src/_hooks', import.meta.url))
        }
    }
})
```

## ts 别名

```json
// tsconfig.json

{
    "compilerOptions": {
        "paths": {
            "@hooks/*": ["./src/_hooks/*"]
        }
    }
}
```

## vitepress 别名

```js
// .vitepress/config.ts

import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    vite: {
        resolve: {
            alias: {
                '@hooks': fileURLToPath(new URL('../src/_hooks', import.meta.url))
            }
        }
    }
})
```

## nuxt 别名

[官方文档](https://nuxt.com/docs/api/nuxt-config#alias)

> [!NOTE]
> 如果使用的是webpack构建工具，图片、CSS等非JS的资源别名配置必须要是`~`开头

> [!NOTE]
> 在`nuxt.config.js`中配置的别名，会自动生成到`.nuxt/tsconfig.json`中，在项目的`tsconfig.json`中要继承`.nuxt/tsconfig.json`才能自动补全

```js
import { fileURLToPath } from 'node:url'

export default {
  alias: {
    'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
    'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
    'data': fileURLToPath(new URL('./assets/other/data', import.meta.url))
  }
}

```

## pnpm 别名

参考文档：

-   [为终端命令设置alias别名](https://blog.legalhub.cn/2020/07/14/%E4%B8%BA%E7%BB%88%E7%AB%AF%E5%91%BD%E4%BB%A4%E8%AE%BE%E7%BD%AEalias%E5%88%AB%E5%90%8D/)
-   [pnpm官方文档](https://pnpm.io/zh/installation#%E4%BD%BF%E7%94%A8%E8%BE%83%E7%9F%AD%E7%9A%84%E5%88%AB%E5%90%8D)

### 在 POSIX 系统上添加永久别名

> 官方文档说修改`.bashrc`文件，我试了一下，没有生效，不清楚原因。而修改`.bash_profile`就可以生效

在git bash终端中，环境是linux环境，在此环境下设置。

方法一：

在`C:/Users/xxx/`目录下新建`.bash_profile`，然后输入`alias pn=pnpm`，保存并退出。

方法二：

在git bash终端输入`vim ~/.bash_profile`，然后输入`alias pn=pnpm`，保存并退出。

方法三：

在git安装目录下，找到文件`/Git/etc/bash.bashrc`，在文件后添加`alias pn=pnpm`

### 在 Powershell (Windows) 中添加永久别名：

> Powershell我没有添加过，不怎么使用Powershell。

在具有管理员权限的 Powershell 窗口中，执行：

```
notepad $profile.AllUsersAllHosts
```

在打开的 `profile.ps1` 文件中，放入：

```
set-alias -name pn -value pnpm
```

保存文件然后关闭窗口。 您可能需要重新打开 Powershell 窗口才能使别名生效。
