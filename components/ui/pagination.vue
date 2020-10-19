<template>
  <div
    v-if="pagination"
    class="min-w-full bg-white flex items-center justify-between"
    :class="pagination.last_page > 1 ? 'px-4 py-3 sm:px-6' : ''"
  >
    <div
      class="flex-1 flex justify-between sm:hidden"
      v-if="pagination.last_page > 1"
    >
      <nuxt-link
        v-if="$route.query.page > 1"
        :to="previous"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        Previous
      </nuxt-link>
      <nuxt-link
        v-if="$route.query.page < pagination.last_page"
        :to="next"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      >
        Next
      </nuxt-link>
    </div>
    <div
      class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
      v-if="pagination.last_page > 1"
    >
      <div>
        <p class="text-sm leading-5 text-gray-700">
          Showing
          <span class="font-medium">{{
            (($route.query.page || 1) - pagination.first_page) *
              pagination.per_page +
            1
          }}</span>
          to
          <span class="font-medium">{{
            pagination.per_page * ($route.query.page || 1)
          }}</span>
          of
          <span class="font-medium">{{ pagination.total }}</span>
          results
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex shadow-sm">
          <nuxt-link
            v-if="$route.query.page > 1"
            :to="previous"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Previous"
          >
            <feather-icon icon="arrow-left" />
          </nuxt-link>
          <nuxt-link
            v-for="link in links"
            :key="`pagination-link-${link.pageNumber}`"
            :to="link.link"
            class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
            exact-active-class="border-l-0 border-r-0 border-t-0 border-b-2 border-blue-400"
          >
            {{ link.pageNumber }}
          </nuxt-link>
          <nuxt-link
            v-if="$route.query.page < pagination.last_page"
            :to="next"
            class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Next"
          >
            <feather-icon icon="arrow-right" />
          </nuxt-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    previous() {
      var query = Object.assign({}, this.$route.query);
      return `${this.basePath}?${new URLSearchParams(
        Object.assign(query, { page: query.page - 1 })
      ).toString()}`;
    },
    next() {
      var query = Object.assign({}, this.$route.query);
      return `${this.basePath}?${new URLSearchParams(
        Object.assign(query, { page: query.page + 1 })
      ).toString()}`;
    },
    links() {
      const links = new Array();
      if (this.pagination.last_page < 2) return links;

      for (
        let pageNumber = 1;
        pageNumber <= this.pagination.last_page;
        pageNumber++
      ) {
        var query = Object.assign({}, this.$route.query);
        query.page = pageNumber;
        const link = `${this.basePath}?${new URLSearchParams(
          query
        ).toString()}`;

        links.push({
          pageNumber,
          link
        });
      }
      return links;
    }
  },
  props: ["basePath", "pagination"]
};
</script>
