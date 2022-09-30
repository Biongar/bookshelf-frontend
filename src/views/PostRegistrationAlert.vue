<template>
  <main class="d-flex w-100">
    <div class="container d-flex flex-column">
      <div class="row vh-100">
        <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
          <div class="d-table-cell align-middle">
            <div class="text-center mt-4">
              <p class="lead">ЧИТАЛКА</p>
            </div>
            <div class="card">
              <div class="card-body">
                <div class="m-sm-4 alert alert-warning">
                  Вам на email было отправлено письмо для подтверждения регистрации. Для того чтобы войти, сперва
                  необходимо перейти по ссылке, которую вы cможете найти в письме.
                </div>
                <div class="d-flex justify-content-center">
                  <router-link :to="{ name: 'login' }" class="btn btn-primary">Продолжить</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>
<style scoped></style>
