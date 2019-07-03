export default {
  computed: {
    url () {
      return this.$route.params.id && '/member/purchase/update' || '/member/purchase/create'
    }
  },
  methods: {
    getEditInfo () {
      const id = this.$route.params.id
      if (id) {
        this.$http.get(`/member/purchase/${id}/edit`).then(res => {
          if (res.data.code === 200) {
            this.form = res.data.data
          }
        })
      }
    }
  },
  created () {
    this.getEditInfo()
  }
}
