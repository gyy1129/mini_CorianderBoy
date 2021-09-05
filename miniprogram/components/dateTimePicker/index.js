Component({
  properties: {
    timevalue: {
      type: Array,
      value: "标题"
    },
    years: {
      type: Array,
      value: "年"
    },
    months: {
      type: Array,
      value: "月"
    }
  },
  data: {},
  methods: {
    //取消
    canslebtn() {
      this.triggerEvent("canslebtn");
    },
    //确认
    closebtn() {
      this.triggerEvent("closebtn");
    },
    // 调用父组件  事件
    fnbindChange(e) {
      this.triggerEvent("bindChangeEvent", e.detail);
    }
  },
})