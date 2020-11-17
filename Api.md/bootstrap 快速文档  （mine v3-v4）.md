# bootstrap 快速文档  （mine v3-v4）

## 起步

为了确保适当的绘制和触屏缩放，需要在 `<head>` 之中**添加 viewport 元数据标签**。

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

在移动设备浏览器上，通过为视口（viewport）设置 meta 属性为 `user-scalable=no` 可以禁用其缩放（zooming）功能

> 推荐 
>
> ```html
> <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
> ```

## 布局

Bootstrap 需要为页面内容和栅格系统包裹一个 `.container` 容器。我们提供了两个作此用处的类。注意，由于 `padding` 等属性的原因，这两种 容器类不能互相嵌套。

`.container` 类用于固定宽度并支持响应式布局的容器。

```
<div class="container">
  ...
</div>
```

`.container-fluid` 类用于 100% 宽度，占据全部视口（viewport）的容器。

```
<div class="container-fluid">
  ...
</div>
```

## 栅格系统

#### 栅格布局分为12列

- “行（row）”必须包含在 `.container` （固定宽度）或 `.container-fluid` （100% 宽度）中，以便为其赋予合适的排列（aligment）和内补（padding）。
- 通过“行（row）”在水平方向创建一组“列（column）”。
- 你的内容应当放置于“列（column）”内，并且，只有“列（column）”可以作为行（row）”的直接子元素。
- 类似 `.row` 和 `.col-xs-4` 这种预定义的类，可以用来快速创建栅格布局。Bootstrap 源码中定义的 mixin 也可以用来创建语义化的布局。
- 通过为“列（column）”设置 `padding` 属性，从而创建列与列之间的间隔（gutter）。通过为 `.row` 元素设置负值 `margin` 从而抵消掉为 `.container` 元素设置的 `padding`，也就间接为“行（row）”所包含的“列（column）”抵消掉了`padding`。
- 负值的 margin就是下面的示例为什么是向外突出的原因。在栅格列中的内容排成一行。
- 栅格系统中的列是通过指定1到12的值来表示其跨越的范围。例如，三个等宽的列可以使用三个 `.col-xs-4` 来创建。
- 如果一“行（row）”中包含了的“列（column）”大于 12，多余的“列（column）”所在的元素将被作为一个整体另起一行排列。
- 栅格类适用于与屏幕宽度大于或等于分界点大小的设备 ， 并且针对小屏幕设备覆盖栅格类。 因此，在元素上应用任何 `.col-md-*` 栅格类适用于与屏幕宽度大于或等于分界点大小的设备 ， 并且针对小屏幕设备覆盖栅格类。 因此，在元素上应用任何 `.col-lg-*` 不存在， 也影响大屏幕设备。

## 媒体查询

在栅格系统中，我们在 Less 文件中使用以下媒体查询（media query）来创建关键的分界点阈值。

```
/* 超小屏幕（手机，小于 768px） */
/* 没有任何媒体查询相关的代码，因为这在 Bootstrap 中是默认的（还记得 Bootstrap 是移动设备优先的吗？） */

/* 小屏幕（平板，大于等于 768px） */
@media (min-width: @screen-sm-min) { ... }

/* 中等屏幕（桌面显示器，大于等于 992px） */
@media (min-width: @screen-md-min) { ... }

/* 大屏幕（大桌面显示器，大于等于 1200px） */
@media (min-width: @screen-lg-min) { ... }
```

我们偶尔也会在媒体查询代码中包含 `max-width` 从而将 CSS 的影响限制在更小范围的屏幕大小之内。

```
@media (max-width: @screen-xs-max) { ... }
@media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) { ... }
@media (min-width: @screen-md-min) and (max-width: @screen-md-max) { ... }
@media (min-width: @screen-lg-min) { ... }
```

## 栅格参数

通过下表可以详细查看 Bootstrap 的栅格系统是如何在多种屏幕设备上工作的。

|                       | 超小屏幕 手机 (<768px)     | 小屏幕 平板 (≥768px)                                | 中等屏幕 桌面显示器 (≥992px) | 大屏幕 大桌面显示器 (≥1200px) |
| :-------------------- | :------------------------- | :-------------------------------------------------- | :--------------------------- | ----------------------------- |
| 栅格系统行为          | 总是水平排列               | 开始是堆叠在一起的，当大于这些阈值时将变为水平排列C |                              |                               |
| `.container` 最大宽度 | None （自动）              | 750px                                               | 970px                        | 1170px                        |
| 类前缀                | `.col-xs-`                 | `.col-sm-`                                          | `.col-md-`                   | `.col-lg-`                    |
| 列（column）数        | 12                         |                                                     |                              |                               |
| 最大列（column）宽    | 自动                       | ~62px                                               | ~81px                        | ~97px                         |
| 槽（gutter）宽        | 30px （每列左右均有 15px） |                                                     |                              |                               |
| 可嵌套                | 是                         |                                                     |                              |                               |
| 偏移（Offsets）       | 是                         |                                                     |                              |                               |
| 列排序                | 是                         |                                                     |                              |                               |

###　实例：流式布局容器

将最外面的布局元素 `.container` 修改为 `.container-fluid`，就可以将固定宽度的栅格布局转换为 100% 宽度的布局。

```
<div class="container-fluid">
  <div class="row">
    ...
  </div>
</div>
```

### 实例：多余的列（column）将另起一行排列

如果在一个 `.row` 内包含的列（column）大于12个，包含多余列（column）的元素将作为一个整体单元被另起一行排列。

.col-xs-9

.col-xs-4
Since 9 + 4 = 13 > 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.

.col-xs-6
Subsequent columns continue along the new line.

```
<div class="row">
  <div class="col-xs-9">.col-xs-9</div>
  <div class="col-xs-4">.col-xs-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.</div>
  <div class="col-xs-6">.col-xs-6<br>Subsequent columns continue along the new line.</div>
</div>
```

## 响应式列重置

即便有上面给出的四组栅格class，你也不免会碰到一些问题，例如，在某些阈值时，某些列可能会出现比别的列高的情况。为了克服这一问题，建议联合使用 `.clearfix` 和 [响应式工具类](https://v3.bootcss.com/css/#responsive-utilities)。

.col-xs-6 .col-sm-3
Resize your viewport or check it out on your phone for an example.

.col-xs-6 .col-sm-3

.col-xs-6 .col-sm-3

.col-xs-6 .col-sm-3

```
<div class="row">
  <div class="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
  <div class="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>

  <!-- Add the extra clearfix for only the required viewport -->
  <div class="clearfix visible-xs-block"></div>

  <div class="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
  <div class="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
</div>
```

除了列在分界点清除响应， 您可能需要 **重置偏移, 后推或前拉某个列**。请看此[栅格实例](https://v3.bootcss.com/examples/grid/)。

```
<div class="row">
  <div class="col-sm-5 col-md-6">.col-sm-5 .col-md-6</div>
  <div class="col-sm-5 col-sm-offset-2 col-md-6 col-md-offset-0">.col-sm-5 .col-sm-offset-2 .col-md-6 .col-md-offset-0</div>
</div>

<div class="row">
  <div class="col-sm-6 col-md-5 col-lg-6">.col-sm-6 .col-md-5 .col-lg-6</div>
  <div class="col-sm-6 col-md-5 col-md-offset-2 col-lg-6 col-lg-offset-0">.col-sm-6 .col-md-5 .col-md-offset-2 .col-lg-6 .col-lg-offset-0</div>
</div>
```

### 列偏移

使用 `.col-md-offset-*` 类可以将列向右侧偏移。这些类实际是通过使用 `*` 选择器为当前元素增加了左侧的边距（margin）。例如，`.col-md-offset-4` 类将 `.col-md-4` 元素向右侧偏移了4个列（column）的宽度。

.col-md-4

.col-md-4 .col-md-offset-4

.col-md-3 .col-md-offset-3

.col-md-3 .col-md-offset-3

.col-md-6 .col-md-offset-3

```
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
</div>
<div class="row">
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
</div>
<div class="row">
  <div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
</div>
```

You can also override offsets from lower grid tiers with `.col-*-offset-0` classes.

```
<div class="row">
  <div class="col-xs-6 col-sm-4">
  </div>
  <div class="col-xs-6 col-sm-4">
  </div>
  <div class="col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-0">
  </div>
</div>
```

### 嵌套列

为了使用内置的栅格系统将内容再次嵌套，可以通过添加一个新的 `.row` 元素和一系列 `.col-sm-*` 元素到已经存在的 `.col-sm-*` 元素内。被嵌套的行（row）所包含的列（column）的个数不能超过12（其实，没有要求你必须占满12列）。

Level 1: .col-sm-9

Level 2: .col-xs-8 .col-sm-6

Level 2: .col-xs-4 .col-sm-6

```
<div class="row">
  <div class="col-sm-9">
    Level 1: .col-sm-9
    <div class="row">
      <div class="col-xs-8 col-sm-6">
        Level 2: .col-xs-8 .col-sm-6
      </div>
      <div class="col-xs-4 col-sm-6">
        Level 2: .col-xs-4 .col-sm-6
      </div>
    </div>
  </div>
</div>
```

### 列排序

通过使用 `.col-md-push-*` 和 `.col-md-pull-*` 类就可以很容易的改变列（column）的顺序。

.col-md-9 .col-md-push-3

.col-md-3 .col-md-pull-9

```
<div class="row">
  <div class="col-md-9 col-md-push-3">.col-md-9 .col-md-push-3</div>
  <div class="col-md-3 col-md-pull-9">.col-md-3 .col-md-pull-9</div>
</div>
```

# 排版

## 标题

HTML 中的所有标题标签，`<h1>` 到 `<h6>` 均可使用。另外，还提供了 `.h1` 到 `.h6` 类，为的是给内联（inline）属性的文本赋予标题的样式。

```html
<h1>h1. Bootstrap heading</h1>
<h2>h2. Bootstrap heading</h2>
<h3>h3. Bootstrap heading</h3>
<h4>h4. Bootstrap heading</h4>
<h5>h5. Bootstrap heading</h5>
<h6>h6. Bootstrap heading</h6>
```

在标题内还可以包含 `<small>` 标签或赋予 `.small` 类的元素，可以用来标记副标题。

```html
<h1>h1. Bootstrap heading <small>Secondary text</small></h1>
<h2>h2. Bootstrap heading <small>Secondary text</small></h2>
<h3>h3. Bootstrap heading <small>Secondary text</small></h3>
<h4>h4. Bootstrap heading <small>Secondary text</small></h4>
<h5>h5. Bootstrap heading <small>Secondary text</small></h5>
<h6>h6. Bootstrap heading <small>Secondary text</small></h6>
```

## 页面主体

Bootstrap 将全局 `font-size` 设置为 **14px**，`line-height` 设置为 **1.428**。这些属性直接赋予 `<body>` 元素和所有段落元素。另外，`<p>` （段落）元素还被设置了等于 1/2 行高（即 10px）的底部外边距（margin）。

Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus auctor fringilla.

Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.

```
<p>...</p>
```

### 中心内容

通过添加 `.lead` 类可以让段落突出显示。

Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.

```
<p class="lead">...</p>
```

## 内联文本元素

### 高亮

高亮文本

```
You can use the mark tag to <mark>highlight</mark> text.
```

### 被删除的文本

对于被删除的文本使用 `<del>` 标签。

~~This line of text is meant to be treated as deleted text.~~

```
<del>This line of text is meant to be treated as deleted text.</del>
```

### 无用文本

对于没用的文本使用 `<s>` 标签。类似于`<del>`标签

~~This line of text is meant to be treated as deleted text.~~

```
<s>This line of text is meant to be treated as no longer accurate.</s>
```

### 插入文本

额外插入的文本使用 `<ins>` 标签。`带下划线文本`

```
<ins>This line of text is meant to be treated as an addition to the document.</ins>
```

### 带下划线的文本

为文本添加下划线，使用 `<u>` 标签。

This line of text will render as underlined

```
<u>This line of text will render as underlined</u>
```

利用 HTML 自带的表示强调意味的标签来为文本增添少量样式。

### 小号文本

对于不需要强调的inline或block类型的文本，使用 `<small>` 标签包裹，其内的文本将被设置为父容器字体大小的 85%。标题元素中嵌套的 `<small>` 元素被设置不同的 `font-size` 。

你还可以为行内元素赋予 `.small` 类以代替任何 `<small>` 元素。

This line of text is meant to be treated as fine print.

```
<small>This line of text is meant to be treated as fine print.</small>
```

### 着重

通过增加 font-weight 值强调一段文本。

The following snippet of text is **rendered as bold text**.

```html
<strong>rendered as bold text</strong>
```

### 斜体

用斜体强调一段文本。

The following snippet of text is *rendered as italicized text*.

```html
<em>rendered as italicized text</em>
```

## 对齐

通过文本对齐类，可以简单方便的将文字重新对齐。

Left aligned text. `text-align:left`

Center aligned text.`text-align:center`

Right aligned text.`text-align:right`

Justified text.

No wrap text. `white-space: nowrap !important;`

```html
<p class="text-left">Left aligned text.</p>
<p class="text-center">Center aligned text.</p>
<p class="text-right">Right aligned text.</p>
<p class="text-justify">Justified text.</p>
<p class="text-nowrap">No wrap text.</p>
```

## 改变大小写

通过这几个类可以改变文本的大小写。

lowercased text.

UPPERCASED TEXT.

Capitalized Text.

```html
<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">Capitalized text.</p>
```

## 引用

在你的文档中引用其他来源的内容。

### 默认样式的引用

将任何 HTML 元素包裹在 `<blockquote>` 中即可表现为引用样式。对于直接引用，我们建议用 `<p>` 标签。

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.

```
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
</blockquote>
```

### 多种引用样式

对于标准样式的 `<blockquote>`，可以通过几个简单的变体就能改变风格和内容。

#### 命名来源

添加 `<footer>` 用于标明引用来源。来源的名称可以包裹进 `<cite>`标签中。

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
>
> Someone famous in Source Title

```html
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
```

#### 另一种展示风格

通过赋予 `.blockquote-reverse` 类可以让引用呈现内容右对齐的效果。

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
>
> Someone famous in Source Title

```html
<blockquote class="blockquote-reverse">
  ...
</blockquote>
```