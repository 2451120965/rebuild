<template>
  <div>帮助文档</div>
</template>

<script>
import { GetDocText } from '@/api/doc.js'
export default {
  data() {
    return {
    };
  },
  async created() {
    const res = await GetDocText({ id: 6 })
    console.log(res);
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>