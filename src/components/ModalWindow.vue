<!-- Модальное окно по умолчанию -->
<template>
  <div class="modal-mask">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="header"> Заголовок </slot>
          </h5>
          <button type="button" class="btn-close" aria-label="Закрыть" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <slot name="body"> Содержимое окна </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn btn-primary" @click="$emit('apply')">Применить</button>
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Отмена</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

<!-- Пример использования компонента модального окна
<button
  type="button"
  class="btn btn-primary me-md-2"
  @click="showModal = true"
>
  Показать окно
</button>
<teleport to="#modals">
  <transition name="modal">
    <ModalWindow
      v-if="showModal"
      @close="showModal = false"
      @apply="() => {}"
    >
      <template v-slot:header>
        <h3>Lorem ipsum</h3>
      </template>
      <template v-slot:body>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
          repudiandae? Labore modi ducimus culpa rerum, et eveniet autem
          recusandae neque cum, explicabo quia quis. Quibusdam non voluptas
          eaque laborum aliquid.
        </p>
      </template>
    </ModalWindow>
  </transition>
</teleport>
-->
