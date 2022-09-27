<template>
  <main class="d-flex w-100">
    <div class="container d-flex flex-column">
      <div class="row vh-100">
        <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
          <div class="d-table-cell align-middle">
            <div class="text-center mt-4">
              <p class="lead">Войдите под своим логином для того чтобы продолжить</p>
            </div>
            <div class="card">
              <div class="card-body">
                <div class="m-sm-4">
                  <div class="text-center">
                    <img
                      src="../assets/img/books/book-logo.jpg"
                      alt="Charles Hall"
                      class="img-fluid rounded-circle"
                      width="132"
                      height="132"
                    />
                    <form @submit.prevent="submit">
                      <h1 class="h3 mb-3 fw-normal">Регистрация</h1>
                      <div class="mb-3 form-floating">
                        <input v-model="data.email" type="email" class="form-control" />
                        <label for="floatingInput">Email</label>
                      </div>
                      <div class="mb-3 form-floating">
                        <input v-model="data.password" type="password" class="form-control" />
                        <label for="floatingPassword">Password</label>
                      </div>
                      <div class="mb-3">
                        <button class="btn btn-lg btn-primary" type="submit">Регистрация</button>
                      </div>
                      <div>
                        <router-link :to="{ name: 'login' }" class="btn btn-lg btn-secondary">Войти</router-link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/http-common'
export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const data = reactive({
      email: '',
      password: '',
    })
    const router = useRouter()
    const submit = async () => {
      http.post('account/users/', data)
      await router.push('/login') // Редирект
    }
    return {
      data,
      submit,
    }
  },
})
</script>
