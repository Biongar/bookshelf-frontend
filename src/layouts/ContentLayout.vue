<template>
  <div class="wrapper">
    <Navbar title="Главное меню сайта"></Navbar>
    <div class="main">
      <nav class="navbar navbar-expand navbar-light navbar-bg">
        <a class="sidebar-toggle" @click="store.toggleVisibleSidebar()">
          <i class="hamburger align-self-center"></i>
        </a>
        <!-- <div class="navbar-collapse collapse">
          <ul class="navbar-nav navbar-align">
            <li class="nav-item dropdown">
              <a class="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
                <i class="align-middle" data-feather="settings"></i>
              </a>
              <a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
                <img src="" class="avatar img-fluid rounded me-1" alt="Фамилия И.О." />
                <span class="text-dark">Фамилия И.О.</span>
              </a>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="pages-profile.html"
                  ><i class="align-middle me-1" data-feather="user"></i> Профиль</a
                >
                <a class="dropdown-item" href="#"
                  ><i class="align-middle me-1" data-feather="pie-chart"></i> Статистика</a
                >
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="index.html"
                  ><i class="align-middle me-1" data-feather="settings"></i> Настройки</a
                >
                <a class="dropdown-item" href="#"
                  ><i class="align-middle me-1" data-feather="help-circle"></i> Поддержка</a
                >
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Выход</a>
              </div>
            </li>
          </ul>
        </div> -->
      </nav>
      <main class="content">
        <Breadcrumbs />
        <router-view></router-view>
      </main>

      <footer class="footer">
        <div class="container-fluid">
          <div class="row text-muted">
            <div class="col-6 text-start">
              <p class="mb-0">
                <a class="text-muted" href="#" target="_blank"><strong>AdminKit</strong></a>
                &copy;
              </p>
            </div>
            <div class="col-6 text-end">
              <ul class="list-inline">
                <li class="list-inline-item">
                  <!-- <router-link class="text-muted" :to="{ name: 'parts-base-info' }"> Справочники </router-link> -->
                </li>
                <li class="list-inline-item">
                  <a class="text-muted" href="#" target="_blank">Поддержка</a>
                </li>
                <li class="list-inline-item">
                  <a class="text-muted" href="#" target="_blank">Справка</a>
                </li>
                <li class="list-inline-item">
                  <a class="text-muted" href="#" target="_blank">Политика</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/layouts/components/Navbar.vue'
import Breadcrumbs from './components/BreadcrumbsBlock.vue'
import { useStore } from '@/stores/index'
const store = useStore()
</script>

<style lang="scss"></style>
