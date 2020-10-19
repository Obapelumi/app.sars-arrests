<template>
  <div class="shadow p-3 rounded-lg">
    <div>
      <p class="text-xs text-gray-600">
        {{ arrest.details }}
      </p>
    </div>
    <div class="flex justify-between items-center mt-3">
      <div v-if="arrest.location" class="flex items-center text-gray-600">
        <map-pin class="h-3" />
        <span class="text-xs">{{ arrest.location }}</span>
      </div>
      <div class="flex" v-if="false">
        <img src="/icon.png" alt="user image" class="rounded-full h-8" />
        <div class="ml-3 text-gray-700 text-sm font-semibold">
          <span class="block">Jimoh Isiaq</span>
          <span>@someone</span>
        </div>
      </div>
      <div class="text-gray-600 flex items-center">
        <twitter class="h-3 inline" />
        <span class="font-bold text-xs -ml-1">Tweet</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["arrest"]
};
</script>
