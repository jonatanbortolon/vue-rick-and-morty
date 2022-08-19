<template>
  <div class="banner">
    <img class="animation" src="../assets/loading.gif"/>
    <span class="text">Loading Morty, stay focused!</span>
  </div>
</template>

<style scoped>
  .banner {
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px 50px;
    gap: 10px;
  }

  .animation {
    width: 100px;
  }
  
  .text {
    font-size: 18px;
    font-weight: 600;
  }
</style>