<template>
  <div>
    <v-combobox
        v-model="checked_categories"
        :items="items"
        multiple
    >
      <template v-slot:selection="data">

        <v-chip
            color="primary"
            close
            @click:close="data.parent.selectItem(data.item)"
        >
          <v-avatar
              class="accent white--text"
              left
              v-text="data.item.slice(0, 1).toUpperCase()"
          ></v-avatar>
          {{ data.item }}
        </v-chip>
      </template>
    </v-combobox>
    {{checked_categories}}
    <br>
    {{items}}
  </div>

</template>

<script>
export default {
  name: "Test",
  data() {
    return{
      checked_categories: ['呵呵','go'],
      items: [
        '呵呵','go','c'
      ]
    }
  }
}
</script>

<style scoped>

</style>
