# 工作中遇到的


## TreeSelect

TreeSelect组件没有blur事件，绑定rule的时候，trigger要写为input



## 模板合并

工单多人流程节点时，之前的逻辑是，打开弹框时获取最新的模板内容，如果两个人在另一个人没提交时都打开了，提交时如果后端返回模板内容改变了那么前端会重新获取最新的内容，但是在赋值时没有考虑到当前填的内容和最新的内容合并，就把前一个人填的东西覆盖了。

**修改：如果作业证改变除了给旧内容字段赋值，还要把当前填的内容和最新的内容合并在提交**



## ucharts

词云图没有`tooltip`功能，监听`@getIndex`方法动态绑定`style`显示

```javascript
getIndex(item) {
    if (item.currentIndex > -1) {
        const index = item.currentIndex
        const x = item.event.x
        const y = item.event.y
        this.currentData = this.hazardTypeData.series[index]
        this.toolTipLeft = x
        this.toolTipTop = y
        this.toolTipShow = true
    } else {
        this.toolTipShow = false
    }
}
```


## 创建模板复制粘贴整行

首先获取鼠标点击位置：

1. 获取鼠标在一个`overflow：scroll`元素里面的点击时的位置 = 元素的`scrollTop` + 鼠标事件对象的`clientY` - 元素距离浏览器页面最上方的距离
2. 遍历元素所有子元素的高度求出粘贴的位置

```javascript
handlePasteRow(e) {
      if (this.copyRowInfo) {
        this.clearFormTableMenu()
        this.pasteTop = e.clientY + 'px'
        this.pasteLeft = e.clientX + 'px'
        // 鼠标在元素内的位置 225是editForm到页面顶部的位置
        const mouseY = this.$refs.editForm.children[0].children[0].scrollTop + e.clientY - 225
        let height = 0
        const rowList = this.$refs.editForm.children[0].children[0].children
        for (let i = 0; i < rowList.length; i++) {
          height += rowList[i].clientHeight
          if (mouseY <= height) {
            this.pasteRowIndex = i // 找到要插入的位置
            break
          }
        }
        if (mouseY > height) this.pasteRowIndex = rowList.length
        this.pasteRowVisible = true
      }
}
```

