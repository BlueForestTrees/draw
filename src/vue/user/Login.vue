<template>
    <card>
        <span>
            <img src="/img/logo.svg" style="width:20%;padding-left:1em;padding-top:1em;">
            <img src="/img/blue.svg" style="width:20%">
            <img src="/img/forest.svg" style="width:28%">
            <v-container>
                <v-card-text>
                    <v-layout v-if="loginFailed" row align-center><v-icon color="red">report_problem</v-icon><span class="error--text">Mail inconnu ou mot de passe incorrect</span></v-layout>
                    <v-form v-model="valid" v-on:submit.prevent="validate" ref="form">
                        <v-text-field prepend-icon="mail" name="mail" label="Mail" placeholder="vous@exemple.com"
                                      type="text"
                                      autofocus
                                      autocomplete="username" v-model="mail" required :rules="[mailRequired, validMail]"
                        ></v-text-field>
                        <v-text-field prepend-icon="lock" name="password" label="Mot de passe"
                                      :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                                      :type="showPwd ? 'text' : 'password'" @click:append="showPwd = !showPwd"
                                      autocomplete="current-password" v-model="password" required
                                      :rules="[validPassword]"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <router-link :to="{name:GO.SUSCRIBE}">Cliquez ici pour vous inscrire</router-link>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="validate">Connexion</v-btn>
                </v-card-actions>
            </v-container>
        </span>
    </card>
</template>

<script>
    import {mapActions} from "vuex"
    import On from "../../const/on"
    import Card from "../layout/Card"
    import {GO} from "../../const/go"
    import {mailRequired, validMail} from "../../services/rules"

    export default {
        components: {Card},
        data: function () {
            return {
                GO,
                showPwd: false,
                valid: null,
                mail: null,
                password: null,
                loginFailed: false
            }
        },
        methods: {
            validPassword(value) {
                return !!value || "Veuillez saisir un mot de passe"
            },
            mailRequired,
            validMail,
            ...mapActions({login: On.LOGIN}),
            validate: async function () {
                this.$refs.form.validate()
                if (this.valid) {
                    try {
                        await this.login({mail: this.mail, password: this.password})
                        this.$router.push('/')
                    } catch (e) {
                        this.password = null
                        this.loginFailed = true
                    }
                }
            },
        }
    }
</script>