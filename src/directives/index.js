export const trim = {
  update(el, binding, vNode) {
    // @ts-ignore
    vNode.componentInstance.handleBlur = () => {
      // @ts-ignore
      if (vNode.data.model.value) {
        // @ts-ignore
        vNode.componentInstance.$emit('input', vNode.data.model.value.replace(/^\s+|\s+$/gm, ''))
      }
    }
  }
}
