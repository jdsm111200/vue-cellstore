<template>
  <div>
    <v-container>
      <v-row class="mt-15">
        <v-col class=" text-h1 font-weight-black text-center">
          <div class="error-container">
            <span>4 </span>
            <i class="fas fa-ghost screen-reader-text"></i>
            <span>4</span>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class=" text-h4 text-center">
          Oooops, Ha aparecido un fantasma!
        </v-col>
      </v-row>
      <v-row class="mb-15">
        <v-col class="text-center text-subtitle-1">
          La pagina que estas buscando no ha sido encontrada. Ve al inicio
          haciendo
          <router-link to="/" class="blue--text">click aqui!</router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
