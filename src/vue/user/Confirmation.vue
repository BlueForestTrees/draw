<template>
    <card>


        <img style="width:20%;padding-top:1em;padding-left:1em;" src="/img/logo.svg">
        <v-container>
            <v-card-actions>
                <v-spacer/>
                <h1>Confirmer l'inscription</h1>
                <v-spacer/>
            </v-card-actions>
            <v-layout v-if="message" column align-center>
                <p style="color:red">{{message}}</p>
                <router-link :to="{name:GO.SUSCRIBE}">S'inscrire</router-link>
            </v-layout>
            <span v-else>
                        <v-card-text>
                            <v-form v-model="valid" v-on:submit.prevent="validate" ref="form">
                                <v-text-field prepend-icon="mail" name="mail" label="Mail" type="text"
                                              autocomplete="username" v-model="mail" disabled
                                ></v-text-field>
                                <v-text-field prepend-icon="person" type="text" placeholder="nom d'affichage"
                                              label="Nom d'affichage"
                                              v-model="fullname" required autofocus
                                              :rules="[nameRequired]" :validate-on-blur="true"
                                />
                                <v-text-field prepend-icon="lock" name="password" label="Mot de passe"
                                              :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                                              :type="showPwd ? 'text' : 'password'" @click:append="showPwd = !showPwd"
                                              autocomplete="current-password" v-model="password" required
                                              :rules="[validPassword]"></v-text-field>
                            </v-form>
                        </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="validate" :disabled="!valid">Suivant<v-icon>navigate_next</v-icon></v-btn>
                    </v-card-actions>
                    </span>
        </v-container>
    </card>

</template>

<script>
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import decode from 'jwt-decode'
    import {GO} from "../../const/go"
    import Card from "../layout/Card"

    export default {
        name: 'confirmation',
        components: {Card},
        props: ['token'],
        data: function () {
            return {
                GO,
                showPwd: false,
                valid: null,
                fullname: null,
                password: null,
                mail: null,
                message: null
            }
        },
        methods: {
            ...mapActions({confirm: On.CONFIRM_SUSCRIBE, close: On.GO_HOME}),
            nameRequired: value => !!value || 'Veuillez indiquer un nom.',
            validPassword: value => !!value || "Veuillez choisir un mot de passe",
            validate: async function () {
                this.$refs.form.validate()
                if (this.valid) {
                    await this.confirm({token: this.token, fullname: this.fullname, password: this.password})
                    this.close()
                }
            }
        },
        mounted: function () {
            try {
                this.mail = decode(this.token).mail
            } catch (e) {
                this.message = "Confirmation invalide :("
            }
        }
    }
</script>