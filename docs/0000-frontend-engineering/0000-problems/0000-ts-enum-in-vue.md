在Vue文件的`<template>`模板中，由于编译过程的限制，无法直接使用TypeScript的枚举(enum)。Vue模板中的数据绑定只能使用在JavaScript作用域内的变量和表达式。

解决办法：

将enum定义放到另一个`script`标签中，在这个标签中不使用`setup`语法糖，将这个定义enum的script标签放到前面。

```vue
<script lang="ts">
enum directionEnum {
	UP = 'UP'
	DOWN = 'DOWN'
	LEFT = 'LEFT'
	RIGHT = 'RIGHT'
}
</script>

<script setup lang="ts">
import xxxx from 'xxx'
import { computed, ref } from 'vue'

defineOptions({
	name: 'Allenice'
})
...
</script>
```

> [!NOTE]
> 如果eslint的`import/first`规则格式化又将enum定义挪到一起，可以将`import`语句和enum定义放到同一个`script`标签中
> ```vue
> <script lang="ts">
> import xxxx from 'xxx'
> import { computed, ref } from 'vue'
> 
> enum directionEnum {
> 	UP = 'UP'
> 	DOWN = 'DOWN'
> 	LEFT = 'LEFT'
> 	RIGHT = 'RIGHT'
> }
> </script>
> 
> <script setup lang="ts">
> defineOptions({
> 	name: 'Allenice'
> })
> ...
> </script>
> ```