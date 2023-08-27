# elementUI

## el-dialog

### destroy-on-close

关闭时销毁 `Dialog` 中的元素，把这个属性改为`true`时并没有生效

在添加员工时，员工编号的输入框是根据员工编号规则是否启用来确定是否禁用的，如果在启用/禁用员工编号规则前打开了弹框，表单的验证规则不会正确绑定，因为元素没有销毁，`destroy-on-close`属性没有生效

**解决方法：给`dialog`添加`v-if`（但是这样打开弹框时会闪一下）**

如果在el-dialog使用v-if，直接改变visible绑定的变量时不会触发close事件



### close事件

点击`dialog`右上角的叉，直接改变弹框绑定的`visible`字段为`false`不会触发`close`事件，当需要在关闭弹框时做一些操作时，例如：清楚验证，重置表单等，不能只写在`close`事件里；在打开弹框时做这些操作页面显示不友好，会让用户看到上一个表单内容（附件等）


## el-select

当点开一个`el-select`下拉框时，再在同一个页面点击`treeselect`下拉框时，没有触发`el-select`的失去焦点事件，`el-select`的下拉框不会关闭。

**解决方法：监听`treeselect`的`open`事件，手动关闭其他的`el-select`下拉框。`el-date-picker`同理，但是要调用`hidePicker`方法**



## MessageBox

`MessageBox.alert`不能关闭，不会触发`then`和`catch`，`beforeClose`也不会执行，导致弹框一直存在，需要手动关闭，`MessageBox.close()`

```javascript
store.dispatch('user/resetToken').then(() => {
    if (messageBoxFlag) MessageBox.close()
    messageBoxFlag = MessageBox.alert(`${res.msg}`, '提示', {
        type: 'error',
        showClose: false,
        showCancelButton: false,
        showConfirmButton: false
    })
})
```



## el-input

控制一个`el-input`只能输入数字时，如果使用`oninput`，使用中文输入法的时候会覆盖`v-model`，这个输入框的双向绑定会失效，还会覆盖已经输入的数字，导致校验失效。
**解决方法：1 把`oninput`替换为`onchange`。2 使用`onkeyup`和`blur`事件（`$event.target.value`）**

```html
<el-input
	v-model="count"
    onChange="value=value.replace(/[^\d]/g,'')"
/>

<el-input
	v-model="count"
    onkeyup="value=value.replace(/[^\d]/g,'')"
    @blur="count=$event.target.value,userCountChagne(temp.userCount)"
/>
```

