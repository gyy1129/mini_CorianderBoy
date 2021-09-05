Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
    likeStatus: {
      type: Boolean,
      value: false
    },
    collectStatus: {
      type: Boolean,
      value: false
    }
  },
  data: {
    nolike:"../../images/love.png",
    yeslike:"../../images/love1.png",
    nocollect:"../../images/collections.png",
    yescollect:"../../images/collections1.png"
  },
  methods: {
    toDetails(e) {
      const id =  e.currentTarget.dataset.id
      this.triggerEvent("toDetails", id);
    },
    likeChoose(e) {
      const id =  e.currentTarget.dataset.id
      this.triggerEvent("likeChoose", id)
    },
    collectChoose(e) {
      const id =  e.currentTarget.dataset.id
      this.triggerEvent("collectChoose",id);
    }
  }
})