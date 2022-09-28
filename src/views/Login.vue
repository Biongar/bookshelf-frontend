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
                <div class="m-sm-4">
                  <div class="text-center">
                    <img
                      src="../assets/img/books/book-logo.jpg"
                      alt="Charles Hall"
                      class="img-fluid rounded-circle"
                      width="132"
                      height="132"
                    />
                  </div>
                  <form @submit.prevent="submit">
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input
                        v-model="data.login"
                        class="form-control form-control-lg"
                        type="email"
                        name="email"
                        placeholder="Введите ваш email"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Пароль</label>
                      <input
                        v-model="data.password"
                        class="form-control form-control-lg"
                        type="password"
                        name="password"
                        placeholder="Введите ваш пароль"
                      />
                      <small>
                        <!-- <a href="#">Забыли пароль? Восстановить.</a> -->
                      </small>
                    </div>
                    <div>
                      <label class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value="remember-me"
                          name="remember-me"
                          checked
                        />
                        <span class="form-check-label"> Запомнить меня </span>
                      </label>
                    </div>

                    <div v-if="error" class="text-center mt-3">
                      <div class="alert alert-warning" role="alert"><strong>Ошибка!</strong> {{ error }}</div>
                    </div>

                    <div class="text-center mt-3">
                      <button type="submit" class="btn btn-lg btn-primary" :disabled="disabledButtonLogin">
                        Войти
                      </button>
                    </div>
                    <div class="text-center mt-3">
                      <p>или</p>
                      <router-link :to="{ name: 'register' }" class="btn btn-lg btn-secondary">
                        Зарегистрироваться
                      </router-link>
                    </div>
                  </form>
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
import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/users'
import type { ILoginAuth } from '@/types/IUser'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userStore = useUserStore()

    const data = reactive<ILoginAuth>({
      login: '',
      password: '',
    })

    const error = ref('')
    const disabledButtonLogin = ref(false)

    // Сбрасываем авторизацию на странице входа
    userStore.logout()

    // Авторизация пользователя
    const submit = async () => {
      error.value = ''
      let validate_errors = ''

      if ((validate_errors = valideteFormAuth(data))) {
        error.value = 'Авторизация не успешна!' + validate_errors
        return
      }

      disabledButtonLogin.value = true

      userStore
        .login({
          login: data.login,
          password: data.password,
        })
        .then((response) => {
          disabledButtonLogin.value = false
          if (response.access && response.refresh) {
            router.push('/')
          } else {
            userStore.logout()
          }
        })
        .catch((e: Error) => {
          //console.log('Login.vue catch->e: ', e)
          error.value = 'Авторизация не успешна! Вы не верно ввели логин или пароль! (' + e.message + ')'
          userStore.logout()
          disabledButtonLogin.value = false
        })
    }

    const valideteFormAuth = (data: ILoginAuth): string => {
      let result = ''
      if (!data.login) result += ' Вы не ввели логин!'
      if (!data.password) result += ' Вы не ввели пароль!'
      return result
    }

    if (route.query.login && route.query.password) {
      data.login = String(route.query.login)
      data.password = String(route.query.password)
      submit()
    }

    return {
      data,
      error,
      disabledButtonLogin,
      submit,
    }
  },
})
</script>
