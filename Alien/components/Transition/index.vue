<template>
  <!-- 包装内置的 Transition 组件 -->
  <Transition name="slide-fade" mode="out-in">
    <slot></slot>
  </Transition>
</template>
<script></script>
<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
