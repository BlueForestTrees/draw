<template>
    <user v-if="user" :user="user"/>
    <loader v-else-if="!broken"/>
</template>
<script>
    import SubpageTitle from "../tree/SubpageTitle"
    import UserIcon from "./UserIcon"
    import {mapState, mapActions} from "vuex"
    import On from "../../const/on"
    import Loader from "../loader/Loader"
    import User from "./User"
    import TransitionExpand from "../common/TransitionExpand"

    export default {
        name: "user-page",
        data: () => ({
            user: null,
            broken: null
        }),
        components: {TransitionExpand, User, Loader, UserIcon, SubpageTitle},
        props: ['_id'],
        computed: {
            ...mapState({loggedUser: s => s.user})
        },
        methods: {
            ...mapActions({
                loadUser: On.LOAD_USER,
                snack: On.SNACKBAR
            }),
            async refresh() {
                this.loadUser(this._id || this.loggedUser && this.loggedUser._id)
                    .then(user => this.user = user)
                    .catch(e => {
                        this.broken = true
                        switch (e.status) {
                            case 400:
                                this.snack({text: "Utilisateur introuvable", color: "orange"})
                                break
                        }
                    })
            },
        },
        created() {
            this.refresh()
        },
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        }
    }
</script>