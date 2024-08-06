## 问题

开发中遇到了一个奇怪的事儿，表格有一列操作列，每一行是一个删除按钮，按钮是用的icon组件作为插槽插入表格中，icon已经渲染出来了，但是icon却没有显示。

把icon换成数字或其他字符，都可以显示，把icon放到表格外面也可以显示。

## 原因

icon底层使用的是`svg`元素，`svg`元素内部有一个`defs`元素，`defs`中有一个`clipPath`元素，这个元素有一个`id`，每一行的icon都有这个相同的id，html要求id唯一，但是这里出现了很多相同的id

出现相同id的时候，会以最先找到的元素作为匹配的id元素，表格中的`svg`未显示的原因是除了操作列有这些`svg`元素外，[element-plus](https://element-plus.org/zh-CN/component/table.html)中的table组件会自动在表格最左侧插入一列类名为`hidden-columns`的列，这列的数据是空的，但是如果设置了插槽，插槽也会出现在这一列中，因此`hidden-columns`元素中也包含了相同id的元素，同时`hidden-columns`元素设置了`visibility: hidden;`样式，因此表格操作列的`svg`全部都没法显示

## 解决办法

1. 最好的解决办法是使得每个`svg`中的`clipPath`的id设置为唯一的，但是由于我们封装组件使用的都是相同的svg元素，很难做到id唯一。

2. 有一个取巧的办法，可以在表格外层放一个`display: none;`的相同`svg`，这样表格中的`svg`也能显示出来

3. 不使用element-plus的表格组件，换个组件库^_^